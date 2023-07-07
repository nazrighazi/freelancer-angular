import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../data access/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.scss'],
})
export class ClientLoginComponent {
  isLogin: Boolean = true;
  authStep: number = 2;
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.route.navigate(['admin/dashboard']);
    }
  }

  onChangeAuth() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (this.authForm.valid) {
      if (this.isLogin) {
        this.authService.login(this.authForm.value).subscribe((result) => {
          if (result) {
            localStorage.setItem('access_token', result.access_token);
            localStorage.setItem('refresh_token', result.refresh_token);
            this.route.navigate(['admin/dashboard']);
          }
        });
      }
    }
  }
}
