import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, concatMap } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  private readonly tokenKey = 'token';

  constructor(
    private loaderService:LoaderService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(this.tokenKey);
    this.loaderService.show();

    if (token) {
      const clonedRequest = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

      return next.handle(clonedRequest).pipe(
        concatMap((event: HttpEvent<any>) => {
          return new Observable<HttpEvent<any>>(observer => {
            observer.next(event);
            observer.complete();
          })
        }),
        finalize(() => {
          this.loaderService.hide();
        })
      );
    } else {
        this.loaderService.hide();
        return next.handle(req); 
    }
  }
}
