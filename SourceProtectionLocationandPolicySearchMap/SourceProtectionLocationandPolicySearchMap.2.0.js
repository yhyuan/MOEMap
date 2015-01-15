//var globalConfig = globalConfig || {};
//globalConfig.language = "EN";
globalConfig.opacity = 0.7;
globalConfig.orgLatitude = 45.44424;
globalConfig.orgLongitude = -83.056943;
globalConfig.orgzoomLevel = 6;
globalConfig.infoWindowWidth  = '400px';
globalConfig.infoWindowHeight  = '120px';

globalConfig.searchControlHTML = '<input id = "map_query" type="text" title="Term" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" autocomplete="off"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search" title="Search"></input>\
	<input type="submit" onclick="INITIALIZATION.init()" title="Clear" value="&nbsp;Clear&nbsp;"></input> ';
globalConfig.pointBufferTool = {available: false};
globalConfig.generateURLTool = {available: false};
globalConfig.usejQueryUITable = false;
globalConfig.usePredefinedMultipleTabs = false;
//globalConfig.locationServicesList = [];
//globalConfig.maxQueryZoomLevel = 18;
globalConfig.maxQueryZoomLevel = 12;
globalConfig.preIdentifyCallbackName = "SWPLocator";
globalConfig.postIdentifyCallbackName = "SWPLocator";
globalConfig.addressGeocodingCallbackName = "SWPLocator";
globalConfig.searchingForResultsLang = "<strong>Please wait, searching for results...</strong>";
globalConfig.yourSearchIsCompetedLang = "<strong>Your search is completed.</strong>";
globalConfig.search = function(){
	var name = document.getElementById(globalConfig.searchInputBoxDivId).value.trim();
	if(name.length === 0){
		return;
	}
	MOEMAP.clearOverlays();
	document.getElementById(globalConfig.informationDivId).innerHTML = globalConfig.searchingForResultsLang;
	document.getElementById(globalConfig.queryTableDivId).innerHTML = "";
	MOEMAP.identifyMultiplePolygonLayersWithLocation(name);
};

globalConfig.identifyLayerList = [
	{
		name: "Source Protection Area - 2011",
		id: 0,
		returnFields: ["LABEL", "SPP_ID"]
	}, {
		name: "Municipal Boundaries - Upper Tier",
		id: 1,
		returnFields: ["LEGAL_NAME"]
	}, {
		name: "Municipal Boundaries - Single and Lower Tier",
		id: 2,
		returnFields: ["LEGAL_NAME"]
	}, {
		name: "Lots and Concessions",
		id: 3,
		returnFields: ["LABEL"]
	}, {
		name: 	"Assessment Parcels",
		mapService: "http://intra.giscoeservices.lrc.gov.on.ca/ArcGIS/rest/services/MNR/GIB_AssessmentParcel/MapServer",
		id: 2,
		returnFields: ["ASSESSMENT_ROLL_NUMBER", "MPAC_STREET_ADDRESS", "MUNICIPALITY_NAME"]
		//id: 4,
		//returnFields: ["ARN", "MPAC_STREET_ADDRESS", "MUNICIPALITY_NAME"]
	}, {
		name: 	"Ownership Parcels",
		id: 5,
		returnFields: ["PIN"]
	}, {
		name: 	"Issue Contributing Areas",
		id: 6,
		returnFields: ["OBJECTID", "IssueContributingGlobalID"]
	}, {
		name: "Well Head Protection Zones",
		id: 7,
		returnFields: ["ZoneName"]
	}, {
		name: 	"WHPA Groundwater Under Direct Influence: WHPA-E)",
		id: 8,
		returnFields: ["ZoneName"]
	}, {
		name: 	"Intake Protection Zones",
		id: 9,
		returnFields: ["IPZType"]
	}, {
		name: 	"Vulnerable Scoring Area - Groundwater",
		id: 10,
		returnFields: ["vsg_vulnerabilityScore", "vsg_whpa_id", "vsg_spp_id"]
	}, {
		name: 	"Vulnerable Scoring Area - Groundwater Under Direct Influence",
		id: 11,
		returnFields: ["vsu_vulnerabilityScore_GUDI"]
	}, {
		name: 	"Vulnerable Scoring Area - Surface Water",
		id: 12,
		returnFields: ["vss_vulnerabilityScore", "vss_spp_id", "vss_ipz_id"]
	}, {
		name: 	"Highly Vulnerable Areas",
		id: 13,
		returnFields: ["IntrinsicVulnerabilityLevel"]
	}, {
		name: 	"Significant Groundwater Recharge Area - SPPID NO BORDERS",
		id: 14,
		returnFields: ["OBJECTID"]
	}, {
		name: 	"Niagara Escarpment Area of Development Control",
		id: 15,
		returnFields: ["OBJECTID"]
	}, {
		name: 	"OakRidgesMorainePlanningArea",
		id: 16,
		returnFields: ["OBJECTID"]
	}
];
globalConfig.concatenateAttributes = function(layerName, fieldName) {
	return _.map(globalConfig.identifyResults[layerName], function(feature) {return feature.attributes[fieldName];}).join(", ")
};
globalConfig.identifyResults = {};
globalConfig.queryTableTemplate = '<table class="lakepartner" width="625" border="1">\
	<caption>Search Results</caption>\
	<tbody>\
		<tr><td>Latitude: <strong><%= globalConfig.identifyResults["LatLng"].lat().toFixed(6) %></strong>  Longitude:<strong><%= globalConfig.identifyResults["LatLng"].lng().toFixed(6) %></strong></td>\
			<td>UTM Zone: <strong><%= globalConfig.identifyResults["UTM"].Zone %></strong>   Easting: <strong><%= parseFloat(globalConfig.identifyResults["UTM"].Easting).toFixed(0) %></strong>     Northing: <strong><%= parseFloat(globalConfig.identifyResults["UTM"].Northing).toFixed(0) %></strong></td></tr>\
		<tr><td>Municipal - Upper Tier: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Municipal Boundaries - Upper Tier")) ? globalConfig.concatenateAttributes("Municipal Boundaries - Upper Tier", "LEGAL_NAME") : "N/A" %></strong></td>\
			<td>Municipal - Single and Lower Tier: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Municipal Boundaries - Single and Lower Tier")) ? globalConfig.concatenateAttributes("Municipal Boundaries - Single and Lower Tier", "LEGAL_NAME") : "N/A" %></strong></td></tr>\
		<tr><td>MPAC Street Address: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Assessment Parcels")) ? globalConfig.concatenateAttributes("Assessment Parcels", "MPAC_STREET_ADDRESS") + " " + globalConfig.concatenateAttributes("Assessment Parcels", "MUNICIPALITY_NAME"): "N/A" %></strong></td>\
			<td>Township, Concession and Lot: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Lots and Concessions")) ? globalConfig.concatenateAttributes("Lots and Concessions", "LABEL") : "N/A" %></strong></td></tr>\
		<tr><td>Assessment Roll Number: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Assessment Parcels")) ? globalConfig.concatenateAttributes("Assessment Parcels", "ASSESSMENT_ROLL_NUMBER") : "N/A" %></strong></td>\
			<td>Property Information Number: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Ownership Parcels")) ?  globalConfig.concatenateAttributes("Ownership Parcels", "PIN") : "N/A" %></strong></td></tr>\
		<tr><td colspan = "2">Source Protection Area Name: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Source Protection Area - 2011")) ? globalConfig.concatenateAttributes("Source Protection Area - 2011", "LABEL") : "N/A" %></strong></td>\
			</tr>\
		<tr><td>Wellhead Protection Area (WHPA): <strong><%= (globalConfig.identifyResults.hasOwnProperty("Well Head Protection Zones")) ? globalConfig.concatenateAttributes("Well Head Protection Zones", "ZoneName") : "No" %></strong></td>\
			<td>Groundwater Vulnerability Score: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Groundwater")) ? globalConfig.concatenateAttributes("Vulnerable Scoring Area - Groundwater", "vsg_vulnerabilityScore") : "N/A" %></strong></td></tr>\
		<%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Groundwater")) ? "<tr><td colspan = \'2\'>" + _.map(globalConfig.identifyResults["Vulnerable Scoring Area - Groundwater"],   function(feature) {return "<a target=\'_blank\' href=\'http://maps.thamesriver.on.ca/swpPolicyEntry/parseLink/parse.aspx?zone=" + feature.attributes["vsg_whpa_id"]+ "&score=" + feature.attributes["vsg_vulnerabilityScore"] + "&sppid=" + feature.attributes["vsg_spp_id"] + "\'>Groundwater Policies – Score " + feature.attributes["vsg_vulnerabilityScore"] + " (link to external site)</a>";}).join("<br>")  + "<br></td></tr>": "" %>\
		<tr><td>Intake Protection Zone 1 or 2: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Intake Protection Zones")) ? globalConfig.concatenateAttributes("Intake Protection Zones", "IPZType") : "No" %></strong></td>\
			<td>Surface Water Vulnerability Score (if &ge; 8) : <strong><%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Surface Water")) ? globalConfig.concatenateAttributes("Vulnerable Scoring Area - Surface Water", "vss_vulnerabilityScore") : "N/A" %></strong></td></tr>\
		<%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Surface Water")) ? "<tr><td colspan = \'2\'>" + _.map(globalConfig.identifyResults["Vulnerable Scoring Area - Surface Water"], function(feature) {return "<a target=\'_blank\' href=\'http://maps.thamesriver.on.ca/swpPolicyEntry/parseLink/parse.aspx?zone=" + feature.attributes["vss_ipz_id"] + "&score=" + feature.attributes["vss_vulnerabilityScore"] + "&sppid=" + feature.attributes["vss_spp_id"] + "&source=sw\'>Surface Water Policies – Score " + feature.attributes["vss_vulnerabilityScore"] + " (link to external site)</a>";}).join("<br>") + "<br></td></tr>": "" %>\
		<tr><td>WHPA – Groundwater Under Direct Influence (GUDI): <strong><%= (globalConfig.identifyResults.hasOwnProperty("WHPA Groundwater Under Direct Influence: WHPA-E)")) ? globalConfig.concatenateAttributes("WHPA Groundwater Under Direct Influence: WHPA-E)", "ZoneName") : "No" %></strong></td>\
			<td>GUDI Vulnerability Score: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Groundwater Under Direct Influence")) ? globalConfig.concatenateAttributes("Vulnerable Scoring Area - Groundwater Under Direct Influence", "vsu_vulnerabilityScore_GUDI") : "N/A" %></strong></td></tr>\
		<tr><td>Significant Groundwater Recharge Area: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Significant Groundwater Recharge Area - SPPID NO BORDERS")) ? "Yes" : "No" %></strong></td>\
			<td>Highly Vulnerable Aquifer: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Highly Vulnerable Areas")) ? globalConfig.concatenateAttributes("Highly Vulnerable Areas", "IntrinsicVulnerabilityLevel") : "N/A" %></strong></td></tr>\
		<tr><td>Issue Contributing areas (ICA): <strong><%= (globalConfig.identifyResults.hasOwnProperty("Issue Contributing Areas")) ? "Yes" : "No" %></strong></td>\
			<td>ICA Issues: <strong><%= (globalConfig.identifyResults.hasOwnProperty("ICA_ISSUES")) ? globalConfig.identifyResults["ICA_ISSUES"] : "N/A" %></strong></td></tr>\
		<tr><td>Niagara Escarpment Development Control Area: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Niagara Escarpment Area of Development Control")) ? "Yes" : "No" %></strong></td>\
			<td>Oak Ridges Moraine Planning Area: <strong><%= (globalConfig.identifyResults.hasOwnProperty("OakRidgesMorainePlanningArea")) ? "Yes" : "No" %></strong></td></tr>\
	</tbody>\
</table>';
/*globalConfig.queryTableTemplate = '<table class="lakepartner" border="1">\
	<caption>Search Results</caption>\
	<tbody>\
		<tr><td>Latitude: <strong><%= globalConfig.identifyResults["LatLng"].lat().toFixed(6) %></strong>  Longitude:<strong><%= globalConfig.identifyResults["LatLng"].lng().toFixed(6) %></strong></td>\
			<td>UTM Zone: <strong><%= globalConfig.identifyResults["UTM"].Zone %></strong>   Easting: <strong><%= parseFloat(globalConfig.identifyResults["UTM"].Easting).toFixed(0) %></strong>     Northing: <strong><%= parseFloat(globalConfig.identifyResults["UTM"].Northing).toFixed(0) %></strong></td></tr>\
		<tr><td>Municipal - Upper Tier: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Municipal Boundaries - Upper Tier")) ? globalConfig.concatenateAttributes("Municipal Boundaries - Upper Tier", "LEGAL_NAME") : "N/A" %></strong></td>\
			<td>Municipal - Single and Lower Tier: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Municipal Boundaries - Single and Lower Tier")) ? globalConfig.concatenateAttributes("Municipal Boundaries - Single and Lower Tier", "LEGAL_NAME") : "N/A" %></strong></td></tr>\
		<tr><td>MPAC Street Address: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Assessment Parcels")) ? globalConfig.concatenateAttributes("Assessment Parcels", "MPAC_STREET_ADDRESS") + " " + globalConfig.concatenateAttributes("Assessment Parcels", "MUNICIPALITY_NAME"): "N/A" %></strong></td>\
			<td>Township, Concession and Lot: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Lots and Concessions")) ? globalConfig.concatenateAttributes("Lots and Concessions", "LABEL") : "N/A" %></strong></td></tr>\
		<tr><td>Assessment Roll Number: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Assessment Parcels")) ? globalConfig.concatenateAttributes("Assessment Parcels", "ARN") : "N/A" %></strong></td>\
			<td>Property Information Number: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Ownership Parcels")) ?  globalConfig.concatenateAttributes("Ownership Parcels", "PIN") : "N/A" %></strong></td></tr>\
		<tr><td colspan = "2">Source Protection Area Name: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Source Protection Area - 2011")) ? globalConfig.concatenateAttributes("Source Protection Area - 2011", "LABEL") : "N/A" %></strong></td>\
			</tr>\
		<tr><td>Wellhead Protection Area (WHPA): <strong><%= (globalConfig.identifyResults.hasOwnProperty("Well Head Protection Zones")) ? globalConfig.concatenateAttributes("Well Head Protection Zones", "ZoneName") : "No" %></strong></td>\
			<td>Groundwater Vulnerability Score: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Groundwater")) ? globalConfig.concatenateAttributes("Vulnerable Scoring Area - Groundwater", "vsg_vulnerabilityScore") : "N/A" %></strong></td></tr>\
		<%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Groundwater")) ? "<tr><td colspan = \'2\'>" + _.map(globalConfig.identifyResults["Vulnerable Scoring Area - Groundwater"],   function(feature) {return "<a target=\'_blank\' href=\'http://maps.thamesriver.on.ca/swpPolicyEntry/parseLink/parse.aspx?zone=" + feature.attributes["vsg_whpa_id"]+ "&score=" + feature.attributes["vsg_vulnerabilityScore"] + "&sppid=" + feature.attributes["vsg_spp_id"] + "\'>Groundwater Policies – Score " + feature.attributes["vsg_vulnerabilityScore"] + " (link to external site)</a>";}).join("<br>")  + "<br></td></tr>": "" %>\
		<tr><td>Intake Protection Zone 1 or 2: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Intake Protection Zones")) ? globalConfig.concatenateAttributes("Intake Protection Zones", "IPZType") : "No" %></strong></td>\
			<td>Surface Water Vulnerability Score (if &ge; 8) : <strong><%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Surface Water")) ? globalConfig.concatenateAttributes("Vulnerable Scoring Area - Surface Water", "vss_vulnerabilityScore") : "N/A" %></strong></td></tr>\
		<%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Surface Water")) ? "<tr><td colspan = \'2\'>" + _.map(globalConfig.identifyResults["Vulnerable Scoring Area - Surface Water"], function(feature) {return "<a target=\'_blank\' href=\'http://maps.thamesriver.on.ca/swpPolicyEntry/parseLink/parse.aspx?zone=" + feature.attributes["vss_ipz_id"] + "&score=" + feature.attributes["vss_vulnerabilityScore"] + "&sppid=" + feature.attributes["vss_spp_id"] + "&source=sw\'>Surface Water Policies – Score " + feature.attributes["vss_vulnerabilityScore"] + " (link to external site)</a>";}).join("<br>") + "<br></td></tr>": "" %>\
		<tr><td>WHPA – Groundwater Under Direct Influence (GUDI): <strong><%= (globalConfig.identifyResults.hasOwnProperty("WHPA Groundwater Under Direct Influence: WHPA-E)")) ? globalConfig.concatenateAttributes("WHPA Groundwater Under Direct Influence: WHPA-E)", "ZoneName") : "No" %></strong></td>\
			<td>GUDI Vulnerability Score: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Groundwater Under Direct Influence")) ? globalConfig.concatenateAttributes("Vulnerable Scoring Area - Groundwater Under Direct Influence", "vsu_vulnerabilityScore_GUDI") : "N/A" %></strong></td></tr>\
		<tr><td>Significant Groundwater Recharge Area: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Significant Groundwater Recharge Area - SPPID NO BORDERS")) ? "Yes" : "No" %></strong></td>\
			<td>Highly Vulnerable Aquifer: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Highly Vulnerable Areas")) ? globalConfig.concatenateAttributes("Highly Vulnerable Areas", "IntrinsicVulnerabilityLevel") : "N/A" %></strong></td></tr>\
		<tr><td>Issue Contributing areas (ICA): <strong><%= (globalConfig.identifyResults.hasOwnProperty("Issue Contributing Areas")) ? "Yes" : "No" %></strong></td>\
			<td>ICA Issues: <strong><%= (globalConfig.identifyResults.hasOwnProperty("ICA_ISSUES")) ? globalConfig.identifyResults["ICA_ISSUES"] : "N/A" %></strong></td></tr>\
		<tr><td>Niagara Escarpment Development Control Area: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Niagara Escarpment Area of Development Control")) ? "Yes" : "No" %></strong></td>\
			<td>Oak Ridges Moraine Planning Area: <strong><%= (globalConfig.identifyResults.hasOwnProperty("OakRidgesMorainePlanningArea")) ? "Yes" : "No" %></strong></td></tr>\
	</tbody>\
</table>';
*/
globalConfig.popupTemplate = '<%= globalConfig.identifyResults.hasOwnProperty("Source Protection Area - 2011") ? "Source Protection Area Name: <strong>" +  globalConfig.concatenateAttributes("Source Protection Area - 2011", "LABEL") + "</strong><br>": "" %>\
	MPAC Address: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Assessment Parcels") && (globalConfig.identifyResults["Assessment Parcels"].length > 0) && (!!globalConfig.identifyResults["Assessment Parcels"][0].attributes["ARN"])) ? globalConfig.concatenateAttributes("Assessment Parcels", "MPAC_STREET_ADDRESS") + " " + globalConfig.concatenateAttributes("Assessment Parcels", "MUNICIPALITY_NAME"): "N/A" %></strong><br>\
	Wellhead Protection Area(WHPA): <strong><%= globalConfig.identifyResults.hasOwnProperty("Well Head Protection Zones") ? (globalConfig.concatenateAttributes("Well Head Protection Zones", "ZoneName") + "</strong>  Score: <strong>" + (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Groundwater") ? globalConfig.concatenateAttributes("Vulnerable Scoring Area - Groundwater", "vsg_vulnerabilityScore") : "N/A")) : "No" %></strong><br>\
	<%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Groundwater")) ?   _.map(globalConfig.identifyResults["Vulnerable Scoring Area - Groundwater"],   function(feature) {return "<a target=\'_blank\' href=\'http://maps.thamesriver.on.ca/swpPolicyEntry/parseLink/parse.aspx?zone=" + feature.attributes["vsg_whpa_id"]+ "&score=" + feature.attributes["vsg_vulnerabilityScore"] + "&sppid=" + feature.attributes["vsg_spp_id"] + "\'>Groundwater Policies – Score " + feature.attributes["vsg_vulnerabilityScore"] + " (link to external site)</a>";}).join("<br>")  + "<br>": "" %>\
	Intake Protection Zone: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Intake Protection Zones")) ? globalConfig.concatenateAttributes("Intake Protection Zones", "IPZType") + "</strong>  Score (if &ge; 8): <strong>" + ((globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Surface Water")) ? globalConfig.concatenateAttributes("Vulnerable Scoring Area - Surface Water", "vss_vulnerabilityScore"): "N/A"): "No" %></strong><br>\
	<%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Surface Water")) ? _.map(globalConfig.identifyResults["Vulnerable Scoring Area - Surface Water"], function(feature) {return "<a target=\'_blank\' href=\'http://maps.thamesriver.on.ca/swpPolicyEntry/parseLink/parse.aspx?zone=" + feature.attributes["vss_ipz_id"] + "&score=" + feature.attributes["vss_vulnerabilityScore"] + "&sppid=" + feature.attributes["vss_spp_id"] + "&source=sw\'>Surface Water Policies – Score " + feature.attributes["vss_vulnerabilityScore"] + " (link to external site)</a>";}).join("<br>") + "<br>": "" %>\
	WHPA – Groundwater Under Direct Influence (GUDI): <strong><%= (globalConfig.identifyResults.hasOwnProperty("WHPA Groundwater Under Direct Influence: WHPA-E)")) ? globalConfig.concatenateAttributes("WHPA Groundwater Under Direct Influence: WHPA-E)", "ZoneName")  + "</strong>  Score: <strong>" + ((globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Groundwater Under Direct Influence")) ? globalConfig.concatenateAttributes("Vulnerable Scoring Area - Groundwater Under Direct Influence", "vsu_vulnerabilityScore_GUDI"): "N/A"): "No" %></strong><br>';

globalConfig.identifyMultiplePolygonLayersServicesTemplate = {
	layerList: _.map(globalConfig.identifyLayerList, function (layer) {
		return {
			url: (layer.hasOwnProperty("mapService") ? layer.mapService : globalConfig.url) + "/" + layer.id,
			name: layer.name,
			returnFields: layer.returnFields/*,
			callback: function(record){
				globalConfig.identifyResults[layer.name] = record;
				return "";
			}*/	
		}
	})
};

globalConfig.layerNameIdDict = {};
_.map(globalConfig.identifyLayerList, function (layer) {
	globalConfig.layerNameIdDict[layer.name] = layer.id;
});

globalConfig.locationServicesList = [
	{
		mapService: globalConfig.url,
		layerID: globalConfig.layerNameIdDict["Assessment Parcels"],
		displayPolygon: true,  //For non-polygon layers, it is always false. For polygon layers, you can turn on and off to visualize the polygon.  
		fieldsInInfoWindow: ["ARN"], 
		getInfoWindow: function(attributes){
			return "Assessment Parcel Number: <strong>" + attributes.ARN + "</strong>";
		}, 
		latitude: "Latitude",
		longitude: "Longitude",
		getSearchCondition: function(searchString){
			return "ARN = '" + searchString + "'";
		}, 
		isInputFitRequirements: function(searchString){
			var reg_isInteger = /^\d+$/;
			if ((searchString.length === 20) && (reg_isInteger.test(searchString))) {
				//console.log("Assessment Parcel");
				return true;
			}
			return false;				
		}
	},
	{
		mapService: globalConfig.url,
		layerID: globalConfig.layerNameIdDict["Ownership Parcels"],
		displayPolygon: true,  //For non-polygon layers, it is always false. For polygon layers, you can turn on and off to visualize the polygon.  
		fieldsInInfoWindow: ["PIN"], 
		getInfoWindow: function(attributes){
			//console.log(attributes);
			return "Ownership Parcel PIN: <strong>" + attributes.PIN + "</strong>";
		}, 
		latitude: "Latitude",
		longitude: "Longitude",
		getSearchCondition: function(searchString){
			return "PIN = '" + searchString + "'";
		}, 
		isInputFitRequirements: function(searchString){
			var reg_isInteger = /^\d+$/;
			if ((searchString.length === 9) && (reg_isInteger.test(searchString))) {
				//console.log("Ownership Parcel");
				return true;
			}
			return false;				
		}
	}
];

globalConfig.postIdentifyCallback = function (queryParams) {
	MOEMAP.clearOverlays();	
	//var layerList = queryParams.layerList;
	//var container = "";
	//console.log(queryParams);
	/*if (queryParams.hasOwnProperty('mergeFunction')) {
		container = queryParams.mergeFunction(queryParams.gLatLng);
	} else {*/
	/*var container = Array.range(0, layerList.length - 1).map(function (i) {
			var features = layerList[i]["result"].features;
			if (features.length > 0) {
				return Array.range(0, features.length - 1).map(function (j) {
					return layerList[i].callback(features[j].attributes) + "<br>";
				}).join("");
			} else {
				return "";
			}			
		}).join("");*/
	//}
	_.each(queryParams.layerList, function(layer) {
		var features = layer["result"].features;
		if ((features) && (features.length > 0)) {
			globalConfig.identifyResults[layer.name] = features;
		}
		/*
		if (features.length > 1) {
			console.log(layer);
		}*/
	});
	//if (globalConfig.identifyMultiplePolygonLayersServicesTemplate.hasOwnProperty('displayResultBelowMap') && (globalConfig.identifyMultiplePolygonLayersServicesTemplate.displayResultBelowMap)) {
	globalConfig.identifyResults["LatLng"] = queryParams.gLatLng;
	globalConfig.identifyResults["UTM"] = globalConfig.convertLatLngtoUTM(queryParams.gLatLng.lat(), queryParams.gLatLng.lng());
	if(globalConfig.identifyResults.hasOwnProperty("Issue Contributing Areas")) {
		var ICAIssuesQueryLayer = new gmaps.ags.Layer(globalConfig.url  + "/17" );
		var IssueContributingGlobalID = globalConfig.identifyResults["Issue Contributing Areas"][0].attributes["IssueContributingGlobalID"];
		ICAIssuesQueryLayer.query({
			returnGeometry: false,
			where: "IssueContributingGlobalID = '" + IssueContributingGlobalID + "'",
			//where: "1=1",
			outFields: ["Contaminant"]
		}, function (rs) {
			var Contaminants = _.uniq(_.map(rs.features, function(feature) {
				return feature.attributes.Contaminant;
			}));
			globalConfig.identifyResults["ICA_ISSUES"] = Contaminants.join(", ")
			globalConfig.postIdentifyRenderCallback(queryParams);
		});
	} else {
		globalConfig.postIdentifyRenderCallback(queryParams);
	}
};
globalConfig.preIdentifyCallback = function (queryParams) {
	globalConfig.identifyResults = {};
	var layerSetting = queryParams.layerList[queryParams.currentLayerId];
	var params = {
		returnGeometry: layerSetting.hasOwnProperty('returnGeometry') ? layerSetting.returnGeometry : false,
		geometryType: 'esriGeometryPoint',
		geometry: queryParams.gLatLng,				
		outFields: layerSetting.returnFields
	};			
	return params;
};
globalConfig.postIdentifyRenderCallback = function (queryParams) {
	var identifyMarker = globalConfig.identifyMarkerRedTearDrop ? (new google.maps.Marker({
			position: queryParams.gLatLng,
			draggable: true
		})) : (new google.maps.Marker({
			position: queryParams.gLatLng,
			icon: globalConfig.searchedLocationIcon,				
			draggable: true
		}));
	MOEMAP.addOverlay(identifyMarker);

		//var template = document.getElementById(globalConfig.queryTableTemplateDivId).innerHTML;
	document.getElementById(globalConfig.queryTableDivId).innerHTML = _.template(globalConfig.queryTableTemplate, globalConfig.identifyResults);
	//console.log(container);
	var container = _.template(globalConfig.popupTemplate, globalConfig.identifyResults);
	//} //else {
	//console.log(globalConfig.identifyResults);
	var containerLines = container.split("<br>").length;
	/*if (containerLines > 10) {
		globalConfig.infoWindowHeight = "" + (180 + (containerLines - 10)*17) + "px";
	}*/
	container = globalConfig.createControllableInfoWindowContent(container);
	MOEMAP.openInfoWindow(queryParams.gLatLng, container);	
	(function (container, identifyMarker) {
		google.maps.event.addListener(identifyMarker, 'click', function () {
			MOEMAP.openInfoWindow(identifyMarker.getPosition(), container);
		});
	})(container, identifyMarker);
	//}
	google.maps.event.addListener(identifyMarker, 'dragend', function () {
		MOEMAP.clearOverlays();
		document.getElementById(globalConfig.informationDivId).innerHTML = globalConfig.searchingForResultsLang;
		if(document.getElementById(globalConfig.searchInputBoxDivId)){
			document.getElementById(globalConfig.searchInputBoxDivId).value="";
			document.getElementById(globalConfig.searchInputBoxDivId).focus();
		}
		if(document.getElementById(globalConfig.queryTableDivId)){
			document.getElementById(globalConfig.queryTableDivId).innerHTML = "";
		}
		var geocoder = new google.maps.Geocoder();
		var latlng = identifyMarker.getPosition();
		queryParams.map.setCenter (latlng);
		geocoder.geocode({
			'address': latlng.lat() + ',' + latlng.lng()
		}, function (results, status) {
			if (status === google.maps.GeocoderStatus.OK) {
				globalConfig.returnedAddress = results[0].formatted_address.toString();
				MOEMAP.mouseClickHandler({latLng: latlng});
			} else {
				alert("Geocode was not successful for the following reason: " + status);
			}
		});					

	});
	var layerList = queryParams.layerList;
	for (var i = 0; i<layerList.length; i++) {
		if (layerList[i].hasOwnProperty('displayPolygon') && (layerList[i].displayPolygon)) {
			var features = layerList[i]["result"].features;
			for (var j=0; j<features.length; j++) {
				var geometryPoly = features[j].geometry[0];
				geometryPoly.setOptions(layerList[i].style);
				MOEMAP.addOverlay(geometryPoly);	
			}
		}
	}
	document.getElementById(globalConfig.informationDivId).innerHTML = globalConfig.yourSearchIsCompetedLang;
}; 