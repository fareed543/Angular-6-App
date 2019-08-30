import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../shared/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  hide: boolean;
  loginForm: FormGroup;
  private formSubmitAttempt: boolean;

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  uuid = new FormControl('', [Validators.required]);

  authenticationService: AuthenticationService

  constructor(
    authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    if(localStorage.getItem('transec_user1') || localStorage.getItem('transec_user2')) {
      this.router.navigate(['/home']);
    } else {
      localStorage.clear();
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  }

  onLogin() {
    let key = this.loginForm.get('username').value;
    let value = [
      { 
        password: this.loginForm.get('password').value, 
      }
    ];

    localStorage.setItem(key, JSON.stringify(value));
    this.router.navigate(['/home'])
    this.hide = false;
  }

}
