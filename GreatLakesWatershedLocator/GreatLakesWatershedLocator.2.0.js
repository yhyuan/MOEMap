//var globalConfig = globalConfig || {};
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
//globalConfig.url = "http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/GreatLakes_WS_Bnd/MapServer";
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

if (globalConfig.language === "EN") {
	globalConfig.ClearLang = "Clear";
	globalConfig.TermLang = "Term";
	globalConfig.SearchLang = "Search";
	globalConfig.SearchTheMapLang = "Search the map";
	//globalConfig.disclaimerLang = "EN";
	globalConfig.displayDisclaimer = true;
	globalConfig.searchHelpTxt = "Search by <STRONG>Address</STRONG>, <STRONG>City Name</STRONG>, <STRONG>Coordinates</STRONG> or see help for more advanced options.";
	globalConfig.otherInfoHTML = "<br>Data source: Land Information Ontario (LIO).<br>";
	globalConfig.searchControlHTML = '<input id = "map_query" type="text" title="Term" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" 	autocomplete="off"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search" title="Search"></input> \
		<input type="submit" onclick="INITIALIZATION.init()" title="Clear" value="&nbsp;Clear&nbsp;"></input> 	\
		<br><br><div id="information" style="color:#000000">Search by <STRONG>Address</STRONG>, <STRONG>City Name</STRONG>, <STRONG>Coordinates</STRONG> or see help for more advanced options. </div>';
} else {
	globalConfig.ClearLang = "Effacer";
	globalConfig.TermLang = "Terme";
	globalConfig.SearchLang = "Rechercher";
	globalConfig.SearchTheMapLang = "Rechercher le plan";
	//globalConfig.disclaimerLang = "FR";
	globalConfig.displayDisclaimer = true;
	globalConfig.searchHelpTxt = "Rechercher par <STRONG>adresse</STRONG>, <STRONG>ville</STRONG>, <STRONG>coordonn\u00e9es</STRONG> ou cliquer sur aide pour plus d\u2019information sur la recherche avanc\u00e9e.";
	globalConfig.otherInfoHTML = "<br>Source: Information sur les terres de l'Ontario (ITO).<br>";
	globalConfig.searchControlHTML = '<input id = "map_query" type="text" title="Terme" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" autocomplete="off"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="Rechercher" title="Rechercher"></input> \
		<input type="submit" onclick="INITIALIZATION.init()" title="Effacer" value="&nbsp;Effacer&nbsp;"></input> 		\
		<br><br><div id="information" style="color:#000000">Rechercher par <STRONG>adresse</STRONG>, <STRONG>ville</STRONG>, <STRONG>coordonnées</STRONG> ou cliquer sur aide pour de l’information sur la recherche avancée.</div>';	
}
/*
globalConfig.searchControlHTML = '<label class="element-invisible" for="map_query">' + globalConfig.SearchTheMapLang + '</label> \
	<input id="map_query" type="text" autocomplete="off" maxlength="100" onkeypress="return globalConfig.entsub(event)" size="50" title="' + globalConfig.TermLang + '" /> \
	<label class="element-invisible" for="search_submit">' + globalConfig.SearchLang + '</label> \
	<input type="submit" onclick="globalConfig.search()" id="search_submit" value="' + globalConfig.SearchLang + '" title="' + globalConfig.SearchLang + '" /> \
	<label class="element-invisible" for="search_clear">' + globalConfig.ClearLang + '</label> \
	<input type="submit" value="&nbsp;' + globalConfig.ClearLang + '&nbsp;" id="search_clear" title="' + globalConfig.ClearLang + '" onclick="INITIALIZATION.init()" />';
*/
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
			//console.log(queryParams);
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





