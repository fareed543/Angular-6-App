import { TagInfo, TagInfoLog } from '../models/celestica.model';
export class Movement {
    employeeId: string;
    assestId: string;
    jobid: string;
    currentLocation: string;
    pastLocation: string;
    startdatetime: any;
    enddatetime: any;
    starttime: any;
    endtime: any;
    duration: string;
    battery: number;
    nodedata: TagInfoLog [];
    actions: any;
    lastPosX: number;
    lastPosY: number;

    constructor(){
        this.employeeId = "";
        this.jobid = "";
        this.assestId = "";
        this.currentLocation = "";
        this.pastLocation = "";
        this.starttime = null;
        this.endtime = null;
        this.duration = "";
        this.battery = 0.8;
        this.actions = "";
        this.lastPosX = 0;
        this.lastPosY = 0;
        this.nodedata = [];
    }
  }