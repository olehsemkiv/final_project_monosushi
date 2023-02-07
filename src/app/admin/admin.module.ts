import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminDiscountComponent } from './admin-discount/admin-discount.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminProductComponent } from './admin-product/admin-product.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoryComponent,
    AdminDiscountComponent,
    AdminOrdersComponent,
    AdminProductComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
