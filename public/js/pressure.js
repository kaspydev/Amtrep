var pressureController = function () {
  	var pressures = [];

	var chart = new CanvasJS.Chart("planoPressures",{
		axisX:{
			valueFormatString: "h:mm:ss"
		},
		data: [{
			type: "line",
			xValueType: "dateTime",
			color: "#16a085",
			dataPoints: pressures 
		}]
	});
  
	$.get( "/allPressures", function( data ) {
		for(var i=0; i<data.length; ++i){
			var time = moment(data[i].date)
			var date = new Date(time.year(), time.month(), time.date(), time.hour(), time.minute(), time.second())
			pressures.push({x: date, y: data[i].value})
		}

		chart.render()

		setInterval(function () {
			$.get( "/allPressuresTo", {date: pressures[pressures.length-1].x}, function( data ) {
				for(var i=0; i<data.length; ++i){
					var time = moment(data[i].date)
					var date = new Date(time.year(), time.month(), time.date(), time.hour(), time.minute(), time.second())
					pressures.push({x: date, y: data[i].value})
					
					if(pressures.length > 60){
						pressures.shift()  
					}
				}

				chart.render()
			});
		}, 500)
	});
}