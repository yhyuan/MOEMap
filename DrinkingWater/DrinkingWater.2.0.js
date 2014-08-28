//var globalConfig = globalConfig || {};
globalConfig.chooseLang = function (en, fr) {return (globalConfig.language === "EN") ? en : fr;};
globalConfig.searchableFieldsList = [{en: "Municipal Drinking Water System number", fr: "Municipal Drinking Water System number"}, {en: "Drinking Water System name", fr: "Drinking Water System name"}, {en: "address", fr: "adresse"}];
globalConfig.maxMapScale = 15;
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
globalConfig.postIdentifyCallbackName = "Wells";
globalConfig.postConditionsCallbackName = "Wells";
globalConfig.infoWindowWidth = '470px';
globalConfig.infoWindowHeight = "400px";
globalConfig.infoWindowContentHeight = "330px";
globalConfig.infoWindowContentWidth = "450px";
globalConfig.fieldNamesList = globalConfig.chooseLang(["DWS ID", "DWS Name", "Drinking Water Quality", "Inspection Risk Rating", "Drinking Water Surveillance Program"], ["DWS ID", "DWS Name", "Drinking Water Quality", "Inspection Risk Rating", "Drinking Water Surveillance Program"]);
globalConfig.tableFieldList = [
	{name: globalConfig.fieldNamesList[0], value: "{DWS_NUM}"}, 
	{name: globalConfig.fieldNamesList[1], value: "{DWS_NAME}"},		
	{name: globalConfig.fieldNamesList[2], value: "{PERCENTAGE_COMPLIED} ({ENGLISH_TIME_PERIOD})"}, 
	{name: globalConfig.fieldNamesList[3], value: "{SCORE} ({ENGLISH_DATE_RANGE})"}, 
	{name: globalConfig.fieldNamesList[4], value: "[{TASTE_AND_ODOUR}?Taste and Odour?<a target='_blank' href='TasteOdour_Report_en.htm?id={DWS_NUM}'>Taste and Odour</a>]<br>[{CHLORIDE}?Chloride?<a target='_blank' href='Chloride_Report_en.htm?id={DWS_NUM}'>Chloride</a>]<br>[{COLOUR}?Colour?<a target='_blank' href='Colour_Report_en.htm?id={DWS_NUM}'>Colour</a>]<br>[{ALGAL_TOXINS}?Algal Toxins?<a target='_blank' href='AlgalToxins_Report_en.htm?id={DWS_NUM}'>Algal Toxins</a>]"}
];

globalConfig.tableSimpleTemplateTitleLang = "";
globalConfig.tabsTemplate = [{
		label: globalConfig.GeneralInformationLang,
		content:globalConfig.tabsTemplateContentGeneralInformationLang
	},{
		label: globalConfig.ComplianceMonitoringLang, 
		content:globalConfig.tabsTemplateContentComplianceMonitoring
	},{
		label: "[{DWSP}?  ?" + globalConfig.ScientificMonitoringLang + "]",
		content:globalConfig.tabsTemplateContentScientificMonitoring
	}];
globalConfig.queryLayerList = [{
	url: globalConfig.url + "/0",
	tabsTemplate: globalConfig.tabsTemplate,
	tableSimpleTemplate: {
		title: globalConfig.tableSimpleTemplateTitleLang, 
		content: globalConfig.tableFieldList/*globalConfig.tableContent,
		head: "",
		tail: ""*/
	} 
}];

globalConfig.municipalityNames = [];
var layer = new gmaps.ags.Layer(globalConfig.url  + "/0");
layer.query({
	returnGeometry: false,
	where: "1=1",
	outFields: ["MUNICIPALITY_NAME"]
}, function (rs) {
	for (var i=0; i<rs.features.length; i++) {
		globalConfig.municipalityNames.push(rs.features[i].attributes.MUNICIPALITY_NAME.toUpperCase());
	}
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
