var url = "http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Public/PGMN1/MapServer/"; 
var chartedChemicals = ["Aluminum", "Antimony", "Arsenic", "Barium", "Beryllium", "Boron", "Cadmium", "Chromium", "Cobalt", "Copper", "Iron", "Lead", "Manganese", "Molybdenum", "Nickel", "Selenium", "Silver", "Strontium", "Thallium", "Titanium", "Uranium", "Vanadium", "Zinc", "Fluoride", "Sulphate", "Solids; dissolved", "Anions", "Cations", "Conductivity Estimated", "Ion balance calculation", "Solids; Dissolved Estimated", "Calcium", "Hardness", "Magnesium", "Potassium", "Sodium", "Alkalinity; total fixed endpt", "Conductivity", "pH", "Langeliers index calculation", "Saturation pH Estimated", "Nitrogen; ammonia+ammonium", "Nitrogen; nitrate+nitrite", "Nitrogen; nitrite", "Phosphorus; phosphate", "Nitrogen; total Kjeldahl", "Phosphorus; total", "Carbon; dissolved inorganic", "Carbon; dissolved organic", "Silicon; reactive silicate", "Chloride", "Bromide", "Iodide (I-)", "Nitrogen; nitrate"];
var Chemicals_Dict = {"Aluminum": "Aluminium","Antimony": "Antimoine","Arsenic": "Arsenic","Barium": "Baryum","Beryllium": "B&eacute;ryllium","Boron": "Bore","Cadmium": "Cadmium","Chromium": "Chrome","Cobalt": "Cobalt","Copper": "Cuivre","Iron": "Fer","Lead": "Plomb","Manganese": "Mangan&egrave;se","Molybdenum": "Molybd&egrave;ne","Nickel": "Nickel","Selenium": "S&eacute;l&eacute;nium","Silver": "Argent","Strontium": "Strontium","Thallium": "Thallium","Titanium": "Titane","Uranium": "Uranium","Vanadium": "Vanadium","Zinc": "Zinc","Fluoride": "Fluorure","Sulphate": "Sulfate","Solids; dissolved": "Solides; dissous","Anions": "Anions","Cations": "Cations","Conductivity Estimated": "Estimation de la conductivit&eacute; ","Ion balance calculation": "Calcul de l'&eacute;quilibre ionique","Solids; Dissolved Estimated": "Solides; estimation des solides dissous ","Calcium": "Calcium","Hardness": "Titre hydrotim&eacute;trique","Magnesium": "Magn&eacute;sium","Potassium": "Potassium","Sodium": "Sodium","Alkalinity; total fixed endpt": "Alcalinit&eacute;; point limite d'alcalinit&eacute; totale","Conductivity": "Conductivit&eacute;","pH": "pH","Langeliers index calculation": "Calcul de l'index de Langelier","Saturation pH Estimated": "Estimation du pH de saturation","Nitrogen; ammonia+ammonium": "Nitrog&egrave;ne; ammoniac+ammonium","Nitrogen; nitrate+nitrite": "Nitrog&egrave;ne; nitrate+nitrite","Nitrogen; nitrite": "Nitrog&egrave;ne; nitrite","Phosphorus; phosphate": "Phosphore; phosphate","Nitrogen; total Kjeldahl": "Nitrog&egrave;ne; azote total Kjeldahl","Phosphorus; total": "Phosphore; total","Carbon; dissolved inorganic": "Carbone; carbone inorganique dissous","Carbon; dissolved organic": "Carbone; carbone organique dissous","Silicon; reactive silicate": "Silicium; silicate r&eacute;actif","Chloride": "Chlorure","Bromide": "Bromure","Iodide (I-)": "Ion iodure (I-)","Nitrogen; nitrate": "Nitrog&egrave;ne; nitrate"};
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
var renderResult = {};
var queryLayer = function(maxObjectID, results) {
	var samplesLayer = new gmaps.ags.Layer(url + '2');
	samplesLayer.query({
		where: "(PGMN_WELL = '" + QueryString.id + "') AND (OBJECTID > " + maxObjectID + ")",
		outFields: ["OBJECTID", "SAMPLENUM", "SAMPLE_DAT", "CONFIDENC", "COMMENTS", "IONIC_BALA", "LAB", "LAB_ID", "PARMNAME", "DILUTION", "REPORT_VALUE", "UNITS", "VALQUALIFIER", "REMARK1", "REMARK2"]
	}, function (rs) {
		var fs = rs.features;
		var newResults = results.concat(fs);
		if (fs.length === 500) {
			queryLayer(_.max(fs, function(feature) {return feature.attributes.OBJECTID;}).attributes.OBJECTID,  newResults);
		} else {
			var parameterObject = _.groupBy(newResults, function(feature) {return feature.attributes.PARMNAME;});
			var availableChartedChemicals = _.filter(chartedChemicals, function(chemical) {return parameterObject.hasOwnProperty(chemical);});
			var unchartedChemicals = (_.filter(_.keys(parameterObject), function(chemical) {return !(chemical in chartedChemicals);})).sort();
			//console.log(availableChartedChemicals);
			//console.log(unchartedChemicals);
			renderResult = {
				PGMN_WELL: QueryString.id, 
				availableChartedChemicals: availableChartedChemicals, 
				unchartedChemicals: unchartedChemicals,
				parameterObject: parameterObject
			};
			document.getElementById("target").innerHTML = _.template(document.getElementById("PGMNChemistryTemplate").innerHTML, renderResult);
		}
	});
};
queryLayer(-1, []);