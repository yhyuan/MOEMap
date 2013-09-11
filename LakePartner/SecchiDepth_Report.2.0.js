//var url = "http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Public/Wells2/MapServer/";
//globalConfig.isChartLibraryAvailable = false;
/*
globalConfig.drawChart = function () {
	if (globalConfig.dataArray && globalConfig.isChartLibraryAvailable)  {
		var dataArray = globalConfig.dataArray;
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
		});
	}
};*/
var chartLibraryDeferred = new $.Deferred();
var chartLibraryPrompt = (chartLibraryDeferred).promise();
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(function () {
	chartLibraryDeferred.resolve();
	//PubSub.emit("ChartLibraryAvailable");
});

//PubSub.on("ChartLibraryAvailable", function(renderResult){
//	globalConfig.isChartLibraryAvailable = true;
	//globalConfig.drawChart();	
//});

var chartDataDeferred = new $.Deferred();
var chartDataPrompt = (chartDataDeferred).promise();
globalConfig.dataArray = {};



globalConfig.layers = [{
	url: globalConfig.url + "/3",
	renderTargetDiv: "data_table",
	event: "TableReady",
	where: "ID = " + QueryString.id,
	outFields: ["Year_", "SecchiDepth"],
	processResults: function (fs) {
		var dataArray = _.map(fs, function(feature) {
			var attr = feature.attributes;
			return {year: attr.Year_, value: attr.SecchiDepth};
		});
		chartDataDeferred.resolve();
		globalConfig.dataArray = dataArray;
		//globalConfig.dataArray = dataArray;
		//globalConfig.drawChart();
		PubSub.emit(globalConfig.layers[0].event + "Data", {dataArray: dataArray});
		//document.getElementById(globalConfig.layers[0].renderTargetDiv).innerHTML = _.template(globalConfig.layers[0].template, {dataArray: globalConfig.dataArray});		
	},
	template: '<br><br><center><table class="fishTable" border="1">\
			<caption><%= globalConfig.chooseLang("Water Transparency (Secchi Depth in meters)", "Transparence de l\'eau (profondeur en m&egrave;tres d\'apr&egrave;s le disque Secchi)") %> </caption>\
			<tbody>\
				<tr><th scope="col" class="shaded"><center><%= globalConfig.chooseLang("Year", "Ann&eacute;e") %></center></th><th class="shaded" scope="col"><center><%= globalConfig.chooseLang("Secchi Depth (m)", "Mesure du disque Secchi (m)") %></center></th></tr>\
				<%\
					_.each(dataArray,function(entry,key,list){\
				%>\
					<tr><td><%= entry.year %></td><td><%= entry.value %></td></tr>\
				<%\
					});\
				%>\
			</tbody>\
		</table></center><br><br><%= globalConfig.chooseLang("If you have some suggestions or find some errors, please send an Email to <a href=\'mailto:lakepartner@ontario.ca?subject=Portal Error Submission\'>lakepartner@ontario.ca</a>.", "Si vous avez des suggestions ou trouvez des erreurs, envoyez un courriel &agrave; <a href=\'mailto:lakepartner@ontario.ca?subject=Erreur de Portail\'>lakepartner@ontario.ca</a>.") %>'
}, {
	url: globalConfig.url + "/1",
	renderTargetDiv: "station_description",
	event: "DescriptionReady",
	where: "ID = " + QueryString.id,
	outFields: ["LAKENAME", "STN", "SITEID", "SITEDESC"],
	processResults: function (fs) {
		stationAttr = fs[0].attributes;
		PubSub.emit(globalConfig.layers[1].event + "Data", {stationAttr: stationAttr});
		//document.getElementById("station_description").innerHTML = _.template(document.getElementById("TitleTemplate").innerHTML, stationAttr)			
		//document.getElementById(globalConfig.layers[1].renderTargetDiv).innerHTML = _.template(globalConfig.layers[1].template, {stationAttr: stationAttr});		
	},
	template: '<h1><%= stationAttr.LAKENAME %> (STN <%= stationAttr.STN %>, Site ID <%= stationAttr.SITEID %>)</h1>\
		<strong><%= stationAttr.SITEDESC %></strong>\
		<%\
			if (globalConfig.isEnglish()) {\
		%>\
			<p>The Lake Partner Program is a province-wide, volunteer-based, water-quality monitoring program. Volunteers collect total phosphorus samples and make monthly water clarity observations on their lakes. This information will allow the early detection of changes in the nutrient status and/or the water clarity of the lake due to the impacts of shoreline development, climate change and other stresses.</p><p>Approximately 800 active volunteers monitor total phosphorus at 728 locations in the lakes across Ontario.</p>\
			<p>Increases in phosphorus can decrease water clarity by stimulating algal growth. However, the amount of phosphorus in the lake is not the only factor controlling light penetration, as the amount of dissolved organic carbon (DOC) or non-biological turbidity also plays an important role. Water clarity can also be altered by invading species such as zebra mussels. It is always best, therefore, to use total phosphorus to evaluate the nutrient status of the lake. Nonetheless, water clarity readings are useful for tracking changes in the lake that might be occurring that would not be noticed by monitoring TP concentration alone, e.g. zebra mussel invasions.</p>\
			<p><a href="JavaScript:window.print();">Print this page</a></p>\
			<center><h3>Water Transparency (Secchi Depth in meters)</h3></center>\
		<%\
			} else {\
		%>\
			<p>Le Partenariat pour la protection des lacs ontariens est un programme de surveillance de la qualit&eacute; de l\'eau qui fait appel &agrave; des b&eacute;n&eacute;voles de toute la province. Les b&eacute;n&eacute;voles recueillent des &eacute;chantillons d\'eau d\'un lac pour mesurer sa teneur en phosphore total et notent chaque mois des donn&eacute;es sur la transparence de l\'eau. Ces donn&eacute;es permettent de noter rapidement les changements dans l\'&eacute;quilibre nutritif ou la transparence de l\'eau du lac, qu\'ils soient li&eacute;s &agrave; l\'am&eacute;nagement des berges, au changement climatique ou &agrave; d\'autres sources de perturbation.</p><p>Quelque 800 b&eacute;n&eacute;voles &eacute;valuent la teneur en phosphore total de l\'eau des lacs de l\'Ontario dans 728 lieux.</p>\
			<p>Une teneur &eacute;lev&eacute;e en phosphore peut faire baisser la transparence de l\'eau, car le phosphore stimule la croissance des algues. Cependant, la quantit&eacute; de phosphore n\'est pas le seul facteur qui alt&egrave;re la p&eacute;n&eacute;tration de la lumi&egrave;re dans le lac, car la quantit&eacute; de carbone organique dissous (COD) ou de turbidit&eacute; non biologique peuvent aussi &ecirc;tre en cause. La transparence de l\'eau peut aussi &ecirc;tre alt&eacute;r&eacute;e par des esp&egrave;ces envahissantes, comme les moules z&eacute;br&eacute;es. Par cons&eacute;quent, il est toujours pr&eacute;f&eacute;rable d\'&eacute;valuer l\'&eacute;quilibre nutritif d\'un lac en mesurant la teneur en phosphore total de l\'eau. N&eacute;anmoins, il est utile de mesurer la transparence de l\'eau pour noter les changements qui ne pourraient pas &ecirc;tre d&eacute;cel&eacute;s par la seule mesure de la teneur en phosphore total, comme une invasion de moules z&eacute;br&eacute;es.</p>\
			<p><a href="JavaScript:window.print();">Imprimer cette page</a></p>\
			<center><h3>Transparence de l\'eau (profondeur en m&egrave;tres d\'apr&egrave;s le disque Secchi)</h3></center>\
		<%\
			}\
		%>'
}];

$.when(chartLibraryPrompt, chartDataPrompt).done(function() {
	var dataArray = globalConfig.dataArray;
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
	});		
});

/*
globalConfig.on ([globalConfig.layers[0].event + "Data", "ChartLibraryAvailable"], function () {
	//console.log(globalConfig.eventsStatus[globalConfig.layers[0].event + "Data"]);
	//console.log(globalConfig.eventsStatus["ChartLibraryAvailable"]);
	if(globalConfig.eventsStatus[globalConfig.layers[0].event + "Data"] && globalConfig.eventsStatus["ChartLibraryAvailable"]) {
		var dataArray = globalConfig.eventsData[globalConfig.layers[0].event + "Data"].dataArray;
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
		});		
	}	
});*/
