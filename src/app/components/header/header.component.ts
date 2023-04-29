import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, UserCredential } from '@firebase/auth';
import { setDoc } from '@firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ROLE } from 'src/app/shared/constants/role.constants';
import { IProductResponse } from 'src/app/shared/interfaces/products/product.interface';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { ModalBasketComponent } from '../modal-basket/modal-basket.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public navMenuStatus = false;
  public cartStatus = false;

  public basket: IProductResponse[] = [];
  public totalPrice = 0;
  public totalCount = 0;

  // Form login

  public authForm!: FormGroup;
  public registrForm!: FormGroup;
  public isLogin = false;
  public loginUrl = '';
  // ************************************
  public loginSubscription!: Subscription;




  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService,
    public dialog: MatDialog,
    // public dialModalRef: MdDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.initAuthForm();
    this.initRegisterForm();
    this.checkUserLogin();
    this.checkUpdateUserLogin();
  }
  ngOnDestroy(): void {
    // this.loginSubscription.unsubscribe()
    if (this.loginSubscription) { this.loginSubscription.unsubscribe() }
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    })
  }
  initRegisterForm(): void {
    this.registrForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  login(): void {
    const { email, password } = this.authForm.value;
    this.loginUser(email, password).then(() => {
      this.toastr.success('User Login');
    }).catch(e => {
      this.toastr.error(e.message);
    })
    this.authForm.reset();
  }

  async loginUser(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      console.log('user', user);
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER) {
        this.router.navigate(['/cabinet']);
      } else if (user && user['role'] === ROLE.ADMIN) {
        this.router.navigate(['/admin']);
      }
      this.accountService.isUserLogin$.next(true);

    }, (e) => {
      console.log(e);

    })

  }

  // ************************************
  register(): void {
    // console.log(this.registrForm.value);
    const { email, password } = this.registrForm.value;
    this.emailSignUp(email, password).then(() => {
      this.toastr.success('User Registr');
    }).catch(e => {
      this.toastr.error(e.message);
    })
    this.registrForm.reset();
  }

  async emailSignUp(email: string, password: string): Promise<void> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      email: credential.user.email,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      orders: [],
      role: 'USER',
    }
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
  }

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogin = true;
      this.loginUrl = 'admin';
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'cabinet';
    } else {
      this.isLogin = false;
      this.loginUrl = '';
    }
  }

  checkUpdateUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  }

  // ========================================================

  openLoginDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog'
    });
  }

  openCartDialog(): void {
    this.cartStatus = !this.cartStatus;
    this.dialog.open(ModalBasketComponent, {
      backdropClass: 'cart-back',
      panelClass: 'cart-dialog',
      position: {
        top: '110px',
        right: '0px'
      }
    }).afterClosed().subscribe(() => {
      this.cartStatus = !this.cartStatus;
    });


  }




  // ================basket
  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getTotalCount();
  }


  getTotalPrice(): void {
    this.totalPrice = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0)
  }
  getTotalCount(): void {
    this.totalCount = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count, 0)
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count
      localStorage.setItem('basket', JSON.stringify(this.basket))
    }
    else if (!value && product.count > 1) {
      --product.count
      localStorage.setItem('basket', JSON.stringify(this.basket))
    }
    this.updateBasket();
    this.orderService.changeBasket.next(true);
  }

  deleteCartItem(product: IProductResponse): void {
    if (this.basket.some(prod => prod.id === product.id)) {
      const index = this.basket.findIndex(prod => prod.id === product.id);
      this.basket.splice(index, 1);
      console.log(this.basket);
      localStorage.setItem('basket', JSON.stringify(this.basket))
      this.updateBasket();
      this.orderService.changeBasket.next(true);
    }

  }

  // =======================================================

  openNavMenu(): void {
    this.navMenuStatus = !this.navMenuStatus
  }

  closeNavMenu(): void {
    if (this.navMenuStatus) {
      this.navMenuStatus = false;
    }
  }

  openNavCart(): void {
    this.cartStatus = !this.cartStatus
  }
  closeNavCart(): void {
    if (this.cartStatus) {
      this.cartStatus = false;
    }
  }

}
