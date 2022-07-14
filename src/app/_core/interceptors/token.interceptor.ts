import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  headerName = 'X-XSRF-TOKEN';

  constructor(private tokenService: HttpXsrfTokenExtractor) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //if the request goes to the API
    if (req.url.startsWith(environment.publicUrl)) {
      req = req.clone({
        withCredentials: true,
      });

      if (req.method === 'GET' || req.method === 'HEAD') {
        return next.handle(req);
      }
      const token = this.tokenService.getToken();

      // Add CSRF token to request header
      if (token !== null && !req.headers.has(this.headerName)) {
        req = req.clone({ headers: req.headers.set(this.headerName, token) });
      }
    }
    return next.handle(req);
  }
}
