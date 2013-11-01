globalConfig.usejQueryUITable = false;
globalConfig.usePredefinedMultipleTabs = false;
globalConfig.useSystemDefinedInit = false;
globalConfig.locationServicesList = [];
       
  
var svc1, map, res1, iw, ovs1 = [], layers;
var inaddress, inlatlng, marker1;

var ovOptions = {
  polylineOptions: {
    strokeColor: '#FF0000',
    strokeWeight: 4
  },
  polygonOptions: {
    fillColor: '#FFFF99',
    fillOpacity: 0.5,
    strokeWeight: 2,
    strokeColor: '#FF0000'
  }
};
function init() {
  inaddress = decodeURIComponent(getRequestParameter("address"));  
 //alert(inaddress);   
  inaddress = inaddress.replace(",", " "); 
  //console.log(inaddress);




  /*
  var myOptions = {
    'zoom': 16,
    //'center': new google.maps.LatLng(42.579693,-83.28072),
	'center': new google.maps.LatLng(44.474775, -80.31),
	//'center': inlatlng,
    'mapTypeId': google.maps.MapTypeId.ROADMAP,
    //'draggableCursor': 'pointer', // every pixel is clickable.
    'streetViewControl': true //my favorite feature in V3!
  };*/
  
  
    var myOptions = {
    'zoom': 5,
    //'center': new google.maps.LatLng(42.579693,-83.28072),
	'center': new google.maps.LatLng(49.764775,-85.323214),
	//'center': new google.maps.LatLng(44.474775, -80.31),
	//'center': inlatlng,
    'mapTypeId': google.maps.MapTypeId.ROADMAP,
    //'draggableCursor': 'pointer', // every pixel is clickable.
    'streetViewControl': true //my favorite feature in V3!
  };
  
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	//var url = 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/BloomfieldHillsMichigan/Parcels/MapServer'; 
	var url ='http://138.218.29.100/ArcGIS/rest/services/DevZita/GOOGLE_AGS_IDS1/MapServer';
	svc1 = new gmaps.ags.MapService(url);
   
	codeAddress(inaddress);

 /* var queryParams = {
		address: inaddress,
		callback: callbackAddressLocator
   }; 
   //alert(inaddress);
   LOCATOR.locate(queryParams);*/
}


 function codeAddress(inaddress) {

    var address = inaddress;

    clearOverlays();    
    var queryParams = {
		address: address,
		callback: callbackAddressLocator
	};
	LOCATOR.locate(queryParams);

 }
    
function callbackAddressLocator(queryParams)
{

    inlatlng = queryParams.gLatLng;
	//console.log(inlatlng.lat());
	//console.log(inlatlng.lng());	
	if(!inlatlng)
	{
		//map.setCenter(new google.maps.LatLng(44.474775, -80.31));	
		map.setCenter(new google.maps.LatLng(49.764775,-85.323214));
		map.setZoom(5);
		alert("Location cannot be found.");
	}
	else
	{
		//console.log(inlatlng);
		//console.log("start...");
		identify(inlatlng);
	}
}

function identify(latlng) {
	clearOverlays();
	//console.log("OK.");
	map.setCenter(latlng);
	map.setZoom(16);
	  if (typeof latlng === 'string') {
    alert("this is1111 a string");
} else {
    alert("this is not a string");
	};
	if (res1) 
		res1.length = 0;
	  svc1.identify({
		'geometry': latlng,
		'tolerance': 3,
		'layerIds': [0,1,2,3,4],
		//'layerIds': [0],
		'layerOption': 'all',
		'bounds': map.getBounds(),
		'width': map.getDiv().offsetWidth,
		'height': map.getDiv().offsetHeight,
		'overlayOptions': ovOptions
	  }, function(results, err) {
		if (err) {
		  alert(err.message + err.details.join('\n'));
		} else {
			//console.log("OK!!!");
		    addResultToMap(results, latlng);
		}
	});
}


function getRequestParameter(parameter) { 
  var loc = location.search.substring(1, location.search.length);
  var param_value = false;
  var params = loc.split("&");
  for (i=0; i<params.length;i++) {
      param_name = params[i].substring(0,params[i].indexOf('='));
      if (param_name == parameter) {
          param_value = params[i].substring(params[i].indexOf('=')+1)
      }
  }
  if (param_value) {
      return param_value;
  }
  else {
      return null; //Here determine return if no parameter is found
  }
}


function clearOverlays() {
  if (ovs1) {
    for (var i = 0; i < ovs1.length; i++) {
      ovs1[i].setMap(null);
    }
    ovs1.length = 0;
  }
    //if (marker) {
    //    marker.setMap(null);
    //}
}

function ClipBoard() 
{
	holdtext.innerText = copytext00.innerText + "," + copytext0.innerText + "," + copytext1.innerText + ","  + copytext3.innerText + "," + copytext4.innerText;
	Copied = holdtext.createTextRange();
	Copied.execCommand("Copy");
}

function addResultToMap(idresults, latlng) {
    res1 = idresults.results;
    layers = { "0": [], "1": [], "2": [], "3": [], "4": []};
    for (var i = 0; i < res1.length; i++) {
        var result = res1[i];
        layers[result['layerId']].push(result);
    }
          
	var content = "";
    for (var layerId in layers) {
        var results = layers[layerId];
        var count = results.length;
		var utm = globalConfig.convertLatLngtoUTM(latlng.lat(),latlng.lng());
        var label = "";
        
		switch(layerId) {
			case "0":
				label = "MOE District";
				content += "<font style='font-family: arial; font-size: 11pt; color: #347235;'><b>Coordinates (Lat, Long): </b><SPAN ID='copytext00'>" + latlng.lat().toFixed(6) + ", " + latlng.lng().toFixed(6) + "<br>";
				content += "<b>UTM Zone, Easting, Northing: </b>" + utm.Zone + ", " + utm.Easting + ", " + utm.Northing + "</span></font><br><br><font style='font-family: arial; font-size: 11pt; color: #544E4F'><b>MOE District</b> Total features returned: <b>" + count + "</b></font><br>";				
                if (count == 0) break;
                content += "<table style='font-family: arial;font-size:9pt;'><SPAN ID='copytext0'>";
                for (var j = 0; j < count; j++) {
                  var attributes = results[j].feature.attributes;
                  content += "<tr>";
                  content += "<td><i>District Name: <a href='javascript:void(0)' onclick='showFeature(" + layerId + "," + j + ")'>" + attributes["MOE DISTRICT"]  + "</i></a></td>";
                  content += "</tr>";
                }
                content += "</span></table>";
                break;
            case "1":
                label = "Assessment Parcel";
                content += "<font style='font-family: arial; font-size: 11pt;color: #544E4F;'><b>Assessment Parcel</b> Total features returned: <b>" + count + "</b><br>";
                if (count == 0) break;				
                content += "<table style='font-family: arial;font-size:9pt;'><SPAN ID='copytext1'>";
                for (var j = 0; j < count; j++) {
                  var attributes = results[j].feature.attributes;
                  content += "<tr>";
                  content += "<td><i>ARN: <a href='javascript:void(0)' onclick='showFeature(" + layerId + "," + j + ")'>" + attributes["Assessment Roll Number (ARN)"]  + "</i></a></td>";
				  content += "<td style='font-family: arial; font-size:8pt;'><i>" + attributes["MPAC Street Address"]  + "</i></td>";
				  content += "<td style='font-family: arial; font-size:8pt;'><i>" + attributes["MPAC Taxation Municipality"]  + "</i></td>";
                  content += "</tr>";
                }
                content += "</span></table>";
                break;
            case "2":
                label = "Ownership Parcel";
                content += "<font style='font-family: arial; font-size: 11pt;color: #544E4F;'><b>Ownership Parcel</b> Total features returned: <b>" + count + "</b><br>";
                if (count === 0) {
                  break;
                }
                //content += "<table border='1'><tr><th>PIN</th></tr>";
				content += "<table style='font-family: arial;font-size:9pt;'><SPAN ID='copytext2'>";
                for (var j = 0; j < count; j++) {
                  var attributes = results[j].feature.attributes;
                  content += "<tr>";
                  content += "<td><i>PIN: <a href='javascript:void(0)' onclick='showFeature(" + layerId + "," + j + ")'>" + attributes["PARCEL IDENT (PIN)"]  + "</i></td>";
                  content += "</tr>";
                }
                content += "</span></table>";
                break;
			case "3":
                label = "Lot and Concession";
                content += "<font style='font-family: arial; font-size: 11pt;color: #544E4F;'><b>Lot and Concession</b> Total features returned: <b>" + count + "</b><br>";
                if (count == 0)  break;
                content += "<table style='font-family: arial;font-size:9pt;'><SPAN ID='copytext3'>";
                for (var j = 0; j < count; j++) {
                  var attributes = results[j].feature.attributes;
                  content += "<tr>";
                  content += "<td><i><a href='javascript:void(0)' onclick='showFeature(" + layerId + "," + j + ")'>" + attributes["LABEL"]  + "</i></a></td>";
                  content += "</tr>";
                }
                content += "</span></table>";
                break;
			case "4":
                label = "Geographic Township";
                content += "<font style='font-family: arial; font-size: 11pt;color: #544E4F;'><b>Geographic Township</b> Total features returned: <b>" + count + "</b><br>";
                if (count == 0) break;
                content += "<table style='font-family: arial;font-size:9pt;'><SPAN ID='copytext4'>";
                for (var j = 0; j < count; j++) {
                  var attributes = results[j].feature.attributes;
                  content += "<tr>";
                  content += "<td><i><a href='javascript:void(0)' onclick='showFeature(" + layerId + "," + j + ")'>" + attributes["OFFICIAL NAME"]  + "</i></a></td>";
                  content += "</tr>";
                }
                content += "</span><tr><td><TEXTAREA ID='holdtext' STYLE='display:none;'></TEXTAREA></td></tr></table>";
                break;		
        }
	}
	content += "<BUTTON onClick='ClipBoard();'>Confirm - copy info to clipboard</BUTTON>";
	//map.setCenter(latlng);
    initInfoWindow(content, latlng);
	iw.open(map);
	initMarker(latlng);
}

function initInfoWindow(content, latlng)
{
	if (!iw) {
        iw = new google.maps.InfoWindow({
			content: content,
			position: latlng
		});
			 
    } else {
        iw.setContent(content);
        iw.setPosition(latlng);	
    }
}


function initMarker(latlng)
{
	if(!marker1)
	{
		marker1 = new google.maps.Marker({     
			position: latlng,  
			draggable: true,   
			map: map,     
			title: 'Click to see more info'   
		});
		
		google.maps.event.addListener(marker1, 'click', function(){
			iw.close();
			iw.open(map);
		});
	
		google.maps.event.addListener(marker1, 'dragstart', function(){
			iw.close();
			clearOverlays();
			inlatlng = "";
		});
			
		google.maps.event.addListener(marker1, 'dragend', function () {	
			inlatlng = marker1.getPosition();	
			map.setCenter(inlatlng);
			identify(inlatlng);
		});
	}
	else
	{
		marker1.setPosition(latlng);
		marker1.setMap(map);
	}	
}

function showFeature(layerId, index) {
    window.status = 'showFeature';
    clearOverlays();
    var idResult = layers[layerId][index];
    var f = idResult.feature;
    if (f.geometry) {
        for (var i = 0; i < f.geometry.length; i++) {
			ovs1.push(f.geometry[i]);
            f.geometry[i].setMap(map);
        }
    }
}
        
window.onload = init;
window['showFeature'] = showFeature;