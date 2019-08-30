import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RTLSService } from '../services/rtls.services';
import { MovementDataSource } from '../services/rtlsgrid.service';
import { Transecmodel } from '../models/nodedata.model';
import { Marker } from '../models/marker.model';
import { Movement } from '../models/movement.model';
import { Element } from '@angular/compiler';
import { TagInfo, TagPosition, TagInfoLog } from '../models/celestica.model';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  displayedColumns = ['select', 'assestId', 'employeeId', 'currentLocation', 'pastLocation', 'starttime', 'endtime', 'duration', 'battery', 'actions'];
  dataSource: MovementDataSource;
  selection = new SelectionModel<Element>(true, []);
  canvas: any;
  context: any;
  mapSprite: any;
  tempData : Movement[] = [];
  movement: Element[] = [];
  canvasWidth : number = 540;
  canvasHeight : number = 410;
  relativeX: number = 1;
  relativeY: number = 1;
  nodeData: Transecmodel;
  prevnodeData: Transecmodel;
  midpoint: TagPosition = new TagPosition();
  markers: Marker []= [];
  scale: number = 0;
  mapWidth: number = 0;
  mapHeight: number = 0;
  mapCenterX: number = 0;
  mapCenterY: number = 0;
  tagPositions: any = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isAchorsFixed: boolean = false;
  ngAfterViewInit(): void {
    this.nodeData = new Transecmodel();
    this.prevnodeData = new Transecmodel();
    
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
    this.canvas = document.getElementById('Canvas');
    let parent = this.canvas.parentElement;
    this.canvasWidth = parent.offsetWidth;
    this.canvasHeight = parent.offsetHeight;
    this.context = this.canvas.getContext("2d");
    
    this.context.font = "8px Georgia";
    this.context.textAlign = "center";
    this.mapSprite = new Image();
    this.mapSprite.src = "assets/img/Single_asset_View_New.png";
    //this.context.transform(1, 0, 0, -1, 0, this.canvasHeight);
    setInterval(() => this.getLocation(),  1000);
    setInterval(() => this.draw(),  (1000 / 60));
    //this.mockMovement();
  }

  mockMovement(){
    let movement: Movement = new Movement();
    let d: string = "{  \"employeeId\": \"C506\",  \"jobid\": \"JCL77\",  \"assestId\": \"17A8\",  \"currentLocation\": \"Room2\",  \"pastLocation\": \"Room1\",  \"starttime\": \"12:02\",  \"endtime\": \"12:05\",  \"duration\": \"00:02:08\",  \"battery\": 0.8,  \"actions\": \"\",  \"lastPosX\": 1.87,  \"lastPosY\": 2.77,  \"nodedata\": [    {      \"TAGID\": \"17A8\",      \"Position\": {        \"x\": 2.94,        \"y\": 2.37,        \"z\": 0.95      }    },    {      \"TAGID\": \"17A8\",      \"Position\": {        \"x\": 2.73,        \"y\": 0.31,        \"z\": 0.9      }    },    {      \"TAGID\": \"17A8\",      \"Position\": {        \"x\": 0.32,        \"y\": 1.28,        \"z\": 0.84      }    },    {      \"TAGID\": \"17A8\",      \"Position\": {        \"x\": 0.92,        \"y\": 2.97,        \"z\": 0.58      }    },    {      \"TAGID\": \"17A8\",      \"Position\": {        \"x\": 1.97,        \"y\": 2.53,        \"z\": 0.89      }    },    {      \"TAGID\": \"17A8\",      \"Position\": {        \"x\": 1.91,        \"y\": 2.77,        \"z\": 1.14      }    },    {      \"TAGID\": \"17A8\",      \"Position\": {        \"x\": 1.91,        \"y\": 2.52,        \"z\": 0.8      }    },    {      \"TAGID\": \"17A8\",      \"Position\": {        \"x\": 1.87,        \"y\": 2.77,        \"z\": 1.12      }    }  ],  \"startdatetime\": \"2018-11-14T06:32:57.382Z\",  \"enddatetime\": \"2018-11-14T06:35:05.803Z\"}";
    movement = JSON.parse(d);
    movement.startdatetime = new Date(movement.starttime);
    movement.starttime = this.getTime(movement.startdatetime);
    movement.enddatetime = new Date(movement.endtime);
    movement.endtime = this.getTime(movement.enddatetime);
    movement.duration = this.getDuration(movement.enddatetime,movement.enddatetime);
    this.tempData.unshift(movement);
    this.publishDataToTable();
  }

 getTime(d: Date) {
      let h = (d.getHours()<10?'0':'') + d.getHours();
      let m = (d.getMinutes()<10?'0':'') + d.getMinutes();
      let value = h + ':' + m;
      return value;
  }
  

  getDuration(sd:Date, ed:Date){
    return Array(3)
    .fill([3600, Math.abs(ed.getTime() - sd.getTime())])
    .map((v, i, a) => {
      a[i + 1] = [a[i][0] / 60, ((v[1] / (v[0] * 1000)) % 1) * (v[0] * 1000)];
        return Array(255).fill('0')
          .concat(`${Math.floor(v[1] / (v[0] * 1000))}`.split(''))
          .map((c,ci,ca)=>{return c !== '0' || ci >= ca.length-2 ? c:'';})
          .join('');
    })
    .join(':');
  }

  getTagInfo(x:number,y:number,z:number){
    let t: TagInfo = new TagInfo();
    t.TAGID = "123";
    t.Position.x = x;
    t.Position.y = y;
    t.Position.z = z;
    return t;
  }

  getLocation() {
    let uuid : string = "00000001-0002-0001-0000-000000000001";
    if(localStorage.getItem('transec_user1')) {
       uuid = "00000001-0002-0001-0000-000000000100";
    } 

    this.rtlsService.getLatestPostion(uuid).subscribe((res) => {
      this.nodeData = res;
      this.nodeData.NodeData = JSON.parse(res.NodeData);
      // console.log(this.nodeData);
      this.calcRelativeX();
      this.calcRelativeY();
      this.scale = Math.min(this.canvasWidth / this.mapWidth, this.canvasHeight / this.mapHeight);
      this.relativeX = (this.mapWidth != 0) ? this.canvasWidth / this.mapWidth : 1;
      this.relativeY = (this.mapHeight != 0) ? this.canvasHeight / this.mapHeight: 1;
      this.normalizeTagPositions();
      // console.log(this.tagPositions);
      if(this.checkifPositionsAreNonZero(this.nodeData.NodeData.AssetTag1)){
       
        this.nodeData.NodeData.AssetTag1.Positions.forEach(e => {
          this.markers[0] = new Marker(0,e.x*this.relativeX,e.y * this.relativeY,1);
        });
        
      }
      if(this.checkifPositionsAreNonZero(this.nodeData.NodeData.AssetTag2)){
        this.nodeData.NodeData.AssetTag2.Positions.forEach(e => {
          this.markers[1] = new Marker(0,e.x*this.relativeX,e.y * this.relativeY,2);
        });
      }
      //  this.markers.push(new Marker(0,this.nodeData.NodeData.AssetTag2.Position.x*this.relativeX,this.nodeData.NodeData.AssetTag2.Position.y * this.relativeY,2));
      if(this.checkifPositionsAreNonZero(this.nodeData.NodeData.EmployeeTag1)){
        this.nodeData.NodeData.EmployeeTag1.Positions.forEach(e => {
          this.markers[2] = new Marker(1,e.x*this.relativeX,e.y * this.relativeY,1);
        });
      }
     //   this.markers.push(new Marker(1,this.nodeData.NodeData.EmployeeTag1.Position.x*this.relativeX,this.nodeData.NodeData.EmployeeTag1.Position.y * this.relativeY,1));
      if(this.checkifPositionsAreNonZero(this.nodeData.NodeData.EmployeeTag2)){
        this.nodeData.NodeData.EmployeeTag1.Positions.forEach(e => {
          this.markers[3] = new Marker(1,e.x*this.relativeX,e.y * this.relativeY,2);
        });
      }
       // this.markers.push(new Marker(1,this.nodeData.NodeData.EmployeeTag2.Position.x*this.relativeX,this.nodeData.NodeData.EmployeeTag2.Position.y * this.relativeY,2));
      
      this.addListRecord(this.nodeData);
      this.prevnodeData = this.nodeData;
    });
  }

  checkifPositionsAreNonZero(tag: TagInfoLog){
    let index: number = tag.Positions.length -1;
    if(tag.Positions[index].x != 0 || tag.Positions[index].y != 0)
       return true;
    return false;
  }

  normalizeTagPositions(){
    let er: number = 0;
    this.tagPositions = [];
    let x: number = this.nodeData.NodeData.AnchorTag1.Position.x * this.relativeX + er;
    let y: number = this.nodeData.NodeData.AnchorTag1.Position.y * this.relativeY + er;
    this.tagPositions.push([x,y]);
    x = this.nodeData.NodeData.AnchorTag2.Position.x * this.relativeX+ er; 
    y = this.nodeData.NodeData.AnchorTag2.Position.y  * this.relativeY + er;
    this.tagPositions.push([x,y]);
    x = this.nodeData.NodeData.AnchorTag3.Position.x  * this.relativeX+ er;
    y = this.nodeData.NodeData.AnchorTag3.Position.y  * this.relativeY+ er;
    this.tagPositions.push([x,y]);
    x = this.nodeData.NodeData.AnchorTag4.Position.x  * this.relativeX + er;
    y = this.nodeData.NodeData.AnchorTag4.Position.y   * this.relativeY + er;
    this.tagPositions.push([x,y]);
    this.midpoint.x = this.nodeData.NodeData.AnchorTag2.Position.x/2;
  }

   addListRecord(curData:Transecmodel){
    let l1:number = curData.NodeData.AssetTag1.Positions.length-1;
    let l2:number = curData.NodeData.AssetTag2.Positions.length-1;
    if(this.tempData.length == 0){
      if(curData.NodeData.AssetPair1.EmployeeID != "" && 
      (curData.NodeData.AssetTag1.Positions[l1].x != 0 && curData.NodeData.AssetTag1.Positions[l1].y!= 0)){
          this.AddAsset1Movement(curData);
      }
      if(curData.NodeData.AssetPair2.EmployeeID != "" && 
      (curData.NodeData.AssetTag2.Positions[l2].x != 0 && curData.NodeData.AssetTag2.Positions[l2].y!= 0)){
          this.AddAsset2Movement(curData);
      }
    } else {
      if(curData.NodeData.AssetTag1.Positions[l1].x != 0 && curData.NodeData.AssetTag1.Positions[l1].y != 0){
        let m:Movement = this.GetExistingMovement1(curData);
        if(m != null){
          this.UpdateRoomMovement(m);
          if(this.checkAsset1Distance(m,curData)){
            m.nodedata.push(curData.NodeData.AssetTag1);
            m.lastPosX = curData.NodeData.AssetTag1.Positions[l1].x;
            m.lastPosY = curData.NodeData.AssetTag1.Positions[l1].y;
            
          }
        } else {
          if(curData.NodeData.AssetPair1.AssetID != "" && curData.NodeData.AssetPair1.EmployeeID != "")
              this.AddAsset1Movement(curData);
        }
      }
      if(curData.NodeData.AssetTag2.Positions[l2].x != 0 && curData.NodeData.AssetTag2.Positions[l2].y != 0){
        let m:Movement = this.GetExistingMovement2(curData);
        if(m != null){
          this.UpdateRoomMovement(m);
          if(this.checkAsset2Distance(m,curData)){
            m.nodedata.push(curData.NodeData.AssetTag2);
            m.lastPosX = curData.NodeData.AssetTag2.Positions[l2].x;
            m.lastPosY = curData.NodeData.AssetTag2.Positions[l2].y;
            
          }
        } else {
          if(curData.NodeData.AssetPair2.AssetID != "" && curData.NodeData.AssetPair2.EmployeeID != "")
              this.AddAsset1Movement(curData);
        }
      }
    }
     this.publishDataToTable();
  } 

  UpdateRoomMovement(m: Movement){
      if(m.lastPosX <= (this.midpoint.x )){
        if(m.currentLocation != "Room1"){
          m.pastLocation = m.currentLocation;
          m.currentLocation = "Room1"
        }
      }
      else {
          if(m.currentLocation != "Room2"){
            m.pastLocation = m.currentLocation;
            m.currentLocation = "Room2"
          }
      }
  }

  GetExistingMovement1(curData:Transecmodel){
    let m: Movement = null;
    this.tempData.forEach(element => {
      if(element.employeeId == curData.NodeData.AssetPair1.EmployeeID && element.endtime == null){ 
        m = element;
      }
    });
    if (m == null){
      this.tempData.forEach(element => {
        if(element.assestId == curData.NodeData.AssetPair1.AssetID && curData.NodeData.AssetPair1.EmployeeID == "" &&
        element.enddatetime == null){
            element.enddatetime = new Date(); 
            element.endtime = this.getTime(element.enddatetime);
            element.duration = this.getDuration(element.startdatetime,element.enddatetime);
        }
      });
    }
    return m;
  }

  GetExistingMovement2(curData:Transecmodel){
    let m: Movement = null;
    this.tempData.forEach(element => {
      if(element.employeeId == curData.NodeData.AssetPair2.EmployeeID && element.endtime == null){ 
        m = element;
      }
    });
    if (m == null){
      this.tempData.forEach(element => {
        if(element.assestId == curData.NodeData.AssetPair2.AssetID && curData.NodeData.AssetPair2.EmployeeID == "" &&
        element.enddatetime == null){
            element.enddatetime = new Date(); 
            element.endtime = this.getTime(element.enddatetime);
            element.duration = this.getDuration(element.startdatetime,element.enddatetime);
        }
      });
    }
    return m;
  }
  AddAsset1Movement(curData:Transecmodel){
      let movement: Movement = new Movement();
      let len: number = curData.NodeData.AssetTag1.Positions.length-1;
      movement.assestId = curData.NodeData.AssetTag1.TAGID;
      movement.employeeId = curData.NodeData.EmployeeTag1.TAGID;
      movement.jobid = curData.NodeData.AssetPair1.JobNumber;
      movement.startdatetime = new Date();
      movement.starttime = this.getTime(movement.startdatetime);
      movement.lastPosX = curData.NodeData.AssetTag1.Positions[len].x;
      movement.lastPosY = curData.NodeData.AssetTag1.Positions[len].y;
      if(movement.lastPosX <= (this.midpoint.x))
        movement.currentLocation = "Room1";
      else
        movement.currentLocation = "Room2";
      movement.nodedata.push(curData.NodeData.AssetTag1);
      this.tempData.unshift(movement);
  }

  AddAsset2Movement(curData:Transecmodel){
    let movement: Movement = new Movement();
    let len: number = curData.NodeData.AssetTag1.Positions.length-1;
    movement.assestId = curData.NodeData.AssetTag2.TAGID;
    movement.employeeId = curData.NodeData.EmployeeTag2.TAGID;
    movement.jobid = curData.NodeData.AssetPair2.JobNumber;
    movement.startdatetime = new Date();
    movement.starttime = this.getTime(movement.startdatetime);
    movement.lastPosX = curData.NodeData.AssetTag2.Positions[len].x;
    movement.lastPosY = curData.NodeData.AssetTag2.Positions[len].y;
    if(movement.lastPosX <= (this.midpoint.x))
        movement.currentLocation = "Room1";
      else
        movement.currentLocation = "Room2";
    movement.nodedata.push(curData.NodeData.AssetTag2);
    this.tempData.unshift(movement);
  } 

  publishDataToTable(){
    this.dataSource = new MovementDataSource(this.paginator);
    console.log(this.tempData);
    this.dataSource.loadLessons(this.tempData);
  }
  
  checkAsset1Distance(m:Movement, currData:Transecmodel){
      let len: number = currData.NodeData.AssetTag1.Positions.length-1;
      let a: number  = currData.NodeData.AssetTag1.Positions[len].x - m.lastPosX;
      let b: number  = currData.NodeData.AssetTag1.Positions[len].y - m.lastPosY;
      let c: number = Math.sqrt( a*a + b*b );
      if(c > 0.15){
       return true;
      } 
      return false;
  }

  checkAsset2Distance(m:Movement, currData:Transecmodel){
    let len: number = currData.NodeData.AssetTag1.Positions.length-1;
    let a: number  = currData.NodeData.AssetTag2.Positions[len].x - m.lastPosX;
    let b: number  = currData.NodeData.AssetTag2.Positions[len].y - m.lastPosY;
    let c: number = Math.sqrt( a*a + b*b );
    if(c > 0.15){
     return true;
    } 
    return false;
  } 

  calcRelativeX(){
      let xmax: number = 1;
      let xcords = [this.nodeData.NodeData.AnchorTag1.Position.x,this.nodeData.NodeData.AnchorTag2.Position.x,
        this.nodeData.NodeData.AnchorTag2.Position.x,this.nodeData.NodeData.AnchorTag2.Position.x]
      xmax = Math.max(...xcords);
      this.mapWidth = xmax - 0;
      this.mapCenterX = (xmax + 0)/2;

  }

  calcRelativeY(){
    let ymax: number = 1;
    let ycords = [this.nodeData.NodeData.AnchorTag1.Position.y,this.nodeData.NodeData.AnchorTag2.Position.y,
    this.nodeData.NodeData.AnchorTag3.Position.y,this.nodeData.NodeData.AnchorTag4.Position.y]
    ymax = Math.max(...ycords);
    this.mapHeight = ymax - 0;
    this.mapCenterY = (ymax + 0)/2;
  }


  draw() {
    let self = this;
    self.context.clearRect(0,0, self.canvas.width, self.canvas.height);
    self.drawGrid();
    //self.context.fillStyle = "#E8E8EE";
    //this.context.fillStyle = "#666";
    //this.context.globalAlpha = 0.5;
    //self.context.fillRect(0, 0, self.canvas.width, self.canvas.height);
  

    self.context.fillRect(0, 0, self.mapWidth, self.mapHeight);
    //self.context.drawImage(self.mapSprite, 0, 0, self.canvasWidth, self.canvasHeight);
  
  
    self.drawRect(); 
    self.markers.forEach(m => {
        if(m.assetPair == 1){
          var markerText = "";
          self.context.drawImage(m.sprite, m.xpos,m.ypos, m.width,m.height);
          if(m.type == 0){
            markerText += this.nodeData.NodeData.AssetTag1.TAGID ;
            if(this.nodeData.NodeData.AssetPair1.AssetID != "")
              markerText += (this.nodeData.NodeData.AssetPair1.JobNumber != "")?"(Job:"+this.nodeData.NodeData.AssetPair1.JobNumber+")":"";
          }
          if(m.type == 1){
            markerText += this.nodeData.NodeData.EmployeeTag1.TAGID ;
            if(this.nodeData.NodeData.AssetPair1.EmployeeID != "")
              markerText += (this.nodeData.NodeData.AssetPair1.JobNumber != "")?"(Job:"+this.nodeData.NodeData.AssetPair1.JobNumber+")":"";
          }
          
          
          this.context.globalAlpha = 1;
         // this.context.scale(1, -1)
          this.context.fillText(markerText, m.xpos, m.ypos);

        } else if(m.assetPair == 2){
          var markerText = "";
          self.context.drawImage(m.sprite, m.xpos,m.ypos, m.width,m.height);
          if(m.type == 0){
            markerText += this.nodeData.NodeData.AssetTag2.TAGID ;
            if(this.nodeData.NodeData.AssetPair2.AssetID != "")
              markerText += (this.nodeData.NodeData.AssetPair2.JobNumber != "")?"(Job:"+this.nodeData.NodeData.AssetPair2.JobNumber+")":"";
          }
          if(m.type == 1){
            markerText += this.nodeData.NodeData.EmployeeTag2.TAGID ;
            if(this.nodeData.NodeData.AssetPair2.EmployeeID != "")
              markerText += (this.nodeData.NodeData.AssetPair2.JobNumber != "")?"(Job:"+this.nodeData.NodeData.AssetPair2.JobNumber+")":"";
          }
          
          
          this.context.globalAlpha = 1;
          //this.context.scale(1, -1)
          this.context.fillText(markerText, m.xpos, m.ypos);
        }
    });
    
  }

  drawGrid(){
    let self = this;
    self.context.lineWidth = 2;
    self.context.setLineDash([5]);
    for (var x = 0 ; x < self.canvasWidth; x += (this.relativeX/4)) {
      self.context.moveTo(x, 0);
      self.context.lineTo(x, self.canvasHeight);
    }

   for (var y = 0; y < self.canvasHeight; y += (this.relativeY/4)) {
      self.context.moveTo(0, y);
      self.context.lineTo(self.canvasWidth, y);
    }

    self.context.strokeStyle = "#ddd";
    self.context.stroke();
    self.context.setLineDash([]);
  }

  drawRect(){
    let self = this;
    if(self.tagPositions.length){
    self.context.lineWidth = 1;
    self.context.beginPath();
    //self.context.setLineDash([5]);

    self.context.moveTo(this.tagPositions[0][0], this.tagPositions[0][1]);
    self.context.lineTo(this.tagPositions[1][0], this.tagPositions[1][1]);
    if(self.isAchorsFixed == false){
      self.context.lineTo(this.tagPositions[3][0], this.tagPositions[3][1]);
      self.context.lineTo(this.tagPositions[2][0], this.tagPositions[2][1]);
      self.context.closePath();
      self.context.moveTo(this.tagPositions[1][0]/2, this.tagPositions[1][1]);
      self.context.lineTo(this.tagPositions[3][0]/2, this.tagPositions[3][1]);
    } else {
      self.context.lineTo(this.tagPositions[2][0], this.tagPositions[2][1]);
      self.context.lineTo(this.tagPositions[3][0], this.tagPositions[3][1]);
      
      self.context.closePath();
      self.context.moveTo(this.tagPositions[1][0]/2, this.tagPositions[1][1]);
      self.context.lineTo(this.tagPositions[2][0]/2, this.tagPositions[2][1]);
    }
    
    
   // self.context.lineTo(this.tagPositions[0][0], this.tagPositions[0][1]);
    
    self.context.fillText("Room1", this.tagPositions[0][0]+20, this.tagPositions[0][1]+20);
    self.context.fillText("Room2", this.tagPositions[1][0]-80, this.tagPositions[0][1]+20);
    self.context.strokeStyle = "#000000";
    self.context.stroke();
    self.context.setLineDash([]);
    
   // self.midpoint = new Position()
   
   // self.context.fill();
    }
  }

 

  
  openDialog(index:number): void {
    console.log("Indexx"+index);
    const dialogRef = this.dialog.open(MapView, {
      width: '60%',
      height: '80%',
      data: { movement: this.tempData[index],nodeData:this.nodeData}
    });
  }
  constructor(public dialog: MatDialog,private rtlsService: RTLSService,
    public hideApp: AppComponent

    ) {
      this.hideApp.hide = true;

    }


  ngOnInit() {
  }

}

@Component({
  template: `
        <div mat-dialog-title class="text-center f-16">Job ID: {{ movement.jobid }} Employee ID:{{ movement.employeeId }} Asset ID: {{movement.assestId}}</div>
        <mat-dialog-content >
             <canvas id="pcanvas" height='400' width='800' > </canvas>
        </mat-dialog-content>
        <mat-dialog-actions class="justify-content-around">
          <button mat-raised-button color="primary">Navigate</button>
          <button mat-raised-button color="primary">Identify</button>
          <button mat-raised-button color="primary" (click)="closeModel()">Exit</button>
        </mat-dialog-actions>
      `
})
export class MapView implements OnInit {
  canvas: any;
  context: any;
  mapSprite: any;
  emapSprite: any;
  mapWidth: number = 0;
  mapCenterX: number = 0;
  mapHeight:number = 0;
  mapCenterY: number = 0;
  scale: number =0;
  tagPositions: any = [];
  relativeX: number = 1;
  relativeY: number = 1;
  movement: Movement;
  nodeData: Transecmodel;
  isAchorsFixed: boolean = false;

  constructor(public dialogRef: MatDialogRef<MapView>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      console.log(data);
      this.movement = data['movement'];
      this.nodeData = data['nodeData'];
      this.mapSprite = new Image();
      this.mapSprite.src = "assets/img/Asset_tag1.png"
      this.emapSprite = new Image();
      this.emapSprite.src = "assets/img/Assest_tag.png"
     // setInterval(() => this.draw(),  (1000 / 60));
    }

  closeModel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.canvas = document.getElementById('pcanvas');
   
    this.context = this.canvas.getContext("2d");
    this.context.font = "14px Georgia";
    this.context.textAlign = "left";
    
   // this.context.transform(1, 0, 0, -1, 0, this.canvas.height);
    this.calcRelativeX();
    this.calcRelativeY();
    this.scale = Math.min(this.canvas.width / this.mapWidth, this.canvas.height / this.mapHeight);
    this.relativeX = this.canvas.width / this.mapWidth;
    this.relativeY = this.canvas.height / this.mapHeight;
    this.normalizeTagPositions();
   // this.draw();
    setInterval(() => this.draw(),  (1000 / 60));
   
  }

  drawProgressLine() {

  }
  normalizeTagPositions(){
    this.tagPositions = [];
    let x: number = this.nodeData.NodeData.AnchorTag1.Position.x * this.relativeX ;
    let y: number = this.nodeData.NodeData.AnchorTag1.Position.y  * this.relativeY ;
    this.tagPositions.push([x,y]);
    
    x = this.nodeData.NodeData.AnchorTag2.Position.x * this.relativeX ;
    y = this.nodeData.NodeData.AnchorTag2.Position.y  * this.relativeY ;
    this.tagPositions.push([x,y]);
    x = this.nodeData.NodeData.AnchorTag3.Position.x * this.relativeX ;
    y = this.nodeData.NodeData.AnchorTag3.Position.y  * this.relativeY ;
    this.tagPositions.push([x,y]);
    x = this.nodeData.NodeData.AnchorTag4.Position.x * this.relativeX ;
    y = this.nodeData.NodeData.AnchorTag4.Position.y  * this.relativeY ;
    this.tagPositions.push([x,y]);
  }
  
  calcRelativeX(){
    let xmax: number = 1;
    let xcords = [this.nodeData.NodeData.AnchorTag1.Position.x,this.nodeData.NodeData.AnchorTag2.Position.x,
      this.nodeData.NodeData.AnchorTag2.Position.x,this.nodeData.NodeData.AnchorTag2.Position.x]
    xmax = Math.max(...xcords);
    this.mapWidth = xmax - 0;
    this.mapCenterX = (xmax + 0)/2;

}

calcRelativeY(){
  let ymax: number = 1;
  let ycords = [this.nodeData.NodeData.AnchorTag1.Position.y,this.nodeData.NodeData.AnchorTag2.Position.y,
  this.nodeData.NodeData.AnchorTag3.Position.y,this.nodeData.NodeData.AnchorTag4.Position.y]
  ymax = Math.max(...ycords);
  this.mapHeight = ymax - 0;
  this.mapCenterY = (ymax + 0)/2;
  }

  draw() {
    let self = this;
    
    self.context.clearRect(0,0, self.canvas.width, self.canvas.height);
    self.drawGrid();
    //self.context.fillStyle = "#E8E8EE";
    //this.context.fillStyle = "#666";
    //this.context.globalAlpha = 0.5;
    //self.context.fillRect(0, 0, self.canvas.width, self.canvas.height);
    

    
    //self.context.drawImage(self.mapSprite, 0, 0, self.canvasWidth, self.canvasHeight);
    
    
    self.drawRect(); 
   
    self.drawPath();
  }

  drawGrid(){
      let self = this;
      //tx.lineWidth = 10;
      self.context.lineWidth = 0.5;
      self.context.strokeStyle = "#000000";
      self.context.setLineDash([5,5])

      for (var x = 0 ; x < self.canvas.width; x += (this.relativeX/4)) {
        self.context.moveTo(x, 0);
        self.context.lineTo(x, self.canvas.height);
      }

    for (var y = 0; y < self.canvas.height; y += (this.relativeY/4)) {
        self.context.moveTo(0, y);
        self.context.lineTo(self.canvas.width, y);
        
      }
      self.context.stroke();
      self.context.lineWidth = 1;
      self.context.strokeStyle = "#000";
      self.context.setLineDash([]);
     
      
  }
  drawPath(){
    let self = this;
    let i: number = 0;
    let bStart: boolean = true;
    let l: number = this.movement.nodedata.length;;
    let b: number = this.movement.nodedata[l-1].Positions.length;
    self.context.lineJoin = self.context.lineCap = 'round';
    // self.context.beginPath();
    self.context.strokeStyle = "#000000";
    self.context.lineWidth = 3;
    self.context.setLineDash([10]);
    
    for(i=0; i < this.movement.nodedata.length;i++){
       for(let j=0;j < this.movement.nodedata[i].Positions.length; j++){
         if(bStart){
          self.context.moveTo(this.movement.nodedata[i].Positions[j].x * this.relativeX,this.movement.nodedata[i].Positions[j].y * this.relativeY);
          bStart = false;
         }
         else{
          self.context.lineTo(this.movement.nodedata[i].Positions[j].x * this.relativeX,this.movement.nodedata[i].Positions[j].y * this.relativeY);
         }
       }
    }

  
    self.context.stroke();
   // self.context.closePath();
    self.context.lineWidth = 1;
    self.context.strokeStyle = "#000";
    self.context.setLineDash([]);

    self.context.drawImage(this.mapSprite, this.movement.nodedata[0].Positions[b-1].x * this.relativeX,this.movement.nodedata[0].Positions[b-1].y*this.relativeY, 32,32);
    self.context.drawImage(this.emapSprite, this.movement.nodedata[l-1].Positions[b-1].x * this.relativeX,this.movement.nodedata[l-1].Positions[b-1].y*this.relativeY, 32,32);
    
  }

  /* drawPath1(){
    let self = this;
    let i: number = 0;
    // self.context.setLineDash([2]);
    self.context.beginPath();
    self.context.strokeStyle = "#e4332c";
    self.context.lineWidth = 3;
    self.context.moveTo(this.movement.nodedata[0].Position.x * this.relativeX, this.movement.nodedata[0].Position.y*this.relativeY);
    
    //self.context.fillText("start", this.movement.nodedata[0].Position.x * this.relativeX,this.movement.nodedata[0].Position.y*this.relativeY);
    for (i = 1; i < this.movement.nodedata.length - 2; i ++)
    {
       var xc = (this.movement.nodedata[i].Position.x*this.relativeX + this.movement.nodedata[i + 1].Position.x * this.relativeX) / 2;
       var yc = (this.movement.nodedata[i].Position.y * this.relativeY + this.movement.nodedata[i + 1].Position.y*this.relativeY) / 2;
       self.context.quadraticCurveTo(this.movement.nodedata[i].Position.x * this.relativeX, this.movement.nodedata[i].Position.y * this.relativeY, xc, yc);
    }
  // curve through the last two points
    self.context.quadraticCurveTo(this.movement.nodedata[i].Position.x * this.relativeX, this.movement.nodedata[i].Position.y * this.relativeY, this.movement.nodedata[i].Position.x * this.relativeX,this.movement.nodedata[i].Position.y * this.relativeY);
    //self.context.fillText("end", this.movement.nodedata[this.movement.nodedata.length-1].Position.x * this.relativeX,this.movement.nodedata[this.movement.nodedata.length-1].Position.y*this.relativeY);
    self.context.drawImage(this.mapSprite, this.movement.nodedata[0].Position.x * this.relativeX,this.movement.nodedata[0].Position.y*this.relativeY, 32,32);
    self.context.drawImage(this.emapSprite, this.movement.nodedata[i-1].Position.x * this.relativeX,this.movement.nodedata[i-1].Position.y*this.relativeY, 32,32);
    self.context.stroke();
    self.context.closePath();
    self.context.lineWidth = 1;
      self.context.strokeStyle = "#000";

      
   // self.context.renderAll();
  } */

  drawRect(){
    let self = this;
    if(self.tagPositions.length){
      
   self.context.beginPath();
   self.context.lineWidth = 4;
   // self.context.setLineDash([10]);
    self.context.strokeStyle = "#000";
  
    if(self.isAchorsFixed == false){
      self.context.moveTo(this.tagPositions[0][0], this.tagPositions[0][1]);
      self.context.lineTo(this.tagPositions[1][0], this.tagPositions[1][1]);
      self.context.lineTo(this.tagPositions[3][0], this.tagPositions[3][1]);
      self.context.lineTo(this.tagPositions[2][0], this.tagPositions[2][1]);
      self.context.closePath();
      self.context.moveTo(this.tagPositions[1][0]/2, this.tagPositions[1][1]);
      self.context.lineTo(this.tagPositions[3][0]/2, this.tagPositions[3][1]);
    } else {
      self.context.moveTo(this.tagPositions[0][0], this.tagPositions[0][1]);
      self.context.lineTo(this.tagPositions[1][0], this.tagPositions[1][1]);
      self.context.lineTo(this.tagPositions[2][0], this.tagPositions[2][1]);
      self.context.lineTo(this.tagPositions[3][0], this.tagPositions[3][1]);
     
       self.context.closePath();
      self.context.moveTo(this.tagPositions[1][0]/2, this.tagPositions[1][1]);
      self.context.lineTo(this.tagPositions[2][0]/2, this.tagPositions[2][1]);
    }
    
    self.context.fillText("Room1", this.tagPositions[0][0]+20, this.tagPositions[0][1]+20);
    self.context.fillText("Room2", this.tagPositions[1][0]-80, this.tagPositions[0][1]+20);
   
    self.context.stroke();
    self.context.closePath();
    self.context.strokeStyle = "#000";
    self.context.lineWidth = 1;
   // self.context.fill();
   
   
    }
  }

  
}



