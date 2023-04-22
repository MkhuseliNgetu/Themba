import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from 'src/app/Auth/user-service.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(public CounselorsService: UserServiceService, private AuthenticationRouter: Router) {}

  ngOnInit(): void {
    
  }
  Options: String = this.AuthenticationRouter.url

  Login(FreshLogin: NgForm) {

    if(FreshLogin.invalid){

      alert('No valid credentials have been supplied to login')

      FreshLogin.resetForm();

      this.AuthenticationRouter.navigate(['/Dashboard'])
      return
    }else{

      if(this.Options == '/Login'){

        this.CounselorsService.LoginService(FreshLogin.value.SuppliedCounselorUsername, FreshLogin.value.SuppliedCounselorPasscode)
        FreshLogin.resetForm();

        this.AuthenticationRouter.navigate(['/Dashboard'])

      }
      
    }
  }
}
