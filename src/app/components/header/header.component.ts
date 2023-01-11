import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { IProductResponse } from 'src/app/shared/interfaces/products/product.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public navMenuStatus = false;
  public cartStatus = false;

  public basket: Array<IProductResponse> = [];
  public totalPrice = 0;
  public totalCount = 0;



  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    console.log(this.basket.length);

  }



  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getTotalCount();
  }


  getTotalPrice(): void {
    this.totalPrice = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0)
  }
  getTotalCount(): void {
    this.totalCount = this.basket.reduce((total: number, prod: IProductResponse) => total + prod.count, 0)
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

  // =======================================================

  openNavMenu(): void {
    this.navMenuStatus = !this.navMenuStatus
  }

  closeNavMenu(): void {
    this.navMenuStatus = !this.navMenuStatus
  }

  openNavCart(): void {
    this.cartStatus = !this.cartStatus
  }
  closeNavCart(): void {
    if (this.cartStatus) {
      this.cartStatus = false;
    }
  }

}
