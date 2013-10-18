if (globalConfig.language === "EN") {
	globalConfig.annualReportURL = "TRAIS_Report.htm";
	globalConfig.planSummaryURL = "TRAIS_PlanSummaries_Report.htm";
	globalConfig.exitRecordsURL = "TRAIS_ExitRecords_Report.htm";
} else {
	globalConfig.annualReportURL = "TRAIS_Report.htm";
	globalConfig.planSummaryURL = "TRAIS_PlanSummaries_Report.htm";
	globalConfig.exitRecordsURL = "TRAIS_ExitRecords_Report.htm";
}

globalConfig.layers = [{
	url: globalConfig.url + "/0",
	renderTargetDiv: "target",
	event: "reportReady",
	where: "1=1",
	//outFields: ["ID", "OrganizationName", "FacilityName", "Address", "NUMsubst"],
	outFields: ["UniqueID", "Organisation", "Facility", "City", "NUMsubst"],
	processResults: function (fs) {
		var constructObject = function (feature) {
			var attr = feature.attributes;
			return {
				CompanyName: attr.Organisation, //attr.OrganizationName,
				FacilityName: attr.Facility, //attr.FacilityName,
				ID: attr.UniqueID, //attr.ID,
				City: attr.City, //attr.Address.split("/")[1],
				Substances: attr.NUMsubst
			};
		};
		var resultsArray = _.map(fs, constructObject);
		var resultDict = {};
		_.each(resultsArray, function (result) {
			var firstLetter = result.CompanyName[0];
			if (resultDict.hasOwnProperty(firstLetter)) {
				resultDict[firstLetter].push(result);
			} else {
				resultDict[firstLetter] = [result];
			}
		});
		var facilityDict = _.keys(resultDict);
		facilityDict = _.map(facilityDict, function (propt) {
			return {
				index: propt,
				facilityList: resultDict[propt]
			};
		})
		facilityDict.sort(function compare(a,b) {
			if (a.index < b.index)
				return -1;
			if (a.index > b.index)
				return 1;
			return 0;
		});
		PubSub.emit(globalConfig.layers[0].event + "Data", {facilityDict: facilityDict, totalFacility: resultsArray.length});
		//document.getElementById(globalConfig.layers[0].renderTargetDiv).innerHTML = _.template(globalConfig.layers[0].template, {facilityDict: facilityDict, totalFacility: resultsArray.length});	
	},
	template: '<H2><%= globalConfig.chooseLang("Accessible Toxics Reporting Facilities and Reports", "Installations et rapports relatifs au toxiques") %></H2>\
		<%= globalConfig.chooseLang("The following " + totalFacility + " facilities have filed Toxic Reduction reports", "Les installations suivantes ont produit un rapport sur les substances toxiques") %>:<P>\
		<%\
			_.each(facilityDict,function(facilityEntry,key,list){\
		%>\
			<H3><%= facilityEntry.index %></H3>\
			<%\
				_.each(facilityEntry.facilityList,function(facility,key,list){\
					var substance = "substance";\
					if (facility.Substances > 1) {\
						substance = "substances";\
					} \
			%>\
				<%= facility.CompanyName %>-<%= facility.FacilityName %> [<%= facility.City %>] (<%= facility.Substances %> <%= substance %>)<BR>\
				<A HREF="<%= globalConfig.annualReportURL %>?id=<%= facility.ID %>"><%= globalConfig.chooseLang("Link to Annual Reports", "Lien aux rapports annuels") %></A>, \
				<A HREF="<%= globalConfig.planSummaryURL %>?id=<%= facility.ID %>"><%= globalConfig.chooseLang("Link to Plan Summaries", "Lien aux Plan Summaries") %></A>, \
				<A HREF="<%= globalConfig.exitRecordsURL %>?id=<%= facility.ID %>"><%= globalConfig.chooseLang("Link to Records", "Lien aux Records") %></A><br><br>\
			<%\
				});\
			%>\
		<%\
			});\
		%>'
}];

/*<A HREF=TRAIS_Report.htm?id=<%= facility.ID %>><%= facility.CompanyName %>-<%= facility.FacilityName %> [<%= facility.City %>]</A> (<%= facility.Substances %> <%= substance %>)<BR>\*/