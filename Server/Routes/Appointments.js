const express = require('express')
const router = express.Router();

//Cloud Storage
const AppointmentStorage = require('../DataWarehouse/Appointments')
//Addesses
const AttendSession = '/Session'
const ValidateSession = '/ValidateSession'
const CounselorDashboard = '/Dashboard'
const CounselorAppointmentsUpdate = '/UpdateAppointments'
//Security 
var ThembaProtection = require('express-brute');
var ThembaDataWarehouse =  new ThembaProtection.MemoryStore();
var ThembaDDOSProtect = new ThembaProtection(ThembaDataWarehouse);


router.post(AttendSession, (req,res)=>{
        
ThembaDDOSProtect.prevent;

})
//Checking whether the patient's book session is valid
router.post(ValidateSession, async(req, res)=>{

ThembaDDOSProtect.prevent;

//Format Supplied Date
//This programming statement was adapted from Momentjs:
//Link: https://momentjs.com/
//Author: Momentjs
const AppointmentDate = require('moment')

//Get Name and contact details of patient 
var AppointmentLookup = await AppointmentStorage.findOne({ID: req.body.ID, DayAndTime: AppointmentDate(req.body.DayAndTime).format('DD/MMM/YYYY')});


if(AppointmentLookup){

        res.status(200).json({Message: 'Session has been found successsfully. Please wait while counselor joins into the sesssion...'});
}else{
        res.status(409).json({Message: 'Error: Session could not be loaded, this appointment could not be found.'});
}
    
    
})
//Dashboard - Counselors - View upcomming sessions
router.get(CounselorDashboard,(req,res)=>{

 ThembaDDOSProtect.prevent;
        
 Appointments.find({}, function(err, AllAppointments){
        
        if(AllAppointments){
        res.status(200).send(AllAppointments,array.forEach(element => {
                        JSON.stringify(element)
         }));
        
        }else{
        res.status(404).send({Message: 'Appointment(s) unavailable'});
        }
        });
        
})
//Update Appointments
router.patch(CounselorAppointmentsUpdate, async (req,res)=>{
        
ThembaDDOSProtect.prevent;
        
if(typeof(req.body.ID) == 'undefined'){
        
        
}else{
        
const UpdatedAppointmentDetails = new Appointments({ID: req.body.ID, Name: req.body.Name, Surname: req.body.Surname, DayAndTime: req.body.DayAndTime});
        
var FinialisedAppointment = await Appointments.findOne({ID: req.body.ID, Name: req.body.Name, Surname: req.body.Surname});
        
if(FinialisedAppointment){
        
UpdatedAppointmentDetails.patch().then(UpdatedAppointment=>{
            
res.status(200).send({Message: 'Appointments have been updated successfully'});
                    
})

}else{
            
res.status(404).send({Message: 'Appointments have not been updated successfully'});
                     
 }
}
        
        
})
module.exports = router;