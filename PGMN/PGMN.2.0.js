//var globalConfig = globalConfig || {};
globalConfig.chooseLang = function (en, fr) {return (globalConfig.language === "EN") ? en : fr;};
globalConfig.searchableFieldsList = [{en: "PGMN well ID", fr: "num\u00e9ro du puits du r\u00e9seau"}, {en: "well depth", fr: "profondeur du puits"}, {en: "address", fr: "adresse"}];

//globalConfig.url = "http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/PGMN/MapServer";
globalConfig.pointBufferTool = {available: false};
globalConfig.extraImageService = {visible: false};
globalConfig.usejQueryUITable = true;  //Avoid loading extra javascript files
if (globalConfig.accessible) {
	globalConfig.usePredefinedMultipleTabs = false;  //Avoid loading extra javascript files
} else {
	globalConfig.usePredefinedMultipleTabs = true;
}
globalConfig.allowMultipleIdentifyResult = false;
globalConfig.displayTotalIdentifyCount = false;
globalConfig.locationServicesList = [];
globalConfig.maxQueryZoomLevel = 10;
globalConfig.displayDisclaimer = true;
globalConfig.InformationLang = "Information";
globalConfig.postIdentifyCallbackName = "Wells";
//globalConfig.postConditionsCallbackName = "SportFish";
globalConfig.postConditionsCallbackName = "Wells";
globalConfig.infoWindowWidth = '470px';
globalConfig.infoWindowHeight = "400px";
globalConfig.infoWindowContentHeight = "330px";
globalConfig.infoWindowContentWidth = "450px";
//globalConfig.SecchiDepth_ReportName = globalConfig.chooseLang("en_pgmn_report", "fr_pgmn_report");
globalConfig.SecchiDepth_ReportName = globalConfig.chooseLang("water-chemistry-report", "le-rapport-des-donnees-chimiques-de-leau");
//globalConfig.SecchiDepth_ReportName = globalConfig.chooseLang("PGMN_Report.htm", "PGMN_Report.htm");
globalConfig.tabsTemplateContentChemistry = globalConfig.chooseLang("Each PGMN well is initially sampled and chemically analyzed at the Ministry of Environment laboratory for a comprehensive set of chemical parameters including: general chemistry, metals, major ions, a suite of volatile organic compounds, and a suite of pesticides and herbicides. Bacteria are not monitored under the PGMN program. Approximately 380 of the PGMN wells have been selected for long-term annual water chemistry monitoring. The long-term monitoring parameters include: general chemistry, metals, and major ions. Samples are collected from the wells in the Fall season and chemically analyzed at either the Ministry laboratory or a number of private laboratories.<br><br>Water samples have been collected from this well on {globalConfig.getTable(CHEM_CONTE)}. <br><br>By clicking on the Water Chemistry Report link below, you can view the list of chemical parameters, the chemical results and chemical parameter graphs for this well.<br><br><a target='_blank' href='" + globalConfig.SecchiDepth_ReportName + "?id={PGMN_WELL}'>Water Chemistry Report</a>", "Le minist\u00e8re de l'Environnement effectue en laboratoire une analyse chimique de l'eau de chaque puits du r\u00e9seau, notamment les param\u00e8tres chimiques g\u00e9n\u00e9raux, les m\u00e9taux, les ions majeurs, les compos\u00e9s organiques volatils et divers pesticides et herbicides. Le programme ne surveille pas les bact\u00e9ries. Environ 380 des puits du r\u00e9seau ont \u00e9t\u00e9 d\u00e9sign\u00e9s comme devant faire l'objet d'une surveillance chimique de l'eau \u00e0 long terme. Les param\u00e8tres de surveillance \u00e0 long terme sont les suivants : param\u00e8tres chimiques g\u00e9n\u00e9raux, m\u00e9taux, ions majeurs. Des \u00e9chantillons sont pr\u00e9lev\u00e9s \u00e0 l'automne, puis analys\u00e9s soit dans un laboratoire du minist\u00e8re, soit dans un laboratoire priv\u00e9.<br><br>Des \u00e9chantillons d'eau ont \u00e9t\u00e9 pr\u00e9lev\u00e9s dans ce puits les dates suivantes: {globalConfig.getTable(CHEM_CONTE)}. <br><br>En cliquant sur le rapport des donn\u00e9es chimiques de l'eau ci-dessous, on peut voir la liste des param\u00e8tres chimiques, les r\u00e9sultats d'analyse chimique et les diagrammes des param\u00e8tres chimiques de ce puits.<br><br><a target='_blank' href='" + globalConfig.SecchiDepth_ReportName + "?id={PGMN_WELL}'>Rapport des donn\u00e9es chimiques de l'eau</a>");
//globalConfig.tableContent = globalConfig.chooseLang("<table class='fishTable'  border='1'><tr><th><center>PGMN Well ID</center></th><th><center>Conservation Authority</center></th><th><center>County</center></th><th><center>Township</center></th><th><center>Site ID</center></th><th><center>Latitude</center></th><th><center>Longitude</center></th><th><center>Ground Elevation (m.a.s.l.)</center></th></tr><tr><td  class='shaded'>{PGMN_WELL}</td><td  class='shaded'>{CONS_AUTHO}</td><td  class='shaded'>{globalConfig.wordCapitalize(COUNTY)}</td><td  class='shaded'>{globalConfig.wordCapitalize(TOWNSHIP)}, {CONCESSION}, {LOT}</td><td  class='shaded'>{SiteID}</td><td  class='shaded'>{globalConfig.deciToDegree(LATITUDE)}</td><td  class='shaded'>{globalConfig.deciToDegree(LONGITUDE)}</td><td  class='shaded'>{ELVA_GROUN}</td></tr><tr><th><center>Well Depth (meters below ground)</center></th><th><center>Aquifer Type</center></th><th><center>Lithology of Aquifer</center></th><th><center>Water Well Record Number (WWR)</center></th><th><center>Stratigraphy Description from reports or notes</center></th><th><center>WWR for wells near to the PGMN well</center></th><th><center>Diameter of Well or Piezometer (cm)</center></th><th><center>Screen Interval or Open Hole Interval (meters below ground)</center></th></tr><tr><td  class='shaded'>{WELL_DEPTH}</td><td  class='shaded'>{AQUIFER_TY}</td><td  class='shaded'>{AQUIFER_LI}</td><td  class='shaded'>{STRATIGRAP}</td><td  class='shaded'>{STRATI_DES}</td><td  class='shaded'>{NO_RECORD}</td><td  class='shaded'>{WEL_PIEZOM}</td><td  class='shaded'>{SCREEN_HOL}</td></tr></table><br>[{Level_Avai}?  ?<a target='_blank' href='http://files.ontariogovernment.ca/moe_mapping/mapping/PGMN/WaterLevel/csv/{PGMN_WELL}.zip'>Water Level Data (csv file) for PGMN Well: {PGMN_WELL}</a><br>][{Chem_Avai}?  ?<a target='_blank' href='" + globalConfig.SecchiDepth_ReportName + "?id={PGMN_WELL}'>Water Chemistry Report for PGMN Well: {PGMN_WELL}</a><br>][{Prep_Avai}?  ?<a target='_blank' href='http://files.ontariogovernment.ca/moe_mapping/mapping/PGMN/Precipitation/csv/{Site_ID}.csv'>Precipitation Data (csv file) for PGMN Well: {PGMN_WELL}</a><br>]<br><br>", "<table class='fishTable'  border='1'><tr><th><center>Num\u00e9ro du puits du r\u00e9seau</center></th><th><center>Office de protection de la nature</center></th><th><center>Comt\u00e9</center></th><th><center>Canton</center></th><th><center>Num\u00e9ro du site</center></th><th><center>Latitude</center></th><th><center>Longitude</center></th><th><center>Altitude (m.a.s.l.)</center></th></tr><tr><td  class='shaded'>{PGMN_WELL}</td><td  class='shaded'>{CONS_AUTHO}</td><td  class='shaded'>{globalConfig.wordCapitalize(COUNTY)}</td><td  class='shaded'>{globalConfig.wordCapitalize(TOWNSHIP)}, {CONCESSION}, {LOT}</td><td  class='shaded'>{SiteID}</td><td  class='shaded'>{globalConfig.deciToDegree(LATITUDE)}</td><td  class='shaded'>{globalConfig.deciToDegree(LONGITUDE)}</td><td  class='shaded'>{ELVA_GROUN}</td></tr><tr><th><center>Profondeur du puits (m\u00e8tres sous le sol)</center></th><th><center>Type d'aquif\u00e8re</center></th><th><center>Lithologie de l'aquif\u00e8re</center></th><th><center>Num\u00e9ro du registre de puits d'eau (NRPE)</center></th><th><center>Description stratigraphique des rapports ou notes</center></th><th><center>NRPE des puits situ\u00e9s pr\u00e8s d'un puits du r\u00e9seau</center></th><th><center>Diam\u00e8tre du puits ou pi\u00e9zom\u00e8tre (cm)</center></th><th><center>Intervalle d'\u00e9cran ou intervalle \u00e0 trou ouvert (m\u00e8tres sous terre)</center></th></tr><tr><td  class='shaded'>{WELL_DEPTH}</td><td  class='shaded'>{AQUIFER_TY}</td><td  class='shaded'>{AQUIFER_LI}</td><td  class='shaded'>{STRATIGRAP}</td><td  class='shaded'>{STRATI_DES}</td><td  class='shaded'>{NO_RECORD}</td><td  class='shaded'>{WEL_PIEZOM}</td><td  class='shaded'>{SCREEN_HOL}</td></tr></table><br>[{Level_Avai}?  ?<a target='_blank' href='http://files.ontariogovernment.ca/moe_mapping/mapping/PGMN/WaterLevel/csv/{PGMN_WELL}.zip'>Donn\u00e9es sur le niveau de l'eau (format CSV) {PGMN_WELL}</a><br>][{Chem_Avai}?  ?<a target='_blank' href='" + globalConfig.SecchiDepth_ReportName + "?id={PGMN_WELL}'>Rapport des donn\u00e9es chimiques de l'eau: {PGMN_WELL}</a><br>][{Prep_Avai}?  ?<a target='_blank' href='http://files.ontariogovernment.ca/moe_mapping/mapping/PGMN/Precipitation/csv/{Site_ID}.csv'>Donn\u00e9es sur les pr\u00e9cipitations (format CSV): {PGMN_WELL}</a><br>]<br><br>");
globalConfig.fieldNamesList = globalConfig.chooseLang(["PGMN Well ID", "Latitude", "Longitude", "Water Level", "Water Chemistry", "Precipitation"], ["Num\u00e9ro du puits du r\u00e9seau", "Latitude", "Longitude", "niveau de l'eau", "Chimie de l'eau", "précipitation"]);
globalConfig.tableFieldList = [
	{name: globalConfig.fieldNamesList[0], value: "{PGMN_WELL}"}, 
	{name: globalConfig.fieldNamesList[1], value: "{globalConfig.deciToDegree(LATITUDE)}"},		
	{name: globalConfig.fieldNamesList[2], value: "{globalConfig.deciToDegree(LONGITUDE)}"}, 
	{name: globalConfig.fieldNamesList[3], value: "[{Level_Avai}?N/A?<a target='_blank' href='http://files.ontariogovernment.ca/moe_mapping/mapping/PGMN/WaterLevel/csv/{PGMN_WELL}.zip'>Zipped CSV</a>]"}, 
	{name: globalConfig.fieldNamesList[4], value: "[{Chem_Avai}?N/A?<a target='_blank' href='" + globalConfig.SecchiDepth_ReportName + "?id={PGMN_WELL}'>HTML</a>]"}, 
	{name: globalConfig.fieldNamesList[5], value: "[{Prep_Avai}?N/A?<a target='_blank' href='http://files.ontariogovernment.ca/moe_mapping/mapping/PGMN/Precipitation/csv/{Site_ID}.csv'>CSV</a>]"}
];

globalConfig.tableSimpleTemplateTitleLang = "";
if (globalConfig.accessible) {
	globalConfig.queryLayerList = [{
		url: globalConfig.url + "/0",
		tableTemplate: {
			title: globalConfig.tableSimpleTemplateTitleLang, 
			content: globalConfig.tableContent,
			head: "",
			tail: ""
		} 
	},{
		url: globalConfig.url + "/1",
		tableTemplate: {
			title: globalConfig.tableSimpleTemplateTitleLang, 
			content: globalConfig.tableContent,
			head: "",
			tail: ""
		} 
	}];
	globalConfig.postConditionsCallbackName = "AccessibleWells";
} else {
	globalConfig.tabsTemplate = [{
			label: globalConfig.WellLang,
			content:globalConfig.tabsTemplateContentWell
		},{
			label: "[{Level_Avai}?  ?" + globalConfig.WaterLevelLang + "]", 
			content:globalConfig.tabsTemplateContentWaterLevel
		},{
			label: "[{Chem_Avai}?  ?" + globalConfig.ChemistryLang + "]",
			content:globalConfig.tabsTemplateContentChemistry
		},{
			label: "[{Prep_Avai}?  ?" + globalConfig.PrecipitationLang + "]",
			content:globalConfig.tabsTemplateContentPrecipitation
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
	},{
		url: globalConfig.url + "/1",
		tabsTemplate: globalConfig.tabsTemplate,
		tableSimpleTemplate: {
			title: globalConfig.tableSimpleTemplateTitleLang, 
			content: globalConfig.tableFieldList/*globalConfig.tableContent,
			head: "",
			tail: ""*/
		} 
	}];	
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
	var searchPGMNWellID = function (queryParams){
		var isPGMNWellID = function (name){
			var reg = /^\d+$/;
			//W0000119-2		
			if(name.length == 10){		
				var firstLetter = name.substring(0,1);
				var middleNumber = name.substring(1, 8);
				var lastLetter = name.substring(9);
				var secondLastLetter = name.substring(8, 9);
				if(firstLetter === "W" && reg.test(middleNumber) && reg.test(lastLetter) &&(secondLastLetter === "-")){
					return "PGMN_WELL = '" + name + "'";
				}			
			}
			//W0000119
			if(name.length == 8){		
				var firstLetter = name.substring(0,1);
				var middleNumber = name.substring(1, 8);
				if(firstLetter === "W" && reg.test(middleNumber)){
					return "PGMN_WELL LIKE '" +  name + "-_'";
				}			
			}
			//119-1, 2-1, 18-2
			if((name.length <= 5)&&(name.indexOf("-") > 0)){		
				var middleNumber = name.substring(0, name.length-2);
				var lastLetter = name.substring(name.length-1);
				var secondLastLetter = name.substring(name.length-2, name.length-1);			
				if(reg.test(middleNumber) && reg.test(lastLetter) &&(secondLastLetter === "-")){
					if( name.length === 5){
						return "PGMN_WELL = 'W0000" + name + "'";
					}
					if( name.length === 4){
						return "PGMN_WELL = 'W00000" + name + "'";
					}
					if( name.length === 3){
						return "PGMN_WELL = 'W000000" + name + "'";
					}
					if( name.length < 3){
						return "";
					}				
				}			
			}
			//119, 2, 18
			if(name.length <= 3){		
				if(reg.test(name)){
					if( name.length === 3){
						return "PGMN_WELL LIKE 'W0000" + name + "-_'";
					}
					if( name.length === 2){
						return "PGMN_WELL LIKE 'W00000" + name + "-_'";
					}
					if( name.length === 1){
						return "PGMN_WELL LIKE 'W000000" + name + "-_'";
					}
				}			
			}		
			return "";
		};
		var name = queryParams.searchString.toUpperCase();
		var queryString = isPGMNWellID(name);
		if(queryString !== ""){
			queryParams.requireGeocode = false;
			queryParams.where = queryString;			
			MOEMAP.queryLayersWithConditionsExtent(queryParams);	
			return true;
		}else{
			return false;
		}
	}; 
	if(searchPGMNWellID(queryParams)){
		return;
	}
	var searchAquiferType = function (queryParams){
		var isAquiferType = function (name){
			if(name === "BEDROCK" || name === "OVERBURDEN" || name === "INTERFACE"){
				return true;
			}else{
				return false;
			}			
		};
		var name = queryParams.searchString.toUpperCase();
		if(isAquiferType(name)){
			queryParams.requireGeocode = false;
			queryParams.where = "AQUIFER_TY = '" + name +  "'";
			MOEMAP.queryLayersWithConditionsExtent(queryParams);	
			return true;
		}else{
			return false;
		}
	};
	if(searchAquiferType(queryParams)){			
		return;
	}
	var searchWellDepth = function(queryParams){
		var name = queryParams.searchString.toUpperCase();
		var coorsArray = name.split(/\s+/);
		if (coorsArray.length != 2) {
			return false;
		}
		if((coorsArray[1] != "M")&&(coorsArray[1] != "METER")&&(coorsArray[1] != "METRE")&&(coorsArray[1] != "METERS")&&(coorsArray[1] != "METRES")){
			return false;
		}
		var reg = /^(-?\d+)(\.\d+)?$/;
		if(!reg.test(coorsArray[0])){
			return false;
		}
		var depth = parseFloat(coorsArray[0]);
		queryParams.requireGeocode = false;
		queryParams.where = "((WELL_DEPTH > " + (depth-0.1) +  ") AND (WELL_DEPTH < " +  (depth+0.1) + "))";
		MOEMAP.queryLayersWithConditionsExtent(queryParams);	
		return true;
	};
	if(searchWellDepth(queryParams)){			
		return;
	}		
	var isFromAndTo = function(name){
		var str = name;
		if ((str.indexOf("FROM ") == 0)&&(str.split(" TO ").length == 2)){
			return 1;
		}
		if ((str.indexOf("DU ") == 0)&&(str.split(" AU ").length == 2)){
			return 2;
		}
		if ((str.indexOf("DE ") == 0)&&(str.split(" A ").length == 2)){
			return 3;
		}
	};
	var name = queryParams.searchString.toUpperCase();
	if (isFromAndTo(name)>0) {
		var strArray = name.substring(5).split(" TO ");
		if(isFromAndTo(name) == 2){
			strArray = name.substring(3).split(" AU ");
		}
		if(isFromAndTo(name) == 3){
			strArray = name.substring(3).split(" A ");
		}
		var isFromAndToDepth = function(strArray){
			var maxArray = (strArray[1]).split(/\s+/);
			if(maxArray.length == 2){
				if((maxArray[1] == "M")||(maxArray[1] == "METER")||(maxArray[1] == "METRE")||(maxArray[1] == "METERS")||(maxArray[1] == "METRES")){
					var minDepth = strArray[0];
					var maxDepth = maxArray[0];
					var reg = /^(-?\d+)(\.\d+)?$/;
					if(reg.test(minDepth)&&reg.test(maxDepth)){
						var minDep = parseFloat(minDepth);
						var maxDep = parseFloat(maxDepth);
						if((maxDep > minDep)&&(maxDep < 999999)){
							return true;
						}
					}
				}
			}		
			return false;
		};		
		if (isFromAndToDepth(strArray)) {
			var minDepth = (strArray[0]).split(/\s+/)[0];
			var maxDepth = (strArray[1]).split(/\s+/)[0];
			queryParams.requireGeocode = false;
			queryParams.where = "((WELL_DEPTH >= " + minDepth +  ") AND (WELL_DEPTH <= " +  maxDepth + "))";
			MOEMAP.queryLayersWithConditionsExtent(queryParams);	
			return;
		}else{
			queryParams.totalCount = 0;
			globalConfig.resultFoundSimple(queryParams);
		}			
	}else{
		var coorsArray = name.split(/\s+/);
		var str = coorsArray.join(" ").toUpperCase();
		queryParams.requireGeocode = true;
		queryParams.where = "UPPER(CONS_AUTHO) LIKE '%" + str + "%'";
		queryParams.address = searchString;
		MOEMAP.queryLayersWithConditionsExtent(queryParams);			
	}		
};
globalConfig.getTable = function (data){
	var strArray = data.split(",");
	var result = "";
	var andStr = "and";
	if(globalConfig.language == "FR"){
		andStr = "et";
	}
	if(strArray.length == 1){				
		result = data;
	}else if(strArray.length == 2){
		result = strArray[0] + " " + andStr + " " + strArray[1];
	}else{
		for(var i=0;i<strArray.length-1;i++){
			result = result + strArray[i] + ", ";
		}
		result = result + andStr + " " + strArray[strArray.length-1];
	}
	return result;
};
