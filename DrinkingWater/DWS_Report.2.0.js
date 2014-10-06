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
globalConfig.replaceChar =  globalConfig.replaceChar || function(str, charA, charB) {
	var temp = [];
	temp = str.split(charA);
	var result = temp[0];
	if (temp.length >= 2) {
		for (var i = 1; i < temp.length; i++) {
			result = result + charB + temp[i];
		}
	}
	return result;
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
		//console.log(groupbyParameter);
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
	//template: '<strong><center>Drinking Water Surveillance Program (DWSP) <br> Monitoring Results</center></strong><br>' + globalConfig.parametersText
	template: '' + globalConfig.parametersText
}];

$.when(chartDataPrompt, chartLibraryPrompt).done(function(chartData) {
	_.each(_.range(_.keys(chartData.data).length), function (i) {
		var parameter = _.keys(chartData.data)[i];
		if (globalConfig.language === "FR") {
			var columnNamesFrench = {
				'Year': 'Année',
				"Raw Water": 'Eau brute',
				"Treated Water": 'Eau traitée',
				"Distribution": 'Distribution'
			};
			chartData.data[parameter].chartData[0] = _.map(chartData.data[parameter].chartData[0], function(columnName) {
				return columnNamesFrench[columnName];
			});
		}
		//console.log(chartData.data[parameter].chartData);
		var title = '';
		if (globalConfig.language === "EN") {
			title = 'Median Value of ' + chartData.data[parameter].name + ' (' + globalConfig.unitConverter[chartData.data[parameter].unit] + ')' + ' by Year in ' + chartData.name + ' (' + chartData.number + ')';
		} else {
			title = 'Valeur médiane par année, ' + chartData.data[parameter].name + ' (' + globalConfig.unitConverter[chartData.data[parameter].unit] + '), dans le ' + chartData.name + ' (' + chartData.number + ')';
		}		
		var data = google.visualization.arrayToDataTable(chartData.data[parameter].chartData);
		var options = {
			title:  title,
			width: 700, height: 480,
			hAxis: {title: globalConfig.chooseLang('Year', 'Année'), titleColor:'black'}, 
			vAxis: {title: globalConfig.chooseLang('Median Value', 'Valeur médiane') + ' (' + globalConfig.unitConverter[chartData.data[parameter].unit] + ')', minValue: globalConfig.parameters[parameter].detectionLimit, maxValue: globalConfig.parameters[parameter].maximum},
			colors: chartData.data[parameter].colorList
		};
		var chart = new google.visualization.LineChart(document.getElementById('chart_div' + i));
		chart.draw(data, options);
		var table = '<strong><h3>' + title + '</h3></strong>';
		table = table + '<table class="noStripes" border="1"><tr>' + _.map(chartData.data[parameter].chartData, function (item) {
			var value = item[0];
			if ((value === "Year") || (value === "Année")) {
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
				if (globalConfig.language === "FR") {
					value = '' + value;
					value = globalConfig.replaceChar(value, '.', ',');
				}
				return '<td>' + value + '</td>';
			}).join('') + '</tr>';
		});
		table = table + '</table><br>';
		var str = '';
		if (globalConfig.language === "EN") {
			str = "<br>The laboratory's current detection limit for " + chartData.data[parameter].name + " is <i>" + chartData.data[parameter].detectionLimit + " " + globalConfig.unitConverter[chartData.data[parameter].unit] + "</i>.<br>";
		} else {
			str = "<br>Le seuil de détection actuel du laboratoire pour le " + chartData.data[parameter].name + " est de <i>" + chartData.data[parameter].detectionLimit + " " + globalConfig.unitConverter[chartData.data[parameter].unit] + "</i>.<br>";		
		}
		document.getElementById('chart_text_div' + i).innerHTML = table + globalConfig.bottomText + str;
	});
});
