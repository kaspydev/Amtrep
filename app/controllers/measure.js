var Graphic = require('../models/graphic')
var Measure = require('../models/measure')
var moment 	= require('moment')

var measureController = function (server, addNewPressure, addNewTemperature, addNewAltitude, addNewSpeed) {

	var newPressure = function (value) {
		var measure = 	new Measure({
			id_graphic : 'graphic001',
			value : value,
			date : moment().format()
		})
		measure.save(function (err) {
			addNewPressure(measure.date, value)
		})
	}

	var newTemperature = function (value) {
		var measure = 	new Measure({
			id_graphic : 'graphic002',
			value : value,
			date : moment().format()
		})
		measure.save(function (err) {
			addNewTemperature(measure.date, value)
		})
	}
	
	var newAltitude = function (value) {
		var measure = 	new Measure({
			id_graphic : 'graphic003',
			value : value,
			date : moment().format()
		})
		measure.save(function (err) {
			addNewAltitude(measure.date, value)
		})
	}
	
	var newSpeed = function (value) {
		var measure = 	new Measure({
			id_graphic : 'graphic004',
			value : value,
			date : moment().format()
		})
		measure.save(function (err) {
			addNewSpeed(measure.date, value)
		})
	}

	return {
		newPressure : newPressure,
		newTemperature : newTemperature,
		newAltitude : newAltitude,
		newSpeed : newSpeed
	}
}

module.exports = measureController