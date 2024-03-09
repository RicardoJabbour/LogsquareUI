import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, finalize, concatMap } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
  private readonly tokenKey = 'token'; // Replace with your actual token key

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(this.tokenKey);

    if (token) {
      // Clone the request and add the Authorization header with the token
      const clonedRequest = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

      return next.handle(clonedRequest).pipe(
        concatMap((event: HttpEvent<any>) => {
          return new Observable<HttpEvent<any>>(observer => {
            observer.next(event);
            observer.complete();
          }).pipe(
            delay(0) // Add delay to show the loading bar (request is too fast)
          );
        }),
        finalize(() => {
          // Do something on completion (optional)
        })
      );
    } else {
      // Handle the case where no token is found in local storage (e.g., redirect to login)
      console.error('No token found in local storage');
      return next.handle(req); // Or throw an error or redirect to login
    }
  }
}
