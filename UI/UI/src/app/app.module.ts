import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PoliceReportComponent } from './Police-Report/police-report/police-report.component';
import { RegisterComponent } from './Register/register/register.component';
import { LoginComponent } from './Login/login/login.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { UpdateAppointmentsComponent } from './Appointments/update-appointments/update-appointments.component';
import { SessionComponent } from './Appointments/session/session.component';

@NgModule({
  declarations: [
    AppComponent,
    PoliceReportComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    UpdateAppointmentsComponent,
    SessionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
