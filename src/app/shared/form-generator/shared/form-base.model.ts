export class FormBase<T> {
    value: T;
    Name: string;
    label: string;
    ElementID: string;
    required: boolean;
    order: number;
    DataType: string;
    constructor(options: {
        value?: T,
        Name?: string,
        label?: string,
        required?: boolean,
        order?: number,
        DataType?: string,
        ElementID?: string
      } = {}) {
      this.value = options.value;
      this.Name = options.Name || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.DataType = options.DataType || '';
      this.ElementID = options.ElementID || '';
    }
  }
