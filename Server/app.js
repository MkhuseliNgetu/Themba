const Express = require('express')
const App = Express()

//WebPages
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

//Cloud Storage
const Mongoose = require('mongoose')
const fs = require('fs')
const url = require('inspector')
const certificate =  fs.readFileSync('SSL/TCertificate.pem')
const option = {Server: {SSLCA: certificate}};
const ConToCloudStorage = 'mongodb+srv://MNgetu83:MuD8WnEf5zhhpHar@cluster0.vwavmzr.mongodb.net/?retryWrites=true&w=majority'
//This programming statement was adapted from Mozilla Developer:
//Link: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
//Author: Mozilla
Mongoose.set("strictQuery", false);

Mongoose.connect(ConToCloudStorage).then(() => {console.log('Cloud Storage (MongoDB) has been connected successfully!')})
.catch(() => {console.log('Connection to the cloud storage (MongoDB) has failed.')}, option);

//Security
//Passcode Encryption
const Bcrypt = require('bcrypt');

App.use(Express.json())

//CORS
const CORS = require('cors')

App.use((req,res, next)=>{

    res.setHeader('Acess-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Origin','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','*');
    next();
});

App.use(CORS())

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

//WebRTC

const ServerOne = App.listen(4000, function(connection, disconnected){});

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
App.post(Controller+AttendSession, (req, res)=>{


})
//Checking whether the patient's book session is valid
App.post(Controller + ValidateSession, (req, res)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;
    //Get Name and contact details of patient 
    Appointments.findOne({ID: req.body.ID, DayAndTime: req.body.DayAndTime}, function(err, FoundAppointment){


    if(FoundAppointment){

            res.status(200).json({Message: 'Session has been found successsfully. Please wait while counselor joins into the sesssion...'});
    }else{
            res.status(409).json({Message: 'Error: Session could not be loaded, this appointment could not be found.'});
    }

    });

})

//Patient - Filing A Police Report 
App.post(Controller + FilePoliceReport, (req,res)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    //Format Supplied Date
    //This programming statement was adapted from Momentjs:
    //Link: https://momentjs.com/
    //Author: Momentjs
    const ReportDate = require('moment')

    //This programming statement was adapted from Momentjs:
    //Link: https://momentjs.com/
    //Author: Momentjs
    const PoliceReport = new PoliceReports({ID: req.body.ID,
        Name: req.body.Name,
        Surname: req.body.Surname,
        DayAndTime: ReportDate(req.body.DayAndTime).format('DD/MMM/YYYY'),
        Description: req.body.Description,
        OfficerSignature: req.body.OfficerSignature})

    PoliceReports.findOne({ID: req.body.ID}, function(err, result){

        if(result){
        res.status(409).json({Message: 'Error: Police Report has not been filed successfully.' + "\n"+ 'This report already exists'});
        }else{
        PoliceReport.save()
        res.status(201).json({Message: 'Your Police Report has been filed successfully.', PoliceReport, Reminder: 'Please keep your case number to follow-up on you case' });
        }

    });
    

})
//Registration - Counselors
App.post(Controller + RegisterCounselors, async(req,res)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    const NewCounselors = new Counselors({ Username: req.body.Username, Passcode: req.body.Passcode});
   
    var IndexedCounselor = await Counselors.findOne({Username: req.body.Username});

    if(IndexedCounselor){

           
        res.status(409).json({Message: 'Registration Failed: This user already exists'})
    }else{

        NewCounselors.save().then(()=>{
        res.status(201).json({Message: 'Registration successful.'})
    })
        

}
})
//Login - Counselors
App.post(Controller + LoginCounselors,async (req,res)=>{

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
App.get(Controller + CounselorDashboard, async(req,res)=>{

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
App.patch(Controller + CounselorAppointmentsUpdate, async(res,req)=>{

    //DDOS Protection 
    ThembaDDOSProtect.prevent;

    Appointments.findOneAndRemove({ID: req.body.ID, Name: req.body.Name, Surname: req.body.Surname, DayAndTime: req.body.DayAndTime}, function(err, Appointment){

        if(Appointment){

            res.status(200).send({Message: 'Appointments have been updated successfully'});
        }else{
            res.status(404).send({Message: 'Appointments have not been updated successfully'});

        }
        
    });

})
App.use(Controller+AttendSession,AppointmentsRoute)
App.use(Controller+FilePoliceReport, PoliceReportsRoute)
App.use(Controller+RegisterCounselors,CounselorsRoute)
App.use(Controller+LoginCounselors,CounselorsRoute)
App.use(Controller+CounselorDashboard, CounselorsRoute)
App.use(Controller+CounselorAppointmentsUpdate, CounselorsRoute)

module.exports = App;