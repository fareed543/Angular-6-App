import { Component, ViewChild } from '@angular/core';
import { TableColumn, ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent {
  
  @ViewChild('myTable') table: any;

  constructor() { }

  rows: batteryData[] = [
    {
        Battery: 52,
        AlertName: "Low Battery",
        Action: "Recharge Soon",
        icon: 'assets/img/icons/battery1.png'
    },
    {
        Battery: 100,
        AlertName: "Battery Full",
        Action: "Unplug Charge",
        icon: 'assets/img/icons/battery3.png'
    },
    {
        Battery: 10,
        AlertName: "Critical Battery",
        Action: "Recharge Now",
        icon: 'assets/img/icons/battery2.png'
    },
  ];

  expanded: any = {};
  timeout: any;
  
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  getDetailRowHeight(row: any, index: number): number {
    console.log("aaa", row, index);
    return 100;
  }
}

export interface batteryData {
  Battery: number;
  AlertName: string;
  Action: string;
  icon?: any;
}