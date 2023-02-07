import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthAdminComponent } from './auth-admin.component';
import { AuthAdminRoutingModule } from './auth-admin-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    AuthAdminComponent
  ],
  imports: [
    CommonModule,
    AuthAdminRoutingModule,
    SharedModule
  ]
})
export class AuthAdminModule { }
