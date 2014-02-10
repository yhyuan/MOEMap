//var globalConfig = globalConfig || {};
//globalConfig.url = "http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/lakepartner/MapServer";
//globalConfig.url = "http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Public/LakePartner/MapServer";
//globalConfig.SecchiDepth_ReportName = "SecchiDepth_Report.htm";
//globalConfig.TotalPhosphorus_ReportName = "TotalPhosphorus_Report.htm";
globalConfig.chooseLang = function (en, fr) {return (globalConfig.language === "EN") ? en : fr;};


globalConfig.searchableFieldsList = [{en: "lake name", fr: "nom du lac"}, {en: "location", fr: "un lieu"}, {en: "station number (STN)", fr: "le num\u00e9ro de la station (STN)"}];
//globalConfig.SecchiDepth_ReportName = globalConfig.chooseLang("secchidepth_report", "fr_secchidepth_report");
//globalConfig.TotalPhosphorus_ReportName = globalConfig.chooseLang("totalphosphorus_report", "fr_totalphosphorus_report");
globalConfig.SecchiDepth_ReportName = globalConfig.chooseLang("secchi-depth-report", "rapport-de-profondeur-de-secchi");
globalConfig.TotalPhosphorus_ReportName = globalConfig.chooseLang("total-phosphorus-report", "bilan-de-phosphore-total");

globalConfig.tabsTemplateContent = globalConfig.chooseLang("<strong>{globalConfig.wordCapitalize(LAKENAME)}, STN {STN}, Site ID {SITEID}</strong><br>{globalConfig.wordCapitalize(TOWNSHIP)} Township      <br>{SITEDESC}<br><br>Interactive Chart and Data: <br>[{SE_COUNT}?  ?&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='" + globalConfig.SecchiDepth_ReportName + "?id={ID}'>Secchi Depth</a><br>][{PH_COUNT}?  ?&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='" + globalConfig.TotalPhosphorus_ReportName + "?id={ID}'>Total Phosphorus Concentration</a><br>]<br>Latitude <b>{globalConfig.deciToDegree(LATITUDE)}</b> Longitude <b>{globalConfig.deciToDegree(LONGITUDE)}</b><br><a href='mailto:lakepartner@ontario.ca?subject=Report Issue (Submission {globalConfig.wordCapitalize(LAKENAME)}, STN {STN}, Site ID {SITEID})'>Report an issue for this location</a>.<br>", "<strong>{globalConfig.wordCapitalize(LAKENAME)}, STN {STN}, N&deg; du lieu {SITEID}</strong><br>Canton: {globalConfig.wordCapitalize(TOWNSHIP)}<br>{SITEDESC}<br><br>Tableau et donn\u00e9es interactifs: <br>[{SE_COUNT}?  ?&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='" + globalConfig.SecchiDepth_ReportName + "?id={ID}'>Disque Secchi</a><br>][{PH_COUNT}?  ?&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='" + globalConfig.TotalPhosphorus_ReportName + "?id={ID}'>Concentration de phosphore total</a><br>]<br>Latitude <b>{globalConfig.deciToDegree(LATITUDE)}</b> Longitude <b>{globalConfig.deciToDegree(LONGITUDE)}</b><br><a href='mailto:lakepartner@ontario.ca?subject=Erreur de Portail ({globalConfig.wordCapitalize(LAKENAME)}, STN {STN}, N&deg; du lieu {SITEID})'>Signaler une erreur pour ce lieu</a>.<br>");


globalConfig.pointBufferTool = {available: false};
globalConfig.extraImageService = {visible: false};
globalConfig.usejQueryUITable = true;   //Avoid loading extra javascript files
globalConfig.usePredefinedMultipleTabs = false;   //Avoid loading extra javascript files
globalConfig.allowMultipleIdentifyResult = false;
globalConfig.displayTotalIdentifyCount = false;
globalConfig.locationServicesList = [];
globalConfig.maxQueryZoomLevel = 11;
globalConfig.displayDisclaimer = true;
globalConfig.InformationLang = "Information";
globalConfig.postIdentifyCallbackName = "SportFish";
globalConfig.infoWindowWidth  = '280px';

globalConfig.tableSimpleTemplateTitleLang = "";
globalConfig.fieldNamesList = globalConfig.chooseLang(["Lake Name", "STN", "Site ID", "Township", "Site Description", "Secchi Depth", "Total Phosphorus Concentration", "Latitude", "Longitude"], ["Nom du lac", "STN", "N&deg; du lieu", "Canton", "Description du site", "Disque Secchi", "Concentration de phosphore total", "Latitude", "Longitude"]);
globalConfig.tableFieldList = [
	{name: globalConfig.fieldNamesList[0], value: "{globalConfig.wordCapitalize(LAKENAME)}"}, 
	{name: globalConfig.fieldNamesList[1], value: "{STN}"}, 
	{name: globalConfig.fieldNamesList[2], value: "{SITEID}"}, 
	{name: globalConfig.fieldNamesList[3], value: "{globalConfig.wordCapitalize(TOWNSHIP)}"}, 
	{name: globalConfig.fieldNamesList[4], value: "{SITEDESC}"}, 
	{name: globalConfig.fieldNamesList[5], value: "[{SE_COUNT}?N/A?<a target='_blank' href='" + globalConfig.SecchiDepth_ReportName + "?id={ID}'>" + globalConfig.chooseLang("Report", "Signaler") + "</a>]"},
	{name: globalConfig.fieldNamesList[6], value: "[{PH_COUNT}?N/A?<a target='_blank' href='" + globalConfig.TotalPhosphorus_ReportName + "?id={ID}'>" + globalConfig.chooseLang("Report", "Signaler") + "</a>]"},		
	{name: globalConfig.fieldNamesList[7], value: "{globalConfig.deciToDegree(LATITUDE)}"}, 
	{name: globalConfig.fieldNamesList[8], value: "{globalConfig.deciToDegree(LONGITUDE)}"}
];

if (globalConfig.accessible) {
	globalConfig.queryLayerList = [{
		url: globalConfig.url + "/0",
		tableSimpleTemplate: {
			title: globalConfig.tableSimpleTemplateTitleLang, 
			content: globalConfig.tableFieldList
		} 
	}];
	globalConfig.postConditionsCallbackName = "AccessibleWells";		
} else {
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
	//globalConfig.postConditionsCallbackName = "SportFish";	
}
globalConfig.search = function(){
	var searchString = document.getElementById(globalConfig.searchInputBoxDivId).value.trim();
	if(searchString.length === 0){
		return;
	}
	MOEMAP.clearOverlays();
	var queryParams = {
		searchString: searchString
	};	
	if (!globalConfig.accessible) {
		queryParams.withinExtent = document.getElementById(globalConfig.currentMapExtentDivId).checked;
	}	
	var reg = /^\d+$/;
	if(reg.test(searchString)&&(searchString.length <= 5)){
		queryParams.requireGeocode = false;
		queryParams.where = "STN = " + searchString;
	}else{
		var coorsArray = searchString.split(/\s+/);
		var str = coorsArray.join(" ").toUpperCase();
		queryParams.requireGeocode = true;
		queryParams.where = "UPPER(LAKENAME) LIKE '%" + str + "%'";
		queryParams.address = searchString;
	}
	MOEMAP.queryLayersWithConditionsExtent(queryParams);	
};