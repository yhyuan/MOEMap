globalConfig.InformationLang = "Information";
globalConfig.chooseLang = function (en, fr) {return (globalConfig.language === "EN") ? en : fr;};
globalConfig.searchableFieldsList = [{en: "watershed", fr: "bassin versant"}, {en: "permit holder name", fr: "nom du titulaire de permis"}, {en: "address", fr: "adresse"}];
globalConfig.searchHelpTxt = globalConfig.chooseLang("You may search by ", "Vous pouvez rechercher par ");
for(var i=0; i<globalConfig.searchableFieldsList.length - 1; i++) {
	globalConfig.searchHelpTxt = globalConfig.searchHelpTxt + "<strong>" + globalConfig.chooseLang(globalConfig.searchableFieldsList[i].en, globalConfig.searchableFieldsList[i].fr) + "</strong>, ";
}
globalConfig.searchHelpTxt = globalConfig.searchHelpTxt + "<strong>" + globalConfig.chooseLang(globalConfig.searchableFieldsList[i].en, globalConfig.searchableFieldsList[i].fr) + "</strong> " + globalConfig.chooseLang("or see help for advanced options.", "ou consulter l'aide pour de l'information sur les recherches avanc&eacute;es.");
globalConfig.tableSimpleTemplateTitleLang = globalConfig.chooseLang("Note: Data is in English only.", "\u00c0 noter : Les donn\u00e9es sont en anglais seulement.");

globalConfig.searchControlHTML = '<div id="searchTheMap"></div><div id="searchHelp"></div><br><label class="element-invisible" for="map_query">' + globalConfig.chooseLang('Search the map', 'Recherche carte interactive') + '</label>\
	<input id="map_query" type="text" title="' + globalConfig.chooseLang('Search term', 'Terme de recherche') + '" maxlength="100" size="50" onkeypress="return globalConfig.entsub(event)"></input>\
	<label class="element-invisible" for="search_submit">' + globalConfig.chooseLang('Search', 'Recherche') + '</label>\
	<input id="search_submit" type="submit" title="Search" onclick="globalConfig.search()" value="' + globalConfig.chooseLang('Search', 'Recherche') + '"></input>\
	<fieldset>\
		<input type="radio" id="searchWatershed" name="searchGroup" title="watershed" name="watershed" value="watershed" onclick="globalConfig.searchChange(\'Watershed\')"></input>\
		<label class="option" for="watershed">\
			' + globalConfig.chooseLang('Watershed', "Bassin versant") + '\
		</label>\
		<input type="radio" id="searchBusiness" name="searchGroup" title="business" name="business" value="business" onclick="globalConfig.searchChange(\'Business\')"></input>\
		<label class="option" for="business">\
			' + globalConfig.chooseLang('Permit Holder Name', "Nom du titulaire de permis") + '\
		</label>\
		<input type="radio" id="searchLocation" name="searchGroup" title="location" name="location" value="location" onclick="globalConfig.searchChange(\'Location\')"></input>\
		<label class="option" for="location">\
			' + globalConfig.chooseLang('Address with Radius of', "Adresse dans un rayon de") + '\
			<select name="searchCriteria.radius" id="lstRadius">\
				<option value="1" >1 km</option>\
				<option value="2" >2 km</option>\
				<option value="5" >5 km</option>\
				<option value="10" >10 km</option>\
				<option value="25" >25 km</option>\
				<option value="50" >50 km</option>\
			</select>\
		</label>\
	</fieldset>\
<div id="information"></div>';

if (globalConfig.accessible) {
	globalConfig.usePredefinedMultipleTabs = false;
} else {
	globalConfig.usePredefinedMultipleTabs = true;
}

globalConfig.infoWindowWidth = '560px';
globalConfig.infoWindowHeight = '200px';
globalConfig.infoWindowContentHeight = '160px';

globalConfig.isRoutingServiceAvailable = false;
globalConfig.displayDisclaimer = true;
if (globalConfig.language === "EN") {
	globalConfig.fieldNamesList = [
		"Permit Number", 
		"Permit Holder Name", 
		"Purpose", 
		"Specific Purpose", 
		"Max Litres per Day", 
		"Source Type"
	];
} else {
	globalConfig.fieldNamesList = [
		"Num\u00e9ro du permis", 
		"Nom du titulaire de permis", 
		"Raison", 
		"Raison particuli\u00e8re", 
		"Litres (max. par jour)",
		"Type de source"
	];
}
if (globalConfig.accessible) {
	globalConfig.queryLayerList = [{
		url: globalConfig.url + "/0",
		tableTemplate: {
			title: globalConfig.tableSimpleTemplateTitleLang, 
			content: "<tr><td>{PERMITNO}</td><td>{CLIENTNAME}</td><td>{PURPOSECAT}</td><td>{SPURPOSE}</td><td>{MAXL_DAY}</td><td>{SURFGRND}</td></tr>",
			head: "<table class='fishTable'  border='1'><tr><th class='shaded'><center>" + globalConfig.fieldNamesList.join("</center></th><th class='shaded'><center>") + "</center></th></tr>",
			tail: "</table>"			
		} 
	}];
	globalConfig.postConditionsCallbackName = "AccessibleWells";
} else {
	globalConfig.tableFieldList = [
		{name: globalConfig.fieldNamesList[0], value: "{PERMITNO}"}, 
		{name: globalConfig.fieldNamesList[1], value: "{CLIENTNAME}"}, 
		{name: globalConfig.fieldNamesList[2], value: "{PURPOSECAT}"}, 
		{name: globalConfig.fieldNamesList[3], value: "{SPURPOSE}"}, 
		{name: globalConfig.fieldNamesList[4], value: "{MAXL_DAY}"}, 
		{name: globalConfig.fieldNamesList[5], value: "{SURFGRND}"}
	];

	globalConfig.queryLayerList = [{
		url: globalConfig.url + "/0",
		tabsTableTemplate: [{
			label: globalConfig.InformationLang,
			content:globalConfig.tableFieldList
		}], 
		tableSimpleTemplate: {
			title: globalConfig.tableSimpleTemplateTitleLang, 
			content: globalConfig.tableFieldList
		} 
	}];
}
	globalConfig.watershedNames = ["Agawa","Albany - Mouth","Arrow","Atikameg","Ausable","Big Creek","Black Duck","Black River - Lake Simcoe","Black Sturgeon","Bonnechere","Cataraqui","Cedar Creek","Central Abitibi","Central Mattagami","Central Missinaibi - Mattawishkwia","Central Missinaibi - Mattawitchewan","Central Rainy","Central Severn","Credit River - 16 Mile Creek","Crowe","Deep","Dog","Dogskin","Drowning","Echoing","Englehart","Fawn","French","Ganaraska","Garden","Goulais","Gull","Humber - Don Rivers","Jackpine","Kabinakagami","Kaskattama","Kattawagami","Kawartha Lakes","Kesagami","Killarney Channel","Kinosheo","Lac Seul","Lake of the Woods","Larus","Little Current","Little Pic","Lower Attawapiskat","Lower Ekwan","Lower English","Lower Grand","Lower Groundhog","Lower Kapuskasing","Lower Kenogami","Lower Madawaska","Lower Mattagami","Lower Missinaibi","Lower Ogoki","Lower Ottawa - South Nation","Lower Rainy","Lower Thames","Lower Winisk","Lower Winnipeg","Magnetawan","Maitland","Manatoulin Islands","Manigotagan","Mattagami","Michipicoten - Magpie","Middle Attawapiskat","Middle Winisk","Mississagi","Mississippi","Moira","Montreal","Muskoka","Napanee","Negagami","Niagara","Nipigon","Niskibi","North Grey Sauble Bruce Peninsula Watersheds","North Wanapitei","Nottawasaga","Oiseau","Onaping","Opasatika","Otonabee","Otter Rapids - Abitiby River Watersheds","Owen Sound Watersheds","Penetangore","Petawawa","Pic","Polar Bear Park Watersheds","Poplar","Prince Edward Bay","Red","Rideau","Ridge","Rondeau Watersheds","Sachigo","Sagawitchewan","Saugeen","Scugog","Seeber","Serpent","Shagamu","South Wanapitei","Spanish","Sturgeon","Sutton","Sydenham","Upper Abitibi","Upper Albany - Cat","Upper Albany - Makokibatan","Upper Albany - Misehkow","Upper Albany - Muswabik","Upper Attawapiskat","Upper Berens","Upper Ekwan","Upper English","Upper Grand","Upper Groundhog","Upper Kapiskau","Upper Kapuskasing","Upper Kenogami","Upper Madawaska","Upper Missinaibi","Upper Moose","Upper Ogoki","Upper Ottawa - Kipawa","Upper Rainy","Upper Severn","Upper St. Lawrence - Raisin","Upper St. Lawrence - Thousand Islands","Upper Thames","Upper Winisk","Upper Winnipeg","Wabigoon","Watabeag","Wenebegon","White","Whitefish","Whiteshell","Windigo"];

	globalConfig.watershedTypeParameter = "Watershed";
	globalConfig.searchChange = function(type){
		document.getElementById(globalConfig.searchInputBoxDivId).value = "";
		if(type === globalConfig.businessTypeParameter){
			$( "#" + globalConfig.searchInputBoxDivId ).autocomplete({
				disabled: true,
				source: []
			});
			document.getElementById(globalConfig.radiusSelectionDivId).disabled = true;
		}else if (type === globalConfig.watershedTypeParameter){
			document.getElementById(globalConfig.radiusSelectionDivId).disabled = true;
			$("#" + globalConfig.searchInputBoxDivId).autocomplete({
				source: globalConfig.watershedNames,
				disabled: false, 
				select: function(e, ui) {
					MOEMAP.clearOverlays();
					var searchString = ui.item.value;
					var queryParams = {
						searchString: searchString,
						withinExtent: false,
						where: "NAME = '" + searchString + "'",
						requireGeocode: false,
						address: searchString
					};				
					MOEMAP.queryLayersWithConditionsExtent(queryParams);
				}
			});				
		}else{
			$( "#" + globalConfig.searchInputBoxDivId ).autocomplete({
				disabled: true,
				source: []
			});
			document.getElementById(globalConfig.radiusSelectionDivId).disabled = false;
		}
	};
	globalConfig.searchWatershedDivId = "searchWatershed";	
	globalConfig.search = function(){
			var searchString = document.getElementById(globalConfig.searchInputBoxDivId).value.trim();
			if(searchString.length === 0){
				return;
			}
			document.getElementById(globalConfig.queryTableDivId).innerHTML = "";
			MOEMAP.clearOverlays();
			var queryParams = {
				searchString: searchString,
				withinExtent: false
			};
			if(globalConfig.accessible || document.getElementById(globalConfig.searchBusinessDivId).checked){
				var name = searchString.toUpperCase();
				name = globalConfig.replaceChar(name, "'", "''");
				name = globalConfig.replaceChar(name, "\u2019", "''");
				var fuzzyConditionsGenerator = function(field, str) {
					return "(UPPER(" + field + ") LIKE '% " + str + " %') OR (UPPER(" + field + ") LIKE '" + str + " %') OR (UPPER(" + field + ") LIKE '% " + str + "') OR (UPPER(" + field + ") = '" + str + "') OR (UPPER(" + field + ") LIKE '%" + str + ",%')";
				};				
				queryParams.where = fuzzyConditionsGenerator("CLIENTNAME", name);
				queryParams.requireGeocode = false;
				queryParams.address = searchString;
				MOEMAP.queryLayersWithConditionsExtent(queryParams);				
				return;
			}			
			if(document.getElementById(globalConfig.searchWatershedDivId).checked){
				queryParams.where = "NAME = '" + searchString + "'";
				queryParams.requireGeocode = false;
				queryParams.address = searchString;
				MOEMAP.queryLayersWithConditionsExtent(queryParams);
				return;
			}			

			if(document.getElementById(globalConfig.searchLocationDivId).checked){
				queryParams.address = searchString;
				queryParams.radius = document.getElementById(globalConfig.radiusSelectionDivId).value;
				queryParams.callback = MOEMAP.addressBufferCallback;			
				LOCATOR.locate(queryParams);			
			}			
	};
	if (!globalConfig.accessible) {
		globalConfig.autoCompleteSearch = function(){
			$("#" + globalConfig.searchInputBoxDivId).autocomplete({
				source: [],
				select: function(e, ui) {
				},
				disabled: true
			});
		};
		$(function() {
			globalConfig.autoCompleteSearch();
		});
	}