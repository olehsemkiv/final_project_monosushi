import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainPageComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
