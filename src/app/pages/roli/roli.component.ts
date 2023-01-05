import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { IProductResponse } from 'src/app/shared/interfaces/products/product.interface';

@Component({
  selector: 'app-roli',
  templateUrl: './roli.component.html',
  styleUrls: ['./roli.component.scss']
})
export class RoliComponent implements OnInit {

  public homeUserProducts: Array<IProductResponse> = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadUserProducts();
  }

  loadUserProducts(): void {
    this.productService.getAll().subscribe(data => {
      this.homeUserProducts = data;
    })
  }
}
