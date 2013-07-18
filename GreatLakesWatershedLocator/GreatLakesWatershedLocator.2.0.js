 var globalConfig = globalConfig || {};
globalConfig.preIdentifyCallbackName = "SWPLocator"; 
globalConfig.postIdentifyCallbackName = "SWPLocator"; 
globalConfig.addressGeocodingCallbackName = "SWPLocator"	
globalConfig.opacity = 0.9;
globalConfig.pointBufferTool = {available: false};
globalConfig.generateURLTool = {available: false};
globalConfig.usejQueryUITable = false;
globalConfig.usePredefinedMultipleTabs = false;
globalConfig.locationServicesList = [];
globalConfig.maxQueryZoomLevel = 12;
globalConfig.url = "http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/GreatLakes_WS_Bnd/MapServer";
globalConfig.identifyMarkerRedTearDrop = true;
globalConfig.displayDisclaimer = true;
globalConfig.disallowMouseClick = true;

globalConfig.lakeLocations = {
	"LAKE ERIE": {location: [42.261049,-81.128540], zoomlevel: 8},
	"LAC \u00c9RI\u00c9": {location: [42.261049,-81.128540], zoomlevel: 8},
	"LAKE HURON": {location: [45.313529,-81.886597], zoomlevel: 8},
	"LAC HURON": {location: [45.313529,-81.886597], zoomlevel: 8},
	"LAKE ONTARIO": {location: [43.651976,-77.997437], zoomlevel: 8},
	"LAC ONTARIO": {location: [43.651976,-77.997437], zoomlevel: 8},
	"LAKE SUPERIOR": {location: [47.802087,-86.989746], zoomlevel: 7},	
	"LAC SUP\u00c9RIEUR": {location: [47.802087,-86.989746], zoomlevel: 7},	
	"UPPER ST. LAWRENCE": {location: [44.439805,-75.848505], zoomlevel: 9},
	"ST. LAWRENCE RIVER": {location: [44.439805,-75.848505], zoomlevel: 9},
	"HAUT SAINT-LAURENT": {location: [44.439805,-75.848505], zoomlevel: 9},
	"FLEUVE SAINT-LAURENT": {location: [44.439805,-75.848505], zoomlevel: 9}
};
globalConfig.search = function(){
		var name = document.getElementById(globalConfig.searchInputBoxDivId).value.trim();
		if(name.length === 0){
			return;
		}
		MOEMAP.clearOverlays();
		var coorsArray = name.split(/\s+/);
		var searchString = coorsArray.join(" ").toUpperCase();
		if (globalConfig.lakeLocations.hasOwnProperty(searchString)) {
			var location = globalConfig.lakeLocations[searchString].location;
			var zoomlevel = globalConfig.lakeLocations[searchString].zoomlevel;
			var queryParams = {
				gLatLng: new google.maps.LatLng(location[0], location[1]),
				zoomLevel: globalConfig.lakeLocations[searchString].zoomlevel,
				address: name
			};
			console.log(queryParams);
			MOEMAP.identifyMultiplePolygonLayersWithLocation(queryParams);
		} else {
			globalConfig.maxQueryZoomLevel = 12;			
			MOEMAP.identifyMultiplePolygonLayersWithLocation(name);
		}
};

globalConfig.identifyMultiplePolygonLayersServicesTemplate = {
	layerList: [{
		url: globalConfig.url + "/0",
		returnGeometry: false,
		returnFields: ["LABEL"]		
	}], 
	merge: function (gLatLng) {
		var features = globalConfig.identifyMultiplePolygonLayersServicesTemplate.layerList[0]["result"].features;
		if (features.length == 0) {
			document.getElementById(globalConfig.informationDivId).innerHTML = "<i><b>" + globalConfig.returnedAddress + "</i></b>" + MOEMapLanguage.LocatedWithinTxt + "<b><i>" + MOEMapLanguage.NoGLWatershedMsg + ".</i></b>"; 
			return '<i>' + globalConfig.returnedAddress + '</i><br><br>' +     
				 '<table><tr><td><b><u>' + MOEMapLanguage.InfoResultTitle+ '</u></b></td></tr>' + 	 
				 '<tr><td><font style="color:#003399; font-size: 11 pt; font-weight:bold;">' + MOEMapLanguage.NoGLWatershedMsg + '</font></td></tr></table>';
		} else {		
			var record = globalConfig.identifyMultiplePolygonLayersServicesTemplate.layerList[0]["result"].features[0].attributes;
			var utm = globalConfig.convertLatLngtoUTM(gLatLng.lat(),gLatLng.lng());
			var easting = String(parseInt(utm.Easting,10));
			var northing = String(parseInt(utm.Northing,10));
			var resultGL;			
			if (globalConfig.language == "EN") {
				resultGL = record["LABEL"] + " WATERSHED";	
			} else {
				resultGL = MOEMapLanguage.GL[record.LABEL];	
			}
			document.getElementById(globalConfig.informationDivId).innerHTML = "<i><b>" + globalConfig.returnedAddress + "</i></b>" + MOEMapLanguage.LocatedWithinTxt + "<b><i>" + resultGL + ".</i></b>"; 							
			return '<i>' + globalConfig.returnedAddress + '</i><br><br>' +   
				 '<font style="color:#606060; font-size: 8 pt"><i><b>Latitude:</b> '+ gLatLng.lat().toFixed(6) + ' <b>Longitude:</b> ' + gLatLng.lng().toFixed(6) + '</i><br>' + 
				 '<i><b>' + MOEMapLanguage.UTMZone + ':</b>  '+ utm.Zone + ' <b>' + MOEMapLanguage.Easting + ':</b>  ' + easting + ' <b>'+ MOEMapLanguage.Northing + ':</b> ' + northing + '</i></font><br><br>' +
				 '<table><tr><td><b><u>' + MOEMapLanguage.InfoResultTitle+ '</u></b></td></tr>' + 	 
				 '<tr><td><font style="color:#003399; font-size: 11 pt; font-weight:bold;">' + resultGL + '</font></td></tr></table>';		
				//+ "<a href='javascript:void(0)' onclick='MOEMAP.showPolygonFeature(" + 0 + ","  + 0 + "," + 0 + ")'>Show " + record["MOE DISTRICT"]  + " Boundary</a>";		
				 
				 
		}
	}
};





