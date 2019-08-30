import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RTLSService {
    url = 'http://transec-dev.westus2.cloudapp.azure.com:8080/api/NodeData/latest/';
    purl = 'http://transec-dev.westus2.cloudapp.azure.com:8080/api/NodeData/updatedata'
    constructor(private http: HttpClient) { }

    getLatestPostion(uuid:string): Observable<any> {
       let r: string = this.url + uuid;
        return this.http.get<any>(r);
    }

    updatePairing(data: any): Observable<any> {
        return this.http.put<any>(this.purl,data);
    }
}
