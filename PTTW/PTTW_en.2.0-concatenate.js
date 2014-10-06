 /* Build Time: Oct 1, 2014 12:39:13 */ globalConfig = {};
globalConfig.language = "EN";
//globalConfig.searchHelpTxt = "Zoom in, or Search with Watershed, Permit Holder Name, Address.";
//globalConfig.searchHelpTxt = "You may search by <strong>watershed</strong>, <strong>permit holder name</strong> or <strong>address</strong>.";
//globalConfig.tableSimpleTemplateTitleLang = "Note: The Distance(KM) column represents the distance between your search location and the permit location in the specific row. Data is in English only.";
//globalConfig.tableSimpleTemplateTitleLang = "Note: Data is in English only.";
//globalConfig.tableSimpleTemplateTitleLang = "The following table contains the records with valid coordinates.";
globalConfig.otherInfoHTML = ""; 


/*
globalConfig.searchControlHTML = '<center><input id = "map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100"></input>\
	&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search"></input>&nbsp;&nbsp;\
	<br>\
	<input id = "searchWatershed" type="radio" name="searchGroup" value="watershed" onclick="globalConfig.searchChange(\'Watershed\')">Watershed\
	<input id = "searchBusiness" type="radio" name="searchGroup" value="business" onclick="globalConfig.searchChange(\'Business\')">Permit Holder Name\
	<input id = "searchLocation" type="radio" name="searchGroup" value="location" onclick="globalConfig.searchChange(\'Location\')">Address with Radius of\
		<select name="searchCriteria.radius" id="lstRadius">\
	   	 					<option value="1" >1 km</option>\
	   	 					<option value="2" >2 km</option>\
	   	 					<option value="5" >5 km</option>\
	   	 					<option value="10" >10 km</option>\
							<option value="25" >25 km</option>\
							<option value="50" >50 km</option>\
						</select>\
	<div id="information" style="color:#0000FF">' + globalConfig.searchHelpTxt + '</div></center>';
*///globalConfig.url = "http://www.appliomapss.lrc.gov.on.ca/ArcGIS/rest/services/MOE/PTTW_Search/MapServer"; //LRC staging
globalConfig.url = "http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/PTTW_Search/MapServer";  //LRC production
//globalConfig.url = "http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Public/PTTW_Search1/MapServer";

globalConfig.InformationLang = "Information";
globalConfig.chooseLang = function (en, fr) {return (globalConfig.language === "EN") ? en : fr;};
globalConfig.searchableFieldsList = [{en: "watershed", fr: "bassin versant"}, {en: "permit holder name", fr: "nom du titulaire de permis"}, {en: "address", fr: "adresse"}];
globalConfig.searchHelpTxt = globalConfig.chooseLang("You may search by ", "Vous pouvez rechercher par ");
for(var i=0; i<globalConfig.searchableFieldsList.length - 1; i++) {
	globalConfig.searchHelpTxt = globalConfig.searchHelpTxt + "<strong>" + globalConfig.chooseLang(globalConfig.searchableFieldsList[i].en, globalConfig.searchableFieldsList[i].fr) + "</strong>, ";
}
globalConfig.searchHelpTxt = globalConfig.searchHelpTxt + "<strong>" + globalConfig.chooseLang(globalConfig.searchableFieldsList[i].en, globalConfig.searchableFieldsList[i].fr) + "</strong> " + globalConfig.chooseLang("or see help for advanced options.", "ou consulter l'aide pour de l'information sur les recherches avanc&eacute;es.");
globalConfig.tableSimpleTemplateTitleLang = globalConfig.chooseLang("Note: Data is in English only.", "\u00c0 noter : les donn\u00e9es sont en anglais seulement.");

globalConfig.searchControlHTML = '<div id="searchTheMap"></div><div id="searchHelp"></div><br><label class="element-invisible" for="map_query">' + globalConfig.chooseLang('Search the map', 'Recherche carte interactive') + '</label>\
	<input id="map_query" type="text" title="' + globalConfig.chooseLang('Search term', 'Terme de recherche') + '" maxlength="100" size="50" onkeypress="return globalConfig.entsub(event)"></input>\
	<label class="element-invisible" for="search_submit">' + globalConfig.chooseLang('Search', 'Recherche') + '</label>\
	<input id="search_submit" type="submit" title="' + globalConfig.chooseLang('Search', 'Recherche') + '" onclick="globalConfig.search()" value="' + globalConfig.chooseLang('Search', 'Recherche') + '"></input>\
	<fieldset>\
		<input type="radio" id="searchWatershed" name="searchGroup" title="' + globalConfig.chooseLang('Watershed', "Bassin versant") + '" name="watershed" value="watershed" onclick="globalConfig.searchChange(\'Watershed\')"></input>\
		<label class="option" for="watershed">\
			' + globalConfig.chooseLang('Watershed', "Bassin versant") + '\
		</label>\
		<input type="radio" id="searchBusiness" name="searchGroup" title="' + globalConfig.chooseLang('Permit Holder Name', "Nom du titulaire de permis") + '" name="business" value="business" onclick="globalConfig.searchChange(\'Business\')"></input>\
		<label class="option" for="business">\
			' + globalConfig.chooseLang('Permit Holder Name', "Nom du titulaire de permis") + '\
		</label>\
		<input type="radio" id="searchLocation" name="searchGroup" title="' + globalConfig.chooseLang('Address with Radius of', "Adresse dans un rayon de") + '" name="location" value="location" onclick="globalConfig.searchChange(\'Location\')"></input>\
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

if (globalConfig.language === "EN"){
	globalConfig.SearchInteractiveMapFormLang = globalConfig.SearchInteractiveMapFormLang || 'Search interactive map form';
	//globalConfig.SearchInteractiveMapLang = globalConfig.SearchInteractiveMapLang || 'Search interactive map';
	globalConfig.SearchInteractiveMapLang = globalConfig.SearchInteractiveMapLang || 'Search the map';
	globalConfig.SearchLang = globalConfig.SearchLang || 'Search';
	globalConfig.TermLang = globalConfig.TermLang || 'Term';
	globalConfig.InputBoxSizeLang = globalConfig.InputBoxSizeLang || '415px';	
	globalConfig.degreeSymbolLang = globalConfig.degreeSymbolLang || "&deg;";
	globalConfig.selectTooltip = globalConfig.selectTooltip || "Select";
	globalConfig.UTM_ZoneLang = globalConfig.UTM_ZoneLang || "UTM Zone";
	globalConfig.EastingLang = globalConfig.EastingLang || "Easting";
	globalConfig.NorthingLang = globalConfig.NorthingLang || "Northing";
	//globalConfig.designLang = globalConfig.designLang || "This application is designed and implemented by <strong>Ministry of the Environment Environmental Science Facilitation and Reporting Unit</strong> using <strong>MOE Mapping library version 2.0</strong>.";	
	globalConfig.noResultFoundMsg = globalConfig.noResultFoundMsg || "Your search returned no result. Please refine your search.";
	globalConfig.searchCenterLang = globalConfig.searchCenterLang || "Search center";
	globalConfig.searchRadiusLang = globalConfig.searchRadiusLang || "search radius";
	globalConfig.searchKMLang = globalConfig.searchKMLang || "KM";	
	globalConfig.totalFeatureReturnedLang = globalConfig.totalFeatureReturnedLang || "Total features returned";
	globalConfig.only1DisplayedLang = globalConfig.only1DisplayedLang || ", only 1 is displayed.";
	globalConfig.westSymbolLang = globalConfig.westSymbolLang || "W";
	globalConfig.distanceLang = globalConfig.distanceLang || "Distance (KM)";
	globalConfig.searchingLang = globalConfig.searchingLang || "Searching for results...";
	globalConfig.inGobalRegionLang = globalConfig.inGobalRegionLang || "in Ontario";
	globalConfig.inCurrentMapExtentLang = globalConfig.inCurrentMapExtentLang || "in the current map display";
	globalConfig.forLang = "for";
	globalConfig.yourSearchLang = globalConfig.yourSearchLang || "Your search";
	globalConfig.returnedNoResultLang = globalConfig.returnedNoResultLang || "returned no result";
	globalConfig.pleaseRefineSearchLang = globalConfig.pleaseRefineSearchLang || "Please refine your search";
	globalConfig.oneResultFoundLang = globalConfig.oneResultFoundLang || "1 result found";
	globalConfig.moreThanLang = globalConfig.moreThanLang || "More than";
	globalConfig.resultsFoundLang = globalConfig.resultsFoundLang || "results found";
	globalConfig.onlyLang = globalConfig.onlyLang || "Only";
	globalConfig.returnedLang = globalConfig.returnedLang || "returned";
	globalConfig.seeHelpLang = globalConfig.seeHelpLang || "See help for options to refine your search";
	globalConfig.disclaimerLang = globalConfig.disclaimerLang || "<p>This website and all of the information it contains are provided &quot;as is&quot; without warranty of any kind, whether express or implied. <a href=\"/environment/en/resources/collection/data_downloads/STDPROD_078135.html\">View the terms of use</a>.</p>";
	globalConfig.InformationLang = globalConfig.InformationLang || "Information";
	//globalConfig.CurrentMapDisplayLang = globalConfig.CurrentMapDisplayLang || 'Current Map Display';
	globalConfig.CurrentMapDisplayLang = globalConfig.CurrentMapDisplayLang || 'Search current map display only';
	globalConfig.CurrentMapDisplayTitleLang = globalConfig.CurrentMapDisplayTitleLang || 'Current Map Display: Limit your search to the area displayed';
	globalConfig.distanceFieldNote = globalConfig.distanceFieldNote || "The Distance(KM) column represents the distance between your search location and the permit location in the specific row.";
	globalConfig.noCoordinatesTableTitleLang = globalConfig.noCoordinatesTableTitleLang || "The following table contains the records without valid coordinates. <a href='#WhyAmISeeingThis'>Why am I seeing this?</a>";
	globalConfig.whyAmISeeingThisLang = globalConfig.whyAmISeeingThisLang || "<a id='WhyAmISeeingThis'><strong>Why am I seeing this?</strong></a><br>The map locations shown as points have been determined by using addresses or other information to calculate a physical location on the map.  In some cases, the information needed to calculate a location was incomplete, incorrect or missing.  The records provided in the table have been included because there is a close match on the name or city/town or other field(s). These records may or may not be near your specified location, and users are cautioned in using these records. They have been included as potential matches only.";
	globalConfig.ThisResultDoesNotHaveValidCoordinates = globalConfig.ThisResultDoesNotHaveValidCoordinates || "This result does not have valid coordinates.";
	globalConfig.AmongReturnedResults = globalConfig.AmongReturnedResults || "Among returned results";
	globalConfig.ResultDoesNotHaveValidCoordinates = globalConfig.ResultDoesNotHaveValidCoordinates || " result does not have valid coordinates.";
	globalConfig.ResultsDoNotHaveValidCoordinates = globalConfig.ResultsDoNotHaveValidCoordinates || " results do not have valid coordinates.";
	globalConfig.youMaySearchByLang = globalConfig.youMaySearchByLang || "You may search by ";
	globalConfig.seeHelpForAdvancedOptionsLang = globalConfig.seeHelpForAdvancedOptionsLang || "or see help for advanced options.";
} else {
	globalConfig.SearchInteractiveMapFormLang = globalConfig.SearchInteractiveMapFormLang || 'Recherche carte interactive forme';
	//globalConfig.SearchInteractiveMapLang = globalConfig.SearchInteractiveMapLang || 'Recherche carte interactive';
	globalConfig.SearchInteractiveMapLang = globalConfig.SearchInteractiveMapLang || 'Recherche dans la carte interactive';
	globalConfig.SearchLang = globalConfig.SearchLang || 'Recherche';
	globalConfig.TermLang = globalConfig.TermLang || 'Terme';
	globalConfig.InputBoxSizeLang = globalConfig.InputBoxSizeLang || '450px';
	globalConfig.degreeSymbolLang = globalConfig.degreeSymbolLang || "&deg;";
	globalConfig.selectTooltip = globalConfig.selectTooltip || globalConfig.selectTooltip || "Choisir";
	globalConfig.UTM_ZoneLang = globalConfig.UTM_ZoneLang || "Zone UTM";
	globalConfig.EastingLang = globalConfig.EastingLang || "abscisse";
	globalConfig.NorthingLang = globalConfig.NorthingLang || "ordonn\u00e9e";
	//globalConfig.designLang = globalConfig.designLang || "Cette application est con\u00e7ue et mise en \u0153uvre par <strong>l\u0027Unit\u00e9 de la facilitation de la gestion de l\u0027information et des rapports \u2013 sciences environnementales du minist\u00e8re de l\u0027Environnement</strong> au moyen de la <strong>cartoth\u00e8que du MEO (version 2.0)</strong>.";	
	globalConfig.noResultFoundMsg = globalConfig.noResultFoundMsg || "Votre recherche n'a produit aucun r\u00e9sultat. Veuillez affiner la recherche.";	
	globalConfig.searchCenterLang = globalConfig.searchCenterLang || "Cercle de recherche";
	globalConfig.searchRadiusLang = globalConfig.searchRadiusLang || "rayon de recherche";
	globalConfig.searchKMLang = globalConfig.searchKMLang || "km";	
	globalConfig.totalFeatureReturnedLang = globalConfig.totalFeatureReturnedLang || "Nombre total de r\u00e9sultats";
	globalConfig.only1DisplayedLang = globalConfig.only1DisplayedLang || ", only 1 is displayed.";	
	globalConfig.westSymbolLang = globalConfig.westSymbolLang || "O";
	globalConfig.distanceLang = globalConfig.distanceLang || "Distance (en km)";
	globalConfig.searchingLang = globalConfig.searchingLang || "Recherche des r\u00e9sultats ...";
	globalConfig.inGobalRegionLang = globalConfig.inGobalRegionLang || "en Ontario";
	globalConfig.inCurrentMapExtentLang = globalConfig.inCurrentMapExtentLang || "dans l'affichage actuel de la carte";
	globalConfig.forLang = "pour";
	globalConfig.yourSearchLang = globalConfig.yourSearchLang || "Votre recherche";
	globalConfig.returnedNoResultLang = globalConfig.returnedNoResultLang || "n'a donn\u00e9 aucun r\u00e9sultat";
	globalConfig.pleaseRefineSearchLang = globalConfig.pleaseRefineSearchLang || "S'il vous plait affiner votre recherche";
	globalConfig.oneResultFoundLang = globalConfig.oneResultFoundLang || "1 r\u00e9sultat";
	globalConfig.moreThanLang = globalConfig.moreThanLang || "Plus de";
	globalConfig.resultsFoundLang = globalConfig.resultsFoundLang || "r\u00e9sultats";
	globalConfig.onlyLang = globalConfig.onlyLang || "Seulement";
	globalConfig.returnedLang = globalConfig.returnedLang || "retourn\u00e9s";
	globalConfig.seeHelpLang = globalConfig.seeHelpLang || "Consulter l'aide pour affiner votre recherche";	
	globalConfig.disclaimerLang = globalConfig.disclaimerLang || "<p>Ce site web et toute l&rsquo;information qu&rsquo;il contient sont fournis sans garantie quelconque, expr&egrave;s ou tacite. <a href=\"/environment/fr/resources/collection/data_downloads/STDPROD_078138.html\">Voir l&rsquo;avis de non-responsabilit&eacute;</a>.</p>";
	globalConfig.InformationLang = globalConfig.InformationLang || "Information";
	globalConfig.CurrentMapDisplayLang = globalConfig.CurrentMapDisplayLang || '\u00c9tendue de la carte courante';
	globalConfig.CurrentMapDisplayTitleLang = globalConfig.CurrentMapDisplayTitleLang || 'Afficher la carte : Limiter la recherche \u00e0 la carte donn\u00e9e.';	
	globalConfig.distanceFieldNote = globalConfig.distanceFieldNote || "La colonne de distance (en km) donne la distance entre le lieu de votre recherche et le lieu du puits dans la rang\u00e9e donn\u00e9e.";
	globalConfig.noCoordinatesTableTitleLang = globalConfig.noCoordinatesTableTitleLang || "Le tableau suivant contient des données sans coordonnées valides.  <a href='#WhyAmISeeingThis'>Pourquoi cela s’affiche-t-il?</a>";
	globalConfig.whyAmISeeingThisLang = globalConfig.whyAmISeeingThisLang || "<a id='WhyAmISeeingThis'>Pourquoi cela s’affiche-t-il?</a><br>Les lieux indiqués par des points sur la carte ont été déterminés en fonction d’adresses ou d’autres renseignements servant à calculer un emplacement physique sur la carte. Dans certains cas, ces renseignements étaient incomplets, incorrects ou manquants. Les données fournies dans le deuxième tableau ont été incluses, car il y a une correspondance étroite avec le nom de la ville ou d’autre champ. Ces données peuvent ou non être proches du lieu précisé, et on doit les utiliser avec prudence. Elles ont été incluses seulement parce qu’il peut y avoir une correspondance.";	
	globalConfig.ThisResultDoesNotHaveValidCoordinates = globalConfig.ThisResultDoesNotHaveValidCoordinates || "This result does not have valid coordinates.";
	globalConfig.AmongReturnedResults = globalConfig.AmongReturnedResults || "Parmi les résultats obtenus";
	globalConfig.ResultDoesNotHaveValidCoordinates = globalConfig.ResultDoesNotHaveValidCoordinates || " résultat n’a pas de coordonnées valides.";
	globalConfig.ResultsDoNotHaveValidCoordinates = globalConfig.ResultsDoNotHaveValidCoordinates || " résultats n’ont pas de coordonnées valides.";
	
	globalConfig.youMaySearchByLang = globalConfig.youMaySearchByLang || "Vous pouvez rechercher par ";
	globalConfig.seeHelpForAdvancedOptionsLang = globalConfig.seeHelpForAdvancedOptionsLang || "ou consulter l'aide pour de l'information sur les recherches avanc&eacute;es.";
	globalConfig.dataTableLang = globalConfig.dataTableLang || {
		"sProcessing":     "Traitement en cours...",
		"sSearch":         "Rechercher&nbsp;:",
		"sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
		"sInfo":           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
		"sInfoEmpty":      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
		"sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
		"sInfoPostFix":    "",
		"sLoadingRecords": "Chargement en cours...",
		"sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
		"sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
		"oPaginate": {
			"sFirst":      "Premier",
			"sPrevious":   "Pr&eacute;c&eacute;dent",
			"sNext":       "Suivant",
			"sLast":       "Dernier"
		},
		"oAria": {
			"sSortAscending":  ": activer pour trier la colonne par ordre croissant",
			"sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
		}
	};
}
globalConfig.u2019Lang = "\u2019";
globalConfig.nbspLang = "&nbsp";

var globalConfig = globalConfig || {};
if (typeof console == "undefined") {
	window.console = {
		log: function () {}
	};
}
/*Add trim function to String. This function will remove the spaces and tabs in the beginning and ending of a String.*/
if (!('trim' in String.prototype)){   
	String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g,""); };    
}
// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {

    var k;

    // 1. Let O be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      var kValue;
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of O with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}

/*Add contains function to Array. This function will test whether an Array contains an element or not.*/			
if (!('contains' in Array.prototype)){
	Array.prototype.contains = function(obj) {
		return (this.indexOf(obj) >= 0);
		/*var i = this.length;
		while (i--) {
			if (this[i] === obj) {
				return true;
			}
		}
		return false;*/
	};
}
/*Add unique function to Array. This function will return the unique elements in an array*/						
if (!('unique' in Array.prototype)){
	Array.prototype.unique = function() {
		var n = [];
		for(var i = 0; i < this.length; i++) {
			if(n.indexOf(this[i]) < 0) {
				n.push(this[i]);
			}
		}
		return n;
	/*
		var a = this.concat();
		for(var i=0; i<a.length; ++i) {
			for(var j=i+1; j<a.length; ++j) {
				if(a[i] === a[j]){
					a.splice(j, 1);
				}
			}
		}
		return a;*/
	};
}

// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
//https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/map
if (!Array.prototype.filter) {
	Array.prototype.filter = function(fun /*, thisp */){
		"use strict";

		if (this == null)
			throw new TypeError();

		var t = Object(this);
		var len = t.length >>> 0;
		if (typeof fun != "function")
			throw new TypeError();

		var res = [];
		var thisp = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in t){
				var val = t[i]; // in case fun mutates this
				if (fun.call(thisp, val, i, t))
					res.push(val);
			}
		}
		return res;
	};
}


// Production steps of ECMA-262, Edition 5, 15.4.4.19
// Reference: http://es5.github.com/#x15.4.4.19
if (!Array.prototype.map) {
	Array.prototype.map = function(callback, thisArg) {

		var T, A, k;

		if (this === null) {
			throw new TypeError(" this is null or not defined");
		}

		// 1. Let O be the result of calling ToObject passing the |this| value as the argument.
		var O = Object(this);

		// 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = O.length >>> 0;

		// 4. If IsCallable(callback) is false, throw a TypeError exception.
		// See: http://es5.github.com/#x9.11
		if (typeof callback !== "function") {
			throw new TypeError(callback + " is not a function");
		}

		// 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
		if (thisArg) {
			T = thisArg;
		}

		// 6. Let A be a new array created as if by the expression new Array(len) where Array is
		// the standard built-in constructor with that name and len is the value of len.
		A = new Array(len);

		// 7. Let k be 0
		k = 0;

		// 8. Repeat, while k < len
		while(k < len) {

			var kValue, mappedValue;

			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			if (k in O) {

				// i. Let kValue be the result of calling the Get internal method of O with argument Pk.
				kValue = O[ k ];

				// ii. Let mappedValue be the result of calling the Call internal method of callback
				// with T as the this value and argument list containing kValue, k, and O.
				mappedValue = callback.call(T, kValue, k, O);

				// iii. Call the DefineOwnProperty internal method of A with arguments
				// Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
				// and false.

				// In browsers that support Object.defineProperty, use the following:
				// Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

				// For best browser support, use the following:
				A[ k ] = mappedValue;
			}
			// d. Increase k by 1.
			k++;
		}

		// 9. return A
		return A;
	};      
}			

if ('function' !== typeof Array.prototype.reduce) {
  Array.prototype.reduce = function(callback, opt_initialValue){
    'use strict';
    if (null === this || 'undefined' === typeof this) {
      // At the moment all modern browsers, that support strict mode, have
      // native implementation of Array.prototype.reduce. For instance, IE8
      // does not support strict mode, so this check is actually useless.
      throw new TypeError(
          'Array.prototype.reduce called on null or undefined');
    }
    if ('function' !== typeof callback) {
      throw new TypeError(callback + ' is not a function');
    }
    var index = 0, length = this.length >>> 0, value, isValueSet = false;
    if (1 < arguments.length) {
      value = opt_initialValue;
      isValueSet = true;
    }
    for ( ; length > index; ++index) {
      if (!this.hasOwnProperty(index)) continue;
      if (isValueSet) {
        value = callback(value, this[index], index, this);
      } else {
        value = this[index];
        isValueSet = true;
      }
    }
    if (!isValueSet) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    return value;
  };
}

Array.range = function (a, b, step) {
    var A = [];
    if (typeof a == 'number') {
        A[0] = a;
        step = step || 1;
        while (a + step <= b) {
            A[A.length] = a += step;
        }
    } else {
        var s = 'abcdefghijklmnopqrstuvwxyz';
        if (a === a.toUpperCase()) {
            b = b.toUpperCase();
            s = s.toUpperCase();
        }
        s = s.substring(s.indexOf(a), s.indexOf(b) + 1);
        A = s.split('');
    }
    return A;
}

/** Converts numeric degrees to radians http://www.movable-type.co.uk/scripts/latlong.html */
if (typeof Number.prototype.toRad == 'undefined') {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}

globalConfig.replaceChar =  globalConfig.replaceChar || function(str, charA, charB) {
	var temp = [];
	temp = str.split(charA);
	var result = temp[0];
	if (temp.length >= 2) {
		for (var i = 1; i < temp.length; i++) {
			result = result + charB + temp[i];
		}
	}
	return result;
};
globalConfig.wordCapitalize = globalConfig.wordCapitalize || function (str){
	var strArray = str.trim().split(' ');
	for(var i=0; i < strArray.length; i++) {
				strArray[i] = strArray[i].substring(0,1).toUpperCase() + strArray[i].substring(1,strArray[i].length).toLowerCase();
	}
	return strArray.join(' ');
};
	
globalConfig.convertLatLngtoUTM = globalConfig.convertLatLngtoUTM || function(lat, lng) {
	var pi = 3.14159265358979; //PI
	var a = 6378137; //equatorial radius for WGS 84
	var k0 = 0.9996; //scale factor
	var e = 0.081819191; //eccentricity
	var e_2 = 0.006694380015894481; //e'2
	var A0 = 6367449.146;
	var B0 = 16038.42955;
	var C0 = 16.83261333;
	var D0 = 0.021984404;
	var E0 = 0.000312705;

	var zone = 31 + Math.floor(lng / 6);
	var lat_r = lat * pi / 180.0;
	var t1 = Math.sin(lat_r); // SIN(LAT)
	var t2 = e * t1 * e * t1;
	var t3 = Math.cos(lat_r); // COS(LAT)
	var t4 = Math.tan(lat_r); // TAN(LAT)
	var nu = a / (Math.sqrt(1 - t2));
	var S = A0 * lat_r - B0 * Math.sin(2 * lat_r) + C0 * Math.sin(4 * lat_r) - D0 * Math.sin(6 * lat_r) + E0 * Math.sin(8 * lat_r);
	var k1 = S * k0;
	var k2 = nu * t1 * t3 * k0 / 2.0;
	var k3 = ((nu * t1 * t2 * t2 * t2) / 24) * (5 - t4 * t4 + 9 * e_2 * t3 * t3 + 4 * e_2 * e_2 * t3 * t3 * t3 * t3) * k0;
	var k4 = nu * t3 * k0;
	var k5 = t3 * t3 * t3 * (nu / 6) * (1 - t4 * t4 + e_2 * t3 * t3) * k0;

	//var lng_r = lng*pi/180.0;
	var lng_zone_cm = 6 * zone - 183;
	var d1 = (lng - lng_zone_cm) * pi / 180.0;
	var d2 = d1 * d1;
	var d3 = d2 * d1;
	var d4 = d3 * d1;

	var x = 500000 + (k4 * d1 + k5 * d3);
	var rawy = (k1 + k2 * d2 + k3 * d4);
	var y = rawy;
	if (y < 0) {
		y = y + 10000000;
	}
	var res = {
		Zone: zone,
		Easting: x.toFixed(0),
		Northing: y.toFixed(0)
	};
	return res;
};	

globalConfig.convertUTMtoLatLng = globalConfig.convertUTMtoLatLng || function(zone, north, east) {
	var pi = 3.14159265358979; //PI
	var a = 6378137; //equatorial radius for WGS 84
	var k0 = 0.9996; //scale factor
	var e = 0.081819191; //eccentricity
	var e_2 = 0.006694380015894481; //e'2
	//var corrNorth = north; //North Hemishpe
	var estPrime = 500000 - east;
	var arcLength = north / k0;
	var e_4 = e_2 * e_2;
	var e_6 = e_4 * e_2;
	var t1 = Math.sqrt(1 - e_2);
	var e1 = (1 - t1) / (1 + t1);
	var e1_2 = e1 * e1;
	var e1_3 = e1_2 * e1;
	var e1_4 = e1_3 * e1;

	var C1 = 3 * e1 / 2 - 27 * e1_3 / 32;
	var C2 = 21 * e1_2 / 16 - 55 * e1_4 / 32;
	var C3 = 151 * e1_3 / 96;
	var C4 = 1097 * e1_4 / 512;

	var mu = arcLength / (a * (1 - e_2 / 4.0 - 3 * e_4 / 64 - 5 * e_6 / 256));
	var FootprintLat = mu + C1 * Math.sin(2 * mu) + C2 * Math.sin(4 * mu) + C3 * Math.sin(6 * mu) + C4 * Math.sin(8 * mu);
	var FpLatCos = Math.cos(FootprintLat);
	//var C1_an = e_2*FpLatCos*FpLatCos;
	var FpLatTan = Math.tan(FootprintLat);
	var T1 = FpLatTan * FpLatTan;
	var FpLatSin = Math.sin(FootprintLat);
	var FpLatSin_e = e * FpLatSin;
	var t2 = 1 - FpLatSin_e * FpLatSin_e;
	var t3 = Math.sqrt(t2);
	var N1 = a / t3;
	var R1 = a * (1 - e_2) / (t2 * t3);
	var D = estPrime / (N1 * k0);
	var D_2 = D * D;
	var D_4 = D_2 * D_2;
	var D_6 = D_4 * D_2;
	var fact1 = N1 * FpLatTan / R1;
	var fact2 = D_2 / 2;
	var fact3 = (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * e_2) * D_4 / 24;
	var fact4 = (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * e_2 - 3 * C1 * C1) * D_6 / 720;
	var lofact1 = D;
	var lofact2 = (1 + 2 * T1 + C1) * D_2 * D / 6;
	var lofact3 = (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * e_2 + 24 * T1 * T1) * D_4 * D / 120;
	var delta_Long = (lofact1 - lofact2 + lofact3) / FpLatCos;
	var zone_CM = 6 * zone - 183;
	var latitude = 180 * (FootprintLat - fact1 * (fact2 + fact3 + fact4)) / pi;
	var longitude = zone_CM - delta_Long * 180 / pi;
	var res = {
		Latitude: latitude.toFixed(8),
		Longitude: longitude.toFixed(8)
	};
	return res;
};
globalConfig.isInsidePolygon = globalConfig.isInsidePolygon || function (gLatLng, poly) {
	var lat = gLatLng.lat();
	var lng = gLatLng.lng();
	var numPoints = poly.length;
	var inPoly = false;
	var j = numPoints - 1;
	for (var i = 0; i < numPoints; i++) {
		var vertex1 = {x: poly[i].lng(), y: poly[i].lat()};
		var vertex2 = {x: poly[j].lng(), y: poly[j].lat()}; //poly[j];

		if (vertex1.x < lng && vertex2.x >= lng || vertex2.x < lng && vertex1.x >= lng) {
			if (vertex1.y + (lng - vertex1.x) / (vertex2.x - vertex1.x) * (vertex2.y - vertex1.y) < lat) {
				inPoly = !inPoly;
			}
		}

		j = i;
	}
	return inPoly;
};
globalConfig.deciToDegree = globalConfig.deciToDegree || function (degree){
	if(Math.abs(degree) <= 0.1){
		return "N/A";
	}
	var sym = "N";
	if(degree<0){
		degree = -degree;
		sym = globalConfig.westSymbolLang;
	}
	var deg = Math.floor(degree);
	var temp = (degree - deg)*60;
	var minute = Math.floor(temp);
	//var second = Math.floor((temp- minute)*60);
	var second = ((temp- minute)*60).toFixed(0);
	var res = "";
	if(second<1){
		res ="" + deg + globalConfig.degreeSymbolLang + minute + "'";
	}else if(second>58){
		res ="" + deg + globalConfig.degreeSymbolLang + (minute+1) + "'";
	}else{
		res ="" + deg + globalConfig.degreeSymbolLang + minute + "'" + second + "\"";
	}
	return res + sym;
};

/*
 * This function adds HTML tag <br> to a long text and returns it as the results. 
 * When a line has more than 50 letters including spaces, a <br> will be inserted
 * into the first space appears. 
 * 
 * @param text the input text
 * @return the text with <br> inserted or if the length of text is less than 50
 * No <br> is inserted. 
*/	
globalConfig.addBRtoLongText = function (text) {
	var lineCount = 0;
	var readyForBreak = false;
	if (text.length <= 40) {
		return text;
	}
	var textArray = text.split('');
	var result = "";	
	for (var i = 0; i < textArray.length; i++) {
		if (lineCount > 40) {
			readyForBreak = true;
		}
		result = result + textArray[i];
		if ((readyForBreak) && (textArray[i] === " ")) {
			lineCount = 0;
			result = result + "<br>";
			readyForBreak = false;
		}
		lineCount = lineCount + 1;
	}
	return result;
};

globalConfig.processNA = function (str) {
	if (typeof(str) === 'undefined') {
		return "N/A";
	}
	if (str === "null") {
		return "N/A";
	}
	if (str === "Null") {
		return "N/A";
	}
	return str;
};	/*global document:false *//*global google:false *//*global gmaps:false *//*global LOCATOR:false *//*global LATLNG_LOCATOR:false *//*global UTM_LOCATOR:false *//*global TWP_LOCATOR:false *//*global ADDRESS_LOCATOR:false *//*This module is used to convert the user inputs, such as latitude & longitude, UTM coordinates, Geographic Township with/without lot and concession, and address, to decimal laitude and longitude. This module requires the following properties are defined in globalConfig.1) validateLatLngWithRegion method: Give two values, decide which one is latitude and which one is longitude. In Ontario, this is determined by the fact that the absoulte value of longitude is always larger than the absolute value of latitude. That is the predefined method in globalConfig. Developerscan define their own method with the same name to override this method. 2) defaultZone: The default UTM zone number. If the users only input the easting and northing, the default UTM zone will be used in the UTM search. The predefined UTM zone in globalConfig is 17. 3) geogTwpService: The URL for Geographic Township with/without lot and concession web service. It containsthe following properties: 	geogTwpService: {		url: "http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/sportfishservice/MapServer",  //URL		TWPLayerID: 0,   // layer id for Geographic Township layer		LotLayerID: 1,   // layer id for Geographic Township with lot and concession layer		outFields: ["CENX", "CENY"],  // output fields for Geographic Township with lot and concession layer		TWPLayerNameField: "NAME", // Geographic Township Name field inGeographic Township layer		LotLayerNameFields: {    // Geographic Township Name field, Lot, Concession fields in Geographic Township with lot and concession layer			TownshipField: "OFFICIAL_NAME_UPPER",			LotField: "LOT_NUM_1",			ConField: "CONCESSION_NUMBER"		}	}4) regionAddressProcess: test whether the input contains province name. In globalConfig, a default method is provided to test whether the input contains Ontario or not. If not, Ontario is added to the ending of user input. 5) regionBoundary: stores the boundary of the province polygon. It is used to test whether a point is within the province or not. In globalConfig, the boundary of Ontario is provided. 6) UTMRange: store the value ranges of easting and northing in UTM coordinates. In globalConfig, the UTM ranges of Ontario is provided as following: 	UTMRange: {		minEasting: 258030.3,        		maxEasting: 741969.7,        		minNorthing: 4614583.73,        		maxNorthing: 6302884.09	}7) locatorsAvailable: stores whether specific locator services is available or not. In globalConfig, the default seting makes all four locator servicesavailable. 	locatorsAvailable: {		latlng: true,		utm: true,		township: true,		address: true	}. The is an example of configuration in globalConfig:	regionBoundary: [{x: -95.29920350, y: 48.77505703},	{x: -95.29920350, y: 53.07150598}, 	{x: -89.02502409, y: 56.95876930}, 	{x: -87.42238044, y: 56.34499088}, 	{x: -86.36531760, y: 55.93580527}, 	{x: -84.69447635, y: 55.45842206}, 	{x: -81.89837466, y: 55.35612565}, 	{x: -81.96657226, y: 53.17380238}, 	{x: -80.84131182, y: 52.28723355}, 	{x: -79.98884179, y: 51.80985033}, 	{x: -79.34096457, y: 51.74165273}, 	{x: -79.34096457, y: 47.54750019}, 	{x: -78.55669214, y: 46.49043736}, 	{x: -76.61306048, y: 46.14944935}, 	{x: -75.59009645, y: 45.77436253}, 	{x: -74.12384800, y: 45.91075774}, 	{x: -73.98745279, y: 45.02418891}, 	{x: -75.07861443, y: 44.61500329}, 	{x: -75.86288685, y: 44.03532368}, 	{x: -76.88585089, y: 43.69433566}, 	{x: -79.20, y: 43.450196}, 	{x: -78.62488975, y: 42.94416204}, 	{x: -79.54555738, y: 42.43268002}, 	{x: -81.28459623, y: 42.15988961}, 	{x: -82.54625188, y: 41.58020999}, 	{x: -83.26232670, y: 41.95529681}, 	{x: -83.36462310, y: 42.43268002}, 	{x: -82.61444948, y: 42.73956923}, 	{x: -82.17116506, y: 43.59203926}, 	{x: -82.61444948, y: 45.36517692}, 	{x: -84.08069793, y: 45.91075774}, 	{x: -84.93316796, y: 46.69503016}, 	{x: -88.27485047, y: 48.22947621}, 	{x: -89.33191330, y: 47.78619180}, 	{x: -90.32077854, y: 47.68389540}, 	{x: -92.09391619, y: 47.95668581}, 	{x: -94.07164666, y: 48.33177262}, 	{x: -95.29920350, y: 48.77505703}],	UTMRange: {		minEasting: 258030.3,        		maxEasting: 741969.7,        		minNorthing: 4614583.73,        		maxNorthing: 6302884.09	},	locatorsAvailable: {		latlng: true,		utm: true,		township: true,		address: true	},	validateLatLngWithRegion: function(v1, v2){		var lat = Math.min(v1, v2);		var lng = -Math.max(v1, v2);		return {lat: lat, lng: lng};	},	regionAddressProcess: function(addressStr){		var address = addressStr.toUpperCase();		var regionNames = ["ON", "ONT", "ONTARIO"];		var res = false;		for(var i=0; i<regionNames.length; i++){			if(globalConfig.isAddressEndsWithRegionName(address, regionNames[i])){				res = true;			}		}		if(!res){			return addressStr + " Ontario";		}		return addressStr;	},	defaultZone: 17,	geogTwpService: {		url: "http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/sportfishservice/MapServer",		TWPLayerID: 0,		LotLayerID: 1,		outFields: ["CENX", "CENY"],		TWPLayerNameField: "NAME",		LotLayerNameFields: {			TownshipField: "OFFICIAL_NAME_UPPER",			LotField: "LOT_NUM_1",			ConField: "CONCESSION_NUMBER"		}	}*/var globalConfig = globalConfig || {};/*globalConfig.informationDivId = globalConfig.informationDivId || 'information';globalConfig.noResultFound = globalConfig.noResultFound || function(){	document.getElementById(globalConfig.informationDivId).innerHTML ="<i>" + globalConfig.noResultFoundMsg + "</i>";	};*/	/* This the center of Ontario. If the geocoder returns this location as the results, it will be a failure of geocoding. */	globalConfig.failedLocation = globalConfig.failedLocation || {		positions: [[51.253775,-85.32321389999998], [42.832714, -80.279923]],		difference: 0.00001	};	/* LOCATOR setting Starts */	globalConfig.regionBoundary = globalConfig.regionBoundary || [{x: -95.29920350, y: 48.77505703},{x: -95.29920350, y: 53.07150598}, 	{x: -89.02502409, y: 56.95876930}, 	{x: -87.42238044, y: 56.34499088}, 	{x: -86.36531760, y: 55.93580527}, 	{x: -84.69447635, y: 55.45842206}, 	{x: -81.89837466, y: 55.35612565}, 	{x: -81.96657226, y: 53.17380238}, 	{x: -80.84131182, y: 52.28723355}, 	{x: -79.98884179, y: 51.80985033}, 	{x: -79.34096457, y: 51.74165273}, 	{x: -79.34096457, y: 47.54750019}, 	{x: -78.55669214, y: 46.49043736}, 	{x: -76.61306048, y: 46.14944935}, 	{x: -75.59009645, y: 45.77436253}, 	{x: -74.12384800, y: 45.91075774}, 	{x: -73.98745279, y: 45.02418891}, 	{x: -75.07861443, y: 44.61500329}, 	{x: -75.86288685, y: 44.03532368}, 	{x: -76.88585089, y: 43.69433566}, 	{x: -79.20, y: 43.450196}, 	{x: -78.62488975, y: 42.94416204}, 	{x: -79.54555738, y: 42.43268002}, 	{x: -81.28459623, y: 42.15988961}, 	{x: -82.54625188, y: 41.58020999}, 	{x: -83.26232670, y: 41.95529681}, 	{x: -83.36462310, y: 42.43268002}, 	{x: -82.61444948, y: 42.73956923}, 	{x: -82.17116506, y: 43.59203926}, 	{x: -82.61444948, y: 45.36517692}, 	{x: -84.08069793, y: 45.91075774}, 	{x: -84.93316796, y: 46.69503016}, 	{x: -88.27485047, y: 48.22947621}, 	{x: -89.33191330, y: 47.78619180}, 	{x: -90.32077854, y: 47.68389540}, 	{x: -92.09391619, y: 47.95668581}, 	{x: -94.07164666, y: 48.33177262}, 	{x: -95.29920350, y: 48.77505703}];	globalConfig.TWPSearch = false;  //use to remember whether it is a Township location search. 	globalConfig.TWPLotConSearch = false; //use to remember whether it is a Township with lot and concession location search.	globalConfig.UTMRange = globalConfig.UTMRange ||{		minEasting: 258030.3,        		maxEasting: 741969.7,        		minNorthing: 4614583.73,        		maxNorthing: 6302884.09	};	globalConfig.locatorsAvailable = globalConfig.locatorsAvailable || {		latlng: true,		utm: true,		township: true,		address: true	};	globalConfig.validateLatLngWithRegion = globalConfig.validateLatLngWithRegion  || function(v1, v2){		var lat = Math.min(v1, v2);		var lng = -Math.max(v1, v2);		return {lat: lat, lng: lng};	};	//Private method: test whether the input ends keywords	globalConfig.isAddressEndsWithRegionName = globalConfig.isAddressEndsWithRegionName || function(address, str) {		if (address.length > str.length + 1) {			var substr = address.substring(address.length - str.length - 1);			if (substr === (" " + str) || substr === ("," + str)) {				return true;			}		}		return false;	};	//Private method: test whether the input contains keywords by calling testOntario	globalConfig.regionAddressProcess = globalConfig.regionAddressProcess || function(addressStr){		var address = addressStr.toUpperCase();		var regionNames = ["ON", "ONT", "ONTARIO"];		var res = false;		for(var i=0; i<regionNames.length; i++){			if(globalConfig.isAddressEndsWithRegionName(address, regionNames[i])){				res = true;			}		}		if(!res){			return addressStr + " Ontario";		}		return addressStr;	};	globalConfig.defaultZone = globalConfig.defaultZone || 17;	globalConfig.geogTwpService = globalConfig.geogTwpService ||{		url: "http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/sportfishservice/MapServer",		TWPLayerID: 0,		LotLayerID: 1,		latitude: "CENY",		longitude: "CENX",				TWPLayerNameField: "NAME",		LotLayerNameFields: {			TownshipField: "OFFICIAL_NAME_UPPER",			LotField: "LOT_NUM_1",			ConField: "CONCESSION_NUMBER"		}	};	/*globalConfig.locationServicesList = globalConfig.locationServicesList || [		{			mapService: "http://138.218.29.100/ArcGIS/rest/services/DevJerry/Parcels/MapServer",			layerID: 0,			displayPolygon: true,  //For non-polygon layers, it is always false. For polygon layers, you can turn on and off to visualize the polygon.  			fieldsInInfoWindow: ["ARN"], 			getInfoWindow: function(attributes){				return "Assessment Parcel Number: <strong>" + attributes.ARN + "</strong>";			}, 			latitude: "Latitude",			longitude: "Longitude",			getSearchCondition: function(searchString){				return "ARN = '" + searchString + "'";			}, 			isInputFitRequirements: function(searchString){				var reg_isInteger = /^\d+$/;				if ((searchString.length === 20) && (reg_isInteger.test(searchString))) {					return true;				}				return false;							}		},		{			mapService: "http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/permitstotakewater/MapServer",			layerID: 0,			displayPolygon: false,  //For non-polygon layers, it is always false. For polygon layers, you can turn on and off to visualize the polygon.  			fieldsInInfoWindow: ["OFF_NAME"], 			getInfoWindow: function(attributes){				return "<strong>" + attributes.OFF_NAME + "</strong>";			},			latitude: "LAT_DD",			longitude: "LONG_DD",			getSearchCondition: function(searchString){				return "UPPER(OFF_NAME) = '" + searchString.toUpperCase() + "'";			}, 			isInputFitRequirements: function(searchString){				var coorsArray = searchString.toUpperCase().split(/\s+/);				if((coorsArray.length <= 1)||(coorsArray.length >= 4)){					return false;				}								var str = coorsArray[coorsArray.length - 1];						if((str === "RIVER") || (str === "CREEK") || (str === "BROOK") || (str === "LAKE") || (str === "HILL")|| (str === "ISLAND")){					return true;				}				return false;			}		}			];*/	/* LOCATOR setting Ends */	LOCATOR = (function () {	var regIsFloat = /^(-?\d+)(\.\d+)?$/; 	//http://appdelegateinc.com/blog/2010/05/16/point-in-polygon-checking/	// Ray Cast Point in Polygon extension for Google Maps GPolygon	// App Delegate Inc <htttp://appdelegateinc.com> 2010    function isInPolygon(lat, lng1) {        var lng = lng1;        if (lng1 > 0) {            lng = -lng;        }        var poly = globalConfig.regionBoundary;        var numPoints = poly.length;        var inPoly = false;        var j = numPoints - 1;        for (var i = 0; i < numPoints; i++) {            var vertex1 = poly[i];            var vertex2 = poly[j];            if (vertex1.x < lng && vertex2.x >= lng || vertex2.x < lng && vertex1.x >= lng) {                if (vertex1.y + (lng - vertex1.x) / (vertex2.x - vertex1.x) * (vertex2.y - vertex1.y) < lat) {                    inPoly = !inPoly;                }            }            j = i;        }        return inPoly;    }	   function validateLatLng(lat, lng) {        if (isInPolygon(lat, lng)) {            return {                latLng: new google.maps.LatLng(lat, lng),                success: true            };        }else {            return {success: false};        }    }		    function isInPolygonUTM(easting, northing) {		var UTMRange = globalConfig.UTMRange;        return ((easting < UTMRange.maxEasting) && (easting > UTMRange.minEasting) && (northing < UTMRange.maxNorthing) && (northing > UTMRange.minNorthing));    }	    function replaceChar(str, charA, charB) {        var temp = [];        temp = str.split(charA);        var result = temp[0];        if (temp.length >= 2) {            for (var i = 1; i < temp.length; i++) {                result = result + charB + temp[i];            }        }        return result;    }/*    function convertUTMtoLatLng(zone, north, east) {        var pi = 3.14159265358979; //PI        var a = 6378137; //equatorial radius for WGS 84        var k0 = 0.9996; //scale factor        var e = 0.081819191; //eccentricity        var e_2 = 0.006694380015894481; //e'2        //var corrNorth = north; //North Hemishpe        var estPrime = 500000 - east;        var arcLength = north / k0;        var e_4 = e_2 * e_2;        var e_6 = e_4 * e_2;        var t1 = Math.sqrt(1 - e_2);        var e1 = (1 - t1) / (1 + t1);        var e1_2 = e1 * e1;        var e1_3 = e1_2 * e1;        var e1_4 = e1_3 * e1;        var C1 = 3 * e1 / 2 - 27 * e1_3 / 32;        var C2 = 21 * e1_2 / 16 - 55 * e1_4 / 32;        var C3 = 151 * e1_3 / 96;        var C4 = 1097 * e1_4 / 512;        var mu = arcLength / (a * (1 - e_2 / 4.0 - 3 * e_4 / 64 - 5 * e_6 / 256));        var FootprintLat = mu + C1 * Math.sin(2 * mu) + C2 * Math.sin(4 * mu) + C3 * Math.sin(6 * mu) + C4 * Math.sin(8 * mu);        var FpLatCos = Math.cos(FootprintLat);        //var C1_an = e_2*FpLatCos*FpLatCos;        var FpLatTan = Math.tan(FootprintLat);        var T1 = FpLatTan * FpLatTan;        var FpLatSin = Math.sin(FootprintLat);        var FpLatSin_e = e * FpLatSin;        var t2 = 1 - FpLatSin_e * FpLatSin_e;        var t3 = Math.sqrt(t2);        var N1 = a / t3;        var R1 = a * (1 - e_2) / (t2 * t3);        var D = estPrime / (N1 * k0);        var D_2 = D * D;        var D_4 = D_2 * D_2;        var D_6 = D_4 * D_2;        var fact1 = N1 * FpLatTan / R1;        var fact2 = D_2 / 2;        var fact3 = (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * e_2) * D_4 / 24;        var fact4 = (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * e_2 - 3 * C1 * C1) * D_6 / 720;        var lofact1 = D;        var lofact2 = (1 + 2 * T1 + C1) * D_2 * D / 6;        var lofact3 = (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * e_2 + 24 * T1 * T1) * D_4 * D / 120;        var delta_Long = (lofact1 - lofact2 + lofact3) / FpLatCos;        var zone_CM = 6 * zone - 183;        var latitude = 180 * (FootprintLat - fact1 * (fact2 + fact3 + fact4)) / pi;        var longitude = zone_CM - delta_Long * 180 / pi;        var res = {            Latitude: latitude.toFixed(8),            Longitude: longitude.toFixed(8)        };        return res;    }	*/	//Private method: get the centroid and add the polylines	function returnCentroidAndPolyline(fset, latitude, longitude) {		var totalX = 0;		var totalY = 0;		var totalArea = 0;		var polylines = [];		for (var polygonIndex = 0; polygonIndex < fset.features.length; polygonIndex++) {			var att = fset.features[polygonIndex].attributes;			var area = 0;			for (var geometryIndex = 0; geometryIndex < fset.features[polygonIndex].geometry.length; geometryIndex++) {				var gpolygon = fset.features[polygonIndex].geometry[geometryIndex];				area = area + google.maps.geometry.spherical.computeArea(gpolygon.getPath());				polylines.push(gpolygon);			}			totalY = totalY + (att[latitude] * area);			totalX = totalX + (att[longitude] * area);			totalArea = totalArea + area;		}		var gLatLng = new google.maps.LatLng(totalY/totalArea, totalX/totalArea);		return {			gLatLng: gLatLng, 			polylines: polylines		};	}		function returnCentroid(fset, latitude, longitude) {		var totalX = 0;		var totalY = 0;		for (var i = 0; i < fset.features.length; i++) {			var att = fset.features[i].attributes;			totalY = totalY + att[latitude];			totalX = totalX + att[longitude];		}		var gLatLng = new google.maps.LatLng(totalY/fset.features.length, totalX/fset.features.length);		return {			gLatLng: gLatLng		};	}		LATLNG_LOCATOR = (function () {		function processRegionValidation(v1, v2){			var result = {lat: v1, lng: v2};			result = globalConfig.validateLatLngWithRegion(v1, v2);			return result;		}		//Private method: parse decimal degree.		function processDecimalDegree(coorsArray) {			if (regIsFloat.test(coorsArray[0])&&regIsFloat.test(coorsArray[1])) {									var v1 = Math.abs(parseFloat(coorsArray[0]));				var v2 = Math.abs(parseFloat(coorsArray[1]));				var result = processRegionValidation(v1, v2);				return validateLatLng(result.lat, result.lng);			} else {				return {success:false};			}		}				//Private method: Parse the string. called by parseLatLng		function parseDMS(s, unparsed) {			var res = {				ParsedNum: 0,				Unparsed: ""			};			if (unparsed.length === 0) {				return res;			}			var arr = unparsed.split(s);			var result = 0;			if (arr.length <= 2) {				if (regIsFloat.test(arr[0])) {											result = parseFloat(arr[0]);				}				if (arr.length === 2) {					unparsed = arr[1];				} else {					unparsed = "";				}			}			res = {				ParsedNum: result,				Unparsed: unparsed			};			return res;		}				//Private method: Parse the string by calling parseDMS. Called by processSymbol and processSymbolDMS		function parseLatLng(val, s1, s2, s3) {			var result = 0;			var parsed = parseDMS(s1, val);			var deg = parsed.ParsedNum;			parsed = parseDMS(s2, parsed.Unparsed);			var min = parsed.ParsedNum;			parsed = parseDMS(s3, parsed.Unparsed);			var sec = parsed.ParsedNum;			if (deg > 0) {				result = deg + min / 60.0 + sec / 3600.0;			} else {				result = deg - min / 60.0 - sec / 3600.0;			}			result = Math.abs(result);			return result;		}				//Private method: parse symbol degree, minute and second. Need to call parseLatLng method.		function processSymbol(coorsArray) {			var degreeSym = String.fromCharCode(176);			if (((coorsArray[0]).indexOf(degreeSym) > 0) && ((coorsArray[1]).indexOf(degreeSym) > 0)) {				var v1 = parseLatLng(coorsArray[0], degreeSym, "'", "\"");				var v2 = parseLatLng(coorsArray[1], degreeSym, "'", "\"");				var result = processRegionValidation(v1, v2);				return validateLatLng(result.lat, result.lng);			} else {				return {success:false};			}		}				//Private method: valide whether input contains a number with D. called by processSymbolDMS		function validateLatLngFormat(str) {			for (var i = 0; i <= 9; i++) {				if (str.indexOf(i + "D") > 0) {					return 1;				}			}			return 0;		}				//Private method: parse symbol (DMS) degree, minute and second. Need to call parseLatLng and validateLatLngFormat methods.		function processSymbolDMS(coorsArray) {			var str1 = (coorsArray[0]).toUpperCase();			var str2 = (coorsArray[1]).toUpperCase();			var valid = validateLatLngFormat(str1) * validateLatLngFormat(str2);			if (valid > 0) {				var v1 = parseLatLng(str1, "D", "M", "S");				var v2 = parseLatLng(str2, "D", "M", "S");				var result = processRegionValidation(v1, v2);				return validateLatLng(result.lat, result.lng);			} else {				return {success:false};			}		}		//Public method: use three methods: decimal degree, DMS, and DMS symbols to parse the input		function process(queryParams, coorsArray) {			if (coorsArray.length !== 2) {				return {success:false};			}			var res = processDecimalDegree(coorsArray);			if (!res.success) {				res = processSymbol(coorsArray);			}			if (!res.success) {				res = processSymbolDMS(coorsArray);			}						if (res.success) {				queryParams.gLatLng = res.latLng;				queryParams.callback(queryParams);			}			return res;		}						var module = {			process: process		};		return module;	})();	//Parse the input as UTM	UTM_LOCATOR = (function () {		//Private method: Parse default UTM ZONE with only easting and northing		function processDefaultZone(coorsArray, defaultZone) {			if (coorsArray.length !== 2) {				return {success:false};			}			if (regIsFloat.test(coorsArray[0])&&regIsFloat.test(coorsArray[1])) {							var v1 = Math.abs(parseFloat(coorsArray[0]));				var v2 = Math.abs(parseFloat(coorsArray[1]));				var v3 = Math.min(v1, v2);				var v4 = Math.max(v1, v2);				if (isInPolygonUTM(v3, v4)) {					var latlng = globalConfig.convertUTMtoLatLng(defaultZone, v4, v3);					return validateLatLng(latlng.Latitude, latlng.Longitude);				} else {					return {success:false};				}			} else {				return {success:false};			}		}		//Private method: Parse general UTM with zone, easting and northing		function processGeneralUTM(coorsArray) {			var res = {success:false};			if (coorsArray.length !== 3) {				return res;			}			var a1 = (coorsArray[0]).replace(",", " ").trim();			var a2 = (coorsArray[1]).replace(",", " ").trim();			var a3 = (coorsArray[2]).replace(",", " ").trim();			if (regIsFloat.test(a1)&&regIsFloat.test(a2)&&regIsFloat.test(a3)) {				var values = [Math.abs(parseFloat(a1)), Math.abs(parseFloat(a2)), Math.abs(parseFloat(a3))];				values.sort(function (a, b) {					return a - b;				});				var zoneStr = (values[0]).toString(); //zone				var reg_isInteger = /^\d+$/;				if (reg_isInteger.test(zoneStr)) {					if ((values[0] >= 15) && (values[0] <= 18)) {						if (isInPolygonUTM(values[1], values[2])) {							var latlng = globalConfig.convertUTMtoLatLng(values[0], values[2], values[1]); //Zone, Northing, Easting							return validateLatLng(latlng.Latitude, latlng.Longitude);						}					}				}			}			return res;		}		function process(queryParams, coorsArray) {			var res = processDefaultZone(coorsArray, globalConfig.defaultZone);			if (!res.success) {				res = processGeneralUTM(coorsArray);			}			if (res.success) {				queryParams.gLatLng = res.latLng;				queryParams.callback(queryParams);			}			return res;		}				var module = {			process: process		};		return module;	})();	//Parse the input as Township, Lot, Concession	TWP_LOCATOR = (function () {		//Private method: parse the input to get Lot, Concession		function processLotCon(arr1) {			if (arr1.length !== 2) {				return {					TWP: "",					Lot: "",					Con: "",					isTWPOnly: false,					success: false				};			}			var TWPname = (arr1[0]).trim().split(/\s+/).join(' '); //replace multiple spaces with one space			var con = "";			var lot = "";			if (((arr1[1]).indexOf("LOT") > 0) && ((arr1[1]).indexOf("CON") > 0)) {				var arr2 = ((arr1[1]).trim()).split("CON");				if ((arr2[0]).length === 0) {					var arr3 = (arr2[1]).split("LOT");					con = (arr3[0]).trim();					lot = (arr3[1]).trim();				} else {					var arr4 = (arr2[0]).split("LOT");					con = (arr2[1]).trim();					lot = (arr4[1]).trim();				}			}			var TWPOnly = false;			if ((con.length === 0) && (lot.length === 0)) {				TWPOnly = true;			}			return {				TWP: TWPname,				Lot: lot,				Con: con,				isTWPOnly: TWPOnly,				success: true			};		}				//Private method: parse the input to get Township, Lot, Concession by calling processLotCon		function preprocessTWP(coors_Up) {			var res = {				TWP: "",				Lot: "",				Con: "",				isTWPOnly: false,				success: false			};			if (coors_Up.indexOf(' TWP') > 0) {				res = processLotCon(coors_Up.split(" TWP"));			}			if (!res.success) {				if (coors_Up.indexOf(' TOWNSHIP') > 0) {					res = processLotCon(coors_Up.split(" TOWNSHIP"));				}			}			if (!res.success) {				if (coors_Up.indexOf('CANTON ') === 0) {					var str = coors_Up.substring(7).trim();					var lotIndex = str.indexOf(" LOT ");					var conIndex = str.indexOf(" CON ");					var index = lotIndex;					if (conIndex < lotIndex) {						index = conIndex;					}					var parsedList = [];					if (index === -1) {						parsedList.push(str);						parsedList.push("");					} else {						parsedList.push(str.substring(0, index));						parsedList.push(str.substring(index));					}					res = processLotCon(parsedList);				}			}			return res;		}				//Public method: parse the input as Township, Lot, Concession information by calling preprocessTWP, getCentroidAndAddPolylines		function process(queryParams, coorsArray) {			var coors_Up = coorsArray.join(' ').toUpperCase();			var twpInfo = preprocessTWP(coors_Up);			if (twpInfo.success) {				var geogTwpService = globalConfig.geogTwpService;												var params = {					returnGeometry: true,					outFields: [geogTwpService.latitude, geogTwpService.longitude]				};				var layerId;				if (twpInfo.isTWPOnly) {					params.where = geogTwpService.TWPLayerNameField + " = '" + twpInfo.TWP + "'";					layerId = geogTwpService.TWPLayerID; //Twp layer					globalConfig.TWPSearch = true;				} else {					params.where = geogTwpService.LotLayerNameFields.TownshipField + " = '" + twpInfo.TWP + "' AND " + geogTwpService.LotLayerNameFields.ConField + " = 'CON " + twpInfo.Con + "' AND " + geogTwpService.LotLayerNameFields.LotField + " = 'LOT " + twpInfo.Lot + "'";					layerId = geogTwpService.LotLayerID; //Lot Con layer					globalConfig.TWPLotConSearch = true;				}								var layer = new gmaps.ags.Layer(geogTwpService.url + "/" + layerId);				layer.query(params, function (fset) {					if (fset.features.length > 0) {						var res = returnCentroidAndPolyline(fset, geogTwpService.latitude, geogTwpService.longitude);						queryParams.gLatLng = res.gLatLng;						queryParams.polylines = res.polylines;						queryParams.zoomlevel = (twpInfo.isTWPOnly) ? globalConfig.twpZoomLevel : globalConfig.lotConcessionZoomLevel;						queryParams.callback(queryParams);					} else {						//console.log("1");						queryParams.totalCount = 0;						globalConfig.resultFoundSimple(queryParams);						//globalConfig.noResultFound();					}				});				return {					success: true				};			} else {				return {success:false};			}		}				var module = {			process: process		};		return module;	})();	ADDRESS_LOCATOR = (function () {	    //validate the input is a latitude & longitude. 		function validateLatLngSearch (coorsArray) {			if (coorsArray.length === 2) {				if (regIsFloat.test(coorsArray[0])&&regIsFloat.test(coorsArray[1])) {					return true;				}				var degreeSym = String.fromCharCode(176);				if (((coorsArray[0]).indexOf(degreeSym) > 0) && ((coorsArray[1]).indexOf(degreeSym) > 0)) {					return true;				}				var validateLatLngFormat = function(str) {					for (var i = 0; i <= 9; i++) {						if (str.indexOf(i + "D") > 0) {							return 1;						}					}					return 0;				};				var str1 = (coorsArray[0]).toUpperCase();				var str2 = (coorsArray[1]).toUpperCase();				var valid = validateLatLngFormat(str1) * validateLatLngFormat(str2);				if (valid > 0) {					return true;									}			}			return false;		}				//Public method: parse the input as address information by calling isContarionOntario and showRevGeocodeResult				function process(queryParams, coorsArray) {			if (validateLatLngSearch(coorsArray)) {				queryParams.totalCount = 0;				globalConfig.resultFoundSimple(queryParams);							//globalConfig.noResultFound();				return;			}						var geocoder = new google.maps.Geocoder();			var addressStr = queryParams.address;			if (addressStr.toUpperCase() === "ONTARIO") {				queryParams.totalCount = 0;				globalConfig.resultFoundSimple(queryParams);							//globalConfig.noResultFound();				return;			}			addressStr = globalConfig.regionAddressProcess(addressStr);			geocoder.geocode({				'address': addressStr			}, function (results, status) {				if (status === google.maps.GeocoderStatus.OK) {					var max = results.length;					var notMoved = true;					for (var i = 0; i < max; i++) {						var point = results[i].geometry.location;						var failedPositions = globalConfig.failedLocation.positions;						var failedDifference = globalConfig.failedLocation.difference;						var isThisPositionFailed = false;						for (var j = 0; j < failedPositions.length; j ++) {							var diff = Math.abs(point.lat() - failedPositions[j][0]) + Math.abs(point.lng() - failedPositions[j][1]);							if (diff < failedDifference){								isThisPositionFailed = true;								break;							}													}						if (isThisPositionFailed) {							continue;						} 						if (isInPolygon(point.lat(), point.lng())) {							queryParams.gLatLng = point;							queryParams.returnedAddress = results[i].formatted_address.toString();							queryParams.callback(queryParams);							notMoved = false;							break;						}					}					if (notMoved) {						queryParams.totalCount = 0;						globalConfig.resultFoundSimple(queryParams);											//globalConfig.noResultFound();					}				} else {					queryParams.totalCount = 0;					globalConfig.resultFoundSimple(queryParams);									//globalConfig.noResultFound();				}			});		}		var module = {			process: process		};		return module;	})();		    function locate(queryParams) {        var coors = replaceChar(queryParams.address, ',', ' ').trim();        var coorsArray = coors.split(/\s+/);		var res = {success: false};		/*Use the location service defined in configuration to search the user input. */		if(typeof(globalConfig.locationServicesList) !== "undefined"){			for (var i = 0; i < globalConfig.locationServicesList.length; i++) {				var service = globalConfig.locationServicesList[i];				if((!res.success)&&service.isInputFitRequirements(coors)){					res.success = true;					service.returnGeometry = false;					if(service.displayPolygon){						service.returnGeometry = true;					}					var outFields2 = service.fieldsInInfoWindow;					outFields2.push(service.latitude);					outFields2.push(service.longitude);					var params = {						returnGeometry: service.returnGeometry,						where: service.getSearchCondition(coors),						outFields: outFields2					};					var layer = new gmaps.ags.Layer(service.mapService + "/" +  service.layerID);					var getInfoWindow = service.getInfoWindow;					var displayPolygon = service.displayPolygon;					var latField = service.latitude;					var lngField = service.longitude;					layer.query(params, function (fset) {						var size = 0;						if(fset){							size = fset.features.length;							if (size > 0) {								queryParams.address = getInfoWindow(fset.features[0].attributes);								if(displayPolygon){									var centroid = returnCentroidAndPolyline(fset, latField, lngField);									queryParams.gLatLng = centroid.gLatLng;									queryParams.polylines = centroid.polylines;									queryParams.callback(queryParams);								}else{									var centroid2 = returnCentroid(fset, latField, lngField);									queryParams.gLatLng = centroid2.gLatLng;									queryParams.callback(queryParams);																	}							}else{								return {success: false};							}						}else{							return {success: false};						}					});											}			}		}				var locatorsAvailable = globalConfig.locatorsAvailable;		if((!res.success)&&locatorsAvailable.latlng){			res = LATLNG_LOCATOR.process(queryParams, coorsArray);		}        if ((!res.success)&&locatorsAvailable.utm) {            res = UTM_LOCATOR.process(queryParams, coorsArray);        }        if ((!res.success)&&locatorsAvailable.township) {            res = TWP_LOCATOR.process(queryParams, coorsArray);        }        if ((!res.success)&&locatorsAvailable.address) {            res = ADDRESS_LOCATOR.process(queryParams, coorsArray);        }    }    var module = {        locate: locate    };    return module;})();/*global TABS_CALCULATOR:false */TABS_CALCULATOR = (function () {	/*call by getRequiredFields. This function is called recursively to find the fields used in the Tab*/	function getRequiredFieldsFromOneString(infoWindowString, fields){		var start = infoWindowString.indexOf("{");        var end = infoWindowString.indexOf("}");        if ((start >= 0) && (end >= 0)) {			var str1 = infoWindowString.substring(0, start);			var str2 = infoWindowString.substring(start + 1, end);			var str3 = infoWindowString.substring(end + 1);			var funStart = str2.indexOf("(");			var funEnd = str2.indexOf(")");			if ((funStart >= 0) && (funEnd >= 0)) { //function				var parameters = str2.substring(funStart + 1, funEnd);				var paraArray = parameters.split(",");				for (var j = 0; j < paraArray.length; j++) {					fields.push((paraArray[j]).trim());				}			}else{				fields.push(str2.trim());			}			infoWindowString = getRequiredFieldsFromOneString(str3, fields);		}		return fields;	}	    function removeConditionInfoWindow(infoWindowString, attributes, start, end) {        var str1 = infoWindowString.substring(0, start);        var str2 = infoWindowString.substring(start + 1, end);        var str3 = infoWindowString.substring(end + 1);        var index = str2.indexOf("}");        var fieldName = str2.substring(1, index);        var str4 = str2.substring(index + 2);        index = str4.indexOf("?");        var result = "";        if (attributes[fieldName] > 0) {            result = str1 + str4.substring(index + 1);        } else {            result = str1 + str4.substring(0, index);        }        var start1 = str3.indexOf("[");        var end1 = str3.indexOf("]");        if ((start1 >= 0) && (end1 >= 0)) {            str3 = removeConditionInfoWindow(str3, attributes, start1, end1);        }        result = result + str3;        return result;    }	    function processNA(str) {        if (typeof(str) === 'undefined') {            return "N/A";        }        if (str === "null") {            return "N/A";        }        if (str === "Null") {            return "N/A";        }        return str;    }    function getInfoWindowString(infoWindowString, attributes, start, end) {        var str1 = infoWindowString.substring(0, start);        var fieldName = infoWindowString.substring(start + 1, end);        var str3 = infoWindowString.substring(end + 1);        var dataStr = " ";        var funStart = fieldName.indexOf("(");        var funEnd = fieldName.indexOf(")");        if ((funStart >= 0) && (funEnd >= 0)) {            var funName = fieldName.substring(0, funStart);            var parameters = fieldName.substring(funStart + 1, funEnd);            var paraArray = parameters.split(",");            funName = funName + "(";            for (var j = 0; j < paraArray.length; j++) {                if ((paraArray[j]).indexOf("'") === -1) {                    var attrValue = attributes[(paraArray[j]).trim()];					attrValue = processNA(attrValue);					if(attrValue === null){						attrValue = "N/A";					}                    if (typeof attrValue === "number") {						                        funName = funName + attrValue;                    }                    if (typeof attrValue === "string") {                        if (attrValue.indexOf("'") === -1) {                            funName = funName + "'" + attrValue + "'";                        } else if (attrValue.indexOf('"') === -1) {                            funName = funName + "\"" + attrValue + "\"";                        } else {                            //funName = funName + '"' + attrValue.replace('"', '\"') + '"';							funName = funName + '"' + attrValue.replace('"', "\\\"") + '"';                        }                    }                } else {                    funName = funName + paraArray[j];                }                if (j < paraArray.length - 1) {                    funName = funName + ",";                }            }			            funName = funName + ");";            dataStr = eval(funName);        } else {            if (attributes[fieldName] !== "Null") {                dataStr = attributes[fieldName];            }        }        var start1 = str3.indexOf("{");        var end1 = str3.indexOf("}");        if ((start1 >= 0) && (end1 >= 0)) {            str3 = getInfoWindowString(str3, attributes, start1, end1);        }        var result = str1 + dataStr + str3;        return result;    }	    function getInfoWindowContent(attributes, infoWindowString) {        var start = infoWindowString.indexOf("[");        var end = infoWindowString.indexOf("]");        if ((start >= 0) && (end >= 0)) {            infoWindowString = removeConditionInfoWindow(infoWindowString, attributes, start, end);        }        start = infoWindowString.indexOf("{");        end = infoWindowString.indexOf("}");        if ((start >= 0) && (end >= 0)) {            infoWindowString = getInfoWindowString(infoWindowString, attributes, start, end);        }        return infoWindowString;    }	/*call getRequiredFieldsFromOneString to figure out the required fields in tabs*/    function getRequiredFields(tabs) {        var fields = [];        for (var i = 0; i < tabs.length; i++) {            var tab = tabs[i];            fields = getRequiredFieldsFromOneString(tab.label, fields);			fields = getRequiredFieldsFromOneString(tab.content, fields);        }        return fields.unique();    }	   function getContent(attributes, tabs) {        var contents = [];        for (var i = 0; i < tabs.length; i++) {            var tab = tabs[i];            var tabName = getInfoWindowContent(attributes, tab.label);            if (tabName.trim().length > 1) {                var tabContent = getInfoWindowContent(attributes, tab.content);				//console.log(i);				//console.log(tabContent);                contents.push({                    label: tabName,                    content: tabContent                });            }        }		//console.log(contents[0]);		//console.log(contents[0].content);        return contents;    }	    var module = {        getContent: getContent,		getRequiredFields: getRequiredFields    };    return module;})();/*global document:false */
/*global google:false */
/*global gmaps:false */
/*global MOEMAP:false */
/*global INITIALIZATION:false */
	var globalConfig = globalConfig || {};
	globalConfig.testDivExist = globalConfig.testDivExist || function (divId) {
		return (!!document.getElementById(divId))
	};
	globalConfig.disclaimerDivId = globalConfig.disclaimerDivId || 'disclaimer';
	//if (typeof globalConfig.displayDisclaimer === "undefined"){globalConfig.displayDisclaimer = false;}
	globalConfig.coordinatesDivId = globalConfig.coordinatesDivId || 'coordinates';    //The div id for coordinates status.
	globalConfig.updateCoordinates = globalConfig.updateCoordinates || function(lat, lng){
		var utm = globalConfig.convertLatLngtoUTM(lat, lng);
		//document.getElementById(globalConfig.coordinatesDivId).innerHTML = "Latitude:" + lat.toFixed(6) + ", Longitude:" + lng.toFixed(6) + " (" + globalConfig.UTM_ZoneLang + ":" + utm.Zone + ", " + globalConfig.EastingLang + ":" + utm.Easting + ", " + globalConfig.NorthingLang +":" + utm.Northing + ") <br><br><div align=\"left\">" + globalConfig.designLang + "</div><br>";
		document.getElementById(globalConfig.coordinatesDivId).innerHTML = "Latitude:" + lat.toFixed(5) + ", Longitude:" + lng.toFixed(5) + " (" + globalConfig.UTM_ZoneLang + ":" + utm.Zone + ", " + globalConfig.EastingLang + ":" + utm.Easting + ", " + globalConfig.NorthingLang +":" + utm.Northing + ")<br>";
	};
	//globalConfig.defaultCoordinateLang = globalConfig.defaultCoordinateLang || "Latitude : 48.950861, Longitude : -83.486242 (" + globalConfig.UTM_ZoneLang + ":17, " + globalConfig.EastingLang + ":317978.96, " + globalConfig.NorthingLang + ":5424971.70)  <br><br><div align=\"left\">" + globalConfig.designLang + "</div><br>";		
	
	if (typeof globalConfig.useSystemDefinedInit === "undefined"){globalConfig.useSystemDefinedInit = true;}
	if (typeof globalConfig.allowMultipleIdentifyResult === "undefined"){globalConfig.allowMultipleIdentifyResult = true;}
	if (typeof globalConfig.displayTotalIdentifyCount === "undefined"){globalConfig.displayTotalIdentifyCount = true;}
	if (typeof globalConfig.isCoordinatesVisible === "undefined"){globalConfig.isCoordinatesVisible = true;}	
	
	globalConfig.orgLatitude = globalConfig.orgLatitude || 49.764775;
	globalConfig.orgLongitude = globalConfig.orgLongitude || -85.323214;
	globalConfig.orgzoomLevel = globalConfig.orgzoomLevel || 5;
	globalConfig.lotConcessionZoomLevel = globalConfig.lotConcessionZoomLevel || 14;
	globalConfig.twpZoomLevel = globalConfig.twpZoomLevel || 11;
	globalConfig.minMapScale = globalConfig.minMapScale || 5;
	globalConfig.maxMapScale = globalConfig.maxMapScale || 21;
	globalConfig.tableID = globalConfig.tableID || "myTable";
	globalConfig.tableWidth = globalConfig.tableWidth || 650; //The total width of the table below the map
	if(!globalConfig.accessible){
		globalConfig.defaultMapTypeId = globalConfig.defaultMapTypeId || google.maps.MapTypeId.ROADMAP;
	}
	globalConfig.accessibleTableClassName = globalConfig.accessibleTableClassName || "fishTable";	
	globalConfig.generalTableClassName = globalConfig.generalTableClassName || "tablesorter";	
	globalConfig.accessible = globalConfig.accessible || false;
	if(globalConfig.accessible){
		globalConfig.tableClassName = globalConfig.accessibleTableClassName;
	} else {
		globalConfig.tableClassName = globalConfig.generalTableClassName;	
	}
	globalConfig.mapCanvasDivId = globalConfig.mapCanvasDivId || "map_canvas";
	globalConfig.opacity = globalConfig.opacity || 1;   //define the layer's opacity.
	globalConfig.locationTypeSelectionDivId = globalConfig.locationTypeSelectionDivId || "locationType";
	globalConfig.radiusSelectionDivId = globalConfig.radiusSelectionDivId || "lstRadius";
	globalConfig.businessTypeParameter = globalConfig.businessTypeParameter || "Business";
	globalConfig.searchBusinessDivId = globalConfig.searchBusinessDivId || "searchBusiness";
	globalConfig.searchLocationDivId = globalConfig.searchLocationDivId || "searchLocation";
	globalConfig.searchInputBoxDivId = globalConfig.searchInputBoxDivId || "map_query";
	globalConfig.currentMapExtentDivId = globalConfig.currentMapExtentDivId || "currentMapExtent";
	globalConfig.preInitialize = globalConfig.preInitialize || function(){
	};
	globalConfig.postInitialize = globalConfig.postInitialize || function(map){
		//console.log(map);
		if (document.getElementById(globalConfig.searchBusinessDivId)) {
			document.getElementById(globalConfig.searchBusinessDivId).checked = true;
		}
		if(document.getElementById(globalConfig.searchLocationDivId)){
			document.getElementById(globalConfig.searchLocationDivId).checked = false;
		}
		if(document.getElementById(globalConfig.radiusSelectionDivId)){
			document.getElementById(globalConfig.radiusSelectionDivId).disabled = true;
		}
		if(document.getElementById(globalConfig.searchInputBoxDivId)){
			document.getElementById(globalConfig.searchInputBoxDivId).focus();//Make sure the input box is focused when the page is initialized.
		}	
	};
	//if this function is defined, the program will call this rather the predefine initialization method. use it with caution.
	/*selfDefinedInitialize: function(){}*/

	globalConfig.searchChange = globalConfig.searchChange || function(type){
		if(type === globalConfig.businessTypeParameter){
			document.getElementById(globalConfig.radiusSelectionDivId).disabled = true;
		}else{
			document.getElementById(globalConfig.radiusSelectionDivId).disabled = false;
		}
	};
	globalConfig.search = globalConfig.search || function(){
			var name = document.getElementById(globalConfig.searchInputBoxDivId).value.trim();
			if(name.length === 0){
				return;
			}
			document.getElementById(globalConfig.queryTableDivId).innerHTML = "";
			MOEMAP.clearOverlays();
			if(document.getElementById(globalConfig.searchBusinessDivId).checked){
				name = name.toUpperCase();
				name = globalConfig.replaceChar(name, "'", "''");
				name = globalConfig.replaceChar(name, globalConfig.u2019Lang, "''");
				var attributeSearchItems = globalConfig.attributeSearchItems;
				MOEMAP.queryLayerWithFuzzyMatch(attributeSearchItems[0].field, name);
				return;
			}
			if(document.getElementById(globalConfig.searchLocationDivId).checked){
				var radius = document.getElementById(globalConfig.radiusSelectionDivId).value;
				MOEMAP.queryLayerWithLocationRadius(name, radius);
			}			
	};
	globalConfig.extraImageService = globalConfig.extraImageService || {
		id: "arcgis",
		name: "ESRI",
		url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer',
		visible: true
	};
	globalConfig.entsub = globalConfig.entsub || function(event){
		if (event && event.which === 13){
			globalConfig.search();
		}else{
			return true;
		}
	};
	globalConfig.searchTheMapDivId = globalConfig.searchTheMapDivId || 'searchTheMap';
	globalConfig.searchHelpDivId = globalConfig.searchHelpDivId || 'searchHelp';
	globalConfig.informationDivId = globalConfig.informationDivId || 'information';
	globalConfig.createTablesInfoWindows = globalConfig.createTablesInfoWindows || function(tabsTableTemplate) {
		var mapfunction = function(tab) {
			return {label: tab.label,
				head: "<table class='tabtable'><tr><th>" + tab.content.map(function(b) {return b.name;}).join("</th><th>") + "</th></tr>",
				content: "<tr><td>" + tab.content.map(function(b) {return b.value;}).join("</td><td>") + "</td></tr>",
				tail: "</table>"};
		};
		return tabsTableTemplate.map(mapfunction)
	};

	globalConfig.createTableBelowMap = globalConfig.createTableBelowMap || function(tableSimpleTemplate) {
		return {
			head: tableSimpleTemplate.title + "<table id=\"" + globalConfig.tableID + "\" class=\"" + globalConfig.tableClassName + "\" width=\"" + globalConfig.tableWidth + "\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\"><thead><tr><th><center>" + tableSimpleTemplate.content.map(function(b) {return b.name;}).join("</center></th><th><center>") + "</center></th></tr></thead><tbody>",
			content: "<tr><td>" + tableSimpleTemplate.content.map(function(b) {return b.value;}).join('</td><td>') + "</td></tr>",
			tail: "</tbody></table>"
		};
	};
	globalConfig.noCoordinatesTableID = globalConfig.noCoordinatesTableID || "noCoordinatesTable";
	globalConfig.createNoCoordinatesTableBelowMap = globalConfig.createNoCoordinatesTableBelowMap || function(tableSimpleTemplate) {
		//console.log(tableSimpleTemplate);
		return {
			head: globalConfig.noCoordinatesTableTitleLang + "<table id=\"" + globalConfig.noCoordinatesTableID + "\" class=\"" + globalConfig.tableClassName + "\" width=\"" + globalConfig.tableWidth + "\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\"><thead><tr><th><center>" + tableSimpleTemplate.content.map(function(b) {return b.name;}).join("</center></th><th><center>") + "</center></th></tr></thead><tbody>",
			content: "<tr><td>" + tableSimpleTemplate.content.map(function(b) {return b.value;}).join('</td><td>') + "</td></tr>",
			tail: "</tbody></table>"
		};
	};	
/*	
	globalConfig.searchControlHTMLGenerator = globalConfig.searchControlHTMLGenerator || function () {
		return '<table width="100%" cellpadding="5" cellspacing="0" border="0" style="margin-bottom:15px;" summary="' 
				+ globalConfig.SearchInteractiveMapFormLang  + '">' +
				'<caption style="text-align:left;">' + globalConfig.SearchInteractiveMapLang  + '</caption>' + 
				'<tr>' + 
					'<th scope="col"></th>' + 
					'<th scope="col"></th>' + 
				'</tr>' + 
				'<tr>' + 
					'<td valign="top" width="'+ globalConfig.InputBoxSizeLang  + '">' + 
						'<input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="' 
							+ globalConfig.TermLang  + '"></input>' + globalConfig.nbspLang + '<input type="submit" onclick="globalConfig.search()" value="' + 
							globalConfig.SearchLang  + '" title="' + globalConfig.SearchLang  + '"></input>' + 
					'</td>' + 
					'<td valign="top">'+ 	
						'<input id="currentMapExtent" type="checkbox" name="currentExtent" title="' + globalConfig.CurrentMapDisplayLang  + '"><span title="' + globalConfig.CurrentMapDisplayTitleLang  + '" class="tooltip">' + globalConfig.CurrentMapDisplayLang  + '</span>' + 
					'</td>' + 
				'</tr>' + 
				'<tr>' + 
					'<td colspan="2">' + 
						'<div id="information" style="margin-top:10px;">' + 
							globalConfig.searchHelpTxt + 
						'</div>' + 
					'</td>' + 
				'</tr>' + 
			'</table>';
	};
*/
	globalConfig.chooseLang = globalConfig.chooseLang || function (en, fr) {return (globalConfig.language === "EN") ? en : fr;};
	if ((globalConfig.searchableFieldsList) && (!globalConfig.searchHelpTxt)) {
		globalConfig.searchHelpTxt = globalConfig.youMaySearchByLang;
		for(var i=0; i<globalConfig.searchableFieldsList.length - 1; i++) {
			globalConfig.searchHelpTxt = globalConfig.searchHelpTxt + "<strong>" + globalConfig.chooseLang(globalConfig.searchableFieldsList[i].en, globalConfig.searchableFieldsList[i].fr) + "</strong>, ";
		}
		globalConfig.searchHelpTxt = globalConfig.searchHelpTxt + "<strong>" + globalConfig.chooseLang(globalConfig.searchableFieldsList[i].en, globalConfig.searchableFieldsList[i].fr) + "</strong> " + globalConfig.seeHelpForAdvancedOptionsLang;
	}
	globalConfig.searchControlHTMLGenerator = globalConfig.searchControlHTMLGenerator || function () {
		//return //'<h4>' + globalConfig.SearchInteractiveMapLang  + '</h4>' + 
			//'<div id="information">' + globalConfig.searchHelpTxt + '</div>' + 
			//'<input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="' + globalConfig.TermLang  + '">' + globalConfig.nbspLang + '<input type="submit" onclick="globalConfig.search()" value="' + globalConfig.SearchLang  + '" title="' + globalConfig.SearchLang  + '"><br/>' + 
			//'<input id="currentMapExtent" type="checkbox" name="currentExtent" title="' + globalConfig.CurrentMapDisplayLang  + '"> <label for="currentExtent" class=\'option\'>' + globalConfig.CurrentMapDisplayLang  + '</label>';			
		/*return '<label class="element-invisible" for="map_query">Search the map</label> \
			<input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="Search term" /> \
			<label class="element-invisible" for="search_submit">Search</label> \
			<input type="submit" onclick="globalConfig.search()" id="search_submit" value="Search" title="Search" /> \
			<br/> \
			<input id="currentMapExtent" type="checkbox" name="currentExtent" title="Current Map Display"> \
			<label for="currentExtent" class=\'option\'>' + globalConfig.CurrentMapDisplayLang + '</label>';*/
		return '<div id="searchTheMap"></div><div id="searchHelp"></div><br>\
			<label class="element-invisible" for="map_query">' + globalConfig.chooseLang('Search the map', 'Recherche carte interactive') + '</label>\
			<input id="map_query" type="text" title="' + globalConfig.chooseLang('Search term', 'Terme de recherche') + '" maxlength="100" size="50" onkeypress="return globalConfig.entsub(event)"></input>\
			<label class="element-invisible" for="search_submit">' + globalConfig.chooseLang('Search', 'Recherche') + '</label>\
			<input id="search_submit" type="submit" title="' + globalConfig.chooseLang('Search', 'Recherche') + '" onclick="globalConfig.search()" value="' + globalConfig.chooseLang('Search', 'Recherche') + '"></input>\
			<br/>\
			<input id="currentMapExtent" type="checkbox" name="currentExtent" title="' + globalConfig.chooseLang('Current Map Display', "Étendue de la carte courante") + '" /> <label for="currentExtent" class=\'option\'>' + globalConfig.chooseLang('Search current map display only', "\u00c9tendue de la carte courante") + '</label>\
			<div id="information"></div>';
	};
	
	if(!globalConfig.hasOwnProperty('searchControlHTML')) {
		//If the configuration file does not contain searchControlHTML, use the default generator to create it. 
		globalConfig.searchControlHTML = globalConfig.searchControlHTMLGenerator();
	}
	// 
	/*Map Initialization module provides the init method to be called to initialize the Google Maps and other setting. */
	INITIALIZATION = (function () {
		/*
			Use the tabsTableTemplate to generate the tabsTemplate. This is used to generate the table in the pop-up window. 
			Use tableSimpleTemplate to generate the tableTemplate. This is used to generate the table in the bottom of the Google Maps. 
		*/
		function setupTableTemplate(){
			if((!globalConfig.hasOwnProperty('queryLayerList')) && globalConfig.hasOwnProperty('identifyMultiplePolygonLayersServicesTemplate')) {
				globalConfig.queryLayerList = globalConfig.identifyMultiplePolygonLayersServicesTemplate.layerList;
				if (globalConfig.identifyMultiplePolygonLayersServicesTemplate.hasOwnProperty('merge')) {
					globalConfig.mergeFunction = globalConfig.identifyMultiplePolygonLayersServicesTemplate.merge;
				}
			} else {
				var getRequiredFields = function (tabs) {
					var getRequiredFieldsFromOneString = function (infoWindowString, fields){
						var start = infoWindowString.indexOf("{");
						var end = infoWindowString.indexOf("}");
						if ((start >= 0) && (end >= 0)) {
							var str1 = infoWindowString.substring(0, start);
							var str2 = infoWindowString.substring(start + 1, end);
							var str3 = infoWindowString.substring(end + 1);
							var funStart = str2.indexOf("(");
							var funEnd = str2.indexOf(")");
							if ((funStart >= 0) && (funEnd >= 0)) { //function
								var parameters = str2.substring(funStart + 1, funEnd);
								var paraArray = parameters.split(",");
								for (var j = 0; j < paraArray.length; j++) {
									fields.push((paraArray[j]).trim());
								}
							}else{
								fields.push(str2.trim());
							}
							infoWindowString = getRequiredFieldsFromOneString(str3, fields);
						}
						return fields;
					};
					var fields = [];
					for (var i = 0; i < tabs.length; i++) {
						var tab = tabs[i];
						fields = getRequiredFieldsFromOneString(tab.label, fields);
						fields = getRequiredFieldsFromOneString(tab.content, fields);
					}
					return fields.unique();
				};			
				for (var i=0; i<globalConfig.queryLayerList.length; i++) {
					var layerSetting = globalConfig.queryLayerList[i];	
					if ((!layerSetting.hasOwnProperty('tabsTemplate')) && layerSetting.hasOwnProperty('tabsTableTemplate')) {
						//console.log("should not");
						layerSetting.tabsTemplate = globalConfig.createTablesInfoWindows(layerSetting.tabsTableTemplate);		
					}
					var outFields = [];
					if(layerSetting.hasOwnProperty('tabsTemplate')) {
						//console.log(layerSetting.tabsTemplate);
						outFields = getRequiredFields(layerSetting.tabsTemplate);
					}
					if ((!layerSetting.hasOwnProperty('tableTemplate')) && layerSetting.hasOwnProperty('tableSimpleTemplate')) {
						layerSetting.tableTemplate = globalConfig.createTableBelowMap(layerSetting.tableSimpleTemplate);
						//console.log(layerSetting.tableTemplate);
						layerSetting.noCoordinatesTableTemplate = globalConfig.createNoCoordinatesTableBelowMap(layerSetting.tableSimpleTemplate);
						//console.log(layerSetting.noCoordinatesTableTemplate);
					}
					if(layerSetting.hasOwnProperty('tableTemplate')) {
						var outFields2 = getRequiredFields([{ label:globalConfig.InformationLang, content:layerSetting.tableTemplate.content}]); 
						if(outFields.length === 0) {
							outFields = outFields2.unique();
						} else {
							outFields = outFields.concat(outFields2).unique();
						}
					}
					globalConfig.queryLayerList[i].outFields = outFields;
				}
			}			
			/*
				If the tabsTemplate is not defined in the configuration, use the tabsTableTemplate item in the configuration to generate it.
				The tabsTemplate is an object array. Every element in this array is related to one tab in the popup window. Every element 
				has the following four properties: label, head, content, and tail. The label is the tab name. The head and the tail are only 
				repeat only once even if there are multiple results. The head is located in the beginning and the tail is located in the ending. 
				The content part will be repeated several times. The number of times is equal to the total number of records. 
				
				The tabsTableTemplate is an object array. Each element in this array contains two properties: label and content. The label is the 
				tab name and the content is an object array. The object array of content contains the objects with two properties: name and value. 
				The name property contains the field name in the table in the tab, while the value property contains the formule to calculate the value
				which will be displayed in the table. 
			
			if(!accessible){
				if(typeof(globalConfig.tabsTemplate) === "undefined"){
					var tabsTableTemplate = globalConfig.tabsTableTemplate;
					if(typeof(tabsTableTemplate) !== "undefined"){
						globalConfig.tabsTemplate = tabsTableTemplate.map(function(a) {
								return {label: a.label,
									head: "<table><tr><th>" + a.content.map(function(b) {return b.name;}).join("</th><th>") + "</th></tr>",
									content: "<tr><td>" + a.content.map(function(b) {return b.value;}).join("</td><td>") + "</td></tr>",
									tail: "</table>"};
						});
					}
				}
			}
			/*
				If the tableTemplate is not defined in the configuration, use the tableSimpleTemplate item in the configuration to generate it.
				The tableTemplate is an object with the following three properties: head, content, and tail. The head is the table head and the tail 
				is the table tail. Both of them only repeat once. The content part will be repeated several times. The number of times is equal to 
				the total number of records. 
				
				The tableSimpleTemplate is an object with two properties: title and content. The title is the content which will be displayed above the table
				and the content is an object array. The object array of content contains the objects with two properties: name and value. 
				The name property contains the field name in the table, while the value property contains the formule to calculate the value
				which will be displayed in the table. 
			
			if(typeof(globalConfig.tableTemplate) === "undefined"){			
				var tableSimpleTemplate = globalConfig.tableSimpleTemplate;
				if(typeof(tableSimpleTemplate) !== "undefined"){
					globalConfig.tableTemplate = {
						head: tableSimpleTemplate.title + "<table id=\"" + globalConfig.tableID + "\" class=\"" + globalConfig.tableClassName + "\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\"><thead><tr><th><center>" + tableSimpleTemplate.content.map(function(b) {return b.name;}).join("</center></th><th><center>") + "</center></th></tr></thead><tbody>",
						content: "<tr><td>" + tableSimpleTemplate.content.map(function(b) {return b.value;}).join('</td><td>') + "</td></tr>",
						tail: "</tbody></table>"
					};
				}
			}*/
		}
		
		/*
			Initialize the Google Maps and map services. 
		*/
		
		function init() {
		
			var map;
			if(typeof(globalConfig.preInitialize) !== "undefined"){
				globalConfig.preInitialize();
			}			
			if(typeof(globalConfig.selfDefinedInitialize)!== "undefined"){
				globalConfig.selfDefinedInitialize();
			}else{		
				setupTableTemplate();			
				if(!globalConfig.accessible){
					//var mapOptions = getInitialMapOptions();
					var mapOptions = {
						zoom: globalConfig.orgzoomLevel,
						center: new google.maps.LatLng(globalConfig.orgLatitude, globalConfig.orgLongitude),
						scaleControl: true,
						streetViewControl: true,
						mapTypeId: globalConfig.defaultMapTypeId
					};

					var extraImageService = globalConfig.extraImageService;
					if(extraImageService.visible){
						mapOptions.mapTypeControlOptions = {
							mapTypeIds: [extraImageService.id, google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE ,google.maps.MapTypeId.HYBRID ,google.maps.MapTypeId.TERRAIN ]
						};
					}				
					map = new google.maps.Map(document.getElementById(globalConfig.mapCanvasDivId), mapOptions);
					//setup extraImageService if there is one
					if(extraImageService.visible){
						var agsType = new gmaps.ags.MapType(extraImageService.url, {
							name: extraImageService.name
						});
						map.mapTypes.set(extraImageService.id, agsType);
					}
					//Create map service
					if(typeof(globalConfig.url)!== "undefined"){
						var mapService = new gmaps.ags.MapService(globalConfig.url);
						var agsLayer = new gmaps.ags.MapOverlay(mapService, {opacity: globalConfig.opacity});	
						agsLayer.setMap(map);
					}
					if(typeof(globalConfig.tileLayerService)!== "undefined"){
						var agsType = new gmaps.ags.MapType(globalConfig.tileLayerService.url,{name:globalConfig.tileLayerService.name, opacity:globalConfig.tileLayerService.opacity});
						map.overlayMapTypes.insertAt(0, agsType);					
					}
					MOEMAP.init(map);
					TOOLSLEGEND.init(map);
					globalConfig.updateCoordinates (globalConfig.orgLatitude, globalConfig.orgLongitude);
					//document.getElementById(globalConfig.coordinatesDivId).innerHTML = globalConfig.defaultCoordinateLang;
				}
				if (typeof globalConfig.searchControlHTML !== "undefined") {
					globalConfig.searchControlDivId = globalConfig.searchControlDivId || 'searchControl'; 
					if (globalConfig.testDivExist(globalConfig.searchControlDivId)) {
						document.getElementById(globalConfig.searchControlDivId).innerHTML = globalConfig.searchControlHTML;
					}
				}
				
				if (typeof globalConfig.otherInfoHTML !== "undefined") {
					globalConfig.otherInfoDivId = globalConfig.otherInfoDivId || 'otherInfo'; 
					if (globalConfig.testDivExist(globalConfig.otherInfoDivId)) {
						document.getElementById(globalConfig.otherInfoDivId).innerHTML = globalConfig.otherInfoHTML;
					}
				}
				if (typeof globalConfig.applicationTitle !== "undefined")  {
					globalConfig.applicationTitleDivId = globalConfig.applicationTitleDivId || 'applicationTitle'; 
					if (globalConfig.testDivExist(globalConfig.applicationTitleDivId)) {
						document.getElementById(globalConfig.applicationTitleDivId).innerHTML = globalConfig.applicationTitle;
					}
				}										
				/*if ((typeof(globalConfig.searchHelpTxt)!== "undefined") && globalConfig.testDivExist(globalConfig.informationDivId)){
					document.getElementById(globalConfig.informationDivId).innerHTML = globalConfig.searchHelpTxt;
				}*/
				if (globalConfig.testDivExist(globalConfig.searchTheMapDivId)) {
					document.getElementById(globalConfig.searchTheMapDivId).innerHTML = "<h2>" + globalConfig.SearchInteractiveMapLang + "</h2>";
				}
				if (globalConfig.testDivExist(globalConfig.searchHelpDivId)) {
					document.getElementById(globalConfig.searchHelpDivId).innerHTML = globalConfig.searchHelpTxt;
				}				
				if ((typeof(globalConfig.disclaimerLang)!== "undefined") && globalConfig.displayDisclaimer && globalConfig.testDivExist(globalConfig.disclaimerDivId)){
					document.getElementById(globalConfig.disclaimerDivId).innerHTML = globalConfig.disclaimerLang;
				}
			}
			if(typeof(globalConfig.postInitialize)!== "undefined"){
				globalConfig.postInitialize(map);
			}
		}
		
		var module = {
			init: init
		};
		return module;
	})();
	if (globalConfig.useSystemDefinedInit){
		window.onload = INITIALIZATION.init;
	}
	/*global document:false */
/*global google:false */
/*global window:false */
/*global TOOLSLEGEND:false */

	var globalConfig = globalConfig || {};
	/*globalConfig.selectTooltip is defined in LANGUAGE.js*/
	globalConfig.imageURL = "http://files.ontariogovernment.ca/moe_mapping/mapping/js/MOEMap/images/";
	globalConfig.legend = globalConfig.legend || {
		available: false,	
		url: globalConfig.imageURL + "legend.png", 
		size: {width: 270, height: 81},   //Width and Height
		location: {ratioX: 0.01, ratioY: 0.25}  //
	};
	globalConfig.pointBufferTool = globalConfig.pointBufferTool || {
		available: true,
		upIcon: globalConfig.imageURL + "Bptu.png",
		downIcon: globalConfig.imageURL + "Bptd.png",
		size: {width: 31, height: 31},   //Width and Height
		location: {ratioX: 0.12, ratioY: 0.98}  //
	};
	/*globalConfig.generateURLTool = globalConfig.generateURLTool || {
		available: true,
		upIcon: "http://10.60.13.84/Public/PTTW/generateURL.jpeg", 
		downIcon: "http://10.60.13.84/Public/PTTW/generateURL.jpeg",
		size: {width: 31, height: 31},   //Width and Height
		location: {ratioX: 0.18, ratioY: 0.98}  //
	};
	
	globalConfig.generateURL = globalConfig.generateURL || function(){
		var msg = "Generate URL";
		if (globalConfig.language === "FR"){
			msg = "French.";
		}
		return msg;
	};
	globalConfig.infomationDivId = globalConfig.infomationDivId || 'information';	
	globalConfig.generateURLMessage = globalConfig.generateURLMessage || function(url){
		var msg = "The generated URL is <a href=\"" + url + "\">" + url + "</a> and you can select it and paste it to emails and share it with friends.";
		if (globalConfig.language === "FR"){
			msg = "French.";
		}
		document.getElementById(globalConfig.infomationDivId).innerHTML = msg;
	};*/

TOOLSLEGEND = (function () {
	var pointBufferToolMarker, legendMarker;//, generateURLToolMarker;
	//var urlParametes = {};		
	var map;
	/*Change the Status of Buffer Tool. If the paramter is true, the Tool is slected. If it is flase, this Tool is unselected.*/
	function setPointBufferTool(isDownIcon){
		var pointBufferTool = globalConfig.pointBufferTool;
		var bounds = map.getBounds();
		var sw = bounds.getSouthWest();
		var ne = bounds.getNorthEast();
		var latDiff = ne.lat() - sw.lat();
		var lngDiff = ne.lng() - sw.lng();			
		var icon = "";
		if(isDownIcon){
			icon = pointBufferTool.downIcon;
		}else{
			icon = pointBufferTool.upIcon;
		}
		var newIcon = new google.maps.MarkerImage(icon, new google.maps.Size(pointBufferTool.size.width, pointBufferTool.size.height),
				new google.maps.Point(0, 0), new google.maps.Point(0, 0), new google.maps.Size(pointBufferTool.size.width, pointBufferTool.size.height));
		
		if(pointBufferToolMarker){
			pointBufferToolMarker.setMap(null);
		}
		pointBufferToolMarker = new google.maps.Marker({
			position: new google.maps.LatLng(sw.lat() + pointBufferTool.location.ratioY*latDiff, sw.lng() + pointBufferTool.location.ratioX*lngDiff),
			icon: newIcon,
			title: globalConfig.selectTooltip,
			map: map
		});
	}
	/*Test whether the Buffer Tool is selected or not*/
	function isPointBufferToolSelected(){
		var pointBufferTool = globalConfig.pointBufferTool;
		if(pointBufferToolMarker && (pointBufferToolMarker.icon.url === pointBufferTool.downIcon)){
			return true;
		}
		return false;
	}
	/*Setup the legend's location by using the configuration information.*/
	function setupLegend(sw, latDiff, lngDiff){
		var legend = globalConfig.legend;
		if(legend.available) {
			var gLatLng = new google.maps.LatLng(sw.lat() + legend.location.ratioY*latDiff, sw.lng() + legend.location.ratioX*lngDiff);
			if(legendMarker){
				legendMarker.setMap(null);
			}
			var icon = new google.maps.MarkerImage(legend.url, new google.maps.Size(legend.size.width, legend.size.height),
				new google.maps.Point(0, 0), new google.maps.Point(0, 0), new google.maps.Size(legend.size.width, legend.size.height));
			legendMarker = new google.maps.Marker({
				position: gLatLng,
				icon: icon,
				map: map
			});
		}	
	}
	/*Setup the Buffer Tool's location by using the configuration information.*/
	function setupPointBufferTool(){
		var pointBufferTool = globalConfig.pointBufferTool;
		if(typeof(pointBufferTool) !== "undefined") {
			if(pointBufferTool.available){
				setPointBufferTool(false);  //The buffer Tool is unselected. 
				var container = "";
				(function (container, pointBufferToolMarker) {
					google.maps.event.addListener(pointBufferToolMarker, 'click', function () {
						setPointBufferTool(true);   //The buffer Tool is selected. 
					});
				})(container, pointBufferToolMarker);				
			}
		}
	}
	/*Setup the Generate URL Tool's location by using the configuration information.*/
	/*function setupGenerateURLTool(sw, latDiff, lngDiff){
		var generateURLTool = globalConfig.generateURLTool;
		if(typeof(generateURLTool) !== "undefined") {
			if(generateURLTool.available){
				var gLatLng = new google.maps.LatLng(sw.lat() + generateURLTool.location.ratioY*latDiff, sw.lng() + generateURLTool.location.ratioX*lngDiff);
				if(generateURLToolMarker){
					generateURLToolMarker.setMap(null);
				}
				var icon = new google.maps.MarkerImage(generateURLTool.upIcon, new google.maps.Size(generateURLTool.size.width, generateURLTool.size.height),
					new google.maps.Point(0, 0), new google.maps.Point(0, 0), new google.maps.Size(generateURLTool.size.width, generateURLTool.size.height));
				generateURLToolMarker = new google.maps.Marker({
					position: gLatLng,
					icon: icon,
					title: globalConfig.generateURL(),
					map: map
				});

				var container = "";
				(function (container, generateURLToolMarker) {
					//Once the user clicks on the Generate URL Tool, this event handler will be called to generate the information and display it
					google.maps.event.addListener(generateURLToolMarker, 'click', function () {
						var str = window.location.href;
						var end = str.indexOf("?");
						if( end > 0){
							str = str.substring(0, end);
						}
						var lat = map.getCenter().lat().toFixed(4);
						var lng = map.getCenter().lng().toFixed(4);						
						str = str + "?lev=" + map.getZoom() + "&lat=" + lat + "&lng=" + lng;
						if((typeof(urlParametes.location) !== "undefined") && (typeof(urlParametes.radius) !== "undefined")){
							urlParametes.radius = urlParametes.radius * 1.0;
							str = str +  "&" + globalConfig.locationURLParaName + "=" + urlParametes.location + "&" + globalConfig.radiusURLParaName + "=" + urlParametes.radius.toFixed(3);
						}
						if((typeof(urlParametes.field) !== "undefined") && (typeof(urlParametes.value) !== "undefined") && (typeof(urlParametes.fuzzy) !== "undefined")){
							var fuz = 0;
							if(urlParametes.fuzzy){
								fuz = 1;
							}
							str = str +  "&" + globalConfig.fieldURLParaName + "=" + urlParametes.field + "&" + globalConfig.valueURLParaName + "=" + urlParametes.value  + "&" + globalConfig.fuzzyURLParaName + "=" + fuz;
						}
						globalConfig.generateURLMessage(str);
					});
				})(container, generateURLToolMarker);
			}
		}		
	}*/
	/*If the maps bound changes, this function will be called to adjust the positions of Legend, Buffer Tool, and URL Generator Tools.*/
	function boundsChangedHandler(){
		var bounds = map.getBounds();
		var sw = bounds.getSouthWest();
		var ne = bounds.getNorthEast();
		var latDiff = ne.lat() - sw.lat();
		var lngDiff = ne.lng() - sw.lng();
		setupLegend(sw, latDiff, lngDiff);
		setupPointBufferTool();
		//setupGenerateURLTool(sw, latDiff, lngDiff);
	}
	
	/*set up the Google Maps object!*/
	function init(theMap){
		map = theMap;
		google.maps.event.addListener(map, 'bounds_changed', boundsChangedHandler);
	}
	
	/*Update parameters which will be used to generate URL.*/
	/*function updateURLParameter (newURLParametes){
		urlParametes = newURLParametes;
	}
	*/
	var module = {
		init: init,
		//updateURLParameter: updateURLParameter,
		isPointBufferToolSelected: isPointBufferToolSelected,
		setPointBufferTool: setPointBufferTool//,
		//boundsChangedHandler: boundsChangedHandler
	};
	return module;
})();
/*global document:false */
/*global goog:false */
/*global MOEMAP:false */
/*global google:false */
/*global INITIALIZATION:false */
/*global TOOLSLEGEND:false */
/*global gmaps:false */
/*global TABS_CALCULATOR:false */
/*global LOCATOR:false */
/*global window:false */
 
var globalConfig = globalConfig || {};
globalConfig.drawingCircleMessage = globalConfig.drawingCircleMessage || function(lat, lng, radius){
	document.getElementById(globalConfig.informationDivId).innerHTML = globalConfig.searchCenterLang + " (latitude:" + lat.toFixed(6) + ", longitude:" + lng.toFixed(6) + "), " + globalConfig.searchRadiusLang + " (" + radius.toFixed(2) + " " + globalConfig.searchKMLang + ")";
};
globalConfig.totalFeatureReturned = globalConfig.totalFeatureReturned || function(count){
	return globalConfig.totalFeatureReturnedLang + ": <strong>" + count + "</strong>";
};
globalConfig.totalFeatureReturnedOnlyOneDisplayed = globalConfig.totalFeatureReturnedOnlyOneDisplayed || function(count){
	return globalConfig.totalFeatureReturnedLang + ": <strong>" + count + "</strong>" + globalConfig.only1DisplayedLang;
};
globalConfig.maxQueryReturn = globalConfig.maxQueryReturn || 500;	
globalConfig.resultFound = globalConfig.resultFound || function(validCount, totalCount){
	var queryParams = {totalCount: totalCount};
	globalConfig.resultFoundSimple (queryParams);
};
globalConfig.resultFoundSimple = globalConfig.resultFoundSimple || function(queryParams){
	var searchString = queryParams.searchString;
	var totalCount = queryParams.totalCount;
	var regionName = "";
	if (typeof(queryParams.withinExtent) !== "undefined") {
		regionName = " " + (queryParams.withinExtent ? globalConfig.inCurrentMapExtentLang : globalConfig.inGobalRegionLang);
	}
	var searchString = " ";
	if (typeof(queryParams.searchString) !== "undefined") {
		searchString = " " + globalConfig.forLang + " <strong>"  + queryParams.searchString + "</strong> ";
	}
	
	var message = "";
	if (queryParams.hasOwnProperty("invalidCount") && (queryParams.invalidCount > 0)) {
		var invalidResultMsg = (queryParams.invalidCount === 1) ? globalConfig.ResultDoesNotHaveValidCoordinates : globalConfig.ResultsDoNotHaveValidCoordinates;
		
		if(totalCount === 0){
			message = globalConfig.yourSearchLang + searchString + globalConfig.returnedNoResultLang + regionName + ". " + globalConfig.pleaseRefineSearchLang + ".";
		} else if(totalCount === 1){
			message = globalConfig.oneResultFoundLang  + searchString + regionName + "." + globalConfig.ThisResultDoesNotHaveValidCoordinates;
		} else if(totalCount >= globalConfig.maxQueryReturn){
			message = globalConfig.moreThanLang + " " + globalConfig.maxQueryReturn + " " + globalConfig.resultsFoundLang + searchString + regionName + ". " + globalConfig.onlyLang + " " + globalConfig.maxQueryReturn + " " + globalConfig.returnedLang + ". " + globalConfig.seeHelpLang + "." + globalConfig.AmongReturnedResults + ", " + queryParams.invalidCount + invalidResultMsg;
		} else {
			message = totalCount + " " + globalConfig.resultsFoundLang + searchString + regionName + ". " + globalConfig.AmongReturnedResults + ", " + queryParams.invalidCount + invalidResultMsg;
		}	
	} else {
		if(totalCount === 0){
			message = globalConfig.yourSearchLang + searchString + globalConfig.returnedNoResultLang + regionName + ". " + globalConfig.pleaseRefineSearchLang + ".";
		} else if(totalCount === 1){
			message = globalConfig.oneResultFoundLang  + searchString + regionName + ".";
		} else if(totalCount >= globalConfig.maxQueryReturn){
			message = globalConfig.moreThanLang + " " + globalConfig.maxQueryReturn + " " + globalConfig.resultsFoundLang + searchString + regionName + ". " + globalConfig.onlyLang + " " + globalConfig.maxQueryReturn + " " + globalConfig.returnedLang + ". " + globalConfig.seeHelpLang + ".";
		} else {
			message = totalCount + " " + globalConfig.resultsFoundLang + searchString + regionName + ".";
		}
	}
	document.getElementById(globalConfig.informationDivId).innerHTML ="<i>" + message + "</i>";
};	
globalConfig.noResultFound = globalConfig.noResultFound || function(){
	document.getElementById(globalConfig.informationDivId).innerHTML ="<i>" + globalConfig.noResultFoundMsg + "</i>";	
};
globalConfig.searchInProgress = globalConfig.searchInProgress || function(){
	document.getElementById(globalConfig.informationDivId).innerHTML = "<i>" + globalConfig.searchingLang + "</i>";
};
globalConfig.maxQueryZoomLevel = globalConfig.maxQueryZoomLevel || 17;
globalConfig.maxQueryZoomLevelTWPSearch = globalConfig.maxQueryZoomLevelTWPSearch || 11;  //Zoom Level for Township search
globalConfig.maxQueryZoomLevelTWPLotConSearch = globalConfig.maxQueryZoomLevelTWPLotConSearch || 14;	// Zoom Level for Township with Lot and Concession search
globalConfig.queryTableDivId = globalConfig.queryTableDivId || 'query_table';
//globalConfig.queryTableTemplateDivId = globalConfig.queryTableTemplateDivId || 'QueryTableTemplate';

if (typeof globalConfig.usejQueryUITable === "undefined"){
	globalConfig.usejQueryUITable = true;   //whether want to use the predefined multiple tab supports. If it is false, it will only support one tab. 
}
if(globalConfig.usejQueryUITable && (!globalConfig.accessible) && (!!yepnope)){	
	yepnope({
		load: "http://files.ontario.ca/moe_mapping/mapping/js/MOEMap/css/jquery.dataTables.css", 
		callback: function () {
			//console.log("multipletabs.css loaded!");
		}
	});
	
	yepnope({
		load: "http://files.ontario.ca/moe_mapping/mapping/js/MOEMap/js/jquery.dataTables.js", 
		callback: function () {
			//console.log("closure-library-multipletabs-min.js loaded!");
		}
	});
}
//globalConfig.supportTableDownload = globalConfig.supportTableDownload || true;	

//whether want to use the predefined multiple tab supports. If it is false, it will only support one tab. 
if (typeof globalConfig.usePredefinedMultipleTabs === "undefined"){
	globalConfig.usePredefinedMultipleTabs = true;
}
if(globalConfig.usePredefinedMultipleTabs && (!globalConfig.accessible) && (!!yepnope)){	
		yepnope({
			load: "http://files.ontario.ca/moe_mapping/mapping/js/MOEMap/css/multipletabs.css", 
			callback: function () {
				//console.log("multipletabs.css loaded!");
			}
		});
		
		yepnope({
			load: "http://files.ontario.ca/moe_mapping/mapping/js/MOEMap/js/closure-library-multipletabs-min.js", 
			callback: function () {
				//console.log("closure-library-multipletabs-min.js loaded!");
			}
		});
		/*
		goog.require('goog.dom');
		goog.require('goog.ui.Tab');
		goog.require('goog.ui.TabBar');
		*/
}
globalConfig.searchedLocationIcon = globalConfig.searchedLocationIcon || "http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png";
globalConfig.twpBoundary = globalConfig.twpBoundary || {
	color: '#8583f3',
	opacity: 1, 
	weight: 4
};
globalConfig.pointBuffer = globalConfig.pointBuffer || {
	color: "#FF0000",
	opacity: 1,
	weight: 2
};
globalConfig.identifyMarkerRedTearDrop = globalConfig.identifyMarkerRedTearDrop || false;

globalConfig.identifyRadiusZoomLevelList = globalConfig.identifyRadiusZoomLevelList || {
	21 : 0.001,
	20 : 0.001,
	19 : 0.002,
	18 : 0.003,
	17 : 0.005,
	16 : 0.01,
	15 : 0.02,
	14 : 0.05,
	13 : 0.08,
	12 : 0.16,
	11 : 0.3,
	10 : 0.6,
	9  : 1.2,
	8  : 2.4,
	7  : 4.8,
	6  : 9.6,
	5  : 20,
	4  : 40,
	3  : 80,
	2  : 160,
	1  : 320
};

/*
	queryParams contains gLatLng, map, preQueryCallback (globalConfig.preIdentifyCallback), 
	postQueryCallback (globalConfig.postIdentifyCallback), layerList, currentLayerId as its properties. 
*/
globalConfig.preIdentifyCallbackName = globalConfig.preIdentifyCallbackName || "Wells";
globalConfig.preIdentifyCallbackList = globalConfig.preIdentifyCallbackList || {
	"Wells": function (queryParams) {
		var radius = globalConfig.identifyRadiusZoomLevelList[queryParams.map.getZoom()];
		var layerSetting = queryParams.layerList[queryParams.currentLayerId];
		var circle = globalConfig.calculateCirclePolyline(queryParams.gLatLng, radius*1000);	
		var params = {
			returnGeometry: false,
			outFields: layerSetting.outFields,
			geometry: new google.maps.Polygon({
				paths: circle.getPath()
			}),
			geometryType: 'esriGeometryPolygon'
		};
		return params;
	},
	"SWPLocator": function (queryParams) {
		/*if (globalConfig.identifyMultiplePolygonLayersServicesTemplate.hasOwnProperty('displayResultBelowMap') && (globalConfig.identifyMultiplePolygonLayersServicesTemplate.displayResultBelowMap)) {
			globalConfig.identifyResults = {};
		}*/
		var layerSetting = queryParams.layerList[queryParams.currentLayerId];
		var params = {
			returnGeometry: layerSetting.hasOwnProperty('returnGeometry') ? layerSetting.returnGeometry : false,
			geometryType: 'esriGeometryPoint',
			geometry: queryParams.gLatLng,				
			outFields: layerSetting.returnFields
		};			
		return params;
	}	
};
globalConfig.preIdentifyCallback = globalConfig.preIdentifyCallback || globalConfig.preIdentifyCallbackList[globalConfig.preIdentifyCallbackName];

globalConfig.createControllableInfoWindowContent = function (content) {
	var container = document.createElement('div');
	container.style.width = globalConfig.infoWindowWidth;
	if (globalConfig.hasOwnProperty('infoWindowHeight')){ 
		container.style.height = globalConfig.infoWindowHeight;
	}
	container.innerHTML = content;
	return container;
};
globalConfig.postIdentifyCallbackName = globalConfig.postIdentifyCallbackName || "Wells";
globalConfig.postIdentifyCallbackList = globalConfig.postIdentifyCallbackList || {
	"Wells": function (queryParams) {
		var features = Array.range(0, queryParams.layerList.length - 1).reduce(function(previousValue, currentValue) {
			var result = queryParams.layerList[currentValue].result;
			if (result.hasOwnProperty('features')) {
				return previousValue.concat(result.features);
			} else {
				return previousValue;
			}
		}, []);
		if(features.length === 0) {
			return;
		}
		var container = globalConfig.calculateMulitpleTabsOneFeature(features, queryParams.layerList[0].tabsTemplate);
		MOEMAP.openInfoWindow(queryParams.gLatLng, container);
	},
	"SportFish": function (queryParams) {
		//console.log("In Identify");
		var features = Array.range(0, queryParams.layerList.length - 1).reduce(function(previousValue, currentValue) {
			var result = queryParams.layerList[currentValue].result;
			if (result.hasOwnProperty('features')) {
				return previousValue.concat(result.features);
			} else {
				return previousValue;
			}
		}, []);
		if(features.length === 0) {
			return;
		}
		var tableTemplate = queryParams.layerList[0].tabsTemplate;
		var calculateContents = TABS_CALCULATOR.getContent(features[0].attributes, tableTemplate);
		var container = globalConfig.createControllableInfoWindowContent(calculateContents[0].content);
		MOEMAP.openInfoWindow(queryParams.gLatLng, container);
	},
	"SWPLocatorReverseGeocoding": function (queryParams) {
		if (globalConfig.avoidReverseGeocoding) {
			globalConfig.avoidReverseGeocoding = false;
			globalConfig.postIdentifyCallbackList["SWPLocator"](queryParams);
		} else {
			var geocoder = new google.maps.Geocoder();
			var latlng = queryParams.gLatLng;
			geocoder.geocode({
				'address': latlng.lat() + ',' + latlng.lng()
			}, function (results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					globalConfig.returnedAddress = results[0].formatted_address.toString();
					globalConfig.postIdentifyCallbackList["SWPLocator"](queryParams);
				} else {
					alert("Geocode was not successful for the following reason: " + status);
				}
			});
		}
	},
	"SWPLocator": function (queryParams) {
		MOEMAP.clearOverlays();	
		var layerList = queryParams.layerList;
		var container = "";
		if (queryParams.hasOwnProperty('mergeFunction')) {
			container = queryParams.mergeFunction(queryParams.gLatLng);
		} else {
			container = Array.range(0, layerList.length - 1).map(function (i) {
				var features = layerList[i]["result"].features;
				if (features.length > 0) {
					return Array.range(0, features.length - 1).map(function (j) {
						return layerList[i].callback(features[j].attributes) + "<br>";
					}).join("");
				} else {
					return "";
				}			
			}).join("");
		}
		var identifyMarker = globalConfig.identifyMarkerRedTearDrop ? (new google.maps.Marker({
				position: queryParams.gLatLng,
				draggable: true
			})) : (new google.maps.Marker({
				position: queryParams.gLatLng,
				icon: globalConfig.searchedLocationIcon,				
				draggable: true
			}));
		MOEMAP.addOverlay(identifyMarker);
		/*
		if (globalConfig.identifyMultiplePolygonLayersServicesTemplate.hasOwnProperty('displayResultBelowMap') && (globalConfig.identifyMultiplePolygonLayersServicesTemplate.displayResultBelowMap)) {
			globalConfig.identifyResults["LatLng"] = queryParams.gLatLng;
			globalConfig.identifyResults["UTM"] = globalConfig.convertLatLngtoUTM(queryParams.gLatLng.lat(), queryParams.gLatLng.lng());		
			//var template = document.getElementById(globalConfig.queryTableTemplateDivId).innerHTML;
			document.getElementById(globalConfig.queryTableDivId).innerHTML = _.template(globalConfig.identifyMultiplePolygonLayersServicesTemplate.queryTableTemplate, globalConfig.identifyResults);
			//console.log(container);
			container = _.template(globalConfig.identifyMultiplePolygonLayersServicesTemplate.popupTemplate, globalConfig.identifyResults);
		}*/ //else {
		container = globalConfig.createControllableInfoWindowContent(container);
		MOEMAP.openInfoWindow(queryParams.gLatLng, container);	
		(function (container, identifyMarker) {
			google.maps.event.addListener(identifyMarker, 'click', function () {
				MOEMAP.openInfoWindow(identifyMarker.getPosition(), container);
			});
		})(container, identifyMarker);
		//}
		google.maps.event.addListener(identifyMarker, 'dragend', function () {
			MOEMAP.clearOverlays();
			if(document.getElementById(globalConfig.searchInputBoxDivId)){
				document.getElementById(globalConfig.searchInputBoxDivId).value="";
				document.getElementById(globalConfig.searchInputBoxDivId).focus();
			}
			if(document.getElementById(globalConfig.queryTableDivId)){
				document.getElementById(globalConfig.queryTableDivId).innerHTML = "";
			}
			var geocoder = new google.maps.Geocoder();
			var latlng = identifyMarker.getPosition();
			queryParams.map.setCenter (latlng);
			geocoder.geocode({
				'address': latlng.lat() + ',' + latlng.lng()
			}, function (results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					globalConfig.returnedAddress = results[0].formatted_address.toString();
					MOEMAP.mouseClickHandler({latLng: latlng});
				} else {
					alert("Geocode was not successful for the following reason: " + status);
				}
			});					

		});
		
		for (var i = 0; i<layerList.length; i++) {
			if (layerList[i].hasOwnProperty('displayPolygon') && (layerList[i].displayPolygon)) {
				var features = layerList[i]["result"].features;
				for (var j=0; j<features.length; j++) {
					var geometryPoly = features[j].geometry[0];
					geometryPoly.setOptions(layerList[i].style);
					MOEMAP.addOverlay(geometryPoly);	
				}
			}
		}
		//console.log(container.innerHTML);
		if (globalConfig.testDivExist(globalConfig.queryTableDivId)) {
			document.getElementById(globalConfig.queryTableDivId).innerHTML = "<br>" + container.innerHTML;
		}
		/*
		if (globalConfig.identifyMultiplePolygonLayersServicesTemplate.hasOwnProperty('success')) {
			globalConfig.identifyMultiplePolygonLayersServicesTemplate.success();
		}*/
		/*
		if ((typeof(globalConfig.searchHelpTxt)!== "undefined") && globalConfig.testDivExist(globalConfig.informationDivId)){
			document.getElementById(globalConfig.informationDivId).innerHTML = globalConfig.searchHelpTxt;
		}*/		
	}
};
globalConfig.postIdentifyCallback = globalConfig.postIdentifyCallback || globalConfig.postIdentifyCallbackList[globalConfig.postIdentifyCallbackName];

/*
	queryParams contains gLatLng, radius, map, preQueryCallback (globalConfig.preBufferCallback), 
	postQueryCallback (globalConfig.postBufferCallback), layerList, currentLayerId as its properties. 
*/
globalConfig.preBufferCallbackName = globalConfig.preBufferCallbackName || "Wells";
globalConfig.preBufferCallbackList = globalConfig.preBufferCallbackList || {
	"Wells": function (queryParams) {
		var radius = queryParams.radius;
		var marker = globalConfig.createMarker(queryParams.gLatLng, "" + queryParams.gLatLng.lat().toFixed(5) + ", " + queryParams.gLatLng.lng().toFixed(5), globalConfig.searchedLocationIcon);
		MOEMAP.addOverlay(marker);
		
		var layerSetting = queryParams.layerList[queryParams.currentLayerId];
		var circle = globalConfig.calculateCirclePolyline(queryParams.gLatLng, radius*1000);
		var bounds = globalConfig.calculatePolylineBounds(circle);
		globalConfig.setMapBound(queryParams.map,bounds);
		MOEMAP.addOverlay(circle);
		var params = {
			returnGeometry: true, 
			outFields: layerSetting.outFields,
			geometry: new google.maps.Polygon({
				paths: circle.getPath()
			}),
			geometryType: 'esriGeometryPolygon'
		};
		
		if (queryParams.hasOwnProperty('where')) {
			params.where = queryParams.where;
		}
		return params;
	}
};
globalConfig.preBufferCallback = globalConfig.preBufferCallback || globalConfig.preBufferCallbackList[globalConfig.preBufferCallbackName];

globalConfig.postBufferCallbackName = globalConfig.postBufferCallbackName || "Wells";
globalConfig.postBufferCallbackList = globalConfig.postBufferCallbackList || {
	"Wells": function (queryParams) {
		var features = Array.range(0, queryParams.layerList.length - 1).reduce(function(previousValue, currentValue) {
			var result = queryParams.layerList[currentValue].result;
			if (result.hasOwnProperty('features')) {
				return previousValue.concat(result.features);
			} else {
				return previousValue;
			}
		}, []);
		if(features.length === 0) {
			queryParams.totalCount = 0;
			globalConfig.resultFoundSimple(queryParams);				
			return;
		}
		globalConfig.addMarkers(features, queryParams.layerList[0].tabsTemplate);
		var templates = {
			"coordinatesTable": queryParams.layerList[0].tableTemplate,
			"noCoordinatesTable": queryParams.layerList[0].noCoordinatesTableTemplate
		};
		//globalConfig.renderTable(features, queryParams.layerList[0].tableTemplate, queryParams.gLatLng);
		globalConfig.renderTable(features, templates, queryParams.gLatLng);
		queryParams.totalCount = features.length;
		globalConfig.resultFoundSimple(queryParams);		
	}
};
globalConfig.postBufferCallback = globalConfig.postBufferCallback || globalConfig.postBufferCallbackList[globalConfig.postBufferCallbackName];

globalConfig.addMarkers = globalConfig.addMarkers || function(features, tabsTemplate) {
	var pointClusters = globalConfig.calculateClusters(features);
	for (var x = 0; x < pointClusters.length; x++) {
		var gLatLng = pointClusters[x].gLatLng;
		var container = globalConfig.calculateMulitpleTabsOneFeature(pointClusters[x].list, tabsTemplate);
		var marker = new google.maps.Marker({
			position: gLatLng
		});		
		(function (container, marker) {
			google.maps.event.addListener(marker, 'click', function () {
				MOEMAP.openInfoWindow(marker.getPosition(), container);
			});
		})(container, marker);
		MOEMAP.addOverlay(marker);
	}
};

globalConfig.addMarkersSimple = globalConfig.addMarkersSimple || function(features, tabsTemplate) {
	for (var x = 0; x < features.length; x++) {
		var gLatLng = features[x].geometry[0].getPosition();
		var calculateContents = TABS_CALCULATOR.getContent(features[x].attributes, tabsTemplate);
		//var container = calculateContents[0].content;
		var container = globalConfig.createControllableInfoWindowContent(calculateContents[0].content);
		var marker = new google.maps.Marker({
			position: gLatLng
		});		
		(function (container, marker) {
			google.maps.event.addListener(marker, 'click', function () {
				MOEMAP.openInfoWindow(marker.getPosition(), container);
			});
		})(container, marker);
		MOEMAP.addOverlay(marker);
	}
};

globalConfig.renderTable = function(features, templates, searchCenter){
	var tableTemplate = templates.coordinatesTable;
	var noCoordinatesTableTemplate = templates.noCoordinatesTable;
	var featuresValidCoors = features.filter(globalConfig.validFeaturesFilter);
	var featuresInvalidCoors = features.filter(function (feature) {
		return  !globalConfig.validFeaturesFilter(feature);
	});
	var tableHead = tableTemplate.head;
	//console.log(tableHead);
	var requireDistanceField = (typeof(searchCenter) !== "undefined");
	if(requireDistanceField) {
		var resArrays = tableTemplate.head.split("<table");
		if(resArrays.length === 2){
			tableHead = resArrays[0] + globalConfig.distanceFieldNote + "<table" + resArrays[1];
		}
		var resArrays = tableHead.split("</tr>");
		if(resArrays.length === 2){
			tableHead = resArrays[0] + "<th><center>" + globalConfig.distanceLang + "</center></th></tr>" + resArrays[1];
		}
		//console.log(tableHead);
	}
	var getTableContent = function(features, requireDistanceField, tableTemplateContent){
		var table = "";
		var size = features.length;
		for (var x = 0; x < size; x++) {
			var findResult = features[x];
			var calculateContents = TABS_CALCULATOR.getContent(findResult.attributes, [{ label:globalConfig.InformationLang, content:tableTemplateContent}]);
			var str = calculateContents[0].content;
			var gLatLng = findResult.geometry[0].getPosition();
			if(requireDistanceField) {
				var resArrays = str.split("</tr>");
				str = resArrays[0] + "<td>" + (google.maps.geometry.spherical.computeDistanceBetween(gLatLng, searchCenter)/1000).toFixed(2)  + "</td></tr>" ;
			}
			table = table + str;
		}
		return table;
	};
	//var table = tableHead + getTableContent(features) + tableTemplate.tail + "<br><br><br>";
	var table = (featuresValidCoors.length === 0) ? "" : (tableHead + getTableContent(featuresValidCoors, requireDistanceField, tableTemplate.content) + tableTemplate.tail + "<br><br><br>");
	table = table + ((featuresInvalidCoors.length === 0) ? "" : (noCoordinatesTableTemplate.head + getTableContent(featuresInvalidCoors, false, noCoordinatesTableTemplate.content) + noCoordinatesTableTemplate.tail + "<br><br><br>" + globalConfig.whyAmISeeingThisLang));
	document.getElementById(globalConfig.queryTableDivId).innerHTML = table;
	var tableID = globalConfig.tableID;
	if(globalConfig.usejQueryUITable){
		var dataTableOptions = {
			"bJQueryUI": true,
			"sPaginationType": "full_numbers" 
			};
		if (globalConfig.language !== "EN") {
			dataTableOptions["oLanguage"] = globalConfig.dataTableLang;
		}
		/*
		if ((globalConfig.supportTableDownload) && (!$.browser.msie)) {
			dataTableOptions["sDom"] = 'T<"clear">lfrtip';
			dataTableOptions["oTableTools"] = {
					"sSwfPath": "http://files.ontario.ca/moe_mapping/mapping/js/MOEMap/js/TableTools-2.1.4/media/swf/copy_csv_xls.swf",
					"aButtons": ["xls"]
				};
		}*/
		if(requireDistanceField) {
			var fields = tableHead.split("</th><th>");
			dataTableOptions["aaSorting"] = [[ fields.length-1, "asc" ]];
		}
		$('#' + tableID).dataTable(dataTableOptions);
		$('#' + globalConfig.noCoordinatesTableID).dataTable(dataTableOptions);
	}
};
	
/*
	queryParams contains map, preQueryCallback (globalConfig.preConditionsCallback), 
	postQueryCallback (globalConfig.postConditionsCallback), layerList, currentLayerId
	searchString, where, withinExtent, requireGeocode as its properties. 
*/
globalConfig.preConditionsCallbackName = globalConfig.preConditionsCallbackName || "Wells";
globalConfig.preConditionsCallbackList = globalConfig.preConditionsCallbackList || {
	"Wells": function (queryParams) {
		var layerSetting = queryParams.layerList[queryParams.currentLayerId];
		var params = {
			returnGeometry: (globalConfig.accessible) ? false : true, 
			outFields: layerSetting.outFields,
			where: queryParams.where		
		};
		if(queryParams.withinExtent) {
			var getCurrentMapExtent = function(map) {
				var currentBounds = map.getBounds();
				var swLatLng = currentBounds.getSouthWest();
				var neLatLng = currentBounds.getNorthEast();
				var seLatLng = new google.maps.LatLng(swLatLng.lat(), neLatLng.lng());
				var nwLatLng = new google.maps.LatLng(neLatLng.lat(), swLatLng.lng());
				return new google.maps.Polygon({
					paths: [swLatLng, seLatLng, neLatLng, nwLatLng, swLatLng]
				});	
			};
			params.geometry = getCurrentMapExtent(queryParams.map);
		}
		return params;
	}
};
globalConfig.preConditionsCallback = globalConfig.preConditionsCallback || globalConfig.preConditionsCallbackList[globalConfig.preConditionsCallbackName];
globalConfig.validFeaturesFilter = globalConfig.validFeaturesFilter || function(feature) {
	var p = feature.geometry[0].position;
	return (p.lat() > 0.0001 && p.lng() < 0.0001);
};
globalConfig.postConditionsCallbackName = globalConfig.postConditionsCallbackName || "Wells";
//console.log(globalConfig.postConditionsCallbackName);
globalConfig.postConditionsCallbackList = globalConfig.postConditionsCallbackList || {
	"Wells": function (queryParams) {
		//console.log("Wells inside");
		var features = Array.range(0, queryParams.layerList.length - 1).reduce(function(previousValue, currentValue) {
			var result = queryParams.layerList[currentValue].result;
			if (result.hasOwnProperty('features')) {
				return previousValue.concat(result.features);
			} else {
				return previousValue;
			}
		}, []);
		if(features.length === 0) {
			queryParams.totalCount = 0;
			globalConfig.resultFoundSimple(queryParams);		
			if(queryParams.requireGeocode) {
				MOEMAP.geocodeAddress(queryParams);		
			}		
			return;
		}
		var featuresValidCoors = features.filter(globalConfig.validFeaturesFilter);
		var featuresInvalidCoors = features.filter(function (feature) {
			return  !globalConfig.validFeaturesFilter(feature);
		});
		queryParams.totalCount = features.length;
		queryParams.validCount = featuresValidCoors.length;
		queryParams.invalidCount = featuresInvalidCoors.length;
		globalConfig.resultFoundSimple(queryParams);		
		//console.log(featuresValidCoors);
		if((!queryParams.withinExtent) && (featuresValidCoors.length > 0)) {	
			//var bounds = globalConfig.calculatePointsBounds(features);
			var bounds = globalConfig.calculatePointsBounds(featuresValidCoors);
			globalConfig.setMapBound(queryParams.map,bounds);	
		}
		if (globalConfig.usePredefinedMultipleTabs) {
			//globalConfig.addMarkers(features,queryParams.layerList[0].tabsTemplate);
			globalConfig.addMarkers(featuresValidCoors,queryParams.layerList[0].tabsTemplate);
			//globalConfig.addMarkers(featuresValidCoors,queryParams.layerList[0].tabsTemplate);
		} else {
			globalConfig.addMarkersSimple(featuresValidCoors, queryParams.layerList[0].tabsTemplate);
		}
		if (queryParams.layerList[0].hasOwnProperty('tableTemplate')){
			var templates = {
				"coordinatesTable": queryParams.layerList[0].tableTemplate,
				"noCoordinatesTable": queryParams.layerList[0].noCoordinatesTableTemplate
			};
			//console.log(templates);
			//globalConfig.renderTable(features,queryParams.layerList[0].tableTemplate);
			globalConfig.renderTable(features,templates);
		}
	},
	"AccessibleWells": function (queryParams) {
		//console.log("AccessibleWells inside");
		var features = Array.range(0, queryParams.layerList.length - 1).reduce(function(previousValue, currentValue) {
			var result = queryParams.layerList[currentValue].result;
			if (result.hasOwnProperty('features')) {
				return previousValue.concat(result.features);
			} else {
				return previousValue;
			}
		}, []);
		queryParams.totalCount = features.length;
		globalConfig.resultFoundSimple(queryParams);		
		if(features.length === 0) {
			return;
		}
		var tableTemplate = queryParams.layerList[0].tableTemplate;
		var table = tableTemplate.head + Array.range(0, features.length - 1).reduce(function(previousValue, currentValue) {
			var calculateContents = TABS_CALCULATOR.getContent(features[currentValue].attributes, [{ label:globalConfig.InformationLang, content:tableTemplate.content}]);
			var str = calculateContents[0].content;
			if(currentValue%2 === 1) {
				str = globalConfig.replaceChar(str, "<td>", "<td  class='shaded'>");
			} 
			return previousValue + str;
		}, "") + tableTemplate.tail;
		document.getElementById(globalConfig.queryTableDivId).innerHTML = table;
	},
	"SportFish": function (queryParams) {
		//console.log("In Search");
		//console.log("SportFish inside");
		var features = Array.range(0, queryParams.layerList.length - 1).reduce(function(previousValue, currentValue) {
			var result = queryParams.layerList[currentValue].result;
			if (result.hasOwnProperty('features')) {
				return previousValue.concat(result.features);
			} else {
				return previousValue;
			}
		}, []);
		if(features.length === 0) {
			if(queryParams.requireGeocode) {
				MOEMAP.geocodeAddress(queryParams);		
			} else {
				queryParams.totalCount = 0;
				globalConfig.resultFoundSimple(queryParams);							
			}
			return;
		}
		queryParams.totalCount = features.length;
		globalConfig.resultFoundSimple(queryParams);				
		if(!queryParams.withinExtent) {	
			var bounds = globalConfig.calculatePointsBounds(features);
			globalConfig.setMapBound(queryParams.map,bounds);	
		}
		globalConfig.addMarkersSimple(features, queryParams.layerList[0].tabsTemplate);
	}	
};
globalConfig.postConditionsCallback = globalConfig.postConditionsCallback || globalConfig.postConditionsCallbackList[globalConfig.postConditionsCallbackName];

globalConfig.addressGeocodingCallbackName = globalConfig.addressGeocodingCallbackName || "Wells";
globalConfig.addressGeocodingCallbackList = globalConfig.addressGeocodingCallbackList || {
	"Wells": function (queryParams) {
		var withinExtent = queryParams.hasOwnProperty('withinExtent') ? queryParams.withinExtent : false;
		var map = queryParams.map;
		if (withinExtent && (!queryParams.map.getBounds().contains(queryParams.gLatLng))) {
			queryParams.totalCount = 0;
			globalConfig.resultFoundSimple(queryParams);
			return;
		}
		if (queryParams.hasOwnProperty('polylines')) {
			MOEMAP.addPolylinesToMap(queryParams.polylines);
		}
		var marker = globalConfig.createMarker(queryParams.gLatLng, queryParams.searchString, globalConfig.searchedLocationIcon);
		MOEMAP.addOverlay(marker);
		if (!withinExtent) {
			queryParams.map.setCenter(queryParams.gLatLng);
			if (queryParams.hasOwnProperty('zoomlevel')) {
				queryParams.map.setZoom(queryParams.zoomlevel);
			} else {
				if (queryParams.map.getZoom() <= globalConfig.maxQueryZoomLevel) {
					queryParams.map.setZoom(globalConfig.maxQueryZoomLevel);
				}
			}
		}
		queryParams.totalCount = 1;
		globalConfig.resultFoundSimple(queryParams);					
	},
	"SWPLocator": function (queryParams) {
		var map = queryParams.map;
		if (queryParams.hasOwnProperty('polylines')) {
			MOEMAP.addPolylinesToMap(queryParams.polylines);
		}
		var gLatLng = queryParams.gLatLng;
		//var address = queryParams.address;  //returnedAddress
		if (queryParams.hasOwnProperty('returnedAddress')) {
			globalConfig.returnedAddress = queryParams.returnedAddress;			
		} else {
			globalConfig.returnedAddress = queryParams.address;
		}
		map.setCenter(gLatLng);
		if (queryParams.hasOwnProperty('zoomLevel')) {
			map.setZoom(queryParams.zoomLevel);
		} else {
			if (map.getZoom() <= globalConfig.maxQueryZoomLevel) {
				map.setZoom(globalConfig.maxQueryZoomLevel);
			}
		}
		MOEMAP.mouseClickHandler({latLng: gLatLng});
	}	
};
globalConfig.addressGeocodingCallback = globalConfig.addressGeocodingCallback || globalConfig.addressGeocodingCallbackList[globalConfig.addressGeocodingCallbackName];

globalConfig.calculatePointsBounds = globalConfig.calculatePointsBounds || function (features){
	var bounds = new google.maps.LatLngBounds();
	var size = features.length;
	for (var x = 0; x < size; x++) {
		var gLatLng = features[x].geometry[0].getPosition();
		bounds.extend(gLatLng);		
	}
	return bounds;
};

globalConfig.setMapBound = globalConfig.setMapBound || function (map, bounds){
	map.fitBounds(bounds);
	var maxQueryZoomLevel = globalConfig.maxQueryZoomLevel;
	if(globalConfig.TWPSearch){
		maxQueryZoomLevel = globalConfig.maxQueryZoomLevelTWPSearch;
		globalConfig.TWPSearch = false;
	}else if(globalConfig.TWPLotConSearch){
		maxQueryZoomLevel = globalConfig.maxQueryZoomLevelTWPLotConSearch;
		globalConfig.TWPLotConSearch = false;
	}			
	if (map.getZoom() > maxQueryZoomLevel) {
		map.setZoom(maxQueryZoomLevel);
	}
};	

globalConfig.calculateClusters = globalConfig.calculateClusters || function (features){
	var size = features.length;
	var pointClusters = [];
	for (var x = 0; x < size; x++) {
		var findResult = features[x];
		//var attributes = findResult.attributes;
		var gLatLng = findResult.geometry[0].getPosition();
		if (Math.abs(gLatLng.lng()) + Math.abs(gLatLng.lat()) > 0.001) {
			var foundCluster = false;
			for(var i = 0; i < pointClusters.length; i++){
				var center = pointClusters[i].gLatLng;
				var diff = Math.abs(gLatLng.lng() - center.lng()) + Math.abs(gLatLng.lat() - center.lat());
				if(diff < 0.000001){
					(pointClusters[i]).list.push(findResult);
					foundCluster = true;
				}
			}				
			if(!foundCluster){
				var cluster = {gLatLng: gLatLng, list: [findResult]};
				pointClusters.push(cluster);
			}				
		}
	}
	return pointClusters;
};
	
/*
	Usage: Create a marker on a location with pop up content and used icon. 
	Called by: queryLayerWithPointBuffer.
	Rely on: map, openInfoWindow function.  
*/	
globalConfig.createMarker = globalConfig.createMarker || function (gLatLng, popupContent, icon) {
	var marker = new google.maps.Marker({
		position: gLatLng,
		icon: icon
	});
	(function (popupContent, marker) {
		google.maps.event.addListener(marker, 'click', function () {
			MOEMAP.openInfoWindow(marker.getPosition(), popupContent);
		});
	})(popupContent, marker);
	return marker;
};

globalConfig.infoWindowWidth = globalConfig.infoWindowWidth || '450px';
/*
	Usage: According to the features and the template, generate tab information and finally generate the tabs.  
	Called by: QUERYLAYER.queryLayer, mouseClickHandler
*/		
globalConfig.calculateMulitpleTabsOneFeature = globalConfig.calculateMulitpleTabsOneFeature || function (features, tabsTemplate){
	/*
		Usage: According to the generated tab information, generate the tabs.  
		Called by: calculateMulitpleTabsOneFeature
	*/	
	var createTabBar = function (tabs){
		// the following code based on ESRI sample
		// create and show the info-window with tabs, one for each map service layer		  
		var container = document.createElement('div');
		container.style.width = globalConfig.infoWindowWidth;
		if (globalConfig.hasOwnProperty('infoWindowHeight')){ 
			container.style.height = globalConfig.infoWindowHeight;
		}
            // =======START  TAB UI ================             
		var tabBar = new goog.ui.TabBar();
		for (var i = 0; i < tabs.length; i++) {
			var tab = new goog.ui.Tab(tabs[i].label);
			tab.content = tabs[i].content;
			tabBar.addChild(tab, true);
		}
		tabBar.render(container);
		goog.dom.appendChild(container, goog.dom.createDom('div', {
			'class': 'goog-tab-bar-clear'
		}));
		var contentDiv = goog.dom.createDom('div', {
			'class': 'goog-tab-content'
		});
		if (globalConfig.hasOwnProperty('infoWindowContentHeight')){ 
			contentDiv.style.height = globalConfig.infoWindowContentHeight;
		}
		if (globalConfig.hasOwnProperty('infoWindowContentWidth')){ 
			contentDiv.style.width = globalConfig.infoWindowContentWidth;
		}
		
		//contentDiv.style.width=globalConfig.infoWindowWidth;
		//contentDiv.style.height=globalConfig.infoWindowWidth;
		
		goog.dom.appendChild(container, contentDiv);            
		goog.events.listen(tabBar, goog.ui.Component.EventType.SELECT, function(e) {
			contentDiv.innerHTML = e.target.content;
		});
		tabBar.setSelectedTabIndex(0);
		return container;
            // =======END  TAB UI ================
	};
	
	var count = features.length;
	//Get the first returned record and generate the content for the pop up window. 
	var tabs = TABS_CALCULATOR.getContent(features[0].attributes, tabsTemplate);
	//If it is required to display more than one record, the allowMultipleIdentifyResult will be true. 
	//Then generate the contents for other records and append it to the content in tabs
	if(globalConfig.allowMultipleIdentifyResult){
		for (var i = 1; i < count; i++) {
			var calTabs = TABS_CALCULATOR.getContent(features[i].attributes, tabsTemplate);

			for (var j = 0; j < calTabs.length; j++) {
				//var tab = calTabs[j];
				tabs[j].content = tabs[j].content + calTabs[j].content;
			}
		}
	}
	/*add the head and tail to the content. The length of content is related to the total nubmer of records. 
		The head and tail parts are always fixed and have nothing to do with the total number of records. 
	*/
	for (var k = 0; k < tabs.length; k++) {
		if(typeof(tabsTemplate[k].head) !== "undefined"){
			tabs[k].content = tabsTemplate[k].head + tabs[k].content;
		}
		if(typeof(tabsTemplate[k].tail) !== "undefined"){
			tabs[k].content = tabs[k].content + tabsTemplate[k].tail;
		}			
		//tabs[k].content = tabsTemplate[k].head + tabs[k].content + tabsTemplate[k].tail;
	}
	//Add Total features returned to the top to table. 
	if((globalConfig.displayTotalIdentifyCount)&&(count > 1)){
		if(globalConfig.allowMultipleIdentifyResult){
			tabs[0].content = globalConfig.totalFeatureReturned(count) + "<br>" + tabs[0].content;
		}else{
			tabs[0].content = globalConfig.totalFeatureReturnedOnlyOneDisplayed(count) + "<br>" + tabs[0].content;
		}
	}
	//If it do not use the Predefined multiple tabs, it will not need to include some js and css file. 
	if(globalConfig.usePredefinedMultipleTabs){
		return createTabBar(tabs);
	}else{
		return tabs[0].content;		
	}
};
	
/*
	Usage: Use the circle center and radius to calculat the vertex array.
	The calculation is using the geometry library provided by Google Maps. 
	Called by: mouseMoveHandler, queryLayerWithPointBuffer
*/
globalConfig.calculateCirclePolyline = globalConfig.calculateCirclePolyline || function (gLatLng, radius){
	var circlePath = [];
	for(var heading = 0; heading<=360; heading = heading + 10){
		var latLng = google.maps.geometry.spherical.computeOffset(gLatLng, radius, heading);			
		circlePath.push(new google.maps.LatLng(latLng.lat().toFixed(5), latLng.lng().toFixed(5)));
	}
	var circle = new google.maps.Polyline({
		path: circlePath,
		strokeColor: globalConfig.pointBuffer.color,  
		strokeOpacity: globalConfig.pointBuffer.opacity,
		strokeWeight: globalConfig.pointBuffer.weight
	});
	return circle;
};

/*
	Usage: Calculate the bounds for a polyline. 
	Called by: mouseMoveHandler, queryLayerWithPointBuffer
*/
globalConfig.calculatePolylineBounds = globalConfig.calculatePolylineBounds || function (polyline){
	var bounds = new google.maps.LatLngBounds();
	var path = polyline.getPath();
	for (var i = 0; i < path.length; i++) {
		bounds.extend(path.getAt(i));
	}
	return bounds;
};

globalConfig.disallowMouseClick = globalConfig.disallowMouseClick || false;

MOEMAP = (function () {
	var map, identifyResults, identifyMarker, infoWindow, gOverlays = [], isCenterSet = false, center, bufferCircle; //, overlays = [], layers;

	/*
		Usage: If the info window is open, it will be closed. 
		Called by: mouseClickHandler, clearOverlays.
	*/
	function closeInfoWindow(){
		if(infoWindow){
			infoWindow.setMap(null);
		}		
	}	
	/*
		Usage: Remove the overlays on the map, the buffer circle, and close the infowindow. 
		Called by: mouseMoveHandler and exposed as public methods. 
	*/	
	function clearOverlays() {		
		if (gOverlays) {
			for (var i = 0; i < gOverlays.length; i++) {
				gOverlays[i].setMap(null);
			}
			gOverlays.length = 0;
		}
		if(bufferCircle){
			bufferCircle.setMap(null);
		}
		closeInfoWindow();
		if(globalConfig.usejQueryUITable){	
			document.getElementById(globalConfig.queryTableDivId).innerHTML = "";
		}
	}
	/*
		Usage: Add the polylines overlays on the map. If the LOCATOR module return the result for Township with/without 
		Lot and Concession, the related polygons will be add to Google Maps by this method. 
		Called by: queryLayerWithPointBuffer 
	*/		
	function addPolylinesToMap(polylines){
		if(typeof(polylines) !== "undefined"){
			for (var i=0; i<polylines.length; i++){
				var polygon = polylines[i];
				var max = polygon.getPaths().getLength();
				for(var j=0;j<max;j++){		
					var polyline = new google.maps.Polyline({    
						path: polygon.getPaths().getAt(j),
						strokeColor: globalConfig.twpBoundary.color,    
						strokeOpacity: globalConfig.twpBoundary.opacity,   
						strokeWeight: globalConfig.twpBoundary.weight,
						geodesic: false
					});		
					polyline.setMap(map);
					gOverlays.push(polyline);		
				}
			}
		}				
	}	
	/*
		Usage: If a user is click on the search result or the searched location, a info window will pop up. 
		Called by: mouseClickHandler,  QUERYLAYER.queryLayer, queryLayerWithPointBuffer.
	*/
	function openInfoWindow(latlng, container){
		if (!infoWindow) {
			infoWindow = new google.maps.InfoWindow({
				content: container,
				position: latlng
			});
		} else {
			infoWindow.setContent(container);
			infoWindow.setPosition(latlng);
		}
		infoWindow.open(map);		
	}

	/*
		Set up the event handler for mouse move event. This handler needs to handle two situations. The first is to update the 
		coordinates in the bottom of them map. The second is when the user is drawing the circle, try to update the circle when
		the user move the mouse. Meanwhile, it also give the event handler which will be called once the user finishs the drawing
		of the circle.
		call: globalConfig.updateCoordinates, calculateCirclePolyline, globalConfig.drawingCircleMessage
	*/				
	function mouseMoveHandler(event) {
		/*Update the Coordinates*/
		if(globalConfig.isCoordinatesVisible){
			globalConfig.updateCoordinates(event.latLng.lat(), event.latLng.lng());
		}
		/*Make sure the user is in the middle of drawing.*/
		if(isCenterSet){							
			if(typeof(event) !== "undefined"){
				//Calculate the current radius
				var distance = google.maps.geometry.spherical.computeDistanceBetween(center, event.latLng);								
				//Remove the old circle
				if(bufferCircle){
					bufferCircle.setMap(null);
				}
				bufferCircle = globalConfig.calculateCirclePolyline(center, distance);
				bufferCircle.setMap(map);
				google.maps.event.addListener(bufferCircle, 'click', finishBufferSearch);
				//update the message to give the user the current circle's centre and radius. 
				globalConfig.drawingCircleMessage(center.lat(), center.lng(), distance/1000);
			}
		}
	}	

	function addressBufferCallback (queryParams) {		
		if (queryParams.hasOwnProperty('returnedAddress')) {
			globalConfig.returnedAddress = queryParams.returnedAddress;			
		} else {
			globalConfig.returnedAddress = queryParams.address;
		}
		queryParams.map = map;
		queryParams.preQueryCallback = globalConfig.preBufferCallback;
		queryParams.postQueryCallback = globalConfig.postBufferCallback;
		queryParams.layerList = globalConfig.queryLayerList;
		clearOverlays();
		addPolylinesToMap(queryParams.polylines);  
		queryLayer2(queryParams,0);		
	}
	function finishBufferSearch (evt) {
		var distance = google.maps.geometry.spherical.computeDistanceBetween(center, evt.latLng)/1000;
		var queryParams = {
			radius: distance,
			gLatLng: center,
			map: map,
			preQueryCallback: globalConfig.preBufferCallback,
			postQueryCallback: globalConfig.postBufferCallback,
			layerList: globalConfig.queryLayerList		
		};
		//clear previous search results
		clearOverlays();
		//Query the layer							
		queryLayer2(queryParams,0);
		//restore the drawing status and the tool status to the original status. 
		isCenterSet = false;
		TOOLSLEGEND.setPointBufferTool(false);					
	}
	
	function queryLayer2(queryParams, layerId){
		if(layerId < queryParams.layerList.length) {
			queryParams.currentLayerId = layerId;
			var params = queryParams.preQueryCallback(queryParams);
			//var layerSetting = queryParams.layerList[layerId];
			var layer = new gmaps.ags.Layer(queryParams.layerList[layerId].url);
			layer.query(params, function (fset) {
				queryParams.layerList[layerId]["result"] = fset;
				queryLayer2(queryParams, layerId + 1);
			});				
		} else {
			queryParams.postQueryCallback(queryParams);
		}
		
	}
	/*
		Set up the event handler for mouse click event. This handler needs to handle two situations. If the user has selected the buffer Tool, 
		the click will be the center of the Circle and the function returns. If not, the function is going to identify the dots on the map. 
		call: TOOLSLEGEND.isPointBufferToolSelected, closeInfoWindow, calculateMulitpleTabsOneFeature, openInfoWindow
	*/					
	function mouseClickHandler(evt) {
		if(TOOLSLEGEND.isPointBufferToolSelected()){
			if(!isCenterSet){
				center = evt.latLng;
				isCenterSet = true;
			} else {
				finishBufferSearch(evt);
			}
			return;
		}		
		//identify
		closeInfoWindow();
		var queryParams = {
			gLatLng: evt.latLng,
			map: map,
			preQueryCallback: globalConfig.preIdentifyCallback,
			postQueryCallback: globalConfig.postIdentifyCallback,
			layerList: globalConfig.queryLayerList
		};
		if (globalConfig.hasOwnProperty('mergeFunction')) {
			queryParams.mergeFunction = globalConfig.mergeFunction;
		}
		queryLayer2(queryParams, 0);
	}

	/*
		Get the location firstly by using LOCATOR module. Then, use the call back function to do a spatial search with this location. 
	*/
	function identifyMultiplePolygonLayersWithLocation(qParams){
		var queryParams = {};
		if (qParams.hasOwnProperty('address')) {
			queryParams = qParams;
			queryParams.searchString = qParams.address;
		} else {
			queryParams = {
				address: qParams,
				searchString: qParams
			};		
		}
		
		if (qParams.hasOwnProperty('gLatLng')) {
			queryParams.map = map;
			globalConfig.addressGeocodingCallback(queryParams);
		} else {
			MOEMAP.geocodeAddress(queryParams);
		}
	}
	
	function showPolygonFeature (layerID, recordID) {
		var layerSetting = globalConfig.identifyMultiplePolygonLayersServicesTemplate.layerList[layerID];
		var geometryPoly = layerSetting["result"].features[recordID].geometry[0];
		geometryPoly.setMap(map);
		geometryPoly.setOptions(layerSetting.style);
		gOverlays.push(geometryPoly);			
	}
	
	function init(theMap){
		map = theMap;
		if (!globalConfig.disallowMouseClick) {
			google.maps.event.addListener(map, 'click', mouseClickHandler);
		}
		google.maps.event.addListener(map, 'mousemove', mouseMoveHandler);
		google.maps.event.addListener(map, 'zoom_changed', zoom_changedHandler);		
	}
	function zoom_changedHandler () {
		if (map.getZoom() > globalConfig.maxMapScale) {
			map.setZoom(globalConfig.maxMapScale);
		}
		if (map.getZoom() < globalConfig.minMapScale) {
			map.setZoom(globalConfig.minMapScale);
		}
	}
	function addOverlay (overlay) {
		overlay.setMap(map);	
		gOverlays.push(overlay);
	}
	function queryLayersWithConditionsExtent (queryParams) {
		queryParams.map = map;
		queryParams.preQueryCallback = globalConfig.preConditionsCallback;
		queryParams.postQueryCallback = globalConfig.postConditionsCallback;
		queryParams.layerList = globalConfig.queryLayerList;		
		queryLayer2(queryParams, 0);
	}
	function geocodeAddress (queryParams) {
		queryParams.map = map;
		queryParams.callback = globalConfig.addressGeocodingCallback;
		queryParams.address = queryParams.searchString;
		LOCATOR.locate(queryParams);
	}
	var module = {
        init: init,
		clearOverlays: clearOverlays,
		openInfoWindow: openInfoWindow,
		addOverlay: addOverlay,
		queryLayersWithConditionsExtent: queryLayersWithConditionsExtent,
		geocodeAddress: geocodeAddress,
		addPolylinesToMap: addPolylinesToMap, 
		mouseClickHandler: mouseClickHandler,
		addressBufferCallback: addressBufferCallback,
		identifyMultiplePolygonLayersWithLocation: identifyMultiplePolygonLayersWithLocation,
		showPolygonFeature: showPolygonFeature
    };
    return module;
})();


 /* Build Time: Oct 1, 2014 12:39:13 */ 