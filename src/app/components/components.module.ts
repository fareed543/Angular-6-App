import { NgModule } from '@angular/core';
import { HomeComponent, MapView } from './home/home.component';
import { AssestsComponent, AssetViewComponent } from './assests/assests.component';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from '../material/material.module';
import { EmployeesComponent, ActioinListComponent } from './employees/employees.component';
// import { AssetViewComponent } from './assests/assests-view.component';
import { LocationsComponent } from './locations/locations.component';
import { RouterModule } from '@angular/router';
import { AlertsComponent } from './alerts/alerts.component';
import { TransecServices } from './services/transec.services';
import { RTLSService } from './services/rtls.services';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';
import { JobsComponent, AddJobsComponent } from './jobs/jobs.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        HomeComponent, AssestsComponent, SearchComponent, 
        EmployeesComponent,
        LocationsComponent, AssetViewComponent,
        MapView, AlertsComponent,
        ActioinListComponent,
        ReportsComponent,
        SettingsComponent, JobsComponent, AddJobsComponent,
        LoginComponent, RegisterComponent,
    ],
    imports: [
        MaterialModule, RouterModule, FormsModule,
        BrowserAnimationsModule, ReactiveFormsModule
    ],
    entryComponents: [
        MapView, ActioinListComponent, AssetViewComponent, AddJobsComponent
    ],
    providers: [
        TransecServices,
        RTLSService
    ]
})

export class ComponentsModule { }
