import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FormFieldComponent } from './form-field/form-field.component';
import { FormFieldGroupComponent } from './form-group/form-field-group.component';
import { FormComponent } from './form.component';
import { FormControlService } from './shared/form-control.service';
import { FormFieldTypeGeneratorService } from './shared/form-field-type-generator.service';
@NgModule({
  declarations: [
      FormComponent,
      FormFieldComponent,
      FormFieldGroupComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ],
  exports: [
    FormComponent,
    FormFieldComponent,
    FormFieldGroupComponent
  ],
  providers: [
    FormControlService,
    FormFieldTypeGeneratorService
  ]
})
export class FormGeneratorModule { }
