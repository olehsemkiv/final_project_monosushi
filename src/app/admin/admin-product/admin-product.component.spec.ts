import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductComponent } from './admin-product.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Storage } from '@angular/fire/storage';
import {ToastrService} from "ngx-toastr";

describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductComponent ],
      imports:[
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers:[
        {provide: Storage, useValue: {}},
        {provide: ToastrService, useValue: {}},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
