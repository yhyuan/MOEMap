globalConfig = {};
globalConfig.language = "FR";
globalConfig.searchHelpTxt = "Rechercher par <STRONG>adresse</STRONG>, <STRONG>ville</STRONG>, <STRONG>coordonn\u00e9es</STRONG> ou cliquer sur aide pour plus d\u2019information sur la recherche avanc\u00e9e.";
globalConfig.otherInfoHTML = "Source: Information sur les terres de l'Ontario (ITO).";
globalConfig.searchControlHTML = '<input id = "map_query" type="text" title="Terme" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" autocomplete="off"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="Rechercher" title="Rechercher"></input> \
	<input type="submit" onclick="INITIALIZATION.init()" title="Effacer" value="&nbsp;Effacer&nbsp;"></input> 		\
	<br><br><div id="information" style="color:#000000">Rechercher par <STRONG>adresse</STRONG>, <STRONG>ville</STRONG>, <STRONG>coordonnées</STRONG> ou cliquer sur aide pour de l’information sur la recherche avancée.</div>';
var MOEMapLanguage = {	
	InfoResultTitle : "R\u00e9sultat situ\u00e9 dans le",
	LocatedWithinTxt : " est dans le ",	
	UTMZone: "Zone UTM",
	Easting: "abscisse", 	
	Northing: "ordonn\u00e9e",
	GL: {		
		"LAKE ONTARIO":  "Bassin versant du lac Ontario",
		"LAKE ERIE": "Bassin versant du lac \u00c9ri\u00e9",	
		"LAKE HURON": "Bassin versant du lac Huron",
		"LAKE SUPERIOR": "Bassin versant du lac Sup\u00e9rieur",
		"UPPER ST. LAWRENCE": "Bassin versant du haut Saint-Laurent"
	},
	NoGLWatershedMsg : " Le syst\u00e8me n\u2019a pas trouv\u00e9 de bassin versant des Grands Lacs"	
	};
	//onfocus="this.value=\"\""