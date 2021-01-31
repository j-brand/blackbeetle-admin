import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from '@core/services/loading.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private _loading: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this._loading.setLoadting(true, request.url);
    return next.handle(request).pipe(
      catchError((err) => {
        this._loading.setLoadting(false, request.url);
        return throwError(err);
      }),
      map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this._loading.setLoadting(false, request.url);
        }
        return evt;
      })
    );
  }
}
