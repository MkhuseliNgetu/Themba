const HTTP = require('http');
const { Session } = require('inspector');
const RequiredPort = 3000;

//WebRTC-Part 1
const static = require('node-static');
const file = new(static.Server)();


const Server = HTTP.createServer((req, res)=>{

res.log('Themba has started successfully');
res.log('Now starting other services...Please wait....');

file.serve(req,res);
});
//WebRTC-Part 2
const SessionIO = require('socket.io').listen(app);
SessionIO.sockets.io('connection',(socket)=>{


})

Server.listen(RequiredPort);
