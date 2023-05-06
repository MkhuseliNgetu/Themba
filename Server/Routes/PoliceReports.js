const express = require('express')
const router = express.Router();

//Cloud Storage
const ReportStorage = require('../DataWarehouse/PoliceReports')
//Address
const FilePoliceReport ='/Report'

//Security 
var ThembaProtection = require('express-brute');
var ThembaDataWarehouse =  new ThembaProtection.MemoryStore();
var ThembaDDOSProtect = new ThembaProtection(ThembaDataWarehouse);


//Patient - Filing A Police Report 
router.post(FilePoliceReport,async (req,res)=>{

    ThembaDDOSProtect.prevent;

    //Report Number Generation:
    const ReportNoPrefix = 'RT-';

    const StartingPoint = 999;
    
    const EndPoint = 100000;

    const ReportNo = ReportNoPrefix + Math.floor(Math.random() * StartingPoint + EndPoint).toString();    
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
        ReportNo: ReportNo});

    var FinialisedPoliceReports = await ReportStorage.findOne({ID: req.body.ID}).exec();

    if(FinialisedPoliceReports){

        res.status(409).json({Message: 'Error: Police Report has not been filed successfully.'});
        
    }else{

        PoliceReport.save().then(ReportOutcome=>{
            res.status(201).json({Message: 'Your Police Report has been filed successfully.', ReportNo, Reminder: 'Please keep your case number to follow-up on you case' });
        })
        
    }
                


});

module.exports = router;
