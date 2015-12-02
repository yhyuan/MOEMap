/*global document:false */
/*global google:false */
/*global gmaps:false */
/*global MOEMAP:false */
/*global INITIALIZATION:false */
	var globalConfig = globalConfig || {};
	globalConfig.testDivExist = globalConfig.testDivExist || function (divId) {
		return (!!document.getElementById(divId))
	};
	globalConfig.disclaimerDivId = globalConfig.disclaimerDivId || 'disclaimer';
	//if (typeof globalConfig.displayDisclaimer === "undefined"){globalConfig.displayDisclaimer = false;}
	globalConfig.coordinatesDivId = globalConfig.coordinatesDivId || 'coordinates';    //The div id for coordinates status.
	globalConfig.updateCoordinates = globalConfig.updateCoordinates || function(lat, lng){
		var utm = globalConfig.convertLatLngtoUTM(lat, lng);
		//document.getElementById(globalConfig.coordinatesDivId).innerHTML = "Latitude:" + lat.toFixed(6) + ", Longitude:" + lng.toFixed(6) + " (" + globalConfig.UTM_ZoneLang + ":" + utm.Zone + ", " + globalConfig.EastingLang + ":" + utm.Easting + ", " + globalConfig.NorthingLang +":" + utm.Northing + ") <br><br><div align=\"left\">" + globalConfig.designLang + "</div><br>";
		document.getElementById(globalConfig.coordinatesDivId).innerHTML = "Latitude:" + lat.toFixed(5) + ", Longitude:" + lng.toFixed(5) + " (" + globalConfig.UTM_ZoneLang + ":" + utm.Zone + ", " + globalConfig.EastingLang + ":" + utm.Easting + ", " + globalConfig.NorthingLang +":" + utm.Northing + ")<br>";
	};
	//globalConfig.defaultCoordinateLang = globalConfig.defaultCoordinateLang || "Latitude : 48.950861, Longitude : -83.486242 (" + globalConfig.UTM_ZoneLang + ":17, " + globalConfig.EastingLang + ":317978.96, " + globalConfig.NorthingLang + ":5424971.70)  <br><br><div align=\"left\">" + globalConfig.designLang + "</div><br>";		
	
	if (typeof globalConfig.useSystemDefinedInit === "undefined"){globalConfig.useSystemDefinedInit = true;}
	if (typeof globalConfig.allowMultipleIdentifyResult === "undefined"){globalConfig.allowMultipleIdentifyResult = true;}
	if (typeof globalConfig.displayTotalIdentifyCount === "undefined"){globalConfig.displayTotalIdentifyCount = true;}
	if (typeof globalConfig.isCoordinatesVisible === "undefined"){globalConfig.isCoordinatesVisible = true;}	
	
	globalConfig.orgLatitude = globalConfig.orgLatitude || 49.764775;
	globalConfig.orgLongitude = globalConfig.orgLongitude || -85.323214;
	globalConfig.orgzoomLevel = globalConfig.orgzoomLevel || 5;
	globalConfig.lotConcessionZoomLevel = globalConfig.lotConcessionZoomLevel || 14;
	globalConfig.twpZoomLevel = globalConfig.twpZoomLevel || 11;
	globalConfig.minMapScale = globalConfig.minMapScale || 5;
	globalConfig.maxMapScale = globalConfig.maxMapScale || 21;
	globalConfig.tableID = globalConfig.tableID || "myTable";
	globalConfig.tableWidth = globalConfig.tableWidth || 650; //The total width of the table below the map
	if(!globalConfig.accessible){
		globalConfig.defaultMapTypeId = globalConfig.defaultMapTypeId || google.maps.MapTypeId.ROADMAP;
	}
	globalConfig.accessibleTableClassName = globalConfig.accessibleTableClassName || "fishTable";	
	globalConfig.generalTableClassName = globalConfig.generalTableClassName || "tablesorter";	
	globalConfig.accessible = globalConfig.accessible || false;
	if(globalConfig.accessible){
		globalConfig.tableClassName = globalConfig.accessibleTableClassName;
	} else {
		globalConfig.tableClassName = globalConfig.generalTableClassName;	
	}
	globalConfig.mapCanvasDivId = globalConfig.mapCanvasDivId || "map_canvas";
	globalConfig.opacity = globalConfig.opacity || 1;   //define the layer's opacity.
	globalConfig.locationTypeSelectionDivId = globalConfig.locationTypeSelectionDivId || "locationType";
	globalConfig.radiusSelectionDivId = globalConfig.radiusSelectionDivId || "lstRadius";
	globalConfig.businessTypeParameter = globalConfig.businessTypeParameter || "Business";
	globalConfig.searchBusinessDivId = globalConfig.searchBusinessDivId || "searchBusiness";
	globalConfig.searchLocationDivId = globalConfig.searchLocationDivId || "searchLocation";
	globalConfig.searchInputBoxDivId = globalConfig.searchInputBoxDivId || "map_query";
	globalConfig.currentMapExtentDivId = globalConfig.currentMapExtentDivId || "currentMapExtent";
	globalConfig.preInitialize = globalConfig.preInitialize || function(){
	};
	globalConfig.postInitialize = globalConfig.postInitialize || function(map){
		//console.log(map);
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
	};
	//if this function is defined, the program will call this rather the predefine initialization method. use it with caution.
	/*selfDefinedInitialize: function(){}*/

	globalConfig.searchChange = globalConfig.searchChange || function(type){
		if(type === globalConfig.businessTypeParameter){
			document.getElementById(globalConfig.radiusSelectionDivId).disabled = true;
		}else{
			document.getElementById(globalConfig.radiusSelectionDivId).disabled = false;
		}
	};
	globalConfig.search = globalConfig.search || function(){
			var name = document.getElementById(globalConfig.searchInputBoxDivId).value.trim();
			if(name.length === 0){
				return;
			}
			document.getElementById(globalConfig.queryTableDivId).innerHTML = "";
			MOEMAP.clearOverlays();
			if(document.getElementById(globalConfig.searchBusinessDivId).checked){
				name = name.toUpperCase();
				name = globalConfig.replaceChar(name, "'", "''");
				name = globalConfig.replaceChar(name, globalConfig.u2019Lang, "''");
				var attributeSearchItems = globalConfig.attributeSearchItems;
				MOEMAP.queryLayerWithFuzzyMatch(attributeSearchItems[0].field, name);
				return;
			}
			if(document.getElementById(globalConfig.searchLocationDivId).checked){
				var radius = document.getElementById(globalConfig.radiusSelectionDivId).value;
				MOEMAP.queryLayerWithLocationRadius(name, radius);
			}			
	};
	globalConfig.extraImageService = globalConfig.extraImageService || {
		id: "arcgis",
		name: "ESRI",
		url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer',
		visible: true
	};
	globalConfig.entsub = globalConfig.entsub || function(event){
		if (event && event.which === 13){
			globalConfig.search();
		}else{
			return true;
		}
	};
	globalConfig.searchTheMapDivId = globalConfig.searchTheMapDivId || 'searchTheMap';
	globalConfig.searchHelpDivId = globalConfig.searchHelpDivId || 'searchHelp';
	globalConfig.informationDivId = globalConfig.informationDivId || 'information';
	globalConfig.createTablesInfoWindows = globalConfig.createTablesInfoWindows || function(tabsTableTemplate) {
		var mapfunction = function(tab) {
			return {label: tab.label,
				head: "<table class='tabtable'><tr><th>" + tab.content.map(function(b) {return b.name;}).join("</th><th>") + "</th></tr>",
				content: "<tr><td>" + tab.content.map(function(b) {return b.value;}).join("</td><td>") + "</td></tr>",
				tail: "</table>"};
		};
		return tabsTableTemplate.map(mapfunction)
	};

	globalConfig.createTableBelowMap = globalConfig.createTableBelowMap || function(tableSimpleTemplate) {
		return {
			head: tableSimpleTemplate.title + "<table id=\"" + globalConfig.tableID + "\" class=\"" + globalConfig.tableClassName + "\" width=\"" + globalConfig.tableWidth + "\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\"><thead><tr><th><center>" + tableSimpleTemplate.content.map(function(b) {return b.name;}).join("</center></th><th><center>") + "</center></th></tr></thead><tbody>",
			content: "<tr><td>" + tableSimpleTemplate.content.map(function(b) {return b.value;}).join('</td><td>') + "</td></tr>",
			tail: "</tbody></table>"
		};
	};
	globalConfig.noCoordinatesTableID = globalConfig.noCoordinatesTableID || "noCoordinatesTable";
	globalConfig.createNoCoordinatesTableBelowMap = globalConfig.createNoCoordinatesTableBelowMap || function(tableSimpleTemplate) {
		//console.log(tableSimpleTemplate);
		return {
			head: globalConfig.noCoordinatesTableTitleLang + "<table id=\"" + globalConfig.noCoordinatesTableID + "\" class=\"" + globalConfig.tableClassName + "\" width=\"" + globalConfig.tableWidth + "\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\"><thead><tr><th><center>" + tableSimpleTemplate.content.map(function(b) {return b.name;}).join("</center></th><th><center>") + "</center></th></tr></thead><tbody>",
			content: "<tr><td>" + tableSimpleTemplate.content.map(function(b) {return b.value;}).join('</td><td>') + "</td></tr>",
			tail: "</tbody></table>"
		};
	};	
/*	
	globalConfig.searchControlHTMLGenerator = globalConfig.searchControlHTMLGenerator || function () {
		return '<table width="100%" cellpadding="5" cellspacing="0" border="0" style="margin-bottom:15px;" summary="' 
				+ globalConfig.SearchInteractiveMapFormLang  + '">' +
				'<caption style="text-align:left;">' + globalConfig.SearchInteractiveMapLang  + '</caption>' + 
				'<tr>' + 
					'<th scope="col"></th>' + 
					'<th scope="col"></th>' + 
				'</tr>' + 
				'<tr>' + 
					'<td valign="top" width="'+ globalConfig.InputBoxSizeLang  + '">' + 
						'<input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="' 
							+ globalConfig.TermLang  + '"></input>' + globalConfig.nbspLang + '<input type="submit" onclick="globalConfig.search()" value="' + 
							globalConfig.SearchLang  + '" title="' + globalConfig.SearchLang  + '"></input>' + 
					'</td>' + 
					'<td valign="top">'+ 	
						'<input id="currentMapExtent" type="checkbox" name="currentExtent" title="' + globalConfig.CurrentMapDisplayLang  + '"><span title="' + globalConfig.CurrentMapDisplayTitleLang  + '" class="tooltip">' + globalConfig.CurrentMapDisplayLang  + '</span>' + 
					'</td>' + 
				'</tr>' + 
				'<tr>' + 
					'<td colspan="2">' + 
						'<div id="information" style="margin-top:10px;">' + 
							globalConfig.searchHelpTxt + 
						'</div>' + 
					'</td>' + 
				'</tr>' + 
			'</table>';
	};
*/
	globalConfig.chooseLang = globalConfig.chooseLang || function (en, fr) {return (globalConfig.language === "EN") ? en : fr;};
	if ((globalConfig.searchableFieldsList) && (!globalConfig.searchHelpTxt)) {
		globalConfig.searchHelpTxt = globalConfig.youMaySearchByLang;
		for(var i=0; i<globalConfig.searchableFieldsList.length - 1; i++) {
			globalConfig.searchHelpTxt = globalConfig.searchHelpTxt + "<strong>" + globalConfig.chooseLang(globalConfig.searchableFieldsList[i].en, globalConfig.searchableFieldsList[i].fr) + "</strong>, ";
		}
		globalConfig.searchHelpTxt = globalConfig.searchHelpTxt + "<strong>" + globalConfig.chooseLang(globalConfig.searchableFieldsList[i].en, globalConfig.searchableFieldsList[i].fr) + "</strong> " + globalConfig.seeHelpForAdvancedOptionsLang;
	}
	globalConfig.searchControlHTMLGenerator = globalConfig.searchControlHTMLGenerator || function () {
		//return //'<h4>' + globalConfig.SearchInteractiveMapLang  + '</h4>' + 
			//'<div id="information">' + globalConfig.searchHelpTxt + '</div>' + 
			//'<input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="' + globalConfig.TermLang  + '">' + globalConfig.nbspLang + '<input type="submit" onclick="globalConfig.search()" value="' + globalConfig.SearchLang  + '" title="' + globalConfig.SearchLang  + '"><br/>' + 
			//'<input id="currentMapExtent" type="checkbox" name="currentExtent" title="' + globalConfig.CurrentMapDisplayLang  + '"> <label for="currentExtent" class=\'option\'>' + globalConfig.CurrentMapDisplayLang  + '</label>';			
		/*return '<label class="element-invisible" for="map_query">Search the map</label> \
			<input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="Search term" /> \
			<label class="element-invisible" for="search_submit">Search</label> \
			<input type="submit" onclick="globalConfig.search()" id="search_submit" value="Search" title="Search" /> \
			<br/> \
			<input id="currentMapExtent" type="checkbox" name="currentExtent" title="Current Map Display"> \
			<label for="currentExtent" class=\'option\'>' + globalConfig.CurrentMapDisplayLang + '</label>';*/
		return '<div id="searchTheMap"></div><div id="searchHelp"></div><br>\
			<label class="element-invisible" for="map_query">' + globalConfig.chooseLang('Search the map', 'Recherche carte interactive') + '</label>\
			<input id="map_query" type="text" title="' + globalConfig.chooseLang('Search term', 'Terme de recherche') + '" maxlength="100" size="50" onkeypress="return globalConfig.entsub(event)"></input>\
			<label class="element-invisible" for="search_submit">' + globalConfig.chooseLang('Search', 'Recherche') + '</label>\
			<input id="search_submit" type="submit" title="' + globalConfig.chooseLang('Search', 'Recherche') + '" onclick="globalConfig.search()" value="' + globalConfig.chooseLang('Search', 'Recherche') + '"></input>\
			<br/>\
			<input id="currentMapExtent" type="checkbox" name="currentExtent" title="' + globalConfig.chooseLang('Current Map Display', "Étendue de la carte courante") + '" /> <label for="currentExtent" class=\'option\'>' + globalConfig.chooseLang('Search current map display only', "\u00c9tendue de la carte courante") + '</label>\
			<div id="information"></div>';
	};
	
	if(!globalConfig.hasOwnProperty('searchControlHTML')) {
		//If the configuration file does not contain searchControlHTML, use the default generator to create it. 
		globalConfig.searchControlHTML = globalConfig.searchControlHTMLGenerator();
	}
	// 
	/*Map Initialization module provides the init method to be called to initialize the Google Maps and other setting. */
	INITIALIZATION = (function () {
		/*
			Use the tabsTableTemplate to generate the tabsTemplate. This is used to generate the table in the pop-up window. 
			Use tableSimpleTemplate to generate the tableTemplate. This is used to generate the table in the bottom of the Google Maps. 
		*/
		function setupTableTemplate(){
			if((!globalConfig.hasOwnProperty('queryLayerList')) && globalConfig.hasOwnProperty('identifyMultiplePolygonLayersServicesTemplate')) {
				globalConfig.queryLayerList = globalConfig.identifyMultiplePolygonLayersServicesTemplate.layerList;
				if (globalConfig.identifyMultiplePolygonLayersServicesTemplate.hasOwnProperty('merge')) {
					globalConfig.mergeFunction = globalConfig.identifyMultiplePolygonLayersServicesTemplate.merge;
				}
			} else {
				var getRequiredFields = function (tabs) {
					var getRequiredFieldsFromOneString = function (infoWindowString, fields){
						var start = infoWindowString.indexOf("{");
						var end = infoWindowString.indexOf("}");
						if ((start >= 0) && (end >= 0)) {
							var str1 = infoWindowString.substring(0, start);
							var str2 = infoWindowString.substring(start + 1, end);
							var str3 = infoWindowString.substring(end + 1);
							var funStart = str2.indexOf("(");
							var funEnd = str2.indexOf(")");
							if ((funStart >= 0) && (funEnd >= 0)) { //function
								var parameters = str2.substring(funStart + 1, funEnd);
								var paraArray = parameters.split(",");
								for (var j = 0; j < paraArray.length; j++) {
									fields.push((paraArray[j]).trim());
								}
							}else{
								fields.push(str2.trim());
							}
							infoWindowString = getRequiredFieldsFromOneString(str3, fields);
						}
						return fields;
					};
					var fields = [];
					for (var i = 0; i < tabs.length; i++) {
						var tab = tabs[i];
						fields = getRequiredFieldsFromOneString(tab.label, fields);
						fields = getRequiredFieldsFromOneString(tab.content, fields);
					}
					return fields.unique();
				};			
				for (var i=0; i<globalConfig.queryLayerList.length; i++) {
					var layerSetting = globalConfig.queryLayerList[i];	
					if ((!layerSetting.hasOwnProperty('tabsTemplate')) && layerSetting.hasOwnProperty('tabsTableTemplate')) {
						//console.log("should not");
						layerSetting.tabsTemplate = globalConfig.createTablesInfoWindows(layerSetting.tabsTableTemplate);		
					}
					var outFields = [];
					if(layerSetting.hasOwnProperty('tabsTemplate')) {
						//console.log(layerSetting.tabsTemplate);
						outFields = getRequiredFields(layerSetting.tabsTemplate);
					}
					if ((!layerSetting.hasOwnProperty('tableTemplate')) && layerSetting.hasOwnProperty('tableSimpleTemplate')) {
						layerSetting.tableTemplate = globalConfig.createTableBelowMap(layerSetting.tableSimpleTemplate);
						//console.log(layerSetting.tableTemplate);
						layerSetting.noCoordinatesTableTemplate = globalConfig.createNoCoordinatesTableBelowMap(layerSetting.tableSimpleTemplate);
						//console.log(layerSetting.noCoordinatesTableTemplate);
					}
					if(layerSetting.hasOwnProperty('tableTemplate')) {
						var outFields2 = getRequiredFields([{ label:globalConfig.InformationLang, content:layerSetting.tableTemplate.content}]); 
						if(outFields.length === 0) {
							outFields = outFields2.unique();
						} else {
							outFields = outFields.concat(outFields2).unique();
						}
					}
					globalConfig.queryLayerList[i].outFields = outFields;
				}
			}			
			/*
				If the tabsTemplate is not defined in the configuration, use the tabsTableTemplate item in the configuration to generate it.
				The tabsTemplate is an object array. Every element in this array is related to one tab in the popup window. Every element 
				has the following four properties: label, head, content, and tail. The label is the tab name. The head and the tail are only 
				repeat only once even if there are multiple results. The head is located in the beginning and the tail is located in the ending. 
				The content part will be repeated several times. The number of times is equal to the total number of records. 
				
				The tabsTableTemplate is an object array. Each element in this array contains two properties: label and content. The label is the 
				tab name and the content is an object array. The object array of content contains the objects with two properties: name and value. 
				The name property contains the field name in the table in the tab, while the value property contains the formule to calculate the value
				which will be displayed in the table. 
			
			if(!accessible){
				if(typeof(globalConfig.tabsTemplate) === "undefined"){
					var tabsTableTemplate = globalConfig.tabsTableTemplate;
					if(typeof(tabsTableTemplate) !== "undefined"){
						globalConfig.tabsTemplate = tabsTableTemplate.map(function(a) {
								return {label: a.label,
									head: "<table><tr><th>" + a.content.map(function(b) {return b.name;}).join("</th><th>") + "</th></tr>",
									content: "<tr><td>" + a.content.map(function(b) {return b.value;}).join("</td><td>") + "</td></tr>",
									tail: "</table>"};
						});
					}
				}
			}
			/*
				If the tableTemplate is not defined in the configuration, use the tableSimpleTemplate item in the configuration to generate it.
				The tableTemplate is an object with the following three properties: head, content, and tail. The head is the table head and the tail 
				is the table tail. Both of them only repeat once. The content part will be repeated several times. The number of times is equal to 
				the total number of records. 
				
				The tableSimpleTemplate is an object with two properties: title and content. The title is the content which will be displayed above the table
				and the content is an object array. The object array of content contains the objects with two properties: name and value. 
				The name property contains the field name in the table, while the value property contains the formule to calculate the value
				which will be displayed in the table. 
			
			if(typeof(globalConfig.tableTemplate) === "undefined"){			
				var tableSimpleTemplate = globalConfig.tableSimpleTemplate;
				if(typeof(tableSimpleTemplate) !== "undefined"){
					globalConfig.tableTemplate = {
						head: tableSimpleTemplate.title + "<table id=\"" + globalConfig.tableID + "\" class=\"" + globalConfig.tableClassName + "\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\"><thead><tr><th><center>" + tableSimpleTemplate.content.map(function(b) {return b.name;}).join("</center></th><th><center>") + "</center></th></tr></thead><tbody>",
						content: "<tr><td>" + tableSimpleTemplate.content.map(function(b) {return b.value;}).join('</td><td>') + "</td></tr>",
						tail: "</tbody></table>"
					};
				}
			}*/
		}
		
		/*
			Initialize the Google Maps and map services. 
		*/
		
		function init() {
		
			var map;
			if(typeof(globalConfig.preInitialize) !== "undefined"){
				globalConfig.preInitialize();
			}			
			if(typeof(globalConfig.selfDefinedInitialize)!== "undefined"){
				globalConfig.selfDefinedInitialize();
			}else{		
				setupTableTemplate();			
				if(!globalConfig.accessible){
					//var mapOptions = getInitialMapOptions();
					var mapOptions = {
						zoom: globalConfig.orgzoomLevel,
						center: new google.maps.LatLng(globalConfig.orgLatitude, globalConfig.orgLongitude),
						scaleControl: true,
						streetViewControl: true,
						mapTypeId: globalConfig.defaultMapTypeId
					};

					var extraImageService = globalConfig.extraImageService;
					if(extraImageService.visible){
						mapOptions.mapTypeControlOptions = {
							mapTypeIds: [extraImageService.id, google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE ,google.maps.MapTypeId.HYBRID ,google.maps.MapTypeId.TERRAIN ]
						};
					}				
					map = new google.maps.Map(document.getElementById(globalConfig.mapCanvasDivId), mapOptions);
					//setup extraImageService if there is one
					if(extraImageService.visible){
						var agsType = new gmaps.ags.MapType(extraImageService.url, {
							name: extraImageService.name
						});
						map.mapTypes.set(extraImageService.id, agsType);
					}
					//Create map service
					if(typeof(globalConfig.url)!== "undefined"){
						var mapService = new gmaps.ags.MapService(globalConfig.url);
						var agsLayer = new gmaps.ags.MapOverlay(mapService, {opacity: globalConfig.opacity});	
						agsLayer.setMap(map);
					}
					if(typeof(globalConfig.tileLayerService)!== "undefined"){
						var agsType = new gmaps.ags.MapType(globalConfig.tileLayerService.url,{name:globalConfig.tileLayerService.name, opacity:globalConfig.tileLayerService.opacity});
						map.overlayMapTypes.insertAt(0, agsType);					
					}
					MOEMAP.init(map);
					TOOLSLEGEND.init(map);
					globalConfig.updateCoordinates (globalConfig.orgLatitude, globalConfig.orgLongitude);
					//document.getElementById(globalConfig.coordinatesDivId).innerHTML = globalConfig.defaultCoordinateLang;
				}
				if (typeof globalConfig.searchControlHTML !== "undefined") {
					globalConfig.searchControlDivId = globalConfig.searchControlDivId || 'searchControl'; 
					if (globalConfig.testDivExist(globalConfig.searchControlDivId)) {
						document.getElementById(globalConfig.searchControlDivId).innerHTML = globalConfig.searchControlHTML;
					}
				}
				
				if (typeof globalConfig.otherInfoHTML !== "undefined") {
					globalConfig.otherInfoDivId = globalConfig.otherInfoDivId || 'otherInfo'; 
					if (globalConfig.testDivExist(globalConfig.otherInfoDivId)) {
						document.getElementById(globalConfig.otherInfoDivId).innerHTML = globalConfig.otherInfoHTML;
					}
				}
				if (typeof globalConfig.applicationTitle !== "undefined")  {
					globalConfig.applicationTitleDivId = globalConfig.applicationTitleDivId || 'applicationTitle'; 
					if (globalConfig.testDivExist(globalConfig.applicationTitleDivId)) {
						document.getElementById(globalConfig.applicationTitleDivId).innerHTML = globalConfig.applicationTitle;
					}
				}										
				/*if ((typeof(globalConfig.searchHelpTxt)!== "undefined") && globalConfig.testDivExist(globalConfig.informationDivId)){
					document.getElementById(globalConfig.informationDivId).innerHTML = globalConfig.searchHelpTxt;
				}*/
				if (globalConfig.testDivExist(globalConfig.searchTheMapDivId)) {
					document.getElementById(globalConfig.searchTheMapDivId).innerHTML = "<h2>" + globalConfig.SearchInteractiveMapLang + "</h2>";
				}
				if (globalConfig.testDivExist(globalConfig.searchHelpDivId)) {
					document.getElementById(globalConfig.searchHelpDivId).innerHTML = globalConfig.searchHelpTxt;
				}				
				if ((typeof(globalConfig.disclaimerLang)!== "undefined") && globalConfig.displayDisclaimer && globalConfig.testDivExist(globalConfig.disclaimerDivId)){
					document.getElementById(globalConfig.disclaimerDivId).innerHTML = globalConfig.disclaimerLang;
				}
			}
			if(typeof(globalConfig.postInitialize)!== "undefined"){
				globalConfig.postInitialize(map);
			}
		}
		
		var module = {
			init: init
		};
		return module;
	})();
	if (globalConfig.useSystemDefinedInit){
		window.onload = INITIALIZATION.init;
	}
	