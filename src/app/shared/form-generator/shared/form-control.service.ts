import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase } from './form-base.model';

@Injectable()
export class FormControlService {
  constructor() { }

  toFormGroup(fields: FormBase<any>[] ) {
    const group: any = {};
    fields.forEach(field => {
      if (field.DataType !== 'Group') {
        group[field.Name] = field.required ? new FormControl(field.value || '', Validators.required)
                                                : new FormControl(field.value || '');
      }
    });
    return new FormGroup(group);
  }
}
