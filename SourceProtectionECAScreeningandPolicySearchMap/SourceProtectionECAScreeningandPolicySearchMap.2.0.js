//var globalConfig = globalConfig || {};
	
//globalConfig.language = "EN";
globalConfig.opacity = 0.7;
globalConfig.orgLatitude = 45.44424;
globalConfig.orgLongitude = -83.056943;
globalConfig.orgzoomLevel = 6;
globalConfig.infoWindowWidth  = '380px';
globalConfig.infoWindowHeight  = '180px';

globalConfig.searchControlHTML = '<input id = "map_query" type="text" title="Term" size="50" onfocus="this.value=\'\'" onkeypress="return globalConfig.entsub(event)" maxlength="100" autocomplete="off"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search" title="Search"></input>\
	<input type="submit" onclick="INITIALIZATION.init()" title="Clear" value="&nbsp;Clear&nbsp;"></input> ';
globalConfig.pointBufferTool = {available: false};
globalConfig.generateURLTool = {available: false};
globalConfig.usejQueryUITable = false;
globalConfig.usePredefinedMultipleTabs = false;
//globalConfig.locationServicesList = [];
globalConfig.maxQueryZoomLevel = 18;
globalConfig.preIdentifyCallbackName = "SWPLocator";
globalConfig.postIdentifyCallbackName = "SWPLocator";
globalConfig.addressGeocodingCallbackName = "SWPLocator";
globalConfig.search = function(){
	var name = document.getElementById(globalConfig.searchInputBoxDivId).value.trim();
	if(name.length === 0){
		return;
	}
	MOEMAP.clearOverlays();
	//document.getElementById(globalConfig.informationDivId).innerHTML = "Search...";
	MOEMAP.identifyMultiplePolygonLayersWithLocation(name);
};

globalConfig.identifyLayerList = [
	{
		name: "Source Protection Area - 2011",
		id: 0,
		returnFields: ["LABEL", "SPP_ID"]
	}, {
		name: "Lots and Concessions",
		id: 1,
		returnFields: ["LABEL"]
	}, {
		name: 	"Assessment Parcels",
		id: 2,
		returnFields: ["ASSESSMENT_ROLL_NUMBER_PRIMARY", "MPAC_STREET_ADDRESS", "MUNICIPALITY_NAME"]
	}, {
		name: 	"Ownership Parcels",
		id: 3,
		returnFields: ["PIN"]
	}, {
		name: 	"Issue Contributing Areas",
		id: 4,
		returnFields: ["OBJECTID"]
	}, {
		name: "Well Head Protection Zones",
		id: 5,
		returnFields: ["ZoneName"]
	}, {
		name: 	"WHPA Groundwater Under Direct Influence: WHPA-E)",
		id: 6,
		returnFields: ["ZoneName"]
	}, {
		name: 	"Intake Protection Zones",
		id: 7,
		returnFields: ["IPZType"]
	}, {
		name: 	"Vulnerable Scoring Area - Groundwater",
		id: 8,
		returnFields: ["vsg_vulnerabilityScore"]
	}, {
		name: 	"Vulnerable Scoring Area - Groundwater Under Direct Influence",
		id: 9,
		returnFields: ["vsu_vulnerabilityScore_GUDI"]
	}, {
		name: 	"Vulnerable Scoring Area - Surface Water",
		id: 10,
		returnFields: ["vss_vulnerabilityScore"]
	}, {
		name: 	"Highly Vulnerable Areas",
		id: 11,
		returnFields: ["IntrinsicVulnerabilityLevel"]
	}, {
		name: 	"Significant Groundwater Recharge Area - SPPID NO BORDERS",
		id: 12,
		returnFields: ["OBJECTID"]
	}, {
		name: 	"Niagara Escarpment Area of Development Control",
		id: 13,
		returnFields: ["OBJECTID"]
	}, {
		name: 	"OakRidgesMorainePlanningArea",
		id: 14,
		returnFields: ["OBJECTID"]
	}
];
globalConfig.identifyResults = {};
globalConfig.identifyMultiplePolygonLayersServicesTemplate = {
	displayResultBelowMap: true,
	queryTableTemplate: '<table class="lakepartner" border="1">\
		<caption>Search Results</caption>\
		<tbody>\
			<tr><td>Latitude: <strong><%= globalConfig.identifyResults["LatLng"].lat().toFixed(6) %></strong>  Longitude:<strong><%= globalConfig.identifyResults["LatLng"].lng().toFixed(6) %></strong></td>\
				<td>UTM Zone: <strong><%= globalConfig.identifyResults["UTM"].Zone %></strong>   Easting: <strong><%= globalConfig.identifyResults["UTM"].Easting %></strong>     Northing: <strong><%= globalConfig.identifyResults["UTM"].Northing %></strong></td></tr>\
			<tr><td>Source Protection Area Name: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Source Protection Area - 2011")) ? globalConfig.identifyResults["Source Protection Area - 2011"]["LABEL"] : "N/A " %></strong></td>\
				<td>Township, Concession and Lot: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Lots and Concessions")) ? globalConfig.identifyResults["Lots and Concessions"]["LABEL"] : "N/A " %></strong></td></tr>\
			<tr><td>&nbsp;&nbsp;</td><td>&nbsp;&nbsp;</td></tr>\
			<tr><td>Assessment Roll Number: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Assessment Parcels")) ? globalConfig.identifyResults["Assessment Parcels"]["ASSESSMENT_ROLL_NUMBER_PRIMARY"] : "N/A " %></strong></td>\
				<td>Property Information Number: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Ownership Parcels")) ? globalConfig.identifyResults["Ownership Parcels"]["PIN"] : "N/A" %></strong></td></tr>\
			<tr><td>Street Address: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Assessment Parcels")) ? globalConfig.identifyResults["Assessment Parcels"]["MPAC_STREET_ADDRESS"] : "N/A " %></strong></td>\
				<td>Municipality: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Assessment Parcels")) ? globalConfig.identifyResults["Assessment Parcels"]["MUNICIPALITY_NAME"] : "N/A " %></strong></td></tr>\
			<tr><td>Intake Protection Zone: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Intake Protection Zones")) ? globalConfig.identifyResults["Intake Protection Zones"]["IPZType"] : "N/A" %></strong></td>\
				<td>Surface Water Vulnerability Score: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Surface Water")) ? globalConfig.identifyResults["Vulnerable Scoring Area - Surface Water"]["vss_vulnerabilityScore"] : "N/A" %></strong></td></tr>\
			<tr><td>Wellhead Protection Area(WHPA): <strong><%= (globalConfig.identifyResults.hasOwnProperty("Well Head Protection Zones")) ? globalConfig.identifyResults["Well Head Protection Zones"]["ZoneName"] : "N/A" %></strong></td>\
				<td>Groundwater Vulnerability Score: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Groundwater")) ? globalConfig.identifyResults["Vulnerable Scoring Area - Groundwater"]["vsg_vulnerabilityScore"] : "N/A" %></strong></td></tr>\
			<tr><td>WHPA – Groundwater Under Direct Influence (GUDI): <strong><%= (globalConfig.identifyResults.hasOwnProperty("WHPA Groundwater Under Direct Influence: WHPA-E)")) ? globalConfig.identifyResults["WHPA Groundwater Under Direct Influence: WHPA-E)"]["ZoneName"] : "N/A" %></strong></td>\
				<td>GUDI Vulnerability Score: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Groundwater Under Direct Influence")) ? globalConfig.identifyResults["Vulnerable Scoring Area - Groundwater Under Direct Influence"]["vsu_vulnerabilityScore_GUDI"] : "N/A" %></strong></td></tr>\
			<tr><td>Significant Groundwater Recharge Area: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Significant Groundwater Recharge Area - SPPID NO BORDERS")) ? "Yes" : "No" %></strong></td>\
				<td>Highly Vulnerable Aquifer: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Highly Vulnerable Areas")) ? globalConfig.identifyResults["Highly Vulnerable Areas"]["IntrinsicVulnerabilityLevel"] : "N/A" %></strong></td></tr>\
			<tr><td>Issue Contributing areas (ICA): <strong><%= (globalConfig.identifyResults.hasOwnProperty("Issue Contributing Areas")) ? "Yes" : "No" %></strong></td>\
				<td>ICA Issues(Sodium, Phosphorus, Nitrate etc.): <br>Note: could be more than one issue at a time.</td></tr>\
			<tr><td>Niagara Escarpment Development Control Area: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Niagara Escarpment Area of Development Control")) ? "Yes" : "No" %></strong></td>\
				<td>Oak Ridges Moraine Planning Area: <strong><%= (globalConfig.identifyResults.hasOwnProperty("OakRidgesMorainePlanningArea")) ? "Yes" : "No" %></strong></td></tr>\
		</tbody>\
	</table>',
	popupTemplate: '<%= (globalConfig.identifyResults.hasOwnProperty("Source Protection Area - 2011")) ? "Source Protection Area Name: <strong>" + globalConfig.identifyResults["Source Protection Area - 2011"]["LABEL"] + "</strong><br>": "" %>\
			<%= (globalConfig.identifyResults.hasOwnProperty("Assessment Parcels")) ? "Assessment Roll Number: <strong>" + globalConfig.identifyResults["Assessment Parcels"]["ASSESSMENT_ROLL_NUMBER_PRIMARY"] + "</strong><br>Street Address: <strong>" + globalConfig.identifyResults["Assessment Parcels"]["MPAC_STREET_ADDRESS"] + "</strong><br>Municipality: <strong>" + globalConfig.identifyResults["Assessment Parcels"]["MUNICIPALITY_NAME"] + "</strong><br>": "" %>\
			<%= (globalConfig.identifyResults.hasOwnProperty("Intake Protection Zones")) ? "Intake Protection Zone: <strong>" + globalConfig.identifyResults["Intake Protection Zones"]["IPZType"] + "</strong><br>": "" %>\
			<%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Surface Water")) ? "Surface Water Vulnerability Score: <strong>" + globalConfig.identifyResults["Vulnerable Scoring Area - Surface Water"]["vss_vulnerabilityScore"] + "</strong><br>": "" %>\
			<%= (globalConfig.identifyResults.hasOwnProperty("Well Head Protection Zones")) ? "Wellhead Protection Area(WHPA): <strong>" + globalConfig.identifyResults["Well Head Protection Zones"]["ZoneName"] + "</strong><br>" : "" %>\
			<%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Groundwater")) ? "Groundwater Vulnerability Score: <strong>" + globalConfig.identifyResults["Vulnerable Scoring Area - Groundwater"]["vsg_vulnerabilityScore"] + "</strong><br>": "" %>\
			<%= (globalConfig.identifyResults.hasOwnProperty("WHPA Groundwater Under Direct Influence: WHPA-E)")) ? "WHPA – Groundwater Under Direct Influence (GUDI): <strong>" + globalConfig.identifyResults["WHPA Groundwater Under Direct Influence: WHPA-E)"]["ZoneName"] + "</strong><br>": "" %>\
			<%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Groundwater Under Direct Influence")) ? "GUDI Vulnerability Score: <strong>" + globalConfig.identifyResults["Vulnerable Scoring Area - Groundwater Under Direct Influence"]["vsu_vulnerabilityScore_GUDI"] + "</strong><br>": "" %>\
			Issue Contributing areas (ICA): <strong><%= (globalConfig.identifyResults.hasOwnProperty("Issue Contributing Areas")) ? "Yes" : "No" %></strong>',
	layerList: globalConfig.identifyLayerList.map(function (layer) {
		return {
			url: globalConfig.url + "/" + layer.id,
			returnFields: layer.returnFields,
			callback: function(record){
				globalConfig.identifyResults[layer.name] = record;
				return "";
			}	
		}
	})
};

globalConfig.layerNameIdDict = {};
globalConfig.identifyLayerList.map(function (layer) {
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
			if ((searchString.length === 15) && (reg_isInteger.test(searchString))) {
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
			console.log(attributes);
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
				//console.log(searchString);
				return true;
			}
			return false;				
		}
	}
];