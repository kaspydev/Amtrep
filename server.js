var express = require('express'),
	swig = require('swig');

//var bodyParser = require('body-parser');

var server = express();

// View render config
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/app/views');

//server.use(bodyParser());

// Pressure / Temperature Controllers
var pressure = require('./app/controllers/pressure')
var temperature = require('./app/controllers/temperature')

var pressureController = pressure(server, 10)
var temperatureController = temperature(server, 5)

var measure = require('./app/controllers/measure')
var measureController = measure(server, pressureController.addNewPressure, temperatureController.addNewTemperature)

setInterval(function () {
	measureController.newPressure(Math.random()*10)
}, 1000)

setInterval(function () {
	measureController.newTemperature(Math.random()*100)
}, 1000)

server.get('/', function (req, res) {
	res.render('app')
})

server.listen(3000);