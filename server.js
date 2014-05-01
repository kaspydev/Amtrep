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

// Pressure / Temperature Controllers
var pressure = require('./app/controllers/pressure')
var temperature = require('./app/controllers/temperature')

var pressureController = pressure(server, 60)
var temperatureController = temperature(server, 300)

var measure = require('./app/controllers/measure')
var measureController = measure(server, pressureController.addNewPressure, temperatureController.addNewTemperature)

var valPressure = 10
setInterval(function () {
	valPressure = valPressure + (Math.random() + Math.random()*-1)
	measureController.newPressure(valPressure)
}, 1000)

var valTemperature = 100
setInterval(function () {
	measureController.newTemperature(valTemperature + (Math.random() + Math.random()*-1)*10)
}, 5000)

server.get('/', function (req, res) {
	res.render('app')
})

//server.listen(3000);
var port = Number(process.env.PORT || 5000);
server.listen(port)