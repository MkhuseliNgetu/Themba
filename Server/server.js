const HTTP = require('http');
const RequiredPort = 3000;
const app = require('./app');



const Server = HTTP.createServer((req, res)=>{

res.log('Themba has started successfully');
res.log('Now starting other services...Please wait....');


});


Server.listen(RequiredPort);
