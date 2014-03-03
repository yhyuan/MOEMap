/*var cssDeferred = new $.Deferred();
var cssPrompt = (cssDeferred).promise();

if (!!yepnope) {
	yepnope({
		load: "http://prod-ont-webserver.s3.amazonaws.com/moe_mapping/mapping/js/OneSite/SportFish/SportFish_Report.2.0.css", 
		callback: function () {
			cssDeferred.resolve();
		}
	});
}
*/
globalConfig.lengthCategorySize = 13;
//globalConfig.analysisDict stores the relationship between ANALYSIS_CLASS_ID and ANALYSIS_DESC.  ANALYSIS_DESC = globalConfig.analysisDict[ANALYSIS_CLASS_ID];
/*
ANALYSIS_C	First_ANAL
1	1
2	2
3	3
4	4
5	5
6	6
7	8
8	10
9	1_12
10	2_10
11	2_10_11
12	2_10_11_12
13	2_10_12
14	2_11
15	2_12
16	2_7
17	2_7_8_9
18	2_7_9
19	2_8
20	2_8_10
21	2_8_10_
22	2_8_10_11
23	2_8_10_12
24	2_8_9
25	2_8_9_10
26	2_8_9_10_11
27	2_8_9_10_12
29	2_9
30	2_9_10
31	2_9_10_11
32	2_9_10_12
33	5_10
34	5_10_11
35	5_10_11_12
36	5_10_12
37	5_12
38	5_7
39	5_7_8
40	5_7_8_9
41	5_7_9
42	5_8
43	5_8_10
44	5_8_11
45	5_8_9
46	5_8_9_10
47	5_8_9_10_11
48	5_9
49	5_9_10
50	5_9_10_11
51	6_12
52	8_9
53	1_10
54	13
55	2_8_12
56	1_13
57	2_13
58	2_9_11
59	2_7_9_11
60	2_7_8_9_10_12
61	5_8_9_10_11_12
62	5_8_9_10_12
66	5_8_10_12_13
68	2_10_11_12_13
69	2_10_13
70	5_10_12_13
72	2_6
73	5_9_10_11_12_13
74	2_7_12
75	2_7_11_12
76	2_10_12_13
77	2_10_11_13
78	5_8_9_12
79	5_10_11_12_13
80	2_8_9_10_11_12_13
81	5_8_9_10_11_12_13
82	5_8_10_11_12_13
83	5_13
84	2_9_10_12_13
85	2_9_10_11_12
86	2_7_9_11_12
87	2_8_9_10_13
88	5_8_9_10_13
89	5_8_9_10_12_13
*/
globalConfig.analysisDict = [[],[1],[2],[3],[4],[5],[6],[8],[10],[1,12],[2,10],[2,10,11],[2,10,11,12],[2,10,12],[2,11],[2,12],[2,7],[2,7,8,9],[2,7,9],[2,8],[2,8,10],[2,8,10,],[2,8,10,11],[2,8,10,12],[2,8,9],[2,8,9,10],[2,8,9,10,11],[2,8,9,10,12],[],[2,9],[2,9,10],[2,9,10,11],[2,9,10,12],[5,10],[5,10,11],[5,10,11,12],[5,10,12],[5,12],[5,7],[5,7,8],[5,7,8,9],[5,7,9],[5,8],[5,8,10],[5,8,11],[5,8,9],[5,8,9,10],[5,8,9,10,11],[5,9],[5,9,10],[5,9,10,11],[6,12],[8,9],[1,10],[13],[2,8,12],[1,13],[2,13],[2,9,11],[2,7,9,11],[2,7,8,9,10,12],[5,8,9,10,11,12],[5,8,9,10,12],[],[],[],[5,8,10,12,13],[],[2,10,11,12,13],[2,10,13],[5,10,12,13],[],[2,6],[5,9,10,11,12,13],[2,7,12],[2,7,11,12],[2,10,12,13],[2,10,11,13],[5,8,9,12],[5,10,11,12,13],[2,8,9,10,11,12,13],[5,8,9,10,11,12,13],[5,8,10,11,12,13],[5,13],[2,9,10,12,13],[2,9,10,11,12],[2,7,9,11,12],[2,8,9,10,13],[5,8,9,10,13],[5,8,9,10,12,13]];
globalConfig.populationType = ["", "G", "S"];
globalConfig.lengthCategory = {
	 "15":  0,
	 "20":  1,
	 "25":  2,
	 "30":  3,
	 "35":  4,
	 "40":  5,
	 "45":  6,
	 "50":  7,
	 "55":  8,
	 "60":  9,
	 "65":  10,
	 "70":  11,
	 "75":  12
};

var speciesDeferred = new $.Deferred();
var speciesPrompt = (speciesDeferred).promise();
var speciesQueryLayer = new gmaps.ags.Layer(globalConfig.url  + "/3");
speciesQueryLayer.query({
	returnGeometry: false,
	where: "1=1",
	outFields: ["SPECIES_CODE", "SPECNAME", "NOM_D_ESPECE"]
}, function (rs) {
	//PubSub.emit("speciesReady", rs.features);
	var codes = _.map(rs.features, function(feature) {
		return feature.attributes.SPECIES_CODE;
	});
	var species = _.map(rs.features, function(feature) {
		return globalConfig.chooseLang(feature.attributes.SPECNAME, feature.attributes.NOM_D_ESPECE);
	});
	globalConfig.speciesDict = _.object(codes, species);
	speciesDeferred.resolve();
});

var adivosryIndexDeferred = new $.Deferred();
var adivosryIndexPrompt = (adivosryIndexDeferred).promise();
var adivosryIndexQueryLayer = new gmaps.ags.Layer(globalConfig.url  + "/4");
adivosryIndexQueryLayer.query({
	returnGeometry: false,
	where: "1=1",
	outFields: ["ADVISORY_LEVEL ", "KEY"]
}, function (rs) {
	//PubSub.emit("adivosryIndexReady", rs.features);
	//console.log(rs.features);
	var levels = _.map(rs.features, function(feature) {
		return feature.attributes.ADVISORY_LEVEL;
	});
	var keys = _.map(rs.features, function(feature) {
		return feature.attributes.KEY;
	});
	globalConfig.adivosryIndexDict = _.object(levels, keys);
	adivosryIndexDeferred.resolve();
	//console.log(globalConfig.adivosryIndexDict);	
});
/*
globalConfig.getSpeciesNameURL = function(speciesCode) {
	//console.log(speciesCode);
	if (speciesCode === "087") {
		return '<A HREF="http://www.mnr.gov.on.ca/' + globalConfig.chooseLang("en", "fr") + '/Business/SORR/2ColumnSubPage/STDPROD_085774.html">' + globalConfig.speciesDict[speciesCode] + '</A>';
	}
	var speciesURLList = {
		"077": "STEL02_165688",
		"093": "200075",
		"151": "STEL02_173163",
		"102": "STEL02_165840",
		//"087": "http://www.mnr.gov.on.ca/en/Business/SORR/2ColumnSubPage/STDPROD_085774.html",
		"319": "STEL02_165687",
		"314": "STEL02_165686",
		"080": "STEL02_165833",
		"078": "200073",
		"078": "STEL02_165834",
		"186": "STEL02_173162",
		"081": "STEL02_165837",
		"091": "200077",
		"317": "STEL02_165695",
		"131": "STEL02_165828",
		"313": "STEL02_173164",
		"076": "STEL02_165839",
		"076": "200079",
		"311": "STEL02_173219",
		"332": "STEL02_165829",
		"316": "STEL02_165790",
		"082": "200080",
		"334": "STEL02_173221",
		"331": "STEL02_173224",
		"233": "STEL02_165692",
		"301": "STEL02_173167",
		"163": "STEL02_173222",
		"318": "STEL02_165830",
		"234": "STEL02_165693",
		"121": "200078",
		"371": "STEL02_173216",
		"075": "STEL02_165835",
		"302": "STEL02_173166",
		"073": "STEL02_165836",
		"051": "STEL02_173161",
		"271": "200074",
		"071": "STEL02_165838",
		"152": "STEL02_165827"	
	};
	if (speciesURLList.hasOwnProperty(speciesCode))  {
		return '<A HREF="http://www.mnr.gov.on.ca/' + globalConfig.chooseLang("en", "fr") + '/Business/SORR/2ColumnSubPage/' + speciesURLList[speciesCode] + '.html">' + globalConfig.speciesDict[speciesCode] + '</A>';
	}
	return globalConfig.speciesDict[speciesCode];
};

globalConfig.getSpeciesURL = function(speciesCode) {
	//console.log(speciesCode);
	if (speciesCode === "087") {
		return 'http://www.mnr.gov.on.ca/' + globalConfig.chooseLang("en", "fr") + '/Business/SORR/2ColumnSubPage/STDPROD_085774.html';
	}
	var speciesURLList = {
		"077": "STEL02_165688",
		"093": "200075",
		"151": "STEL02_173163",
		"102": "STEL02_165840",
		//"087": "http://www.mnr.gov.on.ca/en/Business/SORR/2ColumnSubPage/STDPROD_085774.html",
		"319": "STEL02_165687",
		"314": "STEL02_165686",
		"080": "STEL02_165833",
		"078": "200073",
		"078": "STEL02_165834",
		"186": "STEL02_173162",
		"081": "STEL02_165837",
		"091": "200077",
		"317": "STEL02_165695",
		"131": "STEL02_165828",
		"313": "STEL02_173164",
		"076": "STEL02_165839",
		"076": "200079",
		"311": "STEL02_173219",
		"332": "STEL02_165829",
		"316": "STEL02_165790",
		"082": "200080",
		"334": "STEL02_173221",
		"331": "STEL02_173224",
		"233": "STEL02_165692",
		"301": "STEL02_173167",
		"163": "STEL02_173222",
		"318": "STEL02_165830",
		"234": "STEL02_165693",
		"121": "200078",
		"371": "STEL02_173216",
		"075": "STEL02_165835",
		"302": "STEL02_173166",
		"073": "STEL02_165836",
		"051": "STEL02_173161",
		"271": "200074",
		"071": "STEL02_165838",
		"152": "STEL02_165827"	
	};
	if (speciesURLList.hasOwnProperty(speciesCode))  {
		return 'http://www.mnr.gov.on.ca/' + globalConfig.chooseLang("en", "fr") + '/Business/SORR/2ColumnSubPage/' + speciesURLList[speciesCode] + '.html';
	}
	return "";
};
*/
globalConfig.getSpeciesURL = function(speciesCode) {
	/*var speciesURLList = {
		"077": ["Atlantic Salmon", "Saumon de l'Atlantique"], 
		"093": ["Cisco (or Lake Herring)", "Cisco de lac"],
		"151": ["Goldeye", "Laquaiche aux yeux d'or"],
		"102": ["Round Whitefish", "Ménomini rond"],
		"319": ["Black Crappie", "Marigane noire"],
		"314": ["Bluegill", "Crapet arlequin"],
		"080": ["Brook Trout", "Omble de fontaine"],
		"078": ["Brown Trout (Inland)", "Truite brune (eaux intérieures)"],
		"078": ["Brown Trout (Great Lakes)", "Truite brune - Grands Lacs"],
		"186": ["Common Carp", "Carpe"],
		"081": ["Lake Trout", "Touladi"],
		"091": ["Lake Whitefish", "Grand corégone"],
		"317": ["Largemouth Bass", "Achigan à grande bouche"],
		"131": ["Northern Pike", "Grand Brochet"],
		"313": ["Pumpkinseed", "Crapet-soleil"],
		"076": ["Rainbow Trout (Inland)", "Truite arc-en-ciel - eaux intérieures"],
		"076": ["Rainbow Trout (Great Lakes)", "Truite arc-en-ciel - Grands Lacs"],
		"311": ["Rock Bass", "Crapet de roche"],
		"332": ["Sauger", "Doré noir"],
		"316": ["Smallmouth Bass", "Achigan à petite bouche"],
		"082": ["Splake", "Truite moulac"],
		"334": ["Walleye", "Doré jaune"],
		"331": ["Yellow Perch", "Perchaude"],
		"233": ["Brown Bullhead", "Barbotte brune"],
		"301": ["White Perch", "Bar-perche"],
		"163": ["White Sucker", "Meunier noir"],
		"318": ["White Crappie", "Marigane blanche"], 
		"234": ["Channel Catfish", "Barbue de rivière"],
		"121": ["Rainbow Smelt", "Éperlan arc-en-ciel"],
		"371": ["Freshwater Drum", "Malachigan d’eau douce"],
		"075": ["Chinook Salmon", "Saumon Chinook"],
		"302": ["White Bass", "Bar blanc"],
		"073": ["Coho Salmon", "Saumon coho"],
		"051": ["Bowfin", "Poisson-castor"],
		"271": ["Burbot", "Lotte"],
		"071": ["Pink Salmon", "Saumon rose"],
		"152": ["Mooneye", "Laquaiche argentée"]
	};*/
	var speciesURLList = {
		"077": ["Atlantic-Salmon", "Saumon-de-lAtlantique"], 
		"093": ["Cisco-or-Lake-Herring)", "Cisco-de-lac"],
		"151": ["Goldeye", "Laquaiche-aux-yeux-dor"],
		"102": ["Round-Whitefish", "Menomini-rond"],
		"319": ["Black-Crappie", "Marigane-noire"],
		"314": ["Bluegill", "Crapet-arlequin"],
		"080": ["Brook-Trout", "Omble-de-fontaine"],
		"078": ["Brown-Trout-Inland", "Truite-brune-eaux-interieures"],
		"078": ["Brown-Trout-Great-Lakes", "Truite-brune-Grands-Lacs"],
		"186": ["Common-Carp", "Carpe"],
		"081": ["Lake-Trout", "Touladi"],
		"091": ["Lake-Whitefish", "Grand-coregone"],
		"317": ["Largemouth-Bass", "Achigan-a-grande-bouche"],
		"131": ["Northern-Pike", "Grand-Brochet"],
		"313": ["Pumpkinseed", "Crapet-soleil"],
		"076": ["Rainbow-Trout-Inland", "Truite-arc-en-ciel-eaux-interieures"],
		"076": ["Rainbow-Trout-Great-Lakes", "Truite-arc-en-ciel-Grands-Lacs"],
		"311": ["Rock-Bass", "Crapet-de-roche"],
		"332": ["Sauger", "Dore-noir"],
		"316": ["Smallmouth-Bass", "Achigan-a-petite-bouche"],
		"082": ["Splake", "Truite-moulac"],
		"334": ["Walleye", "Dore-jaune"],
		"331": ["Yellow-Perch", "Perchaude"],
		"233": ["Brown-Bullhead", "Barbotte-brune"],
		"301": ["White-Perch", "Bar-perche"],
		"163": ["White-Sucker", "Meunier-noir"],
		"318": ["White-Crappie", "Marigane-blanche"], 
		"234": ["Channel-Catfish", "Barbue-de-riviere"],
		"121": ["Rainbow-Smelt", "Eperlan arc-en-ciel"],
		"371": ["Freshwater-Drum", "Malachigan-deau-douce"],
		"075": ["Chinook-Salmon", "Saumon-Chinook"],
		"302": ["White-Bass", "Bar-blanc"],
		"073": ["Coho-Salmon", "Saumon-coho"],
		"051": ["Bowfin", "Poisson-castor"],
		"271": ["Burbot", "Lotte"],
		"071": ["Pink-Salmon", "Saumon-rose"],
		"152": ["Mooneye", "Laquaiche-argentee"]
	};	
	/*
	_.each(_.values(speciesURLList), function(item) {
		console.log(item[0] + "(English): /environment-and-energy/fish-and-wildlife/" + item[0].split(' ').join("-").toLowerCase());
		console.log(item[0] + "(French): /environment-and-energy/fish-and-wildlife/" + item[1].split(' ').join("-").toLowerCase());
	});
	console.log("kkk");*/
	if (speciesURLList.hasOwnProperty(speciesCode))  {
		return "/environment-and-energy/fish-and-wildlife/" + speciesURLList[speciesCode][globalConfig.chooseLang(0, 1)].toLowerCase(); //lake-whitefish
	} else {
		return "";
	}
}
var adivosryDeferred = new $.Deferred();
var adivosryPrompt = (adivosryDeferred).promise();
globalConfig.startTime = new Date();
globalConfig.frequencyLookup = {
	'0': 0,
	'1': 1,
	'2': 2,
	'3': 3,
	'4': 4,
	'5': 5,
	'6': 6,
	'7': 7,
	'8': 8,
	'9': 9,
	'a': 10,
	'b': 11,
	'c': 12,
	'd': 13
};
globalConfig.parseJSON = function (input) {
	//console.log(input);
	var items = input.substring(1,input.length - 1).split('","');
	//console.log(items);
	items = _.map(items, function(item) {
		return item.split('":"');
	});
	var keys = _.map(items, function(item) {
		return item[0];
	});
	var values = _.map(items, function(item) {
		return item[1];
	});	
	return _.object(keys, values);
};
globalConfig.getAnalysisMethods = function (speciesCode, analysisMethodList) {
	//var speciesAnalysisMethods = globalConfig.speciesDict[speciesCode] + analysisMethodList;
	//if speciesAnalysisMethods.length > 22
	//console.log(analysisMethodList);
	return analysisMethodList.split(",").join(", ");
};
globalConfig.generateLengthRanges = function (start, end, step) {
	var startArray = _.range(start, end, step);
	var endArray =  _.range(start + step, end + step, step);
	var indexArray = _.range(startArray.length);
	return _.map(indexArray, function(index) {
		if (index < startArray.length - 1) { 
			return startArray[index] + "&#8209;" + endArray[index];
		} else {
			return "&gt;" + startArray[index];
		}
	});
};

globalConfig.layers = [{
	url: globalConfig.url  + "/0",
	renderTargetDiv: "siteDescription",
	event: "siteDescriptionReady",
	where: "WATERBODYC = " + QueryString.id,
	outFields: [globalConfig.chooseLang("LOCNAME_EN", "LOCNAME_FR"), globalConfig.chooseLang("GUIDELOC_EN", "GUIDELOC_FR"), "ADVISORY", "ANALYMETHOD"],
	processResults: function (fs) {
		var attr = fs[0].attributes;
		var renderResult = {
			"locName": globalConfig.chooseLang(attr.LOCNAME_EN, attr.LOCNAME_FR),
			"locDesc": globalConfig.chooseLang(attr.GUIDELOC_EN, attr.GUIDELOC_FR),
			"speciesObject": JSON.parse(attr.ADVISORY), //(typeof(JSON) !== "undefined") ? JSON.parse(attr.ADVISORY) : globalConfig.parseJSON(attr.ADVISORY),
			"analysisObject": JSON.parse(attr.ANALYMETHOD) //(typeof(JSON) !== "undefined") ? JSON.parse(attr.ANALYMETHOD) : globalConfig.parseJSON(attr.ANALYMETHOD)
		};
		
		globalConfig.renderResult = renderResult;
		adivosryDeferred.resolve();
	},
	template: '<h2><%= locName %></h2>\
				<div style="margin-right:20px;margin-bottom:15px;float:right;"><a href="http://www.ontario.ca/fishguide"><img alt="<%= globalConfig.chooseLang("Guide to Eating Ontario Sport Fish (2013-2014)", "Guide de consommation du poisson gibier de l’Ontario (2013-2014)") %>" style="border:1px solid black;" hspace="10" src="http://files.ontariogovernment.ca/moe_mapping/mapping/js/OneSite/SportFish/cover_<%= globalConfig.chooseLang("en", "fr") %>.jpg" /></a></div>\
				<strong><%= locDesc %></strong>\
				<%\
					if (globalConfig.isEnglish()){\
				%>\
					<p>Consumption advisories in the tables below represent the maximum number of meals per month recommended for each species/size range indicated.</p>\
					<P>Consult the help page if you are eating multiple species of fish or fish from multiple locations.</P>\
					<p>Advisories may be provided for specific species and/or size ranges which are not legal to possess. Learn more about Ontario&#39s <a href="http://www.mnr.gov.on.ca/stdprodconsume/groups/lr/@mnr/@letsfish/documents/document/mnr_e001325.pdf">recreational fishing regulations</a> before going fishing.</p>\
					<p><a href="http://www.ene.gov.on.ca/environment/en/mapping/sportfish/STDPROD_082936.html#advisories">Help understanding the fish consumption advisories</a>\
					</p>\
				<%\
					} else { \
				%>\
					<p>Le tableau ci-dessous contient des mises en garde relatives &#224; la consommation de poisson, c&rsquo;est-&#224;-dire qu&rsquo;il indique la quantit&#233; maximale de repas par mois recommand&#233;e pour chaque esp&#232;ce et fourchette de dimensions de poisson indiqu&#233;e.</p>\
					<P>Consultez la page d\'aide si vous consommez de multiples esp&#232;ces de poissons ou des poissons en provenance de plusieurs lieux.</P>\
					<p>Il peut y avoir des mises en garde concernant des esp&#232;ces et des fourchettes de dimensions de poissons que la r&#233;glementation ontarienne en mati&#232;re de p&#234;che interdit de poss&#233;der. Avant d\'aller p&#234;cher, informez-vous plus en d&#233;tail des  <a href="http://www.mnr.gov.on.ca/stdprodconsume/groups/lr/@mnr/@letsfish/documents/document/mnr_f001325.pdf"> r&#232;glements de la p&#234;che sportive</a>.</p>\
					<p><a href="http://www.ene.gov.on.ca/environment/fr/mapping/sportfish/STDPROD_083134.html">Aide pour l\'interpr&#233;tation des mises en garde relatives &#224; la consommation de poisson</a>\
					</p>\
				<%\
					}\
					var speciesList = _.keys(speciesObject).sort(function compare(a,b) {\
						if (globalConfig.speciesDict[a] < globalConfig.speciesDict[b])\
							return -1;\
						if (globalConfig.speciesDict[a] > globalConfig.speciesDict[b])\
							return 1;\
						return 0;\
					});\
					_.each(speciesList,function(speciesCode,key,list){ %>\
						<h3><%= globalConfig.speciesDict[speciesCode] %><SUP><%= globalConfig.getAnalysisMethods(speciesCode, analysisObject[speciesCode]) %></SUP></h3>\
						<table class="noStripes">\
							<tbody>\
								<tr>\
									<th scope="row"><%= globalConfig.chooseLang("Length", "Longueur") %>&nbsp;(cm)&nbsp;&rarr;</th>\
									<% _.each(globalConfig.generateLengthRanges(15, 80, 5), function(lengthRange,key,list){ %>\
										<td><center><%= lengthRange %></center></td>\
									<% }); %>\
								</tr>\
								<tr>\
									<th scope="row"><%= globalConfig.chooseLang("Length", "Longueur") %>&nbsp;(in)&nbsp;&rarr;</th>\
									<% _.each(globalConfig.generateLengthRanges(6, 32, 2), function(lengthRange,key,list){ %>\
										<td><center><%= lengthRange %></center></td>\
									<% }); %>\
								</tr>\
								<tr>\
									<th scope="row"><%= globalConfig.chooseLang("General population", "Population g&#233;n&#233;rale") %></th>\
									<% _.each(speciesObject[speciesCode].G, function(adv, key, list) { %>\
										<td><center><%= adv %></center></td>\
									<% }); %>\
								</tr>\
								<tr>\
									<th scope="row"><%= globalConfig.chooseLang("Sensitive population*", "Population sensible*") %></th>\
									<% _.each(speciesObject[speciesCode].S, function(adv, key, list) { %>\
										<td><center><%= adv %></center></td>\
									<% }); %>\
								</tr>\
							</tbody>\
						</table>\
						<% var speciesURL = globalConfig.getSpeciesURL(speciesCode);\
							if (speciesURL.length > 0) {\
						%>\
							<p><a href="<%= speciesURL %>"><%= globalConfig.chooseLang("More information about the ", "More information about the ") + globalConfig.speciesDict[speciesCode] %></a></p>\
						<% } %>\
						<p><%= globalConfig.chooseLang("*Sensitive Population: Women of child-bearing age and children under 15.", "*Population sensible: Femmes en &#226;ge de procr&#233;er et enfants de moins de 15 ans.") %></p>\
						<p><%= globalConfig.chooseLang("Superscripts: the number identifies the contaminant or group of contaminants for which the fish was tested.", "Indice sup&#233;rieur : le chiffre d&#233;signe le contaminant ou le groupe de contaminants pour lesquels on a analys&#233; le poisson.") %>\
						</p>\
					<% });%>'
}];

var documentReadyDeferred = new $.Deferred();
var documentReadyPrompt = (documentReadyDeferred).promise();
PubSub.on("DocumentReady", function() {
	documentReadyDeferred.resolve();
});

$.when(documentReadyPrompt, speciesPrompt, adivosryIndexPrompt, adivosryPrompt).done(function() {
	//console.log(new Date() - globalConfig.startTime);
	var renderResult = globalConfig.renderResult;		
	var keys = _.keys(renderResult.speciesObject);
	var values = _.values(renderResult.speciesObject);
	values = _.map(values, function(value) {
		var keyValues = value.split('');
		var result = [];
		var key = "";
		for (var i=0;i<keyValues.length;i++){
			if ((i+2)%2==0) {
				key = globalConfig.adivosryIndexDict[keyValues[i]];
			} else {
				var frequency = globalConfig.frequencyLookup[keyValues[i]];
				result = result.concat(new Array(frequency).fill(key));
			}
		}
		//alert(result);
		var i = 0;
		var general = _.map(result, function(item) {
			var items = item.split('');
			if(items[0] !== 'x') {
				return items[0];
			}
			return '&nbsp;';
		});
		//alert(general);
		var special = _.map(result, function(item) {
			var items = item.split('');
			if(items[1] !== 'x') {
				return items[1];
			}
			return '&nbsp;';
		});
		return {
			G: general,
			S: special
		};
	});
	globalConfig.renderResult.speciesObject = _.object(keys, values);	
	document.getElementById(globalConfig.layers[0].renderTargetDiv).innerHTML = _.template(globalConfig.layers[0].template, globalConfig.renderResult);	
});