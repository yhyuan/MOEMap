globalConfig.pointBufferTool = {available: false};
globalConfig.extraImageService = {visible: false};
globalConfig.usejQueryUITable = false;  //Avoid loading extra javascript files
if (globalConfig.accessible) {
	globalConfig.usePredefinedMultipleTabs = false;  //Avoid loading extra javascript files
} else {
	globalConfig.usePredefinedMultipleTabs = true;
}
globalConfig.allowMultipleIdentifyResult = false;
globalConfig.displayTotalIdentifyCount = false;
globalConfig.locationServicesList = [];
globalConfig.maxQueryZoomLevel = 11;
globalConfig.displayDisclaimer = true;
globalConfig.InformationLang = "Information";
//globalConfig.postIdentifyCallbackName = "SportFish";
globalConfig.postIdentifyCallbackName = "Wells";
globalConfig.postConditionsCallbackName = "Wells";

globalConfig.infoWindowWidth  = '320px';
globalConfig.infoWindowHeight = '390px';
globalConfig.infoWindowContentHeight = '350px';

if (globalConfig.accessible) {
	var reportLang = "";
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
	globalConfig.postConditionsCallbackName = "AccessibleWells";		
} else {
	//globalConfig.usePredefinedMultipleTabs = true;  //Avoid loading extra javascript files
	globalConfig.queryLayerList = [{
		url: globalConfig.url + "/0",
		tabsTemplate: [{
			label: globalConfig.InformationLang,
			content: globalConfig.tabsTemplateContentInformation
		}, {
			label: "[{Chem_Avai}?  ?" + globalConfig.ChemistryLang + "]",
			content: globalConfig.tabsTemplateContentChemistry
		}]
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
	
	if(document.getElementById('searchWaterSource').checked){
		queryParams.where = "UPPER(SOURCE) LIKE '%" + searchString.toUpperCase() +  "%'";
		queryParams.requireGeocode = false;
		MOEMAP.queryLayersWithConditionsExtent(queryParams);
		return;
	}else if(document.getElementById('searchDWSName').checked){
		queryParams.where = "UPPER(DWSNAME) LIKE '%" + searchString.toUpperCase() +  "%'";
		queryParams.requireGeocode = false;
		MOEMAP.queryLayersWithConditionsExtent(queryParams);
		return;
	}else{				
		if (globalConfig.accessible) {
			globalConfig.noResultFound();
			return;
		}
		var queryParams = {
			searchString: searchString,
			withinExtent: globalConfig.withinExtent
		};
		MOEMAP.geocodeAddress(queryParams);		
	}
};
globalConfig.searchInputBoxDivId = "map_query";
var queryLayer = new gmaps.ags.Layer(globalConfig.url + "/0");
queryLayer.query({
	returnGeometry: false,
	where: "1=1",
	outFields: ["DWSNAME", "SOURCE"]
}, function (rs) {
	var fs = rs.features;
	globalConfig.dwsList = _.map(fs, function(feature) {
		return mapConfig.wordCapitalize(feature.attributes.DWSNAME);
	}).sort();
	
	globalConfig.waterSourceList = _.map(_.uniq(_.map(fs, function(feature) {
		return feature.attributes.SOURCE;
	})), function(waterScource) {
		return mapConfig.wordCapitalize(waterScource);
	}).sort();
	
	//console.log(globalConfig.waterSourceList);
});
globalConfig.minMapScale = 5;
globalConfig.maxMapScale = 14;
globalConfig.isCoordinatesVisible = false;

var mapConfig = {
	//waterSourceList: ["Atikokan River","Bay Of Quinte - Lake Ontario","Blackwater River","Bonnechere River","Bruce Channel - Red Lake","Chenal Ecarte","Corry Lake","Crowe River","Detroit River","Eagle Lake","Elliot Lake","Englehart River","English River","Fairy Lake","Georgian Bay - Lake Huron","Grand River","Grand River & Ground Water","Ground Water","Groundhog River","Gull Lake","Ivanhoe River","Kebsquasheshing River","Lake Couchiching & Ground Water","Lake Erie","Lake George","Lake Huron","Lake Huron & Ground Water","Lake Muskoka","Lake Nipissing","Lake Of The Woods","Lake Ontario","Lake Simcoe","Lake Simcoe & Ground Water","Lake St. Clair","Lake St. Lawrence","Lake Superior","Lake Superior & Ground Water","Lehman Dam Reservoir - North Creek - South Creek &","Loch Lomond Raw","Lost Lake","Mattagami River","Mattawishkwia River","Mcmanus Bay At Sandy Bay - Red Lake","Mill Pond - Garry River","Millhaven Creek","Missinaibi River","Niagara River","Nipigon Bay - Lake Superior","Nipigon River","North Creek","Nottawasaga Bay - Georgian Bay - Lake Huron","Otonabee River","Ottawa River","Pelican Lake","Rainy River","Ramsey Lake","Rideau River","Roblin Lake","Ruhl Lake & Ground Water","Russett Lake","Scugog River","Skookum Bay - Red Lake","South Nation River","St. Clair River","St. Clair River Via Chenal Ecarte","St. Lawrence River","Sydenham River","Tay River","Tremur Lake & Ground Water","Trent River","Trout Lake","Wabigoon Lake","Wanapitei River","Wawa Lake","Welland Canal"],
	//dwsList: ["A.L. Dafoe  Drinking Water System","Ajax Wtp (Old)","Alcona Drinking Water System","Alexandria  Drinking Water System","Alvinston Water Treatment Plant (Old)","Ameliasburgh Hamlet  Drinking Water System","Amherstburg Drinking Water System","Atikokan  Drinking Water System","Balmertown (Sandy Bay) Water Treat Plant","Balmertown Cochenour Mackenzie Island Drinking Water System","Bare Point Road Drinking Water System","Barrie Drinking Water System","Bayside Drinking Water System","Beardmore  Drinking Water System","Beaverton Drinking Water System","Bel-Erin Subdivision  Well Supply","Belle River  Water Treatment Plant","Belleville  Drinking Water System","Bolton Well Supply","Bourget Well Supply","Bowmanville Drinking Water System","Bracebridge (Kirby'S Beach)  Drinking Water System","Bradford/Bondhead Drinking Water System","Brighton Springs Drinking Water System","Brockville  Drinking Water System","Callander  Drinking Water System","Casselman  Drinking Water System","Central Drinking Water System - Britannia","Central Drinking Water System - Lemieux Island","Centre Wellington Drinking Water System","Chalk River  Drinking Water System","Chapleau Drinking Water System","Charlton  Drinking Water System","Chatham-Kent Drinking Water System - Chatham","Chatham-Kent Drinking Water System - Wallaceburg","City Of Brantford Drinking Water System","City Of Toronto Drinking Water System - F. J. Horgan","City Of Toronto Drinking Water System - R. L.Clark","City Of Toronto Drinking Water System - R.C.Harris","City Of Toronto Drinking Water System - Toronto Island","City Of Windsor Drinking Water System","Clarence Creek Well Supply","Cobourg Drinking Water System","Collingwood Drinking Water System","Cornwall  Drinking Water System","Decew Falls-Niagara Falls Drinking Water System - Decew Falls","Decew Falls-Niagara Falls Drinking Water System - Niagara Falls","Deep River  Drinking Water System","Delhi Drinking Water System","Delhi Water Treatment Plant (Old)","Deloro  Drinking Water System","Deseronto  Drinking Water System","Dorchester Drinking Water System","Dowling Drinking Water System","Dryden  Drinking Water System","Dunnville Drinking Water System","Ear Falls  Drinking Water System","Echo Bay  Drinking Water System","Elgin Area Primary Water Supply System","Elliot Lake  Drinking Water System","Emo  Drinking Water System","Erin Drinking Water System","Essex Drinking Water System - Harrow-Colchester South","Fauquier  Drinking Water System","Foleyet  Water Treatment Plant","Fort Frances  Drinking Water System","Georgetown Drinking Water System","Georgina Drinking Water System - Georgina","Georgina Drinking Water System - Keswick","Glen Walter  Drinking Water System","Goderich Drinking Water System","Gore Bay  Drinking Water System","Gravenhurst (Muskoka)  Drinking Water System","Grimsby Drinking Water System","Guelph Drinking Water System","Hamilton Drinking Water System - Woodward","Havelock  Drinking Water System","Hawkesbury  Drinking Water System","Hearst Drinking Water System","Hillsburgh Drinking Water System","Hudson  Drinking Water System","Huntsville (Fairyview)  Drinking Water System","Ingersoll Drinking Water System","Ingleside  Water Treatment Plant","Innisfil Heights Drinking Water System","Iroquois  Water Treatment Plant","Kenora Area  Drinking Water System","Kingston Drinking Water System - King Street","Kirkland Lake  Drinking Water System","Lake Huron Primary Water Supply System","Lakeshore Drinking Water System","Lambton Area Water Supply System","Lancaster Well Supply (Old)","Lindsay  Drinking Water System","Long Sault  Water Treatment Plant","Madsen  Drinking Water System","Manitouwadge  Drinking Water System","Marathon  Drinking Water System","Marmora  Drinking Water System","Mattice  Drinking Water System","Midland Drinking Water System","Mountainview Subdivision  Well Supply","Nanticoke Drinking Water System","Nipigon  Drinking Water System","North Bay  Drinking Water System","Norwich Drinking Water System","Odessa Water Treatment Plant (Old)","Ohsweken  Water Treatment Plant","Orangeville Drinking Water System","Orillia Drinking Water System","Oshawa-Whitby-Ajax Drinking Water System - Ajax","Oshawa-Whitby-Ajax Drinking Water System - Oshawa","Oshawa-Whitby-Ajax Drinking Water System - Whitby","Otterville-Springford Drinking Water System","Owen Sound Drinking Water System","Paisley  Water Treatment Plant","Payette (Penetanguishene) Drinking Water System","Pembroke  Drinking Water System","Perth  Drinking Water System","Peterborough  Drinking Water System","Picton  Drinking Water System","Plantagenet  Water Treatment Plant","Port Colborne Drinking Water System","Port Dover Drinking Water System","Port Elgin  Water Treatment Plant","Port Hope Drinking Water System","Port Hope Water Treatment Plant","Port Perry Drinking Water System","Port Rowan Drinking Water System","Prescott  Drinking Water System","Rainy River  Drinking Water System","Red Lake  Drinking Water System","Red Rock  Drinking Water System","Region Of Waterloo Drinking Water System - Cambridge","Region Of Waterloo Drinking Water System - Kitchener","Region Of Waterloo Drinking Water System - Mannheim","Region Of Waterloo Drinking Water System - Waterloo","Renfrew  Drinking Water System","Rockland  Drinking Water System","Rosehill Drinking Water System","Saugeen Shores Drinking Water System","Sault Ste Marie  Drinking Water System","Sault Ste Marie Well Supply (Old)","Sault Ste Marie Wtp (Old)","Simcoe Drinking Water System","Sioux Lookout Urban  Drinking Water System","Smiths Falls  Drinking Water System","Smooth Rock Falls  Drinking Water System","South Dundas Regional Drinking Water System","South Halton Drinking Water System - Burlington","South Halton Drinking Water System - Milton","South Halton Drinking Water System - Oakville","South Huron Distribution System","South Peel Drinking Water System - Lakeview","South Peel Drinking Water System - Lorne Park","St Isidore De Prescott Well Supply","St Pascal(Clarence Township) Well Supply","Stratford Drinking Water System","Sudbury Drinking Water System - David St","Sudbury Drinking Water System - Garson","Sudbury Drinking Water System - Wahnapitei","Sunderland Drinking Water System","Tecumseh Water Treatment Plant","Terrace Bay  Drinking Water System","Thamesville Well Supply","Thunder Bay (Loch Lomond)  Water Treatment Plant (Old)","Tilbury Water Treatment Plant","Tillsonburg Drinking Water System","Town Of Hanover Drinking Water System","Town Of Lakeshore Drinking Water System","Town Of Lakeshore Drinking Water System - Stoney Point","Trenton  Drinking Water System","Trenton (Victoria St Pumping Station)","Union Area Water Supply System","Valley Drinking Water System","Vermillion Bay  Drinking Water System","Walkerton Drinking Water System","Walpole Island Water Treatment Plant","Waterford Drinking Water System","Wawa Drinking Water System","Welland Drinking Water System","Wellington  Drinking Water System","Woodstock Drinking Water System","York Drinking Water System - Aurora","York Drinking Water System - Newmarket","York Drinking Water System - Stouffville"],

	orgLatitude: 49.764775,
	orgLongitude: -85.323214,
	orgzoomLevel: 5,
	minMapScale: 5,
	maxMapScale: 14,
	coor_Status: false,
	url: "http://138.218.29.100/ArcGIS/rest/services/DevJerry/DWSP/MapServer",
	visibleLayerIds: [0,1],
	layerIds:  [0],
	searchFields : ["DWSNAME", "DWSNo", "SOURCE"],
	withinExtent: false,
	identifyScaleDependent: false,		
	maxWidth: 350,
	addressZoomLevel: 16,
	transparency: 1,
	outFields: ["DWSNAME","DWSNo", "SOURCE", "DATE_UPDAT", "SMPL_LST", "SMPL_1ST", "NUM_SAM", "NUM_CHEM", "CHLORINE","EARTHY","NITROGEN","CHLORIDE","SODIUM","FLUORIDE","COLOUR","TURBIDITY", "Chem_Avai", "DATE_UPDAT"],

	search: function(){
		var name = document.getElementById('map_query').value.trim();
		if(name.length === 0){
			return;
		}
		msg.messageStartSearching();
		MOEMap.address = name;
		if(!mapConfig.accessible){
			MOEMap.clearMap();
			mapConfig.withinExtent = document.getElementById('currentMapExtent').checked;				
		}
		if(document.getElementById('searchWaterSource').checked){
			//mapLocator.locate(name);
			MOEMap.queryLayerWithWhere("UPPER(SOURCE) LIKE '%" + name.toUpperCase() +  "%'");
		}else if(document.getElementById('searchDWSName').checked){
			MOEMap.queryLayerWithWhere("UPPER(DWSNAME) LIKE '%" + name.toUpperCase() +  "%'");
		}else{
					
		}
	},
	searchInputBoxDivId: "map_query",
	autoCompleteSearch: function(){
		$("#" + globalConfig.searchInputBoxDivId).autocomplete({
			source: globalConfig.waterSourceList,
			select: function(e, ui) {
				var name = ui.item.value;			
				if (mapConfig.accessible){
					if(document.getElementById('searchDWSName').checked){
						MOEMap.queryLayerWithWhere("UPPER(DWSNAME) LIKE '%" + name.toUpperCase() +  "%'");
					}else{
						MOEMap.queryLayerWithWhere("UPPER(SOURCE) LIKE '%" + name.toUpperCase() +  "%'");		
					}
				} else {
					MOEMap.clearMap();
					if(document.getElementById('searchLocation').checked){
						mapLocator.locate(name);
					}else if(document.getElementById('searchDWSName').checked){
						MOEMap.queryLayerWithWhere("UPPER(DWSNAME) LIKE '%" + name.toUpperCase() +  "%'");
					}else{
						MOEMap.queryLayerWithWhere("UPPER(SOURCE) LIKE '%" + name.toUpperCase() +  "%'");		
					}
				}
			}
		});
		$( "#" + globalConfig.searchInputBoxDivId ).autocomplete({ disabled: true });
	},
	searchChange: function(type){
		document.getElementById(globalConfig.searchInputBoxDivId).value = "";
		if(type === 'Location'){
			$( "#" + globalConfig.searchInputBoxDivId ).autocomplete({
				source: [],
				disabled: true
			});
		}/*else if (type === 'DWSNumber'){
			$( "#" + globalConfig.searchInputBoxDivId ).autocomplete({source: mapConfig.dwsNumList,
				disabled: false });
		}*/else if (type === 'DWSName'){
			$( "#" + globalConfig.searchInputBoxDivId ).autocomplete({
				source: globalConfig.dwsList,
				disabled: false 
			});
		} else {
			$( "#" + globalConfig.searchInputBoxDivId ).autocomplete({
				source: globalConfig.waterSourceList,
				disabled: false 
			});		
		}
	},	
	searchStationNO: function (name){
		if(mapConfig.isStationNO(name)){
			MOEMap.queryLayerWithWhere("DWS_NUM = " + name.toUpperCase() +  "");
			return true;
		}else{
			return false;
		}
	},
	isStationNO: function (name){
		var reg = /^\d+$/;
		if((name.length == 9) && reg.test(name)){
			return true;
		}else{
			return false;
		}
	},
/*wordCapitalize: function (str){
	var result = '';
	var strArray = str.trim().split(' ');
	for(var i=0; i < strArray.length; i++) {
        result += strArray[i].substring(0,1).toUpperCase() + strArray[i].substring(1,strArray[i].length).toLowerCase() + ' ';
	}
	return result;
},
*/
wordCapitalize: function(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
},

dateFormat: function (dateStr, inputFormat, outputFormat){
	var year = 0;
	var month = 0;
	var day = 0;

	if(inputFormat = 'mm/dd/yyyy'){
		var dateArray = dateStr.split("/");
		year = parseInt(dateArray[2]);
		month = parseInt(dateArray[0]);
		day = parseInt(dateArray[1]);
	}
	var result = "N/A";
	if((year>0)&&(month>0)&&(day>0)){
		if(outputFormat = 'yyyy mmm dd'){
			result = year +" " + mapConfig.convertNumberMonth(month) + " " + day;
		}
	}
	return result;
},

convertNumberMonth: function (month){
	var monthStr = "";
	switch (month)
	{
		case 1:
			monthStr = "Jan";
			break;
		case 2:
			monthStr = "Feb";
			break;
		case 3:
			monthStr = "Mar";
			break;
		case 4:
			monthStr = "Apr";
			break;
		case 5:
			monthStr = "May";
			break;
		case 6:
			monthStr = "Jun";
			break;
		case 7:
			monthStr = "Jul";
			break;
		case 8:
			monthStr = "Aug";
			break;
		case 9:
			monthStr = "Sep";
			break;
		case 10:
			monthStr = "Oct";
			break;
		case 11:
			monthStr = "Nov";
			break;
		case 12:
			monthStr = "Dec";
			break;
		default:
			monthStr = "";
	}
	return monthStr;
}
};   
globalConfig.postInitialize = function () {
	document.getElementById('searchWaterSource').checked = false;
	document.getElementById('searchDWSName').checked = false;
	document.getElementById('searchLocation').checked = true;
	if (!globalConfig.accessible){
		document.getElementById('currentMapExtent').disabled = false;
	}
};
$(function() {
	mapConfig.autoCompleteSearch();
	//mapConfig.searchChange("WaterSource");
});