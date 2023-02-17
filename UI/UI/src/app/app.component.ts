import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Themba';
  SuccessfulLoad! : boolean;

  constructor() {}

  ngOnInit(): void {
    this.SuccessfulLoad = true;
    throw new Error('Method not implemented.');
  }

  OnSuccessfulLoad(): any {

  

  }
}
