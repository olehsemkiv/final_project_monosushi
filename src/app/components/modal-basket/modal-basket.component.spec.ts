import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBasketComponent } from './modal-basket.component';

describe('ModalBasketComponent', () => {
  let component: ModalBasketComponent;
  let fixture: ComponentFixture<ModalBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBasketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change total', () => {
    const FAKE_BASKET = [

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
      }
    ];
    component.basket = FAKE_BASKET;
    spyOn(component, 'getTotalPrice').and.callThrough();
    component.getTotalPrice();
    expect(component.getTotalPrice).toBeTruthy();
    expect(component.totalPrice).toBe(400);

    component.getTotalCount();
    expect(component.getTotalCount).toBeTruthy();
    expect(component.totalCount).toBe(2);
  });

  it('should delet bascet product', () => {
    const index = 1;
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
    const Fake_Basket = [
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
      },
      {
        id: 2,
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
    ]
    component.basket = Fake_Basket;
    spyOn( component, "deleteCartItem" ).and.callThrough();
    component.deleteCartItem(product);
    expect(component.deleteCartItem).toHaveBeenCalled();
    expect( component.basket.length).toBe(1);
  })

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
});
