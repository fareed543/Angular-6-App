import { FormBase } from './form-base.model';

export class FormGroup extends FormBase<string> {
  DataType = 'Group';
  columns: any[];

  constructor(options: {} = {}) {
    super(options);
    this.columns = options['columns'] || '';
  }
}
