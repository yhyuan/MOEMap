globalConfig.processEmptyValue = function(str) {
	if (str.length === 0){
		return "&nbsp;";
	}
	return str;
};
globalConfig.testedFieldsForComparisonTable = ["UseEnteredtheFacAnnPctChange", "CreatedAnnualPercentageChange", "ConinProdAnnPctChange", "ReasonsforChangeTRAQnt", "ReleaseAirAnnPctChange", "ReleaseWaterAnnPctChange", "ReleaseLandAnnPctChange", "ReasonsforChangeAllMedia", "DispOnSiteAnnPctChangeHTML", "DispOffSiteAnnPctChangeHTML", "ReasonsforChangeDisposals", "RecycledOffSiteAnnPctChange", "ReasonsForChangeRecycling"];
globalConfig.testedFieldsForProgressOnPlanTable = ["NoOptionsIdentifiedforUseorCre","ToxicsReductionCategory","OptionActivityTaken","OptImpAmtofReduinUse","OptImpAmtofReduinCreation","OptImpAmtofReduinConinProduct","OptImpAmtofReduinReleasetoAir","OptImpAmtofReduinReleasetoWate","OptImpAmtofReduinReleasetoLand","OptImpAmtofReduinDisponSite","OptImpAmtofReduinDispoffsite","OptImpAmtofReduinRecycled","Willthetimelinesbemet","DescriptionofAdditionalAction","AmendmentsDescription"];
globalConfig.calculateValuesLength = function(fields, attr) {	
	return _.reduce(_.map(fields, function(field) {
		return attr[field].length;
	}), function(memo, num){ return memo + num; }, 0)
};

globalConfig.layers = [{
	url: globalConfig.url  + "/2",
	renderTargetDiv: "target",
	event: "reportReady",
	where: QueryString.hasOwnProperty("year") ? ("(UniqueFacilityID = '" + QueryString.id + "') AND (ReportingPeriod = '" + QueryString.year + "')"):("(UniqueFacilityID = '" + QueryString.id + "')"),
	outFields: QueryString.hasOwnProperty("year") ? ["FacilityName", "StreetAddressPhysicalAddress", "MunicipalityCityPhysicalAddres", "OrganizationName", "NPRIID", "NAICS", "PublicContactFullName", "PublicContactTelephone", "PublicContactEmail", "HighestRankingEmployee", "SubstanceName", "Units", "EnteredtheFacilityUsed", "Created", "ContainedinProduct", "ReleasestoAir", "ReleasestoWater", "ReleasestoLand", "DisposalOnSite", "DisposalOffSite", "RecycleOffSite", "UseEnteredtheFacAnnPctChange", "CreatedAnnualPercentageChange", "ConinProdAnnPctChange", "ReasonsforChangeTRAQnt", "ReleaseAirAnnPctChange", "ReleaseWaterAnnPctChange", "ReleaseLandAnnPctChange", "ReasonsforChangeAllMedia", "DispOnSiteAnnPctChangeHTML", "DispOffSiteAnnPctChangeHTML", "OffSiteTransfAnnPctChange", "ReasonsforChangeDisposals", "RecycledOffSiteAnnPctChange", "ReasonsForChangeRecycling", "NoOptionsIdentifiedforUseorCre", "ToxicsReductionCategory", "OptionActivityTaken", "OptImpAmtofReduinUse", "OptImpAmtofReduinCreation", "OptImpAmtofReduinConinProduct", "OptImpAmtofReduinReleasetoAir", "OptImpAmtofReduinReleasetoWate", "OptImpAmtofReduinReleasetoLand", "OptImpAmtofReduinDisponSite", "OptImpAmtofReduinDispoffsite", "OptImpAmtofReduinRecycled", "Willthetimelinesbemet", "DescriptionofAdditionalAction", "AmendmentsDescription"] : ["UniqueFacilityID", "ReportingPeriod"],
	processResults: function (fs) {
		var calculateRenderResultwithYear = function (fs) {
			var attr = fs[0].attributes;
			var NAICS = attr.NAICS;
			var renderResult = {
				ReportingPeriod: QueryString.year, 
				FacilityName: attr.FacilityName,
				CompanyName: attr.OrganizationName,
				Address: attr.StreetAddressPhysicalAddress + " / " + attr.MunicipalityCityPhysicalAddres,
				NPRIID: attr.NPRIID,
				PublicContact: (attr.PublicContactFullName === null) ?  "[<I>" + globalConfig.chooseLang("no name available", "Aucun nom disponible") +  "</I>]" : attr.PublicContactFullName,
				PublicContactPhone: attr.PublicContactTelephone,
				PublicContactEmail: attr.PublicContactEmail,
				HighestRankingEmployee: attr.HighestRankingEmployee
			};
			if((fs.length > 1) || (fs[0].attributes.SubstanceName  !== null)){
				var groupbyResults = _.groupBy(_.map(fs, function(feature) {
						return feature.attributes
					}), function(attributes){
						return attributes.SubstanceName;
				});
				renderResult.Substances = _.map(_.values(groupbyResults), function(array) {
					var attr = array[0];
					return {
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
						UseEnteredtheFacAnnPctChange: attr.UseEnteredtheFacAnnPctChange,
						CreatedAnnualPercentageChange: attr.CreatedAnnualPercentageChange,
						ConinProdAnnPctChange: attr.ConinProdAnnPctChange,
						ReasonsforChangeTRAQnt: attr.ReasonsforChangeTRAQnt,
						ReleaseAirAnnPctChange: attr.ReleaseAirAnnPctChange,
						ReleaseWaterAnnPctChange: attr.ReleaseWaterAnnPctChange,
						ReleaseLandAnnPctChange: attr.ReleaseLandAnnPctChange,
						ReasonsforChangeAllMedia: attr.ReasonsforChangeAllMedia,
						DispOnSiteAnnPctChangeHTML: attr.DispOnSiteAnnPctChangeHTML,
						DispOffSiteAnnPctChangeHTML: attr.DispOffSiteAnnPctChangeHTML,
						OffSiteTransfAnnPctChange: attr.OffSiteTransfAnnPctChange,
						ReasonsforChangeDisposals: attr.ReasonsforChangeDisposals,
						RecycledOffSiteAnnPctChange: attr.RecycledOffSiteAnnPctChange,
						ReasonsForChangeRecycling: attr.ReasonsForChangeRecycling,
						NoOptionsIdentifiedforUseorCre: attr.NoOptionsIdentifiedforUseorCre,
						Willthetimelinesbemet : attr.Willthetimelinesbemet,
						DescriptionofAdditionalAction : attr.DescriptionofAdditionalAction,
						AmendmentsDescription: attr.AmendmentsDescription,
						isComparisonTableWide: (globalConfig.calculateValuesLength(globalConfig.testedFieldsForComparisonTable, attr) === 0) ? false : true,
						isProgressOnPlanVisible: (globalConfig.calculateValuesLength(globalConfig.testedFieldsForProgressOnPlanTable, attr) === 0) ? false : true,
						options: _.map(array, function(item) {
							return {
								ToxicsReductionCategory: item.ToxicsReductionCategory,
								OptionActivityTaken: item.OptionActivityTaken,
								OptImpAmtofReduinUse: item.OptImpAmtofReduinUse,
								OptImpAmtofReduinCreation: item.OptImpAmtofReduinCreation,
								OptImpAmtofReduinConinProduct: item.OptImpAmtofReduinConinProduct,
								OptImpAmtofReduinReleasetoAir: item.OptImpAmtofReduinReleasetoAir,
								OptImpAmtofReduinReleasetoWate: item.OptImpAmtofReduinReleasetoWate,
								OptImpAmtofReduinReleasetoLand : item.OptImpAmtofReduinReleasetoLand,
								OptImpAmtofReduinDisponSite : item.OptImpAmtofReduinDisponSite,
								OptImpAmtofReduinDispoffsite : item.OptImpAmtofReduinDispoffsite,
								OptImpAmtofReduinRecycled : item.OptImpAmtofReduinRecycled								
							};
						})
					}
				});
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
				<A HREF="<%= globalConfig.annualReportURL %>?id=<%= renderResult.UniqueFacilityID %>&year=<%= reportingPeriod %>"><%= globalConfig.chooseLang(reportingPeriod + " Annual Report", "Rapport annuel " + reportingPeriod) %> </A><br>\
				<%});%>\
			<% } else {%>\
			\
			<A NAME="top"></A>\
			<H2><%= globalConfig.chooseLang("Annual Report for the " + renderResult.ReportingPeriod + " Reporting Period", "Rapport annuel sur la p&eacute;riode de d&eacute;claration de " + renderResult.ReportingPeriod) %></H2><BR>\
			<%= globalConfig.chooseLang("Facility Name", "Nom de l\'installation") %>: <strong><%= renderResult.FacilityName %></strong><BR>\
			<%= globalConfig.chooseLang("Company Name", "Nom de l\'entreprise") %>: <strong><%= renderResult.CompanyName %></strong><BR>\
			<%= globalConfig.chooseLang("Physical Address", "Adresse") %>: <strong><%= renderResult.Address %></strong><BR>\
			<%= globalConfig.chooseLang("Sector", "Secteur") %>: <strong><%= renderResult.Sector %></strong><BR>\
			<%= globalConfig.chooseLang("NPRI ID", "ID INRP") %>: <strong><%= renderResult.NPRIID %></strong><BR>\
			<%= globalConfig.chooseLang("Public Contact", "Personne-ressource") %>: <strong><%= renderResult.PublicContact %><BR>&nbsp&nbsp&nbsp&nbsp&nbsp<%= renderResult.PublicContactPhone %><BR>&nbsp&nbsp&nbsp&nbsp&nbsp<A HREF=mailto:<%= renderResult.PublicContactEmail %>><%= renderResult.PublicContactEmail %></A></strong><BR>\
			<%= globalConfig.chooseLang("Certified by", "Certifi&eacute; par") %> <strong><%= renderResult.HighestRankingEmployee %></strong>, <%= globalConfig.chooseLang("Highest Ranking Employee", "employ&eacute; le plus &eacute;lev&eacute; hi&eacute;rarchiquement") %><BR><BR>\
			<A NAME="subst"></A><%= ((renderResult.hasOwnProperty("Substances") && renderResult.Substances.length > 0)) ? globalConfig.chooseLang("List of Substances:", "Liste des substances:") : "" %>\
			<%= _.map(renderResult.Substances, function(substance) {return \'<A HREF="#\' + substance.Name + \'">\' + substance.Name + \'</A>\';}).join(", ") %>\
			<BR>\
		<P>\
			<%= ((renderResult.hasOwnProperty("Substances") && renderResult.Substances.length > 0)) ? "" : globalConfig.chooseLang("There is no substance renderResultrmation provided from this facility.<BR>", "Il n\'y a pas d\'information sur les substances toxiques fournie par cette entreprise ou installation<BR>") %>\
            <%\
                _.each(renderResult.Substances,function(substance,key,list){\
            %>\
				<A NAME="<%= substance.Name %>"></A><U><B><%= substance.Name %></B></U><P>\
				<%\
					if (substance.isComparisonTableWide){\
				%>\
				<TABLE class="noStripes">\
						<TR>\
							<TH WIDTH=25%>&nbsp;</TH>\
							<TH WIDTH=25%><%= renderResult.ReportingPeriod %><BR><%= globalConfig.chooseLang("Amount Reported", "Quantit&eacute; d&eacute;clar&eacute;e") %> <BR>(<%= substance.Units %>)</TH>\
							<TH WIDTH=25%><%= globalConfig.chooseLang("Change from Previous Annual Report<BR>(%)", "Modification par rapport au rapport annuel pr&eacute;c&eacute;dent<BR>(%)") %> </TH>\
							<TH WIDTH=25%><%= globalConfig.chooseLang("Reasons for Change", "Raisons de la variation") %></TH>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Entered the Facility (Used)", "Ayant p&eacute;n&eacute;tr&eacute; dans l’installation (Utilis&eacute;e)") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Used) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.UseEnteredtheFacAnnPctChange) %></TD>\
							<TD rowspan="3"><%= globalConfig.processEmptyValue(substance.ReasonsforChangeTRAQnt) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Created", "Cr&eacute;&eacute;e") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Created) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.CreatedAnnualPercentageChange) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Contained in Product", "Contenue dans un produit") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Contained) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.ConinProdAnnPctChange) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released to Air", "Rejet&eacute;e dans l’air") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Air) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.ReleaseAirAnnPctChange) %></TD>\
							<TD rowspan="3"><%= globalConfig.processEmptyValue(substance.ReasonsforChangeAllMedia) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released to Water", "Rejet&eacute;e dans l’eau") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Water) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.ReleaseWaterAnnPctChange) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released to Land", "Rejet&eacute;e sur la terre") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.Land) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.ReleaseLandAnnPctChange) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Disposed On-Site", "&Eacute;limin&eacute;e sur place") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.DOnSite) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.DispOnSiteAnnPctChangeHTML) %></TD>\
							<TD rowspan="2"><%= globalConfig.processEmptyValue(substance.ReasonsforChangeDisposals) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Disposed Off-Site", "&Eacute;limin&eacute;e hors site") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.DOffSite) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.DispOffSiteAnnPctChangeHTML) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Recycled Off-Site", "Recycl&eacute;e hors site") %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.ROffSite) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.RecycledOffSiteAnnPctChange) %></TD>\
							<TD><%= globalConfig.processEmptyValue(substance.ReasonsForChangeRecycling) %></TD>\
						</TR>\
					</TABLE>\
				<%\
					} else {\
				%>\
				<TABLE class="noStripes">\
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
					<br><strong><%= globalConfig.chooseLang("Progress Implementing Toxics Reduction Plan", "Progr&egrave;s dans la mise en œuvre du plan de r&eacute;duction de substances toxiques") %></strong><br>\
					<%\
						if (substance.NoOptionsIdentifiedforUseorCre === "Yes") {\
					%>\
						<%= globalConfig.chooseLang("No options to reduce the use or creation of " + substance.Name + " were identified for implementation in the Toxics Reduction Plan.", "Aucune option visant &agrave; r&eacute;duire l’utilisation ou la cr&eacute;ation de " + substance.Name + " n’a &eacute;t&eacute; mentionn&eacute;e en vue de sa mise en œuvre dans le plan de r&eacute;duction de substance toxique.") %><br>\
					<%\
						} else {\
					%>\
						<%= globalConfig.chooseLang("Option(s) to reduce the use or creation of " + substance.Name + " was/were identified for implementation in the Toxics Reduction Plan.", "Une ou plusieurs options visant &agrave; r&eacute;duire l’utilisation ou la cr&eacute;ation de " + substance.Name + " ont &eacute;t&eacute; mentionn&eacute;es en vue de leur mise en œuvre dans le plan de r&eacute;duction de substance toxique.") %>\
				<TABLE class="noStripes">\
						<TR>\
							<TH WIDTH=30%><%= globalConfig.chooseLang("Option Category", "Cat&eacute;gorie d’option") %></TH>\
							<TH WIDTH=30%><%= globalConfig.chooseLang("Option Activity", "Activit&eacute; li&eacute;e &agrave; l’option") %></TH>\
							<TH WIDTH=20%><%= globalConfig.chooseLang("Quantification Type", "Type de quantification") %></TH>\
							<TH WIDTH=20%><%= globalConfig.chooseLang("Reduction achieved in " + renderResult.ReportingPeriod + "<br>(" + substance.Units, "R&eacute;duction atteinte en " + renderResult.ReportingPeriod + "<br><br>(" + substance.Units) %>)</TH>\
						</TR>\
						<%\
							_.each(substance.options,function(option,key,list){\
						%>\
						<TR>\
							<TD rowspan="9"><%= globalConfig.processEmptyValue(option.ToxicsReductionCategory) %></TD>\
							<TD rowspan="9"><%= globalConfig.processEmptyValue(option.OptionActivityTaken) %></TD>\
							<TD><%= globalConfig.chooseLang("Use", "Utilisation") %></TD>\
							<TD><%= globalConfig.processEmptyValue(option.OptImpAmtofReduinUse) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Creation", "Cr&eacute;ation") %></TD>\
							<TD><%= globalConfig.processEmptyValue(option.OptImpAmtofReduinCreation) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Contained in Product", "Contenue dans un produit") %></TD>\
							<TD><%= globalConfig.processEmptyValue(option.OptImpAmtofReduinConinProduct) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released into Air", "Rejet&eacute;e dans l’air") %></TD>\
							<TD><%= globalConfig.processEmptyValue(option.OptImpAmtofReduinReleasetoAir) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released into Water", "Rejet&eacute;e dans l’eau") %></TD>\
							<TD><%= globalConfig.processEmptyValue(option.OptImpAmtofReduinReleasetoWate) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released into Land", "Rejet&eacute;e dans la terre") %></TD>\
							<TD><%= globalConfig.processEmptyValue(option.OptImpAmtofReduinReleasetoLand) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Disposed On-Site", "&Eacute;limin&eacute;e sur place") %></TD>\
							<TD><%= globalConfig.processEmptyValue(option.OptImpAmtofReduinDisponSite) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Disposed Off-Site", "&Eacute;limin&eacute;e hors site") %></TD>\
							<TD><%= globalConfig.processEmptyValue(option.OptImpAmtofReduinDispoffsite) %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Recycled Off-Site", "Recycl&eacute;e hors site") %></TD>\
							<TD><%= globalConfig.processEmptyValue(option.OptImpAmtofReduinRecycled) %></TD>\
						</TR>\
						<%\
							});\
						%>\
						</TABLE>\
						<br><strong><%= globalConfig.chooseLang("Will all planned timelines for reduction be met?", "Tous les d&eacute;lais pr&eacute;vus pour la r&eacute;duction seront-ils respect&eacute;s?") %></strong><br>\
						<%= substance.Willthetimelinesbemet %><br>\
						<%\
							}\
						%><br>\
						<% if (substance.DescriptionofAdditionalAction.length !== 0 || substance.NoOptionsIdentifiedforUseorCre.length !== 0 ) { %>\
							<strong><%= globalConfig.chooseLang("Any actions outside the Toxics Reduction Plan that reduced the use or creation of this substance this year?", "Des mesures prises ind&eacute;pendamment du plan de r&eacute;duction de substance toxique ont-elles permis de r&eacute;duire l’utilisation et la cr&eacute;ation de la substance cette ann&eacute;e?") %></strong><br>\
							<%= (substance.DescriptionofAdditionalAction.length !== 0) ? globalConfig.chooseLang("Yes", "oui") : globalConfig.chooseLang("No", "aucun") %><br>\
						<%\
							}\
						%><br>\
						<% if (substance.AmendmentsDescription.length !== 0 || substance.NoOptionsIdentifiedforUseorCre.length !== 0 ) { %>\
							<strong><%= globalConfig.chooseLang("Any amendment(s) to the Toxics Reduction Plan this year?", "Le plan de r&eacute;duction de substance toxique a-t-il &eacute;t&eacute; modifi&eacute; cette ann&eacute;e?") %></strong><br>\
							<%= (substance.AmendmentsDescription.length !== 0) ? globalConfig.chooseLang("Yes", "oui") : globalConfig.chooseLang("No", "aucun") %><br>\
						<%\
							}\
						%>\
					<%\
					}\
					%>\
				<BR><BR><I><A HREF="<%= globalConfig.dataDownloadURL %>"><%= globalConfig.chooseLang("Full dataset available for download", "Jeu de donn&eacute;es complet disponible en t&eacute;l&eacute;chargement") %></A></I><BR>\
				<A HREF="#top"><%= globalConfig.chooseLang("Back to top", "Haut de la page") %></A><BR><HR WIDTH=100%>\
				</OL><P>\
            <%\
                });\
            %>\
		<% }%>'
}];
