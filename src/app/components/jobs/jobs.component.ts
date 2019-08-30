import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { RTLSService } from '../services/rtls.services';
import { Transecmodel } from '../models/nodedata.model';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
})
export class JobsComponent implements OnInit {
  employees: any[] = [
    {key: '', value: 'None'},
    {key: '43B8', value: 'Srinivas'},
    {key: 'C506', value: 'Murthy'},
    {key: '4383', value: 'Ken'},
  ];
  assets: any[] = [
    {key: '', value: 'None'},
    {key: '14AF', value: '14AF'},
    {key: '17A8', value: '17A8'},
    {key: '0F11', value: '0F11'},
  ];
  nodeData: Transecmodel;
 
  displayedColumns = ['select', 'JobId', 'JobName', 'JobDate', 'TagId', 'EmployeeId', 'Actions'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getPairingData();
  }

  getPairingData(){
    let uuid : string = "00000001-0002-0001-0000-000000000001";
    if(localStorage.getItem('transec_user1')) {
       uuid = "00000001-0002-0001-0000-000000000100";
    } 
    this.rtlsService.getLatestPostion(uuid).subscribe((res) => {
      this.nodeData = res;
      this.nodeData.NodeData = JSON.parse(res.NodeData);
      ELEMENT_DATA[0].aselected = this.nodeData.NodeData.AssetPair1.AssetID;
      ELEMENT_DATA[0].eselected = this.nodeData.NodeData.AssetPair1.EmployeeID;
      ELEMENT_DATA[1].aselected = this.nodeData.NodeData.AssetPair2.AssetID;
      ELEMENT_DATA[1].eselected = this.nodeData.NodeData.AssetPair2.EmployeeID;
    });
  }

  getPutData(e: any, i:any){
    let self = this;
    let uuid : string = "00000001-0002-0001-0000-000000000001";
    if(localStorage.getItem('transec_user1')) {
       uuid = "00000001-0002-0001-0000-000000000100";
    } 
    this.rtlsService.getLatestPostion(uuid).subscribe((res) => {
      let d: Transecmodel = new Transecmodel();
      d = res;
      d.NodeData = JSON.parse(res.NodeData);
      if(i == 0){
        d.NodeData.AssetPair1.AssetID = e.aselected;
        d.NodeData.AssetPair1.EmployeeID = e.eselected;
        d.NodeData.AssetPair1.JobNumber = e.jobId;
      } else {
        d.NodeData.AssetPair2.AssetID = e.aselected;
        d.NodeData.AssetPair2.EmployeeID = e.eselected;
        d.NodeData.AssetPair2.JobNumber = e.jobId;
      }
      self.updateJobPairing(d);
    });
  }

  updateJobPairing(d: Transecmodel){
    const data: { [id: string] : string; } = {};
    data['UUID'] = d.UUID;
    data['NodeData'] = JSON.stringify(d.NodeData);
    data['TimeStamp'] = d.TimeStamp
    console.log(data);
    //d.NodeData = JSON.stringify(d.NodeData);
    this.rtlsService.updatePairing(data).subscribe((res) => {
      console.log(res);
    });
  }

  UnPair(e: any, i:any){
    let self = this;
    let uuid : string = "00000001-0002-0001-0000-000000000001";
    if(localStorage.getItem('transec_user1')) {
       uuid = "00000001-0002-0001-0000-000000000100";
    } 
    this.rtlsService.getLatestPostion(uuid).subscribe((res) => {
      let d: Transecmodel = new Transecmodel();
      d = res;
      d.NodeData = JSON.parse(res.NodeData);
      if(i == 0){
        d.NodeData.AssetPair1.AssetID = e.aselected;
        d.NodeData.AssetPair1.EmployeeID = "";
        d.NodeData.AssetPair1.JobNumber = e.jobId;
      } else {
        d.NodeData.AssetPair2.AssetID = e.aselected;
        d.NodeData.AssetPair2.EmployeeID = "";
        d.NodeData.AssetPair2.JobNumber = e.jobId;
      }
      self.updateJobPairing(d);
    });
  }

  addJob() {
    this.dialog.open(AddJobsComponent);
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

  tagID = [
    { id: 'tag1', name: 'Tag ID 1' },
    { id: 'tag2', name: 'Tag ID 2' }
  ]

  constructor(
    router: Router, 
    private rtlsService: RTLSService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
  }

  onTagChange(e: any, i: any){
    this.getPutData(e,i);
  }
  onEmployeChange(e:any , i: any){
    this.getPutData(e,i);
  }
}

export interface Element {
  jobId: string;
  jobName: string;
  jobDate: string;
  tagId: string;
  employeeId: string;
  aselected: string;
  eselected: string;
}

const ELEMENT_DATA: Element[] = [
  {
    jobId: 'JCL77',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'JCL85',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  {
    jobId: 'A09070',
    jobName: 'E09078',
    jobDate: '05/03/18',
    tagId: 'Clean Store',
    employeeId: 'Sterile Zone',
    aselected: "",
    eselected: ""
  },
  
];


@Component({
  selector: 'add-jobs',
  templateUrl: './addJobs.component.html',
})
export class AddJobsComponent { }