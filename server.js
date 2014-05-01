var express = require('express'),
	swig = require('swig');

var bodyParser = require('body-parser');

var server = express();

// View render config
server.engine('html', swig.renderFile);
server.set('view engine', 'html');
server.set('views', __dirname + '/app/views');

server.use(bodyParser());
server.use(express.static('./public'));

// Pressure / Temperature / Altitude Controllers
var pressure = require('./app/controllers/pressure')
var temperature = require('./app/controllers/temperature')
var altitude = require('./app/controllers/altitude')
var speed = require('./app/controllers/speed')

var pressureController = pressure(server, 60)
var temperatureController = temperature(server, 300)
var altitudeController = altitude(server, 180)
var speedController = speed(server, 120)

var measure = require('./app/controllers/measure')
var measureController = measure(server, pressureController.addNewPressure, temperatureController.addNewTemperature, altitudeController.addNewAltitude, speedController.addNewSpeed)

var valPressure = 10
setInterval(function () {
	valPressure = valPressure + (Math.random() + Math.random()*-1)
	measureController.newPressure(valPressure)
}, 1000)

var valTemperature = 100
setInterval(function () {	
	valTemperature = valTemperature + (Math.random() + Math.random()*-1)*10
	measureController.newTemperature(valTemperature)
}, 5000)

var valAltitude = 20
setInterval(function () {
	valAltitude =valAltitude + (Math.random() + Math.random()*-1)*3
	measureController.newAltitude(valAltitude)
}, 3000)

var valSpeed = 50
setInterval(function () {
	valSpeed =valSpeed + (Math.random() + Math.random()*-1)*50
	measureController.newSpeed(valSpeed)
}, 2000)

server.get('/', function (req, res) {
	res.render('app')
})

//server.listen(3000);
var port = Number(process.env.PORT || 5000);
server.listen(port)