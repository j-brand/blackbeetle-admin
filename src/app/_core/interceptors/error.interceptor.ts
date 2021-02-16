import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 419) {

          //Logout if Unauthorized or CSRF token missmatch
          this.authService.logout();
          location.reload();
        } else if (err.status === 422) {
          return throwError(err.error);
        }

        const error = err.error.message || err.statusText;
        return throwError(err);
      })
    );
  }
}
