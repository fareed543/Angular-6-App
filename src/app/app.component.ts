import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  menuItems: any;
  public hide: boolean;
  showMenu() {
    if (localStorage.getItem('transec_user1') || localStorage.getItem('transec_user2')) {
      this.hide = true;
    } else {
      this.hide = true;
    }
  }

  constructor(
    private route: Router
  ) { 
    if(localStorage.getItem('transec_user1') || localStorage.getItem('transec_user2')) {
      this.hide = true;
    } else {
      this.hide = false;
    }
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['/login']);
    this.hide = false;
  }

  ngOnInit() {
    this.menuItems = [
      {
        name: 'Home', link: 'home', icon: 'assets/img/Home-light.svg', iconAtv: 'assets/img/Home-active.svg',
      },
      {
        name: 'Jobs', link: 'jobs', icon: 'assets/img/job_dark-light.svg', iconAtv: 'assets/img/job_active.svg'
      },
      {
        name: 'Assests', link: 'asset', icon: 'assets/img/assests-light.svg', iconAtv: 'assets/img/assests-active.svg'
      },
      {
        name: 'Employees', link: 'employees', icon: 'assets/img/employee-light.svg', iconAtv: 'assets/img/employee-active.svg'
      },
      // {
      //   name: 'Locations', link: 'locations', icon: 'assets/img/location-dark.svg', iconAtv: 'assets/img/location-active.svg'
      // },
      {
        name: 'Alerts', link: 'alerts', icon: 'assets/img/alert-light.svg', iconAtv: 'assets/img/alert-active.svg'
      },
      {
        name: 'Reports', link: 'reports', icon: 'assets/img/reports-light.svg', iconAtv: 'assets/img/reports-active.svg'
      },
      {
        name: 'Settings', link: 'settings', icon: 'assets/img/settings-light.svg', iconAtv: 'assets/img/settings-active.svg'
      }
    ];
  }
}
