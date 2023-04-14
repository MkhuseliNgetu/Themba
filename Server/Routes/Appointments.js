const Express = require('express')
const Router = Express.Router();

//Cloud Storage
const AppointmentStorage = require('../DataWarehouse/Appointments')
//Addesses
const AttendSession = '/Session'
const ValidateSession = '/ValidateSession'

//Security 
var ThembaProtection = require('express-brute');
var ThembaDataWarehouse =  new ThembaProtection.MemoryStore();
var ThembaDDOSProtect = new ThembaProtection(ThembaDataWarehouse);


Router.post(AttendSession, (res,req)=>{
        
ThembaDDOSProtect.prevent;

 //Get Name and contact details of patient 
 AppointmentStorage.findOne({ID: req.body.ID, DayAndTime: req.body.DayAndTime}, function(err, FoundAppointment){

    switch(FoundAppointment){
    case true:
        
    break;
    case false:
            res.status(409).json({Message: 'Error: Session could not be loaded' +"\n"+ 'Appointment could not be found.'});
    break;
    }

 });

})
//Checking whether the patient's book session is valid
Router.post(ValidateSession, (req, res)=>{

ThembaDDOSProtect.prevent;

//Get Name and contact details of patient 
AppointmentStorage.findOne({ID: req.body.ID, DayAndTime: req.body.DayAndTime}, function(err, FoundAppointment){
    
    
if(FoundAppointment){

        res.status(200).json({Message: 'Session has been found successsfully. Please wait while counselor joins into the sesssion...'});
}else{
        res.status(409).json({Message: 'Error: Session could not be loaded, this appointment could not be found.'});
}
      
    
   });
    
})

module.exports = Router;