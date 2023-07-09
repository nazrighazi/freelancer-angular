import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../data access/auth.service';
import { Route, Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.scss'],
})
export class ClientLoginComponent {
  isLogin: Boolean = true;
  authStep: number = 2;
  isLoading: Boolean = false;
  errorMessage: string = '';
  authForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.route.navigate(['admin/dashboard']);
    }
  }

  onChangeAuth() {
    this.errorMessage = '';
    this.authForm.reset();
    this.isLogin = !this.isLogin;
    if (!this.isLogin) {
      this.authForm.controls['name'].setValidators([Validators.required]);
      this.authForm.controls['email'].setValidators([
        Validators.required,
        Validators.email,
      ]);
    } else {
      this.authForm.controls['name'].clearValidators();
      this.authForm.controls['email'].clearValidators();
    }
    this.authForm.controls['name'].updateValueAndValidity();
    this.authForm.controls['email'].updateValueAndValidity();
  }

  onSubmit() {
    if (this.authForm.valid) {
      this.errorMessage = '';
      this.isLoading = true;
      if (this.isLogin) {
        this.authService
          .login(this.authForm.value)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
          .subscribe(
            (result) => {
              if (result) {
                localStorage.setItem('access_token', result.access_token);
                localStorage.setItem('refresh_token', result.refresh_token);
                this.route.navigate(['admin/dashboard']);
              }
            },
            (error) => {
              console.log(error);
              this.errorMessage = error.error.message;
            }
          );
      } else {
        this.authService
          .register(this.authForm.value)
          .pipe(
            finalize(() => {
              this.isLoading = false;
            })
          )
          .subscribe((result) => {
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
