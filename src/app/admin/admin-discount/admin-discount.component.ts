import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { DiscountServiceService } from 'src/app/services/discount-service.service';
import { discountElementRequest, discountElementResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  public discountAdmin: Array<discountElementResponse> = [];

  // public newImagePath = 'https://monosushi.com.ua/wp-content/uploads/2022/07/imgonline-com-ua-compressed-ryna9n84oqh1-scaled-697x379.jpg';
  public editStatus = false;
  public editID!: number;
  public uploadPercent!: number;
  public isUploaded = false;
  public discountForm!: FormGroup;


  constructor(
    private discountService: DiscountServiceService,
    private fb: FormBuilder,
    private storage: Storage,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.getData();
    this.initCategoryForm();
  }

  initCategoryForm(): void {
    this.discountForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }

  getData(): void {
    this.discountService.getAll().subscribe(data => {
      this.discountAdmin = data;
    })
  }

  addItem(): void {
    if (this.editStatus) {
      this.discountService.update(this.discountForm.value, this.editID).subscribe(() => {
        this.getData();
        this.toastr.success('Product Update');
      })
    } else {
      this.discountService.create(this.discountForm.value).subscribe((data) => {
        this.getData();
        this.toastr.success('Product Add');

      })
    }
    this.discountForm.reset();
    this.editStatus = false;
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  deleteItem(discount: discountElementResponse): void {
    if (confirm("rly delete ?")) {
      this.discountService.delete(discount.id).subscribe(() => {
        this.getData();
        this.toastr.success('Product Delete');
      })
    }
  }

  editItem(discount: discountElementResponse): void {
    this.discountForm.patchValue({
      name: discount.title,
      description: discount.description,
      imagePath: discount.imagePath,
    })
    this.editStatus = true;
    this.editID = discount.id;
    this.isUploaded = true;
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadfile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);

      })

  }

  async uploadfile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);

      }
    } else {
      console.log('wrong format');

    }
    return Promise.resolve(url);
  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('imagePath'));
    deleteObject(task).then(() => {
      console.log('file deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.discountForm.patchValue({
        imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }



}
