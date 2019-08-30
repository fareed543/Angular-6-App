import { FormBase } from './form-base.model';

export class FormString extends FormBase<string> {
  DataType = 'String';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
