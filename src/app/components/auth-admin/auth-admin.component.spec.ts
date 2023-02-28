import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAdminComponent } from './auth-admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


import { AccountService } from 'src/app/services/account/account.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { of } from 'rxjs';

describe('AuthAdminComponent', () => {
  let component: AuthAdminComponent;
  let fixture: ComponentFixture<AuthAdminComponent>;
  let accountServiceMock: any;
  let routerMock: any;
  let toastrServiceMock: any;

  beforeEach(async () => {

    accountServiceMock = jasmine.createSpyObj('AccountService', ['login', 'isUserLogin$']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    toastrServiceMock = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [AuthAdminComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      providers: [
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: MatDialogRef, useValue: {} },

      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
