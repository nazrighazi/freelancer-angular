import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(userCred: any) {
    let reqBody = {
      username: userCred.username,
      password: userCred.password,
    };
    return this.http.post<any>(
      environment.API_URL + 'auth/admin/signin',
      reqBody
    );
  }

  isLoggedIn() {
    return localStorage.getItem('access_token') !== null;
  }

  getToken() {
    return localStorage.getItem('access_token') || null;
  }

  GenerateRefreshToken() {
    const requestOptions = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.GetRefreshToken()}`
      ),
    };
    return this.http.post(
      environment.API_URL + 'auth/admin/refresh',
      null,
      requestOptions
    );
  }

  GetRefreshToken() {
    return localStorage.getItem('refresh_token') || '';
  }

  SaveTokens(tokendata: any) {
    localStorage.setItem('access_token', tokendata.access_token);
    localStorage.setItem('refresh_token', tokendata.refresh_token);
  }

  Logout() {
    localStorage.clear();
    this.router.navigateByUrl('admin/login');
  }
}
