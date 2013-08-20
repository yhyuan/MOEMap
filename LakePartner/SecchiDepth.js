var url = "http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Public/LakePartner/MapServer/"; 

var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
	var pair = vars[i].split("=");
		// If first entry with this name
	if (typeof query_string[pair[0]] === "undefined") {
	  query_string[pair[0]] = pair[1];
		// If second entry with this name
	} else if (typeof query_string[pair[0]] === "string") {
	  var arr = [ query_string[pair[0]], pair[1] ];
	  query_string[pair[0]] = arr;
		// If third or later entry with this name
	} else {
	  query_string[pair[0]].push(pair[1]);
	}
  } 
	return query_string;
} ();
var dataArray = {};
google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);		
function drawChart() {
	var data = new google.visualization.DataTable();
	var yearString = (language === "EN") ? 'Year' : 'Ann\u00e9e';
	var secchiDepthString = (language === "EN") ? 'Secchi Depth (m)' : 'Mesure du disque Secchi (m)';
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

var layer = new gmaps.ags.Layer(url + '3');
var params = {
	where: "ID = " + QueryString.id,
	outFields: ["Year_", "SecchiDepth"]
};
var processResultSet = function (rs) {
	var fs = rs.features;			
	dataArray = _.map(fs, function(feature) {
		var attr = feature.attributes;
		return {year: attr.Year_, value: attr.SecchiDepth};
	});
	document.getElementById("data_table").innerHTML = _.template(document.getElementById("SecchiDepthTableTemplate").innerHTML, dataArray)
};
layer.query(params, processResultSet);

var stationlayer = new gmaps.ags.Layer(url + '1');
var stationAttr = {};
stationlayer.query({
	where: "ID = " + QueryString.id,
	outFields: ["LAKENAME", "STN", "SITEID", "SITEDESC"]
}, function (rs) {
	stationAttr = rs.features[0].attributes;
	document.getElementById("station_description").innerHTML = _.template(document.getElementById("TitleTemplate").innerHTML, stationAttr)			
});	