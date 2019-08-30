
import { NodeData } from '../models/celestica.model';

export class Transecmodel {
    UUID: string;
    TimeStamp: string;
    NodeData: NodeData;
   
    
    constructor() {
       this.UUID = "";
       this.TimeStamp = "";
       this.NodeData = new NodeData();
    }
}