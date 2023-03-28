import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './Auth/Register/register/register.component';
import { LoginComponent } from './Auth/Login/login/login.component';
import { DashboardComponent} from './Auth/Dashboard/dashboard/dashboard.component';
import { PoliceReportComponent } from './Police-Report/police-report/police-report.component';
import { SessionComponent } from './Appointments/session/session.component';
import { ValidateSessionComponent } from './Appointments/validate-session/validate-session.component';
import { LoadingScreenComponent } from './loading/loading-screen/loading-screen.component';

const ThembaRoutes: Routes = [
{path:'Register', component: RegisterComponent},
{path:'Login', component: LoginComponent},
{path:'Dashboard', component: DashboardComponent},
{path:'Report', component: PoliceReportComponent},
{path:'Session', component: SessionComponent},
{path:'ValidateSession', component: ValidateSessionComponent},
{path:'Loading', component: LoadingScreenComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(ThembaRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
