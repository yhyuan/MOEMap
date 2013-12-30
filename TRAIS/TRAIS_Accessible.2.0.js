if (globalConfig.language === "EN") {
	globalConfig.annualReportURL = "TRAIS_Report.htm";
	globalConfig.planSummaryURL = "TRAIS_PlanSummaries_Report.htm";
	globalConfig.recordsURL = "TRAIS_Records_Report.htm";
	globalConfig.NoAnnualReportSubmittedLang = "No Annual Report submitted.";
	globalConfig.NoPlanSummarySubmittedLang = "No Plan Summary submitted.";
	globalConfig.NoRecordSubmittedLang = "No Record submitted.";
	globalConfig.LinktoAnnualReportsLang = "Links to Annual Reports";
	globalConfig.LinktoPlanSummariesLang = "Links to Plan Summaries";
	globalConfig.LinktoRecordsLang = "Links to Records";	
} else {
	globalConfig.annualReportURL = "TRAIS_Report.htm";
	globalConfig.planSummaryURL = "TRAIS_PlanSummaries_Report.htm";
	globalConfig.recordsURL = "TRAIS_Records_Report.htm";
	globalConfig.NoAnnualReportSubmittedLang = "Aucun rapport annuel pr&eacute;sent&eacute;.";
	globalConfig.NoPlanSummarySubmittedLang = "Aucun sommaire de plan pr&eacute;sent&eacute;.";
	globalConfig.NoRecordSubmittedLang = "Aucun document pr&eacute;sent&eacute;.";
	globalConfig.LinktoAnnualReportsLang = "Lien aux rapports annuels";
	globalConfig.LinktoPlanSummariesLang = "Lien aux sommaires de plan";
	globalConfig.LinktoRecordsLang = "Lien aux documents";	
}

globalConfig.layers = [{
	url: globalConfig.url + "/0",
	renderTargetDiv: "target",
	event: "reportReady",
	where: "1=1",
	//outFields: ["ID", "OrganizationName", "FacilityName", "Address", "NUMsubst"],
	outFields: ["UniqueID", "Organisation", "Facility", "City", "NUMsubst", "NUMPlanSummary", "NUMRecord"],
	processResults: function (fs) {
		var constructObject = function (feature) {
			var attr = feature.attributes;
			return {
				CompanyName: attr.Organisation, //attr.OrganizationName,
				FacilityName: attr.Facility, //attr.FacilityName,
				ID: attr.UniqueID, //attr.ID,
				City: attr.City, //attr.Address.split("/")[1],
				Substances: attr.NUMsubst,
				NUMPlanSummary: attr.NUMPlanSummary,
				NUMRecord: attr.NUMRecord
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
				<% if (facility.Substances > 0) {%> <A HREF="<%= globalConfig.annualReportURL %>?id=<%= facility.ID %>"><%= globalConfig.LinktoAnnualReportsLang %></A><% } else {%> <%= globalConfig.NoAnnualReportSubmittedLang %> <% }%>, \
				<% if (facility.NUMPlanSummary > 0) {%> <A HREF="<%= globalConfig.planSummaryURL %>?id=<%= facility.ID %>"><%= globalConfig.LinktoPlanSummariesLang %></A><% } else {%> <%= globalConfig.NoPlanSummarySubmittedLang %> <% }%>, \
				<% if (facility.NUMRecord > 0) {%> <A HREF="<%= globalConfig.recordsURL %>?id=<%= facility.ID %>"><%= globalConfig.LinktoRecordsLang %></A><% } else {%> <%= globalConfig.NoRecordSubmittedLang %> <% }%><br><br>\
			<%\
				});\
			%>\
		<%\
			});\
		%>'
}];

/*<A HREF=TRAIS_Report.htm?id=<%= facility.ID %>><%= facility.CompanyName %>-<%= facility.FacilityName %> [<%= facility.City %>]</A> (<%= facility.Substances %> <%= substance %>)<BR>\*/