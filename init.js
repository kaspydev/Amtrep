var Graphic = require('./app/models/graphic')

var initController = function (newPressure, newTemperature, newAltitude, newSpeed) {

	if(Graphic.count({}, function (err, count) {
		if(count == 0){
			var fs = require('fs'),
			graphicsData = fs.readFileSync('./data/graphics.json').toString(),
			graphics = JSON.parse(graphicsData);
			graphics.forEach(function (graphic) {
				var graphic = new Graphic(graphic)
				graphic.save()
			})
		}
	}))

	var valPressure = 10
	setInterval(function () {
		valPressure = valPressure + (Math.random() + Math.random()*-1)
		newPressure(valPressure)
	}, 1000)

	var valTemperature = 100
	setInterval(function () {	
		valTemperature = valTemperature + (Math.random() + Math.random()*-1)*10
		newTemperature(valTemperature)
	}, 5000)

	var valAltitude = 20
	setInterval(function () {
		valAltitude = valAltitude + (Math.random() + Math.random()*-1)*3
		newAltitude(valAltitude)
	}, 3000)

	var valSpeed = 50
	setInterval(function () {
		valSpeed = valSpeed + (Math.random() + Math.random()*-1)*50
		newSpeed(valSpeed)
	}, 2000)
}

module.exports = initController