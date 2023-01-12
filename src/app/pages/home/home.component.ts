// import { ViewEncapsulation } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';
import { IProductResponse } from 'src/app/shared/interfaces/products/product.interface';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {

  public homeUserProducts: Array<IProductResponse> = [];
  public homeUserProductsRoly: Array<IProductResponse> = [];

  swiperConfig: any = {

    breakpoints: {
      0: {
        slidesPerView: 1,

      },
      990: {
        slidesPerView: 2,
      }
    }
  }

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadUserProducts();


  }

  loadUserProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.homeUserProducts = data;
      for (const product of this.homeUserProducts) {
        if (product.category.path == 'roly' || product.category.path == 'sety') {
          this.homeUserProductsRoly.push(product);
        }
      }
    })
  }

  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count
    } else if (!value && product.count > 1) {
      --product.count
    }
  }

  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }
}
