const Express = require('express')
const Router = Express.Router();

//Cloud Storage
const UserStorage = require('../DataWarehouse/Users')
const AppointmentStorage = require('../DataWarehouse/Appointments')
//Encyption
const Bcrypt = require('bcrypt');
//Authorisation
const JWT = require('jsonwebtoken');
const VerifyUser = require('../Verify-User')
//Addesses
const RegisterCounselors = '/Register'
const LoginCounselors = '/Login'
const CounselorDashboard = '/Dashboard'
const CounselorAppointmentsUpdate = '/UpdateAppointments'

//Security 
var ThembaProtection = require('express-brute');
var ThembaDataWarehouse =  new ThembaProtection.MemoryStore();
var ThembaDDOSProtect = new ThembaProtection(ThembaDataWarehouse);


//Registration - Counselors
Router.post(RegisterCounselors, async(res,req)=>{

ThembaDDOSProtect.prevent;

    const RoundsOfSalt = 10;

    var ScrambledPasscode = Bcrypt.hash(req.body.Passcode,RoundsOfSalt);

    const NewCounselor = new UserStorage({Username: req.body.Username, Passcode: ScrambledPasscode });

    var IndexedCounselor = await UserStorage.findOne({Username: req.body.Username});

    if(IndexedCounselor){

        res.status(409).json({Message: 'Error: Registration Failed: This user already exists'});
    }else{
        NewCounselor.save().then(CounselorOutcome =>{
            res.status(201).json({Message: 'Registration successful.', Counselor:  CounselorOutcome.Passcode});
        })
    }
})
//Login - Counselors
Router.post(LoginCounselors, async(res,req)=>{

ThembaDDOSProtect.prevent;

let existingcounselor

    UserStorage.findOne({Username: req.body.Username}).then(ExistingUser=>{

        if(ExistingUser){
           
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

        return res.status(401).json({Message: 'Error: Login unsuccessful' + "\n"+ 'Incorrect username/password'});

    });

})

//Dashboard - Counselors - View upcomming sessions
Router.get(CounselorDashboard, VerifyUser,(res,req)=>{

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
Router.patch(CounselorAppointmentsUpdate, VerifyUser,(res,req)=>{

ThembaDDOSProtect.prevent;

    AppointmentStorage.findOneAndRemove({ID:req.body.ID, Name: req.body.Name, Surname: req.body.Surname, DayAndTime: req.body.DayAndTime}, function(err, Appointment){

        if(Appointment){

            res.status(200).send({Message: 'Appointments have been updated successfully'});
        }else{
            res.status(404).send({Message: 'Appointments have not been updated successfully'});
        }
    });

})
    

module.exports = Router;