globalConfig.opacity = 0.7;
globalConfig.orgLatitude = 45.44424;
globalConfig.orgLongitude = -83.056943;
globalConfig.orgzoomLevel = 6;

//globalConfig.url = "http://lrctptvsuaap004/ArcGIS/rest/services/Interactive_Map_Internal/SWP_vsa_maximum_UAT/MapServer";

//http://lrctptvsuaap004/ArcGIS/rest/services/Interactive_Map_Internal/SWP_Policy/MapServer
globalConfig.usePredefinedMultipleTabs = true;
globalConfig.usejQueryUITable = true; 
globalConfig.isRoutingServiceAvailable = false;
globalConfig.attributeSearchItems = [{field: "ClientName"}];
globalConfig.tableSimpleTemplate = {
		title: "Note: The Distance(KM) column represents the distance between your search location and the permit location in the specific row. Data is in English only.", 
		content:[
				{name: "Client Name", value: "{ClientName}"}, 
				{name: "Site Number", value: "{SiteNumber}"}, 
				{name: "CofA Number", value: "{CofANumber}"}, 				
				{name: "Instrument Type", value: "{InstrumentType}"}, 
				{name: "SPA", value: "{LABEL}"}, 
				{name: "IPZ", value: "{globalConfig.processNA(IPZ_Type)} <strong>{globalConfig.processNA(vss_vulnerabilityScore)}</strong>"},
				{name: "WHPA", value: "{globalConfig.processNA(WHPAA)} <strong>{globalConfig.processNA(vsg_vulnerabilityScore)}</strong>"}
				//{name: "Ground W. Score", value: "{globalConfig.processNA(vsg_vulnerabilityScore)}"},
				//{name: "Surface W. Score", value: "{globalConfig.processNA(vss_vulnerabilityScore)}"}				
				]	
	};
globalConfig.tabsTableTemplate = [{
		label:"Information",
		content:globalConfig.tableSimpleTemplate.content/*[
				{name: "Permit Number", value: "{PERMITNO}"}, 
				{name: "Client Name", value: "{CLIENTNAME}"}, 
				{name: "Purpose", value: "{PURPOSECAT}"}, 
				{name: "Specific Purpose", value: "{SPURPOSE}"}, 
				{name: "Issued Date", value: "{globalConfig.formatDate(ISSUEDDATE)}"}, 
				{name: "Expiry Date", value: "{globalConfig.formatDate(EXPIRYDATE)}"},
				{name: "Source Type", value: "{SURFGRND}"}				
				]*/ 
			},{
		label:"Address", 
		content:[
				{name: "CofA Number", value: "{CofANumber}"}, 
				{name: "Address", value: "{SiteAddress}"}, 
				//{name: "County", value: "{SiteCountyDistrict}"}, 
				{name: "Municipality", value: "{SiteMunicipality}"},
				{name: "UTM", value: "{Zone_}, {Easting}, {Northing}"},
				{name: "Lat&Lng", value: "{Latitude}, {Longitude}"}								
				] 
	}];
globalConfig.queryLayerList = [{
	url: globalConfig.url + "/0",
	tabsTableTemplate: globalConfig.tabsTableTemplate/*[{
		label: globalConfig.InformationLang,
		content:globalConfig.tableFieldList
	}]*/, 
	tableSimpleTemplate: globalConfig.tableSimpleTemplate/*{
		title: globalConfig.tableSimpleTemplateTitleLang, 
		content: globalConfig.tableFieldList
	}*/ 
}];
globalConfig.searchControlHTML = '<center>		SPA: <select name="SPAlist" id="SPAlistid" onchange=\'globalConfig.SWPSearch();\'> \
			<option value="" >All SPAs</option>	\
			<option value="Ausable Bayfield" >Ausable Bayfield</option> \
			<option value="Cataraqui" >Cataraqui</option> \
			<option value="Catfish Creek" >Catfish Creek</option> \
			<option value="Central Lake Ontario" >Central Lake Ontario</option> \
			<option value="Credit Valley" >Credit Valley</option> \
			<option value="Crowe Valley" >Crowe Valley</option> \
			<option value="Essex" >Essex</option> \
			<option value="Ganaraska Region" >Ganaraska Region</option> \
			<option value="Grand River" >Grand River</option> \
			<option value="Grey Sauble" >Grey Sauble</option> \
			<option value="Halton" >Halton</option>\
			<option value="Hamilton" >Hamilton</option>\
			<option value="Kawartha-Haliburton" >Kawartha-Haliburton</option>\
			<option value="Kettle Creek" >Kettle Creek</option>\
			<option value="Lakehead" >Lakehead</option>\
			<option value="Lakes Simcoe and Couchiching/Black River" >Lakes Simcoe and Couchiching/Black River</option>\
			<option value="Long Point" >Long Point</option>\
			<option value="Lower Thames Valley" >Lower Thames Valley</option>\
			<option value="Lower Trent" >Lower Trent</option>\
			<option value="Maitland Valley" >Maitland Valley</option>\
			<option value="Mattagami" >Mattagami</option>\
			<option value="Mississippi Valley" >Mississippi Valley</option>\
			<option value="Niagara Peninsula" >Niagara Peninsula</option>\
			<option value="Nickel District" >Nickel District</option>\
			<option value="North Bay-Mattawa" >North Bay-Mattawa</option>\
			<option value="Northern Bruce Peninsula" >Northern Bruce Peninsula</option>\
			<option value="Nottawasaga Valley" >Nottawasaga Valley</option>\
			<option value="Otonabee-Peterborough" >Otonabee-Peterborough</option>\
			<option value="Quinte" >Quinte</option>\
			<option value="Raisin Region" >Raisin Region</option>\
			<option value="Rideau Valley" >Rideau Valley</option>\
			<option value="Saugeen Valley" >Saugeen Valley</option>\
			<option value="Sault Ste Marie" >Sault Ste Marie</option>\
			<option value="Severn Sound" >Severn Sound</option>\
			<option value="South Nation" >South Nation</option>\
			<option value="St. Clair Region" >St. Clair Region</option>\
			<option value="Toronto" >Toronto</option>\
			<option value="Upper Thames River" >Upper Thames River</option>\
		</select>\
		WHPA/IPZ:<select name="WHPAIPZlist" id="WHPAIPZlistid"  onchange=\'globalConfig.SWPSearch();\'>\
			<option value="" >All zones</option>\
			<option value="IPZ-1" >IPZ 1</option>\
			<option value="IPZ-2" >IPZ 2</option>\
			<option value="IPZ-12" >IPZ 1 and 2</option>\
			<option value="IPZ-12-10" >IPZ 1 and 2 - 10</option>\
			<option value="IPZ-12-9" >IPZ 1 and 2 - 9</option>\
			<option value="IPZ-12-8" >IPZ 1 and 2 - 8.1 and 8</option>\
			<option value="WHPA-A" >WHPA-A</option>\
			<option value="WHPA-A-10" >WHPA-A - 10</option>\
			<option value="WHPA-B" >WHPA-B</option>\
			<option value="WHPA-B-10" >WHPA-B - 10</option>\
			<option value="WHPA-B-8" >WHPA-B - 8</option>\
			<option value="WHPA-C" >WHPA-C</option>\
			<option value="WHPA-D" >WHPA-D</option>\
			<option value="WHPA-E" >WHPA-E</option>\
		</select>\
		<input type="submit" onclick="globalConfig.SWPSearch()" value="SWP Search"></input>\
    </center>\
  <br>  <br>\
    <center>\
	<input id = "map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search"></input>&nbsp;&nbsp;\
	<br>\
	<input id = "searchBusiness" type="radio" name="searchGroup" value="business" onclick="globalConfig.searchChange(\'Business\')">Client Name\
	<input id = "searchLocation" type="radio" name="searchGroup" value="location" onclick="globalConfig.searchChange(\'Location\')">Address with Radius of \
		<select name="searchCriteria.radius" id="lstRadius">\
	   	 					<option value="1" >1 km</option>\
	   	 					<option value="2" >2 km</option>\
	   	 					<option value="5" >5 km</option>\
	   	 					<option value="10" >10 km</option>\
							<option value="25" >25 km</option>\
							<option value="50" >50 km</option>\
						</select>\
	<div id="information" style="color:#0000FF">Zoom in, or Search with Client Name, Address.</div></center>\
	</center><br>';	
/*	
globalConfig.formatDate = function(dateString){
		if(typeof(dateString) !== "undefined"){
			var index = dateString.indexOf(" ");
			var result = dateString;
			if(index > 0){
				result = dateString.substr(0, index);
			}
			var dateArray = result.split("/");
			if(dateArray.length === 3){
				return dateArray[2] + "/" + dateArray[0] + "/" + dateArray[1];
			}else{
				return result;
			}
		}else{
			return "N/A";
		}
	};
*/
    globalConfig.processNA = function(str) {
        if (typeof(str) === 'undefined') {
            return " ";
        }
        if (str === "null") {
            return " ";
        }
        if (str === "Null") {
            return " ";
        }
		if (str === "N/A") {
			return " ";
		}
        return str;
    };
	//globalConfig.watershedTypeParameter = "Watershed";
	//globalConfig.watershedNames = ["Ausable Bayfield - IPZ-2","Ausable Bayfield - WHPA A","Ausable Bayfield - WHPA B","Ausable Bayfield - WHPA C","Cataraqui - IPZ-1","Cataraqui - IPZ-2","Cataraqui - WHPA A","Cataraqui - WHPA C","Central Lake Ontario - IPZ-1","Central Lake Ontario - IPZ-2","Credit Valley - IPZ-2","Credit Valley - WHPA A","Credit Valley - WHPA B","Credit Valley - WHPA C","Credit Valley - WHPA D","Essex - IPZ-1","Essex - IPZ-2","Ganaraska Region - IPZ-1","Ganaraska Region - IPZ-2","Ganaraska Region - WHPA A","Ganaraska Region - WHPA B","Ganaraska Region - WHPA D","Grand River - IPZ-1","Grand River - IPZ-2","Grand River - WHPA A","Grand River - WHPA B","Grand River - WHPA C","Grand River - WHPA D","Grey Sauble - IPZ-1","Grey Sauble - IPZ-2","Grey Sauble - WHPA A","Grey Sauble - WHPA B","Grey Sauble - WHPA C","Grey Sauble - WHPA D","Halton - IPZ-1","Halton - IPZ-2","Halton - WHPA A","Halton - WHPA B","Halton - WHPA C","Halton - WHPA D","Hamilton - IPZ-2","Hamilton - WHPA D","Kawartha-Haliburton - IPZ-1","Kawartha-Haliburton - IPZ-2","Kawartha-Haliburton - WHPA A","Kawartha-Haliburton - WHPA C","Kawartha-Haliburton - WHPA D","Kettle Creek - IPZ-2","Kettle Creek - WHPA A","Kettle Creek - WHPA B","Kettle Creek - WHPA C","Lakehead - IPZ-1","Lakehead - IPZ-2","Lakehead - WHPA A","Lakes Simcoe and Couchiching/Black River - IPZ-1","Lakes Simcoe and Couchiching/Black River - IPZ-2","Lakes Simcoe and Couchiching/Black River - WHPA A","Lakes Simcoe and Couchiching/Black River - WHPA B","Lakes Simcoe and Couchiching/Black River - WHPA C","Lakes Simcoe and Couchiching/Black River - WHPA C1","Lakes Simcoe and Couchiching/Black River - WHPA D","Long Point - IPZ-1","Long Point - IPZ-2","Long Point - WHPA A","Long Point - WHPA B","Long Point - WHPA D","Lower Thames Valley - IPZ-2","Lower Thames Valley - WHPA A","Lower Thames Valley - WHPA B","Lower Thames Valley - WHPA C","Lower Thames Valley - WHPA D","Lower Trent - IPZ-1","Lower Trent - IPZ-2","Lower Trent - WHPA A","Lower Trent - WHPA B","Lower Trent - WHPA C","Lower Trent - WHPA D","Maitland Valley - IPZ-1","Maitland Valley - IPZ-2","Maitland Valley - WHPA A","Maitland Valley - WHPA B","Maitland Valley - WHPA C","Maitland Valley - WHPA D","Mattagami - IPZ-2","Mississippi Valley - IPZ-1","Mississippi Valley - IPZ-2","Mississippi Valley - WHPA A","Mississippi Valley - WHPA B","Mississippi Valley - WHPA D","Niagara Peninsula - IPZ-1","Niagara Peninsula - IPZ-2","Nickel District - IPZ-1","Nickel District - IPZ-2","Nickel District - WHPA A","Nickel District - WHPA B","Nickel District - WHPA C","Nickel District - WHPA D","North Bay-Mattawa - IPZ-1","North Bay-Mattawa - IPZ-2","North Bay-Mattawa - WHPA A","North Bay-Mattawa - WHPA B","North Bay-Mattawa - WHPA D","Northern Bruce Peninsula - IPZ-1","Northern Bruce Peninsula - IPZ-2","Nottawasaga Valley - IPZ-1","Nottawasaga Valley - WHPA A","Nottawasaga Valley - WHPA B","Nottawasaga Valley - WHPA C","Nottawasaga Valley - WHPA C1","Nottawasaga Valley - WHPA D","Otonabee-Peterborough - IPZ-1","Otonabee-Peterborough - IPZ-2","Otonabee-Peterborough - WHPA A","Otonabee-Peterborough - WHPA B","Otonabee-Peterborough - WHPA C","Otonabee-Peterborough - WHPA D","Quinte - IPZ-1","Quinte - IPZ-2","Quinte - WHPA A","Quinte - WHPA B","Quinte - WHPA C","Quinte - WHPA D","Raisin Region - IPZ-1","Raisin Region - IPZ-2","Raisin Region - WHPA A","Rideau Valley - IPZ-1","Rideau Valley - IPZ-2","Rideau Valley - WHPA A","Rideau Valley - WHPA B","Rideau Valley - WHPA C","Rideau Valley - WHPA D","Saugeen Valley - IPZ-1","Saugeen Valley - IPZ-2","Saugeen Valley - WHPA A","Saugeen Valley - WHPA B","Saugeen Valley - WHPA C","Saugeen Valley - WHPA D","Sault Ste Marie - WHPA B","Sault Ste Marie - WHPA C","Sault Ste Marie - WHPA D","Severn Sound - IPZ-1","Severn Sound - WHPA A","Severn Sound - WHPA B","Severn Sound - WHPA C","Severn Sound - WHPA C1","Severn Sound - WHPA D","South Nation - IPZ-1","South Nation - IPZ-2","South Nation - WHPA A","South Nation - WHPA B","South Nation - WHPA C","South Nation - WHPA D","St. Clair Region - IPZ-1","St. Clair Region - IPZ-2","Toronto - IPZ-1","Toronto - IPZ-2","Toronto - WHPA A","Toronto - WHPA B","Toronto - WHPA C","Toronto - WHPA D","Upper Thames River - WHPA A","Upper Thames River - WHPA B","Upper Thames River - WHPA C","Upper Thames River - WHPA D"];
	globalConfig.searchChange = function(type){
		document.getElementById(globalConfig.searchInputBoxDivId).value = "";
		if(type === globalConfig.businessTypeParameter){
			//$( "#" + globalConfig.searchInputBoxDivId ).autocomplete({ disabled: true });
			document.getElementById(globalConfig.radiusSelectionDivId).disabled = true;
		}/*else if (type === globalConfig.watershedTypeParameter){
			document.getElementById(globalConfig.radiusSelectionDivId).disabled = true;
			$( "#" + globalConfig.searchInputBoxDivId ).autocomplete({source: globalConfig.watershedNames,
				disabled: false });
		}*/else{
			//$( "#" + globalConfig.searchInputBoxDivId ).autocomplete({ disabled: true });
			document.getElementById(globalConfig.radiusSelectionDivId).disabled = false;
		}
	};
	//globalConfig.searchWatershedDivId = "searchWatershed";	
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
		if(document.getElementById(globalConfig.searchBusinessDivId).checked){
			var name = searchString.toUpperCase();
			name = globalConfig.replaceChar(name, "'", "''");
			name = globalConfig.replaceChar(name, "\u2019", "''");
			var fuzzyConditionsGenerator = function(field, str) {
				return "(UPPER(" + field + ") LIKE '% " + str + " %') OR (UPPER(" + field + ") LIKE '" + str + " %') OR (UPPER(" + field + ") LIKE '% " + str + "') OR (UPPER(" + field + ") = '" + str + "') OR (UPPER(" + field + ") LIKE '%" + str + ",%')";
			};				
			queryParams.where = fuzzyConditionsGenerator("CLIENTNAME", name);
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
	globalConfig.SWPSearch = function(){
			var SPAlistName = document.getElementById("SPAlistid").value.trim();
			var WHPAIPZlistName = document.getElementById("WHPAIPZlistid").value.trim();
			//var ScorelistName = document.getElementById("Scorelistid").value.trim();
			//var scoreValueName = document.getElementById("scoreValueId").value.trim();
			var condition = "";
			if (SPAlistName.length > 0 ) {
				condition = "LABEL = '" + SPAlistName + "'";
			}
			if (WHPAIPZlistName.length > 0 ) {
				var str = "";
				if (WHPAIPZlistName == "IPZ-12"){
					str = "(IPZ_Type = 'IPZ-1' OR IPZ_Type = 'IPZ-2')";
				} else if (WHPAIPZlistName == "IPZ-12-10") {
					str = "(IPZ_Type = 'IPZ-1' OR IPZ_Type = 'IPZ-2') AND (vss_vulnerabilityScore = '10') "
				} else if (WHPAIPZlistName == "IPZ-12-9") {
					str = "(IPZ_Type = 'IPZ-1' OR IPZ_Type = 'IPZ-2') AND (vss_vulnerabilityScore = '9') "
				} else if (WHPAIPZlistName == "IPZ-12-8") {
					str = "(IPZ_Type = 'IPZ-1' OR IPZ_Type = 'IPZ-2') AND (vss_vulnerabilityScore = '8' OR vss_vulnerabilityScore = '8.1') "
				} else if ((WHPAIPZlistName == "IPZ-1") || (WHPAIPZlistName == "IPZ-2"))
					str = "IPZ_Type = '" + WHPAIPZlistName + "'";
				else if (WHPAIPZlistName == "WHPA-A-10") {
					str = "(WHPAA = 'A') AND (vsg_vulnerabilityScore = 10)";
				} else if (WHPAIPZlistName == "WHPA-B-10") {
					str = "(WHPAA = 'B') AND (vsg_vulnerabilityScore = 10)";					
				} else if (WHPAIPZlistName == "WHPA-B-8") {
					str = "(WHPAA = 'B') AND (vsg_vulnerabilityScore = 8)";					
				} else {
					var temp = WHPAIPZlistName.split("-");
					str = "WHPAA = '" + temp[1] + "'";					
				}
				if (condition.length > 0 ) {
					condition = condition + " AND " + str;
				} else {
					condition = str;
				}
			}
			/*
			var regIsFloat = /^(-?\d+)(\.\d+)?$/;
			if ((ScorelistName.length > 0 ) && (regIsFloat.test(scoreValueName))) {
				
			}*/
			//console.log(condition);
			if(condition.length === 0){
				return;
			}
			document.getElementById(globalConfig.queryTableDivId).innerHTML = "";
			MOEMAP.clearOverlays();
			var searchString = SPAlistName + ", " + WHPAIPZlistName;
			var queryParams = {
				searchString: searchString,
				withinExtent: false
			};
			queryParams.where = condition;
			queryParams.requireGeocode = false;
			queryParams.address = searchString;
			MOEMAP.queryLayersWithConditionsExtent(queryParams);			
			//MOEMAP.queryLayerWithConditions(condition);

			/*if(document.getElementById(globalConfig.searchBusinessDivId).checked){
				name = name.toUpperCase();
				name = globalConfig.replaceChar(name, "'", "''");
				name = globalConfig.replaceChar(name, "\u2019", "''");
				var attributeSearchItems = globalConfig.attributeSearchItems;
				MOEMAP.queryLayerWithFuzzyMatch(attributeSearchItems[0].field, name);
				return;
			}
			if(document.getElementById(globalConfig.searchLocationDivId).checked){
				var radius = document.getElementById(globalConfig.radiusSelectionDivId).value;
				MOEMAP.queryLayerWithLocationRadius(name, radius);
			}*/			
	};
	globalConfig.legend = globalConfig.legend || {
		available: false,	
		url: "http://10.60.13.84/Public/Development/legend/SWP_VSA_Maximum.png", 
		size: {width: 158, height: 200},   //Width and Height
		location: {ratioX: 0.01, ratioY: 0.86}  //
	};
	globalConfig.generateURLTool = {available: false};
	/*globalConfig.autoCompleteSearch = function(){
		$("#" + globalConfig.searchInputBoxDivId).autocomplete({
			source: globalConfig.watershedNames,
			select: function(e, ui) {
				MOEMAP.clearOverlays();
				//MOEMAP.queryLayerWithConditions("NAME = '" + ui.item.value + "'");
				//globalConfig.search();
				var name = ui.item.value;
				//console.log(name.indexOf("IPZ-"));
				//console.log(name.indexOf("WHPA"));				
				if(name.indexOf("IPZ-") != -1) {
					MOEMAP.queryLayerWithConditions("IPZ_SWP = '" + name + "'");
				}
				if(name.indexOf("WHPA") != -1) {
					MOEMAP.queryLayerWithConditions("WHPA_SWP = '" + name + "'");
				}								
			}
		});
		$( "#" + globalConfig.searchInputBoxDivId ).autocomplete({ disabled: true });
	};*/
	
/*globalConfig.usejQueryUITable = true; 
globalConfig.loadCSS = globalConfig.loadCSS || function(filename){
	var fileref=document.createElement("link")
	fileref.setAttribute("rel", "stylesheet")
	fileref.setAttribute("type", "text/css")
	fileref.setAttribute("href", filename)
	document.getElementsByTagName("head")[0].appendChild(fileref)
};
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
};	*/
/*
globalConfig.loadScript("http://10.60.13.84/Public/jquery-ui-1.8.17.custom/js/jquery-1.7.1.min.js", function(){
	globalConfig.loadCSS("http://10.60.13.84/Public/PTTW/demo_page.css");	
	globalConfig.loadCSS("http://10.60.13.84/Public/PTTW/demo_table_jui.css");	
	globalConfig.loadCSS("http://10.60.13.84/Public/PTTW/jquery-ui-1.8.4.custom.css");
	globalConfig.loadScript("http://10.60.13.84/Public/jquery-ui-1.8.17.custom/js/jquery-ui-1.8.17.custom.min.js", function(){});	
	globalConfig.loadScript("http://10.60.13.84/Public/DataTables-1.9.0/media/js/jquery.dataTables.js", function(){});
});		*/	
	//globalConfig.loadCSS("http://10.60.13.84/Public/PTTW/demo_page.css");	
	//globalConfig.loadCSS("http://10.60.13.84/Public/PTTW/demo_table_jui.css");	
	//globalConfig.loadCSS("http://10.60.13.84/Public/PTTW/jquery-ui-1.8.4.custom.css");
	//globalConfig.loadScript("http://10.60.13.84/Public/jquery-ui-1.8.17.custom/js/jquery-ui-1.8.17.custom.min.js", function(){});	
	//globalConfig.loadScript("http://10.60.13.84/Public/DataTables-1.9.0/media/js/jquery.dataTables.js", function(){});
	/*$(function() {
		globalConfig.autoCompleteSearch();
	});
	*/
	//globalConfig.usePredefinedMultipleTabs = false;


/*
mapConfig.search = function(){
		var name = document.getElementById('map_query').value.trim();
		if(name.length === 0){
			return;
		}
		//msg.messageStartSearching();
		document.getElementById('query_table').innerHTML = "";
		MOEMAP.clearOverlays();
		if(document.getElementById('searchBusiness').checked){
			name = name.toUpperCase()
			name = MOEMAP_TOOLS.replaceChar(name, "'", "''");
			name = MOEMAP_TOOLS.replaceChar(name, "\u2019", "''");
			MOEMAP.queryLayerWithFuzzyMatch("BusinessName", name);
			return;
		}
		
		if(document.getElementById('searchLocation').checked){
			var radius = document.getElementById('lstRadius').value;
			MOEMAP.queryLayerWithLocationRadius(name, radius);
		}		
	};	

mapConfig.preInitialize = function(){
		//MOEMap.address = " the certificate points ";
		document.getElementById('searchBusiness').checked = true;
		document.getElementById('searchLocation').checked = false;
		document.getElementById('lstRadius').disabled = true;
		//MOEMap.updateIconsLocation();
	};
	
mapConfig.searchChange = function(type){
		if(type === "Business"){
			document.getElementById('lstRadius').disabled = true;
		}else{
			document.getElementById('lstRadius').disabled = false;
		}
	};


  The tabs Template is used to configure the pop up when the user clicks on the dotsor search results on the map. It is an array. One array element is relatred on one layer in the published 
  service. Every array element is an object, which contains layerID, name, template. The template is also an array. One element in the template contains the configuration for one tab in the 
  pop up for one specific layer. Every element has label, head, content, tail parts. Label is the pop up tab title. The content is a table and each row contains the information for one dot 
  in this location. If there are more than one dots, more rows will be used to represent the dots. 


mapConfig.tabsTemplate = [{
							layerID: 0,
							name: "Certificates",
							template: [{
									label:"Main Information",
									head: "<table><tr><th>Certificate Number</th><th>Business Name</th><th>Date</th><th>Project Type</th><th>Report</th></tr>",
									content:"<tr><td>{mapConfig.formatNumber(CertificateNumber)}</td><td>{mapConfig.formatNumber(BusinessName)}</td><td>{mapConfig.formatDate(Date_)}</td><td>{mapConfig.formatProjectType(ProjectType)}</td><td>{mapConfig.calculateReportURL(PDFLINK)}</td></tr>",
									tail: "</table>"
								},{
									label:"Other Information", 
									head: "<table><tr><th>MOE Reference Number</th><th>EBR Reference Number</th><th>Address</th><th>Municipality</th><th>Status</th></tr>",
									content:"<tr><td>{mapConfig.formatNumber(ReferenceNumber)}</td><td>{mapConfig.formatNumber(EBRReferenceNumber)}</td><td>{mapConfig.formatNumber(Address)}</td><td>{mapConfig.formatNumber(Municipality)}</td><td>{mapConfig.formatProjectType(Status)}</td></tr>",
									tail: "</table>"
								}
							]
						}];
	

mapConfig.tabsTemplate = [{
							label:"Information",
							head: "<table><tr><th>Certificate Number</th><th>Business Name</th><th>Date</th><th>Project Type</th><th>Report</th></tr>",
							content:"<tr><td>{mapConfig.formatNumber(CertificateNumber)}</td><td>{mapConfig.formatNumber(BusinessName)}</td><td>{mapConfig.formatDate(Date_)}</td><td>{mapConfig.formatProjectType(ProjectType)}</td><td>{mapConfig.calculateReportURL(PDFLINK)}</td></tr>",
							tail: "</table>"
						},{
							label:"More...", 
							head: "<table><tr><th>MOE Reference Number</th><th>EBR Reference Number</th><th>Address</th><th>Municipality</th><th>Status</th></tr>",
							content:"<tr><td>{mapConfig.formatNumber(ReferenceNumber)}</td><td>{mapConfig.formatNumber(EBRReferenceNumber)}</td><td>{mapConfig.formatNumber(Address)}</td><td>{mapConfig.formatNumber(Municipality)}</td><td>{mapConfig.formatProjectType(Status)}</td></tr>",
							tail: "</table>"
						}];


mapConfig.tableTemplate = {
	head: "Note: The Distance(KM) column represents the distance between your search location and the permit location in the specific row. Data is in English only. <table id=\"myTable\" class=\"tablesorter\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\"><thead><tr><th><center>Certificate Number&nbsp&nbsp</center></th><th><center>Business Name&nbsp&nbsp</center></th><th><center>Address</center></th><th><center>Municipality&nbsp&nbsp</center></th><th><center>Date</center></th><th><center>Project Type&nbsp&nbsp</center></th><th><center>Status&nbsp</center></th><th><center>Report&nbsp&nbsp</center></th></tr></thead><tbody>",
	content: "<tr><td>{mapConfig.formatNumber(CertificateNumber)}</td><td>{mapConfig.formatNumber(BusinessName)}</td><td>{mapConfig.formatNumber(Address)}</td><td><center>{mapConfig.formatNumber(Municipality)}</center></td><td><center>{mapConfig.formatDate(Date_)}</center></td><td><center>{mapConfig.formatProjectType(ProjectType)}</center></td><td><center>{mapConfig.formatNumber(Status)}</center></td><td><center>{mapConfig.calculateShortReportURL(PDFLINK)}</center></td></tr>",
	tail: "</tbody></table>"
	};*/
	