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
	url: globalConfig.url + "/1",
	renderTargetDiv: "data_table",
	event: "TableReady",
	where: "(DWS_NUMBER='" + QueryString.id + "')AND((PARAMETER = '2-METHYLISOBORNEOL')OR(PARAMETER = 'GEOSMIN'))",
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
			groupbyParameter[parameter] = _.groupBy(groupbyParameter[parameter], function(feature){ return feature.attributes.SAMPLE_TYPE;});	
			_.each(_.keys(groupbyParameter[parameter]), function (type) {
				groupbyParameter[parameter][type] = _.groupBy(groupbyParameter[parameter][type], function(feature){ return feature.attributes.SAMPLE_DATE.substring(0, 4);});
				_.each(_.keys(groupbyParameter[parameter][type]), function (year) {
					groupbyParameter[parameter][type][year] = parseFloat(median(_.map(groupbyParameter[parameter][type][year], function(feature) {
						return feature.attributes.RESULT;
					})).toFixed(2));
				});
			});
			var parameterList = _.keys(groupbyParameter[parameter]);
			console.log(parameterList);
			var results = _.map(years, function(year) {
				var yearStr = '' + year;
				var data = _.map(parameterList, function (type) {
					if (groupbyParameter[parameter][type].hasOwnProperty(yearStr)) {
						return groupbyParameter[parameter][type][yearStr];
					} else {
						return null;
					}
				});
				return [yearStr].concat(data);
			});
			groupbyParameter[parameter] = ([['Year'].concat(parameterList)]).concat(results);			
		});
		
		//console.log();
		//console.log(groupbyParameter);
		var chartData = {data: groupbyParameter};
		chartDataDeferred.resolve(chartData);
		/*
		var dataArray = _.map(fs, function(feature) {
			var attr = feature.attributes;
			return {year: attr.Year_, value: attr.SecchiDepth};
		});
		chartDataDeferred.resolve();
		globalConfig.dataArray = dataArray;
		PubSub.emit(globalConfig.layers[0].event + "Data", {dataArray: dataArray});
		*/
	},
	template: '<br><center><table   class="noStripes" border="1">\
			<caption><%= globalConfig.chooseLang("Water Transparency (Secchi Depth in meters)", "Transparence de l\'eau (profondeur en m&egrave;tres d\'apr&egrave;s le disque Secchi)") %> </caption>\
			<tbody>\
				<tr><th scope="col" class="shaded"><center><%= globalConfig.chooseLang("Year", "Ann&eacute;e") %></center></th><th class="shaded" scope="col"><center><%= globalConfig.chooseLang("Secchi Depth (m)", "Mesure du disque Secchi (m)") %></center></th></tr>\
				<%\
					_.each(dataArray,function(entry,key,list){\
				%>\
					<tr><td><%= entry.year %></td><td><%= entry.value.toFixed(2) %></td></tr>\
				<%\
					});\
				%>\
			</tbody>\
		</table></center><br><br><!--<%= globalConfig.chooseLang("If you have some suggestions or find some errors, please send an Email to <a href=\'mailto:lakepartner@ontario.ca?subject=Portal Error Submission\'>lakepartner@ontario.ca</a>.", "Si vous avez des suggestions ou trouvez des erreurs, envoyez un courriel &agrave; <a href=\'mailto:lakepartner@ontario.ca?subject=Erreur de Portail\'>lakepartner@ontario.ca</a>.") %>-->'
}];

$.when(chartDataPrompt, chartLibraryPrompt).done(function(chartData) {
	console.log(chartData);
	_.each(_.range(_.keys(chartData.data).length), function (i) {
		var parameter = _.keys(chartData.data)[i];
		var data = google.visualization.arrayToDataTable(chartData.data[parameter]);
		var options = {
			title: parameter,
			width: 700, height: 480,
			hAxis: {title: 'Year', titleColor:'black'}, 
			vAxis: {title: 'Concentration', minValue: 0.0}
		};
		var chart = new google.visualization.LineChart(document.getElementById('chart_div' + i));
		chart.draw(data, options);		
	});
	/*var dataArray = globalConfig.dataArray;
	var data = new google.visualization.DataTable();
	var yearString = globalConfig.chooseLang('Year', 'Ann\u00e9e');
	var secchiDepthString = globalConfig.chooseLang('Secchi Depth (m)', 'Mesure du disque Secchi (m)');
	data.addColumn('string', yearString);
	data.addColumn('number', secchiDepthString);
	data.addRows(dataArray.length+1);		
	for (var i=0; i<dataArray.length+1; i++){
		if(i == 0){
			var year = "" + (dataArray[0].year - 1)
			data.setValue(0, 0, year);
			data.setValue(0, 1, 0);	
		}else{
			data.setValue(i, 0, "" + dataArray[i-1].year );
			data.setValue(i, 1, dataArray[i-1].value);	
		}					
	}
	var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));     
	chart.draw(data, {width: 700, height: 480, colors:['#d4bfff'],     
		hAxis: {title: yearString, titleColor:'black'}, vAxis: {title: secchiDepthString, minValue: 0.0}
	});*/		
});
