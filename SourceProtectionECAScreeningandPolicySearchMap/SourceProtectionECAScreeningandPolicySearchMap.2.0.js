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
globalConfig.searchingForResultsLang = "<strong>Searching for results...</strong>";
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
		returnFields: ["OBJECTID", "IssueContributingGlobalID"]
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
globalConfig.queryTableTemplate = '<table class="lakepartner" border="1">\
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
			<td>ICA Issues (Sodium, Phosphorus, Nitrate etc.): <strong><%= (globalConfig.identifyResults.hasOwnProperty("ICA_ISSUES")) ? globalConfig.identifyResults["ICA_ISSUES"] : "N/A" %></strong><br>Note: could be more than one issue at a time.</td></tr>\
		<tr><td>Niagara Escarpment Development Control Area: <strong><%= (globalConfig.identifyResults.hasOwnProperty("Niagara Escarpment Area of Development Control")) ? "Yes" : "No" %></strong></td>\
			<td>Oak Ridges Moraine Planning Area: <strong><%= (globalConfig.identifyResults.hasOwnProperty("OakRidgesMorainePlanningArea")) ? "Yes" : "No" %></strong></td></tr>\
	</tbody>\
</table>';
globalConfig.popupTemplate = '<%= (globalConfig.identifyResults.hasOwnProperty("Source Protection Area - 2011")) ? "Source Protection Area Name: <strong>" + globalConfig.identifyResults["Source Protection Area - 2011"]["LABEL"] + "</strong><br>": "" %>\
	<%= (globalConfig.identifyResults.hasOwnProperty("Assessment Parcels")) ? "Assessment Roll Number: <strong>" + globalConfig.identifyResults["Assessment Parcels"]["ASSESSMENT_ROLL_NUMBER_PRIMARY"] + "</strong><br>Street Address: <strong>" + globalConfig.identifyResults["Assessment Parcels"]["MPAC_STREET_ADDRESS"] + "</strong><br>Municipality: <strong>" + globalConfig.identifyResults["Assessment Parcels"]["MUNICIPALITY_NAME"] + "</strong><br>": "" %>\
	<%= (globalConfig.identifyResults.hasOwnProperty("Intake Protection Zones")) ? "Intake Protection Zone: <strong>" + globalConfig.identifyResults["Intake Protection Zones"]["IPZType"] + "</strong><br>": "" %>\
	<%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Surface Water")) ? "Surface Water Vulnerability Score: <strong>" + globalConfig.identifyResults["Vulnerable Scoring Area - Surface Water"]["vss_vulnerabilityScore"] + "</strong><br>": "" %>\
	<%= (globalConfig.identifyResults.hasOwnProperty("Well Head Protection Zones")) ? "Wellhead Protection Area(WHPA): <strong>" + globalConfig.identifyResults["Well Head Protection Zones"]["ZoneName"] + "</strong><br>" : "" %>\
	<%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Groundwater")) ? "Groundwater Vulnerability Score: <strong>" + globalConfig.identifyResults["Vulnerable Scoring Area - Groundwater"]["vsg_vulnerabilityScore"] + "</strong><br>": "" %>\
	<%= (globalConfig.identifyResults.hasOwnProperty("WHPA Groundwater Under Direct Influence: WHPA-E)")) ? "WHPA – Groundwater Under Direct Influence (GUDI): <strong>" + globalConfig.identifyResults["WHPA Groundwater Under Direct Influence: WHPA-E)"]["ZoneName"] + "</strong><br>": "" %>\
	<%= (globalConfig.identifyResults.hasOwnProperty("Vulnerable Scoring Area - Groundwater Under Direct Influence")) ? "GUDI Vulnerability Score: <strong>" + globalConfig.identifyResults["Vulnerable Scoring Area - Groundwater Under Direct Influence"]["vsu_vulnerabilityScore_GUDI"] + "</strong><br>": "" %>\
	Issue Contributing areas (ICA): <strong><%= (globalConfig.identifyResults.hasOwnProperty("Issue Contributing Areas")) ? "Yes" : "No" %></strong>';
globalConfig.identifyMultiplePolygonLayersServicesTemplate = {
	layerList: _.map(globalConfig.identifyLayerList, function (layer) {
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

globalConfig.postIdentifyCallback = function (queryParams) {
	MOEMAP.clearOverlays();	
	var layerList = queryParams.layerList;
	var container = "";
	if (queryParams.hasOwnProperty('mergeFunction')) {
		container = queryParams.mergeFunction(queryParams.gLatLng);
	} else {
		container = Array.range(0, layerList.length - 1).map(function (i) {
			var features = layerList[i]["result"].features;
			if (features.length > 0) {
				return Array.range(0, features.length - 1).map(function (j) {
					return layerList[i].callback(features[j].attributes) + "<br>";
				}).join("");
			} else {
				return "";
			}			
		}).join("");
	}
	
	//if (globalConfig.identifyMultiplePolygonLayersServicesTemplate.hasOwnProperty('displayResultBelowMap') && (globalConfig.identifyMultiplePolygonLayersServicesTemplate.displayResultBelowMap)) {
	globalConfig.identifyResults["LatLng"] = queryParams.gLatLng;
	globalConfig.identifyResults["UTM"] = globalConfig.convertLatLngtoUTM(queryParams.gLatLng.lat(), queryParams.gLatLng.lng());
	if(globalConfig.identifyResults.hasOwnProperty("Issue Contributing Areas")) {
		var ICAIssuesQueryLayer = new gmaps.ags.Layer(globalConfig.url  + "/15");
		var IssueContributingGlobalID = globalConfig.identifyResults["Issue Contributing Areas"]["IssueContributingGlobalID"];
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