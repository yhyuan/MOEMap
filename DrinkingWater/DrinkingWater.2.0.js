//var globalConfig = globalConfig || {};
/*var headTag = document.getElementsByTagName("head")[0].innerHTML;	
var newCSS = headTag + '<style type="text/css">#map_canvas label { width: auto; display:inline; }\
#map_canvas img { max-height: none; max-width: none;}\
</style>';
*/
//document.getElementsByTagName('head')[0].innerHTML += newCSS;

globalConfig.chooseLang = function (en, fr) {return (globalConfig.language === "EN") ? en : fr;};
globalConfig.searchableFieldsList = [{en: "Municipality", fr: "municipalité"}, {en: "Street address", fr: "adresse municipale"}, {en: "Postal code", fr: "code postal"}, {en: "Drinking water system name or number", fr: "nom ou numéro de réseau d’eau potable"}];
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
globalConfig.infoWindowHeight = "435px";
globalConfig.infoWindowContentHeight = "395px";
globalConfig.infoWindowContentWidth = "450px";
if (globalConfig.language === "FR")  {
	globalConfig.infoWindowWidth = '530px';
	globalConfig.infoWindowContentWidth = "510px";
}
globalConfig.fieldNamesList = globalConfig.chooseLang(["DWS ID", "DWS Name", "Drinking Water Quality", "Inspection Risk Rating", "Drinking Water Surveillance Program"], ["N&deg; du REP", "Nom du REP", "Qualité de l’eau potable", "Note d’inspection", "Programme de surveillance de l’eau potable"]);
globalConfig.tableFieldList = [
	{name: globalConfig.fieldNamesList[0], value: "{DWS_NUM}&nbsp&nbsp"},
	{name: globalConfig.fieldNamesList[1], value: "{DWS_NAME}"},		
	{name: globalConfig.fieldNamesList[2], value: "{PERCENTAGE_COMPLIED} ({" + globalConfig.chooseLang("ENGLISH", "FRENCH")  + "_TIME_PERIOD})"}, 
	{name: globalConfig.fieldNamesList[3], value: "{SCORE} ({" + globalConfig.chooseLang("ENGLISH", "FRENCH")  + "_DATE_RANGE})"}, 
	{name: globalConfig.fieldNamesList[4], value: "[{TASTE_AND_ODOUR}? ?<a target='_blank' href='" + globalConfig.TasteOdourReportURL +"?id={DWS_NUM}'>" + globalConfig.TasteOdourLang + "</a><br>][{CHLORIDE}? ?<a target='_blank' href='" + globalConfig.ChlorideReportURL +"?id={DWS_NUM}'>" + globalConfig.ChlorideLang + "</a><br>][{COLOUR}? ?<a target='_blank' href='" + globalConfig.ColourReportURL +"?id={DWS_NUM}'>" + globalConfig.ColourLang + "</a><br>][{ALGAL_TOXINS}? ?<a target='_blank' href='" + globalConfig.AlgalToxinsReportURL +"?id={DWS_NUM}'>" + globalConfig.AlgalToxinsLang + "</a>]"}
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
