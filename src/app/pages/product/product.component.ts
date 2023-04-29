import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';
import { IcategoryElementResponse } from 'src/app/shared/interfaces/categories/categories.categories';
import { IProductResponse } from 'src/app/shared/interfaces/products/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public homeUserProducts: Array<IProductResponse> = [];
  private eventSubscription!: Subscription;

  public categoryProductName!: string;

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadUserProducts();
      }
    })
  }


  ngOnInit(): void {

  }

  loadUserProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllFirebase().subscribe(data => {
      let categoryProducts = data.filter(item => item['category']['path'] == categoryName);
      this.homeUserProducts = categoryProducts as IProductResponse[];
    })


    if (categoryName == 'roly'){
      this.categoryProductName = 'Роли'
    }
    else if (categoryName == 'sety'){
      this.categoryProductName = 'Сети'
    }
    else if (categoryName == 'drinks'){
      this.categoryProductName = 'Напої'
    }
    else if (categoryName == 'sous'){
      this.categoryProductName = 'Соуси'
    }


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

  // ngOnDestroy(): void {
  //   this.eventSubscription.unsubscribe();
  // }
}
