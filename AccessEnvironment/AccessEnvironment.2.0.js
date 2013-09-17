globalConfig.isRoutingServiceAvailable = false;
globalConfig.displayDisclaimer = true;
globalConfig.maxQueryReturn = 500;
globalConfig.accessible = globalConfig.accessible || false;

globalConfig.resultFoundSimple = globalConfig.resultFoundSimple || function(queryParams){
	var searchString = queryParams.searchString;
	var totalCount = queryParams.totalCount;
	//console.log(queryParams);
	var regionName = "";
	if (typeof(queryParams.withinExtent) !== "undefined") {
		regionName = " " + (queryParams.withinExtent ? globalConfig.inCurrentMapExtentLang : globalConfig.inGobalRegionLang);
	}
	var searchString = "";
	if (typeof(queryParams.searchString) !== "undefined") {
		searchString = " " + globalConfig.forLang + " <strong>"  + queryParams.searchString + "</strong> ";
	}
	
	var message = "";
	if(totalCount === 0){
		message = globalConfig.yourSearchLang + searchString + globalConfig.returnedNoResultLang + regionName + ". " + globalConfig.pleaseRefineSearchLang + ".";
	} else if(totalCount === 1){
		message = globalConfig.oneResultFoundLang  + searchString + regionName + ".";
	} else if(totalCount >= globalConfig.maxQueryReturn){
		//message = totalCount + " " + globalConfig.resultsFoundLang + searchString + regionName + ". " + globalConfig.onlyLang + " " + globalConfig.maxQueryReturn + " " + globalConfig.returnedLang + ". " + globalConfig.seeHelpLang + ".";
		message = "Your search has returned " + totalCount + " results.  Only the first " + globalConfig.maxQueryReturn + " are displayed. Please try narrowing your search.";
	} else {
		message = totalCount + " " + globalConfig.resultsFoundLang + searchString + regionName + ".";
	}		
	document.getElementById(globalConfig.informationDivId).innerHTML ="<i>" + message + "</i>";
};
	
if (globalConfig.accessible) {
	globalConfig.usePredefinedMultipleTabs = false;
	globalConfig.allowMultipleIdentifyResult = false;
	globalConfig.displayTotalIdentifyCount = false;
	globalConfig.postConditionsCallbackName = "AccessibleWells";
	globalConfig.tableSimpleTemplateTitleLang = "";
	globalConfig.postConditionsCallback = function (queryParams) {
		var features = Array.range(0, queryParams.layerList.length - 1).reduce(function(previousValue, currentValue) {
			var result = queryParams.layerList[currentValue].result;
			if (result.hasOwnProperty('features')) {
				return previousValue.concat(result.features);
			} else {
				return previousValue;
			}
		}, []);
		queryParams.totalCount = features.length;
		globalConfig.resultFoundSimple(queryParams);		
		if(features.length === 0) {
			return;
		}
		if (features.length > globalConfig.maxQueryReturn) {
			features = features.slice(0, globalConfig.maxQueryReturn);
		}
		var tableTemplate = queryParams.layerList[0].tableTemplate;
		var table = tableTemplate.head + Array.range(0, features.length - 1).reduce(function(previousValue, currentValue) {
			var calculateContents = TABS_CALCULATOR.getContent(features[currentValue].attributes, [{ label:globalConfig.InformationLang, content:tableTemplate.content}]);
			var str = calculateContents[0].content;
			if(currentValue%2 === 1) {
				str = globalConfig.replaceChar(str, "<td>", "<td  class='shaded'>");
			} 
			return previousValue + str;
		}, "") + tableTemplate.tail;
		document.getElementById(globalConfig.queryTableDivId).innerHTML = table;
	};
} else {
	//globalConfig.usejQueryUITable = true;
	var lang = "";
	var legendWidth = 0;
	if (globalConfig.language === "EN") {
		globalConfig.tableSimpleTemplateTitleLang = "Note: The Distance(KM) column represents the distance between your search location and the permit location in the specific row. Data is in English only.";
		lang = "en";
		legendWidth = 270;
	} else {
		globalConfig.tableSimpleTemplateTitleLang = "\u00c0 noter : La colonne de distance (en km) donne la distance entre le lieu de votre recherche et le lieu concern\u00e9 par le permis dans la rang\u00e9e donn\u00e9e. Les donn\u00e9es sont en anglais seulement.";
		lang = "fr";
		legendWidth = 372;		
	}
	globalConfig.legend = {
		available: true,	
		url: "http://www.downloads.ene.gov.on.ca/files/mapping/js/AccessEnvironment/legend_" + lang +  ".png", 
		size: {width: legendWidth, height: 81},   //Width and Height
		location: {ratioX: 0.01, ratioY: 0.25}  	
	};

	globalConfig.postConditionsCallback = function (queryParams) {
		var features = Array.range(0, queryParams.layerList.length - 1).reduce(function(previousValue, currentValue) {
			var result = queryParams.layerList[currentValue].result;
			if (result.hasOwnProperty('features')) {
				return previousValue.concat(result.features);
			} else {
				return previousValue;
			}
		}, []);
		queryParams.totalCount = features.length;
		if (features.length > globalConfig.maxQueryReturn) {
			features = features.slice(0, globalConfig.maxQueryReturn);
		}
		globalConfig.resultFoundSimple(queryParams);		
		if(features.length === 0) {
			if(queryParams.requireGeocode) {
				MOEMAP.geocodeAddress(queryParams);		
			}		
			return;
		}
		if(!queryParams.withinExtent) {	
			var bounds = globalConfig.calculatePointsBounds(features);
			globalConfig.setMapBound(queryParams.map,bounds);	
		}
		globalConfig.addMarkers(features,queryParams.layerList[0].tabsTemplate);
		if (queryParams.layerList[0].hasOwnProperty('tableTemplate')){ 
			globalConfig.renderTable(features,queryParams.layerList[0].tableTemplate);
		}
	};
	globalConfig.postBufferCallback = function (queryParams) {
		var features = Array.range(0, queryParams.layerList.length - 1).reduce(function(previousValue, currentValue) {
			var result = queryParams.layerList[currentValue].result;
			if (result.hasOwnProperty('features')) {
				return previousValue.concat(result.features);
			} else {
				return previousValue;
			}
		}, []);
		if(features.length === 0) {
			queryParams.totalCount = 0;
			globalConfig.resultFoundSimple(queryParams);				
			return;
		}
		queryParams.totalCount = features.length;
		if (features.length > globalConfig.maxQueryReturn) {
			features = features.slice(0, globalConfig.maxQueryReturn);
		}		
		globalConfig.addMarkers(features, queryParams.layerList[0].tabsTemplate);
		globalConfig.renderTable(features, queryParams.layerList[0].tableTemplate, queryParams.gLatLng);
		//queryParams.totalCount = features.length;
		globalConfig.resultFoundSimple(queryParams);		
	}	
}

if (globalConfig.language === "EN") {
	globalConfig.radiusMustBeNumber = "The search radius must be a number.";
	globalConfig.mustSpecifyRadius = "You must specify a search radius or remove the value in address";
	globalConfig.mustSpecifyAddress = "You must specific a search address or remove the value in radius.";
	globalConfig.InformationLang = "Information";
	globalConfig.MoreLang = "More...";
	globalConfig.fieldNamesList = [
		//"Certificate Number", 
		"Approval Number",
		"Business Name", 
		"Date", 
		"Project Type", 
		"Report", 
		"MOE Reference Number",
		"EBR Reference Number",
		"Address",
		"Municipality",
		"Status"
	];
	if (globalConfig.advancedVersion) {
		globalConfig.searchHelpTxt = "";
		globalConfig.searchControlHTML = '<label class="element-invisible" for="map_query">Search the map</label> \
			<input id="map_query" type="text" title="Term" maxlength="100" onkeypress="return globalConfig.entsub(event)" size="50" /> &nbsp; \
			<label class="element-invisible" for="search_submit">Search</label> \
			<input type="submit" title="Search" id="search_submit" value="Search" onclick="globalConfig.search()" /> \
			<br/> \
			<fieldset> \
				<input id="searchLocation" type="radio" title="Search business name" onclick="globalConfig.searchChange(\'BusinessName\')" checked="checked" value="location" name="searchGroup"> \
				<span class="tooltip" title="Search business name: Enter business name to find approvals and registrations"> \
				<label for="searchLocation" class=\'option\'>Search business name</label> \
				</span> \
				<br/> \
				<input id="searchLocation" type="radio" title="Search near a specified address" onclick="globalConfig.searchChange(\'Location\')" checked="checked" value="location" name="searchGroup"> \
				<span class="tooltip" title="Search near a specified address: Enter street address to find facilities"> \
				<label for="searchLocation" class=\'option\'>Search near a specified address</label> \
				</span> \
				<br/> \
				<input id="searchSubstance" type="radio" title="Search Substance" onclick="globalConfig.searchChange(\'Substance\')" value="substance" name="searchGroup"> \
				<span class="tooltip" title="Search Substance: Enter the name of a substance to find facilities"> \
				<label for="searchSubstance" class=\'option\'>Search substance</label> \
				</span> \
				<br/> \
				<input id="searchSector" type="radio" title="Search Sector" onclick="globalConfig.searchChange(\'Sector\')" value="sector" name="searchGroup"> \
				<span class="tooltip" title="Search Sector: Enter the name of a sector to find facilities"> \
				<label for=\'searchSector\' class=\'option\'>Search sector</label> \
				</span> \
				<br/> \
			</fieldset>';
	} else {	
		if (globalConfig.accessible) {
			globalConfig.searchHelpTxt = "Search with Business Name.";
			globalConfig.AdvancedSearchLang = "Advanced Search"; 
			globalConfig.searchControlHTML = '<center><input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="Term"></input>&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search" title="Search"></input><a href=\'AccessEnvironmentAdv_Accessible_en.htm\'>' + globalConfig.AdvancedSearchLang + '</a><br><div id="information" style="margin-top:10px;">' + globalConfig.searchHelpTxt + '</div></center>';			
		} else {
			globalConfig.searchHelpTxt = "Zoom in, or Search with Business Name, Address.";
			globalConfig.searchControlHTML = '<center>\
				<input id = "map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search"></input>&nbsp;&nbsp;\
				<a href=\'AccessEnvironmentAdv.htm\'>Advanced Search</a>\
				<br><input id = "searchBusiness" type="radio" name="searchGroup" value="business" onclick="globalConfig.searchChange(\'Business\')">Business Name\
				<input id = "searchLocation" type="radio" name="searchGroup" value="location" onclick="globalConfig.searchChange(\'Location\')">Address with Radius of\
				<select name="searchCriteria.radius" id="lstRadius">\
										<option value="1" >1 km</option>\
										<option value="5" >5 km</option>\
										<option value="10" >10 km</option>\
										<option value="25" >25 km</option>\
										<option value="50" >50 km</option>\
									</select>\
				<div id="information" style="color:#0000FF">' + globalConfig.searchHelpTxt + '</div></center>';			
		}
	}
} else {
	globalConfig.radiusMustBeNumber = "The search radius must be a number.";
	globalConfig.mustSpecifyRadius = "You must specify a search radius or remove the value in address";
	globalConfig.mustSpecifyAddress = "You must specific a search address or remove the value in radius.";
	globalConfig.InformationLang = "Information";
	globalConfig.MoreLang = "Autres...";
	globalConfig.fieldNamesList = [
		//"Num\u00e9ro du certificat", 
		"N&deg; d'autorisation",
		"Nom de l'entreprise", 
		"Date", 
		"Type de projet", 
		"Rapport", 
		"N&deg; de r\u00e9f\u00e9rence du MEO",
		"N&deg; de r\u00e9f. au Registre environnemental",
		"Adresse",
		"Municipalit\u00e9",
		"Statut"
	];
	if (globalConfig.advancedVersion) {
		globalConfig.searchHelpTxt = "";
		globalConfig.searchControlHTML = '<label class="element-invisible" for="map_query">Search the map</label> \
			<input id="map_query" type="text" title="Term" maxlength="100" onkeypress="return globalConfig.entsub(event)" size="50" /> &nbsp; \
			<label class="element-invisible" for="search_submit">Search</label> \
			<input type="submit" title="Search" id="search_submit" value="Search" onclick="globalConfig.search()" /> \
			<br/> \
			<fieldset> \
				<input id="searchLocation" type="radio" title="Search Map Location or Facility" onclick="mapConfig.searchChange(\'Location\')" checked="checked" value="location" name="searchGroup"> \
				<span class="tooltip" title="Search Map Location or Facility: Enter facility name or street address to find facilities"> \
				<label for="searchLocation" class=\'option\'>Search map location or facility</label> \
				</span> \
				<br/> \
				<input id="searchSubstance" type="radio" title="Search Substance" onclick="mapConfig.searchChange(\'Substance\')" value="substance" name="searchGroup"> \
				<span class="tooltip" title="Search Substance: Enter the name of a substance to find facilities"> \
				<label for="searchSubstance" class=\'option\'>Search substance</label> \
				</span> \
				<br/> \
				<input id="searchSector" type="radio" title="Search Sector" onclick="mapConfig.searchChange(\'Sector\')" value="sector" name="searchGroup"> \
				<span class="tooltip" title="Search Sector: Enter the name of a sector to find facilities"> \
				<label for=\'searchSector\' class=\'option\'>Search sector</label> \
				</span> \
				<br/> \
				<input id="currentMapExtent" type="checkbox" name="currentExtent" title="Current Map Display" /> <label for="currentExtent" class=\'option\'>Search current map display only</label> \
			</fieldset>';
	} else {
		globalConfig.AdvancedSearchLang = "Recherche avanc\u00e9e"; 	
		if (globalConfig.accessible) {
			globalConfig.searchHelpTxt = "Faire un zoom avant ou une recherche par nom d\u0027entreprise.";
			globalConfig.SearchLang = "Recherche";
			globalConfig.searchControlHTML = '<center>\
				<input id = "map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="' + globalConfig.SearchLang + '"></input>&nbsp;&nbsp;\
				<a href=\'AccessEnvironmentAdv_Accessible_fr.htm\'>' + globalConfig.AdvancedSearchLang + '</a>\
				<div id="information" style="color:#0000FF">' + globalConfig.searchHelpTxt + '</div></center>';
		} else {
			globalConfig.searchHelpTxt = "Faire un zoom avant ou une recherche par nom d\u0027entreprise et adresse.";
			globalConfig.BusinessNameLang = "Nom de l'entreprise";
			globalConfig.SearchLang = "Recherche";
			globalConfig.AddresswithRadiusofLang = "Adresse dans un rayon de";
			globalConfig.searchControlHTML = '<center>\
				<input id = "map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="' + globalConfig.SearchLang + '"></input>&nbsp;&nbsp;\
				<a href=\'AccessEnvironmentAdv_fr.htm\'>' + globalConfig.AdvancedSearchLang + '</a>\
				<br><input id = "searchBusiness" type="radio" name="searchGroup" value="business" onclick="globalConfig.searchChange(\'Business\')">' + globalConfig.BusinessNameLang + '\
				<input id = "searchLocation" type="radio" name="searchGroup" value="location" onclick="globalConfig.searchChange(\'Location\')">' + globalConfig.AddresswithRadiusofLang + '\
				<select name="searchCriteria.radius" id="lstRadius">\
										<option value="1" >1 km</option>\
										<option value="5" >5 km</option>\
										<option value="10" >10 km</option>\
										<option value="25" >25 km</option>\
										<option value="50" >50 km</option>\
									</select>\
				<div id="information" style="color:#0000FF">' + globalConfig.searchHelpTxt + '</div></center>';			
		}
	}	
}

globalConfig.formatDate = function(timestamp){
	if (globalConfig.url === "http://www.giscoeservices.lrc.gov.on.ca/ArcGIS/rest/services/MOE/ECofA_P/MapServer") {
		if((typeof(timestamp) != "undefined") && (parseInt(timestamp) === timestamp)){
			var date = new Date(timestamp);
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			return "" + year + "/" + month  + "/" + day;
		}else{
			return "N/A";
		}
	} else {
		if (timestamp !== "N/A") {
			//console.log(timestamp);
			var date = new Date(timestamp);
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			return "" + year + "/" + month  + "/" + day;
		} else {
			return "N/A";
		}
	}
};
globalConfig.formatProjectType = function(str){
	if(typeof (str) == 'undefined'){
		return "N/A";
	}
	if(str=="null"){
		return "N/A";
	}
	if(str=="Null"){
		return "N/A";
	}
	if(str.indexOf("_") > 0){
		return globalConfig.replaceChar(str, "_", " ");
	}			
	return str;
};
globalConfig.calculateReportURL = function(pdflink){
	if(typeof(pdflink) != "undefined"){
		if(pdflink == "N/A"){
			return "N/A";
		}else{
			if(pdflink.indexOf(".pdf") > 0){
				return "<a target='_blank' href='http://www.environet.ene.gov.on.ca/instruments/" + pdflink + "'>PDF</a>";
			}
			var reg = /^\d+$/;
			if(reg.test(pdflink)){
				//return "<a target='_blank' href='http://www.accessenvironment.ene.gov.on.ca/PiwWeb/piw/ViewDocument.action?documentRefID=" + pdflink + "'>PDF</a>";
				return "<a target='_blank' href='http://www.accessenvironment.ene.gov.on.ca/AEWeb/ae/ViewDocument.action?documentRefID=" + pdflink + "'>PDF</a>";
			}
		}
	}		
	return "N/A";
};
globalConfig.calculateCERTIFICATE_NUMBER = function(pdflink, CERTIFICATE_NUMBER){
	var certficateNumber = globalConfig.processNA(CERTIFICATE_NUMBER);
	if(typeof(pdflink) != "undefined"){
		if(pdflink == "N/A"){
			return certficateNumber;
		}else{
			if(pdflink.indexOf(".pdf") > 0){
				return "<a target='_blank' href='http://www.environet.ene.gov.on.ca/instruments/" + pdflink + "'>" + certficateNumber + "</a>";
			}
			var reg = /^\d+$/;
			if(reg.test(pdflink)){
				//return "<a target='_blank' href='http://www.accessenvironment.ene.gov.on.ca/PiwWeb/piw/ViewDocument.action?documentRefID=" + pdflink + "'>PDF</a>";
				return "<a target='_blank' href='http://www.accessenvironment.ene.gov.on.ca/AEWeb/ae/ViewDocument.action?documentRefID=" + pdflink + "'>" + certficateNumber + "</a>";
			}
		}
	}		
	return certficateNumber;
};

globalConfig.tabTableFieldList_1 = [
	//{name: globalConfig.fieldNamesList[0], value: "{globalConfig.processNA(CERTIFICATE_NUMBER)}"}, 
	{name: globalConfig.fieldNamesList[0], value: "{globalConfig.calculateCERTIFICATE_NUMBER(PDF_LINK,CERTIFICATE_NUMBER)}"}, 
	{name: globalConfig.fieldNamesList[1], value: "{globalConfig.processNA(BUSINESS_NAME)}"}, 
	{name: globalConfig.fieldNamesList[2], value: "{globalConfig.formatDate(DATE_)}"}, 
	{name: globalConfig.fieldNamesList[3], value: "{globalConfig.formatProjectType(PROJECT_TYPE)}"}//, 
	//{name: globalConfig.fieldNamesList[4], value: "{globalConfig.calculateCERTIFICATE_NUMBER(PDF_LINK, CERTIFICATE_NUMBER)}"}
];

globalConfig.tabTableFieldList_2 = [
	{name: globalConfig.fieldNamesList[5], value: "{globalConfig.processNA(REFERENCE_NUMBER)}"}, 
	{name: globalConfig.fieldNamesList[6], value: "{globalConfig.processNA(EBR_REFERENCE_NUMBER)}"}, 
	{name: globalConfig.fieldNamesList[7], value: "{globalConfig.processNA(ADDRESS)}"}, 
	{name: globalConfig.fieldNamesList[8], value: "{globalConfig.processNA(MUNICIPALITY)}"}, 
	{name: globalConfig.fieldNamesList[9], value: "{globalConfig.formatProjectType(STATUS)}"}
];

globalConfig.tableFieldList = [
	//{name: globalConfig.fieldNamesList[0] + "&nbsp&nbsp", value: "{globalConfig.processNA(CERTIFICATE_NUMBER)}"}, 
	{name: globalConfig.fieldNamesList[0] + "&nbsp&nbsp", value: "{globalConfig.calculateCERTIFICATE_NUMBER(PDF_LINK,CERTIFICATE_NUMBER)}"}, 
	{name: globalConfig.fieldNamesList[1] + "&nbsp&nbsp", value: "{globalConfig.processNA(BUSINESS_NAME)}"}, 
	{name: globalConfig.fieldNamesList[7], value: "{globalConfig.processNA(ADDRESS)}"}, 
	{name: globalConfig.fieldNamesList[8] + "&nbsp&nbsp", value: "{globalConfig.processNA(MUNICIPALITY)}"}, 
	{name: globalConfig.fieldNamesList[2], value: "{globalConfig.formatDate(DATE_)}"},
	{name: globalConfig.fieldNamesList[3] + "&nbsp&nbsp", value: "{globalConfig.formatProjectType(PROJECT_TYPE)}"},
	{name: globalConfig.fieldNamesList[9] + "&nbsp", value: "{globalConfig.formatProjectType(STATUS)}"}//,
	//{name: globalConfig.fieldNamesList[4] + "&nbsp&nbsp", value: "{globalConfig.calculateCERTIFICATE_NUMBER(PDF_LINK, CERTIFICATE_NUMBER)}"},	
];

globalConfig.queryLayerList = [{
	url: globalConfig.url + "/0",
	tabsTableTemplate: [{
		label: globalConfig.InformationLang,
		content: globalConfig.tabTableFieldList_1
	},{
		label: globalConfig.MoreLang,
		content: globalConfig.tabTableFieldList_2
	}], 
	tableSimpleTemplate: {
		title: globalConfig.tableSimpleTemplateTitleLang, 
		content: globalConfig.tableFieldList
	} 
}];
globalConfig.postInitialize = function(map){
	if (document.getElementById(globalConfig.searchBusinessDivId)) {
		document.getElementById(globalConfig.searchBusinessDivId).checked = true;
	}
	if(document.getElementById(globalConfig.searchLocationDivId)){
		document.getElementById(globalConfig.searchLocationDivId).checked = false;
	}
	if(document.getElementById(globalConfig.radiusSelectionDivId)){
		document.getElementById(globalConfig.radiusSelectionDivId).disabled = true;
	}
	if(document.getElementById(globalConfig.searchInputBoxDivId)){
		document.getElementById(globalConfig.searchInputBoxDivId).focus();//Make sure the input box is focused when the page is initialized.
	}
	if (!globalConfig.accessible) {
		var triangleRecordsWithoutLatLng = [
			new google.maps.LatLng(45.6, -81),
			new google.maps.LatLng(45.435563, -81.1),
			new google.maps.LatLng(45.435563, -80.899887),
			new google.maps.LatLng(45.6, -81)
		];
		var triangle = new google.maps.Polyline({
			path: triangleRecordsWithoutLatLng,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 2
		});
		triangle.setMap(map);
	}
};
globalConfig.searchChange = function(type){
	if(type === "Business"){
		document.getElementById(globalConfig.radiusSelectionDivId).disabled = true;
	}else{
		document.getElementById(globalConfig.radiusSelectionDivId).disabled = false;
	}
};

globalConfig.search = function(){
		var searchString = document.getElementById(globalConfig.searchInputBoxDivId).value.trim();
		if(searchString.length === 0){
			return;
		}
		document.getElementById(globalConfig.queryTableDivId).innerHTML = "";
		MOEMAP.clearOverlays();
		var queryParams = {
			searchString: searchString,
			withinExtent: false
		};
		document.getElementById(globalConfig.informationDivId).innerHTML ="<i>Searching......</i>";
		if(globalConfig.accessible || document.getElementById(globalConfig.searchBusinessDivId).checked){
			var name = searchString.toUpperCase();
			name = globalConfig.replaceChar(name, "'", "''");
			name = globalConfig.replaceChar(name, "\u2019", "''");
			var fuzzyConditionsGenerator = function(field, str) {
				return "(UPPER(" + field + ") LIKE '% " + str + " %') OR (UPPER(" + field + ") LIKE '" + str + " %') OR (UPPER(" + field + ") LIKE '% " + str + "') OR (UPPER(" + field + ") = '" + str + "') OR (UPPER(" + field + ") LIKE '%" + str + ",%')";
			};				
			queryParams.where = fuzzyConditionsGenerator("BUSINESS_NAME", name);
			queryParams.requireGeocode = false;
			queryParams.address = searchString;
			MOEMAP.queryLayersWithConditionsExtent(queryParams);				
			return;
		}
		if(document.getElementById(globalConfig.searchLocationDivId).checked){
			queryParams.address = searchString;
			queryParams.radius = document.getElementById(globalConfig.radiusSelectionDivId).value;
			queryParams.callback = MOEMAP.addressBufferCallback;			
			LOCATOR.locate(queryParams);			
		}			
};

/*Advanced version use only*/
globalConfig.advSearch = function(){
	var searchString = "";
	document.getElementById(globalConfig.queryTableDivId).innerHTML = "";
	MOEMAP.clearOverlays();
	var queryParams = {
		searchString: searchString,
		withinExtent: false
	};
	var conditions = [];
	var certificateNumber = document.getElementsByName("searchCriteria.certificateNumber")[0].value.trim();
	if (certificateNumber.length > 0) {
		conditions.push("(CERTIFICATE_NUMBER = '"  + certificateNumber + "')");
	} 
	var ebrRegistryNumber = document.getElementsByName("searchCriteria.ebrRegistryNumber")[0].value.trim();
	if (ebrRegistryNumber.length > 0) {
		conditions.push("(EBR_REFERENCE_NUMBER = '"  + ebrRegistryNumber + "')");
	} 
	var moeReferenceNumber = document.getElementsByName("searchCriteria.moeReferenceNumber")[0].value.trim();
	if (moeReferenceNumber.length > 0) {
		conditions.push("(REFERENCE_NUMBER = '"  + moeReferenceNumber + "')");
	} 
	var approvalDateFromString = document.getElementsByName("searchCriteria.approvalDateFromString")[0].value.trim();
	if (approvalDateFromString.length > 0) {
		conditions.push("(DATE_ >= to_date('"  + approvalDateFromString + "', 'YYYY-MM-DD'))");
	}
	var approvalDateToString = document.getElementsByName("searchCriteria.approvalDateToString")[0].value.trim();
	if (approvalDateToString.length > 0) {
		conditions.push("(DATE_ <= to_date('"  + approvalDateToString + "', 'YYYY-MM-DD'))");
	}
	
	var approvalTypes = [];	
	var ecaApprovalTypes = document.getElementsByName("searchCriteria.ecaApprovalTypes");
	for (var i = 0; i <= 4; i++) {
		if (ecaApprovalTypes[0][i].selected) {
			approvalTypes.push(ecaApprovalTypes[0][i].value.trim());
		}
	}
	var easrApprovalTypes = document.getElementsByName("searchCriteria.easrApprovalTypes");
	for (var i = 0; i <= 5; i++) {
		if (easrApprovalTypes[0][i].selected) {
			approvalTypes.push(easrApprovalTypes[0][i].value.trim());
		}
	}
	if (document.getElementsByName('searchCriteria.reaApprovalTypes')[0].checked == true) {
		approvalTypes.push("Renewable Energy Approval");
	}
	if (approvalTypes.length > 0) { 
		conditions.push("(PROJECT_TYPE IN ('" + approvalTypes.join("','") + "'))");
	}
	
	var approvalStatus = [];
	var ecaApprovalStatus = document.getElementsByName("searchCriteria.ecaApprovalStatus");
	for (var i = 0; i <= 2; i++) {
		if (ecaApprovalStatus[0][i].selected) {
			approvalStatus.push(ecaApprovalStatus[0][i].value.trim());
		}
	}
	var easrApprovalStatus = document.getElementsByName("searchCriteria.easrApprovalStatus");
	for (var i = 0; i <= 2; i++) {
		if (easrApprovalStatus[0][i].selected) {
			approvalStatus.push(easrApprovalStatus[0][i].value.trim());
		}
	}
	if (approvalStatus.length > 0) { 
		conditions.push("(STATUS IN ('" + approvalStatus.join("','") + "'))");
	}

	var businessName = document.getElementsByName("searchCriteria.businessName")[0].value.trim();
	if (businessName.length > 0) {	
		var name = businessName.toUpperCase();
		name = globalConfig.replaceChar(name, "'", "''");
		name = globalConfig.replaceChar(name, "\u2019", "''");
		var fuzzyConditionsGenerator = function(field, str) {
			return "((UPPER(" + field + ") LIKE '% " + str + " %') OR (UPPER(" + field + ") LIKE '" + str + " %') OR (UPPER(" + field + ") LIKE '% " + str + "') OR (UPPER(" + field + ") = '" + str + "') OR (UPPER(" + field + ") LIKE '%" + str + ",%'))";
		};
		conditions.push(fuzzyConditionsGenerator("BUSINESS_NAME", name));
	}
	queryParams.where = conditions.join("AND");	
	if (!globalConfig.accessible) {
		var siteStreetNumber = document.getElementsByName("searchCriteria.siteStreetNumber")[0].value.trim(); 	
		var radius = document.getElementsByName("searchCriteria.radius")[0].value.trim(); 	
		if ((siteStreetNumber.length > 0) && (radius.length > 0)){
			var regIsFloat = /^(-?\d+)(\.\d+)?$/;
			if (regIsFloat.test(radius)) {
				queryParams.address = siteStreetNumber;
				queryParams.radius = parseFloat(radius);
				queryParams.callback = MOEMAP.addressBufferCallback;			
				LOCATOR.locate(queryParams);							
				return;
			} else {
				document.getElementById(globalConfig.informationDivId).innerHTML ="<i>" + globalConfig.radiusMustBeNumber + "</i>";
				return;
			}
		} else if((siteStreetNumber.length > 0) && (radius.length === 0)) {
			document.getElementById(globalConfig.informationDivId).innerHTML ="<i>" + globalConfig.mustSpecifyRadius + "</i>";
			return;
		} else if((siteStreetNumber.length === 0) && (radius.length > 0)) {
			document.getElementById(globalConfig.informationDivId).innerHTML ="<i>" + globalConfig.mustSpecifyAddress + "</i>";
			return;
		}
	}
	queryParams.requireGeocode = false;
	queryParams.address = searchString;
	MOEMAP.queryLayersWithConditionsExtent(queryParams);					
};

function selectAllType(){
 
            if( document.getElementsByName('searchCriteria.approvalTypes')[0].checked == true){
                        document.getElementsByName('searchCriteria.approvalTypes')[1].checked = true;
                        document.getElementsByName('searchCriteria.approvalTypes')[2].checked = true;
                        document.getElementsByName('searchCriteria.approvalTypes')[3].checked = true;
                        document.getElementsByName('searchCriteria.approvalTypes')[4].checked = true;
                        document.getElementsByName('searchCriteria.approvalTypes')[5].checked = true;
                        document.getElementsByName('searchCriteria.approvalTypes')[6].checked = true;
                        
            }else{
                        document.getElementsByName('searchCriteria.approvalTypes')[1].checked = false;
                        document.getElementsByName('searchCriteria.approvalTypes')[2].checked = false;
                        document.getElementsByName('searchCriteria.approvalTypes')[3].checked = false;
                        document.getElementsByName('searchCriteria.approvalTypes')[4].checked = false;
                        document.getElementsByName('searchCriteria.approvalTypes')[5].checked = false;
                        document.getElementsByName('searchCriteria.approvalTypes')[6].checked = false;
            }
}

function disselectAllType(){
 
            if(  document.getElementsByName('searchCriteria.approvalTypes')[1].checked == false ||
                 document.getElementsByName('searchCriteria.approvalTypes')[2].checked == false ||
                 document.getElementsByName('searchCriteria.approvalTypes')[3].checked == false ||
                 document.getElementsByName('searchCriteria.approvalTypes')[4].checked == false ||
                 document.getElementsByName('searchCriteria.approvalTypes')[5].checked == false ||
                 document.getElementsByName('searchCriteria.approvalTypes')[6].checked == false )
             {
                document.getElementsByName('searchCriteria.approvalTypes')[0].checked = false;
            }
}

function selectAllStatus(){
 
            if( document.getElementsByName('searchCriteria.certificateStatus')[0].checked == true){
                        document.getElementsByName('searchCriteria.certificateStatus')[1].checked = true;
                        document.getElementsByName('searchCriteria.certificateStatus')[2].checked = true;
                        document.getElementsByName('searchCriteria.certificateStatus')[3].checked = true;
                        
            }else{
                        document.getElementsByName('searchCriteria.certificateStatus')[1].checked = false;
                        document.getElementsByName('searchCriteria.certificateStatus')[2].checked = false;
                        document.getElementsByName('searchCriteria.certificateStatus')[3].checked = false;
            }
}

function disselectAllStatus(){
 
                         
           if ( document.getElementsByName('searchCriteria.certificateStatus')[1].checked == false ||
                document.getElementsByName('searchCriteria.certificateStatus')[2].checked == false ||
                document.getElementsByName('searchCriteria.certificateStatus')[3].checked == false )
            {
                        document.getElementsByName('searchCriteria.certificateStatus')[0].checked = false;
            }
}


function goHome()
{
		window.location="GoSearch.action?search=basic";
		//document.location.href='GoSearch.action?search=basic';
}

if (globalConfig.advancedVersion) {
  /*$(function() {

  });*/
	globalConfig.Clear = function(){
		document.getElementsByName("searchCriteria.certificateNumber")[0].value = "";
		document.getElementsByName("searchCriteria.ebrRegistryNumber")[0].value = "";
		document.getElementsByName("searchCriteria.moeReferenceNumber")[0].value = "";
		document.getElementsByName("searchCriteria.approvalDateFromString")[0].value = "";
		document.getElementsByName("searchCriteria.approvalDateToString")[0].value = "";
		document.getElementsByName("searchCriteria.businessName")[0].value = "";
		document.getElementsByName("searchCriteria.siteStreetNumber")[0].value = "";
		document.getElementsByName("searchCriteria.radius")[0].value = "";
		$("#chkAllApprovals").attr("checked", false);
		$("#lstAllApprovalsType").find("option").attr("selected", false);
		$("#chkAllStatus").attr("checked", false);
		$("#chkECAStatus").attr("checked", false);
		$("#lstECAStatus").find("option").attr("selected", false);		
		$("#chkEASRStatus").attr("checked", false);
		$("#lstEASRStatus").find("option").attr("selected", false);
		$("#chkAllREAs").attr("checked", false);
		$("#chkAllEASRs").attr("checked", false);
		$("#lstAllEASRsType").find("option").attr("selected", false);
		MOEMAP.clearOverlays();
		if(!globalConfig.accessible) {
			INITIALIZATION.init();
		}
	};
	 $(document).ready(function() {
		// *************************** Datepicker ***************************	 
		$('#txtDatepickerFrom').val('');
		$('#txtDatepickerTo').val('');
		$( "#txtDatepickerFrom" ).datepicker({
			//defaultDate: "-2w",
			changeMonth: true,
			numberOfMonths: 1,
			showOn: "button",
			buttonImage: "calendar.gif",
			buttonImageOnly: true,
			dateFormat: 'yy-mm-dd',			  
			onClose: function( selectedDate ) {
				$( "#txtDatepickerTo" ).datepicker( "option", "minDate", selectedDate );
			}
		});
		$( "#txtDatepickerTo" ).datepicker({
		  //defaultDate: "+1w",
			changeMonth: true,
			numberOfMonths: 1,
			showOn: "button",
			buttonImage: "calendar.gif",
			buttonImageOnly: true,
			dateFormat: 'yy-mm-dd',			  
			onClose: function( selectedDate ) {
				$( "#txtDatepickerFrom" ).datepicker( "option", "maxDate", selectedDate );
			}
		});		
			
			// ******************************** LISTBOX ********************************

		$('#chkAllApprovals').click(function()
		{
			if ( $(this).is(':checked') )
			{
				$(this).parents('div:eq(0)').find('#lstAllApprovalsType option').attr('selected', 'selected');

				//if ( $(this).parents('fieldset:eq(0)').find('#chkAllEASRs').is(':checked') )
				//{
				//	$(this).parents('fieldset:eq(0)').find('#chkAllTypes').attr('checked', 'checked');
				//}
			}
			else	if ( !$(this).is(':checked') )
			{
				//$(this).parents('div:eq(0)').find('#chkAllTypes').attr('checked', this.checked);
				//$(this).parents('fieldset:eq(0)').find('#lstAllApprovalsType option').removeAttr('selected');
				
				$(this).parents('div:eq(0)').find('#lstAllApprovalsType').attr('selectedIndex', '-1').children("option:selected").removeAttr("selected");
			}
			
		});

		//$('#chkAllREAs').click(function()
		//{
		//	if ( $(this).is(':checked') )
		//	{
		//		$(this).parents('div:eq(0)').find('#lstAllREAsType option').attr('selected', 'selected');

				//if ( $(this).parents('fieldset:eq(0)').find('#chkAllApprovals').is(':checked') )
				//{
				//	$(this).parents('fieldset:eq(0)').find('#chkAllTypes').attr('checked', 'checked');
				//}
		//	}
		//	else	if ( !$(this).is(':checked') )
		//	{
				//$(this).parents('fieldset:eq(0)').find('#chkAllTypes').attr('checked', this.checked);
				//$(this).parents('fieldset:eq(0)').find('#lstAllEASRsType option').removeAttr('selected');
		//		$(this).parents('div:eq(0)').find('#lstAllREAsType').attr('selectedIndex', '-1').children("option:selected").removeAttr("selected");
		//	}
		//});

		$('#chkAllEASRs').click(function()
		{
			if ( $(this).is(':checked') )
			{
				$(this).parents('div:eq(0)').find('#lstAllEASRsType option').attr('selected', 'selected');

				//if ( $(this).parents('fieldset:eq(0)').find('#chkAllApprovals').is(':checked') )
				//{
				//	$(this).parents('fieldset:eq(0)').find('#chkAllTypes').attr('checked', 'checked');
				//}
			}
			else	if ( !$(this).is(':checked') )
			{
				//$(this).parents('fieldset:eq(0)').find('#chkAllTypes').attr('checked', this.checked);
				//$(this).parents('fieldset:eq(0)').find('#lstAllEASRsType option').removeAttr('selected');
				$(this).parents('div:eq(0)').find('#lstAllEASRsType').attr('selectedIndex', '-1').children("option:selected").removeAttr("selected");
			}
		});

		$('#chkAllStatus').click(function()
		{
			if ( $(this).is(':checked') )
			{
				$(this).parents('fieldset:eq(0)').find('input:checkbox').attr('checked', this.checked);
				$(this).parents('fieldset:eq(0)').find('select option').attr('selected', 'selected');
			}
			else	if ( !$(this).is(':checked') )
			{
				$(this).parents('fieldset:eq(0)').find('input:checkbox').attr('checked', this.checked);
				//$(this).parents('fieldset:eq(0)').find('select option').removeAttr('selected');
				$(this).parents('fieldset:eq(0)').find('select').attr('selectedIndex', '-1').children("option:selected").removeAttr("selected");
			}
		});

		$('#chkECAStatus').click(function()
		{
			if ( $(this).is(':checked') )
			{
				$(this).parents('fieldset:eq(0)').find('#lstECAStatus option').attr('selected', 'selected');

				if ( $(this).parents('fieldset:eq(0)').find('#chkEASRStatus').is(':checked') )
				{
					$(this).parents('fieldset:eq(0)').find('#chkAllStatus').attr('checked', 'checked');
				}
			}
			else	if ( !$(this).is(':checked') )
			{
				$(this).parents('fieldset:eq(0)').find('#chkAllStatus').attr('checked', this.checked);
				//$(this).parents('fieldset:eq(0)').find('#lstECAStatus option').removeAttr('selected');
				$(this).parents('fieldset:eq(0)').find('#lstECAStatus').attr('selectedIndex', '-1').children("option:selected").removeAttr("selected");
			}
		});


		$('#chkEASRStatus').click(function()
		{
			if ( $(this).is(':checked') )
			{
				$(this).parents('fieldset:eq(0)').find('#lstEASRStatus option').attr('selected', 'selected');

				if ( $(this).parents('fieldset:eq(0)').find('#chkECAStatus').is(':checked') )
				{
					$(this).parents('fieldset:eq(0)').find('#chkAllStatus').attr('checked', 'checked');
				}
			}
			else	if ( !$(this).is(':checked') )
			{
				$(this).parents('fieldset:eq(0)').find('#chkAllStatus').attr('checked', this.checked);
				//$(this).parents('fieldset:eq(0)').find('#lstEASRStatus option').removeAttr('selected');
				$(this).parents('fieldset:eq(0)').find('#lstEASRStatus').attr('selectedIndex', '-1').children("option:selected").removeAttr("selected");
			}
		});



		var selectedAllApprovalsTypeCount = 0;
		var selectedAllEASRsTypeCount = 0;
		var selectedAllREAsTypeCount = 0;

		var existingAllApprovalsType = $('#lstAllApprovalsType option').length;
		var existingAllEASRsType = $('#lstAllEASRsType option').length;
		//var existingAllREAsType = $('#lstAllREAsType option').length;
		
		$('#lstAllApprovalsType').change(function()
		{
			selectedAllApprovalsTypeCount = $('#lstAllApprovalsType :selected').length;

			if ( existingAllApprovalsType == selectedAllApprovalsTypeCount )
			{
				$('#chkAllApprovals').attr('checked', 'checked');
			}
			else if ( existingAllApprovalsType != selectedAllApprovalsTypeCount )
			{
				$('#chkAllApprovals').removeAttr('checked');
			}
			
			//if ( existingAllApprovalsType == selectedAllApprovalsTypeCount && 
			//     existingAllEASRsType == selectedAllEASRsTypeCount )
			//{
			//	$('#chkAllTypes').attr('checked', 'checked');

			//}
			//else if ( existingAllApprovalsType != selectedAllApprovalsTypeCount || 
			//     existingAllEASRsType != selectedAllEASRsTypeCount )
			//{
			//	$('#chkAllTypes').removeAttr('checked');
			//}
		});

		//$('#lstAllREAsType').change(function()
		//{
		//	selectedAllREAsTypeCount = $('#lstAllREAsType :selected').length;

		//	if ( existingAllREAsType == selectedAllREAsTypeCount )
		//	{
		//		$('#chkAllREAs').attr('checked', 'checked');
		//	}
		//	else if ( existingAllREAsType != selectedAllREAsTypeCount )
		//	{
		//		$('#chkAllREAs').removeAttr('checked');
		//	}
			
		//});

		$('#lstAllEASRsType').change(function()
		{
			selectedAllEASRsTypeCount = $('#lstAllEASRsType :selected').length;

			if ( existingAllEASRsType == selectedAllEASRsTypeCount )
			{
				$('#chkAllEASRs').attr('checked', 'checked');
			}
			else if ( existingAllEASRsType != selectedAllEASRsTypeCount )
			{
				$('#chkAllEASRs').removeAttr('checked');
			}

			//if ( existingAllApprovalsType == selectedAllApprovalsTypeCount && 
			//     existingAllEASRsType == selectedAllEASRsTypeCount )
			//{
			//	$('#chkAllTypes').attr('checked', 'checked');

			//}
			//else if ( existingAllApprovalsType != selectedAllApprovalsTypeCount || 
			//     existingAllEASRsType != selectedAllEASRsTypeCount )
			//{
			//	$('#chkAllTypes').removeAttr('checked');
			//}
		});



		var selectedECAStatusCount = 0;
		var selectedEASRStatusCount = 0;

		var existingECAStatus = $('#lstECAStatus option').length;
		var existingEASRStatus = $('#lstEASRStatus option').length;
		
		$('#lstECAStatus').change(function()
		{
			selectedECAStatusCount = $('#lstECAStatus :selected').length;

			if ( existingECAStatus == selectedECAStatusCount )
			{
				$('#chkECAStatus').attr('checked', 'checked');
			}
			else if ( existingECAStatus != selectedECAStatusCount )
			{
				$('#chkECAStatus').removeAttr('checked');
			}
			
			if ( existingECAStatus == selectedECAStatusCount && 
				 existingEASRStatus == selectedEASRStatusCount )
			{
				$('#chkAllStatus').attr('checked', 'checked');

			}
			else if ( existingECAStatus != selectedECAStatusCount || 
				 existingEASRStatus != selectedEASRStatusCount )
			{
				$('#chkAllStatus').removeAttr('checked');
			}
		});

		$('#lstEASRStatus').change(function()
		{
			selectedEASRStatusCount = $('#lstEASRStatus :selected').length;

			if ( existingEASRStatus == selectedEASRStatusCount )
			{
				$('#chkEASRStatus').attr('checked', 'checked');
			}
			else if ( existingEASRStatus != selectedEASRStatusCount )
			{
				$('#chkEASRStatus').removeAttr('checked');
			}
			
			if ( existingECAStatus == selectedECAStatusCount && 
				 existingEASRStatus == selectedEASRStatusCount )
			{
				$('#chkAllStatus').attr('checked', 'checked');

			}
			else if ( existingECAStatus != selectedECAStatusCount || 
				 existingEASRStatus != selectedEASRStatusCount )
			{
				$('#chkAllStatus').removeAttr('checked');
			}
		});
			
	 });
}
 /*Advanced version use only*/
 