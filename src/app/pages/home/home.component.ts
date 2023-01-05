// import { ViewEncapsulation } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadUserProducts();
  }

  loadUserProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.homeUserProducts = data;
    })
  }

}
