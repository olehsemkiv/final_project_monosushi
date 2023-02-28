import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';
import { IcategoryElementResponse } from 'src/app/shared/interfaces/categories/categories.categories';
import { CategoryService } from 'src/app/services/category/category.service';
import { ImageService } from 'src/app/services/image/image.service';
import { Storage } from '@angular/fire/storage';
import { AdminCategoryComponent } from './admin-category.component';

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;
  let categoryService: CategoryService;
  let imageService: ImageService;
  let storage: Storage;

  const mockCategories: Array<IcategoryElementResponse> = [
    { id: 1, name: 'Category 1', path: 'path1', imagePath: 'imagePath1' },
    { id: 2, name: 'Category 2', path: 'path2', imagePath: 'imagePath2' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCategoryComponent],
      imports: [ReactiveFormsModule, ToastrModule.forRoot()],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            getAll: () => of(mockCategories),
            create: () => of({}),
            update: () => of({}),
            delete: () => of({})
          }
        },
        {
          provide: ImageService,
          useValue: {
            uploadfile: () => Promise.resolve('imageUrl'),
            deleteUploadFile: () => Promise.resolve({})
          }
        },
        {
          provide: Storage,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    imageService = TestBed.inject(ImageService);
    storage = TestBed.inject(Storage);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize category form', () => {
    expect(component.categoryForm).toBeDefined();
  });

  it('should get categories on init', () => {
    spyOn(categoryService, 'getAll').and.returnValue(of(mockCategories));
    component.ngOnInit();
    expect(component.categoriesAdmin).toEqual(mockCategories);
  });
  


});
