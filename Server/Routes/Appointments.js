const Express = require('express')
const Router = Express.Router();

//Cloud Storage
const AppointmentStorage = require('../DataWarehouse/Appointments')
//Addesses
const AttendSession = '/Session'


Router.post(AttendSession, (res,req)=>{

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

module.exports = Router;