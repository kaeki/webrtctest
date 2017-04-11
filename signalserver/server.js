const express = require('express');
const https = require('https');
const config = require('getconfig');
const sockets = require('signal-master/sockets');
const fs = require('fs');

// ####### SSL CERTIFICATES AND KEY FOR HTTPS #######
const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem')

const options = {
      key: sslkey,
      cert: sslcert
};
// ##################################################

const app = express();
const server = https.createServer(options, app).listen(8888);


sockets(server, config);