var express = require('express');
var fs = require('fs');
var jade = require('jade');
var path = require('path');
var request = require('request');

var app = express();

app.use(express.static(process.cwd() + '/bower_components'));
app.use(express.static(process.cwd() + '/models'));
app.use(express.static(process.cwd() + '/public'));
app.use(express.static(process.cwd() + '/templates'));

//Root
app.get('/', function (req, res) {
	var html = jade.renderFile('views/index.jade');
    res.send(html);
});

//Experimental - fiddle
app.get('/fiddle', function(req, res) {
	var html = jade.renderFile('views/fiddle.jade');
	res.send(html);
});	

//Path to Save by Hash to MongoDB
app.post('/create/:hash', function(req, res) {
	var hash = request.params.hash;
	res.send("hash is "+hash);
});

var port = '12345';
app.listen(port);

console.log('Magic happens on port '+port);
console.log('MongoDB REST Web Server on port 3000?');
console.log('Mongo-express GUI Web Server on port 8081?');
exports = module.exports = app;