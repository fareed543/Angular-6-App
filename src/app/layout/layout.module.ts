import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';

import { NgDragDropModule } from 'ng-drag-drop';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { LayoutComponent } from './layout.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { TopbarComponent } from '../shared/topbar/topbar.component';
import { LayoutRoutingModule } from './layout.routes';
import { FooterComponent } from '../shared/footer/footer.component';
import { FormGeneratorModule } from '../shared/form-generator/form-generator.module';
import { FieldChipsComponent } from '../shared/field-chips/field-chips.component';
import { DropPanelComponent } from './drop-panel/drop-panel.component';
import { SolutionsService } from './services/solutions.services';
import { DesignComponent } from './Design/design.component';
import { DevicesComponent } from './Devices/devices.component';
// import { SearchComponent } from '../shared/search/search.component'

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    FieldChipsComponent,
    DropPanelComponent,
    DesignComponent,
    DevicesComponent,
    // SearchComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    RouterModule,
    FormGeneratorModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    NgDragDropModule.forRoot(),
    MatToolbarModule,
    MatGridListModule,
    MatExpansionModule,
    MatButtonModule,
    MatCheckboxModule, MatMenuModule,
    MatCardModule, MatTooltipModule,
    MatListModule, MatSidenavModule,
    MaterialModule,
  ],
  exports: [
    LayoutComponent,
    SidebarComponent,
    TopbarComponent,
    FooterComponent,
    FieldChipsComponent,
    DropPanelComponent,
    MaterialModule,
    // SearchComponent
  ],
  providers: [
    SolutionsService
  ]
})
export class LayoutModule { }
