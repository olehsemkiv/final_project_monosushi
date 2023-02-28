import { TestBed } from '@angular/core/testing';

import { DiscountInfoResolver } from './discount-info.resolver';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { discountElementResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountServiceService } from '../discount-service.service';


describe('DiscountInfoResolver', () => {
  let resolver: DiscountInfoResolver;
  let discountService: jasmine.SpyObj<DiscountServiceService>;

  beforeEach(() => {

    const spy = jasmine.createSpyObj('DiscountServiceService', ['getOne']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DiscountInfoResolver,
        { provide: DiscountServiceService, useValue: spy }
      ]
    });
    resolver = TestBed.inject(DiscountInfoResolver);
    discountService = TestBed.inject(DiscountServiceService) as jasmine.SpyObj<DiscountServiceService>;

  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  
});
