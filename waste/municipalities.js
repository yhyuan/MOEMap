//changed by communications - createMuncipalityMarker, updateDiv

var MOE_map_language = "EN";
var isMobile = false;

mapConfig = (function () {
	
	var	orgLatitude = 49.764775;
	var orgLongitude = -85.323214;
	var orgzoomLevel = 5;
	var minMapScale = 5;
	var maxMapScale = 21;
	
    var coor_Status = true;
    var language = MOE_map_language;
    var url = "http://www.camaps.ca/ArcGIS/rest/services/SportFish/SportFish/MapServer";
    var visibleLayerIds = [0, 1, 2];
    var layerIds = [0];
    var withinExtent = false;
    var address = "";
    var tabs = [{
        label: "Information",
        content: "<div style=\"width:300px;height:120px;overflow:auto;font-size:small\"><b><font color='#799441'>{LOCNAME_" + MOE_map_language + "}</font></b><br>{GUIDELOC_" + MOE_map_language + "}<img height=1 width=300 src='http://www.downloads.ene.gov.on.ca/en/publications/dataproducts/images/MOE_Mapping_Library_Black.jpg' /><br><a target='_blank' href='{URL_" + MOE_map_language + "}'>Consumption Advisory Table</a><br><br>Latitude <b>{MOEMAP_TOOLS.deciToDegree(LATITUDE)}</b> Longitude <b>{MOEMAP_TOOLS.deciToDegree(LONGITUDE)}</b><br><a href='mailto:sportfish.moe@ontario.ca?subject=Portal Error (Submission {LOCNAME_" + MOE_map_language + "})'>Report an error for this location</a>.</div>"
    }];
    var outFields = ["LOCNAME_" + MOE_map_language, "LATITUDE", "LONGITUDE", "GUIDELOC_" + MOE_map_language, "URL_" + MOE_map_language];
	
    function search() {

		var searchString = document.getElementById('map_query').value.trim();
	    if (searchString.length === 0) {
            return;
        }
		
		MESSAGE.messageStartSearching();		
		MOEMap.queryLayerWithLocator(searchString);
		
	}
	
	function searchWithParameters(searchString, isWithinExtent, isLocationSearch){
	    if (searchString.length === 0) {
            return;
        }
        MESSAGE.messageStartSearching();		
		address = searchString;
		withinExtent = isWithinExtent;
        if (isLocationSearch) {
            var coorsArray = searchString.split(/\s+/);
            var str = coorsArray.join(" ").toUpperCase();
            MOEMap.queryLayerWithLocator("UPPER(LOCNAME_" + MOE_map_language + ") LIKE '%" + str + "%'");
        } else {
            var temp = getQueryCondition(searchString);
            address = temp.information;
            MOEMap.queryLayerWithoutLocator(temp.condition);
        }		
	}
    function processAliasFishName(fishname) {
        var aliasList = {
            GERMAN_TROUT: ["BROWN_TROUT"],
            SHEEPHEAD: ["FRESHWATER_DRUM"],
            STEELHEAD: ["RAINBOW_TROUT"],
            SUNFISH: ["PUMPKINSEED"],
            BARBOTTE: ["BROWN_BULLHEAD"],
            BLACK_BASS: ["LARGEMOUTH_BASS", "SMALLMOUTH_BASS"],
            CALICO_BASS: ["BLACK_CRAPPIE"],
            CRAWPIE: ["BLACK_CRAPPIE", "WHITE_CRAPPIE"],
            GREY_TROUT: ["LAKE_TROUT"],
            HUMPBACK_SALMON: ["PINK_SALMON"],
            KING_SALMON: ["CHINOOK_SALMON"],
            LAKER: ["LAKE_TROUT"],
            MENOMINEE: ["ROUND_WHITEFISH"],
            MUDCAT: ["BROWN_BULLHEAD"],
            MULLET: ["WHITE_SUCKER"],
            PANFISH: ["BLUEGILL", "ROCK_BASS", "PUMPKINSEED"],
            PICKEREL: ["WALLEYE"],
            SILVER_BASS: ["WHITE_BASS"],
            SILVER_SALMON: ["COHO_SALMON"],
            SPECKLED_TROUT: ["BROOK_TROUT"],
            SPRING_SALMON: ["CHINOOK_SALMON"]
        };
        var alias = aliasList[fishname];
        var fish = MOEMAP_TOOLS.wordCapitalize(MOEMAP_TOOLS.replaceChar(fishname, '_', ' '));
        if (typeof(alias) == "undefined") {
            var result = {
                condition: "(SPECIES_" + MOE_map_language + " like '%" + fishname + "%')",
                information: fish
            };
            return result;
        } else {
            var res = [];
            var fishArray = [];
            for (var i = 0; i < alias.length; i++) {
                res.push("(SPECIES_" + MOE_map_language + " like '%" + alias[i] + "%')");
                var str = MOEMAP_TOOLS.wordCapitalize(MOEMAP_TOOLS.replaceChar(alias[i], '_', ' '));
                fishArray.push(str.trim());
            }
            var result = {
                condition: "(" + res.join(" OR ") + ")",
                information: fish + " (" + fishArray.join(", ") + ")"
            };
            return result;
        }
    }
    function getQueryCondition(name) {
        var str = name.toUpperCase();
        str = MOEMAP_TOOLS.replaceChar(str, '&', ', ');
        str = MOEMAP_TOOLS.replaceChar(str, ' AND ', ', ');
        str = str.trim();
        var nameArray = str.split(',');
        var max = nameArray.length;
        var res = [];
        var inform = [];
        for (var i = 0; i < max; i++) {
            var str1 = (nameArray[i]).trim();
            if (str1.length > 0) {
                var coorsArray = str1.split(/\s+/);
                str1 = coorsArray.join("_");
                var temp = processAliasFishName(str1);
                res.push(temp.condition);
                inform.push(temp.information);
            }
        }
        var result = {
            condition: res.join(" AND "),
            information: inform.join(", ")
        };
        return result;
    }
    function init() {

    }
	
    function initGoogleMap() {	
	
		var mapOptions = {
				zoom: orgzoomLevel,
				center: new google.maps.LatLng(orgLatitude, orgLongitude),
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				draggableCursor: 'pointer',
				minZoom: minMapScale,
				maxZoom: maxMapScale,			
				// every pixel is clickable.
				streetViewControl: true //my favorite feature in V3!
		}
        return new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		
    }
	
    function message(msg) {
		if(!isMobile){
			document.getElementById('information').innerHTML = msg;
		}
    }
	
    function mouseMove(event) {		
        var latLng = event.latLng;
        var lat = latLng.lat();
        var lng = latLng.lng();
        var utm = MOEMAP_TOOLS.convertLatLngtoUTM(lat, lng);
		if(!isMobile){
			if (mapConfig.language == "EN") {
				document.getElementById('coordinates').innerHTML = "Latitude:" + lat.toFixed(6) + ", Longitude:" + lng.toFixed(6) + " (UTM Zone:" + utm.Zone + ", Easting:" + utm.Easting + ", Northing:" + utm.Northing + ")";				
			} else {
				document.getElementById('coordinates').innerHTML = "Latitude:" + lat.toFixed(6) + ", Longitude:" + lng.toFixed(6) + " (Zone UTM:" + utm.Zone + ", abscisse:" + utm.Easting + ", ordonn\u00e8e:" + utm.Northing + ")";
			}
		}
		
    }
	
	function multipleTabsPopup(tabs){
		var container = document.createElement('div');
		//Only for multiple tabs. 
		
		var tabBar = new goog.ui.TabBar();
        for (i = 0; i < tabs.length; i++) {
            var tab = new goog.ui.Tab(tabs[i].label);
            tab.content = tabs[i].content;
            tabBar.addChild(tab, true);
        }
        
        container.style.width='450px';
		
		tabBar.render(container);
        goog.dom.appendChild(container, goog.dom.createDom('div', {
              'class': 'goog-tab-bar-clear'
        }));
        var contentDiv = goog.dom.createDom('div', {
             'class': 'goog-tab-content'
        });
        goog.dom.appendChild(container, contentDiv);
            
        goog.events.listen(tabBar, goog.ui.Component.EventType.SELECT, function(e) {
              contentDiv.innerHTML = e.target.content;
        });
        tabBar.setSelectedTabIndex(0);
		return container;
	}
	
    var module = {
		orgLatitude: orgLatitude,
		orgLongitude: orgLongitude,
		orgzoomLevel: orgzoomLevel,
		minMapScale: minMapScale,
		maxMapScale: maxMapScale,
	
		coor_Status: coor_Status,
		language: language,
		url: url,
		visibleLayerIds: visibleLayerIds,
		layerIds: layerIds,
		withinExtent: withinExtent,
		address: address,		
		tabs: tabs,
		outFields: outFields,
		search: search,
		init: init,
		searchWithParameters: searchWithParameters,
		initGoogleMap: initGoogleMap,
		message: message,
        mouseMove: mouseMove,
		multipleTabsPopup: multipleTabsPopup
    };
    return module;
})();


if(!isMobile){
	window.onload = function () {
		MOEMap.init();		
	}
}

var MOEMapGlobalConfig = {
    boundaryPolygon: [{
        x: -95.29920350,
        y: 48.77505703
    }, {
        x: -95.29920350,
        y: 53.07150598
    }, {
        x: -89.02502409,
        y: 56.95876930
    }, {
        x: -87.42238044,
        y: 56.34499088
    }, {
        x: -86.36531760,
        y: 55.93580527
    }, {
        x: -84.69447635,
        y: 55.45842206
    }, {
        x: -81.89837466,
        y: 55.35612565
    }, {
        x: -81.96657226,
        y: 53.17380238
    }, {
        x: -80.84131182,
        y: 52.28723355
    }, {
        x: -79.98884179,
        y: 51.80985033
    }, {
        x: -79.34096457,
        y: 51.74165273
    }, {
        x: -79.34096457,
        y: 47.54750019
    }, {
        x: -78.55669214,
        y: 46.49043736
    }, {
        x: -76.61306048,
        y: 46.14944935
    }, {
        x: -75.59009645,
        y: 45.77436253
    }, {
        x: -74.12384800,
        y: 45.91075774
    }, {
        x: -73.98745279,
        y: 45.02418891
    }, {
        x: -75.07861443,
        y: 44.61500329
    }, {
        x: -75.86288685,
        y: 44.03532368
    }, {
        x: -76.88585089,
        y: 43.69433566
    }, {
        x: -79.20,
        y: 43.450196
    }, {
        x: -78.62488975,
        y: 42.94416204
    }, {
        x: -79.54555738,
        y: 42.43268002
    }, {
        x: -81.28459623,
        y: 42.15988961
    }, {
        x: -82.54625188,
        y: 41.58020999
    }, {
        x: -83.26232670,
        y: 41.95529681
    }, {
        x: -83.36462310,
        y: 42.43268002
    }, {
        x: -82.61444948,
        y: 42.73956923
    }, {
        x: -82.17116506,
        y: 43.59203926
    }, {
        x: -82.61444948,
        y: 45.36517692
    }, {
        x: -84.08069793,
        y: 45.91075774
    }, {
        x: -84.93316796,
        y: 46.69503016
    }, {
        x: -88.27485047,
        y: 48.22947621
    }, {
        x: -89.33191330,
        y: 47.78619180
    }, {
        x: -90.32077854,
        y: 47.68389540
    }, {
        x: -92.09391619,
        y: 47.95668581
    }, {
        x: -94.07164666,
        y: 48.33177262
    }, {
        x: -95.29920350,
        y: 48.77505703
    }],
    GeogTwpService: "http://www.camaps.ca/ArcGIS/rest/services/SportFish/Geog_TWP/MapServer",
    maxQueryReturn: 500,
    predefinedLevel: 11
};

MOEMAP_TOOLS = (function () {
						  
    var monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
        monthFrenchNames = ["JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI", "JUIN", "JUILLET", "AOUT", "SEPTEMBRE", "OCTOBRE", "NOVEMBRE", "DECEMBRE"],
        monthShortNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
        monthDigitalNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    function getArrayIndex(str, strArray) {
        var index = -1;
        for (var i = 0; i < strArray.length; i++) {
            if (strArray[i] == str) {
                index = i;
                break;
            }
        }
        return index;
    }

    function wordCapitalize(str) {
        var strArray = str.trim().split(' ');
        for (var i = 0; i < strArray.length; i++) {
            strArray[i] = strArray[i].substring(0, 1).toUpperCase() + strArray[i].substring(1, strArray[i].length).toLowerCase();
        }
        return strArray.join(' ');
    }

    function processNA(str) {
        if (typeof(str) == 'undefined') {
            return "N/A";
        }
        if (str == "null") {
            return "N/A";
        }
        if (str == "Null") {
            return "N/A";
        }
        return str;
    }

    function replaceChar(str, charA, charB) {
        var temp = [];
        temp = str.split(charA);
        var result = temp[0];
        if (temp.length >= 2) {
            for (var i = 1; i < temp.length; i++) {
                result = result + charB + temp[i];
            }
        }
        return result;
    }

    function deciToDegree(degree) {
        var sym = "N";
        if (degree < 0) {
            degree = -degree;
            if (mapConfig.language == "EN") {
                sym = "W";
            } else {
                sym = "O";
            }
        }
        var deg = Math.floor(degree);
        var temp = (degree - deg) * 60;
        var minute = Math.floor(temp);
        var second = Math.floor((temp - minute) * 60);
        var res = "";
        if (second < 1) {
            res = "" + deg + "&deg;" + minute + "'";
        } else if (second > 58) {
            res = "" + deg + "&deg;" + (minute + 1) + "'";
        } else {
            res = "" + deg + "&deg;" + minute + "'" + second + "\"";
        }
        return res + sym;
    }

    function isPolylineListWithinBounds(gPolylineList, bounds) {
        if (gPolylineList.length > 0) {
            for (var x = 0; x < gPolylineList.length; x++) {
                var path = gPolylineList[x].getPath();
                var max = path.getLength();
                for(var i = 0; i < max; i++){
                    if(bounds.contains(path.getAt(i))) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function convertLatLngtoUTM(lat, lng) {
        var pi = 3.14159265358979; //PI
        var a = 6378137; //equatorial radius for WGS 84
        var k0 = 0.9996; //scale factor
        var e = 0.081819191; //eccentricity
        var e_2 = 0.006694380015894481; //e'2
        var A0 = 6367449.146;
        var B0 = 16038.42955;
        var C0 = 16.83261333;
        var D0 = 0.021984404;
        var E0 = 0.000312705;

        var zone = 31 + Math.floor(lng / 6);
        var lat_r = lat * pi / 180.0;
        var t1 = Math.sin(lat_r); // SIN(LAT)
        var t2 = e * t1 * e * t1;
        var t3 = Math.cos(lat_r); // COS(LAT)
        var t4 = Math.tan(lat_r); // TAN(LAT)
        var nu = a / (Math.sqrt(1 - t2));
        var S = A0 * lat_r - B0 * Math.sin(2 * lat_r) + C0 * Math.sin(4 * lat_r) - D0 * Math.sin(6 * lat_r) + E0 * Math.sin(8 * lat_r);
        var k1 = S * k0;
        var k2 = nu * t1 * t3 * k0 / 2.0;
        var k3 = ((nu * t1 * t2 * t2 * t2) / 24) * (5 - t4 * t4 + 9 * e_2 * t3 * t3 + 4 * e_2 * e_2 * t3 * t3 * t3 * t3) * k0;
        var k4 = nu * t3 * k0;
        var k5 = t3 * t3 * t3 * (nu / 6) * (1 - t4 * t4 + e_2 * t3 * t3) * k0;

        //var lng_r = lng*pi/180.0;
        var lng_zone_cm = 6 * zone - 183;
        var d1 = (lng - lng_zone_cm) * pi / 180.0;
        var d2 = d1 * d1;
        var d3 = d2 * d1;
        var d4 = d3 * d1;

        var x = 500000 + (k4 * d1 + k5 * d3);
        var rawy = (k1 + k2 * d2 + k3 * d4);
        var y = rawy;
        if (y < 0) {
            y = y + 10000000;
        }
        var res = {
            Zone: zone,
            Easting: x.toFixed(2),
            Northing: y.toFixed(2)
        };
        return res;
    }

    function convertUTMtoLatLng(zone, north, east) {
        var pi = 3.14159265358979; //PI
        var a = 6378137; //equatorial radius for WGS 84
        var k0 = 0.9996; //scale factor
        var e = 0.081819191; //eccentricity
        var e_2 = 0.006694380015894481; //e'2
        //var corrNorth = north; //North Hemishpe
        var estPrime = 500000 - east;
        var arcLength = north / k0;
        var e_4 = e_2 * e_2;
        var e_6 = e_4 * e_2;
        var t1 = Math.sqrt(1 - e_2);
        var e1 = (1 - t1) / (1 + t1);
        var e1_2 = e1 * e1;
        var e1_3 = e1_2 * e1;
        var e1_4 = e1_3 * e1;

        var C1 = 3 * e1 / 2 - 27 * e1_3 / 32;
        var C2 = 21 * e1_2 / 16 - 55 * e1_4 / 32;
        var C3 = 151 * e1_3 / 96;
        var C4 = 1097 * e1_4 / 512;

        var mu = arcLength / (a * (1 - e_2 / 4.0 - 3 * e_4 / 64 - 5 * e_6 / 256));
        var FootprintLat = mu + C1 * Math.sin(2 * mu) + C2 * Math.sin(4 * mu) + C3 * Math.sin(6 * mu) + C4 * Math.sin(8 * mu);
        var FpLatCos = Math.cos(FootprintLat);
        //var C1_an = e_2*FpLatCos*FpLatCos;
        var FpLatTan = Math.tan(FootprintLat);
        var T1 = FpLatTan * FpLatTan;
        var FpLatSin = Math.sin(FootprintLat);
        var FpLatSin_e = e * FpLatSin;
        var t2 = 1 - FpLatSin_e * FpLatSin_e;
        var t3 = Math.sqrt(t2);
        var N1 = a / t3;
        var R1 = a * (1 - e_2) / (t2 * t3);
        var D = estPrime / (N1 * k0);
        var D_2 = D * D;
        var D_4 = D_2 * D_2;
        var D_6 = D_4 * D_2;
        var fact1 = N1 * FpLatTan / R1;
        var fact2 = D_2 / 2;
        var fact3 = (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * e_2) * D_4 / 24;
        var fact4 = (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * e_2 - 3 * C1 * C1) * D_6 / 720;
        var lofact1 = D;
        var lofact2 = (1 + 2 * T1 + C1) * D_2 * D / 6;
        var lofact3 = (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * e_2 + 24 * T1 * T1) * D_4 * D / 120;
        var delta_Long = (lofact1 - lofact2 + lofact3) / FpLatCos;
        var zone_CM = 6 * zone - 183;
        var latitude = 180 * (FootprintLat - fact1 * (fact2 + fact3 + fact4)) / pi;
        var longitude = zone_CM - delta_Long * 180 / pi;
        var res = {
            Latitude: latitude.toFixed(8),
            Longitude: longitude.toFixed(8)
        };
        return res;
    }

    function isInPolygon(lat, lng1) {
        var lng = lng1;
        if (lng1 > 0) {
            lng = -lng;
        }
        var poly = MOEMapGlobalConfig.boundaryPolygon;
        var numPoints = poly.length;
        var inPoly = false;
        var j = numPoints - 1;
        for (var i = 0; i < numPoints; i++) {
            var vertex1 = poly[i];
            var vertex2 = poly[j];

            if (vertex1.x < lng && vertex2.x >= lng || vertex2.x < lng && vertex1.x >= lng) {
                if (vertex1.y + (lng - vertex1.x) / (vertex2.x - vertex1.x) * (vertex2.y - vertex1.y) < lat) {
                    inPoly = !inPoly;
                }
            }

            j = i;
        }
        return inPoly;
    }
    function isWithinPolygon(point, polygon){
		var lat = point.lat();
		var lng = point.lng();		
		var vertices  = polygon.getPath();
		
        var numPoints = vertices .length;
        var inPoly = false;
        var j = numPoints - 1;
        for (var i = 0; i < numPoints; i++) {
            var vertex1 = vertices.getAt(i);
            var vertex2 = vertices.getAt(j);

            if (vertex1.lng() < lng && vertex2.lng() >= lng || vertex2.lng() < lng && vertex1.lng() >= lng) {
                if (vertex1.lat() + (lng - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < lat) {
                    inPoly = !inPoly;
                }
            }

            j = i;
        }
        return inPoly;		
	}
    function isInPolygonUTM(easting, northing) {
        var minEasting = 258030.3;
        var maxEasting = 741969.7;
        var minNorthing = 4614583.73;
        var maxNorthing = 6302884.09;
        return ((easting < maxEasting) && (easting > minEasting) && (northing < maxNorthing) && (northing > minNorthing));
    }

    function isAllFloat() {
        var reg = /^(-?\d+)(\.\d+)?$/;
        for (var i = 0; i < arguments.length; i++) {
            if (!reg.test(arguments[i])) return false;
        }
        return true;
    }

    function validateLatLng(lat, lng) {
        if (isInPolygon(lat, lng)) {
            return {
                latLng: new google.maps.LatLng(lat, lng),
                success: true
            };
        }else {
            return locatorFailed();
        }
    }

    function locatorFailed() {
        return {
            success: false
        };
    }

    var module = {
        getArrayIndex: getArrayIndex,
        wordCapitalize: wordCapitalize,
        processNA: processNA,
        replaceChar: replaceChar,
        deciToDegree: deciToDegree,
        isPolylineListWithinBounds: isPolylineListWithinBounds,
        convertLatLngtoUTM: convertLatLngtoUTM,
        convertUTMtoLatLng: convertUTMtoLatLng,
        isInPolygon: isInPolygon,
		isWithinPolygon: isWithinPolygon,
        isInPolygonUTM: isInPolygonUTM,
        isAllFloat: isAllFloat,
        validateLatLng: validateLatLng,
        locatorFailed: locatorFailed
    };
    return module;
})();

TABS_CALCULATOR = (function () {
    function getContent(attributes, tabs) {
        var contents = [];
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[i];
            var tabName = getInfoWindowContent(attributes, tab.label);
            if (tabName.trim().length > 1) {
                var tabContent = getInfoWindowContent(attributes, tab.content);
                contents.push({
                    label: tabName,
                    content: tabContent
                });
            }
        }
        return contents;
    }

    function getInfoWindowContent(attributes, infoWindowString) {
        var start = infoWindowString.indexOf("[");
        var end = infoWindowString.indexOf("]");
        if ((start >= 0) && (end >= 0)) {
            infoWindowString = removeConditionInfoWindow(infoWindowString, attributes, start, end);
        }
        start = infoWindowString.indexOf("{");
        end = infoWindowString.indexOf("}");
        if ((start >= 0) && (end >= 0)) {
            infoWindowString = getInfoWindowString(infoWindowString, attributes, start, end);
        }
        return infoWindowString;
    }

    function removeConditionInfoWindow(infoWindowString, attributes, start, end) {
        var str1 = infoWindowString.substring(0, start);
        var str2 = infoWindowString.substring(start + 1, end);
        var str3 = infoWindowString.substring(end + 1);
        var index = str2.indexOf("}");
        var fieldName = str2.substring(1, index);
        var str4 = str2.substring(index + 2);
        index = str4.indexOf("?");
        var result = "";
        if (attributes[fieldName] > 0) {
            result = str1 + str4.substring(index + 1);
        } else {
            result = str1 + str4.substring(0, index);
        }
        var start1 = str3.indexOf("[");
        var end1 = str3.indexOf("]");
        if ((start1 >= 0) && (end1 >= 0)) {
            str3 = removeConditionInfoWindow(str3, attributes, start1, end1);
        }
        result = result + str3;
        return result;
    }

    function getInfoWindowString(infoWindowString, attributes, start, end) {
        var str1 = infoWindowString.substring(0, start);
        var fieldName = infoWindowString.substring(start + 1, end);
        var str3 = infoWindowString.substring(end + 1);

        var dataStr = " ";
        var funStart = fieldName.indexOf("(");
        var funEnd = fieldName.indexOf(")");
        if ((funStart >= 0) && (funEnd >= 0)) {
            var funName = fieldName.substring(0, funStart);
            var parameters = fieldName.substring(funStart + 1, funEnd);
            var paraArray = parameters.split(",");
            funName = funName + "(";
            for (var j = 0; j < paraArray.length; j++) {
                if ((paraArray[j]).indexOf("'") == -1) {
                    var attrValue = attributes[paraArray[j]];
                    if (typeof attrValue == "number") {
                        funName = funName + attrValue;
                    }
                    if (typeof attrValue == "string") {
                        if (attrValue.indexOf("'") == -1) {
                            funName = funName + "'" + attrValue + "'";
                        } else if (attrValue.indexOf('"') == -1) {
                            funName = funName + "\"" + attrValue + "\"";
                        } else {
                            funName = funName + '"' + attrValue.replace('"', '\"') + '"';
                        }
                    }
                } else {
                    funName = funName + paraArray[j];
                }
                if (j < paraArray.length - 1) {
                    funName = funName + ",";
                }
            }
            funName = funName + ");";
            dataStr = eval(funName);
        } else {
            if (attributes[fieldName] != "Null") {
                dataStr = attributes[fieldName];
            }
        }
        var start1 = str3.indexOf("{");
        var end1 = str3.indexOf("}");
        if ((start1 >= 0) && (end1 >= 0)) {
            str3 = getInfoWindowString(str3, attributes, start1, end1);
        }
        var result = str1 + dataStr + str3;
        return result;
    }
    var module = {
        getContent: getContent
    };
    return module;
})();

MESSAGE = (function () {
    function message(msg) {
        mapConfig.message(msg);
    }

    function getRegionName() {
        var regionName = "";
        if (mapConfig.language == "EN") {
            if (mapConfig.withinExtent) {
                regionName = "in the current map display";
            } else {
                regionName = "in Ontario";
            }
        } else {
            if (mapConfig.withinExtent) {
                regionName = "dans l'affichage actuel de la carte";
            } else {
                regionName = "en Ontario";
            }
        }
        return regionName;
    }

    function locatorSucceed() {
        
		var regionName = getRegionName();
        
		if (mapConfig.language == "EN") {
            message("<i>1 result found for <b>" + mapConfig.address + "</b> " + regionName + ".</i>");
        } else {
            message("<i>1 r\u00e9sultat pour <b>" + mapConfig.address + "</b> " + regionName + ".</i>");
        }
		
		// ADDED BY COMMUNICATIONS
		// -----------------------------------------------------------------------------------------------------------------------------------------------
		
		document.forms["formLocation"].submit(); 
		
		// -----------------------------------------------------------------------------------------------------------------------------------------------
		
    }

    function locatorFailed() {
        var regionName = getRegionName();
        if (mapConfig.language == "EN") {
            message("<i>Your search for <b>" + mapConfig.address + "</b> returned no result " + regionName + ".</i>");
        } else {
            message("<i>Votre recherche pour <b>" + mapConfig.address + "</b> n'a donn\u00e9 aucun r\u00e9sultat " + regionName + ".</i>");
        }
    }

    function messageStartSearching() {
        if (mapConfig.language == "EN") {
            message("<i>Searching Address</i>");
        } else {
            message("<i>Recherche des r\u00e9sultats ...</i>");
        }
    }

    function messageSearch(length) {
        var regionName = getRegionName();
        if (length === 0) {
            if (mapConfig.language == "EN") {
                message("<i>Your search for <b>" + mapConfig.address + "</b> returned no result " + regionName + ".</i>");
            } else {
                message("<i>Votre recherche pour <b>" + mapConfig.address + "</b> n'a donn\u00e9 aucun r\u00e9sultat " + regionName + ".</i>");
            }
            return;
        }
        if (length == 1) {
            if (mapConfig.language == "EN") {
                message("<i>1 result found for <b>" + mapConfig.address + "</b> " + regionName + ".</i>");
            } else {
                message("<i>1 r\u00e9sultat pour <b>" + mapConfig.address + "</b> " + regionName + ".</i>");
            }
            return;
        }
        if (length >= MOEMapGlobalConfig.maxQueryReturn) {
            if (mapConfig.language == "EN") {
                message("<i>More than " + MOEMapGlobalConfig.maxQueryReturn + " results found for <b>" + mapConfig.address + "</b> " + regionName + ". Only " + MOEMapGlobalConfig.maxQueryReturn + " returned.</i>");
            } else {
                message("<i>Plus de " + MOEMapGlobalConfig.maxQueryReturn + " r\u00e9sultats pour <b>" + mapConfig.address + "</b> " + regionName + ". Seulement 500 retourn\u00e9s.</i>");
            }
            return;
        }
        if (mapConfig.language == "EN") {
            message("<i>" + length + " results found for <b>" + mapConfig.address + "</b> " + regionName + ".</i>");
        } else {
            message("<i>" + length + " r\u00e9sultats pour <b>" + mapConfig.address + "</b> " + regionName + ".</i>");
        }
    }
    var module = {
        messageStartSearching: messageStartSearching,
        locatorSucceed: locatorSucceed,
        locatorFailed: locatorFailed,
        messageSearch: messageSearch
    };
    return module;
})();

LATLNG_LOCATOR = (function () {
    //Public method: use three methods: decimal degree, DMS, and DMS symbols to parse the input

    function process(coorsArray) {
        if (coorsArray.length != 2) {
            return MOEMAP_TOOLS.locatorFailed();
        }
        var res = processDecimalDegree(coorsArray);
        if (!res.success) {
            res = processSymbol(coorsArray);
        }
        if (!res.success) {
            res = processSymbolDMS(coorsArray);
        }
        if (res.success) {
            MOEMap.locateMap(res.latLng, 14, mapConfig.address);
        }
        return res;
    }
    //Private method: parse decimal degree.

    function processDecimalDegree(coorsArray) {
        if (MOEMAP_TOOLS.isAllFloat(coorsArray[0], coorsArray[1])) {
            var v1 = Math.abs(parseFloat(coorsArray[0]));
            var v2 = Math.abs(parseFloat(coorsArray[1]));
            var lat = Math.min(v1, v2);
            var lng = -Math.max(v1, v2);
            return MOEMAP_TOOLS.validateLatLng(lat, lng);
        } else {
            return MOEMAP_TOOLS.locatorFailed();
        }
    }
    //Private method: parse symbol degree, minute and second. Need to call parseLatLng method.

    function processSymbol(coorsArray) {
        var degreeSym = String.fromCharCode(176);
        if (((coorsArray[0]).indexOf(degreeSym) > 0) && ((coorsArray[1]).indexOf(degreeSym) > 0)) {
            v1 = parseLatLng(coorsArray[0], degreeSym, "'", "\"");
            v2 = parseLatLng(coorsArray[1], degreeSym, "'", "\"");
            var lat = Math.min(v1, v2);
            var lng = -Math.max(v1, v2);
            return MOEMAP_TOOLS.validateLatLng(lat, lng);
        } else {
            return MOEMAP_TOOLS.locatorFailed();
        }
    }
    //Private method: parse symbol (DMS) degree, minute and second. Need to call parseLatLng and validateLatLngFormat methods.

    function processSymbolDMS(coorsArray) {
        var str1 = (coorsArray[0]).toUpperCase();
        var str2 = (coorsArray[1]).toUpperCase();
        var valid = validateLatLngFormat(str1) * validateLatLngFormat(str2);
        if (valid > 0) {
            v1 = parseLatLng(str1, "D", "M", "S");
            v2 = parseLatLng(str2, "D", "M", "S");
            var lat = Math.min(v1, v2);
            var lng = -Math.max(v1, v2);
            return MOEMAP_TOOLS.validateLatLng(lat, lng);
        } else {
            return MOEMAP_TOOLS.locatorFailed();
        }
    }
    //Private method: valide whether input contains a number with D. called by processSymbolDMS

    function validateLatLngFormat(str) {
        for (var i = 0; i <= 9; i++) {
            if (str.indexOf(i + "D") > 0) {
                return 1;
            }
        }
        return 0;
    }
    //Private method: Parse the string by calling parseDMS. Called by processSymbol and processSymbolDMS

    function parseLatLng(val, s1, s2, s3) {
        var result = 0;
        var parsed = parseDMS(s1, val);
        var deg = parsed.ParsedNum;
        parsed = parseDMS(s2, parsed.Unparsed);
        var min = parsed.ParsedNum;
        parsed = parseDMS(s3, parsed.Unparsed);
        var sec = parsed.ParsedNum;
        if (deg > 0) {
            result = deg + min / 60.0 + sec / 3600.0;
        } else {
            result = deg - min / 60.0 - sec / 3600.0;
        }
        result = Math.abs(result);
        return result;
    }
    //Private method: Parse the string. called by parseLatLng

    function parseDMS(s, unparsed) {
        var res = {
            ParsedNum: 0,
            Unparsed: ""
        };
        if (unparsed.length === 0) {
            return res;
        }
        var arr = unparsed.split(s);
        var result = 0;
        if (arr.length <= 2) {
            if (MOEMAP_TOOLS.isAllFloat(arr[0])) {
                result = parseFloat(arr[0]);
            }
            if (arr.length == 2) {
                unparsed = arr[1];
            } else {
                unparsed = "";
            }
        }
        res = {
            ParsedNum: result,
            Unparsed: unparsed
        };
        return res;
    }
    var module = {
        process: process
    };
    return module;
})();

//Parse the input as UTM
UTM_LOCATOR = (function () {
    function process(coorsArray) {
        var res = processDefaultZone17(coorsArray);
        if (!res.success) {
            res = processGeneralUTM(coorsArray);
        }
        if (res.success) {
            MOEMap.locateMap(res.latLng, 14, mapConfig.address);
        }
        return res;
    }
    //Private method: Parse default UTM ZONE: 17 with only easting and northing

    function processDefaultZone17(coorsArray) {
        if (coorsArray.length != 2) {
            return MOEMAP_TOOLS.locatorFailed();
        }
        if (MOEMAP_TOOLS.isAllFloat(coorsArray[0], coorsArray[1])) {
            var v1 = Math.abs(parseFloat(coorsArray[0]));
            var v2 = Math.abs(parseFloat(coorsArray[1]));
            var v3 = Math.min(v1, v2);
            var v4 = Math.max(v1, v2);
            if (MOEMAP_TOOLS.isInPolygonUTM(v3, v4)) {
                var latlng = MOEMAP_TOOLS.convertUTMtoLatLng(17, v4, v3);
                return MOEMAP_TOOLS.validateLatLng(latlng.Latitude, latlng.Longitude);
            } else {
                return MOEMAP_TOOLS.locatorFailed();
            }
        } else {
            return MOEMAP_TOOLS.locatorFailed();
        }
    }
    //Private method: Parse general UTM with zone, easting and northing

    function processGeneralUTM(coorsArray) {
        var res = MOEMAP_TOOLS.locatorFailed();
        if (coorsArray.length != 3) {
            return res;
        }
        var a1 = (coorsArray[0]).replace(",", " ").trim();
        var a2 = (coorsArray[1]).replace(",", " ").trim();
        var a3 = (coorsArray[2]).replace(",", " ").trim();
        if (MOEMAP_TOOLS.isAllFloat(a1, a2, a3)) {
            var values = [Math.abs(parseFloat(a1)), Math.abs(parseFloat(a2)), Math.abs(parseFloat(a3))];
            values.sort(function (a, b) {
                return a - b;
            });
            var zoneStr = (values[0]).toString(); //zone
            var reg_isInteger = /^\d+$/;
            if (reg_isInteger.test(zoneStr)) {
                if ((values[0] >= 15) && (values[0] <= 18)) {
                    if (MOEMAP_TOOLS.isInPolygonUTM(values[1], values[2])) {
                        var latlng = MOEMAP_TOOLS.convertUTMtoLatLng(values[0], values[2], values[1]); //Zone, Northing, Easting
                        return MOEMAP_TOOLS.validateLatLng(latlng.Latitude, latlng.Longitude);
                    }
                }
            }
        }
        return res;
    }
    var module = {
        process: process
    };
    return module;
})();

//Parse the input as Township, Lot, Concession
TWP_LOCATOR = (function () {
    //Public method: parse the input as Township, Lot, Concession information by calling preprocessTWP, getTWPContentLevel, getCentroidAndAddPolylines

    function process(coorsArray) {
        var coors_Up = coorsArray.join(' ').toUpperCase();
        var twpInfo = preprocessTWP(coors_Up);

        if (twpInfo.success) {
            var levelContent = getTWPContentLevel(twpInfo);
            var params = {
                returnGeometry: true,
                outFields: ["CENX", "CENY"]
            };
            var layerId;
            if (twpInfo.isTWPOnly) {
                params.where = "NAME = '" + twpInfo.TWP + "'";
                layerId = 0; //Twp layer
            } else {
                params.where = "OFFICIAL_NAME_UPPER = '" + twpInfo.TWP + "' AND CONCESSION_NUMBER = 'CON " + twpInfo.Con + "' AND LOT_NUM_1 = 'LOT " + twpInfo.Lot + "'";
                layerId = 1; //Lot Con layer
            }
            var layer = new gmaps.ags.Layer(MOEMapGlobalConfig.GeogTwpService + "/" + layerId);
            layer.query(params, function (fset) {
                if (fset.features.length > 0) {
                    MOEMap.locateMap(getCentroid(fset), levelContent.level, levelContent.content);
                }
            });
            return {
                success: true
            };
        } else {
            return MOEMAP_TOOLS.locatorFailed();
        }
    }
    //Private method: parse the input to get Township, Lot, Concession by calling processLotCon

    function preprocessTWP(coors_Up) {
        var res = {
            TWP: "",
            Lot: "",
            Con: "",
            isTWPOnly: false,
            success: false
        };
        if (coors_Up.indexOf(' TWP') > 0) {
            res = processLotCon(coors_Up.split(" TWP"));
        }
        if (!res.success) {
            if (coors_Up.indexOf(' TOWNSHIP') > 0) {
                res = processLotCon(coors_Up.split(" TOWNSHIP"));
            }
        }
        if (!res.success) {
            if (coors_Up.indexOf('CANTON ') === 0) {
                var str = coors_Up.substring(7).trim();
                var lotIndex = str.indexOf(" LOT ");
                var conIndex = str.indexOf(" CON ");
                var index = lotIndex;
                if (conIndex < lotIndex) {
                    index = conIndex;
                }
                var parsedList = [];
                if (index === -1) {
                    parsedList.push(str);
                    parsedList.push("");
                } else {
                    parsedList.push(str.substring(0, index));
                    parsedList.push(str.substring(index));
                }
                res = processLotCon(parsedList);
            }
        }
        return res;
    }
    //Private method: parse the input to get Lot, Concession

    function processLotCon(arr1) {
        if (arr1.length != 2) {
            return {
                TWP: "",
                Lot: "",
                Con: "",
                isTWPOnly: false,
                success: false
            };
        }
        var TWPname = (arr1[0]).trim().split(/\s+/).join(' '); //replace multiple spaces with one space
        var con = "";
        var lot = "";
        if (((arr1[1]).indexOf("LOT") > 0) && ((arr1[1]).indexOf("CON") > 0)) {
            var arr2 = ((arr1[1]).trim()).split("CON");
            if ((arr2[0]).length === 0) {
                var arr3 = (arr2[1]).split("LOT");
                con = (arr3[0]).trim();
                lot = (arr3[1]).trim();
            } else {
                var arr4 = (arr2[0]).split("LOT");
                con = (arr2[1]).trim();
                lot = (arr4[1]).trim();
            }
        }
        var TWPOnly = false;
        if ((con.length === 0) && (lot.length === 0)) {
            TWPOnly = true;
        }
        return {
            TWP: TWPname,
            Lot: lot,
            Con: con,
            isTWPOnly: TWPOnly,
            success: true
        };
    }
    //Private method: get the pop up content and zoom level

    function getTWPContentLevel(twpInfo) {
        var content = "";
        var level = 14;
        if (twpInfo.isTWPOnly) {
            level = 11;
            if (mapConfig.language == "EN") {
                content = MOEMAP_TOOLS.wordCapitalize(twpInfo.TWP) + " Township";
            } else {
                content = "Canton " + MOEMAP_TOOLS.wordCapitalize(twpInfo.TWP);
            }
        } else {
            if (mapConfig.language == "EN") {
                content = MOEMAP_TOOLS.wordCapitalize(twpInfo.TWP) + " Township, Con " + twpInfo.Con + ", Lot " + twpInfo.Lot;
            } else {
                content = "Canton " + MOEMAP_TOOLS.wordCapitalize(twpInfo.TWP) + ", Con " + twpInfo.Con + ", Lot " + twpInfo.Lot;
            }
        }
        return {
            content: content,
            level: level
        };
    }
    //Private method: get the centroid and add the polylines

    function getCentroid(fset) {
        var totalX = 0;
        var totalY = 0;
        var totalArea = 0;
        for (var polygonIndex = 0; polygonIndex < fset.features.length; polygonIndex++) {
            var att = fset.features[polygonIndex].attributes;
            var area = 0;
            for (var geometryIndex = 0; geometryIndex < fset.features[polygonIndex].geometry.length; geometryIndex++) {
                var gpolygon = fset.features[polygonIndex].geometry[geometryIndex];
                area = area + google.maps.geometry.spherical.computeArea(gpolygon.getPath());
                MOEMap.addPolyline(gpolygon);
            }
            totalY = totalY + (att.CENY * area);
            totalX = totalX + (att.CENX * area);
            totalArea = totalArea + area;
        }
		
		return new google.maps.LatLng(totalY/totalArea, totalX/totalArea);
    }
    var module = {
        process: process
    };
    return module;
})();

ADDRESS_LOCATOR = (function () {
    //Public method: parse the input as address information by calling isContarionOntario and showRevGeocodeResult

    function process(address) {
        var geocoder = new google.maps.Geocoder();
        var addressStr = address;
        if (!isContarionOntario(addressStr)) {
            addressStr = addressStr + " Ontario";
        }
        geocoder.geocode({
            'address': addressStr
        }, showRevGeocodeResult);
    }
    //Private method: test whether the input contains keywords by calling testOntario

    function isContarionOntario(addressStr) {
        var address = addressStr.toUpperCase();
        var res = testOntario(address, "ON");
        if (!res) {
            res = testOntario(address, "ONT");
        }
        if (!res) {
            res = testOntario(address, "ONTARIO");
        }
        return res;
    }
    //Private method: test whether the input contains keywords

    function testOntario(address, str) {
        if (address.length > str.length + 1) {
            var substr = address.substring(address.length - str.length - 1);
            if (substr == (" " + str) || substr == ("," + str)) {
                return true;
            }
        }
        return false;
    }

    function showRevGeocodeResult(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var max = results.length;
            var notMoved = true;
            for (var i = 0; i < max; i++) {
                var point = results[i].geometry.location;
                if (MOEMAP_TOOLS.isInPolygon(point.lat(), point.lng())) {
                    MOEMap.locateMap(point, 12, results[i].formatted_address);
                    notMoved = false;
                    break;
                }
            }
            if (notMoved) {
                MESSAGE.locatorFailed();
            }
        } else {
            MESSAGE.locatorFailed();
        }
    }
    var module = {
        process: process
    };
    return module;
})();

LOCATOR = (function () {
    function locate(address) {
        var coors = MOEMAP_TOOLS.replaceChar(address, ',', ' ');
        var coorsArray = coors.split(/\s+/);
        var res = LATLNG_LOCATOR.process(coorsArray);
        if (!res.success) {
            res = UTM_LOCATOR.process(coorsArray);
        }
        if (!res.success) {
            res = TWP_LOCATOR.process(coorsArray);
        }
        if (!res.success) {
            res = ADDRESS_LOCATOR.process(address);
        }
    }
    var module = {
        locate: locate
    };
    return module;
})();

MOEMap = (function () {
					
    var gmap, mapOverlayer;
    var infoWindow = new google.maps.InfoWindow({
        content: ""
    });
    var addressMarker = null;
    var gmapPolylineList = [];
    var gOverlays = [];
	function initPrototype(){

        if (!('trim' in String.prototype)) {
            String.prototype.trim = function () {
                return this.replace(/^\s+|\s+$/g, "");
            };
        }
        Array.prototype.contains = function (element) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == element) {
                    return true;
                }
            }
            return false;
        }	
	}

    function init(map) {

    	mapConfig.init();
		initPrototype();
        //IE 6 does not support trim for string. Add this for IE6
		if(typeof map == "undefined"){
			gmap = mapConfig.initGoogleMap();
		}else{
			gmap = map;
		}
		/*
        var mapService = new gmaps.ags.MapService(mapConfig.url);
        mapOverlayer = new gmaps.ags.MapOverlay(mapService); //, { opacity: 0.5 });
        mapOverlayer.setMap(gmap);
		
		google.maps.event.addListener(mapService, "load", function(){
			for(var i=0;i<mapService.layers.length;i++){
				if(mapConfig.visibleLayerIds.contains(i)){
					mapService.getLayer(i).visible = true;
				}else{
					mapService.getLayer(i).visible = false;			
				}
			}
			mapOverlayer.refresh();		
		});
        if (mapConfig.coor_Status) {
            google.maps.event.addListener(gmap, "mousemove", mapConfig.mouseMove);
        }
		google.maps.event.addListener(gmap, "maptypeid_changed", function(){
			updateMapOverlayer();
		});
        google.maps.event.addListener(gmap, 'click', function (evt) {
            mapService.identify({
                'geometry': evt.latLng,
                'tolerance': 6,
                'layerIds': mapConfig.layerIds,
                'layerOption': 'all',
                'bounds': gmap.getBounds(),
                'width': gmap.getDiv().offsetWidth,
                'height': gmap.getDiv().offsetHeight
            }, function (results, err) {
                if (err) {
                    alert(err.message + err.details.join('\n'));
                } else {
					if(!isMobile){
						addResultToMap(results, evt.latLng);
					}else{
						addResultToMobileMap(results, evt.latLng);
					}				
                }
            });
        });*/
    }
	/*
	function addResultToMobileMap(response, latlng) {
		var idResults = response.results;
        var count = idResults.length;
		if(count > 0){
			MOE_INFO_FORM.initMOEInfoForm(idResults).show();
		}
	}
    function addResultToMap(response, latlng) {
        var idResults = response.results;
        var count = idResults.length;
        if (count === 0) {
            if (infoWindow) {
                infoWindow.close();
            }
            return;
        }
        var attributes = idResults[0].feature.attributes;
        var contents = TABS_CALCULATOR.getContent(attributes, mapConfig.tabs);
        var container = (contents[0]).content;
		if(contents.length > 1){
			container = mapConfig.multipleTabsPopup(contents);
		}					
		
        if (!infoWindow) {
            infoWindow = new google.maps.InfoWindow({
                content: container,
                position: latlng
            });
        } else {
            infoWindow.setContent(container);
            infoWindow.setPosition(latlng);
        }
        infoWindow.open(gmap);
    }
	*/
    function entsub(event) {
        if (event && event.which == 13) {
            mapConfig.search();
        } else {
            return true;
        }
    }
	function updateMapOverlayer(){
		//mapOverlayer.setMap(null);					
		//mapOverlayer.setMap(gmap);									
	}
	
	function createMuncipalityMarker(point, content, zoomlevel){
		var mapService = new gmaps.ags.MapService("http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/waste/MapServer"); // added by communications
		var layersIds = [0, 1, 2];
		mapService.identify({
            'geometry': point,
                'tolerance': 1,
                'layerIds': layersIds,
                'layerOption': 'all',
                'bounds': gmap.getBounds(),
                'width': gmap.getDiv().offsetWidth,
                'height': gmap.getDiv().offsetHeight
        }, function (results, err) {
                if (err) {
                    alert(err.message + err.details.join('\n'));
                } else {
					
					// added by communications -------------------------------------------------------------------------
					
					var expression = /[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d/;
					var postalIndex = content.search(expression);
					var postalCode = content.substring(postalIndex,postalIndex + 7);
					postalCode = postalCode.replace(" ","");
					
					if (postalIndex == -1) {
						document.getElementById('postal_field').value = "";
					} else {
						document.getElementById('postal_field').value = postalCode;
					}
					
					// added by communications -------------------------------------------------------------------------
					
					addResultToMap(results, point, content, zoomlevel);	
					
                }
        });

	}
	
	function getPolyIndex(point, polyArr){
		for(var i=0; i< polyArr.length;i++){
			var poly = (polyArr[i]).feature.geometry[0];
		    //console.log(poly instanceof google.maps.Polygon);			
			if(MOEMAP_TOOLS.isWithinPolygon(point, poly)){				
				return i;
			}
		}
		return 0;
	}
	function getContent(name, point, polyArr){
		if(polyArr.length === 0){
			return "";
		}
		var index = 0;
		if(polyArr.length>1){
			index = getPolyIndex(point, polyArr);
		}
		var poly = (polyArr[index]).feature.geometry[0];
		//addMuncipalityPolyline(name, poly);
		var attributes = (polyArr[index]).feature.attributes;
		
		updateDiv(name, MOEMAP_TOOLS.wordCapitalize(attributes["LEGAL_NAME"]));
		return name + " <strong>" + MOEMAP_TOOLS.wordCapitalize(attributes["LEGAL_NAME"]) + "</strong>";			
	}
	
	function updateDiv(name, str){
		if(name == "District"){
			document.getElementById('district').value = str; // modified by communications
		}
		if(name == "Single Lower Tier"){
			document.getElementById('lower').value = str; // modified by communications	
		}
		if(name == "Upper Tier"){
			document.getElementById('upper').value = str; // modified by communications
		}		
	}
	function addMuncipalityPolyline(name, polygon){
		//console.log(polygon.getPaths().getLength());
		var color = "";
		var weight = 1;
		if(name == "District"){
			color = '#8583f3';
			weight = 2;
		}
		if(name == "Single Lower Tier"){
			color = '#0083f3';
			weight = 4;			
		}
		if(name == "Upper Tier"){
			color = '#858300';
			weight = 4;			
		}		
		var max = polygon.getPaths().getLength();
		for(var i=0;i<max;i++){		
			var polyline = new google.maps.Polyline({    
				path: polygon.getPaths().getAt(i),    
				//strokeColor: '#8583f3',    
				strokeColor: color,    
				strokeOpacity: 1,    
				//strokeWeight: 4  
				strokeWeight: weight  
			});		
			polyline.setMap(gmap);
			gmapPolylineList.push(polyline);		
		}
	}

	function addResultToMap(idresults, point, content, zoomlevel){
		var res = idresults.results;
        //var layers = [[], [], []];
		var recArray0 = [];
		var recArray1 = [];
		var recArray2 = [];		
		for (var i = 0; i < res.length; i++) {
			var result = res[i];
			switch(result.layerId) {
              case 0:
                recArray0.push(result);
                break;
              case 1:
                recArray1.push(result);
                break;
              case 2:
                recArray2.push(result);
                break;
            }			
		}
		
		var content0 = getContent("District", point, recArray0);
		var content1 = getContent("Single Lower Tier", point, recArray1);
		var content2 = getContent("Upper Tier", point, recArray2);		
		//console.log(recArray0.length);
		//console.log(recArray1.length);
		//console.log(recArray2.length);		
		/*
		//console.log(res.length);
        for (var i = 0; i < res.length; i++) {
		    var result = res[i];
            for (var geometryIndex = 0; geometryIndex < result.feature.geometry.length; geometryIndex++) {
                var gpolygon = result.feature.geometry[geometryIndex];
                MOEMap.addPolyline(gpolygon);
            }		
			var label = "";
			//console.log(result.feature.geometry.length);
			//console.log(result.feature.attributes["LEGAL_NAME"]);
			switch(result.layerId) {
              case 0:
                label = "District: ";
                break;
              case 1:
                label = "Single Lower Tier: ";
                break;
              case 2:
                label = "Upper Tier: ";
                break;
            }
			var attributes = result.feature.attributes;			
			content += "<br>" + label + ": <strong>" + MOEMAP_TOOLS.wordCapitalize(attributes["LEGAL_NAME"]) + "</strong>";
			//console.log(attributes["LEGAL_NAME"]);
            //layers[result.layerId].push(result);
        }*/
		content = content + "<br>" + content0 + "<br>" + content1 + "<br>" + content2;
		addressMarker = new google.maps.Marker({
			position: point,
			map: gmap
		});
		(function (content, addressMarker) {		
						google.maps.event.addListener(addressMarker, 'click', function () {
						infoWindow.setContent("<div style=\"width:300px;height:100px;overflow:auto;font-size:small\">" + content.trim() + "</div>");
						infoWindow.setPosition(addressMarker.getPosition());
						infoWindow.open(gmap);
						});
		})(content, addressMarker)		
		var bounds = gmap.getBounds();
        locatorMessage(bounds, point);		
         if (!mapConfig.withinExtent) {
            gmap.setCenter(point);
            gmap.setZoom(zoomlevel);
			updateMapOverlayer();
        }
	}
    //Public method: called by locator methods and add a address Marker
    function locateMap(point, zoomlevel, content) {

        /*addressMarker = new google.maps.Marker({
            position: point,
            map: gmap
        });*/
		createMuncipalityMarker(point, content, zoomlevel);
        /*(function (content, addressMarker) {
            google.maps.event.addListener(addressMarker, 'click', function () {
                infoWindow.setContent(content.trim());
                infoWindow.setPosition(addressMarker.getPosition());
                infoWindow.open(gmap);
            });
        })(content, addressMarker)*/
    }
    //private method: called by locateMap method to move the maps and inform users

    function locatorMessage(bounds, point) {
        if (mapConfig.withinExtent) {
            if ((typeof gmapPolylineList != "undefined") && (MOEMAP_TOOLS.isPolylineListWithinBounds(gmapPolylineList, bounds))) {
                MESSAGE.locatorSucceed();
                return;
            }
            if (!bounds.contains(point)) {
                MESSAGE.locatorFailed();
            } else {
                MESSAGE.locatorSucceed();
            }
        } else {
            MESSAGE.locatorSucceed();
        }
    }

    function queryLayerWithLocator(where) {
		clearMap();
		LOCATOR.locate(where);
        //queryLayer(where, true);
    }

    function queryLayerWithoutLocator(where) {
        queryLayer(where, false);
    }

    function queryLayer(where, withLocator) {
        clearMap();
        var layer = new gmaps.ags.Layer(mapConfig.url + "/" + mapConfig.layerIds[0]);
        var params = {
            returnGeometry: true,
            where: where,
            outFields: mapConfig.outFields
        };
        if (mapConfig.withinExtent) {
        	params.geometry = gmap.getBounds();
        }
        layer.query(params, function (fset) {
			if((typeof fset.features !== "undefined")&&(fset.features.length>0)){
			    var size = fset.features.length;
                var bounds = new google.maps.LatLngBounds();
                for (var x = 0; x < size; x++) {
                    var findResult = fset.features[x];
                    var gLatLng = findResult.geometry[0].getPosition();
                    if (!mapConfig.withinExtent) {
                        bounds.extend(gLatLng);
                    }
                    var attributes = findResult.attributes;
                    var contents = TABS_CALCULATOR.getContent(attributes, mapConfig.tabs);
                    var content = (contents[0]).content;
					if(contents.length > 1){
						content = mapConfig.multipleTabsPopup(contents);
					}					
                    var marker = new google.maps.Marker({
                        position: gLatLng,
                        map: gmap
                    });
                    (function (content, marker) {
                        google.maps.event.addListener(marker, 'click', function () {
                            infoWindow.setContent(content);
                            infoWindow.setPosition(marker.getPosition());
                            infoWindow.open(gmap);
                        });
                    })(content, marker)
                    gOverlays.push(marker);
                }
                if (!mapConfig.withinExtent) {
                    gmap.fitBounds(bounds);
                    var zoomLevel = gmap.getZoom();
                    if (zoomLevel > MOEMapGlobalConfig.predefinedLevel) {
                        gmap.setZoom(MOEMapGlobalConfig.predefinedLevel);
                    }
					updateMapOverlayer();
                }
                MESSAGE.messageSearch(size);
            } else {
                if (withLocator) {
                    LOCATOR.locate(mapConfig.address);
                } else {
                    MESSAGE.messageSearch(0);
                }
            }
        });
    }

    function clearMap() {
        if (addressMarker !== null) {
            addressMarker.setMap(null);
        }
        addressMarker = null;
        if (infoWindow) {
            infoWindow.close();
        }
        for (var x = 0; x < gmapPolylineList.length; x++) {
            (gmapPolylineList[x]).setMap(null);
        }
        gmapPolylineList = [];
        for (var x = 0; x < gOverlays.length; x++) {
            (gOverlays[x]).setMap(null);
        }
        gOverlays = [];
    }
	function addPolyline(polygon){
		//console.log(polygon.getPaths().getLength());
		var max = polygon.getPaths().getLength();
		for(var i=0;i<max;i++){		
			var polyline = new google.maps.Polyline({    
				path: polygon.getPaths().getAt(i),    
				strokeColor: '#8583f3',    
				strokeOpacity: 1,    
				strokeWeight: 4  
			});		
			polyline.setMap(gmap);
			gmapPolylineList.push(polyline);		
		}
	}
    var module = {		
        init: init,
        entsub: entsub,
        locateMap: locateMap,
        addPolyline: addPolyline,
        queryLayerWithLocator: queryLayerWithLocator,
        queryLayerWithoutLocator: queryLayerWithoutLocator
    };
    return module;
})();
