var express = require('express'),
	swig = require('swig');

var server = express()

server.engine('html', swig.renderFile)
server.set('view engine', 'html')
server.set('views', __dirname + '/app/views')

server.use(express.static('./public'))

var pressure = require('./app/controllers/pressure'),
	temperature = require('./app/controllers/temperature'),
	altitude = require('./app/controllers/altitude'),
	speed = require('./app/controllers/speed'),
	measure = require('./app/controllers/measure');

var pressureController = pressure(server, 60),
	temperatureController = temperature(server, 300),
	altitudeController = altitude(server, 180),
	speedController = speed(server, 120),
	measureController = measure(server, pressureController.addNewPressure, temperatureController.addNewTemperature, altitudeController.addNewAltitude, speedController.addNewSpeed);

var init = require('./init')
var initController = init(measureController.newPressure, measureController.newTemperature, measureController.newAltitude, measureController.newSpeed)

server.get('/', function (req, res) {
	res.render('app')
})

var port = Number(process.env.PORT || 5000)
server.listen(port)