import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ComponentsModule } from './components/components.module';
import { AssestsComponent } from './components/assests/assests.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { LocationsComponent } from './components/locations/locations.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/_guards/auth.guard';
// import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
    // { path: '', loadChildren: './layout/layout.module#LayoutModule' },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    {
        path: 'asset',
        component: AssestsComponent,
        canActivate: [AuthGuard],
        children: [
            // {path: 'asset/:id', component: AssestsViewComponent}
        ]
    },
    
    { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] },
    { path: 'locations', component: LocationsComponent, canActivate: [AuthGuard] },
    { path: 'alerts', component: AlertsComponent, canActivate: [AuthGuard] },
    { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'jobs', component: JobsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
