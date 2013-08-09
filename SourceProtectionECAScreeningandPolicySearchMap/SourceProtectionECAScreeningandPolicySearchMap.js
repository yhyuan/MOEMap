 var globalConfig = globalConfig || {};
	
globalConfig.language = "EN";
globalConfig.opacity = 0.7;
globalConfig.orgLatitude = 45.44424;
globalConfig.orgLongitude = -83.056943;
globalConfig.orgzoomLevel = 6;

//globalConfig.url = "http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Internal/SWP_VSA_Maximum/MapServer";
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
//var SWPMapService = "http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Internal/SWP_VSA_Maximum/MapServer";
//var SWPMapService2 = "http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Internal/SWP_Policy1/MapServer";

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
	displayResultBelowMap: true//,
/*	layerList: [{
		url: globalConfig.url + "/" + globalConfig.layerIDLookUpTable["Source Protection Area - 2011"],
		returnFields: ["LABEL", "SPP_ID"],
		callback: function(record){
			globalConfig.identifyResults["Source Protection Area - 2011"] = record;
			return "";
		}
	},{
		url: globalConfig.url + "/" + globalConfig.layerIDLookUpTable["Lots and Concessions"],
		returnFields: ["LABEL"],
		callback: function(record){
			globalConfig.identifyResults["Lots and Concessions"] = record;
			return "";
		}
	},{
		url: globalConfig.url + "/" + globalConfig.layerIDLookUpTable["Assessment Parcels"],
		returnFields: ["ASSESSMENT_ROLL_NUMBER_PRIMARY", "MPAC_STREET_ADDRESS", "MUNICIPALITY_NAME"],
		callback: function(record){
			globalConfig.identifyResults["Assessment Parcels"] = record;
			return "";
		}
	},{
		url: globalConfig.url + "/" + globalConfig.layerIDLookUpTable["Ownership Parcels"],
		returnFields: ["PIN"],
		callback: function(record){
			globalConfig.identifyResults["Ownership Parcels"] = record;
			return "";
		}
	},{
		url: globalConfig.url + "/" + globalConfig.layerIDLookUpTable["Source Protection Area - 2011"],
		returnFields: ["LABEL", "SPP_ID"],
		callback: function(record){
			globalConfig.identifyResults["Source Protection Area - 2011"] = record;
			return "";
		}
	},{
		url: globalConfig.url + "/" + globalConfig.layerIDLookUpTable["Source Protection Area - 2011"],
		returnFields: ["LABEL", "SPP_ID"],
		callback: function(record){
			globalConfig.identifyResults["Source Protection Area - 2011"] = record;
			return "";
		}
	},{
		url: SWPMapService + "/2",
		returnFields: [],
		callback: function(record){
			return "Vulnerable Area Type: <strong>IPZ-1</strong>";
		}
	},{
		url: SWPMapService + "/3",
		returnFields: [],
		callback: function(record){
			return "Vulnerable Area Type: <strong>IPZ-2</strong>";
		}
	},{
		url: SWPMapService + "/4",
		returnFields: [],
		callback: function(record){
			return "Vulnerable Area Type: <strong>WHPA A</strong>";
		}
	},{
		url: SWPMapService + "/5",
		returnFields: [],
		callback: function(record){
			return "Vulnerable Area Type: <strong>WHPA B</strong>";
		}
	},{
		url: SWPMapService + "/6",
		returnFields: [],
		callback: function(record){
			return "Vulnerable Area Type: <strong>WHPA C</strong>";
		}
	},{
		url: SWPMapService + "/7",
		returnFields: [],
		callback: function(record){
			return "Vulnerable Area Type: <strong>WHPA D</strong>";
		}
	},{
		url: SWPMapService + "/8",
		returnFields: [],
		callback: function(record){
			return "Vulnerable Area Type: <strong>WHPA E</strong>";
		}
	},{
		url: SWPMapService2 + "/0",
		returnFields: ["vss_vulnerabilityScore", "vss_ipz_id", "vss_vulnerabilityScore", "vss_spp_id"],
		callback: function(record){
			return "Vulnerable Area Score: <strong>" + record["vss_vulnerabilityScore"] + "</strong>" + "<br><a href='http://maps.thamesriver.on.ca/swpPolicyEntry/parseLink/parse.aspx?zone=" + record["vss_ipz_id"] + "&score=" + record["vss_vulnerabilityScore"] + "&sppid=" + record["vss_spp_id"] + "&source=sw' target='_blank'>Policy for Surface Water</a>";
		}
	},{
		url: SWPMapService2 + "/1",
		returnFields: ["vsg_vulnerabilityScore", "vsg_whpa_id", "vsg_vulnerabilityScore", "vsg_spp_id"],
		callback: function(record){
			return "Vulnerable Area Score: <strong>" + record["vsg_vulnerabilityScore"] + "</strong>" + "<br><a href='http://maps.thamesriver.on.ca/swpPolicyEntry/parseLink/parse.aspx?zone=" + record["vsg_whpa_id"] + "&score=" + record["vsg_vulnerabilityScore"] + "&sppid=" + record["vsg_spp_id"] + "&source=gw' target='_blank'>Policy for Groundwater</a>";
		}
	},{
		url: "http://lrcprrvspaap005/ArcGIS/rest/services/Interactive_Map_Internal/SWP_Parcel/MapServer/0",
		returnFields: ["ARN","MPAC_STREET_ADDRESS","MPAC_TAXATION_MUNICIPALITY"],
		displayPolygon: true,
		returnGeometry: true,
		callback: function(record){
			return "Assessment Roll Number: <strong>" + record["ARN"] + "</strong><br>MPAC Street Address: <strong>"  + record["MPAC_STREET_ADDRESS"] + ", " + record["MPAC_TAXATION_MUNICIPALITY"] +"</strong>";
		}
	}]*/
};
globalConfig.identifyMultiplePolygonLayersServicesTemplate.layerList = globalConfig.identifyLayerList.map(function (layer) {
	return {
		url: globalConfig.url + "/" + layer.id,
		returnFields: layer.returnFields,
		callback: function(record){
			console.log (record);
			/*
			globalConfig.identifyResults[layer.name] = {};
			layer.returnFields.map(function(field) {
				if(record.hasOwnProperty(field)) {
					globalConfig.identifyResults[layer.name][field] = record[field];
				} else {
					globalConfig.identifyResults[layer.name][field] = "";
				}
			});
			*/
			globalConfig.identifyResults[layer.name] = record;
			return "";
		}	
	}
});	

