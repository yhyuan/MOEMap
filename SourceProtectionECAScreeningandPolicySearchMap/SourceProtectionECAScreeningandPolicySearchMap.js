//var globalConfig = globalConfig || {};
	
//globalConfig.language = "EN";
globalConfig.opacity = 0.7;
globalConfig.orgLatitude = 45.44424;
globalConfig.orgLongitude = -83.056943;
globalConfig.orgzoomLevel = 6;

globalConfig.url = "http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Internal/SWP_Policy_V07_931/MapServer";
globalConfig.searchControlHTML = '<input id = "map_query" type="text" title="Term" size="50" onfocus="this.value=\'\'" onkeypress="return globalConfig.entsub(event)" maxlength="100" autocomplete="off"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search" title="Search"></input>\
	<input type="submit" onclick="INITIALIZATION.init()" title="Clear" value="&nbsp;Clear&nbsp;"></input> ';
globalConfig.pointBufferTool = {available: false};
globalConfig.generateURLTool = {available: false};
globalConfig.usejQueryUITable = false;
globalConfig.usePredefinedMultipleTabs = false;
globalConfig.locationServicesList = [];
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
		name: 	"Intake Protection Zones",
		id: 4,
		returnFields: ["IPZType"]
	}, {
		name: "Well Head Protection Zones",
		id: 5,
		returnFields: ["ZoneName"]
	}, {
		name: 	"WHPA Groundwater Under Direct Influence: WHPA-E)",
		id: 6,
		returnFields: ["ZoneName"]
	}, {
		name: 	"Vulnerable Scoring Area - Surface Water",
		id: 7,
		returnFields: ["vss_vulnerabilityScore"]
	}, {
		name: 	"Vulnerable Scoring Area - Groundwater",
		id: 8,
		returnFields: ["vsg_vulnerabilityScore"]
	}, {
		name: 	"Vulnerable Scoring Area - Groundwater Under Direct Influence",
		id: 9,
		returnFields: ["vsu_vulnerabilityScore_GUDI"]
	}, {
		name: 	"SWP_Highly_Vul_Areas",
		id: 10,
		returnFields: ["IntrinsicVulnerabilityLevel"]
	}, {
		name: 	"SGRA_SPP_ID_NO_BORDERS",
		id: 11,
		returnFields: ["OBJECTID"]
	}, {
		name: 	"Niagara Escarpment Area of Development Control",
		id: 12,
		returnFields: ["OBJECTID"]
	}, {
		name: 	"SWP_Issue_Contributing_Areas",
		id: 13,
		returnFields: ["OBJECTID"]
	}
];
globalConfig.identifyResults = {};
globalConfig.identifyMultiplePolygonLayersServicesTemplate = {
	displayResultBelowMap: true,
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

globalConfig.locationServicesList = globalConfig.locationServicesList || [
	{
		mapService: globalConfig.url,
		layerID: globalConfig.layerNameIdDict["Assessment Parcels"],
		displayPolygon: true,  //For non-polygon layers, it is always false. For polygon layers, you can turn on and off to visualize the polygon.  
		fieldsInInfoWindow: ["ASSESSMENT_ROLL_NUMBER_PRIMARY"], 
		getInfoWindow: function(attributes){
			return "Assessment Parcel Number: <strong>" + attributes.ASSESSMENT_ROLL_NUMBER_PRIMARY + "</strong>";
		}, 
		latitude: "Latitude",
		longitude: "Longitude",
		getSearchCondition: function(searchString){
			return "ASSESSMENT_ROLL_NUMBER_PRIMARY = '" + searchString + "'";
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
				return true;
			}
			return false;				
		}
	}
];