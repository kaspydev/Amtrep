
var fs = require('fs'),
	graphicsData = fs.readFileSync('./data/graphics.json').toString();
	
var graphics = JSON.parse(graphicsData);

var Graphic = require('./app/models/graphic')

graphics.forEach(function (graphic) {
	var graphic = new Graphic(graphic)
	graphic.save(function (err) {

	})
})