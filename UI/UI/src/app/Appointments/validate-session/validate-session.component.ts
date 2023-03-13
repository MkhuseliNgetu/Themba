import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserServiceService } from 'src/app/Auth/user-service.service';

@Component({
  selector: 'app-validate-session',
  templateUrl: './validate-session.component.html',
  styleUrls: ['./validate-session.component.css']
})
export class ValidateSessionComponent {


  constructor(public SessionService: UserServiceService) {}

  ngOnInit(): void{


  }

  FindASession(MySession: NgForm){

    switch(MySession.invalid){

      case true:

      alert('No session with your details was found')

      MySession.resetForm();
        break;

      case false:

        this.SessionService.ValidateSession(MySession.value.SuppliedSessionIdenticationNumber,MySession.value.SuppliedPatientName,
                                            MySession.value.SuppliedPatientSurname, MySession.value.SuppliedSessionDateAndTime)
      
        MySession.resetForm();
        break;
    }
  }
}
