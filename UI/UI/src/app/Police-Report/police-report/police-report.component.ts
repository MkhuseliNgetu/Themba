import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserServiceService } from 'src/app/Auth/user-service.service';
@Component({
  selector: 'app-police-report',
  templateUrl: './police-report.component.html',
  styleUrls: ['./police-report.component.css']
})
export class PoliceReportComponent implements OnInit {

  constructor(public ReportService: UserServiceService) {}

  ngOnInit(): void {
    
  }

  PoliceReports(FreshReport: NgForm) {

    switch(FreshReport.invalid){

      case true:

        alert('Your police report was not filed successfully due to missing content')

        FreshReport.resetForm();
        break;

      case false:
      
        this.ReportService.PoliceReportService(FreshReport.value.SuppliedPatientIdenticationNumber,FreshReport.value.SuppliedPatientName,
        FreshReport.value.SuppliedPatientSurname, FreshReport.value.SuppliedPatientDateAndTime, FreshReport.value.SuppliedDescription)

        FreshReport.resetForm();
        break;

    }

  }
}
