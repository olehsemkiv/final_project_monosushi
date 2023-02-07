import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';

const MATERIAL = [
    MatDialogModule,
]

// other module
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Swiper

import { SwiperModule } from 'swiper/angular';

@NgModule({
    declarations: [],
    imports: [
        ...MATERIAL,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      SwiperModule
    ],
    exports: [
        ...MATERIAL,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      SwiperModule
    ]
})

export class SharedModule { }
