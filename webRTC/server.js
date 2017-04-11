const fs = require('fs');
const express = require('express');
const app = express();

const sslkey = fs.readFileSync('ssl-key.pem');
const sslcert = fs.readFileSync('ssl-cert.pem')

const options = {
      key: sslkey,
      cert: sslcert
};

app.use(express.static(__dirname + '/public'));

const https = require('https');
https.createServer(options, app).listen(3001, () => {
    console.log('Server listening port 3001');
});

const http = require('http');
http.createServer((req, res) => {
      res.writeHead(301, { 'Location': 'https://localhost:3001' + req.url });
      res.end();
}).listen(8080);

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/videochat.html');
});

