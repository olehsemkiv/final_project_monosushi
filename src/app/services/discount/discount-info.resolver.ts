import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { discountElementResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountServiceService } from '../discount-service.service';

@Injectable({
  providedIn: 'root'
})


export class DiscountInfoResolver implements Resolve<discountElementResponse> {

  constructor(private discountService: DiscountServiceService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<discountElementResponse> {
    return this.discountService.getOne(Number(route.paramMap.get('id')));
  }
}
