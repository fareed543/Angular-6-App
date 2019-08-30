import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormBase } from '../shared/form-base.model';

@Component({
  selector: 'app-form-field-group',
  templateUrl: 'form-field-group.component.html'
})
export class FormFieldGroupComponent {
  @Input() fields: Array<FormBase<any>>;
  @Input() form: FormGroup;
}
