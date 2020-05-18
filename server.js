var express = require('express');
var fs = require('fs');
var http = require('http');
var https = require('https');

// https credentials
var privateKey = fs.readFileSync('/etc/letsencrypt/live/yorb.online/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/yorb.online/fullchain.pem','utf8');
var credentials = {key: privateKey, cert: certificate}

var app = express();
var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

// var server = app.listen(80);
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

app.use(express.static('public'));

app.get("/", function (request, response) {
	  response.sendFile(__dirname + '/views/index.html');
});

app.get("/tool.html", function (request, response) {
	response.sendFile(__dirname + '/views/tool.html');
});

app.get("/frame1.html", function (request, response) {
	response.sendFile(__dirname + '/views/frame1.html');
});

app.get("/yarchive.html", function (request, response) {
	response.sendFile(__dirname + '/views/yarchive.html');
});

app.get("/yorb2.html", function (request, response) {
	response.sendFile(__dirname + '/views/yorb2.html');
});

app.get("/about.html", function (request, response) {
	response.sendFile(__dirname + '/views/about.html');
});


app.get("/yarchive", function (request, response) {
	response.sendFile(__dirname + '/views/index-yarchive.html');
});
app.get("/yorb20", function (request, response) {
	response.sendFile(__dirname + '/views/index-yorb2.html');
});
app.get("/about", function (request, response) {
	response.sendFile(__dirname + '/views/index-about.html');
});


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);
