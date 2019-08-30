import { FormBase } from './form-base.model';

export class FormToggle extends FormBase<string> {
  DataType = 'Bool';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
