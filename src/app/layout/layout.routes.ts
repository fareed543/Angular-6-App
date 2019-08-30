import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DesignComponent } from './Design/design.component';
import { DevicesComponent } from './Devices/devices.component';

const routes: Routes = [
    // {
    //     path: '',
    //     component: LayoutComponent
    // },
    { path: 'design', component: DesignComponent },
    { path: 'devices', component: DevicesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
