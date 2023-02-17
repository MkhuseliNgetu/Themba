import { Injectable } from '@angular/core';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private HTTP: HttpClient) { }

  private AuthToken!: String;
  //Counselors #1
  RegistrationService(CounselorUsername: String, CounselorPasscode: String): any {

    this.HTTP.post<{Message: String}>('https://localhost:3000/Themba/Register',
    {Username:CounselorUsername, Password: CounselorPasscode})
    .pipe(retry(2),catchError(this.AuthenticationError))
    .subscribe(RegistrationStatus => {alert(RegistrationStatus.Message)})
  }
  //Counselors #2
  LoginService(SuppliedCounselorUsername: String, SuppliedCounselorPasscode: String): any {

    this.HTTP.post<{Message: String, Token: String}>('https://localhost:3000/Themba/Login',
    {Username:SuppliedCounselorUsername, Password: SuppliedCounselorPasscode})
    .pipe(retry(2),catchError(this.AuthenticationError))
    .subscribe(LoginStatus => {const Token = LoginStatus.Token; this.AuthToken = Token; 
      alert(JSON.stringify(LoginStatus.Message))})
  }

  //Patients

  //Counselor & Patients #1
  GetAuthToken(){

    return this.AuthToken;
  }

  //Counselor & Patients #2
  AuthenticationError(AuthError: HttpErrorResponse){

    let ThembaErrorMessage = "";

    if(AuthError.error instanceof ErrorEvent){

      ThembaErrorMessage = 'Error: ' + AuthError.error.message;
      alert(AuthError)
      
    } else{

      ThembaErrorMessage = 'Server Error: ' + AuthError.status + "\n"+ 'Error: ' + AuthError.error.message;
      alert(AuthError)
    }

    console.log(ThembaErrorMessage)
    return throwError(ThembaErrorMessage)
  }

}
