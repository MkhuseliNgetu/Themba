const HTTP = require('https');
const App = require('./app');
const fs = require('fs');
const { Socket } = require('socket.io');

const RequiredPort = 3000

const Server = HTTP.createServer({

    key: fs.readFileSync('SSL/TPrivateKey.pem'),
    cert: fs.readFileSync('SSL/TCertificate.pem')

},App);


//Signaling Server from Video Conferencing
//This programming statement was adapted from Vegibit:
//Link: https://vegibit.com/nodejs-webrtc-signalling-server/
//Author: Vegibit
const SignalServer = require('socket.io')(Server);

//The following 4 programming statements were adapted from Vegibit:
//Link: https://vegibit.com/nodejs-webrtc-signalling-server/
//Author: Vegibit
SignalServer.on('Connection',(Socket) =>{

 
    console.log('Patient has been connected successfully.');
    Socket.on('unsuccessful connection', () =>{
    console.log('Patient has unfortunately disconnected.');
    });

});


Server.listen(RequiredPort)
