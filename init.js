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
	    });
	}
    }))

        var valPressure = 2.5;

    setInterval(function () {

        var temp = valPressure + (Math.random() + Math.random()*-1)*0.5;

        while (temp < 0 || temp > 5) {
            temp = valPressure + (Math.random() + Math.random()*-1)*0.5;
        }

        valPressure = temp;

        newPressure(valPressure);

    }, 1000);

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

    var valSpeed = 10;
    setInterval(function () {
        
	var temp = valSpeed + (Math.random() + Math.random()*-1)*5;

        while (temp < 0 || temp > 20) {
            
	    temp = valSpeed + (Math.random() + Math.random()*-1)*5;
        }

        valSpeed = temp;

	newSpeed(valSpeed);
    }, 2000);
}

module.exports = initController
