/*global document:false */
/*global google:false */
/*global window:false */
/*global TOOLSLEGEND:false */

	var globalConfig = globalConfig || {};
	/*globalConfig.selectTooltip is defined in LANGUAGE.js*/
	globalConfig.imageURL = "https://www.ontario.ca/sites/default/files/moe_mapping/mapping/js/MOEMap/images/";
	globalConfig.legend = globalConfig.legend || {
		available: false,	
		url: globalConfig.imageURL + "legend.png", 
		size: {width: 270, height: 81},   //Width and Height
		location: {ratioX: 0.01, ratioY: 0.25}  //
	};
	globalConfig.pointBufferTool = globalConfig.pointBufferTool || {
		available: true,
		upIcon: globalConfig.imageURL + "Bptu.png",
		downIcon: globalConfig.imageURL + "Bptd.png",
		size: {width: 31, height: 31},   //Width and Height
		location: {ratioX: 0.12, ratioY: 0.98}  //
	};
	/*globalConfig.generateURLTool = globalConfig.generateURLTool || {
		available: true,
		upIcon: "http://10.60.13.84/Public/PTTW/generateURL.jpeg", 
		downIcon: "http://10.60.13.84/Public/PTTW/generateURL.jpeg",
		size: {width: 31, height: 31},   //Width and Height
		location: {ratioX: 0.18, ratioY: 0.98}  //
	};
	
	globalConfig.generateURL = globalConfig.generateURL || function(){
		var msg = "Generate URL";
		if (globalConfig.language === "FR"){
			msg = "French.";
		}
		return msg;
	};
	globalConfig.infomationDivId = globalConfig.infomationDivId || 'information';	
	globalConfig.generateURLMessage = globalConfig.generateURLMessage || function(url){
		var msg = "The generated URL is <a href=\"" + url + "\">" + url + "</a> and you can select it and paste it to emails and share it with friends.";
		if (globalConfig.language === "FR"){
			msg = "French.";
		}
		document.getElementById(globalConfig.infomationDivId).innerHTML = msg;
	};*/

TOOLSLEGEND = (function () {
	var pointBufferToolMarker, legendMarker;//, generateURLToolMarker;
	//var urlParametes = {};		
	var map;
	/*Change the Status of Buffer Tool. If the paramter is true, the Tool is slected. If it is flase, this Tool is unselected.*/
	function setPointBufferTool(isDownIcon){
		var pointBufferTool = globalConfig.pointBufferTool;
		var bounds = map.getBounds();
		var sw = bounds.getSouthWest();
		var ne = bounds.getNorthEast();
		var latDiff = ne.lat() - sw.lat();
		var lngDiff = ne.lng() - sw.lng();			
		var icon = "";
		if(isDownIcon){
			icon = pointBufferTool.downIcon;
		}else{
			icon = pointBufferTool.upIcon;
		}
		var newIcon = new google.maps.MarkerImage(icon, new google.maps.Size(pointBufferTool.size.width, pointBufferTool.size.height),
				new google.maps.Point(0, 0), new google.maps.Point(0, 0), new google.maps.Size(pointBufferTool.size.width, pointBufferTool.size.height));
		
		if(pointBufferToolMarker){
			pointBufferToolMarker.setMap(null);
		}
		pointBufferToolMarker = new google.maps.Marker({
			position: new google.maps.LatLng(sw.lat() + pointBufferTool.location.ratioY*latDiff, sw.lng() + pointBufferTool.location.ratioX*lngDiff),
			icon: newIcon,
			title: globalConfig.selectTooltip,
			map: map
		});
	}
	/*Test whether the Buffer Tool is selected or not*/
	function isPointBufferToolSelected(){
		var pointBufferTool = globalConfig.pointBufferTool;
		if(pointBufferToolMarker && (pointBufferToolMarker.icon.url === pointBufferTool.downIcon)){
			return true;
		}
		return false;
	}
	/*Setup the legend's location by using the configuration information.*/
	function setupLegend(sw, latDiff, lngDiff){
		var legend = globalConfig.legend;
		if(legend.available) {
			var gLatLng = new google.maps.LatLng(sw.lat() + legend.location.ratioY*latDiff, sw.lng() + legend.location.ratioX*lngDiff);
			if(legendMarker){
				legendMarker.setMap(null);
			}
			var icon = new google.maps.MarkerImage(legend.url, new google.maps.Size(legend.size.width, legend.size.height),
				new google.maps.Point(0, 0), new google.maps.Point(0, 0), new google.maps.Size(legend.size.width, legend.size.height));
			legendMarker = new google.maps.Marker({
				position: gLatLng,
				icon: icon,
				map: map
			});
		}	
	}
	/*Setup the Buffer Tool's location by using the configuration information.*/
	function setupPointBufferTool(){
		var pointBufferTool = globalConfig.pointBufferTool;
		if(typeof(pointBufferTool) !== "undefined") {
			if(pointBufferTool.available){
				setPointBufferTool(false);  //The buffer Tool is unselected. 
				var container = "";
				(function (container, pointBufferToolMarker) {
					google.maps.event.addListener(pointBufferToolMarker, 'click', function () {
						setPointBufferTool(true);   //The buffer Tool is selected. 
					});
				})(container, pointBufferToolMarker);				
			}
		}
	}
	/*Setup the Generate URL Tool's location by using the configuration information.*/
	/*function setupGenerateURLTool(sw, latDiff, lngDiff){
		var generateURLTool = globalConfig.generateURLTool;
		if(typeof(generateURLTool) !== "undefined") {
			if(generateURLTool.available){
				var gLatLng = new google.maps.LatLng(sw.lat() + generateURLTool.location.ratioY*latDiff, sw.lng() + generateURLTool.location.ratioX*lngDiff);
				if(generateURLToolMarker){
					generateURLToolMarker.setMap(null);
				}
				var icon = new google.maps.MarkerImage(generateURLTool.upIcon, new google.maps.Size(generateURLTool.size.width, generateURLTool.size.height),
					new google.maps.Point(0, 0), new google.maps.Point(0, 0), new google.maps.Size(generateURLTool.size.width, generateURLTool.size.height));
				generateURLToolMarker = new google.maps.Marker({
					position: gLatLng,
					icon: icon,
					title: globalConfig.generateURL(),
					map: map
				});

				var container = "";
				(function (container, generateURLToolMarker) {
					//Once the user clicks on the Generate URL Tool, this event handler will be called to generate the information and display it
					google.maps.event.addListener(generateURLToolMarker, 'click', function () {
						var str = window.location.href;
						var end = str.indexOf("?");
						if( end > 0){
							str = str.substring(0, end);
						}
						var lat = map.getCenter().lat().toFixed(4);
						var lng = map.getCenter().lng().toFixed(4);						
						str = str + "?lev=" + map.getZoom() + "&lat=" + lat + "&lng=" + lng;
						if((typeof(urlParametes.location) !== "undefined") && (typeof(urlParametes.radius) !== "undefined")){
							urlParametes.radius = urlParametes.radius * 1.0;
							str = str +  "&" + globalConfig.locationURLParaName + "=" + urlParametes.location + "&" + globalConfig.radiusURLParaName + "=" + urlParametes.radius.toFixed(3);
						}
						if((typeof(urlParametes.field) !== "undefined") && (typeof(urlParametes.value) !== "undefined") && (typeof(urlParametes.fuzzy) !== "undefined")){
							var fuz = 0;
							if(urlParametes.fuzzy){
								fuz = 1;
							}
							str = str +  "&" + globalConfig.fieldURLParaName + "=" + urlParametes.field + "&" + globalConfig.valueURLParaName + "=" + urlParametes.value  + "&" + globalConfig.fuzzyURLParaName + "=" + fuz;
						}
						globalConfig.generateURLMessage(str);
					});
				})(container, generateURLToolMarker);
			}
		}		
	}*/
	/*If the maps bound changes, this function will be called to adjust the positions of Legend, Buffer Tool, and URL Generator Tools.*/
	function boundsChangedHandler(){
		var bounds = map.getBounds();
		var sw = bounds.getSouthWest();
		var ne = bounds.getNorthEast();
		var latDiff = ne.lat() - sw.lat();
		var lngDiff = ne.lng() - sw.lng();
		setupLegend(sw, latDiff, lngDiff);
		setupPointBufferTool();
		//setupGenerateURLTool(sw, latDiff, lngDiff);
	}
	
	/*set up the Google Maps object!*/
	function init(theMap){
		map = theMap;
		google.maps.event.addListener(map, 'bounds_changed', boundsChangedHandler);
	}
	
	/*Update parameters which will be used to generate URL.*/
	/*function updateURLParameter (newURLParametes){
		urlParametes = newURLParametes;
	}
	*/
	var module = {
		init: init,
		//updateURLParameter: updateURLParameter,
		isPointBufferToolSelected: isPointBufferToolSelected,
		setPointBufferTool: setPointBufferTool//,
		//boundsChangedHandler: boundsChangedHandler
	};
	return module;
})();
