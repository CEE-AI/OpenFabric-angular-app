import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWT } from '../service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem(JWT)

    if(token){
      const clonedReq = request.clone({
        headers: request.headers.set('Authorization',
        'Bearer' +token)
      });
      return next.handle(clonedReq);
    }else{
      return next.handle(request);
    }
  }
}
