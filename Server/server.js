const HTTP = require('http');
const RequiredPort = 3000
const App = require('./app');

const fs = require('fs')

const Server = HTTP.createServer({

    key: fs.readFileSync('SSL/TPrivateKey.pem'),
    cert: fs.readFileSync('SSL/TCertificate.pem')

},App);


Server.listen(RequiredPort);
