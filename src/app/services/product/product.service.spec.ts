import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { IProductRequest, IProductResponse } from 'src/app/shared/interfaces/products/product.interface';



describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;


  const url = environment.BACKEND_URL;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers: [ProductService]

    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable of product responses', () => {
    const mockProducts: IProductResponse[] = [
      {
        id: 1,
        category: {
          id: 2,
          name: 'name',
          path: 'path',
          imagePath: 'imgpath'
        },

        name: 'string',
        path: 'string',
        description: 'string',
        weight: '300',
        price: 200,
        imagePath: 'string',
        count: 2,
      },
      {
        id: 2,
        category: {
          id: 2,
          name: 'name',
          path: 'path',
          imagePath: 'imgpath'
        },

        name: 'string',
        path: 'string',
        description: 'string',
        weight: '300',
        price: 300,
        imagePath: 'string',
        count: 2,
      },
      {
        id: 3,
        category: {
          id: 2,
          name: 'name',
          path: 'path',
          imagePath: 'imgpath'
        },

        name: 'string',
        path: 'string',
        description: 'string',
        weight: '300',
        price: 400,
        imagePath: 'string',
        count: 2,
      }
    ];

    service.getAll().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const request = httpMock.expectOne(`${url}/products`);
    expect(request.request.method).toBe('GET');
    request.flush(mockProducts);
  });



  it('should create a new product and return an Observable of product response', () => {
    const newProduct: IProductRequest = {

      category: {
        id: 2,
        name: 'name',
        path: 'path',
        imagePath: 'imgpath'
      },

      name: 'string',
      path: 'string',
      description: 'string',
      weight: '300',
      price: 400,
      imagePath: 'string',
      count: 2,
    };
    const mockProductResponse: IProductResponse = {
      id: 4,
      category: {
        id: 2,
        name: 'name',
        path: 'path',
        imagePath: 'imgpath'
      },

      name: 'string',
      path: 'string',
      description: 'string',
      weight: '300',
      price: 400,
      imagePath: 'string',
      count: 2,
    };

    service.create(newProduct).subscribe(product => {
      expect(product).toEqual(mockProductResponse);
    });

    const request = httpMock.expectOne(`${url}/products`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(newProduct);
    request.flush(mockProductResponse);
  });
});
