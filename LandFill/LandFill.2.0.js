//var globalConfig = globalConfig || {};
globalConfig.chooseLang = function (en, fr) {return (globalConfig.language === "EN") ? en : fr;};
globalConfig.searchableFieldsList = [{en: "Municipal Drinking Water System number", fr: "Municipal Drinking Water System number"}, {en: "Drinking Water System name", fr: "Drinking Water System name"}, {en: "address", fr: "adresse"}];
globalConfig.searchControlHTML = '<form name="formMap" method="get">\
<label for="region">Filter by region:</label>\
				<select name="region" id="region">\
				   <option value="0">Regions</option>\
					<option value="Ontario"> Ontario</option>\
					<option value="Central">Central</option>\
					<option value="Eastern">Eastern</option>\
					<option value="Northern">Northern</option>\
					<option value="Southwestern">Southwestern</option>\
					<option value="West Central">West Central</option>\
				</select>\
<input type="submit" onclick="globalConfig.search()" value="Go!">\
		</form>';
globalConfig.pointBufferTool = {available: false};
globalConfig.extraImageService = {visible: false};
globalConfig.usejQueryUITable = true;  //Avoid loading extra javascript files
globalConfig.usePredefinedMultipleTabs = true;
globalConfig.allowMultipleIdentifyResult = false;
globalConfig.displayTotalIdentifyCount = false;
globalConfig.locationServicesList = [];
globalConfig.maxQueryZoomLevel = 10;
globalConfig.displayDisclaimer = true;
globalConfig.InformationLang = "Information";
globalConfig.postIdentifyCallbackName = "SportFish";
//globalConfig.postConditionsCallbackName = "Wells";
globalConfig.infoWindowWidth = '240px';
globalConfig.infoWindowHeight = "110px";
//globalConfig.infoWindowContentHeight = "330px";
//globalConfig.infoWindowContentWidth = "450px";
globalConfig.fieldNamesList = globalConfig.chooseLang(["DWS ID", "DWS Name", "Drinking Water Quality", "Inspection Risk Rating", "Drinking Water Surveillance Program"], ["DWS ID", "DWS Name", "Drinking Water Quality", "Inspection Risk Rating", "Drinking Water Surveillance Program"]);
globalConfig.tableFieldList = [
	{name: globalConfig.fieldNamesList[0], value: "{DWS_NUM}"}, 
	{name: globalConfig.fieldNamesList[1], value: "{DWS_NAME}"},		
	{name: globalConfig.fieldNamesList[2], value: "{PERCENTAGE_COMPLIED} ({ENGLISH_TIME_PERIOD})"}, 
	{name: globalConfig.fieldNamesList[3], value: "{SCORE} ({ENGLISH_DATE_RANGE})"}, 
	{name: globalConfig.fieldNamesList[4], value: "[{TASTE_AND_ODOUR}?Taste and Odour?<a target='_blank' href='TasteOdour_Report_en.htm?id={DWS_NUM}'>Taste and Odour</a>]<br>[{CHLORIDE}?Chloride?<a target='_blank' href='Chloride_Report_en.htm?id={DWS_NUM}'>Chloride</a>]<br>[{COLOUR}?Colour?<a target='_blank' href='Colour_Report_en.htm?id={DWS_NUM}'>Colour</a>]<br>[{ALGAL_TOXINS}?Algal Toxins?<a target='_blank' href='AlgalToxins_Report_en.htm?id={DWS_NUM}'>Algal Toxins</a>]"}
];

globalConfig.tableSimpleTemplateTitleLang = "";
globalConfig.tabsTemplateContent = "<strong><h3>{SITE_NAME}</h3></strong><br>\
<strong>Operation Status:</strong> {STATUS}<br>\
<strong>Ownership Type:</strong> {TYPE}<br>\
Go to <a target='_blank' href='http://www.ontario.ca/environment-and-energy/large-landfill-site-details?site={COFA_NUM}'>{SITE_NAME}</a>";
globalConfig.queryLayerList = [{
	url: globalConfig.url + "/0",
	tabsTemplate: [{
		label: globalConfig.InformationLang,
		content:globalConfig.tabsTemplateContent
	}], 
	tableSimpleTemplate: {
		title: globalConfig.tableSimpleTemplateTitleLang, 
		content: globalConfig.tableFieldList
	} 
}];

var layer = new gmaps.ags.Layer(globalConfig.url  + "/0");
layer.query({
	returnGeometry: false,
	where: "1=1",
	outFields: ["COFA_NUM", "SITE_NAME"]
}, function (rs) {
	var str = '<table id="large-landfills">\
		<thead>\
			<tr><th scope="col"><abbr title="Environmental Compliance Approval">ECA</abbr> NUMBER</th><th scope="col">SITE NAME</th></tr>\
		</thead>\
		<tbody>';
	for (var i=0; i<rs.features.length; i++) {
		str = str + '<tr><td>' + rs.features[i].attributes.COFA_NUM  + '</td><td><a href="http://www.ontario.ca/environment-and-energy/large-landfill-site-details?site=' + rs.features[i].attributes.COFA_NUM + '">' + rs.features[i].attributes.SITE_NAME + '</a></td></tr>';
	}
	str = str + '</tbody></table>';
	document.getElementById("query_table").innerHTML = str;
});

globalConfig.search = function(){
	var searchString = document.getElementById(globalConfig.searchInputBoxDivId).value.trim();
	if(searchString.length === 0){
		return;
	}
	MOEMAP.clearOverlays();
	var queryParams = {
		searchString: searchString
	};
	queryParams.withinExtent = document.getElementById(globalConfig.currentMapExtentDivId).checked;
	/*Search for DWS number*/
	var reg = /^\d+$/;	
	if(reg.test(queryParams.searchString) && (queryParams.searchString.length === 9)){
		queryParams.requireGeocode = false;
		queryParams.where = "DWS_NUM = '" + queryParams.searchString + "'";
		MOEMAP.queryLayersWithConditionsExtent(queryParams);
		return;
	}
	/*Search for Municipality Names*/
	if (globalConfig.municipalityNames.contains(queryParams.searchString.toUpperCase())) {
		queryParams.requireGeocode = false;
		queryParams.where = "UPPER(MUNICIPALITY_NAME) = '" + queryParams.searchString.toUpperCase() + "'";
		MOEMAP.queryLayersWithConditionsExtent(queryParams);
		return;		
	}
	
	var coorsArray = queryParams.searchString.split(/\s+/);
	var str = coorsArray.join(" ").toUpperCase();
	queryParams.requireGeocode = true;
	queryParams.where = "UPPER(DWS_NAME) LIKE '%" + str + "%'";
	queryParams.address = searchString;
	MOEMAP.queryLayersWithConditionsExtent(queryParams);		
};
