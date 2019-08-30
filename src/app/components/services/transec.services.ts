import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';
import { transecModel } from './transec.model';

@Injectable()

export class TransecServices {
    private transec: transecModel[] = [];
    private transecUpdates = new Subject<transecModel[]>();

    url = 'http://transec-dev.westus2.cloudapp.azure.com:8080/api/NodeData/latest/00000001-0002-0001-0000-000000000001'
    constructor(private http: HttpClient) { }

    getPosition() {
        return this.http.get<any>(this.url);
        // return this.http.get<any>(this.url)
        //     .subscribe((transecData) => {
        //         this.transec = transecData;
        //         console.log(this.transec.TimeStamp);
        //     })
    }
}