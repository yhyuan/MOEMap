//var globalConfig = globalConfig || {};
globalConfig.chooseLang = function (en, fr) {return (globalConfig.language === "EN") ? en : fr;};
globalConfig.searchableFieldsList = [{en: "Municipal Drinking Water System number", fr: "Municipal Drinking Water System number"}, {en: "Drinking Water System name", fr: "Drinking Water System name"}, {en: "address", fr: "adresse"}];
globalConfig.pointBufferTool = {available: false};
globalConfig.extraImageService = {visible: false};
globalConfig.usejQueryUITable = false;  //Avoid loading extra javascript files
globalConfig.usePredefinedMultipleTabs = false;
globalConfig.allowMultipleIdentifyResult = false;
globalConfig.displayTotalIdentifyCount = false;
globalConfig.locationServicesList = [];
globalConfig.maxQueryZoomLevel = 10;
globalConfig.displayDisclaimer = false;
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

globalConfig.createTable = function (features) {
	var str = '<h2>' + features.length + globalConfig.chooseLang(' large landfills found in Ontario', ' sites trouvés Ontario')  + '</h2><table id="large-landfills">\
		<thead>\
			<tr><th scope="col">' + globalConfig.chooseLang('<abbr title="Environmental Compliance Approval">ECA</abbr>NUMBER', 'CA Numéro de certificat d\'autorisation') + '</th><th scope="col">' + globalConfig.chooseLang('Site Name', 'Nom du site') + '</th></tr>\
		</thead>\
		<tbody>';
	for (var i=0; i<features.length; i++) {
		str = str + '<tr><td>' + features[i].attributes.COFA_NUM  + '</td><td><a href="http://www.ontario.ca/environment-and-energy/large-landfill-site-details?site=' + features[i].attributes.COFA_NUM + '">' + features[i].attributes.SITE_NAME + '</a></td></tr>';
	}
	str = str + '</tbody></table>';
	document.getElementById("query_table").innerHTML = str;
};
var layer = new gmaps.ags.Layer(globalConfig.url  + "/0");
layer.query({
	returnGeometry: false,
	where: "1=1",
	outFields: ["COFA_NUM", "SITE_NAME"]
}, function (rs) {
	globalConfig.createTable(rs.features);
});

globalConfig.search = function(){
	var searchString = document.getElementById('region').value.trim();
	if(searchString.length === 0){
		return;
	}
	if(searchString === '0'){
		return;
	}
	MOEMAP.clearOverlays();
	var queryParams = {
		searchString: searchString
	};
	queryParams.withinExtent = false;
	queryParams.requireGeocode = false;
	if (queryParams.searchString.toUpperCase() === "ONTARIO") {
		queryParams.where = "1=1";
	} else {
		queryParams.where = "UPPER(MOE_REGION) = '" + queryParams.searchString.toUpperCase() + "'";
	}
	MOEMAP.queryLayersWithConditionsExtent(queryParams);		
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
		globalConfig.createTable(features);
		var bounds = globalConfig.calculatePointsBounds(features);
		globalConfig.setMapBound(queryParams.map,bounds);	
		globalConfig.addMarkersSimple(features, queryParams.layerList[0].tabsTemplate);
	}	