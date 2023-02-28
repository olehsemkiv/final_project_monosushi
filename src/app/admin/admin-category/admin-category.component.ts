import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { CategoryService } from 'src/app/services/category/category.service';
import { IcategoryElementResponse, IcategoryElementRequest } from 'src/app/shared/interfaces/categories/categories.categories';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image/image.service';


@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public categoriesAdmin: Array<IcategoryElementResponse> = [];
  public editStatus = false;
  public editID!: number;
  public uploadPercent!: number;
  public isUploaded = false;

  public categoryForm!: FormGroup;

  constructor(
    private categoriesService: CategoryService,
    private fb: FormBuilder,
    private storage: Storage,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getData();
    this.initCategoryForm();
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }

  getData(): void {
    this.categoriesService.getAll().subscribe(data => {
      this.categoriesAdmin = data;
    })
  }

  addItem(): void {

    if (this.editStatus) {
      this.categoriesService.update(this.categoryForm.value, this.editID).subscribe(() => {
        this.getData();
        this.toastr.success('Product Update');
      })
    } else {
      this.categoriesService.create(this.categoryForm.value).subscribe(() => {
        this.getData();
        this.toastr.success('Product Add');
      })
    }
    this.categoryForm.reset();
    this.editStatus = false;
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editItem(category: IcategoryElementResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath,
    })
    this.editStatus = true;
    this.editID = category.id;
    this.isUploaded = true;
  }

  deleteItem(category: IcategoryElementResponse): void {
    if (confirm("rly delete ?")) {
      this.categoriesService.delete(category.id).subscribe(() => {
        this.getData();
        this.toastr.success('Product Delete');
      })
    }
  }

  upload(event: any): void {
    // console.log(event);
    const file = event.target.files[0];
    this.imageService.uploadfile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);

      })

  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.categoryForm.patchValue({ imagePath: null })
      })
      .catch(err => {
        console.error(err);
      })
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }
}
