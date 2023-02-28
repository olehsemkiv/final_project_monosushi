import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';



import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/products/product.interface';
import { ProductService } from 'src/app/services/product/product.service';
import { OrderService } from 'src/app/services/order/order.service';


describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;


  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockOrderService: jasmine.SpyObj<OrderService>;
  let mockActivatedRoute: { snapshot: { paramMap: { get: jasmine.Spy } } };

  let productService: jasmine.SpyObj<ProductService>;
  let activatedRoute: ActivatedRoute;

  const mockProducts: Array<IProductResponse> = [
    {
      id: 1,
      category: {
        id: 1,
        name: 'fdsdfsd',
        path: 'fsdfsd',
        imagePath: 'fsdfsdfs'
      },
      name: 'string',
      path: 'string',
      description: 'string',
      weight: '300',
      price: 10,
      imagePath: 'string',
      count: 1
    },
    {
      id: 2,
      category: {
        id: 2,
        name: 'fdsdfsd',
        path: 'fsdfsd',
        imagePath: 'fsdfsdfs'
      },
      name: 'string',
      path: 'string',
      description: 'string',
      weight: '300',
      price: 20,
      imagePath: 'string',
      count: 1
    },
  ];

  beforeEach(async () => {

    mockProductService = jasmine.createSpyObj<ProductService>('ProductService', ['getAllByCategory']);
    mockProductService.getAllByCategory.and.returnValue(of(mockProducts));

    mockOrderService = jasmine.createSpyObj<OrderService>('OrderService', ['changeBasket']);
    mockOrderService.changeBasket = new BehaviorSubject<boolean>(false);

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.returnValue('category-name'),
        },
      },
    };


    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        { provide: OrderService, useValue: mockOrderService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    })
      .compileComponents();
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase product count', () => {
    const product = mockProducts[0];
    component.productCount(product, true);
    expect(product.count).toBe(2);
  });

  it('change product count', () => {
    const boolean = true;
    const Fake_Product =
      {
        id: 1,
        category: {
          id: 1,
          name: 'name',
          path: 'path',
          imagePath: 'imagePath'
        },
        name: 'name',
        path: 'path',
        description: 'description',
        weight: 'weight',
        price: 10,
        imagePath: 'string',
        count: 2
      };
    spyOn( component, "productCount" ).and.callThrough();
    component.productCount(Fake_Product,boolean);
    expect(component.productCount).toHaveBeenCalled();
    expect( Fake_Product.count).toBe(3);
  });

  it('should addBasket', () => {
    const product = {
      id: 1,
      category: {
        id: 1,
        name: 'name',
        path: 'path',
        imagePath: 'imagePath'
      },
      name: 'name',
      path: 'path',
      description: 'description',
      weight: 'weight',
      price: 10,
      imagePath: 'string',
      count: 2
    }
    spyOn( component, "addToBasket" ).and.callThrough();
    component.addToBasket(product);
    expect(component.addToBasket).toHaveBeenCalled();
    expect( product.count).toBe( 1 );
  });



  it('should increment product count when value is true', () => {
    const mockProduct: IProductResponse = {
      id: 1,
      category: {
        id: 1,
        name: 'fdsdfsd',
        path: 'fsdfsd',
        imagePath: 'fsdfsdfs'
      },
      name: 'string',
      path: 'string',
      description: 'string',
      weight: '300',
      price: 10,
      imagePath: 'string',
      count: 1
    };
    component.productCount(mockProduct, true);
    expect(mockProduct.count).toBe(2);
  });

  it('should decrement product count when value is false and count is greater than 1', () => {
    const mockProduct: IProductResponse = {
      id: 1,
      category: {
        id: 1,
        name: 'fdsdfsd',
        path: 'fsdfsd',
        imagePath: 'fsdfsdfs'
      },
      name: 'string',
      path: 'string',
      description: 'string',
      weight: '300',
      price: 10,
      imagePath: 'string',
      count: 1
    };
    mockProduct.count = 2;
    component.productCount(mockProduct, false);
    expect(mockProduct.count).toBe(1);
  });
});
