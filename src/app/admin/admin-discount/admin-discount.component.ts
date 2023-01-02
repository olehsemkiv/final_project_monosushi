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
  public newImagePath = '';
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

  deleteItem(post: discountElementResponse): void {
    if (confirm('Delete ?')) {
      this.discountService.delete(post.id).subscribe(data => {
        this.getData();
      })
    }
  }

  editItem(post: discountElementResponse): void {
    this.editID = post.id;
    this.editStatus = true;
    this.newTitle = post.title;
    this.newDescription = post.description;
    this.newImagePath = post.imagePath;
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
