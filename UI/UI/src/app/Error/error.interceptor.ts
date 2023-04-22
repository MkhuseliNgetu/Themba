import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(Request: HttpRequest<unknown>, Next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    return Next.handle(Request).pipe(

      retry(1),catchError((ThembaErrors: HttpErrorResponse) =>{

        let ThembaErrorMessages = '';

        if(ThembaErrors.error instanceof ErrorEvent){

          ThembaErrorMessages = 'Error: ' + ThembaErrors.error.message;

        }else{

          ThembaErrorMessages = 'Server Error: ' + ThembaErrors.status + "\n"+ 'Error: ' + ThembaErrors.message;
        }

        console.log(ThembaErrorMessages)
        return throwError(ThembaErrorMessages);

      })




    );
  }
}
