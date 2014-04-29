var models = require('./models'),
	Schema = models.Schema;

var measureSchema = Schema({
	id_graphic : String,
	value : Number,
	date : Date
})

var Measure = models.model('measure', measureSchema)

module.exports = Measure