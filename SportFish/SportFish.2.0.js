var globalConfig = globalConfig || {};
globalConfig.url = "http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/sportfish/MapServer";
globalConfig.pointBufferTool = {available: false};
globalConfig.extraImageService = {visible: false};
globalConfig.usejQueryUITable = false;
globalConfig.usePredefinedMultipleTabs = false;
globalConfig.allowMultipleIdentifyResult = false;
globalConfig.displayTotalIdentifyCount = false;
globalConfig.locationServicesList = [];
globalConfig.maxQueryZoomLevel = 11;
globalConfig.displayDisclaimer = true;
globalConfig.InformationLang = "Information";
globalConfig.postIdentifyCallbackName = "SportFish";
globalConfig.postConditionsCallbackName = "SportFish";
globalConfig.queryLayerList = [{
	url: globalConfig.url + "/0",
	tabsTemplate: [{
		label: globalConfig.InformationLang,
		content:globalConfig.tabsTemplateContent
	}]
}];
globalConfig.search = function(){
	var searchString = document.getElementById(globalConfig.searchInputBoxDivId).value.trim();
	if(searchString.length === 0){
		return;
	}
	MOEMAP.clearOverlays();
	var withinExtent = document.getElementById(globalConfig.currentMapExtentDivId).checked;
	var queryParams = {
		searchString: searchString,
		withinExtent: withinExtent
	};	
	if(document.getElementById('searchMapLocation').checked){
		var coorsArray = searchString.split(/\s+/);
		var str = coorsArray.join(" ").toUpperCase();
		str = globalConfig.replaceChar(str, "'", "''");
		str = globalConfig.replaceChar(str, "\u2019", "''");
		queryParams.where = "UPPER(LOCNAME_" + globalConfig.language + ") LIKE '%" + str + "%'";
		queryParams.requireGeocode = true;
		queryParams.address = searchString;
	}else{
		var getQueryCondition = function(name){
			var str = name.toUpperCase();
			str = globalConfig.replaceChar(str, '&', ', ');
			str = globalConfig.replaceChar(str, ' AND ', ', '); 
			str = str.trim();
			var nameArray = str.split(',');
			var max = nameArray.length;
			var res = [];
			var inform = [];
			var processAliasFishName = function(fishname){
				var aliasList = {
					GERMAN_TROUT: ["BROWN_TROUT"],
					SHEEPHEAD:	["FRESHWATER_DRUM"],
					STEELHEAD:	["RAINBOW_TROUT"],
					SUNFISH:	["PUMPKINSEED"],
					BARBOTTE:	["BROWN_BULLHEAD"],
					BLACK_BASS:	["LARGEMOUTH_BASS","SMALLMOUTH_BASS"],
					CALICO_BASS:	["BLACK_CRAPPIE"],
					CRAWPIE:	["BLACK_CRAPPIE","WHITE_CRAPPIE"],
					GREY_TROUT:	["LAKE_TROUT"],
					HUMPBACK_SALMON:	["PINK_SALMON"],
					KING_SALMON:	["CHINOOK_SALMON"],
					LAKER:	["LAKE_TROUT"],
					MENOMINEE:	["ROUND_WHITEFISH"],
					MUDCAT:	["BROWN_BULLHEAD"],
					MULLET:	["WHITE_SUCKER"],
					PANFISH:	["BLUEGILL","ROCK_BASS","PUMPKINSEED"],
					PICKEREL:	["WALLEYE"],
					SILVER_BASS:	["WHITE_BASS"],
					SILVER_SALMON:	["COHO_SALMON"],
					SPECKLED_TROUT:	["BROOK_TROUT"],
					SPRING_SALMON:	["CHINOOK_SALMON"]
				};
				var alias = aliasList[fishname];
				var fish = globalConfig.wordCapitalize(globalConfig.replaceChar(fishname, '_', ' '));
				if (typeof(alias) === "undefined"){
					var result = {
						condition: "(SPECIES_" + globalConfig.language + " like '%" + fishname +"%')",
						information: fish
					};
					return result;
				}else{
					var res = [];
					var fishArray = [];
					for (var i = 0; i < alias.length; i++){
						res.push("(SPECIES_" + globalConfig.language + " like '%" + alias[i] +"%')");				
						var str = globalConfig.wordCapitalize(globalConfig.replaceChar(alias[i], '_', ' '));
						fishArray.push(str.trim());
					}
					var result = {
						condition: "(" + res.join(" OR ") + ")",
						information: fish + " ("  + fishArray.join(", ") + ")"
					};
					return result;
				}
			}
			for (var i = 0; i < max; i++){
				var str1 = (nameArray[i]).trim();
				if(str1.length > 0){
					var coorsArray = str1.split(/\s+/);
					str1 = coorsArray.join("_");
					var temp = processAliasFishName(str1);
					res.push(temp.condition);
					inform.push(temp.information);
				}
			}		
			var result = {
				condition: res.join(" AND "),
				information: inform.join(", ")
			};
			return result;
		};	
		var temp = getQueryCondition(searchString);
		queryParams.where = temp.condition;
		queryParams.requireGeocode = false;
	}	
	MOEMAP.queryLayersWithConditionsExtent(queryParams);	
};
globalConfig.searchChange = function () {};



