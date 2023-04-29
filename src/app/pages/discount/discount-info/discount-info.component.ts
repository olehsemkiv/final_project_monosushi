import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscountServiceService } from 'src/app/services/discount-service.service';
import { discountElementResponse } from 'src/app/shared/interfaces/discount/discount.interface';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent implements OnInit {

  public currentDiscount!: discountElementResponse;

  constructor(
    private discountServie: DiscountServiceService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(resolve => {
      this.currentDiscount = resolve['discountInfo'];
    })
  }



}
