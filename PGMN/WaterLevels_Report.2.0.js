if (!('trim' in String.prototype)){   
	String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,""); };    
}

var chartLibraryDeferred = new $.Deferred();
var chartLibraryPrompt = (chartLibraryDeferred).promise();
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(function () {
	chartLibraryDeferred.resolve();
	//PubSub.emit("ChartLibraryAvailable");
});

var chartDataDeferred = new $.Deferred();
var chartDataPrompt = (chartDataDeferred).promise();
globalConfig.dataArray = {};
globalConfig.layers = [{
	url: globalConfig.url + "/3",
	renderTargetDiv: "station_description",
	event: "TableReady",
	where: "CASING_ID='" + QueryString.id + "'",
	outFields: ["CASING_ID", "Month_", "Year_", "AVG_"],
	processResults: function (fs) {
		var fsGroupbyMonth = _.groupBy(fs, function(feature) {
			return feature.attributes['Month_'];
		});
		var months = _.keys(fsGroupbyMonth);
		var values = _.map(_.values(fsGroupbyMonth), function(features) {
			return [['Water Level', 'Year']].concat(_.map(features, function(feature) {
				return [feature.attributes['Year_'], parseFloat(feature.attributes['AVG_'].toFixed(2))];
			}));			
		});
		var chartData = _.object(months, values);
		/*
		var chartData = _.map(fs, function(feature) {
			var yearMonth = feature.attributes['Year_'] + (feature.attributes['Month_'] - 0.5)/12;
			return [yearMonth, feature.attributes['AVG_']];
		});
		chartData = [['Water Level', 'Year']].concat(chartData);
		*/
		//console.log(chartData);
		chartDataDeferred.resolve(chartData);
		var dws = {
			//name: globalConfig.wordCapitalize(fs[0].attributes.DWS_NAME),
			//number: globalConfig.wordCapitalize(fs[0].attributes.DWS_NUMBER)
		};
		PubSub.emit(globalConfig.layers[0].event + "Data", {dws: dws});
	},
	template: ''
}];

$.when(chartDataPrompt, chartLibraryPrompt).done(function(chartData) {
	var months = _.keys(chartData);
	var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	for (var i = 0; i < months.length; i++) {
		var month = months[i];
		var options = {
			title: 'PGMN Monthly Average Water Level in ' + monthList[month - 1],
			hAxis: {title: 'Year'},
			vAxis: {title: 'Water Level'},
			legend: {position: 'bottom', textStyle: {color: 'blue', fontSize: 14}},
			width:800,
			height:600,
			trendlines: {
				0: {
					color: 'green', 
					showR2: true,
					visibleInLegend: true
				}
			}    // Draw a trendline for data series 0.
		  };
		  var data = google.visualization.arrayToDataTable(chartData[month]);
		  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div' + month));
		  chart.draw(data, options);		
	}
});
