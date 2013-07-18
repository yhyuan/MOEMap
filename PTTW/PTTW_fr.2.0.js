globalConfig = {};
globalConfig.language = "FR";
globalConfig.searchHelpTxt = "Zoom avant, ou Recherche par bassin versant, nom du titulaire de permis, adresse.";
globalConfig.tableSimpleTemplateTitleLang = "\u00c0 noter : La colonne de distance (en km) donne la distance entre le lieu de votre recherche et le lieu du puits dans la rang\u00e9e donn\u00e9e. Les donn\u00e9es sont en anglais seulement.";
globalConfig.otherInfoHTML = '<p>Certaines donn&eacute;es scientifiques et de surveillance n&rsquo;existent qu&rsquo;en anglais.</p>';

globalConfig.InformationLang = "Information";
globalConfig.WatershedLang = "Bassin versant";
globalConfig.PermitHolderNameLang = "Nom du titulaire de permis";
globalConfig.AddresswithRadiusofLang = "Adresse dans un rayon de";

globalConfig.searchControlHTML = '<center><input id = "map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="Recherche"></input>&nbsp;&nbsp;\
	<br>\
	<input id = "searchWatershed" type="radio" name="searchGroup" value="watershed" onclick="globalConfig.searchChange(\'Watershed\')">' + globalConfig.WatershedLang + '\
	<input id = "searchBusiness" type="radio" name="searchGroup" value="business" onclick="globalConfig.searchChange(\'Business\')">' + globalConfig.PermitHolderNameLang + '\
	<input id = "searchLocation" type="radio" name="searchGroup" value="location" onclick="globalConfig.searchChange(\'Location\')">' + globalConfig.AddresswithRadiusofLang + '\
		<select name="searchCriteria.radius" id="lstRadius">\
	   	 					<option value="1" >1 km</option>\
	   	 					<option value="2" >2 km</option>\
	   	 					<option value="5" >5 km</option>\
	   	 					<option value="10" >10 km</option>\
							<option value="25" >25 km</option>\
							<option value="50" >50 km</option>\
						</select>\
	<div id="information" style="color:#0000FF">' + globalConfig.searchHelpTxt + '</div></center>';