const Express = require('express')
const Router = Express.Router();

//Cloud Storage
const ReportStorage = require('../DataWarehouse/PoliceReports')
//Address
const FilePoliceReport ='/Report'


//Security 
var ThembaProtection = require('express-brute');
var ThembaDataWarehouse =  new ThembaProtection.MemoryStore();
var ThembaDDOSProtect = new ThembaProtection(ThembaDataWarehouse);


//Patient - Filing A Police Report 
Router.post(FilePoliceReport,(res,req)=>{

    ThembaDDOSProtect.prevent;
    
    //Format Supplied Date
    //This programming statement was adapted from Momentjs:
    //Link: https://momentjs.com/
    //Author: Momentjs
    const ReportDate = require('moment')

    //This programming statement was adapted from Momentjs:
    //Link: https://momentjs.com/
    //Author: Momentjs
    const PoliceReport = new ReportStorage({ID: req.body.ID,
        Name: req.body.Name,
        Surname: req.body.Surname,
        DayAndTime: ReportDate(req.body.DayAndTime).format('DD/MMM/YYYY'),
        Description: req.body.Description,
        OfficerSignature: req.body.OfficerSignature})

    PoliceReports.findOne({ID: req.body.ID}, function(err, result){
        if(result){

        res.status(409).json({Message: 'Error: Police Report has not been filed successfully.' + "\n"+ 'This report already exists'});
        }else{
        PoliceReport.save()
        res.status(201).json({Message: 'Your Police Report has been filed successfully.', PoliceReport, Reminder: 'Please keep your case number to follow-up on you case' });
        }
                


    });
})

module.exports = Router;
