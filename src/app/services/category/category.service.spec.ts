import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { IcategoryElementRequest, IcategoryElementResponse } from 'src/app/shared/interfaces/categories/categories.categories';
import { environment } from 'src/environments/environment';


describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.BACKEND_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [CategoryService],
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all categories from the API via GET', () => {
    const mockCategories: IcategoryElementResponse[] = [
      { id: 1, name: 'Category 1', path: 'path', imagePath: 'imagepath' },
      { id: 2, name: 'Category 2', path: 'path', imagePath: 'imagepath' },
    ];

    service.getAll().subscribe((response) => {
      expect(response).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(apiUrl + '/categories');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('should create a category via POST', () => {
    const category = { name: 'Category 1', path: 'path', imagePath: 'imagepath' };
    service.create(category).subscribe(result => {
      expect(result).toBeNull(); // null is not the same as undefined
    });

    const req = httpMock.expectOne(`${apiUrl}/categories`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(category);

    req.flush(null); // the response is null in this case

  });
  it('should delete a category via DELETE', () => {
    const categoryId = 1;

    service.delete(categoryId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(apiUrl + `/categories/${categoryId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
  it('should update a category via PATCH', () => {
    const categoryId = 1;
    const updatedCategory: IcategoryElementRequest = {
      name: 'Category 1', path: 'path', imagePath: 'imagepath'
    };

    service.update(updatedCategory, categoryId).subscribe((response) => {
      expect(response).toEqual(updatedCategory);
    });

    const req = httpMock.expectOne(apiUrl + `/categories/${categoryId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedCategory);
    req.flush(updatedCategory);
  });
});
