/*global document:false */
/*global goog:false */
/*global MOEMAP:false */
/*global google:false */
/*global INITIALIZATION:false */
/*global TOOLSLEGEND:false */
/*global gmaps:false */
/*global TABS_CALCULATOR:false */
/*global LOCATOR:false */
/*global window:false */
 
var globalConfig = globalConfig || {};
globalConfig.drawingCircleMessage = globalConfig.drawingCircleMessage || function(lat, lng, radius){
	document.getElementById(globalConfig.informationDivId).innerHTML = globalConfig.searchCenterLang + " (latitude:" + lat.toFixed(6) + ", longitude:" + lng.toFixed(6) + "), " + globalConfig.searchRadiusLang + " (" + radius.toFixed(2) + " " + globalConfig.searchKMLang + ")";
};
globalConfig.totalFeatureReturned = globalConfig.totalFeatureReturned || function(count){
	return globalConfig.totalFeatureReturnedLang + ": <strong>" + count + "</strong>";
};
globalConfig.totalFeatureReturnedOnlyOneDisplayed = globalConfig.totalFeatureReturnedOnlyOneDisplayed || function(count){
	return globalConfig.totalFeatureReturnedLang + ": <strong>" + count + "</strong>" + globalConfig.only1DisplayedLang;
};
globalConfig.maxQueryReturn = globalConfig.maxQueryReturn || 500;	
globalConfig.resultFound = globalConfig.resultFound || function(validCount, totalCount){
	var queryParams = {totalCount: totalCount};
	globalConfig.resultFoundSimple (queryParams);
};
globalConfig.resultFoundSimple = globalConfig.resultFoundSimple || function(queryParams){
	var searchString = queryParams.searchString;
	var totalCount = queryParams.totalCount;
	var regionName = "";
	if (typeof(queryParams.withinExtent) !== "undefined") {
		regionName = " " + (queryParams.withinExtent ? globalConfig.inCurrentMapExtentLang : globalConfig.inGobalRegionLang);
	}
	var searchString = " ";
	if (typeof(queryParams.searchString) !== "undefined") {
		searchString = " " + globalConfig.forLang + " <strong>"  + queryParams.searchString + "</strong> ";
	}
	
	var message = "";
	if (queryParams.hasOwnProperty("invalidCount") && (queryParams.invalidCount > 0)) {
		if(totalCount === 0){
			message = globalConfig.yourSearchLang + searchString + globalConfig.returnedNoResultLang + regionName + ". " + globalConfig.pleaseRefineSearchLang + ".";
		} else if(totalCount === 1){
			message = globalConfig.oneResultFoundLang  + searchString + regionName + "." + "This result does not have valid coordinates.";
		} else if(totalCount >= globalConfig.maxQueryReturn){
			message = globalConfig.moreThanLang + " " + globalConfig.maxQueryReturn + " " + globalConfig.resultsFoundLang + searchString + regionName + ". " + globalConfig.onlyLang + " " + globalConfig.maxQueryReturn + " " + globalConfig.returnedLang + ". " + globalConfig.seeHelpLang + "." + "Among returned results, " + queryParams.invalidCount + " results do not have valid coordinates.";
		} else {
			message = totalCount + " " + globalConfig.resultsFoundLang + searchString + regionName + "." + "Among returned results, " + queryParams.invalidCount + " results do not have valid coordinates.";
		}	
	} else {
		if(totalCount === 0){
			message = globalConfig.yourSearchLang + searchString + globalConfig.returnedNoResultLang + regionName + ". " + globalConfig.pleaseRefineSearchLang + ".";
		} else if(totalCount === 1){
			message = globalConfig.oneResultFoundLang  + searchString + regionName + ".";
		} else if(totalCount >= globalConfig.maxQueryReturn){
			message = globalConfig.moreThanLang + " " + globalConfig.maxQueryReturn + " " + globalConfig.resultsFoundLang + searchString + regionName + ". " + globalConfig.onlyLang + " " + globalConfig.maxQueryReturn + " " + globalConfig.returnedLang + ". " + globalConfig.seeHelpLang + ".";
		} else {
			message = totalCount + " " + globalConfig.resultsFoundLang + searchString + regionName + ".";
		}
	}
	document.getElementById(globalConfig.informationDivId).innerHTML ="<i>" + message + "</i>";
};	
globalConfig.noResultFound = globalConfig.noResultFound || function(){
	document.getElementById(globalConfig.informationDivId).innerHTML ="<i>" + globalConfig.noResultFoundMsg + "</i>";	
};
globalConfig.searchInProgress = globalConfig.searchInProgress || function(){
	document.getElementById(globalConfig.informationDivId).innerHTML = "<i>" + globalConfig.searchingLang + "</i>";
};
globalConfig.maxQueryZoomLevel = globalConfig.maxQueryZoomLevel || 17;
globalConfig.maxQueryZoomLevelTWPSearch = globalConfig.maxQueryZoomLevelTWPSearch || 11;  //Zoom Level for Township search
globalConfig.maxQueryZoomLevelTWPLotConSearch = globalConfig.maxQueryZoomLevelTWPLotConSearch || 14;	// Zoom Level for Township with Lot and Concession search
globalConfig.queryTableDivId = globalConfig.queryTableDivId || 'query_table';
//globalConfig.queryTableTemplateDivId = globalConfig.queryTableTemplateDivId || 'QueryTableTemplate';

if (typeof globalConfig.usejQueryUITable === "undefined"){
	globalConfig.usejQueryUITable = true;   //whether want to use the predefined multiple tab supports. If it is false, it will only support one tab. 
}
if(globalConfig.usejQueryUITable && (!globalConfig.accessible) && (!!yepnope)){	
	yepnope({
		load: "http://files.ontariogovernment.ca/moe_mapping/mapping/js/MOEMap/css/jquery.dataTables.css", 
		callback: function () {
			//console.log("multipletabs.css loaded!");
		}
	});
	
	yepnope({
		load: "http://files.ontariogovernment.ca/moe_mapping/mapping/js/MOEMap/js/jquery.dataTables.js", 
		callback: function () {
			//console.log("closure-library-multipletabs-min.js loaded!");
		}
	});
}
globalConfig.supportTableDownload = globalConfig.supportTableDownload || true;	

//whether want to use the predefined multiple tab supports. If it is false, it will only support one tab. 
if (typeof globalConfig.usePredefinedMultipleTabs === "undefined"){
	globalConfig.usePredefinedMultipleTabs = true;
}
if(globalConfig.usePredefinedMultipleTabs && (!globalConfig.accessible) && (!!yepnope)){	
		yepnope({
			load: "http://files.ontariogovernment.ca/moe_mapping/mapping/js/MOEMap/css/multipletabs.css", 
			callback: function () {
				//console.log("multipletabs.css loaded!");
			}
		});
		
		yepnope({
			load: "http://files.ontariogovernment.ca/moe_mapping/mapping/js/MOEMap/js/closure-library-multipletabs-min.js", 
			callback: function () {
				//console.log("closure-library-multipletabs-min.js loaded!");
			}
		});
		/*
		goog.require('goog.dom');
		goog.require('goog.ui.Tab');
		goog.require('goog.ui.TabBar');
		*/
}
globalConfig.searchedLocationIcon = globalConfig.searchedLocationIcon || "http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png";
globalConfig.twpBoundary = globalConfig.twpBoundary || {
	color: '#8583f3',
	opacity: 1, 
	weight: 4
};
globalConfig.pointBuffer = globalConfig.pointBuffer || {
	color: "#FF0000",
	opacity: 1,
	weight: 2
};
globalConfig.identifyMarkerRedTearDrop = globalConfig.identifyMarkerRedTearDrop || false;

globalConfig.identifyRadiusZoomLevelList = globalConfig.identifyRadiusZoomLevelList || {
	21 : 0.001,
	20 : 0.001,
	19 : 0.002,
	18 : 0.003,
	17 : 0.005,
	16 : 0.01,
	15 : 0.02,
	14 : 0.05,
	13 : 0.08,
	12 : 0.16,
	11 : 0.3,
	10 : 0.6,
	9  : 1.2,
	8  : 2.4,
	7  : 4.8,
	6  : 9.6,
	5  : 20,
	4  : 40,
	3  : 80,
	2  : 160,
	1  : 320
};

/*
	queryParams contains gLatLng, map, preQueryCallback (globalConfig.preIdentifyCallback), 
	postQueryCallback (globalConfig.postIdentifyCallback), layerList, currentLayerId as its properties. 
*/
globalConfig.preIdentifyCallbackName = globalConfig.preIdentifyCallbackName || "Wells";
globalConfig.preIdentifyCallbackList = globalConfig.preIdentifyCallbackList || {
	"Wells": function (queryParams) {
		var radius = globalConfig.identifyRadiusZoomLevelList[queryParams.map.getZoom()];
		var layerSetting = queryParams.layerList[queryParams.currentLayerId];
		var circle = globalConfig.calculateCirclePolyline(queryParams.gLatLng, radius*1000);	
		var params = {
			returnGeometry: false,
			outFields: layerSetting.outFields,
			geometry: new google.maps.Polygon({
				paths: circle.getPath()
			}),
			geometryType: 'esriGeometryPolygon'
		};
		return params;
	},
	"SWPLocator": function (queryParams) {
		/*if (globalConfig.identifyMultiplePolygonLayersServicesTemplate.hasOwnProperty('displayResultBelowMap') && (globalConfig.identifyMultiplePolygonLayersServicesTemplate.displayResultBelowMap)) {
			globalConfig.identifyResults = {};
		}*/
		var layerSetting = queryParams.layerList[queryParams.currentLayerId];
		var params = {
			returnGeometry: layerSetting.hasOwnProperty('returnGeometry') ? layerSetting.returnGeometry : false,
			geometryType: 'esriGeometryPoint',
			geometry: queryParams.gLatLng,				
			outFields: layerSetting.returnFields
		};			
		return params;
	}	
};
globalConfig.preIdentifyCallback = globalConfig.preIdentifyCallback || globalConfig.preIdentifyCallbackList[globalConfig.preIdentifyCallbackName];

globalConfig.createControllableInfoWindowContent = function (content) {
	var container = document.createElement('div');
	container.style.width = globalConfig.infoWindowWidth;
	if (globalConfig.hasOwnProperty('infoWindowHeight')){ 
		container.style.height = globalConfig.infoWindowHeight;
	}
	container.innerHTML = content;
	return container;
};
globalConfig.postIdentifyCallbackName = globalConfig.postIdentifyCallbackName || "Wells";
globalConfig.postIdentifyCallbackList = globalConfig.postIdentifyCallbackList || {
	"Wells": function (queryParams) {
		var features = Array.range(0, queryParams.layerList.length - 1).reduce(function(previousValue, currentValue) {
			var result = queryParams.layerList[currentValue].result;
			if (result.hasOwnProperty('features')) {
				return previousValue.concat(result.features);
			} else {
				return previousValue;
			}
		}, []);
		if(features.length === 0) {
			return;
		}
		var container = globalConfig.calculateMulitpleTabsOneFeature(features, queryParams.layerList[0].tabsTemplate);
		MOEMAP.openInfoWindow(queryParams.gLatLng, container);
	},
	"SportFish": function (queryParams) {
		var features = Array.range(0, queryParams.layerList.length - 1).reduce(function(previousValue, currentValue) {
			var result = queryParams.layerList[currentValue].result;
			if (result.hasOwnProperty('features')) {
				return previousValue.concat(result.features);
			} else {
				return previousValue;
			}
		}, []);
		if(features.length === 0) {
			return;
		}
		var tableTemplate = queryParams.layerList[0].tabsTemplate;
		var calculateContents = TABS_CALCULATOR.getContent(features[0].attributes, tableTemplate);
		var container = globalConfig.createControllableInfoWindowContent(calculateContents[0].content);
		MOEMAP.openInfoWindow(queryParams.gLatLng, container);
	},
	"SWPLocatorReverseGeocoding": function (queryParams) {
		if (globalConfig.avoidReverseGeocoding) {
			globalConfig.avoidReverseGeocoding = false;
			globalConfig.postIdentifyCallbackList["SWPLocator"](queryParams);
		} else {
			var geocoder = new google.maps.Geocoder();
			var latlng = queryParams.gLatLng;
			geocoder.geocode({
				'address': latlng.lat() + ',' + latlng.lng()
			}, function (results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					globalConfig.returnedAddress = results[0].formatted_address.toString();
					globalConfig.postIdentifyCallbackList["SWPLocator"](queryParams);
				} else {
					alert("Geocode was not successful for the following reason: " + status);
				}
			});
		}
	},
	"SWPLocator": function (queryParams) {
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
		var identifyMarker = globalConfig.identifyMarkerRedTearDrop ? (new google.maps.Marker({
				position: queryParams.gLatLng,
				draggable: true
			})) : (new google.maps.Marker({
				position: queryParams.gLatLng,
				icon: globalConfig.searchedLocationIcon,				
				draggable: true
			}));
		MOEMAP.addOverlay(identifyMarker);
		/*
		if (globalConfig.identifyMultiplePolygonLayersServicesTemplate.hasOwnProperty('displayResultBelowMap') && (globalConfig.identifyMultiplePolygonLayersServicesTemplate.displayResultBelowMap)) {
			globalConfig.identifyResults["LatLng"] = queryParams.gLatLng;
			globalConfig.identifyResults["UTM"] = globalConfig.convertLatLngtoUTM(queryParams.gLatLng.lat(), queryParams.gLatLng.lng());		
			//var template = document.getElementById(globalConfig.queryTableTemplateDivId).innerHTML;
			document.getElementById(globalConfig.queryTableDivId).innerHTML = _.template(globalConfig.identifyMultiplePolygonLayersServicesTemplate.queryTableTemplate, globalConfig.identifyResults);
			//console.log(container);
			container = _.template(globalConfig.identifyMultiplePolygonLayersServicesTemplate.popupTemplate, globalConfig.identifyResults);
		}*/ //else {
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
		//console.log(container.innerHTML);
		if (globalConfig.testDivExist(globalConfig.queryTableDivId)) {
			document.getElementById(globalConfig.queryTableDivId).innerHTML = "<br>" + container.innerHTML;
		}
		/*
		if (globalConfig.identifyMultiplePolygonLayersServicesTemplate.hasOwnProperty('success')) {
			globalConfig.identifyMultiplePolygonLayersServicesTemplate.success();
		}*/
		/*
		if ((typeof(globalConfig.searchHelpTxt)!== "undefined") && globalConfig.testDivExist(globalConfig.informationDivId)){
			document.getElementById(globalConfig.informationDivId).innerHTML = globalConfig.searchHelpTxt;
		}*/		
	}
};
globalConfig.postIdentifyCallback = globalConfig.postIdentifyCallback || globalConfig.postIdentifyCallbackList[globalConfig.postIdentifyCallbackName];

/*
	queryParams contains gLatLng, radius, map, preQueryCallback (globalConfig.preBufferCallback), 
	postQueryCallback (globalConfig.postBufferCallback), layerList, currentLayerId as its properties. 
*/
globalConfig.preBufferCallbackName = globalConfig.preBufferCallbackName || "Wells";
globalConfig.preBufferCallbackList = globalConfig.preBufferCallbackList || {
	"Wells": function (queryParams) {
		var radius = queryParams.radius;
		var marker = globalConfig.createMarker(queryParams.gLatLng, "" + queryParams.gLatLng.lat().toFixed(5) + ", " + queryParams.gLatLng.lng().toFixed(5), globalConfig.searchedLocationIcon);
		MOEMAP.addOverlay(marker);
		
		var layerSetting = queryParams.layerList[queryParams.currentLayerId];
		var circle = globalConfig.calculateCirclePolyline(queryParams.gLatLng, radius*1000);
		var bounds = globalConfig.calculatePolylineBounds(circle);
		globalConfig.setMapBound(queryParams.map,bounds);
		MOEMAP.addOverlay(circle);
		var params = {
			returnGeometry: true, 
			outFields: layerSetting.outFields,
			geometry: new google.maps.Polygon({
				paths: circle.getPath()
			}),
			geometryType: 'esriGeometryPolygon'
		};
		
		if (queryParams.hasOwnProperty('where')) {
			params.where = queryParams.where;
		}
		return params;
	}
};
globalConfig.preBufferCallback = globalConfig.preBufferCallback || globalConfig.preBufferCallbackList[globalConfig.preBufferCallbackName];

globalConfig.postBufferCallbackName = globalConfig.postBufferCallbackName || "Wells";
globalConfig.postBufferCallbackList = globalConfig.postBufferCallbackList || {
	"Wells": function (queryParams) {
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
		globalConfig.addMarkers(features, queryParams.layerList[0].tabsTemplate);
		var templates = {
			"coordinatesTable": queryParams.layerList[0].tableTemplate,
			"noCoordinatesTable": queryParams.layerList[0].noCoordinatesTableTemplate
		};
		//globalConfig.renderTable(features, queryParams.layerList[0].tableTemplate, queryParams.gLatLng);
		globalConfig.renderTable(features, templates, queryParams.gLatLng);
		queryParams.totalCount = features.length;
		globalConfig.resultFoundSimple(queryParams);		
	}
};
globalConfig.postBufferCallback = globalConfig.postBufferCallback || globalConfig.postBufferCallbackList[globalConfig.postBufferCallbackName];

globalConfig.addMarkers = globalConfig.addMarkers || function(features, tabsTemplate) {
	var pointClusters = globalConfig.calculateClusters(features);
	for (var x = 0; x < pointClusters.length; x++) {
		var gLatLng = pointClusters[x].gLatLng;
		var container = globalConfig.calculateMulitpleTabsOneFeature(pointClusters[x].list, tabsTemplate);
		var marker = new google.maps.Marker({
			position: gLatLng
		});		
		(function (container, marker) {
			google.maps.event.addListener(marker, 'click', function () {
				MOEMAP.openInfoWindow(marker.getPosition(), container);
			});
		})(container, marker);
		MOEMAP.addOverlay(marker);
	}
};

globalConfig.addMarkersSimple = globalConfig.addMarkersSimple || function(features, tabsTemplate) {
	for (var x = 0; x < features.length; x++) {
		var gLatLng = features[x].geometry[0].getPosition();
		var calculateContents = TABS_CALCULATOR.getContent(features[x].attributes, tabsTemplate);
		//var container = calculateContents[0].content;
		var container = globalConfig.createControllableInfoWindowContent(calculateContents[0].content);
		var marker = new google.maps.Marker({
			position: gLatLng
		});		
		(function (container, marker) {
			google.maps.event.addListener(marker, 'click', function () {
				MOEMAP.openInfoWindow(marker.getPosition(), container);
			});
		})(container, marker);
		MOEMAP.addOverlay(marker);
	}
};

globalConfig.renderTable = function(features, templates, searchCenter){
	var tableTemplate = templates.coordinatesTable;
	var noCoordinatesTableTemplate = templates.noCoordinatesTable;
	var featuresValidCoors = features.filter(globalConfig.validFeaturesFilter);
	var featuresInvalidCoors = features.filter(function (feature) {
		return  !globalConfig.validFeaturesFilter(feature);
	});
	var tableHead = tableTemplate.head;
	//console.log(tableHead);
	var requireDistanceField = (typeof(searchCenter) !== "undefined");
	if(requireDistanceField) {
		var resArrays = tableTemplate.head.split("<table");
		if(resArrays.length === 2){
			tableHead = resArrays[0] + globalConfig.distanceFieldNote + "<table" + resArrays[1];
		}
		var resArrays = tableHead.split("</tr>");
		if(resArrays.length === 2){
			tableHead = resArrays[0] + "<th><center>" + globalConfig.distanceLang + "</center></th></tr>" + resArrays[1];
		}
		//console.log(tableHead);
	}
	var getTableContent = function(features, requireDistanceField, tableTemplateContent){
		var table = "";
		var size = features.length;
		for (var x = 0; x < size; x++) {
			var findResult = features[x];
			var calculateContents = TABS_CALCULATOR.getContent(findResult.attributes, [{ label:globalConfig.InformationLang, content:tableTemplateContent}]);
			var str = calculateContents[0].content;
			var gLatLng = findResult.geometry[0].getPosition();
			if(requireDistanceField) {
				var resArrays = str.split("</tr>");
				str = resArrays[0] + "<td>" + (google.maps.geometry.spherical.computeDistanceBetween(gLatLng, searchCenter)/1000).toFixed(2)  + "</td></tr>" ;
			}
			table = table + str;
		}
		return table;
	};
	//var table = tableHead + getTableContent(features) + tableTemplate.tail + "<br><br><br>";
	var table = (featuresValidCoors.length === 0) ? "" : (tableHead + getTableContent(featuresValidCoors, requireDistanceField, tableTemplate.content) + tableTemplate.tail + "<br><br><br>");
	table = table + ((featuresInvalidCoors.length === 0) ? "" : (noCoordinatesTableTemplate.head + getTableContent(featuresInvalidCoors, false, noCoordinatesTableTemplate.content) + noCoordinatesTableTemplate.tail + "<br><br><br>" + globalConfig.whyAmISeeingThisLang));
	document.getElementById(globalConfig.queryTableDivId).innerHTML = table;
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
					"sSwfPath": "http://files.ontariogovernment.ca/moe_mapping/mapping/js/MOEMap/js/TableTools-2.1.4/media/swf/copy_csv_xls.swf",
					"aButtons": ["xls"]
				};
		}
		if(requireDistanceField) {
			var fields = tableHead.split("</th><th>");
			dataTableOptions["aaSorting"] = [[ fields.length-1, "asc" ]];
		}
		$('#' + tableID).dataTable(dataTableOptions);
		$('#' + globalConfig.noCoordinatesTableID).dataTable(dataTableOptions);
	}
};
	
/*
	queryParams contains map, preQueryCallback (globalConfig.preConditionsCallback), 
	postQueryCallback (globalConfig.postConditionsCallback), layerList, currentLayerId
	searchString, where, withinExtent, requireGeocode as its properties. 
*/
globalConfig.preConditionsCallbackName = globalConfig.preConditionsCallbackName || "Wells";
globalConfig.preConditionsCallbackList = globalConfig.preConditionsCallbackList || {
	"Wells": function (queryParams) {
		var layerSetting = queryParams.layerList[queryParams.currentLayerId];
		var params = {
			returnGeometry: (globalConfig.accessible) ? false : true, 
			outFields: layerSetting.outFields,
			where: queryParams.where		
		};
		if(queryParams.withinExtent) {
			var getCurrentMapExtent = function(map) {
				var currentBounds = map.getBounds();
				var swLatLng = currentBounds.getSouthWest();
				var neLatLng = currentBounds.getNorthEast();
				var seLatLng = new google.maps.LatLng(swLatLng.lat(), neLatLng.lng());
				var nwLatLng = new google.maps.LatLng(neLatLng.lat(), swLatLng.lng());
				return new google.maps.Polygon({
					paths: [swLatLng, seLatLng, neLatLng, nwLatLng, swLatLng]
				});	
			};
			params.geometry = getCurrentMapExtent(queryParams.map);
		}
		return params;
	}
};
globalConfig.preConditionsCallback = globalConfig.preConditionsCallback || globalConfig.preConditionsCallbackList[globalConfig.preConditionsCallbackName];
globalConfig.validFeaturesFilter = globalConfig.validFeaturesFilter || function(feature) {
	var p = feature.geometry[0].position; 
		return (Math.abs(p.d) > 0.0001 && Math.abs(p.e) > 0.0001);
};
globalConfig.postConditionsCallbackName = globalConfig.postConditionsCallbackName || "Wells";
globalConfig.postConditionsCallbackList = globalConfig.postConditionsCallbackList || {
	"Wells": function (queryParams) {
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
			if(queryParams.requireGeocode) {
				MOEMAP.geocodeAddress(queryParams);		
			}		
			return;
		}
		var featuresValidCoors = features.filter(globalConfig.validFeaturesFilter);
		var featuresInvalidCoors = features.filter(function (feature) {
			return  !globalConfig.validFeaturesFilter(feature);
		});
		queryParams.totalCount = features.length;
		queryParams.validCount = featuresValidCoors.length;
		queryParams.invalidCount = featuresInvalidCoors.length;
		globalConfig.resultFoundSimple(queryParams);		
		//console.log(featuresValidCoors);
		if((!queryParams.withinExtent) && (featuresValidCoors.length > 0)) {	
			//var bounds = globalConfig.calculatePointsBounds(features);
			var bounds = globalConfig.calculatePointsBounds(featuresValidCoors);
			globalConfig.setMapBound(queryParams.map,bounds);	
		}
		//globalConfig.addMarkers(features,queryParams.layerList[0].tabsTemplate);
		globalConfig.addMarkers(featuresValidCoors,queryParams.layerList[0].tabsTemplate);
		//globalConfig.addMarkers(featuresValidCoors,queryParams.layerList[0].tabsTemplate);
		if (queryParams.layerList[0].hasOwnProperty('tableTemplate')){
			var templates = {
				"coordinatesTable": queryParams.layerList[0].tableTemplate,
				"noCoordinatesTable": queryParams.layerList[0].noCoordinatesTableTemplate
			};
			//console.log(templates);
			//globalConfig.renderTable(features,queryParams.layerList[0].tableTemplate);
			globalConfig.renderTable(features,templates);
		}
	},
	"AccessibleWells": function (queryParams) {
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
	},
	"SportFish": function (queryParams) {
		var features = Array.range(0, queryParams.layerList.length - 1).reduce(function(previousValue, currentValue) {
			var result = queryParams.layerList[currentValue].result;
			if (result.hasOwnProperty('features')) {
				return previousValue.concat(result.features);
			} else {
				return previousValue;
			}
		}, []);
		if(features.length === 0) {
			if(queryParams.requireGeocode) {
				MOEMAP.geocodeAddress(queryParams);		
			} else {
				queryParams.totalCount = 0;
				globalConfig.resultFoundSimple(queryParams);							
			}
			return;
		}
		queryParams.totalCount = features.length;
		globalConfig.resultFoundSimple(queryParams);				
		if(!queryParams.withinExtent) {	
			var bounds = globalConfig.calculatePointsBounds(features);
			globalConfig.setMapBound(queryParams.map,bounds);	
		}
		globalConfig.addMarkersSimple(features, queryParams.layerList[0].tabsTemplate);
	}	
};
globalConfig.postConditionsCallback = globalConfig.postConditionsCallback || globalConfig.postConditionsCallbackList[globalConfig.postConditionsCallbackName];

globalConfig.addressGeocodingCallbackName = globalConfig.addressGeocodingCallbackName || "Wells";
globalConfig.addressGeocodingCallbackList = globalConfig.addressGeocodingCallbackList || {
	"Wells": function (queryParams) {
		var withinExtent = queryParams.hasOwnProperty('withinExtent') ? queryParams.withinExtent : false;
		var map = queryParams.map;
		if (withinExtent && (!queryParams.map.getBounds().contains(queryParams.gLatLng))) {
			queryParams.totalCount = 0;
			globalConfig.resultFoundSimple(queryParams);
			return;
		}
		if (queryParams.hasOwnProperty('polylines')) {
			MOEMAP.addPolylinesToMap(queryParams.polylines);
		}
		var marker = globalConfig.createMarker(queryParams.gLatLng, queryParams.searchString, globalConfig.searchedLocationIcon);
		MOEMAP.addOverlay(marker);
		if (!withinExtent) {
			queryParams.map.setCenter(queryParams.gLatLng);
			if (queryParams.hasOwnProperty('zoomlevel')) {
				queryParams.map.setZoom(queryParams.zoomlevel);
			} else {
				if (queryParams.map.getZoom() <= globalConfig.maxQueryZoomLevel) {
					queryParams.map.setZoom(globalConfig.maxQueryZoomLevel);
				}
			}
		}
		queryParams.totalCount = 1;
		globalConfig.resultFoundSimple(queryParams);					
	},
	"SWPLocator": function (queryParams) {
		var map = queryParams.map;
		if (queryParams.hasOwnProperty('polylines')) {
			MOEMAP.addPolylinesToMap(queryParams.polylines);
		}
		var gLatLng = queryParams.gLatLng;
		//var address = queryParams.address;  //returnedAddress
		if (queryParams.hasOwnProperty('returnedAddress')) {
			globalConfig.returnedAddress = queryParams.returnedAddress;			
		} else {
			globalConfig.returnedAddress = queryParams.address;
		}
		map.setCenter(gLatLng);
		if (queryParams.hasOwnProperty('zoomLevel')) {
			map.setZoom(queryParams.zoomLevel);
		} else {
			if (map.getZoom() <= globalConfig.maxQueryZoomLevel) {
				map.setZoom(globalConfig.maxQueryZoomLevel);
			}
		}
		MOEMAP.mouseClickHandler({latLng: gLatLng});
	}	
};
globalConfig.addressGeocodingCallback = globalConfig.addressGeocodingCallback || globalConfig.addressGeocodingCallbackList[globalConfig.addressGeocodingCallbackName];

globalConfig.calculatePointsBounds = globalConfig.calculatePointsBounds || function (features){
	var bounds = new google.maps.LatLngBounds();
	var size = features.length;
	for (var x = 0; x < size; x++) {
		var gLatLng = features[x].geometry[0].getPosition();
		bounds.extend(gLatLng);		
	}
	return bounds;
};

globalConfig.setMapBound = globalConfig.setMapBound || function (map, bounds){
	map.fitBounds(bounds);
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
};	

globalConfig.calculateClusters = globalConfig.calculateClusters || function (features){
	var size = features.length;
	var pointClusters = [];
	for (var x = 0; x < size; x++) {
		var findResult = features[x];
		//var attributes = findResult.attributes;
		var gLatLng = findResult.geometry[0].getPosition();
		if (Math.abs(gLatLng.lng()) + Math.abs(gLatLng.lat()) > 0.001) {
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
			}				
		}
	}
	return pointClusters;
};
	
/*
	Usage: Create a marker on a location with pop up content and used icon. 
	Called by: queryLayerWithPointBuffer.
	Rely on: map, openInfoWindow function.  
*/	
globalConfig.createMarker = globalConfig.createMarker || function (gLatLng, popupContent, icon) {
	var marker = new google.maps.Marker({
		position: gLatLng,
		icon: icon
	});
	(function (popupContent, marker) {
		google.maps.event.addListener(marker, 'click', function () {
			MOEMAP.openInfoWindow(marker.getPosition(), popupContent);
		});
	})(popupContent, marker);
	return marker;
};

globalConfig.infoWindowWidth = globalConfig.infoWindowWidth || '450px';
/*
	Usage: According to the features and the template, generate tab information and finally generate the tabs.  
	Called by: QUERYLAYER.queryLayer, mouseClickHandler
*/		
globalConfig.calculateMulitpleTabsOneFeature = globalConfig.calculateMulitpleTabsOneFeature || function (features, tabsTemplate){
	/*
		Usage: According to the generated tab information, generate the tabs.  
		Called by: calculateMulitpleTabsOneFeature
	*/	
	var createTabBar = function (tabs){
		// the following code based on ESRI sample
		// create and show the info-window with tabs, one for each map service layer		  
		var container = document.createElement('div');
		container.style.width = globalConfig.infoWindowWidth;
		if (globalConfig.hasOwnProperty('infoWindowHeight')){ 
			container.style.height = globalConfig.infoWindowHeight;
		}
            // =======START  TAB UI ================             
		var tabBar = new goog.ui.TabBar();
		for (var i = 0; i < tabs.length; i++) {
			var tab = new goog.ui.Tab(tabs[i].label);
			tab.content = tabs[i].content;
			tabBar.addChild(tab, true);
		}
		tabBar.render(container);
		goog.dom.appendChild(container, goog.dom.createDom('div', {
			'class': 'goog-tab-bar-clear'
		}));
		var contentDiv = goog.dom.createDom('div', {
			'class': 'goog-tab-content'
		});
		if (globalConfig.hasOwnProperty('infoWindowContentHeight')){ 
			contentDiv.style.height = globalConfig.infoWindowContentHeight;
		}
		if (globalConfig.hasOwnProperty('infoWindowContentWidth')){ 
			contentDiv.style.width = globalConfig.infoWindowContentWidth;
		}
		
		//contentDiv.style.width=globalConfig.infoWindowWidth;
		//contentDiv.style.height=globalConfig.infoWindowWidth;
		
		goog.dom.appendChild(container, contentDiv);            
		goog.events.listen(tabBar, goog.ui.Component.EventType.SELECT, function(e) {
			contentDiv.innerHTML = e.target.content;
		});
		tabBar.setSelectedTabIndex(0);
		return container;
            // =======END  TAB UI ================
	};
	
	var count = features.length;
	//Get the first returned record and generate the content for the pop up window. 
	var tabs = TABS_CALCULATOR.getContent(features[0].attributes, tabsTemplate);
	//If it is required to display more than one record, the allowMultipleIdentifyResult will be true. 
	//Then generate the contents for other records and append it to the content in tabs
	if(globalConfig.allowMultipleIdentifyResult){
		for (var i = 1; i < count; i++) {
			var calTabs = TABS_CALCULATOR.getContent(features[i].attributes, tabsTemplate);

			for (var j = 0; j < calTabs.length; j++) {
				//var tab = calTabs[j];
				tabs[j].content = tabs[j].content + calTabs[j].content;
			}
		}
	}
	/*add the head and tail to the content. The length of content is related to the total nubmer of records. 
		The head and tail parts are always fixed and have nothing to do with the total number of records. 
	*/
	for (var k = 0; k < tabs.length; k++) {
		if(typeof(tabsTemplate[k].head) !== "undefined"){
			tabs[k].content = tabsTemplate[k].head + tabs[k].content;
		}
		if(typeof(tabsTemplate[k].tail) !== "undefined"){
			tabs[k].content = tabs[k].content + tabsTemplate[k].tail;
		}			
		//tabs[k].content = tabsTemplate[k].head + tabs[k].content + tabsTemplate[k].tail;
	}
	//Add Total features returned to the top to table. 
	if((globalConfig.displayTotalIdentifyCount)&&(count > 1)){
		if(globalConfig.allowMultipleIdentifyResult){
			tabs[0].content = globalConfig.totalFeatureReturned(count) + "<br>" + tabs[0].content;
		}else{
			tabs[0].content = globalConfig.totalFeatureReturnedOnlyOneDisplayed(count) + "<br>" + tabs[0].content;
		}
	}
	//If it do not use the Predefined multiple tabs, it will not need to include some js and css file. 
	if(globalConfig.usePredefinedMultipleTabs){
		return createTabBar(tabs);
	}else{
		return tabs[0].content;		
	}
};
	
/*
	Usage: Use the circle center and radius to calculat the vertex array.
	The calculation is using the geometry library provided by Google Maps. 
	Called by: mouseMoveHandler, queryLayerWithPointBuffer
*/
globalConfig.calculateCirclePolyline = globalConfig.calculateCirclePolyline || function (gLatLng, radius){
	var circlePath = [];
	for(var heading = 0; heading<=360; heading = heading + 10){
		var latLng = google.maps.geometry.spherical.computeOffset(gLatLng, radius, heading);			
		circlePath.push(new google.maps.LatLng(latLng.lat().toFixed(5), latLng.lng().toFixed(5)));
	}
	var circle = new google.maps.Polyline({
		path: circlePath,
		strokeColor: globalConfig.pointBuffer.color,  
		strokeOpacity: globalConfig.pointBuffer.opacity,
		strokeWeight: globalConfig.pointBuffer.weight
	});
	return circle;
};

/*
	Usage: Calculate the bounds for a polyline. 
	Called by: mouseMoveHandler, queryLayerWithPointBuffer
*/
globalConfig.calculatePolylineBounds = globalConfig.calculatePolylineBounds || function (polyline){
	var bounds = new google.maps.LatLngBounds();
	var path = polyline.getPath();
	for (var i = 0; i < path.length; i++) {
		bounds.extend(path.getAt(i));
	}
	return bounds;
};

globalConfig.disallowMouseClick = globalConfig.disallowMouseClick || false;

MOEMAP = (function () {
	var map, identifyResults, identifyMarker, infoWindow, gOverlays = [], isCenterSet = false, center, bufferCircle; //, overlays = [], layers;

	/*
		Usage: If the info window is open, it will be closed. 
		Called by: mouseClickHandler, clearOverlays.
	*/
	function closeInfoWindow(){
		if(infoWindow){
			infoWindow.setMap(null);
		}		
	}	
	/*
		Usage: Remove the overlays on the map, the buffer circle, and close the infowindow. 
		Called by: mouseMoveHandler and exposed as public methods. 
	*/	
	function clearOverlays() {		
		if (gOverlays) {
			for (var i = 0; i < gOverlays.length; i++) {
				gOverlays[i].setMap(null);
			}
			gOverlays.length = 0;
		}
		if(bufferCircle){
			bufferCircle.setMap(null);
		}
		closeInfoWindow();
		if(globalConfig.usejQueryUITable){	
			document.getElementById(globalConfig.queryTableDivId).innerHTML = "";
		}
	}
	/*
		Usage: Add the polylines overlays on the map. If the LOCATOR module return the result for Township with/without 
		Lot and Concession, the related polygons will be add to Google Maps by this method. 
		Called by: queryLayerWithPointBuffer 
	*/		
	function addPolylinesToMap(polylines){
		if(typeof(polylines) !== "undefined"){
			for (var i=0; i<polylines.length; i++){
				var polygon = polylines[i];
				var max = polygon.getPaths().getLength();
				for(var j=0;j<max;j++){		
					var polyline = new google.maps.Polyline({    
						path: polygon.getPaths().getAt(j),
						strokeColor: globalConfig.twpBoundary.color,    
						strokeOpacity: globalConfig.twpBoundary.opacity,   
						strokeWeight: globalConfig.twpBoundary.weight,
						geodesic: false
					});		
					polyline.setMap(map);
					gOverlays.push(polyline);		
				}
			}
		}				
	}	
	/*
		Usage: If a user is click on the search result or the searched location, a info window will pop up. 
		Called by: mouseClickHandler,  QUERYLAYER.queryLayer, queryLayerWithPointBuffer.
	*/
	function openInfoWindow(latlng, container){
		if (!infoWindow) {
			infoWindow = new google.maps.InfoWindow({
				content: container,
				position: latlng
			});
		} else {
			infoWindow.setContent(container);
			infoWindow.setPosition(latlng);
		}
		infoWindow.open(map);		
	}

	/*
		Set up the event handler for mouse move event. This handler needs to handle two situations. The first is to update the 
		coordinates in the bottom of them map. The second is when the user is drawing the circle, try to update the circle when
		the user move the mouse. Meanwhile, it also give the event handler which will be called once the user finishs the drawing
		of the circle.
		call: globalConfig.updateCoordinates, calculateCirclePolyline, globalConfig.drawingCircleMessage
	*/				
	function mouseMoveHandler(event) {
		/*Update the Coordinates*/
		if(globalConfig.isCoordinatesVisible){
			globalConfig.updateCoordinates(event.latLng.lat(), event.latLng.lng());
		}
		/*Make sure the user is in the middle of drawing.*/
		if(isCenterSet){							
			if(typeof(event) !== "undefined"){
				//Calculate the current radius
				var distance = google.maps.geometry.spherical.computeDistanceBetween(center, event.latLng);								
				//Remove the old circle
				if(bufferCircle){
					bufferCircle.setMap(null);
				}
				bufferCircle = globalConfig.calculateCirclePolyline(center, distance);
				bufferCircle.setMap(map);
				google.maps.event.addListener(bufferCircle, 'click', finishBufferSearch);
				//update the message to give the user the current circle's centre and radius. 
				globalConfig.drawingCircleMessage(center.lat(), center.lng(), distance/1000);
			}
		}
	}	

	function addressBufferCallback (queryParams) {		
		if (queryParams.hasOwnProperty('returnedAddress')) {
			globalConfig.returnedAddress = queryParams.returnedAddress;			
		} else {
			globalConfig.returnedAddress = queryParams.address;
		}
		queryParams.map = map;
		queryParams.preQueryCallback = globalConfig.preBufferCallback;
		queryParams.postQueryCallback = globalConfig.postBufferCallback;
		queryParams.layerList = globalConfig.queryLayerList;
		clearOverlays();
		addPolylinesToMap(queryParams.polylines);  
		queryLayer2(queryParams,0);		
	}
	function finishBufferSearch (evt) {
		var distance = google.maps.geometry.spherical.computeDistanceBetween(center, evt.latLng)/1000;
		var queryParams = {
			radius: distance,
			gLatLng: center,
			map: map,
			preQueryCallback: globalConfig.preBufferCallback,
			postQueryCallback: globalConfig.postBufferCallback,
			layerList: globalConfig.queryLayerList		
		};
		//clear previous search results
		clearOverlays();
		//Query the layer							
		queryLayer2(queryParams,0);
		//restore the drawing status and the tool status to the original status. 
		isCenterSet = false;
		TOOLSLEGEND.setPointBufferTool(false);					
	}
	
	function queryLayer2(queryParams, layerId){
		if(layerId < queryParams.layerList.length) {
			queryParams.currentLayerId = layerId;
			var params = queryParams.preQueryCallback(queryParams);
			//var layerSetting = queryParams.layerList[layerId];
			var layer = new gmaps.ags.Layer(queryParams.layerList[layerId].url);
			layer.query(params, function (fset) {
				queryParams.layerList[layerId]["result"] = fset;
				queryLayer2(queryParams, layerId + 1);
			});				
		} else {
			queryParams.postQueryCallback(queryParams);
		}
		
	}
	/*
		Set up the event handler for mouse click event. This handler needs to handle two situations. If the user has selected the buffer Tool, 
		the click will be the center of the Circle and the function returns. If not, the function is going to identify the dots on the map. 
		call: TOOLSLEGEND.isPointBufferToolSelected, closeInfoWindow, calculateMulitpleTabsOneFeature, openInfoWindow
	*/					
	function mouseClickHandler(evt) {
		if(TOOLSLEGEND.isPointBufferToolSelected()){
			if(!isCenterSet){
				center = evt.latLng;
				isCenterSet = true;
			} else {
				finishBufferSearch(evt);
			}
			return;
		}		
		//identify
		closeInfoWindow();
		var queryParams = {
			gLatLng: evt.latLng,
			map: map,
			preQueryCallback: globalConfig.preIdentifyCallback,
			postQueryCallback: globalConfig.postIdentifyCallback,
			layerList: globalConfig.queryLayerList
		};
		if (globalConfig.hasOwnProperty('mergeFunction')) {
			queryParams.mergeFunction = globalConfig.mergeFunction;
		}
		queryLayer2(queryParams, 0);
	}

	/*
		Get the location firstly by using LOCATOR module. Then, use the call back function to do a spatial search with this location. 
	*/
	function identifyMultiplePolygonLayersWithLocation(qParams){
		var queryParams = {};
		if (qParams.hasOwnProperty('address')) {
			queryParams = qParams;
			queryParams.searchString = qParams.address;
		} else {
			queryParams = {
				address: qParams,
				searchString: qParams
			};		
		}
		
		if (qParams.hasOwnProperty('gLatLng')) {
			queryParams.map = map;
			globalConfig.addressGeocodingCallback(queryParams);
		} else {
			MOEMAP.geocodeAddress(queryParams);
		}
	}
	
	function showPolygonFeature (layerID, recordID) {
		var layerSetting = globalConfig.identifyMultiplePolygonLayersServicesTemplate.layerList[layerID];
		var geometryPoly = layerSetting["result"].features[recordID].geometry[0];
		geometryPoly.setMap(map);
		geometryPoly.setOptions(layerSetting.style);
		gOverlays.push(geometryPoly);			
	}
	
	function init(theMap){
		map = theMap;
		if (!globalConfig.disallowMouseClick) {
			google.maps.event.addListener(map, 'click', mouseClickHandler);
		}
		google.maps.event.addListener(map, 'mousemove', mouseMoveHandler);
		google.maps.event.addListener(map, 'zoom_changed', zoom_changedHandler);		
	}
	function zoom_changedHandler () {
		if (map.getZoom() > globalConfig.maxMapScale) {
			map.setZoom(globalConfig.maxMapScale);
		}
		if (map.getZoom() < globalConfig.minMapScale) {
			map.setZoom(globalConfig.minMapScale);
		}
	}
	function addOverlay (overlay) {
		overlay.setMap(map);	
		gOverlays.push(overlay);
	}
	function queryLayersWithConditionsExtent (queryParams) {
		queryParams.map = map;
		queryParams.preQueryCallback = globalConfig.preConditionsCallback;
		queryParams.postQueryCallback = globalConfig.postConditionsCallback;
		queryParams.layerList = globalConfig.queryLayerList;		
		queryLayer2(queryParams, 0);
	}
	function geocodeAddress (queryParams) {
		queryParams.map = map;
		queryParams.callback = globalConfig.addressGeocodingCallback;
		queryParams.address = queryParams.searchString;
		LOCATOR.locate(queryParams);
	}
	var module = {
        init: init,
		clearOverlays: clearOverlays,
		openInfoWindow: openInfoWindow,
		addOverlay: addOverlay,
		queryLayersWithConditionsExtent: queryLayersWithConditionsExtent,
		geocodeAddress: geocodeAddress,
		addPolylinesToMap: addPolylinesToMap, 
		mouseClickHandler: mouseClickHandler,
		addressBufferCallback: addressBufferCallback,
		identifyMultiplePolygonLayersWithLocation: identifyMultiplePolygonLayersWithLocation,
		showPolygonFeature: showPolygonFeature
    };
    return module;
})();


