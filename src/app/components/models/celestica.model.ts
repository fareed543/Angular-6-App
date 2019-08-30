export class TagPosition {
    x: number;
    y: number;
    z: number;
    constructor() {
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
    }
}
class TagPair {
    JobNumber: string;
    AssetID: string;
    EmployeeID: string;
    Timestamp: any;
    constructor() {
        this.JobNumber = "";
        this.AssetID = "";
        this.EmployeeID = "";
        this.Timestamp = null;
    }
}

export class TagInfo {
    TAGID: string;
    Position: TagPosition;
    JobNumber: string;
    constructor() {
        this.TAGID = "";
        this.Position = new TagPosition();
        this.JobNumber = "";
    }
}

export class TagInfoLog {
    TAGID: string;
    Positions: TagPosition[];
}

export class NodeData {
    AnchorTag1: TagInfo;
    AnchorTag2: TagInfo;
    AnchorTag3: TagInfo;
    AnchorTag4: TagInfo;
    AssetTag1: TagInfoLog;
    AssetTag2: TagInfoLog;
    EmployeeTag1: TagInfoLog;
    EmployeeTag2: TagInfoLog;
    AssetPair1: TagPair;
    AssetPair2: TagPair;
    
    constructor() {
        this.AnchorTag1 = new TagInfo();
        this.AnchorTag2 = new TagInfo();
        this.AnchorTag3 = new TagInfo();
        this.AnchorTag4 = new TagInfo();
        this.AssetTag1 = new TagInfoLog();
        this.AssetTag2 = new TagInfoLog();
        this.EmployeeTag1 = new TagInfoLog();
        this.EmployeeTag1 = new TagInfoLog();
        this.AssetPair1 = new TagPair();
        this.AssetPair2 = new TagPair();
    }
}