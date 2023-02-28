import { TestBed } from '@angular/core/testing';

import { DiscountServiceService } from './discount-service.service';
import { HttpClientTestingModule, HttpTestingController  } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { discountElementRequest, discountElementResponse } from 'src/app/shared/interfaces/discount/discount.interface';


describe('DiscountServiceService', () => {
  let service: DiscountServiceService;
  let httpMock: HttpTestingController;
  const backendUrl = environment.BACKEND_URL;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [ DiscountServiceService ]
    });
    service = TestBed.inject(DiscountServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return all discounts', () => {
    const expectedDiscounts: discountElementResponse[] = [
      { id: 1, title: 'Discount 1', description: 'desc', imagePath: 'imgpath' },
      { id: 2, title: 'Discount 2', description: 'desc', imagePath: 'imgpath' }
    ];

    service.getAll().subscribe(discounts => {
      expect(discounts).toEqual(expectedDiscounts);
    });

    const request = httpMock.expectOne(`${backendUrl}/posts`);
    expect(request.request.method).toBe('GET');
    request.flush(expectedDiscounts);
  });

  it('should return one discount', () => {
    const expectedDiscount: discountElementResponse = { id: 2, title: 'Discount 2', description: 'desc', imagePath: 'imgpath' };

    service.getOne(1).subscribe(discount => {
      expect(discount).toEqual(expectedDiscount);
    });

    const request = httpMock.expectOne(`${backendUrl}/posts/1`);
    expect(request.request.method).toBe('GET');
    request.flush(expectedDiscount);
  });

  it('should create a discount', () => {
    const newDiscount: discountElementRequest = {  title: 'Discount 2', description: 'desc', imagePath: 'imgpath' };

    service.create(newDiscount).subscribe(() => {});

    const request = httpMock.expectOne(`${backendUrl}/posts`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(newDiscount);
    request.flush({});
  });

  it('should delete a discount', () => {
    const discountId = 1;

    service.delete(discountId).subscribe(() => {});

    const request = httpMock.expectOne(`${backendUrl}/posts/${discountId}`);
    expect(request.request.method).toBe('DELETE');
    request.flush({});
  });

  it('should update a discount', () => {
    const updatedDiscount: discountElementRequest = { title: 'Discount 2', description: 'desc', imagePath: 'imgpath' };
    const discountId = 1;

    service.update(updatedDiscount, discountId).subscribe(discount => {
      expect(discount).toEqual(updatedDiscount);
    });

    const request = httpMock.expectOne(`${backendUrl}/posts/${discountId}`);
    expect(request.request.method).toBe('PATCH');
    expect(request.request.body).toEqual(updatedDiscount);
    request.flush(updatedDiscount);
  });
});
