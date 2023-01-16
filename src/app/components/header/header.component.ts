import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ROLE } from 'src/app/shared/constants/role.constants';
import { IProductResponse } from 'src/app/shared/interfaces/products/product.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public navMenuStatus = false;
  public cartStatus = false;

  public basket: Array<IProductResponse> = [];
  public totalPrice = 0;
  public totalCount = 0;

  // Form login

  public authForm!: FormGroup;
  public isLogin = false;
  public loginUrl = '';




  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.initAuthForm();
    this.checkUserLogin();
    this.checkUpdateUserLogin();
    console.log(this.basket);
    console.log(this.isLogin);


  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    })
  }

  login(): void {
    this.accountService.login(this.authForm.value).subscribe(data => {
      console.log(data);
      if (data && data.length > 0) {
        const user = data[0];
        console.log(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.accountService.isUserLogin$.next(true);
        if (user && user.role === ROLE.USER) {
          this.router.navigate(['/cabinet']);
        } else if (user && user.role === ROLE.ADMIN) {
          this.router.navigate(['/admin']);
        }
      }
    },
      (e) => {
        console.log(e);

      })
      this.authForm.reset();
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

  deleteCartItem(product: IProductResponse, event: EventInit): void {
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
