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
	url: globalConfig.url + "/1",
	renderTargetDiv: "station_description",
	event: "TableReady",
	where: "(DWS_NUMBER='" + QueryString.id + "')AND(" + _.map(_.keys(globalConfig.parameters), function (p) {return "(PARAMETER = '" + p + "')";}).join('OR') + ")",
	outFields: ["DWS_NAME", "DWS_NUMBER", "SAMPLE_TYPE", "SAMPLE_DATE", "PARAMETER", "CURRENT_DETECTION_LIMIT", "DETECTION_LIMIT_UNIT", "RESULT", "RESULT_UNIT", "QUALIFIER"],
	processResults: function (fs) {
		var median = function (values) {
			values.sort( function(a,b) {return a - b;} );
			var half = Math.floor(values.length/2);
			if(values.length % 2)
				return values[half];
			else
				return (values[half-1] + values[half]) / 2.0;
		};

		var minYear = _.min(fs, function(feature){ return feature.attributes.SAMPLE_DATE.substring(0, 4);}).attributes.SAMPLE_DATE.substring(0, 4);
		var maxYear = _.max(fs, function(feature){ return feature.attributes.SAMPLE_DATE.substring(0, 4);}).attributes.SAMPLE_DATE.substring(0, 4);
		var years = _.range(parseInt(minYear), parseInt(maxYear) + 1);
		
		var groupbyParameter = _.groupBy(fs, function(feature){ return feature.attributes.PARAMETER;});
		_.each(_.keys(groupbyParameter), function (parameter) {
			var unit = groupbyParameter[parameter][0].attributes.RESULT_UNIT;
			var min = _.min(groupbyParameter[parameter], function(feature){ return feature.attributes.RESULT;}).attributes.RESULT;
			var max = _.max(groupbyParameter[parameter], function(feature){ return feature.attributes.RESULT;}).attributes.RESULT;
			var name = globalConfig.parameters[groupbyParameter[parameter][0].attributes.PARAMETER].name;
			var detectionLimit = groupbyParameter[parameter][0].attributes.CURRENT_DETECTION_LIMIT;
			
			groupbyParameter[parameter] = _.groupBy(groupbyParameter[parameter], function(feature){ return feature.attributes.SAMPLE_TYPE;});	
			_.each(_.keys(groupbyParameter[parameter]), function (type) {
				groupbyParameter[parameter][type] = _.groupBy(groupbyParameter[parameter][type], function(feature){ return feature.attributes.SAMPLE_DATE.substring(0, 4);});
				_.each(_.keys(groupbyParameter[parameter][type]), function (year) {
					groupbyParameter[parameter][type][year] = parseFloat(median(_.map(groupbyParameter[parameter][type][year], function(feature) {
						return feature.attributes.RESULT;
					})).toFixed(2));
				});
			});
			var typeListChart = [];
			var colorList = [];
			var typeList = _.keys(groupbyParameter[parameter]);
			_.each([{name: 'Raw Water', color: 'orange'},{name:'Treated Water', color: 'blue'}, {name:'Distribution', color: 'green'}], function(item) {
				if (_.find(typeList, function(type) {return type ===  item.name.toUpperCase();})) {
					typeListChart.push(item.name);
					colorList.push(item.color);
				}
			});
			var results = _.map(years, function(year) {
				var yearStr = '' + year;
				var data = _.map(typeListChart, function (type) {
					if ((groupbyParameter[parameter].hasOwnProperty(type.toUpperCase())) && (groupbyParameter[parameter][type.toUpperCase()].hasOwnProperty(yearStr))) {
						return groupbyParameter[parameter][type.toUpperCase()][yearStr];
					} else {
						return null;
					}
				});
				if(globalConfig.parameters[parameter].hasOwnProperty('standard')) {
					return [yearStr].concat([globalConfig.parameters[parameter].standard]).concat(data);
				} else {
					return [yearStr].concat(data);
				}
			});
			if(globalConfig.parameters[parameter].hasOwnProperty('standard')) {
				groupbyParameter[parameter].chartData = ([['Year'].concat(['Ontario Standard']).concat(typeListChart)]).concat(results);
				colorList = ['red'].concat(colorList);
			} else {
				groupbyParameter[parameter].chartData = ([['Year'].concat(typeListChart)]).concat(results);
			}
			groupbyParameter[parameter].unit = unit;
			groupbyParameter[parameter].min = min;
			groupbyParameter[parameter].max = max;
			groupbyParameter[parameter].name = name;
			groupbyParameter[parameter].colorList = colorList;
			groupbyParameter[parameter].detectionLimit = detectionLimit;
		});
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
	template: '<center>Drinking Water Surveillance Program (DWSP) <br> Monitoring Results</center>'
}];

$.when(chartDataPrompt, chartLibraryPrompt).done(function(chartData) {
	_.each(_.range(_.keys(chartData.data).length), function (i) {
		var parameter = _.keys(chartData.data)[i];
		var data = google.visualization.arrayToDataTable(chartData.data[parameter].chartData);
		var options = {
			title:  globalConfig.chooseLang('Median Concentration of ', 'Median Concentration of ') + chartData.data[parameter].name + globalConfig.chooseLang(' by Year in ', ' by Year in ') + chartData.name + ' (' + chartData.number + ')',
			width: 700, height: 480,
			hAxis: {title: globalConfig.chooseLang('Year', 'Year'), titleColor:'black'}, 
			vAxis: {title: globalConfig.chooseLang('Median Concentration', 'Median Concentration') + ' (' + globalConfig.unitConverter[chartData.data[parameter].unit] + ')'/*, minValue: globalConfig.parameters[parameter].min, maxValue: globalConfig.parameters[parameter].max*/},
			colors: chartData.data[parameter].colorList
		};
		var chart = new google.visualization.LineChart(document.getElementById('chart_div' + i));
		chart.draw(data, options);
		document.getElementById('chart_text_div' + i).innerHTML = "Current Dection Limit: " + chartData.data[parameter].detectionLimit + "<br><a target='_blank' href='https://www.ontario.ca/environment-and-energy/technical-support-document-ontario-drinking-water-standards-objectives-and'>Technical Support Document for Ontario Drinking Water Standards Objectives and Guidelines</a>";		
	});
});
