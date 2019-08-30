import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';
// import { Http, ResponseContentType } from '@angular/http';

import { FormBase } from '../shared/form-generator/shared/form-base.model';
import { FormString } from '../shared/form-generator/shared/form-string.model';
import { FormToggle } from '../shared/form-generator/shared/form-toggle.model';
import { FormGroup } from '../shared/form-generator/shared/form-group.model';
import { SolutionsService } from './services/solutions.services';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrls: ['layout.component.scss']
})
export class LayoutComponent {
  // title = 'app';
  fields: FormBase<any>[];
  solutions: any[];
  droppedItems = {};
  panels = [];
  panelOpenState = true;
  loading = true;

  shouldRun = true;

  devices = [
    { name: 'Device 1' },
    { name: 'Device 2' },
    { name: 'Device 3', }
  ];

  @ViewChild('panelGroup') panelGroup;

  constructor(
    private solutionsService: SolutionsService,
    private title: Title,
    // private http: Http,
  ) { }

  ngOnInit(): void {
    this.solutionsService.getSolutions().subscribe((res) => {
      this.solutions = res;
      this.loading = false;
      this.panels.push('Panel ' + (this.panels.length + 1));
    });
    this.title.setTitle('Spatika IoT');
  }

  onItemDrop(e: any) {
    this.droppedItems[e.name] = e.fields;
  }

  reset(): void {
    console.log(`Widget created with following fields: `);
    console.log(this.droppedItems);
    this.panels = [];
  }

  addPanel(): void {
    this.panels.push('Panel ' + (this.panels.length + 1));
  }

  close(panel: string) {
    this.panels.splice(this.panels.indexOf(panel), 1);
  }
}
