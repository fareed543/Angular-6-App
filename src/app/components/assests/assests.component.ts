import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AppComponent } from '../../app.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-assests',
  templateUrl: './assests.component.html',
})
export class AssestsComponent implements OnInit {
  displayedColumns = ['select', 'AssestID', 'Description', 'LastAccessedBy', 'Date', 'Time', 'Battery', 'Actions'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  
  selection = new SelectionModel<Element>(true, []);
  selectedRowIndex: number = 1;
  rowHighlight: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  highlight(row) {
    console.log(row);
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  tagID = [
    { id: 'tag1', name: 'Tag ID 1' },
    { id: 'tag2', name: 'Tag ID 2' }
  ]

  constructor(
    router: Router,
    public hideApp: AppComponent,
    public dialog: MatDialog,
  ) {
    this.hideApp.hide = true;
  }

  openAsset() {
    this.dialog.open(AssetViewComponent, {
      width: '90%', height: '85%'
    });
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'AssetViewComponent',
  templateUrl: './assests-view/assests-view.component.html',
})
export class AssetViewComponent {
  displayedColumns = ['select', 'assestId', 'employeeId', 'currentLocation', 'pastLocation', 'date', 'time', 'battery', 'actions'];
  dataSource = new MatTableDataSource<Element1>(assetViewTable);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Element1>(true, []);

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  

}

export interface Element1 {
  employeeId: string;
  assestId: string;
  currentLocation: string;
  pastLocation: string;
  date: string;
  time: string;
  battery: number;
  actions: any;
}
const assetViewTable: Element1[] = [
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 96,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 91,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 74,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 65,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 85,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 96,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 88,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 88,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 88,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 45,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 65,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 61,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 20,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 37,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 63,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 48,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 67,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 66,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 88,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 77,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 79,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 36,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 88,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 88,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 88,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 88,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 89,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 54,
    actions: ''
  },
  {
    assestId: 'A09078',
    employeeId: 'E09078',
    currentLocation: 'Sterile Zone',
    pastLocation: 'Clean Store',
    date: '05/03/18',
    time: '10:44',
    battery: 75,
    actions: ''
  }
];





export interface Element {
  AssestID: string;
  Description: string;
  LastAccessedBy: string;
  Date: string;
  Time: string;
  Battery: number;
}

export const ELEMENT_DATA: Element[] = [
  {
    AssestID: 'A09070',
    Description: 'E09078',
    LastAccessedBy: 'E110989',
    Date: '05/03/18',
    Time: '10:02',
    Battery: 76
  },
  {
    AssestID: 'A09072',
    Description: 'E09078',
    LastAccessedBy: 'E110989',
    Date: '05/03/18',
    Time: '10:02',
    Battery: 34
  },
  {
    AssestID: 'A09073',
    Description: 'E09075',
    LastAccessedBy: 'E110983',
    Date: '05/03/18',
    Time: '10:02',
    Battery: 67
  },
  {
    AssestID: 'A09074',
    Description: 'E09073',
    LastAccessedBy: 'E110981',
    Date: '05/03/18',
    Time: '10:02',
    Battery: 59
  },
  {
    AssestID: 'A09074',
    Description: 'E09073',
    LastAccessedBy: 'E110981',
    Date: '05/03/18',
    Time: '10:02',
    Battery: 34
  },
  {
    AssestID: 'A09074',
    Description: 'E09073',
    LastAccessedBy: 'E110981',
    Date: '05/03/18',
    Time: '10:02',
    Battery: 76
  },
  {
    AssestID: 'A09074',
    Description: 'E09073',
    LastAccessedBy: 'E110981',
    Date: '05/03/18',
    Time: '10:02',
    Battery: 66
  },
  {
    AssestID: 'A09074',
    Description: 'E09073',
    LastAccessedBy: 'E110981',
    Date: '05/03/18',
    Time: '10:02',
    Battery: 55
  },
  {
    AssestID: 'A09074',
    Description: 'E09073',
    LastAccessedBy: 'E110981',
    Date: '05/03/18',
    Time: '10:02',
    Battery: 76
  },
  {
    AssestID: 'A09074',
    Description: 'E09073',
    LastAccessedBy: 'E110981',
    Date: '05/03/18',
    Time: '10:02',
    Battery: 59
  },
  {
    AssestID: 'A09074',
    Description: 'E09073',
    LastAccessedBy: 'E110981',
    Date: '05/03/18',
    Time: '10:02',
    Battery: 65
  },
  {
    AssestID: 'A09074',
    Description: 'E09073',
    LastAccessedBy: 'E110981',
    Date: '05/03/18',
    Time: '10:02',
    Battery: 59
  },
  {
    AssestID: 'A09074',
    Description: 'E09073',
    LastAccessedBy: 'E110981',
    Date: '05/03/18',
    Time: '10:02',
    Battery: 45
  },
  {
    AssestID: 'A09074',
    Description: 'E09073',
    LastAccessedBy: 'E110981',
    Date: '05/03/18',
    Time: '10:02',
    Battery: 92
  },
  {
    AssestID: 'A09074',
    Description: 'E09073',
    LastAccessedBy: 'E110981',
    Date: '05/03/18',
    Time: '10:02',
    Battery: 87
  },
];
