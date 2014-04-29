var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/' + 'amtrepdb')

module.exports = mongoose