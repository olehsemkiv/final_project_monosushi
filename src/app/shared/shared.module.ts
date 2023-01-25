import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';

const MATERIAL = [
    MatDialogModule,
]

@NgModule({
    declarations: [],
    imports: [
        ...MATERIAL
    ],
    exports: [
        ...MATERIAL
    ]
})

export class SharedModule { }