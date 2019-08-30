import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-devices',
    templateUrl: 'devices.component.html',
})

export class DevicesComponent implements OnInit {
    tweet = {
        body: '...',
        likesCount: 10,
        isActive: true,
    };
    constructor(private title: Title) { }
    ngOnInit() {
        this.title.setTitle('Spatika IoT | Devices');
    }
}
