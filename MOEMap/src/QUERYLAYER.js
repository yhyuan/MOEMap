/*global document:false */
/*global google:false */
/*global TABS_CALCULATOR:false */
/*global $:false */
/*global TOOLSLEGEND:false */
/*global QUERYLAYER:false */
/*global gmaps:false */

var globalConfig = globalConfig || {};
globalConfig.informationDivId = globalConfig.informationDivId || 'information';
globalConfig.maxQueryReturn = globalConfig.maxQueryReturn || 500;	
globalConfig.resultFound = globalConfig.resultFound || function(validCount, totalCount){
	var queryParams = {totalCount: totalCount};
	globalConfig.resultFoundSimple (queryParams);
	/*var maxQueryReturn = globalConfig.maxQueryReturn;
	var message = "";
	if(totalCount >= maxQueryReturn){
		if(totalCount === validCount){
			message = "More than " + maxQueryReturn + " results found. Only " + maxQueryReturn + " are returned and displayed on the map. Please refine your search.";
			if (globalConfig.language === "FR"){
				message = "French.";
			}
		}else{
			message = "More than " + maxQueryReturn + " results found. Only " + maxQueryReturn + " are returned. Among the returned results, " + validCount + " are displayed on the map, while " + (totalCount - validCount) + " are not displayed because of the lack of latitude and longitude." + " Please refine your search.";
			if (globalConfig.language === "FR"){
				message = "French.";
			}
		}
	}else{	
		if(totalCount === validCount){
			message = validCount + " results are returned and displayed on the map.";
			if (globalConfig.language === "FR"){
				message = "French.";
			}				
		}else{
			message = "Among the " + totalCount + " returned results, " + validCount + " are displayed on the map, while " + (totalCount - validCount) + " are not displayed because of the lack of latitude and longitude.";
			if (globalConfig.language === "FR"){
				message = "French.";
			}				
		}
	}
	document.getElementById(globalConfig.informationDivId).innerHTML ="<i>" + message + "</i>"; */
};
globalConfig.resultFoundSimple = globalConfig.resultFoundSimple || function(queryParams){
	var searchString = queryParams.searchString;
	var totalCount = queryParams.totalCount;
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
	} else if(totalCount == 1){
		message = globalConfig.oneResultFoundLang  + searchString + regionName + ".";
	} else if(totalCount >= globalConfig.maxQueryReturn){
		message = globalConfig.moreThanLang + " " + globalConfig.maxQueryReturn + " " + globalConfig.resultsFoundLang + searchString + regionName + ". " + globalConfig.onlyLang + " " + globalConfig.maxQueryReturn + " " + globalConfig.returnedLang + ". " + globalConfig.seeHelpLang + ".";
	} else {
		message = totalCount + " " + globalConfig.resultsFoundLang + searchString + regionName + ".";
	}		
	document.getElementById(globalConfig.informationDivId).innerHTML ="<i>" + message + "</i>";
};	
globalConfig.noResultFound = globalConfig.noResultFound || function(){
	document.getElementById(globalConfig.informationDivId).innerHTML ="<i>" + globalConfig.noResultFoundMsg + "</i>";	
};
globalConfig.searchInProgress = globalConfig.searchInProgress || function(){
	document.getElementById(globalConfig.informationDivId).innerHTML = "<i>" + globalConfig.searchingLang + "</i>";
};
globalConfig.tooManySearchedLayers = globalConfig.tooManySearchedLayers || function(){
	var msg = "There are more than " + globalConfig.maxElementsLayerIds +" searched layers. Please change the number of elements in layerIds item in the configuration.";
	if (globalConfig.language === "FR"){
		msg = "French.";
	}
	document.getElementById(globalConfig.informationDivId).innerHTML ="<i>" + msg + "</i>";
};	

globalConfig.maxQueryZoomLevel = globalConfig.maxQueryZoomLevel || 17;
globalConfig.maxQueryZoomLevelTWPSearch = globalConfig.maxQueryZoomLevelTWPSearch || 11;  //Zoom Level for Township search
globalConfig.maxQueryZoomLevelTWPLotConSearch = globalConfig.maxQueryZoomLevelTWPLotConSearch || 14;	// Zoom Level for Township with Lot and Concession search
globalConfig.queryTableDivId = globalConfig.queryTableDivId || 'query_table';
globalConfig.maxElementsLayerIds = globalConfig.maxElementsLayerIds || 3;  //maximally contains 3 elements. Not allow to change this. Shared by QUERYLAYER and Language
/*globalConfig.loadCSS = globalConfig.loadCSS || function(filename){
	var fileref=document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", filename);
	document.getElementsByTagName("head")[0].appendChild(fileref);
};*/
if (typeof globalConfig.usejQueryUITable === "undefined"){
	globalConfig.usejQueryUITable = true;   //whether want to use the predefined multiple tab supports. If it is false, it will only support one tab. 
}
/*
globalConfig.loadScript = globalConfig.loadScript || function(url, callback){
	var script = document.createElement('script');
	script.type = "text/javascript";
	if(script.readyState){
		script.onreadystatechange = function(){
			if(script.readyState === "loaded" || script.readyState === "complete"){
				script.onreadystatechange = null;
				callback();
			}
		};
	}else{
		script.onload = function(){
			callback();
		};
	}	
	script.src = url;
	document.getElementsByTagName("head")[0].appendChild(script);
};*/
globalConfig.supportTableDownload = globalConfig.supportTableDownload || true;	
if(globalConfig.usejQueryUITable){	
	/*globalConfig.loadCSS("http://10.60.13.84/Public/PTTW/demo_page.css");	
	globalConfig.loadCSS("http://10.60.13.84/Public/PTTW/demo_table_jui.css");	
	globalConfig.loadCSS("http://10.60.13.84/Public/PTTW/jquery-ui-1.8.4.custom.css");
	globalConfig.loadCSS("http://10.60.13.84/Public/Development/lib/TableTools-2.1.4/media/css/TableTools.css");
	globalConfig.loadScript("http://10.60.13.84/Public/jquery-ui-1.8.17.custom/js/jquery-1.7.1.min.js", function(){
		globalConfig.loadScript("http://10.60.13.84/Public/jquery-ui-1.8.17.custom/js/jquery-ui-1.8.17.custom.min.js", function(){});
		var f = function () {};
		if(globalConfig.supportTableDownload) {
			f = function(){
				globalConfig.loadScript("http://10.60.13.84/Public/Development/lib/TableTools-2.1.4/media/js/ZeroClipboard.js", function(){});	
				globalConfig.loadScript("http://10.60.13.84/Public/Development/lib/TableTools-2.1.4/media/js/TableTools.js", function(){});				
			}
		}
		globalConfig.loadScript("http://10.60.13.84/Public/DataTables-1.9.0/media/js/jquery.dataTables.js", f);
	}); */			
}

QUERYLAYER = (function () {
	var map, calculateMulitpleTabsOneFeature, openInfoWindow, addPolylinesToMap;		
	var gOverlays;
	function calculateBoundClusters(features, bounds){
		var size = features.length;
		var pointClusters = [];
		var validCount = 0;
		for (var x = 0; x < size; x++) {
			var findResult = features[x];
			var attributes = findResult.attributes;
			var gLatLng = findResult.geometry[0].getPosition();
			var isValidLngLat = (Math.abs(gLatLng.lng()) + Math.abs(gLatLng.lat()) > 0.001)? true : false;			
			if (isValidLngLat) {
				validCount = validCount + 1;
				var foundCluster = false;
				for(var i = 0; i < pointClusters.length; i++){
					var center = pointClusters[i].gLatLng;
					var diff = Math.abs(gLatLng.lng() - center.lng()) + Math.abs(gLatLng.lat() - center.lat());
					if(diff < 0.000001){
						(pointClusters[i]).list.push(findResult);
						foundCluster = true;
					}
				}				
				if(!foundCluster){
					var cluster = {gLatLng: gLatLng, list: [findResult]};
					pointClusters.push(cluster);
					bounds.extend(gLatLng);
				}				
			}
		}
		return {
			validCount: validCount,
			bounds: bounds,
			pointClusters: pointClusters
		};
	}	
	function getUniqueFields(tabsTemplate, tableTemplate){
		//console.log (tableTemplate);
		if (typeof(tabsTemplate) === "undefined") {
			var outFields = TABS_CALCULATOR.getRequiredFields([{ label:globalConfig.InformationLang, content:tableTemplate.content}]);
			return outFields.unique();
		} else {
			var outFields1 = TABS_CALCULATOR.getRequiredFields(tabsTemplate);
			if (typeof(tableTemplate)!== "undefined") {
				var outFields2 = TABS_CALCULATOR.getRequiredFields([{ label:globalConfig.InformationLang, content:tableTemplate.content}]);
				return outFields1.concat(outFields2).unique();
			} else {
				return outFields1.unique();
			}
		}
	}

	function addSearchedResultsToMap(features, bounds, tabsTemplate){
		var boundClusters = calculateBoundClusters(features, bounds);
		var newBounds = boundClusters.bounds;
		var pointClusters = boundClusters.pointClusters;				
		for (var x = 0; x < pointClusters.length; x++) {
			var gLatLng = pointClusters[x].gLatLng;
			var container = calculateMulitpleTabsOneFeature(pointClusters[x].list, tabsTemplate);
			var marker = new google.maps.Marker({
				position: gLatLng,
				map: map
			});
			(function (container, marker) {
				google.maps.event.addListener(marker, 'click', function () {
					openInfoWindow(marker.getPosition(), container);
				});
			})(container, marker);
			gOverlays.push(marker);
		}
		return boundClusters;
	}
	function getTableContent(features, tableContent, geometry, queryParams){
		var table = "";
		var size = features.length;
		for (var x = 0; x < size; x++) {
			var findResult = features[x];
			var calculateContents = TABS_CALCULATOR.getContent(findResult.attributes, [{ label:globalConfig.InformationLang, content:tableContent}]);
			var str = calculateContents[0].content;
			var gLatLng = findResult.geometry[0].getPosition();
			if(typeof(geometry)!== "undefined"){
				var resArrays = str.split("</tr>");
				str = resArrays[0] + "<td><center>" + (google.maps.geometry.spherical.computeDistanceBetween(gLatLng, queryParams.gLatLng)/1000).toFixed(2)  + "</center></td></tr>" ;
			}
			table = table + str;
		}
		return table;
	}
	
	function getTableHead(tableHead){		
		var resArrays = tableHead.split("</tr>");
		if(resArrays.length === 2){
			return resArrays[0] + "<th><center>" + globalConfig.distanceLang + "</center></th></tr>" + resArrays[1];
		}
		return "";
	}
	
	function renderTable(table, tableHead, geometry){
		document.getElementById(globalConfig.queryTableDivId).innerHTML = table;
		//var xls = new ActiveXObject("Excel.Application");
		var tableID = globalConfig.tableID;
		if(globalConfig.usejQueryUITable){
			var dataTableOptions = {
				"bJQueryUI": true,
				"sPaginationType": "full_numbers" 
				};
			if (globalConfig.language !== "EN") {
				dataTableOptions["oLanguage"] = globalConfig.dataTableLang;
			}	
			if ((globalConfig.supportTableDownload) && (!$.browser.msie)) {
				dataTableOptions["sDom"] = 'T<"clear">lfrtip';
				dataTableOptions["oTableTools"] = {
						"sSwfPath": "../lib/TableTools-2.1.4/media/swf/copy_csv_xls.swf",
						"aButtons": ["xls"]
					};
			}
			if(typeof(geometry)!== "undefined"){
				var fields = tableHead.split("</th><th>");
				dataTableOptions["aaSorting"] = [[ fields.length-1, "asc" ]];
				//$('#' + tableID).dataTable(dataTableOptions);
				/*$('#' + tableID).dataTable({
					"bJQueryUI": true,
					"sPaginationType": "full_numbers",							
					"aaSorting": [[ fields.length-1, "asc" ]],
					"sDom": 'T<"clear">lfrtip',
					"oTableTools": {
						"sSwfPath": "../lib/TableTools-2.1.4/media/swf/copy_csv_xls_pdf.swf"
					}						
				} );*/
			}/*else{
				$('#' + tableID).dataTable({
					"bJQueryUI": true,
					"sPaginationType": "full_numbers",
					"sDom": 'T<"clear">lfrtip',
					"oTableTools": {
						"sSwfPath": "../lib/TableTools-2.1.4/media/swf/copy_csv_xls_pdf.swf"
					}						
				});
			}*/
			$('#' + tableID).dataTable(dataTableOptions);				
		}
	}
	function setMapBound(newBounds){
		map.fitBounds(newBounds);
		var maxQueryZoomLevel = globalConfig.maxQueryZoomLevel;
		if(globalConfig.TWPSearch){
			maxQueryZoomLevel = globalConfig.maxQueryZoomLevelTWPSearch;
			globalConfig.TWPSearch = false;
		}else if(globalConfig.TWPLotConSearch){
			maxQueryZoomLevel = globalConfig.maxQueryZoomLevelTWPLotConSearch;
			globalConfig.TWPLotConSearch = false;
		}			
		if (map.getZoom() > maxQueryZoomLevel) {
			map.setZoom(maxQueryZoomLevel);
		}
	}		
	function processSearchedResults(features, queryParams, bounds, tableHead, geometry){
		if (typeof(globalConfig.processSearchedResults)!== "undefined") {
			globalConfig.processSearchedResults(features, queryParams, map, openInfoWindow);
			return;
		}
		var tabsTemplate = (typeof(queryParams.tabsTemplate)!== "undefined") ? queryParams.tabsTemplate : globalConfig.tabsTemplate;
		var tableTemplate = (typeof(queryParams.tableTemplate)!== "undefined") ? queryParams.tableTemplate : globalConfig.tableTemplate;
		if((typeof features !== "undefined")&&(features.length>=1)){
			var accessible = globalConfig.accessible;
			var boundClusters = {};
			if(!accessible){
				boundClusters = addSearchedResultsToMap(features, bounds, tabsTemplate);
				var newBounds = boundClusters.bounds;
				if((typeof(geometry)!== "undefined") || (boundClusters.validCount > 0)){
					setMapBound(newBounds);
				}
			}
			var table = tableHead + getTableContent(features, tableTemplate.content, geometry, queryParams) + tableTemplate.tail;
			renderTable(table, tableHead, geometry);
			if(!accessible){
				globalConfig.resultFound(boundClusters.validCount, features.length);
			}else{
				globalConfig.resultFound(features.length, features.length);
			}
		}else{
			if(typeof(geometry)!== "undefined"){
				setMapBound(bounds);
			}
			globalConfig.noResultFound();
		}
	}
	/*
	function mergeFeatures(features, features1){
		if((typeof features !== "undefined")&&(features.length>=1)){
			if((typeof features1 !== "undefined")&&(features1.length>=1)){
				for(var i=0; i<features1.length; i++){
					features.push(features1[i]);
				}
			}
		}else{
			features = features1;
		}
		return features;
	}*/

	function callLocator(queryParams) {
		LOCATOR.locate({
			address: queryParams.address,
			withinExtent: queryParams.withinExtent,
			searchString: queryParams.searchString,
			callback: locatorCallback
		});		
	}
	
	function createQueryParameter(queryParams) {
		var tabsTemplate = (typeof(queryParams.tabsTemplate)!== "undefined") ? queryParams.tabsTemplate : globalConfig.tabsTemplate;
		var tableTemplate = (typeof(queryParams.tableTemplate)!== "undefined") ? queryParams.tableTemplate : globalConfig.tableTemplate;			
		var params = {
			returnGeometry: true,
			outFields: getUniqueFields(tabsTemplate, tableTemplate) //outFields
		};
		if(typeof(queryParams.where)!== "undefined"){
			params.where = queryParams.where;
		}
		
		if (typeof(queryParams.geometry)!== "undefined") {
			params.geometry = queryParams.geometry;
		} else if ((typeof(queryParams.gLatLng)!== "undefined") && (queryParams.radius <= 0)) {
			params.geometry = queryParams.gLatLng;
		}		
		return params;
	}
	
	function querySingleLayer(params, results, queryParams) {
		//console.log("results.currentIndex: " + results.currentIndex);
		if (results.currentIndex < results.layerIds.length) {
			var layer = new gmaps.ags.Layer(results.url + '/' + results.layerIds[results.currentIndex]);
			layer.query(params, function (fset) {
				results[results.currentIndex] = fset.features;
				results.currentIndex ++;
				querySingleLayer(params, results, queryParams);
			});
		} else {
			var features = Array.range(0, results.layerIds.length - 1).reduce(function(previousValue, currentValue) {
				if (typeof results[currentValue] !== "undefined") {
					return previousValue.concat(results[currentValue]);
				} else {
					return previousValue;
				}
			}, []);
			if (features.length == 0) {
				if (queryParams.requireGeocode && (!globalConfig.accessible)){
					callLocator(queryParams);
					return;
				} else {
					queryParams.totalCount = 0;
					globalConfig.resultFoundSimple(queryParams);						
				}				
			}
			//processSearchedResults(features, params, bounds, tableHead, geometry);
			console.log(features);			
		}
	}
	function queryLayer(queryParams){
		gOverlays = queryParams.gOverlays;
		globalConfig.searchInProgress();
		/*If Query condition is missing and requireGeocode is true, it means that the query is for pure geocoding.
		  The locatorCallback will be called to add the marker, update the zoom level and message.  
		*/
		if ((typeof queryParams.where === "undefined") && (queryParams.requireGeocode)) {
			callLocator(queryParams);
			return;
		}
		//var url = (typeof(queryParams.url)!== "undefined") ? queryParams.url : globalConfig.url;		
		/*
		var geometry = queryParams.geometry;		

		var tabsTemplate = (typeof(queryParams.tabsTemplate)!== "undefined") ? queryParams.tabsTemplate : globalConfig.tabsTemplate;
		var tableTemplate = (typeof(queryParams.tableTemplate)!== "undefined") ? queryParams.tableTemplate : globalConfig.tableTemplate;			
		var params = {
			returnGeometry: true,
			outFields: getUniqueFields(tabsTemplate, tableTemplate) //outFields
		};		
		if(typeof(queryParams.where)!== "undefined"){
			params.where = queryParams.where;
		}
		
		
		urlParametes = {};
		if(typeof(queryParams.where)!== "undefined"){
			params.where = queryParams.where;
			urlParametes.field = queryParams.field;
			urlParametes.value = queryParams.value;
			urlParametes.fuzzy = queryParams.fuzzy;			
		}
		var bounds = new google.maps.LatLngBounds();
		//var tableHead = "";
		//if (typeof(tableTemplate)!== "undefined") {
		var	tableHead = tableTemplate.head;			
		//}
		if(typeof(geometry)!== "undefined"){
			params.geometry = geometry;
			bounds = queryParams.geometrybounds;
			//urlParametes.location = queryParams.address;
			//urlParametes.radius = queryParams.radius;
			//if (typeof(tableTemplate)!== "undefined") {
				tableHead = getTableHead(tableTemplate.head);
			//}
		}
		if ((typeof(queryParams.gLatLng)!== "undefined") && (queryParams.radius <= 0)) {
			params.geometry = queryParams.gLatLng;
		}
		//console.log(queryParams);
		//console.log(params);
		//TOOLSLEGEND.updateURLParameter(urlParametes);
		//var layerId = tabsTemplate.layerID;
		var layerIds = globalConfig.layerIds;
		if(layerIds.length > globalConfig.maxElementsLayerIds){
			globalConfig.tooManySearchedLayers();
			return;
		}
		*/
		var results = {
			layerIds: (typeof(queryParams.layerIds)!== "undefined") ? queryParams.layerIds : globalConfig.layerIds, 
			url: (typeof(queryParams.url)!== "undefined") ? queryParams.url : globalConfig.url,
			currentIndex: 0
		};
		var params = createQueryParameter(queryParams);
		querySingleLayer(params, results, queryParams);
		/*
		//var layerId = layerIds[0];
		var layer = new gmaps.ags.Layer(url + '/' + layerIds[0]);
		//console.log(url + '/' + layerIds[0]);
		layer.query(params, function (fset) {
			//console.log(params);			
			if(layerIds.length === 1){
				//console.log(fset.features.length);
				processSearchedResults(fset.features, queryParams, bounds, tableHead, geometry);
			}else if(layerIds.length >= 2){
				var layer1 = new gmaps.ags.Layer(url + '/' + layerIds[1]);
				layer1.query(params, function (fset1) {
					if(layerIds.length === 2){
						var features = mergeFeatures(fset.features, fset1.features);
						processSearchedResults(features, queryParams, bounds, tableHead, geometry);
					}else if(layerIds.length === 3){
						var layer2 = new gmaps.ags.Layer(url + '/' + layerIds[2]);
						layer2.query(params, function (fset2) {
							var features = mergeFeatures(fset.features, fset1.features);
							features = mergeFeatures(features, fset2.features);
							processSearchedResults(features, queryParams, bounds, tableHead, geometry);
						});
					}
				});
			}
		}); */
	}
	
	function queryLayerWithLocationExtent (queryParams) {
		//var withinExtent = queryParams.withinExtent;
		gOverlays = queryParams.gOverlays;
		globalConfig.searchInProgress();
		var url = (typeof(queryParams.url)!== "undefined") ? queryParams.url : globalConfig.url;
		var tabsTemplate = (typeof(queryParams.tabsTemplate)!== "undefined") ? queryParams.tabsTemplate : globalConfig.tabsTemplate;
		var tableTemplate = (typeof(queryParams.tableTemplate)!== "undefined") ? queryParams.tableTemplate : globalConfig.tableTemplate;
		
		if ((typeof queryParams.where === "undefined") && (queryParams.requireGeocode)) {
			LOCATOR.locate({
				address: queryParams.address,
				withinExtent: queryParams.withinExtent,
				searchString: queryParams.searchString,
				callback: locatorCallback
			});
			return;
		}
		var params = {
			returnGeometry: true,				
			outFields: getUniqueFields(tabsTemplate, tableTemplate), //outFields
			where: queryParams.where
		};

		if (queryParams.withinExtent) {
			var currentBounds = map.getBounds();
			var swLatLng = currentBounds.getSouthWest();
			var neLatLng = currentBounds.getNorthEast();
			var seLatLng = new google.maps.LatLng(swLatLng.lat(), neLatLng.lng());
			var nwLatLng = new google.maps.LatLng(neLatLng.lat(), swLatLng.lng());
			params.geometry = new google.maps.Polygon({
				paths: [swLatLng, seLatLng, neLatLng, nwLatLng, swLatLng]
			});
		}
		var layerIds = globalConfig.layerIds;
		var layer = new gmaps.ags.Layer(url + '/' + layerIds[0]);
		//console.log(params);
		layer.query(params, function (fset) {
			var features = fset.features;
			//console.log(features);
			if((typeof features !== "undefined")&&(features.length>=1)){
				if (globalConfig.accessible) {
					document.getElementById(globalConfig.queryTableDivId).innerHTML = tableTemplate.head + Array.range(0, features.length - 1).map(function(x) {
						return TABS_CALCULATOR.getContent(features[x].attributes, [{ label:globalConfig.InformationLang, content:tableTemplate.content}])[0].content;
					}).join('') + tableTemplate.tail;
				} else {
					var bounds = new google.maps.LatLngBounds();
					for (var x = 0; x < features.length; x++) {
						var gLatLng = features[x].geometry[0].getPosition();
						bounds.extend(gLatLng);
						var tabs = TABS_CALCULATOR.getContent(features[x].attributes, tabsTemplate);
						//console.log(tabsTemplate);							
						var container = tabsTemplate[0].head + tabs[0].content + tabsTemplate[0].tail;
						//console.log(tabs);
						
						//var container = calculateMulitpleTabsOneFeature(features, globalConfig.tabsTemplate);
				//console.log(container);
				//openInfoWindow(latlng, container);
				
						var marker = new google.maps.Marker({
							position: gLatLng,
							map: map
						});
						(function (container, marker) {
							google.maps.event.addListener(marker, 'click', function () {
								openInfoWindow(marker.getPosition(), container);
							});
						})(container, marker);
						gOverlays.push(marker);
					}
					setMapBound(bounds);
				}
				queryParams.totalCount = features.length;
				globalConfig.resultFoundSimple(queryParams);
			} else {
				if (queryParams.requireGeocode && (!globalConfig.accessible)){
					LOCATOR.locate({
						address: queryParams.address,
						withinExtent: queryParams.withinExtent,
						searchString: queryParams.searchString,
						callback: locatorCallback
					});
				} else {
					queryParams.totalCount = 0;
					globalConfig.resultFoundSimple(queryParams);						
				}
			}
		});
	}
	function locatorCallback (queryParams) {
		addPolylinesToMap(queryParams.polylines);  //If it is a Township search, it is needed to add the boundary of township. 
		var gLatLng = queryParams.gLatLng;
		if ((queryParams.withinExtent) && (!map.getBounds().contains(gLatLng))){
			//document.getElementById(globalConfig.informationDivId).innerHTML = "No result found for <strong>" + queryParams.address + "</strong> in current map extent.";
			queryParams.totalCount = 0;
			globalConfig.resultFoundSimple(queryParams);
		} else {
			var address = queryParams.address;  //returnedAddress
			if (queryParams.hasOwnProperty('returnedAddress')) {
				globalConfig.returnedAddress = queryParams.returnedAddress;			
			} else {
				globalConfig.returnedAddress = queryParams.address;
			}
			address = queryParams.returnedAddress;
			var marker = new google.maps.Marker({
				position: gLatLng,
				icon: globalConfig.searchedLocationIcon,
				map: map
			});
			(function (address, marker) {
				google.maps.event.addListener(marker, 'click', function () {
					openInfoWindow(marker.getPosition(), address);
				});
			})(address, marker);
			gOverlays.push(marker);
			
			map.setCenter(gLatLng);
			if (typeof queryParams.zoomlevel !== "undefined") {
				//if (map.getZoom() <= queryParams.zoomlevel) {
				map.setZoom(queryParams.zoomlevel);
				//}					
			} else {
				if (map.getZoom() <= globalConfig.maxQueryZoomLevel) {
					map.setZoom(globalConfig.maxQueryZoomLevel);
				}
			}
			queryParams.totalCount = 1;
			globalConfig.resultFoundSimple(queryParams);
		}
		//identifyPolygonMapService (gLatLng, 0);	
	}
	function init(currentMap, currentcalCulateMulitpleTabsOneFeature, currentOpenInfoWindow, currentaddPolylinesToMap){
		map = currentMap;
		calculateMulitpleTabsOneFeature = currentcalCulateMulitpleTabsOneFeature;
		openInfoWindow = currentOpenInfoWindow;
		addPolylinesToMap = currentaddPolylinesToMap;
	}
	var module = {
		init: init,
		queryLayer: queryLayer//,
		//queryLayerWithLocationExtent: queryLayerWithLocationExtent
	};
	return module;
})();	
