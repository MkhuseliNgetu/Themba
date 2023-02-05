const Express = require('express')
const Router = Express.Router();

//Cloud Storage
const UserStorage = require('../DataWarehouse/Users')
const AppointmentStorage = require('../DataWarehouse/Appointments')
//Encyption
const Bcrypt = require('bcrypt')
//Authorisation
const JWT = require('jsonwebtoken');
const { router } = require('../app');
//Addesses
const RegisterCounselors = '/Register'
const LoginCounselors = '/Login'
const CounselorDashboard = '/Dashboard'
const CounselorAppointmentsUpdate = '/UpdateAppointments'
const Controller = '/Themba'

//Security
//DDOS Mitigations
var ThembaProtection = require('express-brute');
var ThembaDataWarehouse =  new ThembaProtection.MemoryStore();
var ThembaDDOSProtect = new ThembaProtection(ThembaDataWarehouse);

//Registration - Counselors
Router.post(Controller+RegisterCounselors, function(res,req){

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    Bcrypt.hash(req.body.Password, 10).then(hash=>{

        UserStorage.findOne({Username: req.body.Username, Password: req.body.Password}, function(err, FoundUser){

            switch(FoundUser != null){

                case true:
                    res.status(409).json({Message: 'Error: Registration Failed.' + "\n"+ 'This user already exists'});
                    break;
                case false:
                    const NewCounselor = new UserStorage({ Username: req.body.Username, Password: req.body.Password})
                   
                    NewCounselor.save().then(outcome =>{
                        res.status(201).json({Message: 'Registration successful.'});
                    })
                   
                    break;

            }
        })


    })


})
//Login - Counselors
Router.post(Controller+ LoginCounselors, function(res,req){

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    let existingcounselor
    Bcrypt.hash(req.body.Password, 10).then(hash=>{

    UserStorage.findOne({Username: req.body.Username}).then(ExistingUser=>{
        

        if(!ExistingUser){

          
            res.status(401).json({Message: 'Error: Login unsuccessful' + "\n"+ 'Incorrect username/password'});

            
        }else{

            existingcounselor = ExistingUser

            return Bcrypt.compare(req.body.Password, existingcounselor.Password);

            
        }



    }).then(result=>{


        if(!result){

            res.status(401).json({Message: 'Error: Login unsuccessful' + "\n"+ 'Incorrect username/password'});
        }else{

            const AuthToken = JWT.sign({Username: existingcounselor.Username, ID: existingcounselor._id}, "Themba Certified Counselor", {expiresIn: '2h'});
            res.status(200).json({Message: 'Login Successful!', Token: AuthToken, AuthenicatedUser: existingcounselor.Username});
        }

    }).catch(err=>{

        res.status(401).json({Message: 'Error: Login unsuccessful' + "\n"+ 'Incorrect username/password'});

    })

})
    
})

//Dashboard - Counselors - View upcomming sessions
Router.get(Controller+CounselorDashboard, function(res,req){

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    Appointments.find({}, function(err, Appointments){


        switch(Appointments != null){

            case true:
                res.status(200).send(JSON.stringify(Appointments));
                break;
            case false:
                 res.status(404).send({Message: 'Appointment(s) unavailable'});
                break;

        }
    })

})
//Update Appointments
Router.patch(Controller+CounselorAppointmentsUpdate, function(res,req){

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    AppointmentStorage.findOneAndRemove({ID:req.body.ID, Name: req.body.Name, Surname: req.body.Surname, DayAndTime: req.body.DayAndTime}, function(err, Appointment){


        switch(Appointment != null){

            case true:
                res.status(200).send({Message: 'Appointments have been updated successfully'});
                break;
            case false:
                res.status(404).send({Message: 'Appointments have not been updated successfully'});
                break;
         

        }
    })

})
    

module.exports = Router;