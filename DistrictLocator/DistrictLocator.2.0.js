//var globalConfig = globalConfig || {};
globalConfig.chooseLang = function (en, fr) {return (globalConfig.language === "EN") ? en : fr;};
globalConfig.searchableFieldsList = [{en: "address", fr: "adresse"}, {en: "city name", fr: "ville"}, {en: "postal code", fr: "code postal"}];
globalConfig.searchHelpTxt = globalConfig.chooseLang("You may search by ", "Vous pouvez rechercher par ");
for(var i=0; i<globalConfig.searchableFieldsList.length - 1; i++) {
	globalConfig.searchHelpTxt = globalConfig.searchHelpTxt + "<strong>" + globalConfig.chooseLang(globalConfig.searchableFieldsList[i].en, globalConfig.searchableFieldsList[i].fr) + "</strong>, ";
}
globalConfig.searchHelpTxt = globalConfig.searchHelpTxt + "<strong>" + globalConfig.chooseLang(globalConfig.searchableFieldsList[i].en, globalConfig.searchableFieldsList[i].fr) + "</strong> " + globalConfig.chooseLang("or see help for advanced options.", "ou consulter l'aide pour de l'information sur les recherches avanc&eacute;es.");

globalConfig.searchControlHTML = '<div id="searchTheMap"></div><div id="searchHelp"></div><br>\
    <label class="element-invisible" for="map_query">' + globalConfig.chooseLang('Search the map', 'Recherche carte interactive') + '</label>\
	<input id="map_query" type="text" title="' + globalConfig.chooseLang('Search term', 'Terme de recherche') + '" maxlength="100" onkeypress="return globalConfig.entsub(event)" size="50" />\
	<label class="element-invisible" for="search_submit">' + globalConfig.chooseLang('Search', 'Recherche') + '</label>\
	<input type="submit" onclick="globalConfig.search()" id="search_submit" value="' + globalConfig.chooseLang('Search', 'Recherche') + '" title="' + globalConfig.chooseLang('Search', 'Recherche') + '" />\
	<label class="element-invisible" for="search_clear">' + globalConfig.chooseLang('Clear', 'Effacer') + '</label>\
	<input type="submit" value="&nbsp;' + globalConfig.chooseLang('Clear', 'Effacer') + '&nbsp;" id="search_clear" title="' + globalConfig.chooseLang('Clear', 'Effacer') + '" onclick="INITIALIZATION.init()" />\
	<div id="information"></div>';

globalConfig.preIdentifyCallbackName = "SWPLocator"; 
globalConfig.postIdentifyCallbackName = "SWPLocator"; 
globalConfig.addressGeocodingCallbackName = "SWPLocator";
globalConfig.opacity = 0.9;
globalConfig.pointBufferTool = {available: false};
globalConfig.generateURLTool = {available: false};
globalConfig.usejQueryUITable = false;
globalConfig.usePredefinedMultipleTabs = false;
globalConfig.locationServicesList = [];
globalConfig.maxQueryZoomLevel = 12;
//globalConfig.url = "http://www.appliomapss.lrc.gov.on.ca/ArcGIS/rest/services/MOE/MOE_Districts_Full_Bnd/MapServer";
//globalConfig.url = "http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Public/MOE_Districts_Full_Bnd/MapServer";
globalConfig.identifyMarkerRedTearDrop = true;
globalConfig.displayDisclaimer = true;
globalConfig.disallowMouseClick = true;

globalConfig.search = function(){
		var name = document.getElementById(globalConfig.searchInputBoxDivId).value.trim();
		if(name.length === 0){
			return;
		}
		MOEMAP.clearOverlays();
		globalConfig.maxQueryZoomLevel = 12;			
		MOEMAP.identifyMultiplePolygonLayersWithLocation(name);		
};

globalConfig.identifyMultiplePolygonLayersServicesTemplate = {
	layerList: [{
		url: globalConfig.url + "/0",
		returnGeometry: false,
		returnFields: ["OBJECTID","MOE_DISTRICT","STREET_NAME","CITY","POSTALCODE","PHONENUMBER","TOLLFREENUMBER","FAXNUMBER","MOE_DISTRICT_NAME"]/*,
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
			//document.getElementById(globalConfig.informationDivId).innerHTML = "<i><b>" + globalConfig.returnedAddress + "</i></b>" + MOEMapLanguage.LocatedWithinTxt + "<b><i>" + MOEMapLanguage.NoGLWatershedMsg + ".</i></b>"; 				  
			document.getElementById(globalConfig.informationDivId).innerHTML = "<i><b>" + globalConfig.returnedAddress + "</i></b>" + MOEMapLanguage.LocatedWithinTxt + "<b><i>"+ MOEMapLanguage.NoMOEDistrictMsg + ".</i></b>"; 
			var contentString = '<i>' + globalConfig.returnedAddress + '</i><br><br>' +     
				'<strong>' + MOEMapLanguage.InfoResultTitle+ '</strong><br>' + 	 
				'<h3>' + MOEMapLanguage.NoMOEDistrictMsg + '</h3>';
			return contentString; 				 
		} else {		
			var record = globalConfig.identifyMultiplePolygonLayersServicesTemplate.layerList[0]["result"].features[0].attributes;
			var moeDistrict = "";
			var moeOfficeAddressLbl = "";
			var moeDistrictStreet = "";
			var moeDistrictTollFreePhone = "";
			var moeDistrictFaxNum = "";
			if (globalConfig.language == "EN") {
				moeDistrict = record.MOE_DISTRICT + " MOE District";
				moeOfficeAddressLbl = MOEMapLanguage.OfficeAddressLbl;
				moeDistrictStreet =  record.STREET_NAME;	
				moeDistrictTollFreePhone = record.TOLLFREENUMBER;
				moeDistrictFaxNum = record.FAXNUMBER;
			} else {
				moeDistrict = MOEMapLanguage.MOEDistrict[record.MOE_DISTRICT];
				moeOfficeAddressLbl = MOEMapLanguage.OfficeAddressLbl;
				moeDistrictStreet = MOEMapLanguage.MOEDistrictStreet[record.MOE_DISTRICT];
				if (record.MOE_DISTRICT == "Thunder Bay") {
					moeDistrictTollFreePhone = MOEMapLanguage.moeDistrictThunderbayTollFreePhone["Thunder Bay"];
					moeDistrictFaxNum = MOEMapLanguage.moeDistrictThunderbayFax["Thunder Bay"];
				} else {
					moeDistrictTollFreePhone = record.TOLLFREENUMBER;
					moeDistrictFaxNum = record.FAXNUMBER;
				}
			}
			document.getElementById(globalConfig.informationDivId).innerHTML = "<i><b>" + globalConfig.returnedAddress + "</i></b>" + MOEMapLanguage.LocatedWithinTxt + "<b><i>"+ moeDistrict + ".</i></b>"; 			
			var moeDistrictCity = record.CITY;
			var moeDistrictPostalCode = record.POSTALCODE;
			var moeDistrictPhone = MOEMapLanguage.TelLbl + record.PHONENUMBER;
			var moeDistrictFax = MOEMapLanguage.FaxLbl + moeDistrictFaxNum;
			var moeDistrictTollFree = MOEMapLanguage.TollFreeLbl + moeDistrictTollFreePhone;
			var addressReturn = globalConfig.returnedAddress;
			var contentString = '<i>' + addressReturn + '</i><br><br>' + '<strong>' + MOEMapLanguage.InfoResultTitle+ '</strong><br>' + '<h3>' + moeDistrict + '</h3><br>' + moeOfficeAddressLbl + '<br>' + moeDistrictStreet + '<br>' + moeDistrictCity + ' ' + moeDistrictPostalCode+ '<br>' + moeDistrictTollFree + '<br>' + moeDistrictPhone+ moeDistrictFax;
			return contentString; 
		}
	}
};





