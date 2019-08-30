export class Marker {
    type: number;
    assetPair: number;
    jobid: string;
    sprite: any;
    width: number;
    height: number;
    xpos: number;
    ypos: number;

    constructor(type=0,x=10,y=10,pairindex) {
        this.sprite = new Image();
        this.type = type;
        if(type == 0){
            this.sprite.src = "assets/img/Assest_tag.png"
        } else {
            this.sprite.src = "assets/img/employee_tag.png"
        }
        this.width = 16;
        this.height = 16;
        this.xpos = x;
        this.ypos = y;
        this.assetPair = pairindex;
        this.jobid = "";
    }
}