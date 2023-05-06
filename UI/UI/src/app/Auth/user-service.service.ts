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
    {Username:CounselorUsername, Passcode: CounselorPasscode})
    .pipe(retry(2),catchError(this.ServerError))
    .subscribe(RegistrationStatus => {alert(RegistrationStatus.Message)})
  }
  //Counselors #2
  LoginService(SuppliedCounselorUsername: String, SuppliedCounselorPasscode: String): any {

    this.HTTP.post<{Message: String, Token: String}>('https://localhost:3000/Themba/Login',
    {Username:SuppliedCounselorUsername, Password: SuppliedCounselorPasscode})
    .pipe(retry(2),catchError(this.ServerError))
    .subscribe(LoginStatus => {const Token = LoginStatus.Token; this.AuthToken = Token; 
      alert(JSON.stringify(LoginStatus.Message))})
  }
  //Counselor #3
  DashboardService(): any {

    this.HTTP.get<{Message: String}>('https://localhost:3000/Themba/Dashboard',
    {}).pipe(retry(2), catchError(this.ServerError))
  }


  //Patients
  PoliceReportService(SuppliedPatientIdenticationNumber: String, SuppliedPatientName: String, SuppliedPatientSurname: String, SuppliedPatientDateAndTime: String, SuppliedDescription: String) : any {

    this.HTTP.post<{Message: String, PoliceReport: String,Reminder: String}>('http://localhost:3000/Themba/Report',
     {ID:SuppliedPatientIdenticationNumber,
      Name: SuppliedPatientName,
      Surname: SuppliedPatientSurname,
      DayAndTime: SuppliedPatientDateAndTime,
      Description: SuppliedDescription}).pipe(retry(2), catchError(this.ServerError)).subscribe(PoliceReportStatus =>{alert(PoliceReportStatus.Message+"\n"+PoliceReportStatus.Reminder)})
  }

  //Counselor & Patients #1
  GetAuthToken(){

    return this.AuthToken;
  }

  //Counselor & Patients #2
  ServerError(AuthError: HttpErrorResponse){

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

  
  //Counselor & Patients #3
  ValidateSession(SuppliedSessionIdenticationNumber: String,SuppliedPatientName: String, SuppliedPatientSurname: String,SuppliedSessionDateAndTime: String): any{

    this.HTTP.post<{Message: String}>('https://localhost:3000/Themba/ValidateSession',
    {ID:SuppliedSessionIdenticationNumber,
      Name: SuppliedPatientName,
      Surname: SuppliedPatientSurname,
      DayAndTime: SuppliedSessionDateAndTime,}).pipe(retry(2), catchError(this.ServerError)).subscribe(SessionStatus =>{alert(SessionStatus.Message)})
  }
  //Counselor & Patients #4
  //AttentSession()

}
