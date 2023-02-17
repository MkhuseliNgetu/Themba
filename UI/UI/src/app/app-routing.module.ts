import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Auth/Register/register/register.component';
import { LoginComponent } from './Auth/Login/login/login.component';
import { DashboardComponent} from './Auth/Dashboard/dashboard/dashboard.component';
import { PoliceReportComponent } from './Police-Report/police-report/police-report.component';
import { SessionComponent } from './Appointments/session/session.component';

const ThembaRoutes: Routes = [{path: 'Register', component: RegisterComponent},
{path: 'Login', component: LoginComponent},
{path: 'Dashboard', component: DashboardComponent},
{path: 'Report', component: PoliceReportComponent},
{path: 'Session', component: SessionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(ThembaRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
