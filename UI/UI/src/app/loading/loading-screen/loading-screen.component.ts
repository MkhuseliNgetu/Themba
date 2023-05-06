import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/Auth/Login/login/login.component';

import { Server, Socket } from 'socket.io';
import {createServer} from 'http';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent {

   
  constructor(public MyRouter: Router) {
    
  }

  ngOnInit(): void{

    const HttpServer = createServer();
    const SocketIO = new Server(HttpServer,{


    });

    setTimeout(()=>{

      SocketIO.on("connection", function OpenSession(){

        console.log('Hello from the other side!!!'+ HttpServer.address())

      });

      HttpServer.listen(4000);
      this.MyRouter.navigate(['/Session']);
    },6000);
  
  }
    

}
