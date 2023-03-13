import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// User Interfaces
import { AppComponent } from './app.component';
import { PoliceReportComponent } from './Police-Report/police-report/police-report.component';
import { RegisterComponent } from './Auth/Register/register/register.component';
import { LoginComponent } from './Auth/Login/login/login.component';
import { DashboardComponent } from './Auth/Dashboard/dashboard/dashboard.component';
import { SessionComponent } from './Appointments/session/session.component';
import { ValidateSessionComponent } from './Appointments/validate-session/validate-session.component';

//HTTP Handling
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//User Services
import { UserServiceService } from './Auth/user-service.service';
//Routing
import { AppRoutingModule } from './app-routing.module';
//Error Handling
import { ErrorComponent } from './Error/error/error.component';
import { ErrorInterceptor } from './Error/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PoliceReportComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    SessionComponent,
    ErrorComponent,
    ValidateSessionComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: UserServiceService, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
