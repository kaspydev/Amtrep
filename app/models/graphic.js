var models = require('./models'),
	Schema = models.Schema;

var graphicSchema = Schema({
	id_graphic : String,
	sensor : String,
	machine : String,
	magnitude : String,
	unit: String,
	max : Number,
	min : Number,
	lastTime : Number,
	deltaTime : Number
})

var Graphic = models.model('graphic', graphicSchema)

module.exports = Graphic