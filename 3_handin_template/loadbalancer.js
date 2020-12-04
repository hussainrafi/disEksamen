const https = require('https');
const httpsProxy = require('http-proxy');
const seaport = require('seaport');
const ports = seaport.connect('localhost', 9090);
const fs = require('fs');
const path = require('path');

var i = -1;

const options = {
    key: fs.readFileSync(path.join(__dirname, 'keys', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'keys', 'cert.pem')),

};

const proxy = httpsProxy.createProxyServer({});
const server = https.createServer(options, function (req, res) {
    let address = ports.query('crash');
    if (!address.length) {
        res.writeHead(503,{'Content-Type': 'text/plain'} );
        res.end('No server is avalible');
        return;
    }

    i = (i + 1) % address.length;

    const host = address[i].host.split(':').reverse()[0];
    const port = address[i].port;

    proxy.web(req, res, {target: 'https://' + host + ':' + port, secure: false});

});

server.listen(8080,function () {
    console.log('Load balancer is listening on port %d', 8080);
});