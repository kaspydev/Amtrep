var mongoose = require('mongoose')

var uristring = process.env.MONGOLAB_URI ||
				process.env.MONGOHQ_URL ||
				'mongodb://localhost/amtrepdb';

mongoose.connect(uristring)

module.exports = mongoose