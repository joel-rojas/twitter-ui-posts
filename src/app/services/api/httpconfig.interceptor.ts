import { LoadingService } from './../ui/loading.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) { }
  public apiCallsQty = 0;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status === 200) {
          this.apiCallsQty -= 1;
        } else {
          this.apiCallsQty += 1;
        }
        this.loadingService.setLoadingValue(this.apiCallsQty);
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        this.loadingService.setLoadingValue(-1);
        return throwError(err);
      })
    );
  }
}
