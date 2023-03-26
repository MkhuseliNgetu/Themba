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
const VerifyUser = require('../Verify-User')
//Addesses
const RegisterCounselors = '/Register'
const LoginCounselors = '/Login'
const CounselorDashboard = '/Dashboard'
const CounselorAppointmentsUpdate = '/UpdateAppointments'

//Registration - Counselors
Router.post(RegisterCounselors,(res,req)=>{

    Bcrypt.hash(req.body.Passcode, 10).then(SafePasscode=>{

        const NewCounselor = new UserStorage({Username: req.body.Username, Password: SafePasscode});

        UserStorage.findOne({Username: req.body.Username}, function(err, FoundUser){

            if(FoundUser){

                    res.status(409).json({Message: 'Error: Registration Failed.' + "\n"+ 'This user already exists'});
            }else{
                    NewCounselor.save().then(CounselorOutcome =>{
                        res.status(201).json({Message: 'Registration successful.', Counselor:  CounselorOutcome});
                    })
            }
        })


    });


})
//Login - Counselors
Router.post(LoginCounselors, (res,req)=>{

let existingcounselor;

    UserStorage.findOne({Username: req.body.Username}).then(ExistingUser=>{

        if(!ExistingUser){

            return res.status(401).json({Message: 'Authentication failed.'});
        }else{

            existingcounselor = ExistingUser;
            return Bcrypt.compare(req.body.Passcode,existingcounselor.Passcode)
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

    });

})

//Dashboard - Counselors - View upcomming sessions
Router.get(CounselorDashboard, VerifyUser,(res,req)=>{


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
Router.patch(CounselorAppointmentsUpdate, VerifyUser,(res,req)=>{


    AppointmentStorage.findOneAndRemove({ID:req.body.ID, Name: req.body.Name, Surname: req.body.Surname, DayAndTime: req.body.DayAndTime}, function(err, Appointment){

        if(Appointment){

            res.status(200).send({Message: 'Appointments have been updated successfully'});
        }else{
            res.status(404).send({Message: 'Appointments have not been updated successfully'});
        }
    });

})
    

module.exports = Router;