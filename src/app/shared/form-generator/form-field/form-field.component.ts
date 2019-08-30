import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormBase } from '../shared/form-base.model';

@Component({
  selector: 'app-form-field',
  templateUrl: 'form-field.component.html',
  styleUrls: [
      'form-field.component.scss'
  ]
})
export class FormFieldComponent {
  @Input() field: FormBase<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.field.Name].valid; }
}
