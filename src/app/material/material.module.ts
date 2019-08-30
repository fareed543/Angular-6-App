import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatMenuModule, MatButtonModule, MatCheckboxModule, MatSortModule, MatInputModule, MatDialogModule, MatFormFieldModule, MatNativeDateModule, MatButtonToggleModule, MatTabsModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Datatables
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule,
    MatMenuModule, MatToolbarModule, MatGridListModule,
    MatExpansionModule, MatCardModule,
    MatTooltipModule, MatListModule, MatTableModule,
    NgxDatatableModule
    // MDBBootstrapModule,
  ],
  exports: [
    CommonModule,
    MatButtonModule, MatCheckboxModule,
    MatMenuModule, MatToolbarModule, MatGridListModule,
    MatExpansionModule, MatCardModule,
    MatTooltipModule, MatListModule, MatIconModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatInputModule, MatDialogModule, MatFormFieldModule,
    NgxDatatableModule, MatSelectModule, MatRadioModule,
    MatDatepickerModule, MatNativeDateModule, MatChipsModule,
    ReactiveFormsModule, FormsModule, MatButtonToggleModule,
    MatTabsModule
    // MDBBootstrapModule,
  ],
  providers: [
    MatDatepickerModule
  ],
  declarations: []
})
export class MaterialModule { }
