import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
 selector: 'app-design',
 templateUrl: 'design.component.html',
})

export class DesignComponent {

 @Input('likesCount') likesCount: number;
 @Input('isActive') isActive: boolean;

 onLike() {
  this.likesCount += (this.isActive) ? -1 : 1;
  this.isActive != this.isActive;
 }

 constructor(private title: Title) { }

 ngOnInit(): void {
  this.title.setTitle('Spatika IoT | Design');
 }
}
