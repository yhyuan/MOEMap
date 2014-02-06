globalConfig.chooseLang = function (en, fr) {return (globalConfig.language === "EN") ? en : fr;};

globalConfig.searchableFieldsList = [{en: "city", fr: "ville"}, {en: "facility name", fr: "installation"}, {en: "company", fr: "entreprise"}, {en: "sector", fr: "substance"}, {en: "substance", fr: "secteur"}];

globalConfig.searchControlHTML = '<div id="searchTheMap"></div><div id="searchHelp"></div><br>\
	<label class="element-invisible" for="map_query">' + globalConfig.chooseLang('Search the map', 'Recherche carte interactive') + '</label>\
	<input id="map_query" type="text" title="' + globalConfig.chooseLang('Search term', 'Terme de recherche') + '" maxlength="100" size="50" onkeypress="return globalConfig.entsub(event)"></input>\
	<label class="element-invisible" for="search_submit">' + globalConfig.chooseLang('Search', 'Recherche') + '</label>\
	<input id="search_submit" type="submit" title="Search" onclick="globalConfig.search()" value="' + globalConfig.chooseLang('Search', 'Recherche') + '"></input>\
	<fieldset>\
		<input type="radio" id="searchLocation" name="searchGroup" checked="checked" title="' + globalConfig.chooseLang('Search Map Location or Facility', "Recherche par lieu ou par installation") + '" name="location" value="location" onclick="globalConfig.searchChange(\'Location\')"></input>\
		<span class="tooltip" title="' + globalConfig.chooseLang("Search Map Location or Facility: Enter facility name or street address to find facilities", "Recherche par lieu ou par installation : entrez le nom de l\u0027installation ou son adresse.") + '">\
		<label class="option" for="searchLocation">' + globalConfig.chooseLang('Search Map Location or Facility', "Recherche par lieu ou par installation") + '</label>\
		</span>\
		<br/>\
		<input type="radio" id="searchSubstance" name="searchGroup" title="' + globalConfig.chooseLang('Search Substance', "Recherche par substance") + '" value="substance" onclick="globalConfig.searchChange(\'Substance\')"></input>\
		<span class="tooltip" title="' + globalConfig.chooseLang('Search Substance: Enter the name of a substance to find facilities', "Recherche par substance : entrez le nom de la substance pour trouver les installations avec cette substance") + '">\
		<label class="option" for="searchSubstance">' + globalConfig.chooseLang('Search Substance', "Recherche par substance") + '</label>\
		</span>\
		<br/>\
		<input type="radio" id="searchSector" name="searchGroup" title="' + globalConfig.chooseLang('Search Sector', "Recherche par secteur") + '" value="secteur" onclick="globalConfig.searchChange(\'Sector\')"></input>\
		<span class="tooltip" title="' + globalConfig.chooseLang('Search Sector: Enter the name of a sector to find facilities', "Recherche par secteur : entrez le nom d\u0027un secteur pour trouver les installations dans ce secteur") + '">\
		<label class="option" for="searchSector">' + globalConfig.chooseLang('Search Sector', "Recherche par secteur") + '</label>\
		</span>\
		<br/>\
		<input id="currentMapExtent" type="checkbox" name="currentExtent" title="' + globalConfig.chooseLang('Current Map Display', "Étendue de la carte courante") + '" /> <label for="currentExtent" class=\'option\'>' + globalConfig.chooseLang('Search current map display only', "\u00c9tendue de la carte courante") + '</label>\
	</fieldset>\
	<div id="information"></div>';
	
//var globalConfig = globalConfig || {};
	
//globalConfig.url = "http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/TRAIS/MapServer";
//globalConfig.url = "http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Public/TRAIS/MapServer";
globalConfig.searchFieldFacilityName = "Facility";
globalConfig.searchFieldOrganizationName = "Organisation";
globalConfig.searchFieldSector = "Sector";
globalConfig.searchFieldNPRI_ID = "NPRI_ID";
globalConfig.searchFieldSubstance_List = "Substance_List";

var sectorNames = [];
var sectorNameLayerID = "7";
var sectorNameQueryLayer = new gmaps.ags.Layer(globalConfig.url  + "/" + sectorNameLayerID);
sectorNameQueryLayer.query({
	returnGeometry: false,
	where: "1=1",
	outFields: (globalConfig.language === "EN") ? ["ID", "sectorNameEn"] : ["ID", "sectorNameFr"]
}, function (rs) {
	sectorNames = _.map(rs.features, function(feature) {
		return feature.attributes.ID + " - " + ((globalConfig.language === "EN") ? feature.attributes.sectorNameEn : feature.attributes.sectorNameFr);
	});
});
var substancesNames = [];
var substancesNameLayerID = "3";
var substancesNameQueryLayer = new gmaps.ags.Layer(globalConfig.url  + "/" + substancesNameLayerID);
substancesNameQueryLayer.query({
	returnGeometry: false,
	where: "1=1",
	outFields: (globalConfig.language === "EN") ? ["CODE", "SUBSTANCE_EN", "CASNumber"] : ["CODE", "SUBSTANCE_FR", "CASNumber"]
}, function (rs) {
	substancesNames = _.map(rs.features, function(feature) {
		return ((globalConfig.language === "EN") ? feature.attributes.SUBSTANCE_EN : feature.attributes.SUBSTANCE_FR) + " " + feature.attributes.CASNumber;
	});
	var codes  = _.map(rs.features, function(feature) {
		return feature.attributes.CODE;
	});
	globalConfig.substancesDict = _.object(substancesNames, codes);
});

//globalConfig.annualReportURL = globalConfig.chooseLang("TRAIS_Report.htm", "TRAIS_Report.htm");
globalConfig.annualReportURL = globalConfig.chooseLang("annual-report", "rapport-annuel");
//globalConfig.planSummaryURL = globalConfig.chooseLang("TRAIS_PlanSummaries_Report.htm", "TRAIS_PlanSummaries_Report.htm");
globalConfig.planSummaryURL = globalConfig.chooseLang("plan-summary-report", "sommaires-de-plan");
//globalConfig.recordsURL = globalConfig.chooseLang("TRAIS_Records_Report.htm", "TRAIS_Records_Report.htm");
globalConfig.recordsURL = globalConfig.chooseLang("record-report", "rapport-record");

if (globalConfig.language === "EN") {
	globalConfig.NoAnnualReportSubmittedLang = "No Annual Report submitted.";
	globalConfig.NoPlanSummarySubmittedLang = "No Plan Summary submitted.";
	globalConfig.NoRecordSubmittedLang = "No Record submitted.";
	globalConfig.LinktoAnnualReportsLang = "Links to Annual Reports";
	globalConfig.LinktoPlanSummariesLang = "Links to Plan Summaries";
	globalConfig.LinktoRecordsLang = "Links to Records";
	globalConfig.OpenNewWindowLang = "These links will open in a new browser window.";
	//globalConfig.searchHelpTxt = "Search <strong>city</strong>, <strong>facility name</strong>, <strong>company</strong>, <strong>sector</strong>, <strong>substance</strong> or see help for more advanced options.";
	globalConfig.tabsTemplateContent = "Facility: <b>{Facility}</b><br>Organization: <b>{Organisation}</b><br>Physical Address: <b>{StreetAddress} / {City}</b><br>NPRI ID: <b>{mapConfig.displayNPRI_ID(NPRI_ID)}</b><br>Sector: <b>{mapConfig.displaySector(Sector)}</b><br>Toxic Substances: <b>{NUMsubst}</b><br><br>[{NUMsubst}? " + globalConfig.NoAnnualReportSubmittedLang + " ?<a target='_blank' href='" + globalConfig.annualReportURL + "?id={UniqueID}'>" + globalConfig.LinktoAnnualReportsLang + "</a>]<br>[{NUMPlanSummary}? " + globalConfig.NoPlanSummarySubmittedLang + " ?<a target='_blank' href='" + globalConfig.planSummaryURL + "?id={UniqueID}'>" + globalConfig.LinktoPlanSummariesLang + "</a>]<br>[{NUMRecord}? " + globalConfig.NoRecordSubmittedLang + " ?<a target='_blank' href='" + globalConfig.recordsURL + "?id={UniqueID}'>" + globalConfig.LinktoRecordsLang + "</a>]<br><i>" + globalConfig.OpenNewWindowLang + "</i><br>";
} else {
	globalConfig.NoAnnualReportSubmittedLang = "Aucun rapport annuel pr&eacute;sent&eacute;.";
	globalConfig.NoPlanSummarySubmittedLang = "Aucun sommaire de plan pr&eacute;sent&eacute;.";
	globalConfig.NoRecordSubmittedLang = "Aucun document pr&eacute;sent&eacute;.";
	globalConfig.LinktoAnnualReportsLang = "Lien aux rapports annuels";
	globalConfig.LinktoPlanSummariesLang = "Lien aux sommaires de plan";
	globalConfig.LinktoRecordsLang = "Lien aux documents";
	globalConfig.OpenNewWindowLang = "En cliquant sur ces liens, vous ouvrirez une nouvelle fen&ecirc;tre dans votre navigateur.";	
	//globalConfig.searchHelpTxt = "Rechercher par <strong>ville</strong>, <strong>installation</strong>, <strong>entreprise</strong>, <strong>substance</strong>, <strong>secteur</strong> ou cliquer sur aide pour plus d\u0027information sur la recherche avanc\u00e9e.";
	globalConfig.tabsTemplateContent = "Installation: <b>{Facility}</b><br>Entreprise: <b>{Organisation}</b><br>Adresse: <b>{StreetAddress} / {City}</b><br>N&deg; INRP: <b>{mapConfig.displayNPRI_ID(NPRI_ID)}</b><br>Secteur: <b>{mapConfig.displaySector(Sector)}</b><br>Substances toxiques: <b>{NUMsubst}</b><br><br>[{NUMsubst}? " + globalConfig.NoAnnualReportSubmittedLang + " ?<a target='_blank' href='" + globalConfig.annualReportURL + "?id={UniqueID}'>" + globalConfig.LinktoAnnualReportsLang + "</a>]<br>[{NUMPlanSummary}? " + globalConfig.NoPlanSummarySubmittedLang + " ?<a target='_blank' href='" + globalConfig.planSummaryURL + "?id={UniqueID}'>" + globalConfig.LinktoPlanSummariesLang + "</a>]<br>[{NUMRecord}? " + globalConfig.NoRecordSubmittedLang + " ?<a target='_blank' href='" + globalConfig.recordsURL + "?id={UniqueID}'>" + globalConfig.LinktoRecordsLang + "</a>]<br><i>" + globalConfig.OpenNewWindowLang + "</i><br>";	
}

globalConfig.pointBufferTool = {available: false};
globalConfig.extraImageService = {visible: false};
globalConfig.usejQueryUITable = false;  //Avoid loading extra javascript files
globalConfig.usePredefinedMultipleTabs = false;  //Avoid loading extra javascript files
globalConfig.allowMultipleIdentifyResult = false;
globalConfig.displayTotalIdentifyCount = false;
globalConfig.locationServicesList = [];
globalConfig.maxQueryZoomLevel = 11;
globalConfig.displayDisclaimer = true;
globalConfig.InformationLang = "Information";
globalConfig.postIdentifyCallbackName = "SportFish";
//globalConfig.infoWindowContentHeight = '700px';
globalConfig.infoWindowWidth  = '320px';
globalConfig.infoWindowHeight = '250px';
if (globalConfig.accessible) {
/*	var reportLang = "";
	if (globalConfig.language === "EN") {
		reportLang = "Report";	
	} else {
		reportLang = "Signaler";
	}
	//globalConfig.usePredefinedMultipleTabs = false;  //Avoid loading extra javascript files
	globalConfig.tableFieldList = [
		{name: globalConfig.fieldNamesList[0], value: "{globalConfig.wordCapitalize(LAKENAME)}"}, 
		{name: globalConfig.fieldNamesList[1], value: "{STN}"}, 
		{name: globalConfig.fieldNamesList[2], value: "{SITEID}"}, 
		{name: globalConfig.fieldNamesList[3], value: "{globalConfig.wordCapitalize(TOWNSHIP)}"}, 
		{name: globalConfig.fieldNamesList[4], value: "{SITEDESC}"}, 
		{name: globalConfig.fieldNamesList[5], value: "[{SE_COUNT}?N/A?<a href='{SE_URL_" + globalConfig.language + "}'>" + reportLang + "</a>]"},
		{name: globalConfig.fieldNamesList[6], value: "[{PH_COUNT}?N/A?<a href='{TP_URL_" + globalConfig.language + "}'>" + reportLang + "</a>]"},
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
	globalConfig.postConditionsCallbackName = "AccessibleWells";*/		
} else {
	//globalConfig.usePredefinedMultipleTabs = true;  //Avoid loading extra javascript files
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
	
	if(document.getElementById('searchSubstance').checked){
		mapConfig.searchSubstances(queryParams);
		return;
	}else if(document.getElementById('searchSector').checked){
		mapConfig.searchSector(queryParams);
		return;
	}else{		
		var name = searchString.toUpperCase();
		if(mapConfig.searchNPRI_ID(queryParams)){
			return;
		}		
		var coorsArray = name.split(/\s+/);
		var str = coorsArray.join(" ").toUpperCase();
		queryParams.requireGeocode = true;
		queryParams.where = "(UPPER(" + globalConfig.searchFieldFacilityName + ") LIKE '%" + str + "%') OR (UPPER(" + globalConfig.searchFieldOrganizationName + ") LIKE '%" + str + "%')";
		MOEMAP.queryLayersWithConditionsExtent(queryParams);
	}
};

globalConfig.searchChange = function(type){
	document.getElementById('map_query').value = "";
	if(type === "Substance"){
		$( "#map_query" ).autocomplete({source: substancesNames,
			select: function(e, ui) {
				var queryParams = {
					searchString: ui.item.value
				};	
				if (!globalConfig.accessible) {
					queryParams.withinExtent = document.getElementById(globalConfig.currentMapExtentDivId).checked;
				}
				MOEMAP.clearOverlays();			
				mapConfig.searchSubstances(queryParams);
			},
			disabled: false });
	}else if(type === "Sector"){
		$( "#map_query" ).autocomplete({source: sectorNames,
			select: function(e, ui) {
				var queryParams = {
					searchString: ui.item.value
				};	
				if (!globalConfig.accessible) {
					queryParams.withinExtent = document.getElementById(globalConfig.currentMapExtentDivId).checked;
				}
				MOEMAP.clearOverlays();
				mapConfig.searchSector(queryParams);
			},			
			disabled: false });
	}else{
		$( "#map_query" ).autocomplete({source: [], 
			disabled: true });
	}
};

var mapConfig = {
    searchSector: function (queryParams){
	
		var arrayName = queryParams.searchString.split(" - ");
		var code = parseInt(arrayName[0]);
		var max = 0;
		var min = 0;
		if(code<100){
			min = code * 10000;
			max = min + 9999;
		}else if(code<1000){
			min = code * 1000;
			max = min + 999;
		}else if(code<10000){
			min = code * 100;
			max = min + 99;
		}else if(code<100000){
			min = code * 10;
			max = min + 9;
		}else{
			min = code;
			max = code;
		}
		var where = "((" + globalConfig.searchFieldSector + " >= " + min + ") AND (" + globalConfig.searchFieldSector + " <= " + max + "))";
		queryParams.where = where;
		queryParams.requireGeocode = false;
		MOEMAP.queryLayersWithConditionsExtent(queryParams);		
	},
	isSector: function (name){
		var reg = /^\d+$/;
		if((name.length == 6) && (reg.test(name))){		
				return globalConfig.searchFieldSector + " = " + name;
		}
		return "";
	},		
    searchNPRI_ID: function (queryParams){	
		var queryString = mapConfig.isNPRI_ID(queryParams.searchString.toUpperCase());
		if(queryString !== ""){
			queryParams.where = queryString;
			queryParams.requireGeocode = false;
			MOEMAP.queryLayersWithConditionsExtent(queryParams);
			return true;
		}else{
			return false;
		}
	},
	isNPRI_ID: function (name){
		var reg = /^\d+$/;
		if(reg.test(name)){
			if(name.length > 10){
				return ""
			}
			while (name.length != 10){
				name = "0" + name
			}
			return globalConfig.searchFieldNPRI_ID + " = '" + name + "'";
		}
		return "";
	},
	displayNPRI_ID: function (npri_id){
		return parseInt(npri_id, 10);
	},
	displaySector: function (sector) {
		var str = sector.toString().substring(0, 3);
		for (var i = 0; i < sectorNames.length; i++){
			var arrayName = sectorNames[i].split(" - ");
			if(str === arrayName[0]) {
				return arrayName[1];
			}
		}
		return str;
	},
	searchSubstances: function(queryParams){
		/*var ii = -1; //substancesNames.indexOf(name) + 1;
		for(var i=0; i<substancesNames.length; i++){
			if(substancesNames[i] == queryParams.searchString){
				ii = i;
				break;
			}
		}
		ii = ii + 1;
		var index = "S";
		if(ii<10){
			index = index + "00" + ii;
		}else if(ii<100){
			index = index + "0" + ii;
		}else{
			index = index + ii;
		}*/
		var index = globalConfig.substancesDict[queryParams.searchString];
		var where = "(UPPER(" + globalConfig.searchFieldSubstance_List + ") LIKE '%" + index + "%')"; // OR (UPPER(Substance_List) LIKE '" + index + "%') OR (UPPER(Substance_List) LIKE '%" + index + "')";
		queryParams.where = where;
		queryParams.requireGeocode = false;
		MOEMAP.queryLayersWithConditionsExtent(queryParams);		
	},
	autoCompleteSearch: function(){
		$("#map_query" ).autocomplete({
			source: [],
			select: function(e, ui) {
			}
		});
		$( "#map_query" ).autocomplete({ disabled: true });
	}	
};

globalConfig.postInitialize = function () {
	document.getElementById('searchSector').checked = false;
	document.getElementById('searchSubstance').checked = false;
	document.getElementById('searchLocation').checked = true;
	if (!globalConfig.accessible){
		document.getElementById('currentMapExtent').disabled = false;
	}
};
$(function() {
	mapConfig.autoCompleteSearch();
});

