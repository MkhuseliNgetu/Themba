const express = require('express');
const app = express()
const router = express.Router();

//Controller
const Controller = '/Themba'
const AttendSession = '/Session'
const ValidateSession = '/ValidateSession'
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

//CORS
const CORS = require('cors')

//Cloud Storage
const Mongoose = require('mongoose')
const fs = require('fs')
const url = require('inspector')
const certificate =  fs.readFileSync('SSL/TCertificate.pem')
const option = {Server: {SSLCA: certificate}};
const ConToCloudStorage = 'mongodb+srv://Mngetu:vRU6kK3F4c39MAZ@cluster0.vwavmzr.mongodb.net/?retryWrites=true&w=majority'
//This programming statement was adapted from Mozilla Developer:
//Link: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
//Author: Mozilla
Mongoose.set("strictQuery", false);

Mongoose.connect(ConToCloudStorage).then(() => {console.log('Cloud Storage (MongoDB) has been connected successfully!')})
.catch(() => {console.log('Connection to the cloud storage (MongoDB) has failed.')}, option);

app.use(express.json());

//Security
//Passcode Encryption
const Bcrypt = require('bcrypt');

app.use((req,res, next)=>{

    res.setHeader('Acess-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Origin','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','*');
    next();
});

app.use(CORS())

//DDOS Mitigations
var ThembaProtection = require('express-brute');
var ThembaDataWarehouse =  new ThembaProtection.MemoryStore();
var ThembaDDOSProtect = new ThembaProtection(ThembaDataWarehouse);

//Header Security
const ThembaTransportSecurity = require('helmet');
app.use(ThembaTransportSecurity());

//Request Logging [For Security Only!!!!!]
var UserRequestLogger = require('morgan');
app.use(UserRequestLogger('combined'));

UserRequestLogger(':method :url :status :res[content-length] - response-time ms ')

var LogFileLocation = require('path');
app.use(UserRequestLogger('Backend', {Skip: function(UserRequest, UserResponse) {return UserResponse < 400}}))
app.use(UserRequestLogger('common',{RequestData: fs.createReadStream(LogFileLocation.join(__dirname, 'UserRequests.log'), {flags: 'a'})}))

//WebRTC

const ServerOne = app.listen(4000, function(connection, disconnected){});

//Signaling Server from Video Conferencing
//This programming statement was adapted from Vegibit:
//Link: https://vegibit.com/nodejs-webrtc-signalling-server/
//Author: Vegibit
const SignalServer = require('socket.io')(ServerOne);

SignalServer.emit("connection", function SnakeEater(){

    console.log('Socket.io server is online', ServerOne.address())


});

//Signaling Server from Video Conferencing
//This programming statement was adapted from Vegibit:
//Link: https://vegibit.com/nodejs-webrtc-signalling-server/
//Author: Vegibit
SignalServer.on("connection", function OpenSesssion(err, Socket){

    //For Connection
    console.log('Your connection to the Socket.io server has been started sucessfully!', ServerOne.address())

    Socket.on('Join-Session', function PatientSession(PatientID, RoomID){

        //Patient/Counselor Joins the session
        Socket.join(RoomID)

        //Telling everyone in the session that a user has joined the session
        Socket.to(RoomID).emit('user-joined', RoomID)

        //For Disconnection

        //Signaling Server from Video Conferencing
        //This programming statement was adapted from Vegibit:
        //Link: https://vegibit.com/nodejs-webrtc-signalling-server/
        //Author: Vegibit
        SignalServer.on("disconnect", function CloseSession(){

        console.log('Socket.io server is offline', ServerOne.address())

         //Telling everyone in the session that a user has left the session
         Socket.to(RoomID).emit('user-left', PatientID)
        });
    })

    
});

//WebRTC 
//Attending a counseling session
app.post(Controller+AttendSession, async(req, res)=>{


})
//Checking whether the patient's book session is valid
app.post(Controller+ValidateSession, async (req, res)=>{

//DDOS Protection 
ThembaDDOSProtect.prevent;

//Format Supplied Date
//This programming statement was adapted from Momentjs:
//Link: https://momentjs.com/
//Author: Momentjs
const AppointmentDate = require('moment')

//Get Name and contact details of patient 
var AppointmentLookup = await Appointments.findOne({ID: req.body.ID, DayAndTime: AppointmentDate(req.body.DayAndTime).format('DD/MMM/YYYY')});


if(AppointmentLookup){

        res.status(200).json({Message: 'Session has been found successsfully. Please wait while counselor joins into the sesssion...'});
}else{
        res.status(409).json({Message: 'Error: Session could not be loaded, this appointment could not be found.'});
}

})

//Patient - Filing A Police Report 
app.post(Controller+FilePoliceReport, async (req,res)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    var FinialisedPoliceReports = await PoliceReports.findOne({ID: req.body.ID}).exec();

    if(FinialisedPoliceReports){

        res.status(409).json({Message: 'Error: Police Report has not been filed successfully.'});
        
    }else{
        res.status(201).json({Message: 'Your Police Report has been filed successfully.',Reminder: 'Please keep your case number to follow-up on you case' });
              
    }
          
    

})
//Registration - Counselors
app.post(Controller+RegisterCounselors, async(req,res)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    var IndexedCounselor = await Counselors.findOne({Username: req.body.Username}).exec();

    if(IndexedCounselor){    
        res.status(409).json({Message: 'Registration Failed: This user already exists'})
    }else{
        res.status(201).json({Message: 'Registration successful.'})
    }
})
//Login - Counselors
app.post(Controller+LoginCounselors,async (req,res)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    Counselors.findOne({Username:req.body.Username}, function(err, FoundCounselor) {
        

        Bcrypt.compare(req.body.Passcode, FoundCounselor.Passcode, (err, EncryptionOutcome)=>{

            switch(EncryptionOutcome){
               
               case true:
                res.status(201).json({Message: 'Login successful', Token: token});
               break;
               case false:
                res.status(401).json({Message: 'Login Failed'});
               break;
            }
                
        })
        
 
    });

})

//Dashboard - Counselors - View upcomming sessions
app.get(Controller+CounselorDashboard, async(req,res)=>{

    //DDOS Protection 
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
app.patch(Controller+CounselorAppointmentsUpdate, async(req,res)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

   

    if(typeof(req.body.ID) == 'undefined'){


    }else{

        var FinialisedAppointment = await Appointments.findOneAndRemove({ID: req.body.ID, Name: req.body.Name, Surname: req.body.Surname});

        if(FinialisedAppointment){
          res.status(200).send({Message: 'Your appointment have been updated successfully'});
        }else{
         res.status(404).send({Message: 'Your appointment has not been updated successfully'});
        
        }
    }
 

})

app.use(Controller+AttendSession,AppointmentsRoute)
app.use(Controller+FilePoliceReport,PoliceReportsRoute)
app.use(Controller+RegisterCounselors,CounselorsRoute)
app.use(Controller+LoginCounselors,CounselorsRoute)
app.use(Controller+CounselorDashboard,AppointmentsRoute)
app.use(Controller+CounselorAppointmentsUpdate,AppointmentsRoute)



module.exports = app;