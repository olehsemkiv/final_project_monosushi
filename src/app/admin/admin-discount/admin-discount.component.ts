import { Component, OnInit } from '@angular/core';
import { DiscountServiceService } from 'src/app/services/discount-service.service';
import { discountElementRequest, discountElementResponse } from 'src/app/shared/interfaces/discount/discount.interface';




@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  public discountAdmin: Array<discountElementResponse> = [];
  public newTitle = '';
  public newDescription = '';
  public newImagePath = 'https://monosushi.com.ua/wp-content/uploads/2022/07/imgonline-com-ua-compressed-ryna9n84oqh1-scaled-697x379.jpg';
  public editStatus = false;
  public editID!: number;


  constructor(private discountService: DiscountServiceService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.discountService.getAll().subscribe(data => {
      this.discountAdmin = data;
    })
  }

  addItem(): void {
    const newPost: discountElementRequest = {
      title: this.newTitle,
      description: this.newDescription,
      imagePath: this.newImagePath,
    }
    this.discountService.create(newPost).subscribe(data => {
      this.getData();
      this.resetForm();
    })
  }

  deleteItem(discount: discountElementResponse): void {
    if (confirm('Delete ?')) {
      this.discountService.delete(discount.id).subscribe(data => {
        this.getData();
      })
    }
  }

  editItem(discount: discountElementResponse): void {
    this.editID = discount.id;
    this.editStatus = true;
    this.newTitle = discount.title;
    this.newDescription = discount.description;
    this.newImagePath = discount.imagePath;
  }


  updateItem(): void {
    const updatePost: discountElementRequest = {
      title: this.newTitle,
      description: this.newDescription,
      imagePath: this.newImagePath,
    }
    this.discountService.update(updatePost, this.editID).subscribe(data => {
      this.getData();
      this.resetForm();
    })

  }

  resetForm(): void {
    this.newTitle = '';
    this.newDescription = '';
    this.newImagePath = '';
    this.editStatus = false;
  }
}
