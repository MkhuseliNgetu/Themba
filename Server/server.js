const HTTP = require('https');
const App = require('./app');
const fs = require('fs');

const RequiredPort = 3000

const Server = HTTP.createServer({

    key: fs.readFileSync('SSL/TPrivateKey.pem'),
    cert: fs.readFileSync('SSL/TCertificate.pem')

},App);


Server.listen(RequiredPort);
