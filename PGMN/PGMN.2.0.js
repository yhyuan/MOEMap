var globalConfig = globalConfig || {};



globalConfig.url = "http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/PGMN/MapServer";
globalConfig.pointBufferTool = {available: false};
globalConfig.extraImageService = {visible: false};
globalConfig.usejQueryUITable = false;
if (globalConfig.accessible) {
	globalConfig.usePredefinedMultipleTabs = false;
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
		tabsTemplate: globalConfig.tabsTemplate
	},{
		url: globalConfig.url + "/1",
		tabsTemplate: globalConfig.tabsTemplate
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
