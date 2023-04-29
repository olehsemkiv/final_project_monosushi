import { Component, OnInit } from '@angular/core';
import { DiscountServiceService } from 'src/app/services/discount-service.service';
import { discountElementResponse } from 'src/app/shared/interfaces/discount/discount.interface';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  public discountUser: Array<discountElementResponse> = [];
  constructor(private discountService: DiscountServiceService) { }


  ngOnInit(): void {
    this.getDataUser()
  }

  getDataUser(): void {
    // this.discountService.getAll().subscribe(data => {
    //   this.discountUser = data;
    // })
    this.discountService.getAllFirebase().subscribe(data => {
      this.discountUser = data as discountElementResponse[];
      // console.log(data)
    })
  }

// rofl(discount: any): void {
//   this.discountService.getOneFirebase(discount.id).subscribe(data => {
//     console.log(data)
//   })
// }

}
