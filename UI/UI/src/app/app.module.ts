import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PoliceReportComponent } from './Police-Report/police-report/police-report.component';
import { RegisterComponent } from './Auth/Register/register/register.component';
import { LoginComponent } from './Auth/Login/login/login.component';
import { DashboardComponent } from './Auth/Dashboard/dashboard/dashboard.component';
import { SessionComponent } from './Appointments/session/session.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserServiceService } from './Auth/user-service.service';
import { ErrorInterceptor } from './Error/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { ErrorComponent } from './Error/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    PoliceReportComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    SessionComponent,
    ErrorComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: UserServiceService, multi: true},
              {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor  , multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
