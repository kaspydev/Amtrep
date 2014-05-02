var temperatureController = function () {
  	
  	var temperatures = [];

	var chart = new CanvasJS.Chart("planoTemperatures",{
		axisX:{
			valueFormatString: "h:mm:ss"
		},
		data: [{
			type: "line",
			xValueType: "dateTime",
			color: "rgb(255, 193, 0)",
			dataPoints: temperatures 
		}]
	});
  
	$.get( "/allTemperatures", function( data ) {
		for(var i=0; i<data.length; ++i){
			var time = moment(data[i].date)
			var date = new Date(time.year(), time.month(), time.date(), time.hour(), time.minute(), time.second())
			temperatures.push({x: date, y: data[i].value})
		}

		chart.render()

		setInterval(function () {
			$.get( "/allTemperaturesTo", {date: temperatures[temperatures.length-1].x}, function( data ) {
				for(var i=0; i<data.length; ++i){
					var time = moment(data[i].date)
					var date = new Date(time.year(), time.month(), time.date(), time.hour(), time.minute(), time.second())
					temperatures.push({x: date, y: data[i].value})
					
					if(temperatures.length > 60){
						temperatures.shift()  
					}
				}

				chart.render()
			});
		}, 1000)
	});
}