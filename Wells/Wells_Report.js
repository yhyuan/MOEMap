var url = "http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Public/Wells2/MapServer/";
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
var chooseLang = function (en, fr) {
	if (language === "EN") {
		return en;
	} 
	return fr;
};
var convertDate = function (date) {
	var d = new Date(date);
	var day = d.getDate();	
	var dayStr = ((day < 10) ? ("0" + day) :  ("" + day));
	var months = (language === "EN") ? ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] : ["janvier", "f&eacute;vrier", "mars", "avril", "mai", "juin", "juillet", "ao&ucirc;t", "septembre", "octobre", "novembre", "d&eacute;cembre"];
	var monthStr = months[d.getMonth()];
	return  (language === "EN") ? (monthStr + " " + dayStr + ", " + d.getFullYear()) : (dayStr + " " + monthStr + " " + d.getFullYear());
};
var createRenderItems = function (content) {
	var rows = content.split("|");
	rows = _.filter(rows, function(row) {return row.length > 0;});
	rows = _.map(rows, function(row) {
		var items = row.split(";");
		items = _.map(items, function(item) {return (item.length === 0) ? "&nbsp;&nbsp;" : item;});
		return items;
	});
	return rows;
};
Array.prototype.fill = function(val){
    for (var i = 0; i < this.length; i++){
        this[i] = val;
    }
    return this;
};
var renderResult = {};
var processResults = function (rs) {
	var fs = rs.features;
	var template = "";
	if (fs.length === 1) {
		renderResult = fs[0].attributes;
		var keys = _.keys(renderResult);
		_.each(keys, function(key) {
			renderResult[key] = renderResult[key] || "";
		});
		renderResult.WELL_COMPLETED_DATE = convertDate(renderResult.WELL_COMPLETED_DATE);
		renderResult.RECEIVED_DATE = convertDate(renderResult.RECEIVED_DATE);
		if (renderResult.PT.length === 0) {
			renderResult.PT = ";;;;;;;;;;;;";
		}
		renderResult.PT = _.map(renderResult.PT.split(";"), function(item) {return (item.length === 0) ? "&nbsp;&nbsp;" : item;});
		if (renderResult.PT[10] !== "&nbsp;&nbsp;") {
			var hourMinutes = renderResult.PT[10].split(":");
			renderResult.PT[10] = hourMinutes[0] + " h:" + hourMinutes[1] + " m";
		}
		var timeArray = ["1", "2", "3", "4", "5", "10", "15", "20", "25", "30", "40", "45", "50", "60"];
		var PTD = _.object(timeArray, new Array(timeArray.length).fill(["&nbsp;", "&nbsp;"]));
		renderResult.PTD = createRenderItems(renderResult.PTD);
		_.each(renderResult.PTD, function(row) {
			PTD[row[0]] = [row[1], row[2]];
		});
		renderResult.PTD = PTD;
		template = "Template";
	} else if (fs.length > 1){
		renderResult = _.map(fs, function(feature) {			
			return {
				WELL_ID: feature.attributes.WELL_ID, 
				UTMZONE: feature.attributes.UTMZONE, 
				EAST83: feature.attributes.EAST83, 
				NORTH83: feature.attributes.NORTH83, 
				BORE_HOLE_ID: feature.attributes.BORE_HOLE_ID,
				BHK: feature.attributes.BHK
			};
		});
		template = "ClusterTemplate";
	}
	document.getElementById("target").innerHTML = _.template(document.getElementById(template).innerHTML, renderResult);
};
$( document ).ready(function() {
	document.getElementById("target").innerHTML = (language === "EN") ? "Your report is being generated..." : "Votre rapport est g&eacute;n&eacute;r&eacute; ...";
	var layer = new gmaps.ags.Layer(url + '1');
	layer.query({
		returnGeometry: false,
		where:  (QueryString.hasOwnProperty("wellid") ? ("(WELL_ID = " + QueryString.wellid + ")"):("(BORE_HOLE_ID = " + QueryString.id + ")")),
		outFields: ["BORE_HOLE_ID", "WELL_ID", "BHK", "PREV_WELL_ID", "DPBR_M", "WELL_TYPE", "DEPTH_M", "YEAR_COMPLETED", "WELL_COMPLETED_DATE", "RECEIVED_DATE", "AUDIT_NO", "TAG", "CONTRACTOR", "SWL", "FINAL_STATUS_DESCR", "USE1", "USE2", "MOE_COUNTY_DESCR", "MOE_MUNICIPALITY_DESCR", "CON", "LOT", "STREET", "CITY", "UTMZONE", "EAST83", "NORTH83", "GEO", "PLUG", "HOLE", "CM", "CAS", "SCRN", "WAT", "PT", "PTD", "DISINFECTED"]
	}, processResults);
});
