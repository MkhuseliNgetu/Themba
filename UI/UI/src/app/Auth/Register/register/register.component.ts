import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from 'src/app/Auth/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public CounselorsService: UserServiceService) {}

  ngOnInit(): void {


  }
  
  Registration(FreshRegistration: NgForm){

    if(FreshRegistration.invalid){

      alert('No credentials have been supplied to create an profile')

      FreshRegistration.resetForm();
      return

    }else{
       
      this.CounselorsService.RegistrationService(FreshRegistration.value.CounselorUsername,FreshRegistration.value.CounselorPasscode)
      
      FreshRegistration.resetForm();
    }

  }
  
}
