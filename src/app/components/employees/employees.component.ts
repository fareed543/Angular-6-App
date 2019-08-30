import { Component, OnInit, ViewChild, NgModule, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialogRef, MatDialog, MAT_DIALOG_DATA, } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {
  displayedColumns = ['select', 'employeeId', 'firstName', 'lastName', 'email', 'date', 'time', 'battery', 'actions'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

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

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(ActioinListComponent,{
      width: '25%', height: 'auto'
    })
  }

  ngOnInit() {
  }

}

export interface Element {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  date: string;
  time: string;
  battery: number;
}

const ELEMENT_DATA: Element[] = [
  {
    employeeId: 'A09078',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'info@transec.com',
    date: '23/11/1995',
    time: '11:22',
    battery: 78
  },
  {
    employeeId: 'A09079',
    firstName: 'E09048',
    lastName: '05/03/18',
    email: 'eds@sd23.com',
    date: '09/12/1938',
    time: '11:43',
    battery: 89
  },
  {
    employeeId: 'A09080',
    firstName: 'E09079',
    lastName: '05/03/18',
    email: 'eds@sd23.com',
    date: '09/12/1938',
    time: '11:20',
    battery: 45
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 44
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 77
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 71
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com' ,
    date: '09/12/1938',
    time: '09:27',
    battery: 76
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 75
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 77
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 94
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 84
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 54
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 54
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 54
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 54
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 54
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 54
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 54
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 54
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 54
  },
  {
    employeeId: 'A09079',
    firstName: 'E09078',
    lastName: '05/03/18',
    email: 'srtfg@sd23.com',
    date: '09/12/1938',
    time: '09:27',
    battery: 54
  },
];

@Component({
  templateUrl: 'empActionList.component.html'
})
export class ActioinListComponent {
  constructor(public data: MatDialogRef<ActioinListComponent>) {}
}