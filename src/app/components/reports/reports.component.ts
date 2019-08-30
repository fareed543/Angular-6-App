import { Component, OnInit } from '@angular/core';
import * as assetData from '../assests/assests.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styles: []
})
export class ReportsComponent implements OnInit {

  assetView: boolean = false;
  empView: boolean = false;
  dateView: boolean = false;

  selectedAssetName = 'contains';
  selectedEmpName = 'contains';
  selectedDate = 'is';

  selectedModule = 'Assets';
  selectedType: string;

  view() {
    if (this.selectedType == 'Asset') {
      this.assetView = true;
    }
    if (this.selectedType == 'Employee') {
      this.empView = true;
    }
    if (this.selectedType == 'Date') {
      this.dateView = true;
    }
  }

  modules = [
    { value: 'Assets' },
    { value: 'Employees' },
    { value: 'Jobs' }
  ]

  moduleType = [
    { name: 'Asset' },
    { name: 'Employee' },
    { name: 'Date' }
  ]

  reportRow = assetData.ELEMENT_DATA

  constructor(
    
  ) { }

  ngOnInit() {
  }

}
