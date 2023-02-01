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
const Home = '/'
const AboutUs = '/About'

//Cloud Storage (Config)
const Appointments = require('./DataWarehouse/Appointments')
const PoliceReports = require('./DataWarehouse/PoliceReports')
const Counselors = require('./DataWarehouse/Users')

//Routes
const AppointmentsRoute = require('./Routes/Appointments')
const PoliceReportsRoute = require('./Routes/PoliceReports')
const CounselorsRoute = require('./Routes/Users')

//Cloud Storage
const Mongoose = require('mongoose')
const { Socket } = require('socket.io')
const ConToCloudStorage = ''
Mongoose.connect().then(() => {console.log('Cloud Storage (MongoDB) has been connected successfully!')}).catch(() => {console.log('Connection to the cloud storage (MongoDB) has failed.')})

//WebRTC 
const CallSessionIntitator = '';
const ConnectToSession = prompt('Please enter your name and ID')

const Session = io.connect();
//Attending a counseling session
App.post(Controller + AttendSession, async(req, res)=>{

    //Get Name and contact details of patient 
    
    //Connect to session
    switch(ConnectToSession !== ''){

        case true:
            console.log('Joining a session...Please wait....' + ConnectToSession);
            Session.emit('create or join sesssion', ConnectToSession);

            
            //Case - Counseling sessions is booked/Counselor is in a session..Please wait
            Session.on('full',(ConnectToSession)=>{

                console.log('Session is full')
            });
            //Case - Counseling session is empty/Counselor is available
            Session.on('empty',(ConnectToSession)=>{

                CallSessionIntitator = true;

                console.log('Session is available/Counselors are available')

            });
            //Case - Joining a counseling session
            Session.on('join',(ConnectToSession)=>{

                CallSessionIntitator = true;

                console.log('Making a session available/Getting a Counselor(s) to join a session')
                console.log('You are making a call!')


            });
            break;
        case false:

            break;
        
    }

    switch(Session.on()){

        //Case - Counseling sessions is booked/Counselor is in a session..Please wait
        case 'full':
            console.log('Session is full')
            break;
        //Case - Joining a counseling session
        case 'join':
            CallSessionIntitator = true;

            console.log('Making a session available/Getting a Counselor(s) to join a session')
            console.log('You are making a call!')

            break;
        //Case - Counseling session is empty/Counselor is available
        case 'empty':
            CallSessionIntitator = true;

            console.log('Session is available/Counselors are available')
            break;
    }
});

//Filing A Police Report 
App.post(Controller + FilePoliceReport, async(req,res)=>{

    PoliceReports.findOne({ID: req.body.ID}, function(err, result){


        switch(result){

            case true:
                res.status(201).json({Message: 'Police Report has not been filed successfully.' + "\n"+ 'This report already exists'})

                break;
            case false:
                    const PoliceReport = new PoliceReports({ ID: req.body.ID,
                        Name: req.body.Name,
                        Surname: req.body.Surname,
                        DayAndTime: req.body.DayAndDate,
                        Description: req.body.Incident,
                        OfficerSignature: req.body.OfficerSignature})
                    
                    res.status(201).json({Message: 'Your Police Report has been filed successfully.', PoliceReport, Reminder: 'Please keep your case number to follow-up on you case' })

                break;
        }

    })
    

});
//Registration - Counselors
App.post(Controller + RegisterCounselors, async(req,res)=>{

    Counselors.findOne({Username: req.body.Username}, function(err, result){


        switch(result){

            case true:
                res.status(201).json({Message: 'Registration Failed.' + "\n"+ 'This user already exists'})

                break;
            case false:

                    const NewCounselors = new Counselors({ Username: req.body.Username, Password: req.body.Password})
                
                    res.status(201).json({Message: 'Registration successful.', NewCounselors })

                break;
        }

    })

});
//Login - Counselors
App.post(Controller + LoginCounselors, async(req,res)=>{



});
//Dashboard - Counselors - View upcomming sessions
App.get(Controller + CounselorDashboard, async(req,res)=>{


});
//Home Page - Landing Page
App.get(Controller + Home, async(req,res)=>{

    res.log('Themba has started successfully');
    res.log('Now starting other services...Please wait....');

});
//About Page - Purpose of Themba & Details of procedures
App.get(Controller + AboutUs, async(req,res)=>{



});

App.use(Controller, AttendSession,AppointmentsRoute);
App.use(Controller, FilePoliceReport, PoliceReportsRoute);
App.use(Controller, RegisterCounselors,CounselorsRoute);
App.use(Controller, LoginCounselors,CounselorsRoute);
App.use(Controller, CounselorDashboard, CounselorsRoute);

module.exports = App;