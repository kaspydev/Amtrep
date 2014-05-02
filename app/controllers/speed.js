var _ 		= require('underscore'),
	moment 	= require('moment');

var Measure = require('../models/measure')

var speedController = function (server, time) {
	var lastTime
	var speeds = []

	var calculateLastSpeeds = function () {
		var timeLast = moment().subtract('seconds', lastTime)
		var query = Measure.where('id_graphic').equals('graphic004').where('date').gt(timeLast).select('value date').exec(function (err, measures) {
			speeds = measures
		})
	}

	server.get('/allSpeeds', function (req, res) {
		res.send(speeds)
	})

	server.get('/allSpeedsTo', function (req, res) {
		var time = new Date(req.query.date)
		var index = _.sortedIndex(speeds, {date: time}, 'date')
		if(index > 0 && index < speeds.length){
			var mom = moment(speeds[index].date)
			if(mom.isSame(time)){
				index++
			}
		}
		res.send(speeds.slice(index, speeds.length))
	})
	/*
	server.post('/newLastTime', function (req, res) {
		var time = 5400
		lastTime = time
		speeds = calculateLastspeeds(lastTime)
	})*/

	var addNewSpeed = function (time, value) {
		speeds.push({ value: value, date: time })
	}

	lastTime = time
	calculateLastSpeeds()

	setInterval(function () {
		var timeLast = moment().subtract('seconds', lastTime)
		if(speeds.length > 0){
			var firstTime = moment(speeds[0].date)
			if(firstTime.isBefore(timeLast)){
				speeds.shift()
			}
		}
	}, 500)
	
	return{
		addNewSpeed : addNewSpeed
	}
}

module.exports = speedController