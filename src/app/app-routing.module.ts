import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductComponent } from './pages/product/product.component';

import { RoliComponent } from './pages/roli/roli.component';
import { SetuComponent } from './pages/setu/setu.component';
import { DrinksComponent } from './pages/drinks/drinks.component';
import { SousComponent } from './pages/sous/sous.component';

import { ProductInfoComponent } from './pages/product-info/product-info.component';
import { DeliveryAndPaymentComponent } from './pages/delivery-and-payment/delivery-and-payment.component';
import { AboutComponent } from './pages/about/about.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OfertaComponent } from './pages/oferta/oferta.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'discount', component: DiscountComponent },
  { path: 'discount', component: DiscountComponent },
  { path: 'discount-info', component: DiscountInfoComponent },
  { path: 'product', component: ProductComponent },
  { path: 'roli', component: RoliComponent },
  { path: 'setu', component: SetuComponent },
  { path: 'drinks', component: DrinksComponent },
  { path: 'sous', component: SousComponent },
  { path: 'product-info', component: ProductInfoComponent },
  { path: 'delivery-and-payment', component: DeliveryAndPaymentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'oferta', component: OfertaComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
