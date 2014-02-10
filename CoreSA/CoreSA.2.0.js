//var globalConfig = globalConfig || {};
globalConfig.preIdentifyCallbackName = "SWPLocator"; 
globalConfig.postIdentifyCallbackName = "SWPLocatorReverseGeocoding"; 
globalConfig.addressGeocodingCallbackName = "SWPLocator";
globalConfig.opacity = 0.5;
//globalConfig.opacity = 1.0;
globalConfig.pointBufferTool = {available: false};
globalConfig.generateURLTool = {available: false};
globalConfig.usejQueryUITable = false;
globalConfig.usePredefinedMultipleTabs = false;
globalConfig.locationServicesList = [];
globalConfig.maxQueryZoomLevel = 15;
//globalConfig.url = "http://www.appliomapss.lrc.gov.on.ca/ArcGIS/rest/services/MOE/MOE_Districts_Full_Bnd/MapServer";
//globalConfig.url = "http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Public/MOE_Districts_Full_Bnd/MapServer";
globalConfig.identifyMarkerRedTearDrop = true;
globalConfig.displayDisclaimer = true;
//globalConfig.disallowMouseClick = true;
globalConfig.extraImageService = {
		id: "arcgis",
		name: "LIO TOPO",
		url: 'http://intra.giscoecache.lrc.gov.on.ca/ArcGIS/rest/services/LIO_Cartographic/LIO_Topographic/MapServer',
		visible: true
};
globalConfig.defaultMapTypeId = globalConfig.extraImageService.id;
var transpLevel = 0.6;
//var transpLevel = 1.0;

/*
function () {
	if(document.getElementById('lyrTransp1').checked){
		transpLevel = 1.0;
	} else {
		transpLevel = 0.6;
	};
	//var op = opSlider.left()/range;
	globalConfig.tileLayerServiceAgsType.setOpacity(transplevel);
}; */


/*
globalConfig.tileLayerService = function () {
	if(document.getElementById('lyrTransp1').checked){
		transpLevel = 1.0;
	} else {
		transpLevel = 0.6;
	};
	//var op = opSlider.left()/range;
	globalConfig.tileLayerServiceAgsType.setOpacity(transplevel);
		
    url: 'http://10.77.230.88:6080/arcgis/rest/services/InteractiveMapInternal/CoreSA_TileCache2013/MapServer',
    name: 'CoreSATileCache', 
    opacity: transpLevel
};*/
globalConfig.tileLayerService = {		
    url: 'http://10.77.230.88:6080/arcgis/rest/services/InteractiveMapInternal/CoreSA_TileCache2013/MapServer',
    name: 'CoreSATileCache', 
    opacity: transpLevel
};
/*
globalConfig.legend = globalConfig.legend || {
		available: true,	
		url: "http://lrcdrrvsdvap002/web/CoreSA/en/img/CoreSAlegend2.png", 
		size: {width: 180, height: 270},   //Width and Height
		location: {ratioX: 0.75, ratioY: 0.95}  //
};*/
globalConfig.search = function(){
		var name = document.getElementById(globalConfig.searchInputBoxDivId).value.trim();
		if(name.length === 0){
			return;
		}
		MOEMAP.clearOverlays();
		globalConfig.maxQueryZoomLevel = 15;			
		MOEMAP.identifyMultiplePolygonLayersWithLocation(name);		
};

globalConfig.identifyMultiplePolygonLayersServicesTemplate = {
	layerList: [{
		url: globalConfig.url + "/1",
		returnGeometry: false,
		returnFields: ["OBJECTID","Residentia","WW_SA_30m", "WW_SA_15m", "DaycareSA", "DWS_SA", "EducationSA", "Healthcare", "IPZ_1_SA", "IPZ_2_SA", "RecreationalSA", "WHPA_A_SA", "WHPA_B_SA", "BeachSA","Total_HSA_Score"]/*,
		callback: function(record){
			return "Total HSA Score1: <strong>" + record["Total_HSA_Score"] + "</strong>"; 
		}*/
				
		/*,		
		layers: [0],		
		visibleLayers: {
			"0": {
				strokeColor: '#33FF00',
				strokeWeight: 4,
				strokeOpacity: 1
			}
		}*//*,
		visibleLayersWithClick: {
			"0": {
				strokeColor: '#33FF00',
				strokeWeight: 4,
				strokeOpacity: 1
			}
		}*/		
	}], 
	merge: function (gLatLng) {
		var features = globalConfig.identifyMultiplePolygonLayersServicesTemplate.layerList[0]["result"].features;
		if (features.length == 0) {			
			document.getElementById(globalConfig.informationDivId).innerHTML = "<i><b>" + globalConfig.returnedAddress +  MOEMapLanguage.NoMOEDistrictMsg + ".</i></b>"; 
			/*var contentString = '<i>' + globalConfig.returnedAddress + '</i><br><br>' +     
				'<table><tr><td><b><u>' + MOEMapLanguage.InfoResultTitle+ '</u></b></td></tr>' + 	 
				'<tr><td><h3>' + MOEMapLanguage.NoMOEDistrictMsg + '</h3></td></tr></table>'  */
			var contentString = 	
				'<h3>Search Returned Address: </h3>' + globalConfig.returnedAddress + '<br>' +     			
				'<b>Latitude:</b> '+ gLatLng.lat().toFixed(6) + ' <b>Longitude:</b> ' + gLatLng.lng().toFixed(6) + '<br><br><br>'+ 	
				'<h3>Returned address' +MOEMapLanguage.NoMOEDistrictMsg+ '. Please try again.</h3>'+'<br>(<i><b>Tip</b>: Drag current marker on map to desired location)</i>' 
				
			return contentString; 				 
		} else {		
			var record = globalConfig.identifyMultiplePolygonLayersServicesTemplate.layerList[0]["result"].features[0].attributes;
	
			
			/*if (globalConfig.language == "EN") {*/
				var creSATotal_HSA_Score = "Count of Overlap Receptor: " + record.Total_HSA_Score.toFixed(2);
				
				/*var coreSAResidential = "<b>Residential Properties: </b>" + record.Residentia;
				var coreSAWWSA30 = "Water Well 30m: " + record.WW_SA_30m;
				var coreSAWWSA15 = "Water Well 15m: " + record.WW_SA_15m;
				//var coreSAProvBase  = "Prov Base SA: " + record.ProvBaseSA;
				var coreSADayCare = "Daycare Sites: " + record.DaycareSA;
				var coreSADWS = "Drinking Water Systems: " + record.DWS_SA;
				var coreSAEdu = "Education Sites: " + record.EducationSA;
				var coreSAHealthCare = "Healthcare Sites: " + record.Healthcare;
				var coreSAIPZ1 = "IPZ - 1: " + record.IPZ_1_SA;
				var coreSAIPZ2 = "IPZ - 2: " + record.IPZ_2_SA;
				var coreSARecreational = "Recreational Sites: " + record.RecreationalSA;
				var coreSAWHPAA = "WHPA - A: " + record.WHPA_A_SA;
				var coreSAWHPAB = "WHPA - B: " + record.WHPA_B_SA;
				var coreSABeach = "Beaches: " + record.BeachSA;
				var moeOfficeAddressLbl = MOEMapLanguage.OfficeAddressLbl;*/

			/*} */
			document.getElementById(globalConfig.informationDivId).innerHTML = "<i><b>" + globalConfig.returnedAddress + "</i></b>" + MOEMapLanguage.LocatedWithinTxt + "<b><i>count of <u>"+ record.Total_HSA_Score.toFixed(2) + "</u> overlap receptor.</i></b>"; 			
			
				
			var addressReturn = globalConfig.returnedAddress;
			var contentString = '<h3>Search Returned Address: </h3>' + addressReturn + '<br>' +     			
			 '<b>Latitude:</b> '+ gLatLng.lat().toFixed(6) + ' <b>Longitude:</b> ' + gLatLng.lng().toFixed(6) + '<br><br><i>(<b>Tip</b>: Drag current marker on map to desired location if needed)</i><br><br> '+ 	
				'<h3>' +creSATotal_HSA_Score+ '</h3>' + 
				'<table class="CSATable"><tr><td>Residential Properties </td><td>'+record.Residentia+'</td></tr>' + 
				'<tr><td>Beaches </td><td>' 	+ record.BeachSA + '</td></tr>' + 
				'<tr><td>Water Well 30m </td><td>' 	+ record.WW_SA_30m + '</td></tr>' + 
				'<tr><td>Water Well 15m </td><td>' 	+ record.WW_SA_15m + '</td></tr>' + 			
				'<tr><td>Daycare Sites </td><td>' 	+ record.DaycareSA + '</td></tr>' + 	
				'<tr><td>Drinking Water Systems </td><td>' 		+ record.DWS_SA + '</td></tr>' + 	
				'<tr><td>Education Sites </td><td>' 		+ record.EducationSA + '</td></tr>' + 	
				'<tr><td>Healthcare Sites </td><td>' +record.Healthcare + '</td></tr>' + 	
				'<tr><td>IPZ - 1 </td><td>' + record.IPZ_1_SA + '</td></tr>' + 	
				'<tr><td>IPZ - 2 </td><td>' + record.IPZ_2_SA + '</td></tr>' + 				
				'<tr><td>WHPA - A </td><td>' + record.WHPA_A_SA + '</td></tr>' + 	
				'<tr><td>WHPA - B </td><td>' + record.WHPA_B_SA + '</td></tr>' + 	
				'<tr><td>Recreational Sites </td><td>' + record.RecreationalSA + '</td></tr></table>'
		
			return contentString; 
		}
	}
};
globalConfig.preIdentifyCallback = function (queryParams) {
	globalConfig.identifyResults = {};
	var layerSetting = queryParams.layerList[0];
	var params = {
		returnGeometry: layerSetting.hasOwnProperty('returnGeometry') ? layerSetting.returnGeometry : false,
		geometryType: 'esriGeometryPoint',
		geometry: queryParams.gLatLng,				
		outFields: ["OBJECTID","Residentia","WW_SA_30m", "WW_SA_15m", "DaycareSA", "DWS_SA", "EducationSA", "Healthcare", "IPZ_1_SA", "IPZ_2_SA", "RecreationalSA", "WHPA_A_SA", "WHPA_B_SA", "BeachSA","Total_HSA_Score"]
	};			
	return params;
};
/*
    google.maps.event.addDomListener(document.getElementById('lyrTransp1'), 'checked', function(){
             var op = 1.0;
             globalConfig.tileLayerServiceAgsType.setOpacity(op);        
           
           
          )};
*/

