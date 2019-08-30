export interface transecModel {
    NodeData : Node_Data,
    TimeStamp: string,
    UUID: string,
    _id: string
}

export interface Position {
    x: number;
    y: number;
    z: number;
}

export interface AnchorTag1 {
    TAGID: string;
    Position: Position;
}

export interface AnchorTag2 {
    TAGID: string;
    Position: Position;
}

export interface AnchorTag3 {
    TAGID: string;
    Position: Position;
}

export interface AnchorTag4 {
    TAGID: string;
    Position: Position;
}

export interface AssetTag {
    TAGID: string;
    Position: Position;
}

export interface EmployeeTag {
    TAGID: string;
    Position: Position;
}

export interface Node_Data {
    AnchorTag1: AnchorTag1;
    AnchorTag2: AnchorTag2;
    AnchorTag3: AnchorTag3;
    AnchorTag4: AnchorTag4;
    JobNumber: string;
    AssetTag: AssetTag;
    EmployeeTag: EmployeeTag;
}