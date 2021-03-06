globalConfig.processEmptyValue = function(str) {
	if (str.length === 0){
		return "&nbsp;";
	}
	return str;
};
globalConfig.testedFieldsForComparisonTable = ["UseEnteredtheFacilityAnnualPercentageChange", "CreatedAnnualPercentageChange", "ContainedinProductAnnualPercentageChange", "ReasonsforChangeTRAQuantifications", "ReleasestoAirAnnualPercentageChange", "ReleasestoWaterAnnualPercentageChange", "ReleasestoLandAnnualPercentageChange", "ReasonsforChangeAllMedia", "DisposedOnSiteAnnualPercentageChangeHTMLOnly", "DisposedOffSiteAnnualPercentageChangeHTMLOnly", "ReasonsforChangeDisposals", "RecycledOffSiteAnnualPercentageChange", "ReasonsForChangeRecycling"];
globalConfig.testedFieldsForProgressOnPlanTable = ["NoOptionsIdentifiedforUseorCreation","ToxicsReductionCategory","OptionActivityTaken","OptionsImplementedAmountofreductioninuse","OptionsImplementedAmountofreductionincreation","OptionsImplementedAmountofreductionincontainedinproduct","OptionsImplementedAmountofreductioninreleasetoair","OptionsImplementedAmountofreductioninreleasetowater","OptionsImplementedAmountofreductioninreleasetoland","OptionsImplementedAmountofreductionindisposedonsite","OptionsImplementedAmountofreductioninthesubstancedisposedoffsite","OptionsImplementedAmountofreductioninrecycled","Willthetimelinesbemet","DescriptionofAdditionalAction","AmendmentsDescription"];
globalConfig.layers = [{
	url: globalConfig.url  + "/2",
	renderTargetDiv: "target",
	event: "reportReady",
	where: QueryString.hasOwnProperty("year") ? ("(UniqueFacilityID = '" + QueryString.id + "') AND (ReportingPeriod = '" + QueryString.year + "')"):("(UniqueFacilityID = '" + QueryString.id + "')"),
	outFields: QueryString.hasOwnProperty("year") ? ["FacilityName", "StreetAddressPhysicalAddress", "MunicipalityCityPhysicalAddress", "OrganizationName", "NPRIID", "NAICS", "PublicContactFullName", "PublicContactTelephone", "PublicContactEmail", "HighestRankingEmployee", "SubstanceName", "Units", "EnteredtheFacilityUsed", "Created", "ContainedinProduct", "ReleasestoAir", "ReleasestoWater", "ReleasestoLand", "DisposalOnSite", "DisposalOffSite", "RecycleOffSite", "UseEnteredtheFacilityAnnualPercentageChange", "CreatedAnnualPercentageChange", "ContainedinProductAnnualPercentageChange", "ReasonsforChangeTRAQuantifications", "ReleasestoAirAnnualPercentageChange", "ReleasestoWaterAnnualPercentageChange", "ReleasestoLandAnnualPercentageChange", "ReasonsforChangeAllMedia", "DisposedOnSiteAnnualPercentageChangeHTMLOnly", "DisposedOffSiteAnnualPercentageChangeHTMLOnly", "OffSiteTransfersAnnualPercentageChange", "ReasonsforChangeDisposals", "RecycledOffSiteAnnualPercentageChange", "ReasonsForChangeRecycling", "NoOptionsIdentifiedforUseorCreation", "ToxicsReductionCategory", "OptionActivityTaken", "OptionsImplementedAmountofreductioninuse", "OptionsImplementedAmountofreductionincreation", "OptionsImplementedAmountofreductionincontainedinproduct", "OptionsImplementedAmountofreductioninreleasetoair", "OptionsImplementedAmountofreductioninreleasetowater", "OptionsImplementedAmountofreductioninreleasetoland", "OptionsImplementedAmountofreductionindisposedonsite", "OptionsImplementedAmountofreductioninthesubstancedisposedoffsite", "OptionsImplementedAmountofreductioninrecycled", "Willthetimelinesbemet", "DescriptionofAdditionalAction", "AmendmentsDescription"] : ["UniqueFacilityID", "ReportingPeriod"],
	processResults: function (fs) {
		var calculateRenderResultwithYear = function (fs) {
			var attr = fs[0].attributes;
			var NAICS = attr.NAICS;
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
			if((fs.length > 1) || (fs[0].attributes.SubstanceName  !== null)){
				var substances = [];
				for (var i = 0, c = fs.length; i < c; i++) {
					attr = fs[i].attributes;
					var totalLength = 0;
					for(var j = 0, arrlength = globalConfig.testedFieldsForComparisonTable.length; j < arrlength; j++) {
						totalLength = totalLength + attr[globalConfig.testedFieldsForComparisonTable[j]].length;
					}
					var totalLengthPlanTable = 0;
					for(var j = 0, arrlength = globalConfig.testedFieldsForProgressOnPlanTable.length; j < arrlength; j++) {
						totalLengthPlanTable = totalLengthPlanTable + attr[globalConfig.testedFieldsForProgressOnPlanTable[j]].length;
					}					
					var s = {
						Name: attr.SubstanceName,
						Units: attr.Units,
						Used: attr.EnteredtheFacilityUsed,
						Created: attr.Created,
						Contained: attr.ContainedinProduct,
						Air: attr.ReleasestoAir,
						Water: attr.ReleasestoWater,
						Land: attr.ReleasestoLand,
						DOnSite: attr.DisposalOnSite,
						DOffSite: attr.DisposalOffSite,
						ROffSite: attr.RecycleOffSite,
						UseEnteredtheFacilityAnnualPercentageChange: attr.UseEnteredtheFacilityAnnualPercentageChange,
						CreatedAnnualPercentageChange: attr.CreatedAnnualPercentageChange,
						ContainedinProductAnnualPercentageChange: attr.ContainedinProductAnnualPercentageChange,
						ReasonsforChangeTRAQuantifications: attr.ReasonsforChangeTRAQuantifications,
						ReleasestoAirAnnualPercentageChange: attr.ReleasestoAirAnnualPercentageChange,
						ReleasestoWaterAnnualPercentageChange: attr.ReleasestoWaterAnnualPercentageChange,
						ReleasestoLandAnnualPercentageChange: attr.ReleasestoLandAnnualPercentageChange,
						ReasonsforChangeAllMedia: attr.ReasonsforChangeAllMedia,
						DisposedOnSiteAnnualPercentageChangeHTMLOnly: attr.DisposedOnSiteAnnualPercentageChangeHTMLOnly,
						DisposedOffSiteAnnualPercentageChangeHTMLOnly: attr.DisposedOffSiteAnnualPercentageChangeHTMLOnly,
						OffSiteTransfersAnnualPercentageChange: attr.OffSiteTransfersAnnualPercentageChange,
						ReasonsforChangeDisposals: attr.ReasonsforChangeDisposals,
						RecycledOffSiteAnnualPercentageChange: attr.RecycledOffSiteAnnualPercentageChange,
						ReasonsForChangeRecycling: attr.ReasonsForChangeRecycling,
						NoOptionsIdentifiedforUseorCreation: attr.NoOptionsIdentifiedforUseorCreation,
						ToxicsReductionCategory: attr.ToxicsReductionCategory,
						OptionActivityTaken: attr.OptionActivityTaken,
						OptionsImplementedAmountofreductioninuse: attr.OptionsImplementedAmountofreductioninuse,
						OptionsImplementedAmountofreductionincreation: attr.OptionsImplementedAmountofreductionincreation,
						OptionsImplementedAmountofreductionincontainedinproduct: attr.OptionsImplementedAmountofreductionincontainedinproduct,
						OptionsImplementedAmountofreductioninreleasetoair: attr.OptionsImplementedAmountofreductioninreleasetoair,
						OptionsImplementedAmountofreductioninreleasetowater: attr.OptionsImplementedAmountofreductioninreleasetowater,
						OptionsImplementedAmountofreductioninreleasetoland : attr.OptionsImplementedAmountofreductioninreleasetoland,
						OptionsImplementedAmountofreductionindisposedonsite : attr.OptionsImplementedAmountofreductionindisposedonsite,
						OptionsImplementedAmountofreductioninthesubstancedisposedoffsite : attr.OptionsImplementedAmountofreductioninthesubstancedisposedoffsite,
						OptionsImplementedAmountofreductioninrecycled : attr.OptionsImplementedAmountofreductioninrecycled,
						Willthetimelinesbemet : attr.Willthetimelinesbemet,
						DescriptionofAdditionalAction : attr.DescriptionofAdditionalAction,
						AmendmentsDescription: attr.AmendmentsDescription,
						isComparisonTableWide: (totalLength === 0) ? false : true,
						isProgressOnPlanVisible: (totalLengthPlanTable === 0) ? false : true
					};
					substances.push(s);
				}
				renderResult.Substances = substances;
			}
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
		};
		var calculateRenderResult = function (fs) {
			var reportingPeriods  = _.uniq(_.map(fs, function(feature) {
				return feature.attributes.ReportingPeriod;
			}));
			reportingPeriods.sort();
			reportingPeriods.reverse();
			var renderResult = {
				UniqueFacilityID: QueryString.id, 
				reportingPeriods: reportingPeriods
			};
			PubSub.emit(globalConfig.layers[0].event + "Data", {renderResult: renderResult});
		};
		if (QueryString.hasOwnProperty("year")) {
			calculateRenderResultwithYear(fs);
		} else {
			calculateRenderResult(fs);
		}
	},
	template: '<%\
				if (renderResult.hasOwnProperty("reportingPeriods")) {\
				%>\
				<%= globalConfig.chooseLang("Year", "Ann&eacute;e") %><br>\
				<%\
				 _.each(renderResult.reportingPeriods,function(reportingPeriod,key,list){\
				%>\
				<A HREF="TRAIS_Report.htm?id=<%= renderResult.UniqueFacilityID %>&year=<%= reportingPeriod %>"><%= globalConfig.chooseLang(reportingPeriod + " Annual Report", "Rapport annuel " + reportingPeriod) %> </A><br>\
				<%});%>\
			<% } else {%>\
			<TABLE BORDER=0 WIDTH=600>\
			<A NAME="top"></A>\
			<TR><TD COLSPAN=2><CENTER><H2><%= globalConfig.chooseLang("Annual Report for the " + renderResult.ReportingPeriod + " Reporting Period", "Rapport annuel sur la p&eacute;riode de d&eacute;claration de " + renderResult.ReportingPeriod) %></H2></CENTER><P></TD></TR>\
			<TR><TD><%= globalConfig.chooseLang("Facility Name", "Nom de l\'installation") %>:</TD><TD><%= renderResult.FacilityName %></TD></TR>\
			<TR><TD><%= globalConfig.chooseLang("Company Name", "Nom de l\'entreprise") %>:</TD><TD><%= renderResult.CompanyName %></TD></TR>\
			<TR><TD><%= globalConfig.chooseLang("Physical Address", "Adresse") %>:</TD><TD><%= renderResult.Address %></TD></TR>\
			<TR><TD><%= globalConfig.chooseLang("Sector", "Secteur") %>:</TD><TD><%= renderResult.Sector %></TD></TR>\
			<TR><TD><%= globalConfig.chooseLang("NPRI ID", "ID INRP") %>:</TD><TD><%= renderResult.NPRIID %></TD></TR>\
			<TR><TD><%= globalConfig.chooseLang("Public Contact", "Personne-ressource") %>:</TD><TD><%= renderResult.PublicContact %><BR><%= renderResult.PublicContactPhone %><BR><A HREF=mailto:<%= renderResult.PublicContactEmail %>><%= renderResult.PublicContactEmail %></A></TD></TR>\
			<TR><TD COLSPAN=2>&nbsp;<BR><%= globalConfig.chooseLang("Certified by", "Certifi&eacute; par") %> <U><%= renderResult.HighestRankingEmployee %></U>, <%= globalConfig.chooseLang("Highest Ranking Employee", "employ&eacute; le plus &eacute;lev&eacute; hi&eacute;rarchiquement") %><BR>&nbsp;</TD></TR>\
			<TR><TD COLSPAN=2><A NAME="subst"></A><%= ((renderResult.hasOwnProperty("Substances") && renderResult.Substances.length > 0)) ? globalConfig.chooseLang("List of Substances:", "Liste des substances:") : "" %>\
			<%= _.map(renderResult.Substances, function(substance) {return \'<A HREF="#\' + substance.Name + \'">\' + substance.Name + \'</A>\';}).join(", ") %>\
			<TR><TD COLSPAN=2><HR></TD><TR>\
		</TABLE><P>\
			<%= ((renderResult.hasOwnProperty("Substances") && renderResult.Substances.length > 0)) ? "" : globalConfig.chooseLang("There is no substance renderResultrmation provided from this facility.<BR>", "Il n\'y a pas d\'information sur les substances toxiques fournie par cette entreprise ou installation<BR>") %>\
            <%\
                _.each(renderResult.Substances,function(substance,key,list){\
            %>\
				<A NAME="<%= substance.Name %>"></A><U><B><%= substance.Name %></B></U><P>\
				<%\
					if (substance.isComparisonTableWide){\
				%>\
				<TABLE class="TRAISTable">\
						<TR>\
							<TH WIDTH=25%>&nbsp;</TH>\
							<TH WIDTH=25%><%= renderResult.ReportingPeriod %><BR><%= globalConfig.chooseLang("Amount Reported", "Quantit&eacute; d&eacute;clar&eacute;e") %> <BR>(<%= substance.Units %>)</TH>\
							<TH WIDTH=25%><%= globalConfig.chooseLang("% Change from Previous Annual Report ", "Variation en % par rapport au rapport annuel pr&eacute;c&eacute;dent") %> </TH>\
							<TH WIDTH=25%><%= globalConfig.chooseLang("Reasons for Change", "Raisons de la variation") %></TH>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Entered the Facility (Used)", "Ayant p&eacute;n&eacute;tr&eacute; dans l’installation (Utilis&eacute;e)") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Used) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.UseEnteredtheFacilityAnnualPercentageChange) %></TD>\
							<TD rowspan="3"><%= globalConfig.processEmptyValue(substance.ReasonsforChangeTRAQuantifications) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Created", "Cr&eacute;&eacute;e") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Created) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.CreatedAnnualPercentageChange) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Contained in Product", "Contenue dans un produit") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Contained) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.ContainedinProductAnnualPercentageChange) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released to Air", "Rejet&eacute;e dans l’air") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Air) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.ReleasestoAirAnnualPercentageChange) %></TD>\
							<TD rowspan="3"><%= globalConfig.processEmptyValue(substance.ReasonsforChangeAllMedia) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released to Water", "Rejet&eacute;e dans l’eau") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Water) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.ReleasestoWaterAnnualPercentageChange) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released to Land", "Rejet&eacute;e sur la terre") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Land) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.ReleasestoLandAnnualPercentageChange) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Disposed On-Site", "&Eacute;limin&eacute;e sur place") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.DOnSite) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.DisposedOnSiteAnnualPercentageChangeHTMLOnly) %></TD>\
							<TD rowspan="2"><%= globalConfig.processEmptyValue(substance.ReasonsforChangeDisposals) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Disposed Off-Site", "&Eacute;limin&eacute;e hors site") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.DOffSite) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.DisposedOffSiteAnnualPercentageChangeHTMLOnly) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Recycled Off-Site", "Recycl&eacute;e hors site") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.ROffSite) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.RecycledOffSiteAnnualPercentageChange) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.ReasonsForChangeRecycling) %></TD>\
						</TR>\
					</TABLE>\
				<%\
					} else {\
				%>\
				<TABLE class="TRAISTable">\
						<TR>\
							<TH WIDTH=25%>&nbsp;</TH>\
							<TH WIDTH=75%><%= renderResult.ReportingPeriod %><BR><%= globalConfig.chooseLang("Amount Reported", "Quantit&eacute; d&eacute;clar&eacute;e") %> <BR>(<%= substance.Units %>)</TH>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Entered the Facility (Used)", "Ayant p&eacute;n&eacute;tr&eacute; dans l’installation (Utilis&eacute;e)") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Used) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Created", "Cr&eacute;&eacute;e") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Created) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Contained in Product", "Contenue dans un produit") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Contained) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released to Air", "Rejet&eacute;e dans l’air") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Air) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released to Water", "Rejet&eacute;e dans l’eau") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Water) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released to Land", "Rejet&eacute;e sur la terre") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Land) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Disposed On-Site", "&Eacute;limin&eacute;e sur place") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.DOnSite) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Disposed Off-Site", "&Eacute;limin&eacute;e hors site") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.DOffSite) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Recycled Off-Site", "Recycl&eacute;e hors site") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.ROffSite) %></TD>\
						</TR>\
					</TABLE>\
				<%\
					} if (substance.isProgressOnPlanVisible){\
				%>\
					<strong><%= globalConfig.chooseLang("Progress Implementing Toxics Reduction Plan", "Progr&egrave;s dans la mise en œuvre du plan de r&eacute;duction de substances toxiques") %></strong><br>\
					<%\
						if (substance.NoOptionsIdentifiedforUseorCreation === "Yes") {\
					%>\
						<%= globalConfig.chooseLang("No options to reduce the use or creation of " + substance.Name + " were identified for implementation in the Toxics Reduction Plan", "Aucune option visant &agrave; r&eacute;duire l’utilisation ou la cr&eacute;ation de " + substance.Name + " n’a &eacute;t&eacute; mentionn&eacute;e en vue de sa mise en œuvre dans le plan de r&eacute;duction de substance toxique") %>\
					<%\
						} else {\
					%>\
						<%= globalConfig.chooseLang("Option(s) to reduce the use or creation of " + substance.Name + " was/were identified for implementation in the Toxics Reduction Plan", "Une ou plusieurs options visant &agrave; r&eacute;duire l’utilisation ou la cr&eacute;ation de " + substance.Name + " ont &eacute;t&eacute; mentionn&eacute;es en vue de leur mise en œuvre dans le plan de r&eacute;duction de substance toxique") %>\
				<TABLE class="TRAISTable">\
						<TR>\
							<TH WIDTH=30%><%= globalConfig.chooseLang("Option Category", "Cat&eacute;gorie d’option") %></TH>\
							<TH WIDTH=30%><%= globalConfig.chooseLang("Option Activity", "Activit&eacute; li&eacute;e &agrave; l’option") %></TH>\
							<TH WIDTH=20%><%= globalConfig.chooseLang("Source", "Source") %></TH>\
							<TH WIDTH=20%><%= globalConfig.chooseLang("Reduction achieved in " + renderResult.ReportingPeriod + "<br><br>(" + substance.Units, "R&eacute;duction atteinte en " + renderResult.ReportingPeriod + "<br><br>(" + substance.Units) %>)</TH>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.processEmptyValue(substance.ToxicsReductionCategory) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionActivityTaken) %></TD>\
							<TD><%= globalConfig.chooseLang("Use", "Utilisation") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionsImplementedAmountofreductioninuse) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.processEmptyValue(substance.ToxicsReductionCategory) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionActivityTaken) %></TD>\
							<TD><%= globalConfig.chooseLang("Creation", "Cr&eacute;ation") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionsImplementedAmountofreductionincreation) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.processEmptyValue(substance.ToxicsReductionCategory) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionActivityTaken) %></TD>\
							<TD><%= globalConfig.chooseLang("Contained in Product", "Contenue dans un produit") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionsImplementedAmountofreductionincontainedinproduct) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.processEmptyValue(substance.ToxicsReductionCategory) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionActivityTaken) %></TD>\
							<TD><%= globalConfig.chooseLang("Released into Air", "Rejet&eacute;e dans l’air") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionsImplementedAmountofreductioninreleasetoair) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.processEmptyValue(substance.ToxicsReductionCategory) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionActivityTaken) %></TD>\
							<TD><%= globalConfig.chooseLang("Released into Water", "Rejet&eacute;e dans l’eau") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionsImplementedAmountofreductioninreleasetowater) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.processEmptyValue(substance.ToxicsReductionCategory) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionActivityTaken) %></TD>\
							<TD><%= globalConfig.chooseLang("Released into Land", "Rejet&eacute;e dans la terre") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionsImplementedAmountofreductioninreleasetoland) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.processEmptyValue(substance.ToxicsReductionCategory) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionActivityTaken) %></TD>\
							<TD><%= globalConfig.chooseLang("Disposed On-Site", "&Eacute;limin&eacute;e sur place") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionsImplementedAmountofreductionindisposedonsite) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.processEmptyValue(substance.ToxicsReductionCategory) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionActivityTaken) %></TD>\
							<TD><%= globalConfig.chooseLang("Disposed Off-Site", "&Eacute;limin&eacute;e hors site") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionsImplementedAmountofreductioninthesubstancedisposedoffsite) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.processEmptyValue(substance.ToxicsReductionCategory) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionActivityTaken) %></TD>\
							<TD><%= globalConfig.chooseLang("Recycled Off-Site", "Recycl&eacute;e hors site") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.OptionsImplementedAmountofreductioninrecycled) %></TD>\
						</TR>\
						</TABLE>\
						<%= globalConfig.chooseLang("Will all planned timelines for reduction be met?", "Tous les d&eacute;lais pr&eacute;vus pour la r&eacute;duction seront-ils respect&eacute;s?") %><br>\
						<%= substance.Willthetimelinesbemet %><br>\
						<%= globalConfig.chooseLang("Any actions outside the Toxics Reduction Plan that reduced the use or creation of this substance this year?", "Des mesures prises ind&eacute;pendamment du plan de r&eacute;duction de substance toxique ont-elles permis de r&eacute;duire l’utilisation et la cr&eacute;ation de la substance cette ann&eacute;e?") %><br>\
						<%= substance.DescriptionofAdditionalAction %><br>\
						<%= globalConfig.chooseLang("Any amendment(s) to the Toxics Reduction Plan this year?", "Le plan de r&eacute;duction de substance toxique a-t-il &eacute;t&eacute; modifi&eacute; cette ann&eacute;e?") %><br>\
						<%= substance.AmendmentsDescription %><br>\
					<%\
						} }\
					%>\
				<BR><BR><I><A HREF="http://www.ene.gov.on.ca/environment/<%= globalConfig.chooseLang("en", "fr") %>/resources/collection/data_downloads/index.htm"><%= globalConfig.chooseLang("Full dataset available for download", "Jeu de donn&eacute;es complet disponible en t&eacute;l&eacute;chargement") %></A></I><BR>\
				<A HREF="#top"><%= globalConfig.chooseLang("Back to top", "Haut de la page") %></A><BR><HR WIDTH=100%>\
				</OL><P>\
            <%\
                });\
            %>\
		<BR><BR><%= globalConfig.chooseLang("An <A HREF=\'TRAIS_Accessible.htm\'>accessible copy of the reports</A> for all facilities is available.", "Les rapports d\'installations ou d\'entreprise sont aussi disponibles sous <A HREF=\'TRAIS_Accessible.htm\'>format texte-pur</A>.") %>\
		<% }%>'
}];
