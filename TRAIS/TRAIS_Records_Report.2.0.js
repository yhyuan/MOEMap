globalConfig.layers = [{
	url: globalConfig.url  + "/6",
	renderTargetDiv: "exitRecords",
	event: "reportReady",
	where: "UniqueFacilityID = '" + QueryString.id + "'",
	outFields: ["FacilityName", "StreetAddressPhysicalAddress", "MunicipalityCityPhysicalAddress", "OrganizationName", "NPRIID", "NAICS", "PublicContactFullName", "PublicContactTelephone", "PublicContactEmail", "HighestRankingEmployee", "SubstanceName", "SubstanceCAS", "DateofSubmission", "Reason", "DescriptionofCircumstances"],
	processResults: function (fs) {
		var dateList = _.uniq(_.map(fs, function(feature) {
			return feature.attributes.DateofSubmission;
		}));
		var substanceList = new Array(dateList.length).fill([]);
		var dateSubstanceObject = _.object(dateList, substanceList);
		_.each(fs, function(feature) {
			dateSubstanceObject[feature.attributes.DateofSubmission].push(feature.attributes);
		});
		_.each(dateList, function(date) {
			dateSubstanceObject[date].sort(function(a,b){
				if (a.SubstanceName > b.SubstanceName) {
					return 1;
				}
				if (a.SubstanceName < b.SubstanceName) {
					return -1;
				}
				return 0;
			});
		});
		var attr = fs[0].attributes;
		var renderResult = {
			ReportingPeriod: QueryString.year, 
			FacilityName: attr.FacilityName,
			CompanyName: attr.OrganizationName,
			Address: attr.StreetAddressPhysicalAddress + " / " + attr.MunicipalityCityPhysicalAddress,
			//Sector: attr.Sector,
			NPRIID: attr.NPRIID,
			PublicContact: (attr.PublicContactFullName === null) ?  "[<I>" + globalConfig.chooseLang("no name available", "Aucun nom disponible") +  "</I>]" : attr.PublicContactFullName,
			PublicContactPhone: attr.PublicContactTelephone,
			PublicContactEmail: attr.PublicContactEmail,
			HighestRankingEmployee: attr.HighestRankingEmployee,
			dateSubstanceObject: dateSubstanceObject
		};
		var NAICS = attr.NAICS;
		var NAICSLayerID = "4";
		var NAICSQueryLayer = new gmaps.ags.Layer(globalConfig.url  + "/" + NAICSLayerID);
		NAICSQueryLayer.query({
			returnGeometry: false,
			where: "NAICS=" + NAICS,
			outFields: ["Name"]
		}, function (rs) {
			renderResult.Sector = NAICS + " - " + rs.features[0].attributes.Name;
			PubSub.emit(globalConfig.layers[0].event + "Data", {renderResult: renderResult});
		});
		//PubSub.emit(globalConfig.layers[0].event + "Data", {renderResult: renderResult});
		//document.getElementById(globalConfig.layers[0].renderTargetDiv).innerHTML = _.template(globalConfig.layers[0].template, {renderResult: renderResult});		
	},
	template: '<TABLE BORDER=0 WIDTH=600>\
				<A NAME="top"></A>\
				<TR><TD><%= globalConfig.chooseLang("Facility Name", "Nom de l\'installation") %>:</TD><TD><%= renderResult.FacilityName %></TD></TR>\
				<TR><TD><%= globalConfig.chooseLang("Company Name", "Nom de l\'entreprise") %>:</TD><TD><%= renderResult.CompanyName %></TD></TR>\
				<TR><TD><%= globalConfig.chooseLang("Physical Address", "Adresse") %>:</TD><TD><%= renderResult.Address %></TD></TR>\
				<TR><TD><%= globalConfig.chooseLang("Sector", "Secteur") %>:</TD><TD><%= renderResult.Sector %></TD></TR>\
				<TR><TD><%= globalConfig.chooseLang("NPRI ID", "ID INRP") %>:</TD><TD><%= renderResult.NPRIID %></TD></TR>\
				<TR><TD><%= globalConfig.chooseLang("Public Contact", "Personne-ressource") %>:</TD><TD><%= renderResult.PublicContact %><BR><%= renderResult.PublicContactPhone %><BR><A HREF=mailto:<%= renderResult.PublicContactEmail %>><%= renderResult.PublicContactEmail %></A></TD></TR>\
			</TABLE><P>\
			<% if (globalConfig.isEnglish()) {%>\
				<center><strong>Exit Records - All Years</strong></center><br><br>\
				The following Exit Records have been submitted by the facility in lieu of an Annual Report for a substance because it did not meet one or more capture criteria set under the Toxics Reduction Act. Facilities that have submitted an exit record are no longer required to account, plan or report for these substances unless they meet the capture criteria again. <br><br>\
			<% } else {%>\
				<center><strong>Exit Records - All Years</strong></center><br><br>\
				The following Exit Records have been submitted by the facility in lieu of an Annual Report for a substance because it did not meet one or more capture criteria set under the Toxics Reduction Act. Facilities that have submitted an exit record are no longer required to account, plan or report for these substances unless they meet the capture criteria again. <br><br>\
			<% } %>\
			<TABLE class="fishTable" BORDER="1" WIDTH="600">\
				<TR>\
					<TH WIDTH=20%><%= globalConfig.chooseLang("Date", "Date") %></TD>\
					<TH WIDTH=30%><%= globalConfig.chooseLang("Substances", "Substances") %></TD>\
					<TH WIDTH=20%><%= globalConfig.chooseLang("CAS Number", "CAS Number") %></TD>\
					<TH WIDTH=30%><%= globalConfig.chooseLang("Reasons", "Reasons") %></TD>\
				</TR>\
	            <% _.each(_.keys(renderResult.dateSubstanceObject), function(dateofSubmission,key,list){%>\
					<TR>\
						<TD WIDTH=20% rowspan="<%= renderResult.dateSubstanceObject[dateofSubmission].length %>"><%= dateofSubmission %></TD>\
						<TD WIDTH=30%><%= renderResult.dateSubstanceObject[dateofSubmission][0].SubstanceName %></TD>\
						<TD WIDTH=20%><%= renderResult.dateSubstanceObject[dateofSubmission][0].SubstanceCAS %></TD>\
						<TD WIDTH=30%><%= renderResult.dateSubstanceObject[dateofSubmission][0].Reason %></TD>\
					</TR>\
					<% renderResult.dateSubstanceObject[dateofSubmission].shift();_.each(renderResult.dateSubstanceObject[dateofSubmission], function(attr,key,list){%>\
						<TR>\
							<TD WIDTH=30%><%= attr.SubstanceName %></TD>\
							<TD WIDTH=20%><%= attr.SubstanceCAS %></TD>\
							<TD WIDTH=30%><%= attr.Reason %></TD>\
						</TR>\
					<%});%>\
				<%});%>\
			</TABLE>\
		<BR><BR><%= globalConfig.chooseLang("An <A HREF=\'TRAIS_Accessible.htm\'>accessible copy of the reports</A> for all facilities is available.", "Les rapports d\'installations ou d\'entreprise sont aussi disponibles sous <A HREF=\'TRAIS_Accessible.htm\'>format texte-pur</A>.") %>'
},{
	url: globalConfig.url  + "/8",
	renderTargetDiv: "exemptionRecords",
	event: "reportReady",
	where: "UniqueFacilityID = '" + QueryString.id + "'",
	outFields: ["FacilityName", "StreetAddressPhysicalAddress", "MunicipalityCityPhysicalAddress", "OrganizationName", "NPRIID", "NAICS", "PublicContactFullName", "PublicContactTelephone", "PublicContactEmail", "HighestRankingEmployee", "SubstanceName", "SubstanceCAS", "DateofSubmission", "Reason", "DescriptionofCircumstances"],
	processResults: function (fs) {
		var dateList = _.uniq(_.map(fs, function(feature) {
			return feature.attributes.DateofSubmission;
		}));
		var substanceList = new Array(dateList.length).fill([]);
		var dateSubstanceObject = _.object(dateList, substanceList);
		_.each(fs, function(feature) {
			dateSubstanceObject[feature.attributes.DateofSubmission].push(feature.attributes);
		});
		_.each(dateList, function(date) {
			dateSubstanceObject[date].sort(function(a,b){
				if (a.SubstanceName > b.SubstanceName) {
					return 1;
				}
				if (a.SubstanceName < b.SubstanceName) {
					return -1;
				}
				return 0;
			});
		});
		var attr = fs[0].attributes;
		var renderResult = {
			ReportingPeriod: QueryString.year, 
			FacilityName: attr.FacilityName,
			CompanyName: attr.OrganizationName,
			Address: attr.StreetAddressPhysicalAddress + " / " + attr.MunicipalityCityPhysicalAddress,
			//Sector: attr.Sector,
			NPRIID: attr.NPRIID,
			PublicContact: (attr.PublicContactFullName === null) ?  "[<I>" + globalConfig.chooseLang("no name available", "Aucun nom disponible") +  "</I>]" : attr.PublicContactFullName,
			PublicContactPhone: attr.PublicContactTelephone,
			PublicContactEmail: attr.PublicContactEmail,
			HighestRankingEmployee: attr.HighestRankingEmployee,
			dateSubstanceObject: dateSubstanceObject
		};
		var NAICS = attr.NAICS;
		var NAICSLayerID = "4";
		var NAICSQueryLayer = new gmaps.ags.Layer(globalConfig.url  + "/" + NAICSLayerID);
		NAICSQueryLayer.query({
			returnGeometry: false,
			where: "NAICS=" + NAICS,
			outFields: ["Name"]
		}, function (rs) {
			renderResult.Sector = NAICS + " - " + rs.features[0].attributes.Name;
			PubSub.emit(globalConfig.layers[0].event + "Data", {renderResult: renderResult});
		});
		//PubSub.emit(globalConfig.layers[0].event + "Data", {renderResult: renderResult});
		//document.getElementById(globalConfig.layers[0].renderTargetDiv).innerHTML = _.template(globalConfig.layers[0].template, {renderResult: renderResult});		
	},
	template: '<TABLE BORDER=0 WIDTH=600>\
				<A NAME="top"></A>\
				<TR><TD><%= globalConfig.chooseLang("Facility Name", "Nom de l\'installation") %>:</TD><TD><%= renderResult.FacilityName %></TD></TR>\
				<TR><TD><%= globalConfig.chooseLang("Company Name", "Nom de l\'entreprise") %>:</TD><TD><%= renderResult.CompanyName %></TD></TR>\
				<TR><TD><%= globalConfig.chooseLang("Physical Address", "Adresse") %>:</TD><TD><%= renderResult.Address %></TD></TR>\
				<TR><TD><%= globalConfig.chooseLang("Sector", "Secteur") %>:</TD><TD><%= renderResult.Sector %></TD></TR>\
				<TR><TD><%= globalConfig.chooseLang("NPRI ID", "ID INRP") %>:</TD><TD><%= renderResult.NPRIID %></TD></TR>\
				<TR><TD><%= globalConfig.chooseLang("Public Contact", "Personne-ressource") %>:</TD><TD><%= renderResult.PublicContact %><BR><%= renderResult.PublicContactPhone %><BR><A HREF=mailto:<%= renderResult.PublicContactEmail %>><%= renderResult.PublicContactEmail %></A></TD></TR>\
			</TABLE><P>\
			<% if (globalConfig.isEnglish()) {%>\
				<center><strong>Exit Records - All Years</strong></center><br><br>\
				The following Exit Records have been submitted by the facility in lieu of an Annual Report for a substance because it did not meet one or more capture criteria set under the Toxics Reduction Act. Facilities that have submitted an exit record are no longer required to account, plan or report for these substances unless they meet the capture criteria again. <br><br>\
			<% } else {%>\
				<center><strong>Exit Records - All Years</strong></center><br><br>\
				The following Exit Records have been submitted by the facility in lieu of an Annual Report for a substance because it did not meet one or more capture criteria set under the Toxics Reduction Act. Facilities that have submitted an exit record are no longer required to account, plan or report for these substances unless they meet the capture criteria again. <br><br>\
			<% } %>\
			<TABLE class="fishTable" BORDER="1" WIDTH="600">\
				<TR>\
					<TH WIDTH=20%><%= globalConfig.chooseLang("Date", "Date") %></TD>\
					<TH WIDTH=30%><%= globalConfig.chooseLang("Substances", "Substances") %></TD>\
					<TH WIDTH=20%><%= globalConfig.chooseLang("CAS Number", "CAS Number") %></TD>\
					<TH WIDTH=30%><%= globalConfig.chooseLang("Reasons", "Reasons") %></TD>\
				</TR>\
	            <% _.each(_.keys(renderResult.dateSubstanceObject), function(dateofSubmission,key,list){%>\
					<TR>\
						<TD WIDTH=20% rowspan="<%= renderResult.dateSubstanceObject[dateofSubmission].length %>"><%= dateofSubmission %></TD>\
						<TD WIDTH=30%><%= renderResult.dateSubstanceObject[dateofSubmission][0].SubstanceName %></TD>\
						<TD WIDTH=20%><%= renderResult.dateSubstanceObject[dateofSubmission][0].SubstanceCAS %></TD>\
						<TD WIDTH=30%><%= renderResult.dateSubstanceObject[dateofSubmission][0].Reason %></TD>\
					</TR>\
					<% renderResult.dateSubstanceObject[dateofSubmission].shift();_.each(renderResult.dateSubstanceObject[dateofSubmission], function(attr,key,list){%>\
						<TR>\
							<TD WIDTH=30%><%= attr.SubstanceName %></TD>\
							<TD WIDTH=20%><%= attr.SubstanceCAS %></TD>\
							<TD WIDTH=30%><%= attr.Reason %></TD>\
						</TR>\
					<%});%>\
				<%});%>\
			</TABLE>\
		<BR><BR><%= globalConfig.chooseLang("An <A HREF=\'TRAIS_Accessible.htm\'>accessible copy of the reports</A> for all facilities is available.", "Les rapports d\'installations ou d\'entreprise sont aussi disponibles sous <A HREF=\'TRAIS_Accessible.htm\'>format texte-pur</A>.") %>'
}];
