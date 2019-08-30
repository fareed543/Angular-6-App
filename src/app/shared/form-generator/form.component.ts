import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormBase } from './shared/form-base.model';
import { FormControlService } from './shared/form-control.service';
import { FormFieldTypeGeneratorService } from './shared/form-field-type-generator.service';
@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  providers: [ FormControlService ]
})
export class FormComponent implements OnInit {

  @Input() fields: any[];
  form: FormGroup;
  payLoad = '';

  constructor (
    private formControlService: FormControlService,
    private formFieldGenerator: FormFieldTypeGeneratorService
  ) {  }

  ngOnInit() {
    this.form = this.formControlService.toFormGroup(this.formFieldGenerator.toFormFields(this.fields));
  }
}
