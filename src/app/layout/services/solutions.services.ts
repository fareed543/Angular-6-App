import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SolutionsService {
    url = '/api/solutionsProxy/v1/solutions';
    constructor(private http: HttpClient) { }

    getSolutions(): Observable<any> {
        return this.http.get<any>(this.url);
    }
}
