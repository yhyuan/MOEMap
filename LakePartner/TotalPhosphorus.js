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
function greekSymbol(str) {return String.fromCharCode(str.charCodeAt(0) + (913 - 65));}
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
function drawChart() {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Date');
	var concentrationString = (language === "EN") ? "Average Concentration of Total Phosphorus" : "Concentration moyennes de phosphore total";
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

var layer = new gmaps.ags.Layer(url + '2');
var params = {
	where: "ID = " + QueryString.id,
	outFields: ["Date_", "TP1", "TP2", "DataCollector", "MajorDifference"]
};
var convertDate = function (date) {
	var d = new Date(date);
	var month = d.getMonth() + 1;
	var day = d.getDate();	
	return "" + d.getFullYear() + "-" + ((month < 10) ? ("0" + month) :  ("" + month)) + "-" + ((day < 10) ? ("0" + day) :  ("" + day));
};
var processResultSet = function (rs) {
	var fs = rs.features;			
	dataArray = _.map(fs, function(feature) {
		var attr = feature.attributes;
		return {date: convertDate(attr.Date_), tp1: attr.TP1, tp2: attr.TP2};
	});
	document.getElementById("data_table").innerHTML = _.template(document.getElementById("TotalPhosphorusTableTemplate").innerHTML, dataArray)
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