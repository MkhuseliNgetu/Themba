const Express = require('express')
const App = Express()

//WebPages
const Controller = '/Themba'
const AttendSession = '/Session'
const FilePoliceReport  = '/Report'
const RegisterCounselors = '/Register'
const LoginCounselors = '/Login'
const CounselorDashboard = '/Dashboard'
const CounselorAppointmentsUpdate = '/UpdateAppointments'

//Cloud Storage (Config)
const Appointments = require('./DataWarehouse/Appointments')
const PoliceReports = require('./DataWarehouse/PoliceReports')
const Counselors = require('./DataWarehouse/Users')

//Routes
const AppointmentsRoute = require('./Routes/Appointments')
const PoliceReportsRoute = require('./Routes/PoliceReports')
const CounselorsRoute = require('./Routes/Users')

//Cloud Storage
const fs = require('fs')
const url = require('inspector')
const certificate =  fs.readFileSync('SSL/TCertificate.pem')
const option = {Server: {SSLCA: certificate}};
const Mongoose = require('mongoose')
const ConToCloudStorage = 'mongodb+srv://MNgetu83:MuD8WnEf5zhhpHar@cluster0.vwavmzr.mongodb.net/?retryWrites=true&w=majority'
//This programming statement was adapted from Mozilla Developer:
//Link: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
//Author: Mozilla
Mongoose.set("strictQuery", false);

Mongoose.connect(ConToCloudStorage).then(() => {console.log('Cloud Storage (MongoDB) has been connected successfully!')})
.catch(() => {console.log('Connection to the cloud storage (MongoDB) has failed.')}, option);

//Security
//Passcode Encryption
const Bcrypt = require('bcrypt')

//DDOS Mitigations
var ThembaProtection = require('express-brute');
var ThembaDataWarehouse =  new ThembaProtection.MemoryStore();
var ThembaDDOSProtect = new ThembaProtection(ThembaDataWarehouse);

//Header Security
const ThembaTransportSecurity = require('helmet');
App.use(ThembaTransportSecurity());

//Request Logging [For Security Only!!!!!]
var UserRequestLogger = require('morgan');
App.use(UserRequestLogger('combined'));

UserRequestLogger(':method :url :status :res[content-length] - response-time ms ')

var LogFileLocation = require('path');
App.use(UserRequestLogger('Backend', {Skip: function(UserRequest, UserResponse) {return UserResponse < 400}}))
App.use(UserRequestLogger('common',{RequestData: fs.createReadStream(LogFileLocation.join(__dirname, 'UserRequests.log'), {flags: 'a'})}))

//CORS
App.use((req,res, next)=>{

    res.setHeader('Acess-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Origin','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','*');
    next();
});



//WebRTC 
//Attending a counseling session
App.post(Controller + AttendSession, (req, res)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;
    //Get Name and contact details of patient 
    Appointment.findOne({ID: req.body.ID, DayAndTime: req.body.DayAndTime},function(err, FoundAppointment){


        switch(FoundAppointment != null){

            case true:

                break;
            case false:
                    res.status(409).json({Message: 'Error: Session could not be loaded' +"\n"+ 'Appointment could not be found.'});
                break;

        }
    })
    //Connect to session
});

//Patient - Filing A Police Report 
App.post(Controller + FilePoliceReport, async(req,res)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    PoliceReports.findOne({ID: req.body.ID}, function(err, result){


        switch(result != null){

            case true:
                res.status(409).json({Message: 'Police Report has not been filed successfully.' + "\n"+ 'This report already exists'});

                break;
            case false:
                    const PoliceReport = new PoliceReports({ ID: req.body.ID,
                        Name: req.body.Name,
                        Surname: req.body.Surname,
                        DayAndTime: req.body.DayAndDate,
                        Description: req.body.Incident,
                        OfficerSignature: req.body.OfficerSignature})

                    PoliceReport.save()

                    res.status(201).json({Message: 'Your Police Report has been filed successfully.', PoliceReport, Reminder: 'Please keep your case number to follow-up on you case' });

                break;
        }

    })
    

});
//Registration - Counselors
App.post(Controller + RegisterCounselors, (req,res)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    Counselors.findOne({Username: req.body.Username}, function(err, result){


        switch(result != null){

            case true:
                res.status(409).json({Message: 'Registration Failed.' + "\n"+ 'This user already exists'})

                break;
            case false:
                    const NewCounselors = new Counselors({ Username: req.body.Username, Passcode: req.body.Passcode});
                    NewCounselors.save()
                    res.status(201).json({Message: 'Registration successful.', NewCounselors });

                break;
        }

    })

});
//Login - Counselors
App.post(Controller + LoginCounselors,(req,res)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    Counselors.findOne({Username: req.body.Username, Password: req.body.Passcode}, function(req, doc){


        switch(result != null){


            case true:
                    Bcrypt.compare(req.body.Passcode, doc.Passcode, (err, postcomparison)=>{

                        if(postcomparison){

                            res.status(201).json({Message: ' Login successful', Token: token});
                        }else{

                            res.status(401).json({Messgae: 'Login Failed'});
                        }
                    })
                break;

            case false:
                res.status(401).json({Messgae: 'Login Failed'});
                break;

        }
    })

});
//Dashboard - Counselors - View upcomming sessions
App.get(Controller + CounselorDashboard, async(req,res)=>{

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
});
//Update Appointments
App.patch(Controller + CounselorAppointmentsUpdate, async(res,req)=>{

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

});
App.use(Controller+AttendSession,AppointmentsRoute)
App.use(Controller+FilePoliceReport, PoliceReportsRoute)
App.use(Controller+RegisterCounselors,CounselorsRoute)
App.use(Controller+LoginCounselors,CounselorsRoute)
App.use(Controller+CounselorDashboard, CounselorsRoute)
App.use(Controller+CounselorAppointmentsUpdate, CounselorsRoute)

module.exports = App;