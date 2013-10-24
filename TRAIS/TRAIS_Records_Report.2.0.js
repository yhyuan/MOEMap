globalConfig.layerIDs = {
	ExitRecords: "6",
	ExemptionRecords: "8",
	NAICS: "4"
};
globalConfig.facilityInfoFields = ["FacilityName", "StreetAddressPhysicalAddress", "MunicipalityCityPhysicalAddress", "OrganizationName", "NPRIID", "NAICS", "PublicContactFullName", "PublicContactTelephone", "PublicContactEmail", "HighestRankingEmployee"];
globalConfig.convertDateFormat = function(date) {
	var items = date.split("/");
	var monthDict = {
		"01": "Jan",
		"02": "Feb",
		"03": "Mar",
		"04": "Apr",		
		"05": "May",
		"06": "Jun",		
		"07": "Jul",
		"08": "Aug",		
		"09": "Sep",
		"10": "Oct",
		"11": "Nov",
		"12": "Dec"
	};
	return "<" + items[0] + ", " + monthDict[items[1]] + ", " + items[2] + ">"
};
globalConfig.layers = [{
	url: globalConfig.url  + "/" + globalConfig.layerIDs.ExitRecords,
	renderTargetDiv: "facilityInfo",
	event: "facilityInfoReady",
	where: "UniqueFacilityID = '" + QueryString.id + "'",
	outFields: globalConfig.facilityInfoFields,
	processResults: function (fs) {
		var processFeatures = function (fs) {
			var attr = fs[0].attributes;
			var renderResult = {
				ReportingPeriod: QueryString.year, 
				FacilityName: attr.FacilityName,
				CompanyName: attr.OrganizationName,
				Address: attr.StreetAddressPhysicalAddress + " / " + attr.MunicipalityCityPhysicalAddress,
				NPRIID: attr.NPRIID,
				PublicContact: (attr.PublicContactFullName === null) ?  "[<I>" + globalConfig.chooseLang("no name available", "Aucun nom disponible") +  "</I>]" : attr.PublicContactFullName,
				PublicContactPhone: attr.PublicContactTelephone,
				PublicContactEmail: attr.PublicContactEmail,
				HighestRankingEmployee: attr.HighestRankingEmployee
			};
			var NAICS = attr.NAICS;
			var NAICSQueryLayer = new gmaps.ags.Layer(globalConfig.url  + "/" + globalConfig.layerIDs.NAICS);
			NAICSQueryLayer.query({
				returnGeometry: false,
				where: "NAICS=" + NAICS,
				outFields: ["Name"]
			}, function (rs) {
				renderResult.Sector = NAICS + " - " + rs.features[0].attributes.Name;
				PubSub.emit(globalConfig.layers[0].event + "Data", {renderResult: renderResult});
			});
		};
		if ((!!fs) & Array.isArray(fs) & (fs.length > 0)) {
			processFeatures(fs);
		} else {
			var layer = new gmaps.ags.Layer(globalConfig.url  + "/" + globalConfig.layerIDs.ExemptionRecords);
			layer.query({
				returnGeometry: false,
				where: "UniqueFacilityID = '" + QueryString.id + "'",
				outFields: globalConfig.facilityInfoFields
			}, function (rs) {
				processFeatures(rs.features);
			});
		}
	},
	template: '<TABLE BORDER=0 WIDTH=600>\
				<A NAME="top"></A>\
				<TR><TD><%= globalConfig.chooseLang("Facility Name", "Nom de l\'installation") %>:</TD><TD><%= renderResult.FacilityName %></TD></TR>\
				<TR><TD><%= globalConfig.chooseLang("Company Name", "Nom de l\'entreprise") %>:</TD><TD><%= renderResult.CompanyName %></TD></TR>\
				<TR><TD><%= globalConfig.chooseLang("Physical Address", "Adresse") %>:</TD><TD><%= renderResult.Address %></TD></TR>\
				<TR><TD><%= globalConfig.chooseLang("Sector", "Secteur") %>:</TD><TD><%= renderResult.Sector %></TD></TR>\
				<TR><TD><%= globalConfig.chooseLang("NPRI ID", "ID INRP") %>:</TD><TD><%= renderResult.NPRIID %></TD></TR>\
				<TR><TD><%= globalConfig.chooseLang("Public Contact", "Personne-ressource") %>:</TD><TD><%= renderResult.PublicContact %><BR><%= renderResult.PublicContactPhone %><BR><A HREF=mailto:<%= renderResult.PublicContactEmail %>><%= renderResult.PublicContactEmail %></A></TD></TR>\
			</TABLE><P>'
},{
	url: globalConfig.url  + "/" + globalConfig.layerIDs.ExitRecords,
	renderTargetDiv: "exitRecords",
	event: "exitRecordsReady",
	where: "UniqueFacilityID = '" + QueryString.id + "'",
	outFields: ["SubstanceName", "SubstanceCAS", "DateofSubmission", "Reason", "DescriptionofCircumstances"],
	processResults: function (fs) {
		if ((!!fs) & Array.isArray(fs) & (fs.length > 0)) {
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
			var renderResult = {
				dateSubstanceObject: dateSubstanceObject
			};
			PubSub.emit(globalConfig.layers[1].event + "Data", {renderResult: renderResult});
		}
	},
	template: '<% if (globalConfig.isEnglish()) {%>\
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
						<TD WIDTH=20% rowspan="<%= renderResult.dateSubstanceObject[dateofSubmission].length %>"><%= globalConfig.convertDateFormat(dateofSubmission) %></TD>\
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
		<BR><BR><I><A HREF="http://www.ene.gov.on.ca/environment/<%= globalConfig.chooseLang("en", "fr") %>/resources/collection/data_downloads/index.htm"><%= globalConfig.chooseLang("Download the full dataset", "Ensemble de donn&eacute;es &agrave; t&eacute;l&eacute;charger") %></A></I><BR>'
},{
	url: globalConfig.url  + "/" + globalConfig.layerIDs.ExemptionRecords,
	renderTargetDiv: "exemptionRecords",
	event: "exemptionRecordsReady",
	where: "UniqueFacilityID = '" + QueryString.id + "'",
	outFields: ["SubstanceName", "DateofSubmission", "RecordRank"],
	processResults: function (fs) {
		if ((!!fs) & Array.isArray(fs) & (fs.length > 0)) {
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
					if (a.RecordRank > b.RecordRank) {
						return 1;
					}
					if (a.RecordRank < b.RecordRank) {
						return -1;
					}
					return 0;
				});
			});
			var renderResult = {
				dateSubstanceObject: dateSubstanceObject
			};
			PubSub.emit(globalConfig.layers[2].event + "Data", {renderResult: renderResult});
		}
	},
	template: '<% if (globalConfig.isEnglish()) {%>\
				<center><strong>Exemption Records – All Years</strong></center><br><br>\
				The following Exemption Records have been submitted by the facility in lieu of an Annual Report for congeners of dioxins and furans, or hexachlorobenzene because the facility has determined through monitoring or source testing that these substances were below the capture criteria set out in the most recent National Pollutant Release Inventory (NPRI) Gazette Notice. <br><br>\
				After a facility has submitted an exemption record for the substance for three (3) consecutive years, they no longer have to submit these records.  In addition, after a facility has submitted the first exemption record, they are no longer required to account, plan or submit an annual report for these substances unless they meet the capture criteria again. <br><br>\
			<% } else {%>\
				<center><strong>Exemption Records – All Years</strong></center><br><br>\
				The following Exemption Records have been submitted by the facility in lieu of an Annual Report for congeners of dioxins and furans, or hexachlorobenzene because the facility has determined through monitoring or source testing that these substances were below the capture criteria set out in the most recent National Pollutant Release Inventory (NPRI) Gazette Notice. <br><br>\
				After a facility has submitted an exemption record for the substance for three (3) consecutive years, they no longer have to submit these records.  In addition, after a facility has submitted the first exemption record, they are no longer required to account, plan or submit an annual report for these substances unless they meet the capture criteria again. <br><br>\
			<% } %>\
			<TABLE class="fishTable" BORDER="1" WIDTH="600">\
				<TR>\
					<TH WIDTH=30%><%= globalConfig.chooseLang("Date", "Date") %></TD>\
					<TH WIDTH=30%><%= globalConfig.chooseLang("Substances", "Substances") %></TD>\
					<TH WIDTH=30%><%= globalConfig.chooseLang("Record Rank ", "Record Rank ") %></TD>\
				</TR>\
	            <% _.each(_.keys(renderResult.dateSubstanceObject), function(dateofSubmission,key,list){%>\
					<TR>\
						<TD WIDTH=30% rowspan="<%= renderResult.dateSubstanceObject[dateofSubmission].length %>"><%= globalConfig.convertDateFormat(dateofSubmission) %></TD>\
						<TD WIDTH=30%><%= renderResult.dateSubstanceObject[dateofSubmission][0].SubstanceName %></TD>\
						<TD WIDTH=30%><%= renderResult.dateSubstanceObject[dateofSubmission][0].RecordRank %></TD>\
					</TR>\
					<% renderResult.dateSubstanceObject[dateofSubmission].shift();_.each(renderResult.dateSubstanceObject[dateofSubmission], function(attr,key,list){%>\
						<TR>\
							<TD WIDTH=30%><%= attr.SubstanceName %></TD>\
							<TD WIDTH=30%><%= attr.RecordRank %></TD>\
						</TR>\
					<%});%>\
				<%});%>\
			</TABLE>\
		<BR><BR><I><A HREF="http://www.ene.gov.on.ca/environment/<%= globalConfig.chooseLang("en", "fr") %>/resources/collection/data_downloads/index.htm"><%= globalConfig.chooseLang("Download the full dataset", "Ensemble de donn&eacute;es &agrave; t&eacute;l&eacute;charger") %></A></I><BR>'
}];
