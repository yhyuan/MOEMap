globalConfig.layers = [];
globalConfig.loadingMessageDivID = 'siteDescription';
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

var queryLayers = [{
	layerID: "3",
	where: "1=1", 
	outFields: ["SPECIES_CODE", "SPECNAME", "NOM_D_ESPECE"]
},{
	layerID: "0",
	where: "WATERBODYC = " + QueryString.id, 
	outFields: [globalConfig.chooseLang("LOCNAME_EN", "LOCNAME_FR"), globalConfig.chooseLang("GUIDELOC_EN", "GUIDELOC_FR"), "LAT_DISPLAY", "LONG_DISPLAY"]
},{
	layerID: "4",
	where: "GUIDE_WATERBODY_CODE = '" + QueryString.id + "'", 
	outFields: ['SPECIES_CODE', 'POPULATION_TYPE_ID', 'LENGTH_CATEGORY_ID', 'ADV_LEVEL', 'ADV_CAUSE_ID']
}];

var promises = _.map(queryLayers, function(queryLayer) {
	var deferred = new $.Deferred();
	var promise = (deferred).promise();
	(new gmaps.ags.Layer(globalConfig.url  + "/" + queryLayer.layerID)).query({
		returnGeometry: false,
		where: queryLayer.where,
		outFields: queryLayer.outFields
	}, function (rs) {
		deferred.resolve(rs);
	});
	return promise;
});

var documentReadyDeferred = new $.Deferred();
var documentReadyPrompt = (documentReadyDeferred).promise();
PubSub.on("DocumentReady", function() {
	documentReadyDeferred.resolve();
});
promises.push(documentReadyPrompt);

$.when.apply($, promises).done(function() {
	var speciesCodes = _.map(arguments[0].features, function(f) {return f.attributes.SPECIES_CODE;});
	var speciesNames = _.map(arguments[0].features, function(f) {return globalConfig.chooseLang(f.attributes.SPECNAME, f.attributes.NOM_D_ESPECE);});
	var speciesDict = _.object(speciesCodes, speciesNames);
	var attrs = arguments[1].features[0].attributes;
	var guideInfo = {
		LOCNAME: globalConfig.chooseLang(attrs.LOCNAME_EN, attrs.LOCNAME_FR),
		GUIDELOC: globalConfig.chooseLang(attrs.GUIDELOC_EN, attrs.GUIDELOC_FR),
		LATITUDE: attrs.LAT_DISPLAY.substring(0,2) + "&deg;" + attrs.LAT_DISPLAY.substring(2,4) + "'" +  attrs.LAT_DISPLAY.substring(4,6) + "\"N",
		LONGITUDE: attrs.LONG_DISPLAY.substring(0,2) + "&deg;" + attrs.LONG_DISPLAY.substring(2,4) + "'" +  attrs.LONG_DISPLAY.substring(4,6) + "\"" + globalConfig.chooseLang("W", "O"),
		speciesDict: speciesDict
	};
	var species = _.uniq(_.map(arguments[2].features, function(f) {
		return f.attributes.SPECIES_CODE;
	}));
	var advCauseBySpecies = _.object(species, species);
	var advisories = _.object(species, species);
	_.each(species, function(spec) {
		var obj = _.object(_.range(13), _.range(-1, -14, -1));		
		advisories[spec] = {
			1: obj,
			2: _.clone(obj)
		};
	});
	var lengthCategory = {
		 15:  0,
		 20:  1,
		 25:  2,
		 30:  3,
		 35:  4,
		 40:  5,
		 45:  6,
		 50:  7,
		 55:  8,
		 60:  9,
		 65:  10,
		 70:  11,
		 75:  12
	};
	_.each(arguments[2].features, function(f) {
		advCauseBySpecies[f.attributes.SPECIES_CODE] = f.attributes.ADV_CAUSE_ID;		
		advisories[f.attributes.SPECIES_CODE][f.attributes.POPULATION_TYPE_ID][lengthCategory[f.attributes.LENGTH_CATEGORY_ID]] = f.attributes.ADV_LEVEL;
	});
	guideInfo.advCauseBySpecies = advCauseBySpecies;
	guideInfo.advisories = advisories;
	var template = '<h2><%= LOCNAME %></h2>\
		<strong><%= GUIDELOC %></strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(<%= LATITUDE %>&nbsp;&nbsp;<%= LONGITUDE %>)\
		<%\
			if (globalConfig.isEnglish()){\
		%>\
			<p>Consumption advisories in the tables below represent the maximum number of meals per month recommended for each species/size range indicated.</p>\
			<P>Consult the help page if you are eating multiple species of fish or fish from multiple locations.</P>\
			<p>Advisories may be provided for specific species and/or size ranges which are not legal to possess. Learn more about Ontario&#39s <a href="http://www.mnr.gov.on.ca/stdprodconsume/groups/lr/@mnr/@letsfish/documents/document/mnr_e001325.pdf">recreational fishing regulations</a> before going fishing.</p>\
			<p><a href="http://www.ontario.ca/environment-and-energy/how-use-ministry-environment-map#advisories">Help understanding the fish consumption advisories</a>\
			</p>\
		<%\
			} else { \
		%>\
			<p>Le tableau ci-dessous contient des mises en garde relatives &#224; la consommation de poisson, c&rsquo;est-&#224;-dire qu&rsquo;il indique la quantit&#233; maximale de repas par mois recommand&#233;e pour chaque esp&#232;ce et fourchette de dimensions de poisson indiqu&#233;e.</p>\
			<P>Consultez la page d\'aide si vous consommez de multiples esp&#232;ces de poissons ou des poissons en provenance de plusieurs lieux.</P>\
			<p>Il peut y avoir des mises en garde concernant des esp&#232;ces et des fourchettes de dimensions de poissons que la r&#233;glementation ontarienne en mati&#232;re de p&#234;che interdit de poss&#233;der. Avant d\'aller p&#234;cher, informez-vous plus en d&#233;tail des  <a href="http://www.mnr.gov.on.ca/stdprodconsume/groups/lr/@mnr/@letsfish/documents/document/mnr_f001325.pdf"> r&#232;glements de la p&#234;che sportive</a>.</p>\
			<p><a href="http://www.ontario.ca/fr/environnement-et-energie/savoir-utiliser-une-carte-du-ministere-de-lenvironnement#advisories">Aide pour l\'interpr&#233;tation des mises en garde relatives &#224; la consommation de poisson</a>\
			</p>\
		<%\
			}\
			var speciesList = _.keys(advisories).sort(function compare(a,b) {\
				if (speciesDict[a] < speciesDict[b])\
					return -1;\
				if (speciesDict[a] > speciesDict[b])\
					return 1;\
				return 0;\
			});\
			_.each(speciesList,function(speciesCode,key,list){ %>\
				<h3><%= speciesDict[speciesCode] %><SUP><%= advCauseBySpecies[speciesCode] %></SUP></h3>\
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
							<% _.each(advisories[speciesCode][1], function(adv, key, list) { %>\
								<td><center><%= (adv > 0) ? adv : "" %></center></td>\
							<% }); %>\
						</tr>\
						<tr>\
							<th scope="row"><%= globalConfig.chooseLang("Sensitive population*", "Population sensible*") %></th>\
							<% _.each(advisories[speciesCode][2], function(adv, key, list) { %>\
								<td><center><%= (adv > 0) ? adv : "" %></center></td>\
							<% }); %>\
						</tr>\
					</tbody>\
				</table>\
				<% var speciesURL = globalConfig.getSpeciesURL(speciesCode);\
					if (speciesURL.length > 0) {\
				%>\
					<p><a href="<%= speciesURL %>"><%= globalConfig.chooseLang("More information about the ", "More information about the ") + speciesDict[speciesCode] %></a></p>\
				<% } %>\
				<p><%= globalConfig.chooseLang("*Sensitive Population: Women of child-bearing age and children under 15.", "*Population sensible: Femmes en &#226;ge de procr&#233;er et enfants de moins de 15 ans.") %></p>\
				<p><%= globalConfig.chooseLang("Superscripts: the number identifies the contaminant or group of contaminants for which the fish was tested.", "Indice sup&#233;rieur : le chiffre d&#233;signe le contaminant ou le groupe de contaminants pour lesquels on a analys&#233; le poisson.") %>\
				</p>\
			<% });\
		%>';
	document.getElementById(globalConfig.loadingMessageDivID).innerHTML = _.template(template, guideInfo);
});