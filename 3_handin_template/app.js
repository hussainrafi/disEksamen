const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require("./database/db");

const https = require('https');
const path = require('path');
const fs = require('fs');

const seaport = require('seaport');
const ports = seaport.connect('localhost', 9090);
const httpsServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'keys', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'keys', 'cert.pem')),
}, app);

//Added Json Body-parser
app.use(bodyParser.json());

//Import Routes
const accountRoute = require('./routes/accounts');
app.use('/accounts', accountRoute);

const clientRoute = require('./routes/clients');
app.use('/clients', clientRoute);

//Initial route
app.get('/', (req, res) => {
    res.send('Welcome to the banking app');
});

/*
sslServer skal lytte på en port
 */

httpsServer.listen(ports.register('crash'), () => {
    db.getConnection().then(() => {
        console.log('The database is connected')
    });
    console.log('SSL server is listening on d%', httpsServer.address().port);
});



