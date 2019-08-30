import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
})

export class AlertsComponent implements OnInit {
  displayedColumns = ['icons', 'Type', 'Desc', 'Date', 'Actions'];
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



  constructor() { }

  ngOnInit() {
  
  }

}

export interface Element {
  jobId: string;
  jobName: string;
  jobDate: string;
  tagId: string;
  employeeId: string;
}

const ELEMENT_DATA: Element[] = [
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'Asset123 on JobID J123 has bater low',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
  },
];
