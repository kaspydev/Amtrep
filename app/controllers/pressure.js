var _ 		= require('underscore'),
	moment 	= require('moment');

var Measure = require('../models/measure')

var pressureController = function (server, time) {
	var lastTime
	var pressures = []

	var calculateLastPressures = function () {
		var timeLast = moment().subtract('seconds', lastTime)
		var query = Measure.where('id_graphic').equals('graphic001').where('date').gt(timeLast).select('value date').exec(function (err, measures) {
			pressures = measures
			//console.log('load pressures', pressures)
		})
	}

	server.get('/allPressures', function (req, res) {
		res.send(pressures)
	})

	server.get('/allPressuresTo', function (req, res) {
		var time = new Date(req.query.date)
		//console.log(time)
		var index = _.sortedIndex(pressures, {value: 0, date: time}, 'date')
		//console.log(pressures[index].date)
		if(index > 0 && index < pressures.length){
			var mom = moment(pressures[index].date)
			if(mom.isSame(time)){
				//console.log('entre mierda!!')
				index++
			}
		}

		res.send(pressures.slice(index, pressures.length))
	})

	server.post('/newLastTime', function (req, res) {
		var time = 5400
		lastTime = time
		pressures = calculateLastPressures(lastTime)
	})

	var addNewPressure = function (time, value) {
		pressures.push({ value: value, date: time })
	}

	lastTime = time
	calculateLastPressures()

	setInterval(function () {
		var timeLast = moment().subtract('seconds', lastTime)
		if(pressures.length > 0){
			var firstTime = moment(pressures[0].date)
			if(firstTime.isBefore(timeLast)){
				pressures.shift()
			}
		}
	}, 500)
	
	return{
		addNewPressure : addNewPressure
	}
}

module.exports = pressureController