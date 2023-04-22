import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserServiceService } from './user-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private AuthenticationService: UserServiceService) {}

  intercept(Request: HttpRequest<unknown>, Next: HttpHandler): Observable<HttpEvent<any>> {

    const AuthToken = this.AuthenticationService.GetAuthToken();
    const AuthTokenRequest =

    Request.clone({headers: Request.headers.set("Authorization","Bearer "+ AuthToken)})
    return Next.handle(Request);
  }
}
