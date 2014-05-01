var speedController = function () {
  	var speeds = [];

	var chart = new CanvasJS.Chart("planoSpeeds",{
		axisX:{
			valueFormatString: "h:mm:ss"
		},
		data: [{
			type: "line",
			xValueType: "dateTime",
			color: "#d9544f",
			dataPoints: speeds 
		}]
	});
  
	$.get( "/allSpeeds", function( data ) {
		//console.log(data)
		for(var i=0; i<data.length; ++i){
			var time = moment(data[i].date)
			var date = new Date(time.year(), time.month(), time.date(), time.hour(), time.minute(), time.second())
			speeds.push({x: date, y: data[i].value})
		}

		chart.render()

		setInterval(function () {
			$.get( "/allSpeedsTo", {date: speeds[speeds.length-1].x}, function( data ) {
				for(var i=0; i<data.length; ++i){
					var time = moment(data[i].date)
					var date = new Date(time.year(), time.month(), time.date(), time.hour(), time.minute(), time.second())
					speeds.push({x: date, y: data[i].value})
					
					if(speeds.length > 60){
						speeds.shift()  
					}
				}

				chart.render()
			});
		}, 1000)
	});
}