import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';

const MATERIAL = [
    MatDialogModule,
]

// other module
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Swiper

import { SwiperModule } from 'swiper/angular';

@NgModule({
    declarations: [],
    imports: [
        ...MATERIAL,
      FormsModule,
      ReactiveFormsModule,
      SwiperModule
    ],
    exports: [
        ...MATERIAL,
      FormsModule,
      ReactiveFormsModule,
      SwiperModule
    ]
})

export class SharedModule { }
