import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import {
  Observable,
  catchError,
  retry,
  switchMap,
  throwError,
  timer,
} from 'rxjs';
import { AuthService } from '../data access/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private inject: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authService = this.inject.get(AuthService);

    let token = authService.getToken();
    let url = `${environment.API_URL}auth/admin/refresh`;
    if (!token || req.url == url) {
      return next.handle(req);
    }
    let jwtToken = req.clone({
      setHeaders: {
        Authorization: `bearer ${token}`,
      },
    });

    return next.handle(jwtToken).pipe(
      retry({
        count: 3,
        delay: (_, retryCount) => timer(retryCount * 1000),
      }),
      catchError((errordata) => {
        if (errordata.status === 401) {
          // need to implement logout
          // authService.Logout();
          // refresh token logic
          return this.handleRefrehToken(req, next);
        }
        return throwError(errordata);
      })
    );
  }

  handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
    let authservice = this.inject.get(AuthService);
    return authservice.GenerateRefreshToken().pipe(
      switchMap((data: any) => {
        authservice.SaveTokens(data);
        return next.handle(this.AddTokenheader(request, data.access_token));
      }),
      catchError((errodata) => {
        authservice.Logout();
        return throwError(errodata);
      })
    );
  }

  AddTokenheader(request: HttpRequest<any>, token: any) {
    return request.clone({
      headers: request.headers.set('Authorization', 'bearer ' + token),
    });
  }
}
