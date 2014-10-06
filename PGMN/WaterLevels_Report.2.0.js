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
		var chartData = _.map(fs, function(feature) {
			var yearMonth = feature.attributes['Year_'] + (feature.attributes['Month_'] - 0.5)/12;
			return [yearMonth, feature.attributes['AVG_']];
		});
		chartData = [['Water Level', 'Year']].concat(chartData);
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
	var options = {
		title: 'PGMN Monthly Average Water Level',
		hAxis: {title: 'Year'},
		vAxis: {title: 'Water Level'},
		legend: 'none',
		width:800,
        height:600,
		trendlines: { 0: {color: 'green',
        visibleInLegend: true} }    // Draw a trendline for data series 0.
	  };
	  var data = google.visualization.arrayToDataTable(chartData);
	  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
	  chart.draw(data, options);
});
