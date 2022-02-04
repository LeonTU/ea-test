import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error) => {
        let errorMessage = '';
        if (error.status === 429) {
          errorMessage = 'Too many requests, please try again later.';
          return throwError(errorMessage);
        }
        if (error.status === 500) {
          errorMessage = 'Server errors, please try again later or contact the administrator.';
          return throwError(errorMessage);
        }

        return throwError(error);
      })
    );
  }
}
