import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/services/account/account.service';
import { OrderService } from 'src/app/services/order/order.service';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { signInWithEmailAndPassword, UserCredential } from '@firebase/auth';
import { ROLE } from 'src/app/shared/constants/role.constants';

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  confirmedPassword?: string;
}


@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  public authForm!: FormGroup;
  public registrForm!: FormGroup;
  public isLogin = false;
  public checkPassword = false;
  public loginUrl = '';
  public registerStatus = false;
  // ************************************
  public loginSubscription!: Subscription;

  private registerData!: IRegister;


  constructor(
    private orderService: OrderService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initAuthForm();
    this.initRegisterForm();
    this.checkUserLogin();
    this.checkUpdateUserLogin();

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
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      confirmedPassword: [null, Validators.required]
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
    console.log(this.registrForm.value);
    const { email, password } = this.registrForm.value;
    this.registerData = this.registrForm.value;
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
      firstName: this.registerData.firstName,
      lastName: this.registerData.lastName,
      phoneNumber: this.registerData.phoneNumber,
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

  openRegisterDialog(): void {
    this.registerStatus = !this.registerStatus;
  }

  checkConfirmedPassword(): void {
    this.checkPassword = this.password.value === this.confirmed.value;
    if (this.password.value !== this.confirmed.value) {
      this.registrForm.controls['confirmedPassword'].setErrors({
        matchError: 'Password confirmation doesnt match'
      })
    }
  }

  get password(): AbstractControl {
    return this.registrForm.controls['password'];
  }
  get confirmed(): AbstractControl {
    return this.registrForm.controls['confirmedPassword'];
  }

  checkVisibilityError(control: string, name: string): boolean | null {
    return this.registrForm.controls[control].errors?.[name];
  }

}
