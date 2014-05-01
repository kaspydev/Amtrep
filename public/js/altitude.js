var altitudeController = function () {
  	var altitudes = [];

	var chart = new CanvasJS.Chart("planoAltitudes",{
		axisX:{
			valueFormatString: "h:mm:ss"
		},
		data: [{
			type: "line",
			xValueType: "dateTime",
			dataPoints: altitudes 
		}]
	});
  	
  	//console.log('/allAltitudes')
	$.get( "/allAltitudes", function( data ) {
		//console.log(data)
		for(var i=0; i<data.length; ++i){
			var time = moment(data[i].date)
			var date = new Date(time.year(), time.month(), time.date(), time.hour(), time.minute(), time.second())
			altitudes.push({x: date, y: data[i].value})
		}

		//console.log('altitudes', altitudes)

		chart.render()

		setInterval(function () {
			$.get( "/allAltitudesTo", {date: altitudes[altitudes.length-1].x}, function( data ) {
				for(var i=0; i<data.length; ++i){
					var time = moment(data[i].date)
					var date = new Date(time.year(), time.month(), time.date(), time.hour(), time.minute(), time.second())
					altitudes.push({x: date, y: data[i].value})
					
					if(altitudes.length > 60){
						altitudes.shift()  
					}
				}

				chart.render()
			});
		}, 500)
	});
}