import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

const userData = [
  {
    monday: { savedMoney: 14.5 },
    tuesday: { savedMoney: 25.14 },
    wednesday: { savedMoney: 3.17 },
  },
  {
    monday: { savedMoney: 34.1 },
    tuesday: { savedMoney: 1.5 },
    wednesday: { savedMoney: 29.64 },
  }
];

@Injectable()
export class AppInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.endsWith('user_data') && request.method === 'GET') {
      return new Observable(observer => {
        observer.next(new HttpResponse({body: userData, status: 200}));
        observer.complete();
      })
    }
    return next.handle(request);
  }
}
