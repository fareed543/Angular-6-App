import { FormBase } from './form-base.model';

export class FormNumber extends FormBase<string> {
  DataType = 'Num';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
