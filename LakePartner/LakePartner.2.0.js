//var globalConfig = globalConfig || {};
//globalConfig.url = "http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/lakepartner/MapServer";
//globalConfig.url = "http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Public/LakePartner/MapServer";
//globalConfig.SecchiDepth_ReportName = "SecchiDepth_Report.htm";
//globalConfig.TotalPhosphorus_ReportName = "TotalPhosphorus_Report.htm";
globalConfig.SecchiDepth_ReportName = "secchidepth_report";
globalConfig.TotalPhosphorus_ReportName = "totalphoshorus_report";
globalConfig.pointBufferTool = {available: false};
globalConfig.extraImageService = {visible: false};
globalConfig.usejQueryUITable = false;   //Avoid loading extra javascript files
globalConfig.usePredefinedMultipleTabs = false;   //Avoid loading extra javascript files
globalConfig.allowMultipleIdentifyResult = false;
globalConfig.displayTotalIdentifyCount = false;
globalConfig.locationServicesList = [];
globalConfig.maxQueryZoomLevel = 11;
globalConfig.displayDisclaimer = true;
globalConfig.InformationLang = "Information";
globalConfig.postIdentifyCallbackName = "SportFish";
globalConfig.infoWindowWidth  = '280px';

if (globalConfig.accessible) {
	var reportLang = "";
	if (globalConfig.language === "EN") {
		reportLang = "Report";	
	} else {
		reportLang = "Signaler";
	}
	//var reportLocation = "http://www.downloads.ene.gov.on.ca/files/mapping/LakePartner/";
	globalConfig.tableFieldList = [
		{name: globalConfig.fieldNamesList[0], value: "{globalConfig.wordCapitalize(LAKENAME)}"}, 
		{name: globalConfig.fieldNamesList[1], value: "{STN}"}, 
		{name: globalConfig.fieldNamesList[2], value: "{SITEID}"}, 
		{name: globalConfig.fieldNamesList[3], value: "{globalConfig.wordCapitalize(TOWNSHIP)}"}, 
		{name: globalConfig.fieldNamesList[4], value: "{SITEDESC}"}, 
		{name: globalConfig.fieldNamesList[5], value: "[{SE_COUNT}?N/A?<a href='" + globalConfig.SecchiDepth_ReportName + "?id={ID}'>" + reportLang + "</a>]"},
		{name: globalConfig.fieldNamesList[6], value: "[{PH_COUNT}?N/A?<a href='" + globalConfig.TotalPhosphorus_ReportName + "?id={ID}'>" + reportLang + "</a>]"},		
		{name: globalConfig.fieldNamesList[7], value: "{globalConfig.deciToDegree(LATITUDE)}"}, 
		{name: globalConfig.fieldNamesList[8], value: "{globalConfig.deciToDegree(LONGITUDE)}"}, 	
	];
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
		}]
	}];
	globalConfig.postConditionsCallbackName = "SportFish";	
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