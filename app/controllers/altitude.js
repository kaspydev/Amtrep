var _ 		= require('underscore'),
	moment 	= require('moment');

var Measure = require('../models/measure')

var altitudeController = function (server, time) {
	var lastTime
	var altitudes = []

	var calculateLastAltitudes = function () {
		var timeLast = moment().subtract('seconds', lastTime)
		var query = Measure.where('id_graphic').equals('graphic003').where('date').gt(timeLast).select('value date').exec(function (err, measures) {
			altitudes = measures
			//console.log('load altitudes', altitudes)
		})
	}

	server.get('/allAltitudes', function (req, res) {
		res.send(altitudes)
	})

	server.get('/allAltitudesTo', function (req, res) {
		var time = new Date(req.query.date)
		//console.log(time)
		var index = _.sortedIndex(altitudes, {value: 0, date: time}, 'date')
		//console.log(altitudes[index].date)
		if(index > 0 && index < altitudes.length){
			var mom = moment(altitudes[index].date)
			if(mom.isSame(time)){
				//console.log('entre mierda!!')
				index++
			}
		}

		res.send(altitudes.slice(index, altitudes.length))
	})

	server.post('/newLastTime', function (req, res) {
		var time = 5400
		lastTime = time
		altitudes = calculateLastaltitudes(lastTime)
	})

	var addNewAltitude = function (time, value) {
		altitudes.push({ value: value, date: time })
	}

	lastTime = time
	calculateLastAltitudes()

	setInterval(function () {
		var timeLast = moment().subtract('seconds', lastTime)
		if(altitudes.length > 0){
			var firstTime = moment(altitudes[0].date)
			if(firstTime.isBefore(timeLast)){
				altitudes.shift()
			}
		}
	}, 500)
	
	return{
		addNewAltitude : addNewAltitude
	}
}

module.exports = altitudeController	