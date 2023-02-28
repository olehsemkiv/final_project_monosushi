import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductInfoComponent } from './product-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';
import { IProductResponse } from 'src/app/shared/interfaces/products/product.interface';



xdescribe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let orderService: jasmine.SpyObj<OrderService>;
  const activatedRouteMock = {
    data: of({ productInfo: { id: 1, name: 'Test Product', count: 1 } })
  };

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getAllByCategory']);
    const orderServiceSpy = jasmine.createSpyObj('OrderService', ['addToBasket']);
    await TestBed.configureTestingModule({
      declarations: [ProductInfoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: OrderService, useValue: orderServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ]
    })
      .compileComponents();

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;

    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load the product info on init', () => {
    expect(component.currentProduct).toEqual({
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
    });
  });
  it('should add to basket', () => {
    const product: IProductResponse = {
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
      count: 2
    };
    component.addToBasket(product);
    expect(localStorage.getItem('basket')).toEqual(JSON.stringify([product]));
    expect(product.count).toEqual(1);
    expect(orderService.changeBasket).toHaveBeenCalled();
  });
  it('should increase and decrease product count', () => {
    const product: IProductResponse = {
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
    component.productCount(product, true);
    expect(product.count).toEqual(2);
    component.productCount(product, false);
    expect(product.count).toEqual(1);
    component.productCount(product, false);
    expect(product.count).toEqual(1);
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
});
