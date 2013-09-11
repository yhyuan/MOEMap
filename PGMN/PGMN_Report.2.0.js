globalConfig.chartedChemicals = ["Aluminum", "Antimony", "Arsenic", "Barium", "Beryllium", "Boron", "Cadmium", "Chromium", "Cobalt", "Copper", "Iron", "Lead", "Manganese", "Molybdenum", "Nickel", "Selenium", "Silver", "Strontium", "Thallium", "Titanium", "Uranium", "Vanadium", "Zinc", "Fluoride", "Sulphate", "Solids; dissolved", "Anions", "Cations", "Conductivity Estimated", "Ion balance calculation", "Solids; Dissolved Estimated", "Calcium", "Hardness", "Magnesium", "Potassium", "Sodium", "Alkalinity; total fixed endpt", "Conductivity", "pH", "Langeliers index calculation", "Saturation pH Estimated", "Nitrogen; ammonia+ammonium", "Nitrogen; nitrate+nitrite", "Nitrogen; nitrite", "Phosphorus; phosphate", "Nitrogen; total Kjeldahl", "Phosphorus; total", "Carbon; dissolved inorganic", "Carbon; dissolved organic", "Silicon; reactive silicate", "Chloride", "Bromide", "Iodide (I-)", "Nitrogen; nitrate"];
globalConfig.Chemicals_Dict = {"Aluminum": "Aluminium","Antimony": "Antimoine","Arsenic": "Arsenic","Barium": "Baryum","Beryllium": "B&eacute;ryllium","Boron": "Bore","Cadmium": "Cadmium","Chromium": "Chrome","Cobalt": "Cobalt","Copper": "Cuivre","Iron": "Fer","Lead": "Plomb","Manganese": "Mangan&egrave;se","Molybdenum": "Molybd&egrave;ne","Nickel": "Nickel","Selenium": "S&eacute;l&eacute;nium","Silver": "Argent","Strontium": "Strontium","Thallium": "Thallium","Titanium": "Titane","Uranium": "Uranium","Vanadium": "Vanadium","Zinc": "Zinc","Fluoride": "Fluorure","Sulphate": "Sulfate","Solids; dissolved": "Solides; dissous","Anions": "Anions","Cations": "Cations","Conductivity Estimated": "Estimation de la conductivit&eacute; ","Ion balance calculation": "Calcul de l'&eacute;quilibre ionique","Solids; Dissolved Estimated": "Solides; estimation des solides dissous ","Calcium": "Calcium","Hardness": "Titre hydrotim&eacute;trique","Magnesium": "Magn&eacute;sium","Potassium": "Potassium","Sodium": "Sodium","Alkalinity; total fixed endpt": "Alcalinit&eacute;; point limite d'alcalinit&eacute; totale","Conductivity": "Conductivit&eacute;","pH": "pH","Langeliers index calculation": "Calcul de l'index de Langelier","Saturation pH Estimated": "Estimation du pH de saturation","Nitrogen; ammonia+ammonium": "Nitrog&egrave;ne; ammoniac+ammonium","Nitrogen; nitrate+nitrite": "Nitrog&egrave;ne; nitrate+nitrite","Nitrogen; nitrite": "Nitrog&egrave;ne; nitrite","Phosphorus; phosphate": "Phosphore; phosphate","Nitrogen; total Kjeldahl": "Nitrog&egrave;ne; azote total Kjeldahl","Phosphorus; total": "Phosphore; total","Carbon; dissolved inorganic": "Carbone; carbone inorganique dissous","Carbon; dissolved organic": "Carbone; carbone organique dissous","Silicon; reactive silicate": "Silicium; silicate r&eacute;actif","Chloride": "Chlorure","Bromide": "Bromure","Iodide (I-)": "Ion iodure (I-)","Nitrogen; nitrate": "Nitrog&egrave;ne; nitrate"};

globalConfig.sortByDate = function (a, b) {
	var d1 = new Date(a.attributes.SAMPLE_DAT);
	var d2 = new Date(b.attributes.SAMPLE_DAT);
	if (d1 < d2) return -1;
	if (d2 < d1) return 1;
	return 0;
};

globalConfig.calculateChartedValues = function (chemicalSamples) {
	var maxValue = _.max(chemicalSamples, function(sample){return sample.attributes.REPORT_VALUE;}).attributes.REPORT_VALUE;
	if (maxValue < 0.02) {maxValue = 0.02;}
	if (chemicalSamples.length === 1) {
		maxValue = 2*maxValue;
	}
	var isNumber = function (n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};
	var values = _.map(chemicalSamples, function(sample) {
		if ((!isNumber(sample.attributes.REPORT_VALUE)) || (sample.attributes.REPORT_VALUE < 0.000001)) {
			return 0;
		} else {
			return (sample.attributes.REPORT_VALUE * 100.0 / maxValue).toFixed(2);
		}
	});
	var beginDate = new Date("January 1, 2002");
	var dateDiff = new Date("January 1, 2013") - beginDate;
	var dates = _.map(chemicalSamples, function(sample) {
		return ((new Date(sample.attributes.SAMPLE_DAT) - beginDate) * 100.0 / dateDiff).toFixed(2);
	});
	var unit = chemicalSamples[0].attributes.UNITS;
	return {
		maxValue: maxValue, 
		values: values,
		dates: dates,
		unit: unit
	};
};

globalConfig.layers = [{
	url: globalConfig.url + "/2",
	renderTargetDiv: "target",
	event: "reportReady",
	where: "PGMN_WELL = '" + QueryString.id + "'",
	outFields: ["SAMPLENUM", "SAMPLE_DAT", "CONFIDENC", "COMMENTS", "IONIC_BALA", "LAB", "LAB_ID", "PARMNAME", "DILUTION", "REPORT_VALUE", "UNITS", "VALQUALIFIER", "REMARK1", "REMARK2"],
	processResults: function (fs) {
			var convertDate = function (date) {
				var d = new Date(date);
				var month = d.getMonth() + 1;
				var day = d.getDate();	
				return ((day < 10) ? ("0" + day) :  ("" + day)) + "/" + ((month < 10) ? ("0" + month) :  ("" + month)) + "/" + d.getFullYear();
			};
			_.each(fs, function(feature) {
				feature.attributes["SAMPLE_DATE"] = convertDate(new Date(feature.attributes.SAMPLE_DAT));
			});
			var parameterObject = _.groupBy(fs, function(feature) {return feature.attributes.PARMNAME;});
			var availableChartedChemicals = _.filter(globalConfig.chartedChemicals, function(chemical) {return parameterObject.hasOwnProperty(chemical);});
			var unchartedChemicals = (_.filter(_.keys(parameterObject), function(chemical) {return !(_.contains(globalConfig.chartedChemicals, chemical));})).sort();
			PubSub.emit(globalConfig.layers[0].event + "Data", {
				renderResult: {
					PGMN_WELL: QueryString.id, 
					availableChartedChemicals: availableChartedChemicals, 
					unchartedChemicals: unchartedChemicals,
					parameterObject: parameterObject
				}
			});
			/*document.getElementById(globalConfig.layers[0].renderTargetDiv).innerHTML = _.template(globalConfig.layers[0].template, 
				{
					renderResult: {
						PGMN_WELL: QueryString.id, 
						availableChartedChemicals: availableChartedChemicals, 
						unchartedChemicals: unchartedChemicals,
						parameterObject: parameterObject
					}
				});	*/
	},
	template: '		<h2><%= globalConfig.chooseLang("Water Chemistry  in PGMN Well", "Composition chimique de l&acute;eau des puits du R&eacute;seau provincial de contr&ocirc;le des eaux souterraines") %>: <%= renderResult.PGMN_WELL %></h2>\
		<a name="top"></a><a href="http://files.ontariogovernment.ca/moe_mapping/mapping/PGMN/WaterChemistry/<%= renderResult.PGMN_WELL %>.txt"><%= globalConfig.chooseLang("Water Chemistry Data Download (Tab Separated Text File)", "T&eacute;l&eacute;chargement des donn&eacute;es hydro-chimiques (Fichier texte s&eacute;par&eacute;)") %></a>\
		<table class="fishTable"  border="1">\
            <%\
				var chemicalList = renderResult.availableChartedChemicals;\
				if (chemicalList.length % 3 === 1) {\
					chemicalList = chemicalList.concat([" ", " "]);\
				} else if (chemicalList.length % 3 === 2) {\
					chemicalList = chemicalList.concat([" "]);\
				}\
				var chemicalListIndex = _.range(chemicalList.length/3);\
                _.each(chemicalListIndex,function(index,key,list){\
					var index1 = 3*index;\
					var index2 = 3*index + 1;\
					var index3 = 3*index + 2;\
					var chem1 = globalConfig.chooseLang(chemicalList[index1], globalConfig.Chemicals_Dict[chemicalList[index1]]);\
					var chem2 = globalConfig.chooseLang(chemicalList[index2], globalConfig.Chemicals_Dict[chemicalList[index2]]);\
					var chem3 = globalConfig.chooseLang(chemicalList[index3], globalConfig.Chemicals_Dict[chemicalList[index3]]);\
            %>\
				<tr><td><a href="#index<%= index1 %>"><%= chem1 %></a></td><td><a href="#index<%= index2 %>"><%= chem2  %></a></td><td><a href="#index<%= index3 %>"><%= chem3  %></a></td></tr>\
            <%\
                });\
            %>			\
			<tr><td colspan="3"><center><a href="#indexOther"><%= globalConfig.chooseLang("Pesticides, Volatile Organic Compounds, and other parameters", "Pesticides, compos&eacute;s organiques volatiles et autres param&egrave;tres") %></a></center></td></tr>\
		</table>\
\
		<%\
			_.each(renderResult.availableChartedChemicals,function(chemical,key,list){\
				var chemicalSamples = renderResult.parameterObject[chemical].sort(globalConfig.sortByDate);\
				var chartedValues = globalConfig.calculateChartedValues(chemicalSamples);\
				var chemicalName = globalConfig.chooseLang(chemical, globalConfig.Chemicals_Dict[chemical]);\
		%>\
			<h3><a name="index<%= key %>"><%= chemicalName %></a></h3>\
			<img src="http://chart.apis.google.com/chart?cht=s&chd=t:<%= chartedValues.dates.join(",") %>|<%= chartedValues.values.join(",") %>&chxt=x,y&chs=500x200&chxl=|0:|2002|2003|2004|2005|2006|2007|2008|2009|2010|2011|2012|2013|1:|0|<%= chartedValues.maxValue*0.5 %>|<%= chartedValues.maxValue %>(<%= chartedValues.unit %>)"/>\
			<table class="fishTable"  border="1">\
				<tr><th class="shaded"><center>Date</center></th><th class="shaded"><center><%= globalConfig.chooseLang("Value", "Valeur") %></center></th><th class="shaded"><center><%= globalConfig.chooseLang("Units", "Unit&eacute;") %></center></th><th class="shaded"><center><%= globalConfig.chooseLang("Qualifiers", "Qualificateurs") %></center></th><th class="shaded"><center><%= globalConfig.chooseLang("Remark 1", "Observation 1") %></center></th><th class="shaded"><center><%= globalConfig.chooseLang("Remark 2", "Observation 2") %></center></th><th class="shaded"><center><%= globalConfig.chooseLang("Confidence Level", "Niveau de confiance") %></center></th><th class="shaded"><center><%= globalConfig.chooseLang("Comments", "Commentaires") %></center></th><th class="shaded"><center><%= globalConfig.chooseLang("Sample Number", "Num&eacute;ro d&acute;&eacute;chantillon") %></center></th></tr>\
	            <%\
                _.each(chemicalSamples,function(sample,key,list){\
					var attrs = sample.attributes;\
				%>\
					<tr><td><%= attrs.SAMPLE_DATE %></td><td><%= attrs.REPORT_VALUE %></td><td><%= attrs.UNITS %></td><td><%= attrs.VALQUALIFIER %></td><td><%= attrs.REMARK1 %></td><td><%= attrs.REMARK2 %></td><td><%= attrs.CONFIDENC %></td><td><%= attrs.COMMENTS %></td><td><%= attrs.SAMPLENUM %></td></tr>\
				<%\
					});\
				%>\
				</table>\
			<div align="right"><a href="#top"><%= globalConfig.chooseLang("Back to top", "Haut de la page") %></a></div><br><br>\
		<%\
			});\
		%>\
		<h3><a name="indexOther">Pesticides, Volatile Organic Compounds, and other parameters</a></h3>		\
		<%\
			_.each(renderResult.unchartedChemicals,function(chemical,key,list){\
				var chemicalSamples = renderResult.parameterObject[chemical].sort(globalConfig.sortByDate);\
		%>\
			<h3><%= chemical %></h3>\
			<table class="fishTable"  border="1">\
				<tr><th class="shaded"><center>Date</center></th><th class="shaded"><center><%= globalConfig.chooseLang("Value", "Valeur") %></center></th><th class="shaded"><center><%= globalConfig.chooseLang("Units", "Unit&eacute;") %></center></th><th class="shaded"><center><%= globalConfig.chooseLang("Qualifiers", "Qualificateurs") %></center></th><th class="shaded"><center><%= globalConfig.chooseLang("Remark 1", "Observation 1") %></center></th><th class="shaded"><center><%= globalConfig.chooseLang("Remark 2", "Observation 2") %></center></th><th class="shaded"><center><%= globalConfig.chooseLang("Confidence Level", "Niveau de confiance") %></center></th><th class="shaded"><center><%= globalConfig.chooseLang("Comments", "Commentaires") %></center></th><th class="shaded"><center><%= globalConfig.chooseLang("Sample Number", "Num&eacute;ro d&acute;&eacute;chantillon") %></center></th></tr>\
	            <%\
                _.each(chemicalSamples,function(sample,key,list){\
					var attrs = sample.attributes;\
				%>\
					<tr><td><%= attrs.SAMPLE_DATE %></td><td><%= attrs.REPORT_VALUE %></td><td><%= attrs.UNITS %></td><td><%= attrs.VALQUALIFIER %></td><td><%= attrs.REMARK1 %></td><td><%= attrs.REMARK2 %></td><td><%= attrs.CONFIDENC %></td><td><%= attrs.COMMENTS %></td><td><%= attrs.SAMPLENUM %></td></tr>\
				<%\
					});\
				%>\
			</table>\
			<div align="right"><a href="#top"><%= globalConfig.chooseLang("Back to top", "Haut de la page") %></a></div><br><br>\
		<%\
			});\
		%>'
}];

