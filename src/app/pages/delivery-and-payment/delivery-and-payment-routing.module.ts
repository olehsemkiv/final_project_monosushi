import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryAndPaymentComponent } from './delivery-and-payment.component';


const routes: Routes = [
  {
    path: '', component: DeliveryAndPaymentComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryAndPaymentRoutingModule { }
