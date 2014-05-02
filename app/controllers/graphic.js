var graphicController = function (server) {
	
	server.post('/newPressure', function (req, res) {
		var measure = 	new Measure({
			graphic : req.body.graphic,
			value : req.body.value,
			date : req.body.
		})
		measure.save(function (err) {
			if(err){
				res.send(500, err)
			}
			res.redirect('/meassures')
		})
	})
}

module.exports = graphicController