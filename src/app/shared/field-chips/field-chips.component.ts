import { Component, Input, OnInit } from '@angular/core';
import { FormBase } from '../form-generator/shared/form-base.model';

@Component({
  selector: 'app-field-chips',
  templateUrl: 'field-chips.component.html',
  styleUrls: [
      'field-chips.component.scss'
  ]
})
export class FieldChipsComponent implements OnInit {
  @Input() fields: Array<any>;
  public getCssClass: string;
  private chipClasses: string[] = [
      'badge badge-lg badge-primary',
      'badge badge-success',
      'badge badge-default'
  ];
  ngOnInit() {
      this.getCssClass = this.chipClasses[Math.floor(Math.random() * this.chipClasses.length)];
  }
}
