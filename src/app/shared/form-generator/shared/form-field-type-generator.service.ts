import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { FormBase } from './form-base.model';
import { FormString } from './form-string.model';
import { FormToggle } from './form-toggle.model';
import { FormGroup } from './form-group.model';
import { FormNumber } from './form-number.model';

@Injectable()
export class FormFieldTypeGeneratorService {
  constructor() { }

  toFormFields(fields: any[]): Array<FormBase<any>> {
    if (!fields || fields.length < 1) {
      return [];
    }
    const formFields = [];
    fields.forEach((field) => {
      switch (field.DataType) {
        case 'String':
          formFields.push(new FormString(field));
          break;
        case 'Num':
          formFields.push(new FormNumber(field));
          break;
        case 'Group':
          formFields.push(new FormGroup(field));
          break;
        default: break;
      }
    });
    return formFields;
  }
}
