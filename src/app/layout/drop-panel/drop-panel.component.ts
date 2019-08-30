import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-drop-panel',
    templateUrl: 'drop-panel.component.html',
    styleUrls: ['drop-panel.component.scss']
})
export class DropPanelComponent {
    title = 'app-drop-panel';
    droppedItems = [];
    @Input() name: string;
    @Output() selectedFields: Subject<any> = new Subject();
    @Output() deleteMe: Subject<boolean> = new Subject();
    onItemDrop(e: any) {
        this.droppedItems.push(e.dragData);
        this.selectedFields.next({name: this.name, fields: this.droppedItems});
    }
    reset(): void {
        this.droppedItems = [];
    }
    delete() {
        this.deleteMe.next(true);
    }
}
