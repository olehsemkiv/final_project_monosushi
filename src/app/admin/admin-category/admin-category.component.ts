import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';
import { IcategoryElementResponse, IcategoryElementRequest } from 'src/app/shared/interfaces/categories/categories.categories';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public categoriesAdmin: Array<IcategoryElementResponse> = [];
  public newTitle = '';
  public newPath = '';
  public newImagePath = 'https://monosushi.com.ua/wp-content/uploads/2020/10/nav-img-rolls.svg';
  public editStatus = false;
  public editID!: number;

  constructor(private categoriesService: CategoryService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData(): void {
    this.categoriesService.getAll().subscribe(data => {
      this.categoriesAdmin = data;
    })
  }

  addItem(): void {
    const newPost: IcategoryElementRequest = {
      name: this.newTitle,
      path: this.newPath,
      imagePath: this.newImagePath,
    }
    this.categoriesService.create(newPost).subscribe(data => {
      this.getData();
      this.resetForm();
    })
  }

  deleteItem(category: IcategoryElementResponse): void {
    if (confirm('Delete ?')) {
      this.categoriesService.delete(category.id).subscribe(data => {
        this.getData();
      })
    }
  }

  editItem(category: IcategoryElementResponse): void {
    this.editID = category.id;
    this.editStatus = true;
    this.newTitle = category.name;
    this.newPath = category.path;
    this.newImagePath = category.imagePath;
  }


  updateItem(): void {
    const updatePost: IcategoryElementRequest = {
      name: this.newTitle,
      path: this.newPath,
      imagePath: this.newImagePath,
    }
    this.categoriesService.update(updatePost, this.editID).subscribe(data => {
      this.getData();
      this.resetForm();
    })

  }

  resetForm(): void {
    this.newTitle = '';
    this.newPath = '';
    this.newImagePath = '';
    this.editStatus = false;
  }

}
