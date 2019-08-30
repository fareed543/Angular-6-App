import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './_guards/auth.guard';
// import { FieldChipsComponent } from './field-chips/field-chips.component';

@NgModule({
    declarations: [ ],
    imports: [
        MaterialModule, BrowserModule,
        FormsModule, ReactiveFormsModule,
        
    ],
    exports: [
    ],
    providers: [
        AuthGuard
    ]
})

export class SharedModule { }
