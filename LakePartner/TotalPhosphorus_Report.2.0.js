//var url = "http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Public/Wells2/MapServer/";
globalConfig.isChartLibraryAvailable = false;
globalConfig.drawChart = function () {
	if (globalConfig.dataArray && globalConfig.isChartLibraryAvailable)  {
		var greekSymbol = function (str) {return String.fromCharCode(str.charCodeAt(0) + (913 - 65));};
		var getAverage = function(tp1, tp2){
			var value = 0;
			if((typeof(tp1) != "undefined") && (typeof(tp2) != "undefined")){
				value = 0.5*(tp1 + tp2);
			}else{
				if((typeof(tp1) != "undefined")){
					value = tp1;
				}
				if((typeof(tp2) != "undefined")){
					value = tp2;
				}					
			}
			return parseFloat(value.toFixed(2));
		};		
		var dataArray = globalConfig.dataArray;
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Date');
		var concentrationString = globalConfig.chooseLang("Average Concentration of Total Phosphorus", "Concentration moyennes de phosphore total");
		data.addColumn('number', concentrationString + ' (' + greekSymbol('l') +'g/L)');
		data.addRows(dataArray.length);				
		for (var i=0; i<dataArray.length; i++){
			data.setValue(i, 0, dataArray[i].date);
			data.setValue(i, 1, getAverage(dataArray[i].tp1, dataArray[i].tp2));	
		}
		var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));     
		chart.draw(data, {width: 700, height: 480, colors:['#d4bfff'],     
			hAxis: {title: 'Date', titleColor:'black'}, vAxis: {title: concentrationString + ' (' + greekSymbol('l') +'g/L)', minValue: 0.0}
		});
	}
};
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(function () {
	globalConfig.isChartLibraryAvailable = true;
	globalConfig.drawChart();
});

globalConfig.layers = [{
	url: globalConfig.url + "/2",
	renderTargetDiv: "data_table",
	event: "TableReady",
	where: "ID = " + QueryString.id,
	outFields: ["Date_", "TP1", "TP2", "DataCollector", "MajorDifference"],
	processResults: function (fs) {
		var convertDate = function (date) {
			var d = new Date(date);
			var month = d.getMonth() + 1;
			var day = d.getDate();	
			return "" + d.getFullYear() + "-" + ((month < 10) ? ("0" + month) :  ("" + month)) + "-" + ((day < 10) ? ("0" + day) :  ("" + day));
		};
		globalConfig.dataArray = _.map(fs, function(feature) {
			var attr = feature.attributes;
			return {date: convertDate(attr.Date_), tp1: attr.TP1, tp2: attr.TP2};
		});
		globalConfig.drawChart();
		document.getElementById(globalConfig.layers[0].renderTargetDiv).innerHTML = _.template(globalConfig.layers[0].template, {dataArray: globalConfig.dataArray});		
	},
	template: '		<br><br><table class=\'fishTable\' border=\'1\'>\
			<caption><%= globalConfig.chooseLang("Average Total Phosphorus (TP) Concentration (&micro;g/L)", "Concentration moyennes de phosphore total (&micro;g/L)") %> </caption>\
			<tbody>\
				<tr><th scope=\'col\'><%= globalConfig.chooseLang("Date", "Ann&eacute;e") %></th><th scope=\'col\'><%=  globalConfig.chooseLang("Sample", "&Eacute;chantillon") %> 1 (&micro;g/L)</th><th scope=\'col\'><%=  globalConfig.chooseLang("Sample", "&Eacute;chantillon") %> 2 (&micro;g/L)</th><th scope=\'col\'><%=  globalConfig.chooseLang("Average", "Moyenne") %> (&micro;g/L)</th></tr>\
				<%\
					var getAverage = function(tp1, tp2){\
						var value = 0;\
						if((typeof(tp1) != "undefined") && (typeof(tp2) != "undefined")){\
							value = 0.5*(tp1 + tp2);\
						}else{\
							if((typeof(tp1) != "undefined")){\
								value = tp1;\
							}\
							if((typeof(tp2) != "undefined")){\
								value = tp2;\
							}					\
						}\
						return parseFloat(value.toFixed(2));\
					};\
					_.each(dataArray,function(entry,key,list){\
						var v1 = "";\
						if((typeof(entry.tp1) != "undefined")){\
							v1 = "" + (entry.tp1);\
						}\
						var v2 = "";\
						if((typeof(entry.tp2) != "undefined")){\
							v2 = "" + (entry.tp2);\
						}\
						avgString = "";\
						var avg = getAverage(entry.tp1, entry.tp2);\
						if(avg > 0){\
							avgString = "" + avg;\
						}\
				%>\
					<tr><td><%= entry.date %></td><td><%= v1 %></td><td><%= v2 %></td><td><%= avgString %></td></tr>\
				<%\
					});					\
				%>\
			</tbody>\
		</table>\
		<br><br><%= globalConfig.chooseLang("If you have some suggestions or find some errors, please send an Email to <a href=\'mailto:lakepartner@ontario.ca?subject=Portal Error Submission\'>lakepartner@ontario.ca</a>.", "Si vous avez des suggestions ou trouvez des erreurs, envoyez un courriel &agrave; <a href=\'mailto:lakepartner@ontario.ca?subject=Erreur de Portail\'>lakepartner@ontario.ca</a>.") %>'
}, {
	url: globalConfig.url + "/1",
	renderTargetDiv: "station_description",
	event: "DescriptionReady",
	where: "ID = " + QueryString.id,
	outFields: ["LAKENAME", "STN", "SITEID", "SITEDESC"],
	processResults: function (fs) {
		stationAttr = fs[0].attributes;
		document.getElementById(globalConfig.layers[1].renderTargetDiv).innerHTML = _.template(globalConfig.layers[1].template, {stationAttr: stationAttr});		
	},
	template: '<h1><%= stationAttr.LAKENAME %> (STN <%= stationAttr.STN %>, Site ID <%= stationAttr.SITEID %>)</h1>\
		<strong><%= stationAttr.SITEDESC %></strong>\
		<%\
			if (globalConfig.isEnglish()) {\
		%>\
			<p>The Lake Partner Program is a province-wide, volunteer-based, water-quality monitoring program. Volunteers collect total phosphorus samples and make monthly water clarity observations on their lakes. This information will allow the early detection of changes in the nutrient status and/or the water clarity of the lake due to the impacts of shoreline development, climate change and other stresses.</p>\
			<p>Approximately 800 active volunteers monitor Secchi depth and total phosphorus at 728 locations in the lakes across Ontario.</p>\
			<p>Total phosphorus concentration are ideally used to interpret nutrient status in Ontario lakes, since phosphorus is the element that controls the growth of algae in most Ontario lakes. Increases in phosphorus will decrease water clarity by stimulating algal growth. In extreme cases, algal blooms will affect the aesthetics of the lake and/or cause taste and odour problems in the water.</p>\
			<p>Many limnologists place lakes into three broad categories with respect to nutrient status. Lakes with less that 10 &micro;g/L TP are considered oligotrophic. These are dilute, unproductive lakes that rarely experience nuisance algal blooms. Lakes with TP between 10 and 20 &micro;g/L are termed mesotrophic and are in the middle with respect to trophic status. These lakes show a broad range of characteristics and can be clear and unproductive at the bottom end of the scale or susceptible to moderate algal blooms at concentration near 20 &micro;g/L. Lakes over 20 &micro;g/L are classed as eutrophic and may exhibit persistent, nuisance algal blooms.</p>\
			<p>Note: Tea stained lakes, with high dissolved organic carbon (DOC), are called dystrophic lakes and do not share the algal/TP relationships described above. Generally there can be more TP in a dystrophic lake without the occurrence of algal blooms. The chemistry of these lakes is quite complex.</p>\
			<p><a href="JavaScript:window.print();">Print this page</a></p>\
			<center><h3>Average Total Phosphorus (TP) Concentration (&micro;g/L)</h3></center>\
		<%\
			} else {\
		%>\
			<p>Le Partenariat pour la protection des lacs ontariens est un programme de surveillance de la qualit&eacute; de l\'eau qui fait appel &agrave; des b&eacute;n&eacute;voles de toute la province. Les b&eacute;n&eacute;voles recueillent des &eacute;chantillons d\'eau d\'un lac pour mesurer sa teneur en phosphore total et notent chaque mois des donn&eacute;es sur la transparence de l\'eau. Ces donn&eacute;es permettent de noter rapidement les changements dans l\'&eacute;quilibre nutritif ou la transparence de l\'eau du lac, qu\'ils soient li&eacute;s &agrave; l\'am&eacute;nagement des berges, au changement climatique ou &agrave; d\'autres sources de perturbation.</p><p>Quelque 800 b&eacute;n&eacute;voles mesurent la transparence de l\'eau avec un disque Secchi et &eacute;valuent la teneur en phosphore total de l\'eau des lacs de l\'Ontario dans 728 lieux.</p><p>Les mesures de la teneur en phosphore total servent &agrave; &eacute;valuer l\'&eacute;quilibre nutritif des lacs de l\'Ontario, car le phosphore est la substance qui favorise la croissance des algues dans la plupart des lacs de l\'Ontario. Plus la teneur en phosphore est &eacute;lev&eacute;e, plus il y a d\'algues et donc plus l\'eau est trouble. Dans les cas extr&ecirc;mes, la prolif&eacute;ration d\'algues d&eacute;grade l\'aspect physique du lac, alt&egrave;re le go&ucirc;t de l\'eau ou entra&icirc;ne des odeurs.</p><p>Les limnologues classent g&eacute;n&eacute;ralement les lacs en trois cat&eacute;gories d\'&eacute;quilibre nutritif. D\'abord, les lacs oligotrophes contiennent moins de 10 &micro;g/L de phosphore total. Dilu&eacute;s et improductifs, ils sont rarement envahis par les algues. Ensuite, les lacs m&eacute;sotrophes contiennent entre 10 et 20 &micro;g/L de phosphore total. Situ&eacute;s au milieu de l\'&eacute;chelle trophique, ces lacs ont des caract&eacute;ristiques vari&eacute;es. Ils peuvent &ecirc;tre transparents et improductifs ou pr&eacute;senter une quantit&eacute; mod&eacute;r&eacute;e d\'algues avec des concentration de pr&egrave;s de 20 &micro;g/L. Enfin, les lacs eutrophes contiennent plus de 20 &micro;g/L de phosphore total et pr&eacute;sentent des algues en abondance.</p><p>&Agrave; noter : Les lacs dystrophes, de teinte brune, contiennent beaucoup de carbone organique dissous (COD). Le phosphore total dans ces lacs n\'augmente pas la quantit&eacute; d\'algues comme dans les lacs d&eacute;crits ci-dessus. G&eacute;n&eacute;ralement, ces lacs peuvent avoir une teneur &eacute;lev&eacute;e en phosphore total sans prolif&eacute;ration d\'algues. Leur composition chimique est assez complexe.\
			</p>\
			<p><a href="JavaScript:window.print();">Imprimer cette page</a></p>\
			<center><h3>Concentration moyennes de phosphore total (&micro;g/L)</h3></center>\
		<%\
			}\
		%>'
}];

