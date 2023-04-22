import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserServiceService } from 'src/app/Auth/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validate-session',
  templateUrl: './validate-session.component.html',
  styleUrls: ['./validate-session.component.css']
})
export class ValidateSessionComponent {


  constructor(public SessionService: UserServiceService, public OpenSession: Router) {}

  ngOnInit(): void{


  }

  FindASession(MySession: NgForm){

    switch(MySession.invalid){

      case true:

        alert('No session with your details was found')

        MySession.resetForm();

        this.OpenSession.navigate(['/Loading']);
    
        break;

      case false:

        this.SessionService.ValidateSession(MySession.value.SuppliedSessionIdenticationNumber,MySession.value.SuppliedPatientName,
                                            MySession.value.SuppliedPatientSurname, MySession.value.SuppliedSessionDateAndTime)
      
        MySession.resetForm();
        
        this.OpenSession.navigate(['/Loading']);
     
        break;
    }
  }
}
