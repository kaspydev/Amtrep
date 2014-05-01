var _ 		= require('underscore'),
	moment 	= require('moment');

var Measure = require('../models/measure')

var temperatureController = function (server, time) {
	var lastTime
	var temperatures = []

	var calculateLastTemperatures = function () {
		var timeLast = moment().subtract('seconds', lastTime)
		var query = Measure.where('id_graphic').equals('graphic002').where('date').gt(timeLast).select('value date').exec(function (err, measures) {
			temperatures = measures
			//console.log('load temperatures', temperatures)
		})
	}

	server.get('/allTemperatures', function (req, res) {
		res.send(temperatures)
	})

	server.get('/allTemperaturesTo', function (req, res) {
		var time = new Date(req.query.date)
		var index = _.sortedIndex(temperatures, {value: 0, date: time}, 'date')

		if(index > 0 && index < temperatures.length){
			var mom = moment(temperatures[index].date)
			if(mom.isSame(time)){
				index++
			}
		}

		res.send(temperatures.slice(index, temperatures.length))
	})

	server.post('/newLastTime', function (req, res) {
		var time = 5400
		lastTime = time
		temperatures = calculateLastTemperatures(lastTime)
	})

	var addNewTemperature = function (time, value) {
		temperatures.push({ value: value, date: time })
	}

	lastTime = time
	calculateLastTemperatures()

	setInterval(function () {
		var timeLast = moment().subtract('seconds', lastTime)
		if(temperatures.length > 0){
			var firstTime = moment(temperatures[0].date)
			if(firstTime.isBefore(timeLast)){
				temperatures.shift()
			}
		}
	}, 500)
	
	return{
		addNewTemperature : addNewTemperature
	}
}

module.exports = temperatureController