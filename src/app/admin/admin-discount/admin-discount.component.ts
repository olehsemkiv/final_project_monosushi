import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { DiscountServiceService } from 'src/app/services/discount-service.service';
import { discountElementRequest, discountElementResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/services/image/image.service';




@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  public discountAdmin: Array<discountElementResponse> = [];

  public editStatus = false;
  public editID!: number | string;
  public uploadPercent!: number;
  public isUploaded = false;
  public discountForm!: FormGroup;


  constructor(
    private discountService: DiscountServiceService,
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
    this.discountForm = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    })
  }

  getData(): void {
    // this.discountService.getAll().subscribe(data => {
    //   this.discountAdmin = data;
    // })
    this.discountService.getAllFirebase().subscribe(data => {
      this.discountAdmin = data as discountElementResponse[];
    })
  }

  addItem(): void {
    if (this.editStatus) {
      // this.discountService.update(this.discountForm.value, this.editID).subscribe(() => {
      //   this.getData();
      //   this.toastr.success('Product Update');
      // })
      this.discountService.updateFirebase(this.discountForm.value, this.editID as string).then(() => {
        this.getData();
        this.toastr.success('Discount Update');
      })
    } else {
      // this.discountService.create(this.discountForm.value).subscribe((data) => {
      //   this.getData();
      //   this.toastr.success('Product Add');
      // })
      this.discountService.createFirebase(this.discountForm.value).then((data) => {
        this.getData();
        this.toastr.success('Discount Add');
      })
    }
    this.discountForm.reset();
    this.editStatus = false;
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  deleteItem(discount: discountElementResponse): void {
    // if (confirm("rly delete ?")) {
    //   this.discountService.delete(discount.id).subscribe(() => {
    //     this.getData();
    //     this.toastr.success('Discount Delete');
    //   })
    // }
    if (confirm("rly delete ?")) {
      this.discountService.deleteFirebase(discount.id).then(() => {
        this.getData();
        this.toastr.success('Discount Delete');
      })
    }
  }

  editItem(discount: discountElementResponse): void {
    this.discountForm.patchValue({
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath,
    })
    this.editStatus = true;
    this.editID = discount.id;
    this.isUploaded = true;
  }

  upload(event: any): void {
    // console.log(event);
    const file = event.target.files[0];
    this.imageService.uploadfile('images', file.name, file)
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

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.discountForm.patchValue({ imagePath: null })
      })
      .catch(err => {
        console.error(err);
      })
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }



}
