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

globalConfig.wordCapitalize = globalConfig.wordCapitalize || function (str){
	var strArray = str.trim().split(' ');
	for(var i=0; i < strArray.length; i++) {
				strArray[i] = strArray[i].substring(0,1).toUpperCase() + strArray[i].substring(1,strArray[i].length).toLowerCase();
	}
	return strArray.join(' ');
};
globalConfig.unitConverter = {
	'MG/L': 'mg/L',
	'NG/L': 'ng/L',
	'UG/L': '\u03BCg/L',
	'TCU': 'TCU'
};
globalConfig.layers = [{
	url: globalConfig.url + "/3",
	renderTargetDiv: "station_description",
	event: "TableReady",
	where: "CASING_ID='" + QueryString.id + "'",
	outFields: ["CASING_ID", "Month_", "Year_", "LEVLE"],
	processResults: function (fs) {
		console.log(fs);
		_.each(fs, function(feature) {
			feature.attributes['YearMonth'] =  feature.attributes['Year_'] * 100 + feature.attributes['Month_'];
		});
		var minYearMonth = _.min(fs, function(feature) {
			return feature.attributes['YearMonth'];
		}).attributes['YearMonth'];
		var maxYearMonth = _.max(fs, function(feature) {
			return feature.attributes['YearMonth'];
		}).attributes['YearMonth'];
		var yearMonthList = _.map(fs, function(feature) {
			return  feature.attributes['Year_'] * 100 + feature.attributes['Month_'];
		});
		var levelList = _.map(fs, function(feature) {
			return  feature.attributes['LEVLE'];
		});
		var results = _.object(yearMonthList, levelList);
		var minYear = Math.floor(minYearMonth / 100);
		var minMonth = minYearMonth - minYear * 100;
		var maxYear = Math.floor(maxYearMonth / 100);
		var maxMonth = maxYearMonth - maxYear * 100;
		var yearMonthList = [];
		for(var i = minMonth; i<= 12; i++) {
			var yearMonth = minYear * 100 + i;
			if(!results.hasOwnProperty(yearMonth)) {
				results[yearMonth] = null;
			}
		}
		for(var j = minYear + 1; j<= maxYear; j++) {
			for(var i = 1; i<= 12; i++) {
				var yearMonth = j * 100 + i;
				if(!results.hasOwnProperty(yearMonth)) {
					results[yearMonth] = null;
				}
			}
		}
		for(var i = 1; i<= maxMonth; i++) {
			var yearMonth = maxYear * 100 + i;
			if(!results.hasOwnProperty(yearMonth)) {
				results[yearMonth] = null;
			}
		}
		
		console.log(minYear);
		console.log(maxYear);
		console.log(results);
		var chartData = {
			data: groupbyParameter,
			name: globalConfig.wordCapitalize(fs[0].attributes.DWS_NAME),
			number: globalConfig.wordCapitalize(fs[0].attributes.DWS_NUMBER)
		};
		chartDataDeferred.resolve(chartData);
		var dws = {
			//name: globalConfig.wordCapitalize(fs[0].attributes.DWS_NAME),
			//number: globalConfig.wordCapitalize(fs[0].attributes.DWS_NUMBER)
		};
		PubSub.emit(globalConfig.layers[0].event + "Data", {dws: dws});
	},
	template: '<strong><center>Drinking Water Surveillance Program (DWSP) <br> Monitoring Results</center></strong><br>' + globalConfig.parametersText
}];

$.when(chartDataPrompt, chartLibraryPrompt).done(function(chartData) {
	_.each(_.range(_.keys(chartData.data).length), function (i) {
		var parameter = _.keys(chartData.data)[i];
		var data = google.visualization.arrayToDataTable(chartData.data[parameter].chartData);
		var options = {
			title:  globalConfig.chooseLang('Median Value of ', 'Median Value of ') + chartData.data[parameter].name + globalConfig.chooseLang(' by Year at the ', ' by Year at the ') + chartData.name + ' (' + chartData.number + ')',
			width: 700, height: 480,
			hAxis: {title: globalConfig.chooseLang('Year', 'Year'), titleColor:'black'}, 
			vAxis: {title: globalConfig.chooseLang('Median Value', 'Median Value') + ' (' + globalConfig.unitConverter[chartData.data[parameter].unit] + ')', minValue: globalConfig.parameters[parameter].detectionLimit, maxValue: globalConfig.parameters[parameter].maximum},
			colors: chartData.data[parameter].colorList
		};
		//console.log(globalConfig.parameters[parameter].maximum);
		var chart = new google.visualization.LineChart(document.getElementById('chart_div' + i));
		chart.draw(data, options);
		//console.log(chartData.data[parameter].chartData);
		//
		var table = globalConfig.chooseLang('Median Value of ', 'Median Value of ') + chartData.data[parameter].name + ' (' + globalConfig.unitConverter[chartData.data[parameter].unit] + ')' + globalConfig.chooseLang(' by Year in ', ' by Year in ') + chartData.name + ' (' + chartData.number + ')';
		table = table + '<table class="noStripes" border="1"><tr>' + _.map(chartData.data[parameter].chartData, function (item) {
			var value = item[0];
			if (value === "Year") {
				value = "&nbsp;&nbsp;&nbsp;&nbsp;";
			}
			return '<th class="shaded"><center>' + value + '</center></th>';
		}).join('') + '</tr>';
		_.each(_.range(chartData.data[parameter].chartData[0].length - 1), function(j) {
			table = table + '<tr>' + _.map(chartData.data[parameter].chartData, function (item) {
				var value = item[j + 1];
				if (!value) {
					value = "-";
				}
				return '<td>' + value + '</td>';
			}).join('') + '</tr>';
		});
		table = table + '</table><br>';
		var str = "For actual results, refer to <a target='_blank' href='https://www.ontario.ca/environment-and-energy/drinking-water-surveillance-program-dwsp-data'>Drinking Water Surveillance Program (DWSP) Data</a><br>\
			Note: The laboratory’s minimum detection limit has been substituted to calculate the median value for results that are reported as below the detection limit.\
			<br>The laboratory's current detection limit for " + chartData.data[parameter].name + " is <i>" + chartData.data[parameter].detectionLimit + " " + globalConfig.unitConverter[chartData.data[parameter].unit] + "</i>.<br>";
		document.getElementById('chart_text_div' + i).innerHTML = table + str;
	});
});
