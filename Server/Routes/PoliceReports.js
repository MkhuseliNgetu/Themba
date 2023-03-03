const Express = require('express')
const Router = Express.Router();

//Cloud Storage
const ReportStorage = require('../DataWarehouse/PoliceReports')
//Addesses
const FilePoliceReport ='/Report'


//Security
//DDOS Mitigations
var ThembaProtection = require('express-brute');
var ThembaDataWarehouse =  new ThembaProtection.MemoryStore();
var ThembaDDOSProtect = new ThembaProtection(ThembaDataWarehouse);

//Patient - Filing A Police Report 
Router.post(FilePoliceReport,(res,req)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;
    
    const PoliceReport = new ReportStorage({ ID: req.body.ID,
        Name: req.body.Name,
        Surname: req.body.Surname,
        DayAndTime: req.body.DayAndDate,
        Description: req.body.Description,
        OfficerSignature: req.body.OfficerSignature})

    PoliceReports.findOne({ID: req.body.ID}, function(err, result){
        switch(result){

            case true:
                res.status(409).json({Message: 'Error: Police Report has not been filed successfully.' + "\n"+ 'This report already exists'});

                break;
            case false:     
                PoliceReport.save()
                res.status(201).json({Message: 'Your Police Report has been filed successfully.', PoliceReport, Reminder: 'Please keep your case number to follow-up on you case' });

                break;
        }

    });
})

module.exports = Router;
