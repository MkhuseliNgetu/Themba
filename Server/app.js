const { application } = require('express')
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
const Home = '/'
const AboutUs = '/About'

//Cloud Storage (Config)
const Appointments = require('./DataWarehouse/Appointments')
const PoliceReports = require('./DataWarehouse/PoliceReports')
const Counselors = require('./DataWarehouse/Users')

const fs = require('fs')

//Routes
const AppointmentsRoute = require('./Routes/Appointments')
const PoliceReportsRoute = require('./Routes/PoliceReports')
const CounselorsRoute = require('./Routes/Users')

//Cloud Storage
const Mongoose = require('mongoose')
const ConToCloudStorage = ''
Mongoose.connect().then(() => {console.log('Cloud Storage (MongoDB) has been connected successfully!')}).catch(() => {console.log('Connection to the cloud storage (MongoDB) has failed.')})

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
App.user(UserRequestLogger('common',{RequestData: fs.createReadStream(LogFileLocation.join(__dirname, 'UserRequests.log'), {flags: 'a'})}))

//CORS
App.use((req,res, next)=>{

    res.setHeader('Acess-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Origin','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','*');
    next();
});
//WebRTC 

//Attending a counseling session
App.post(Controller + AttendSession, async(req, res)=>{

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
App.post(Controller + RegisterCounselors, async(req,res)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    Counselors.findOne({Username: req.body.Username}, function(err, result){


        switch(result != null){

            case true:
                res.status(409).json({Message: 'Registration Failed.' + "\n"+ 'This user already exists'})

                break;
            case false:
                    const NewCounselors = new Counselors({ Username: req.body.Username, Password: req.body.Passcode});
                    NewCounselors.save()
                    res.status(201).json({Message: 'Registration successful.', NewCounselors });

                break;
        }

    })

});
//Login - Counselors
App.post(Controller + LoginCounselors, async(req,res)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    Counselors.findOne({Username: req.body.Username, Password: req.body.Password}, function(req, doc){


        switch(result != null){


            case true:
                    Bcrypt.compare(req.body.Password, doc.Password, (err, postcomparison)=>{

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
//Book Session (Appointment)
App.get(Controller + CounselorDashboard, async(req,res)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    Appointments.findOne({ID:req.body.ID, Name: req.body.Name, Surname: req.body.Surname, DayAndTime: req.body.DayAndTime}, function(err, Appointment){


        switch(Appointment != null){

            case true:
                res.status(404).send({Message: 'Appointment(s) could not be created successfully: Appointment already exists'});
                break;
            case false:
                const NewAppointment =  new Appointments({ID:req.body.ID, Name: req.body.Name, Surname: req.body.Surname, DayAndTime: req.body.DayAndTime});
                NewAppointment.save();
                res.status(201).send({Message: 'Appointment has been set successfully', Details: Appointment});
                break;
         

        }
    })
});
//Dashboard - Counselors - View upcomming sessions
App.get(Controller + CounselorDashboard, async(req,res)=>{

      
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
//Home Page - Landing Page
App.get(Controller + Home, async(req,res)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    res.log('Themba has started successfully');
    res.log('Now starting other services...Please wait....');

});
//About Page - Purpose of Themba & Details of procedures
App.get(Controller + AboutUs, async(req,res)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    res.send('Themba is a (insert decription here later!!!)')

});

App.use(Controller, AttendSession,AppointmentsRoute);
App.use(Controller, FilePoliceReport, PoliceReportsRoute);
App.use(Controller, RegisterCounselors,CounselorsRoute);
App.use(Controller, LoginCounselors,CounselorsRoute);
App.use(Controller, CounselorDashboard, CounselorsRoute);

module.exports = App;