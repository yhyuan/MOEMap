globalConfig = {};
globalConfig.language = "FR";
//globalConfig.searchHelpTxt = "Rechercher par <STRONG>adresse</STRONG>, <STRONG>ville</STRONG>, <STRONG>code postal</STRONG> ou cliquer sur aide pour plus d\u0027information sur la recherche avanc\u00e9e.";
globalConfig.otherInfoHTML = "";
/*
globalConfig.searchControlHTML = '<input id = "map_query" type="text" title="Terme" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" autocomplete="off"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="Rechercher" title="Rechercher"></input> \
	<input type="submit" onclick="INITIALIZATION.init()" title="Effacer" value="&nbsp;Effacer&nbsp;"></input> 		\
	<br><br><div id="information" style="color:#000000">' + globalConfig.searchHelpTxt + '</div>';
*/
var MOEMapLanguage = {
	MarkerAlt: "Lieu",
    InfoResultTitle : "R\u00e9sultat situ\u00e9 dans le",
	OfficeAddressLbl : "Adresse du bureau: ",
	TelLbl : "T\u00e9l\u00e9phone: ",
	FaxLbl : " T\u00e9l\u00e9copieur: ",
	TollFreeLbl : "Sans frais: ",
	LocatedWithinTxt : " est dans le ",
	SearchHelpTxt : "Rechercher par <STRONG>adresse</STRONG>, <STRONG>ville</STRONG>, <STRONG>code postal</STRONG> ou cliquer sur aide pour plus d\u2019information sur la recherche avanc\u00e9e.<br>",
	NoMOEDistrictMsg : "Le syst\u00e8me n\u2019a pas trouv\u00e9 de district du MEO",
	MOEDistrict: {		
		"Barrie":  "District de Barrie du MEO",
		"Guelph":  "District de Guelph du MEO",
		"Halton-Peel": "District de Halton-Peel du MEO",
		"Hamilton":  "District de Hamilton du MEO",
		"Kingston":  "District de Kingston du MEO",
		"London":  "District de London du MEO",
		"Ottawa": "District d\u2019Ottawa du MEO",
		"Owen Sound": "District d\u2019Owen Sound du MEO",
		"Peterborough": "District de Peterborough du MEO",
		"Sarnia": "District de Sarnia du MEO",
		"Sudbury": "District de Sudbury du MEO",
		"Thunder Bay": "District de Thunder Bay du MEO",
		"Timmins": "District de Timmins du MEO",
		"Toronto": "District de Toronto du MEO",	
		"Niagra": "District de Niagara du MEO",
		"York-Durham": "District de York-Durham du MEO"		
	},
	MOEDistrictStreet: {
		"Barrie":  "Bureau 1203, 54, alle Cedar Pointe",
		"Guelph":  "1, chemin Stone Ouest",
		"Halton-Peel": "Bureau 300, 4145 North Service Road",
		"Hamilton":  "9"+ "<sup>e</sup>"+ " \u00e9tage, 119, rue King Ouest",
		"Kingston":  "C. P. 22032, 1259 rue Gardiners",
		"London":  "733, chemin Exeter",
		"Ottawa": "2430 Don Reid Drive",
		"Owen Sound": "101, rue 17"+ "<sup>e</sup>"+ " Est",
		"Peterborough": "300, rue Water, Place Robinson",
		"Sarnia": "1094, chemin London",
		"Sudbury": "Bureau 1201, 199, rue Larch",		
		"Thunder Bay": "3" + "<sup>e</sup>"+ " \u00e9tage, bureau 331B, 435, rue James Sud",
		"Timmins": "Complexe du gouvernement de l\u2019Ontario, Sac postal 3080, Autoroute 101 Est",
		"Toronto": "8"+ "<sup>e</sup>"+ " \u00e9tage, 5775, rue Yonge",	
		"Niagra": "9"+ "<sup>e</sup>"+ " \u00e9tage, 301, rue St. Paul",
		"York-Durham": "5"+ "<sup>e</sup>"+ " \u00e9tage, 230 chemin Westney Sud"			
	},
	moeDistrictThunderbayTollFreePhone: {
		"Thunder Bay": "1-800-875-7772 (Dans la zone des indicatifs r\u00e9gionaux 705 et 807)"	
	}, 
	moeDistrictThunderbayFax: {
		"Thunder Bay": "(807) 473-3160 ou (807) 475-1754"	
	} 
	
};