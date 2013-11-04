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
						AmendmentsDescription: attr.AmendmentsDescription
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
				Year<br>\
				<%\
				 _.each(renderResult.reportingPeriods,function(reportingPeriod,key,list){\
				%>\
				<A HREF="TRAIS_Report.htm?id=<%= renderResult.UniqueFacilityID %>&year=<%= reportingPeriod %>"><%= reportingPeriod + " " + globalConfig.chooseLang("Annual Report", "Rapport annuel") %> </A><br>\
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
            <%\
                _.each(renderResult.Substances,function(substance,key,list){\
            %>\
				<A HREF="#<%= substance.Name %>"><%= substance.Name %></A>,\
            <%\
                });\
            %>\
			<TR><TD COLSPAN=2><HR></TD><TR>			\
		</TABLE><P>\
			<%= ((renderResult.hasOwnProperty("Substances") && renderResult.Substances.length > 0)) ? "" : globalConfig.chooseLang("There is no substance renderResultrmation provided from this facility.<BR>", "Il n\'y a pas d\'information sur les substances toxiques fournie par cette entreprise ou installation<BR>") %>\
            <%\
                _.each(renderResult.Substances,function(substance,key,list){\
            %>\
				<A NAME="<%= substance.Name %>"></A><U><B><%= substance.Name %></B></U><P>\
				<TABLE class="fishTable" BORDER=1 WIDTH=600>\
						<TR>\
							<TH WIDTH=25% BGCOLOR=lightgrey>&nbsp;</TH>\
							<TH WIDTH=25% BGCOLOR=lightgrey><%= renderResult.ReportingPeriod %><BR><%= globalConfig.chooseLang("Amount Reported", "Quantit&eacute; d&eacute;clar&eacute;e") %> <BR>(<%= substance.Units %>)</TH>\
							<TH WIDTH=25% BGCOLOR=lightgrey><%= globalConfig.chooseLang("% Change from Previous Annual Report ", "% Change from Previous Annual Report") %> </TH>\
							<TH WIDTH=25% BGCOLOR=lightgrey><%= globalConfig.chooseLang("Reasons for Change", "Reasons for Change") %></TH>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Entered the Facility (Used)", "Quantit&eacute; ayant p&eacute;n&eacute;tr&eacute; l\'installation (utilis&eacute;e)") %></TD>\
							<TD><%= substance.Used %></TD>\
							<TD><%= substance.UseEnteredtheFacilityAnnualPercentageChange %></TD>\
							<TD rowspan="3"><%= substance.ReasonsforChangeTRAQuantifications %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Created", "Quantit&eacute; cr&eacute;&eacute;e") %></TD>\
							<TD><%= substance.Created %></TD>\
							<TD><%= substance.CreatedAnnualPercentageChange %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Contained in Product", "Quantit&eacute; contenue dans les produits") %><BR>&nbsp;</TD>\
							<TD><%= substance.Contained %></TD>\
							<TD><%= substance.ContainedinProductAnnualPercentageChange %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released to Air", "Quantit&eacute; &eacute;mise dans l\'air") %><BR></TD>\
							<TD><%= substance.Air %></TD>\
							<TD><%= substance.ReleasestoAirAnnualPercentageChange %></TD>\
							<TD rowspan="3"><%= substance.ReasonsforChangeAllMedia %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released to Water", "Quantit&eacute; rejet&eacute;e dans l\'eau") %></TD>\
							<TD><%= substance.Water %></TD>\
							<TD><%= substance.ReleasestoWaterAnnualPercentageChange %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released to Land", "Quantit&eacute; d&eacute;vers&eacute;e sur les sols") %><BR>&nbsp;</TD>\
							<TD><%= substance.Land %></TD>\
							<TD><%= substance.ReleasestoLandAnnualPercentageChange %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Disposed On-Site", "Quantit&eacute; &eacute;limin&eacute;e dans le site") %></TD>\
							<TD><%= substance.DOnSite %></TD>\
							<TD><%= substance.DisposedOnSiteAnnualPercentageChangeHTMLOnly %></TD>\
							<TD rowspan="2"><%= substance.ReasonsforChangeDisposals %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Disposed Off-Site", "Quantit&eacute; &eacute;limin&eacute;e hors site") %></TD>\
							<TD><%= substance.DOffSite %></TD>\
							<TD><%= substance.DisposedOffSiteAnnualPercentageChangeHTMLOnly %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Recycled Off-Site", "Quantit&eacute; recycl&eacute;e hors site") %></TD>\
							<TD><%= substance.ROffSite %></TD>\
							<TD><%= substance.RecycledOffSiteAnnualPercentageChange %></TD>\
							<TD><%= substance.ReasonsForChangeRecycling %></TD>\
						</TR>\
						</TABLE>\
					<strong><%= globalConfig.chooseLang("Progress Implementing Toxics Reduction Plan", "Progress Implementing Toxics Reduction Plan") %></strong><br>\
					<%\
						if (substance.NoOptionsIdentifiedforUseorCreation === "Yes") {\
					%>\
						<%= globalConfig.chooseLang("No options to reduce the use or creation of " + substance.Name + " were identified for implementation in the Toxics Reduction Plan", "No options to reduce the use or creation of " + substance.Name + " were identified for implementation in the Toxics Reduction Plan") %>\
					<%\
						} else {\
					%>\
						<%= globalConfig.chooseLang("Option(s) to reduce the use or creation of " + substance.Name + " was/were identified for implementation in the Toxics Reduction Plan", "Option(s) to reduce the use or creation of " + substance.Name + " was/were identified for implementation in the Toxics Reduction Plan") %>\
				<TABLE class="fishTable" BORDER=1 WIDTH=600>\
						<TR>\
							<TH WIDTH=10% BGCOLOR=lightgrey><%= globalConfig.chooseLang("Option Category", "Option Category") %></TH>\
							<TH WIDTH=10% BGCOLOR=lightgrey><%= globalConfig.chooseLang("Option Activity", "Option Activity") %></TH>\
							<TH WIDTH=10% BGCOLOR=lightgrey><%= globalConfig.chooseLang("Source", "Source") %></TH>\
							<TH WIDTH=70% BGCOLOR=lightgrey><%= globalConfig.chooseLang("Reduction achieved in " + renderResult.ReportingPeriod + "<br><br>" + substance.Units, "Reduction achieved in " + renderResult.ReportingPeriod + "<br><br>" + substance.Units) %></TH>\
						</TR>\
						<TR>\
							<TD><%= substance.ToxicsReductionCategory %></TD>\
							<TD><%= substance.OptionActivityTaken %></TD>\
							<TD><%= globalConfig.chooseLang("Use", "Use") %></TD>\
							<TD><%= substance.OptionsImplementedAmountofreductioninuse %></TD>\
						</TR>\
						<TR>\
							<TD><%= substance.ToxicsReductionCategory %></TD>\
							<TD><%= substance.OptionActivityTaken %></TD>\
							<TD><%= globalConfig.chooseLang("Creation", "Creation") %></TD>\
							<TD><%= substance.OptionsImplementedAmountofreductionincreation %></TD>\
						</TR>\
						<TR>\
							<TD><%= substance.ToxicsReductionCategory %></TD>\
							<TD><%= substance.OptionActivityTaken %></TD>\
							<TD><%= globalConfig.chooseLang("Contained in Product", "Contained in Product") %></TD>\
							<TD><%= substance.OptionsImplementedAmountofreductionincontainedinproduct %></TD>\
						</TR>\
						<TR>\
							<TD><%= substance.ToxicsReductionCategory %></TD>\
							<TD><%= substance.OptionActivityTaken %></TD>\
							<TD><%= globalConfig.chooseLang("Released into Air", "Released into Air") %></TD>\
							<TD><%= substance.OptionsImplementedAmountofreductioninreleasetoair %></TD>\
						</TR>\
						<TR>\
							<TD><%= substance.ToxicsReductionCategory %></TD>\
							<TD><%= substance.OptionActivityTaken %></TD>\
							<TD><%= globalConfig.chooseLang("Released into Water", "Released into Water") %></TD>\
							<TD><%= substance.OptionsImplementedAmountofreductioninreleasetowater %></TD>\
						</TR>\
						<TR>\
							<TD><%= substance.ToxicsReductionCategory %></TD>\
							<TD><%= substance.OptionActivityTaken %></TD>\
							<TD><%= globalConfig.chooseLang("Released into Land", "Released into Land") %></TD>\
							<TD><%= substance.OptionsImplementedAmountofreductioninreleasetoland %></TD>\
						</TR>\
						<TR>\
							<TD><%= substance.ToxicsReductionCategory %></TD>\
							<TD><%= substance.OptionActivityTaken %></TD>\
							<TD><%= globalConfig.chooseLang("Disposed On-Site", "Disposed On-Site") %></TD>\
							<TD><%= substance.OptionsImplementedAmountofreductionindisposedonsite %></TD>\
						</TR>\
						<TR>\
							<TD><%= substance.ToxicsReductionCategory %></TD>\
							<TD><%= substance.OptionActivityTaken %></TD>\
							<TD><%= globalConfig.chooseLang("Disposed Off-Site", "Disposed Off-Site") %></TD>\
							<TD><%= substance.OptionsImplementedAmountofreductioninthesubstancedisposedoffsite %></TD>\
						</TR>\
						<TR>\
							<TD><%= substance.ToxicsReductionCategory %></TD>\
							<TD><%= substance.OptionActivityTaken %></TD>\
							<TD><%= globalConfig.chooseLang("Recycled Off-Site", "Recycled Off-Site") %></TD>\
							<TD><%= substance.OptionsImplementedAmountofreductioninrecycled %></TD>\
						</TR>\
						</TABLE>\
						<%= globalConfig.chooseLang("Will all planned timelines for reduction be met?", "Will all planned timelines for reduction be met?") %><br>\
						<%= substance.Willthetimelinesbemet %><br>\
						<%= globalConfig.chooseLang("Any actions outside the Toxics Reduction Plan that reduced the use or creation of this substance this year?", "Any actions outside the Toxics Reduction Plan that reduced the use or creation of this substance this year?") %><br>\
						<%= substance.DescriptionofAdditionalAction %><br>\
						<%= globalConfig.chooseLang("Any amendment(s) to the Toxics Reduction Plan this year?", "Any amendment(s) to the Toxics Reduction Plan this year?") %><br>\
						<%= substance.AmendmentsDescription %><br>\
					<%\
						}\
					%>\
				<BR><BR><I><A HREF="http://www.ene.gov.on.ca/environment/<%= globalConfig.chooseLang("en", "fr") %>/resources/collection/data_downloads/index.htm"><%= globalConfig.chooseLang("Download the full dataset", "Ensemble de donn&eacute;es &agrave; t&eacute;l&eacute;charger") %></A></I><BR>\
				<A HREF="#top"><%= globalConfig.chooseLang("Back to top", "Haut de la page") %></A><BR><HR WIDTH=100%>\
				</OL><P>\
            <%\
                });\
            %>\
		<BR><BR><%= globalConfig.chooseLang("An <A HREF=\'TRAIS_Accessible.htm\'>accessible copy of the reports</A> for all facilities is available.", "Les rapports d\'installations ou d\'entreprise sont aussi disponibles sous <A HREF=\'TRAIS_Accessible.htm\'>format texte-pur</A>.") %>\
		<% }%>'
}];
