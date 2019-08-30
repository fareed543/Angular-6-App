import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { Movement } from '../models/movement.model'; 
import { MatPaginator } from "@angular/material";

export class MovementDataSource implements DataSource<Movement> {

    private lessonsSubject = new BehaviorSubject<Movement[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private _pagination : MatPaginator) {}

    connect(collectionViewer: CollectionViewer): Observable<Movement[]> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

    loadLessons(movement: Movement[], filter = '',
                sortDirection = 'asc', pageIndex = 0, pageSize = 3) {
        this.loadingSubject.next(true);
        this.lessonsSubject.next(movement);
    }    
}
