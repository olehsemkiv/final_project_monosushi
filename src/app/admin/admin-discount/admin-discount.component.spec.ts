import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountComponent } from './admin-discount.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Storage } from "@angular/fire/storage";
import { ToastrService } from "ngx-toastr";

import { of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { DiscountServiceService } from 'src/app/services/discount-service.service';
import { ImageService } from 'src/app/services/image/image.service';

const discountServiceMock = {
  create: jasmine.createSpy('create'),
  update: jasmine.createSpy('update'),
  delete: jasmine.createSpy('delete'),
  getAll: jasmine.createSpy('getAll').and.returnValue(of([])),
};

describe('AdminDiscountComponent', () => {
  let component: AdminDiscountComponent;
  let fixture: ComponentFixture<AdminDiscountComponent>;
  let discountService: DiscountServiceService;
  let imageService: ImageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDiscountComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
        DiscountServiceService,
        ImageService,
        FormBuilder,


      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize discountForm', () => {
    expect(component.discountForm.valid).toBeFalsy();
    expect(component.discountForm.controls['title'].valid).toBeFalsy();
    expect(component.discountForm.controls['description'].valid).toBeFalsy();
    expect(component.discountForm.controls['imagePath'].valid).toBeFalsy();
  });



});
