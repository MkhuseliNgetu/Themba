import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/Auth/Login/login/login.component';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent {

  constructor(public MyRouter: Router) {
    
  }

  ngOnInit(): void{

    setTimeout(()=>{

      this.MyRouter.navigate(['/Session']);
    },6000);
  
  }
    

}
