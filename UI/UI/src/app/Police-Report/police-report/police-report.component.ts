import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserServiceService } from 'src/app/Auth/user-service.service';
@Component({
  selector: 'app-police-report',
  templateUrl: './police-report.component.html',
  styleUrls: ['./police-report.component.css']
})
export class PoliceReportComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    
  }

  PoliceReports(FreshReport: NgForm) {


  }
}
