globalConfig.TRAIS_PlanSummaries_Report = "TRAIS_PlanSummaries_Report.htm";
globalConfig.layers = [{
	url: globalConfig.url  + "/5",
	renderTargetDiv: "target",
	event: "reportReady",
	where: QueryString.hasOwnProperty("year") ? ("(UniqueFacilityID = '" + QueryString.id + "') AND (ReportingPeriod = '" + QueryString.year + "')"):("(UniqueFacilityID = '" + QueryString.id + "')"),
	outFields: QueryString.hasOwnProperty("year") ? ["FacilityName", "StreetAddressPhysicalAddress", "MunicipalityCityPhysicalAddress", "OrganizationName", "NPRIID", "NAICS", "PublicContactFullName", "PublicContactTelephone", "PublicContactEmail", "HighestRankingEmployee", "SubstanceName", "Units", "VersionofthePlan", "ReasonforNoIntenttoReduceUseText ", "ReasonforNoIntenttoReduceCreationText", "PlanObjectives", "UseReductionQuantityTargetValue", "UseReductionQuantityTargetUnit", "UseReductionTimelineTargetYears", "UseReductionTargetDescription", "CreationReductionQuantityTargetValue", "CreationReductionQuantityTargetUnit", "CreationReductionTimelineTargetYears", "CreationReductionTargetDescription", "ReasonsforUse", "ReasonsforCreation", "StatementNoOptionImplementedYN", "ReasonsNoOptionImplemented", "DescriptionofAnyAdditionalActionsTaken", "OptionReductionCategory", "ActivityTaken", "EstimatedUseReductionPercent", "EstimatedCreationReductionPercent", "EstimatedContainedinProductReductionPercent", "EstimatedAirReleasesReductionPercent", "EstimatedWaterReleasesReductionPercent", "EstimatedLandReleasesReductionPercent", "EstimatedOnsiteDisposalsReductionPercent", "EstimatedOffsiteDisposalsReductionPercent", "EstimatedOffsiteRecyclingReductionPercent"] : ["UniqueFacilityID", "ReportingPeriod"],
	processResults: function (fs) {
		var calculateRenderResultwithYear = function (fs) {
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
			if((fs.length > 1) || (fs[0].attributes.SubstanceName  !== null)){
				var substances = [];
				for (var i = 0, c = fs.length; i < c; i++) {
					attr = fs[i].attributes;
					var s = {
						Name: attr.SubstanceName,
						Units: attr.Units,
						VersionofthePlan: attr.VersionofthePlan,
						ReasonforNoIntenttoReduceUseText: attr.ReasonforNoIntenttoReduceUseText ,
						ReasonforNoIntenttoReduceCreationText: attr.ReasonforNoIntenttoReduceCreationText,
						PlanObjectives: attr.PlanObjectives,
						UseReductionQuantityTargetValue: attr.UseReductionQuantityTargetValue,
						UseReductionQuantityTargetUnit: attr.UseReductionQuantityTargetUnit,
						UseReductionTimelineTargetYears: attr.UseReductionTimelineTargetYears,
						UseReductionTargetDescription: attr.UseReductionTargetDescription,
						CreationReductionQuantityTargetValue: attr.CreationReductionQuantityTargetValue,
						CreationReductionQuantityTargetUnit: attr.CreationReductionQuantityTargetUnit,
						CreationReductionTimelineTargetYears: attr.CreationReductionTimelineTargetYears,
						CreationReductionTargetDescription: attr.CreationReductionTargetDescription,
						ReasonsforUse: attr.ReasonsforUse,
						ReasonsforCreation: attr.ReasonsforCreation,
						StatementNoOptionImplementedYN: attr.StatementNoOptionImplementedYN,
						ReasonsNoOptionImplemented: attr.ReasonsNoOptionImplemented,
						DescriptionofAnyAdditionalActionsTaken: attr.DescriptionofAnyAdditionalActionsTaken,
						OptionReductionCategory: attr.OptionReductionCategory,
						ActivityTaken: attr.ActivityTaken,
						EstimatedUseReductionPercent: attr.EstimatedUseReductionPercent,
						EstimatedCreationReductionPercent: attr.EstimatedCreationReductionPercent,
						EstimatedContainedinProductReductionPercent: attr.EstimatedContainedinProductReductionPercent,
						EstimatedAirReleasesReductionPercent: attr.EstimatedAirReleasesReductionPercent,
						EstimatedWaterReleasesReductionPercent: attr.EstimatedWaterReleasesReductionPercent,
						EstimatedLandReleasesReductionPercent: attr.EstimatedLandReleasesReductionPercent,
						EstimatedOnsiteDisposalsReductionPercent: attr.EstimatedOnsiteDisposalsReductionPercent,
						EstimatedOffsiteDisposalsReductionPercent: attr.EstimatedOffsiteDisposalsReductionPercent,
						EstimatedOffsiteRecyclingReductionPercent: attr.EstimatedOffsiteRecyclingReductionPercent
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
		//console.log(renderResult);
		
		//document.getElementById(globalConfig.layers[0].renderTargetDiv).innerHTML = _.template(globalConfig.layers[0].template, {renderResult: renderResult});		
	},
	template: '<%\
				if (renderResult.hasOwnProperty("reportingPeriods")) {\
				%>\
				Year<br>\
				<%\
				 _.each(renderResult.reportingPeriods,function(reportingPeriod,key,list){\
				%>\
				<A HREF="<%= globalConfig.TRAIS_PlanSummaries_Report %>?id=<%= renderResult.UniqueFacilityID %>&year=<%= reportingPeriod %>"><%= reportingPeriod + " " + globalConfig.chooseLang("Plan Summary", "Plan Summary") %> </A><br>\
				<%});%>\
			<% } else {%>\
			<TABLE BORDER=0 WIDTH=600>\
			<A NAME="top"></A>\
			<TR><TD COLSPAN=2><CENTER><H2><%= globalConfig.chooseLang("Plan Summary " + renderResult.ReportingPeriod, "Plan Summary " + renderResult.ReportingPeriod) %></H2></CENTER><P></TD></TR>\
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
				<%= globalConfig.chooseLang("Which annual report is you plan summary based on?", "Which annual report is you plan summary based on?") %><br>\
				<strong>(<%= substance.VersionofthePlan %>)</strong><br>\
				<strong><%= globalConfig.chooseLang("Statement of Intent to Reduce Use:", "Statement of Intent to Reduce Use:") %></strong>\
					<%= (substance.ReasonforNoIntenttoReduceUseText.length === 0) ? (globalConfig.chooseLang("Toxic Substance Reduction Plan includes a statement to reduce the use of the substance", "Toxic Substance Reduction Plan includes a statement to reduce the use of the substance")) : (globalConfig.chooseLang("Toxic Substance Reduction Plan does not include a statement to reduce the use of the substance because ", "Toxic Substance Reduction Plan does not include a statement to reduce the use of the substance because ") + substance.ReasonforNoIntenttoReduceUseText) %>\
				<br><strong><%= globalConfig.chooseLang("Statement of Intent to Reduce Creation:", "Statement of Intent to Reduce Creation:") %></strong>\
					<%= (substance.ReasonforNoIntenttoReduceCreationText.length === 0) ? (globalConfig.chooseLang("Toxic Substance Reduction Plan includes a statement to reduce the creation of the substance", "Toxic Substance Reduction Plan includes a statement to reduce the creation of the substance")) : (globalConfig.chooseLang("Toxic Substance Reduction Plan does not include a statement to reduce the use of the substance because ", "Toxic Substance Reduction Plan does not include a statement to reduce the use of the substance because ") + substance.ReasonforNoIntenttoReduceCreationText) %>\
				<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 width="100%"\
				 style=\'width:100.0%;border-collapse:collapse;border:none;mso-border-alt:solid windowtext .5pt;\
				 mso-yfti-tbllook:480;mso-padding-alt:0cm 5.4pt 0cm 5.4pt;mso-border-insideh:\
				 .5pt solid windowtext;mso-border-insidev:.5pt solid windowtext\'>\
				 <tr style=\'mso-yfti-irow:0;mso-yfti-firstrow:yes;height:25.6pt\'>\
				  <td width="25%" valign=top style=\'width:25.32%;border:solid windowtext 1.0pt;\
				  mso-border-alt:solid windowtext .5pt;background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;\
				  height:25.6pt\'>\
				  <p class=MsoNormal><b style=\'mso-bidi-font-weight:normal\'><span\
				  style=\'font-size:11.0pt;font-family:"Tahoma","sans-serif"\'><%= globalConfig.chooseLang("Objectives:", "Objectives:") %><o:p></o:p></span></b></p>\
				  </td>\
				  <td width="74%" colspan=2 valign=top style=\'width:74.68%;border:solid windowtext 1.0pt;\
				  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:\
				  solid windowtext .5pt;background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;\
				  height:25.6pt\'>\
				  <p class=MsoNormal><b style=\'mso-bidi-font-weight:normal\'><span\
				  style=\'font-size:11.0pt;font-family:"Tahoma","sans-serif"\'><%= globalConfig.chooseLang("Targets (optional): ", "Targets (optional):") %> <o:p></o:p></span></b></p>\
				  </td>\
				 </tr>\
				 <tr style=\'mso-yfti-irow:1\'>\
				  <td width="25%" rowspan=2 valign=top style=\'width:25.32%;border:solid windowtext 1.0pt;\
				  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;\
				  padding:0cm 5.4pt 0cm 5.4pt\'>\
				  <p class=MsoNormal><span style=\'font-size:11.0pt;font-family:"Tahoma","sans-serif"\'><%= substance.PlanObjectives %><o:p></o:p></span></p>\
				  </td>\
				  <td width="7%" valign=top style=\'width:7.42%;border-top:none;border-left:\
				  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
				  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
				  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt\'>\
				  <p class=MsoNormal><span style=\'font-size:11.0pt;font-family:"Tahoma","sans-serif"\'><%= globalConfig.chooseLang("Use", "Use") %><o:p></o:p></span></p>\
				  </td>\
				  <td width="67%" valign=top style=\'width:67.24%;border-top:none;border-left:\
				  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
				  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
				  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt\'>\
				  <p class=MsoNormal><span style=\'font-size:11.0pt;font-family:"Tahoma","sans-serif"\'><%= globalConfig.chooseLang("Reductions: ", "Reductions: ") %> <%= (substance.UseReductionQuantityTargetValue + " " + substance.UseReductionQuantityTargetUnit) %><o:p></o:p></span></p>\
				  <p class=MsoNormal><span style=\'font-size:11.0pt;font-family:"Tahoma","sans-serif"\'><%= globalConfig.chooseLang("Target Timelines: ", "Target Timelines: ") %> <%= (substance.UseReductionTimelineTargetYears.length === 0) ? "" : substance.UseReductionTimelineTargetYears + globalConfig.chooseLang(" years", " years")%><o:p></o:p></span></p>\
				  <p class=MsoNormal><span style=\'font-size:11.0pt;font-family:"Tahoma","sans-serif"\'>Or<o:p></o:p></span></p>\
				  <p class=MsoNormal><span style=\'font-size:11.0pt;font-family:"Tahoma","sans-serif"\'><%= substance.UseReductionTargetDescription %><o:p></o:p></span></p>\
				  </td>\
				 </tr>\
				 <tr style=\'mso-yfti-irow:2;mso-yfti-lastrow:yes\'>\
				  <td width="7%" valign=top style=\'width:7.42%;border-top:none;border-left:\
				  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
				  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
				  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt\'>\
				  <p class=MsoNormal><span style=\'font-size:11.0pt;font-family:"Tahoma","sans-serif"\'><%= globalConfig.chooseLang("Creation", "Creation") %><o:p></o:p></span></p>\
				  </td>\
				  <td width="67%" valign=top style=\'width:67.24%;border-top:none;border-left:\
				  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
				  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;\
				  mso-border-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt\'>\
				  <p class=MsoNormal><span style=\'font-size:11.0pt;font-family:"Tahoma","sans-serif"\'><%= globalConfig.chooseLang("Reductions: ", "Reductions: ") %> <%= (substance.CreationReductionQuantityTargetValue + " " + substance.CreationReductionQuantityTargetUnit) %><o:p></o:p></span></p>\
				  <p class=MsoNormal><span style=\'font-size:11.0pt;font-family:"Tahoma","sans-serif"\'><%= globalConfig.chooseLang("Target Timelines: ", "Target Timelines: ") %> <%= (substance.CreationReductionTimelineTargetYears.length === 0) ? "" : substance.CreationReductionTimelineTargetYears + globalConfig.chooseLang(" years", " years")%><o:p></o:p></span></p>\
				  <p class=MsoNormal><span style=\'font-size:11.0pt;font-family:"Tahoma","sans-serif"\'>Or<o:p></o:p></span></p>\
				  <p class=MsoNormal><span style=\'font-size:11.0pt;font-family:"Tahoma","sans-serif"\'><%= substance.CreationReductionTargetDescription %><o:p></o:p></span></p>\
				  </td>\
				 </tr>\
				</table>\
				<br><strong><%= globalConfig.chooseLang("Reason for Use: ", "Reason for Use: ") %></strong><%= substance.ReasonsforUse %>\
				<br><strong><%= globalConfig.chooseLang("Reason for Creation: ", "Reason for Creation: ") %></strong><%= substance.ReasonsforCreation %>\
				<br><strong><%= globalConfig.chooseLang("Implementing Toxic Substance Reduction Options", "Implementing Toxic Substance Reduction Options") %></strong><br>\
				<% if (substance.StatementNoOptionImplementedYN === "No") { %>\
					<table class=MsoNormalTable WIDTH=600 border=1 cellspacing=0 cellpadding=0 width="100%"\
					 style=\'width:100.0%;border-collapse:collapse;border:none\'>\
					 <tr style=\'height:27.4pt\'>\
					  <td width="9%" rowspan=3 valign=top style=\'width:9.72%;border:solid windowtext 1.0pt;\
					  background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;height:27.4pt\'>\
					  <p class=MsoNormal><b><span style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>Reduction\
					  Categories</span></b></p>\
					  </td>\
					  <td width="9%" rowspan=3 valign=top style=\'width:9.04%;border:solid windowtext 1.0pt;\
					  border-left:none;background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;height:27.4pt\'>\
					  <p class=MsoNormal><b><span style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>Reduction\
					  Options</span></b></p>\
					  </td>\
					  <td width="62%" colspan=9 valign=top style=\'width:62.72%;border:solid windowtext 1.0pt;\
					  border-left:none;background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;height:27.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><b><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>Percentage\
					  Reductions</span></b></p>\
					  </td>\
					  <td width="9%" rowspan=3 valign=top style=\'width:9.04%;border:solid windowtext 1.0pt;\
					  border-left:none;background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;height:27.4pt\'>\
					  <p class=MsoNormal style=\'margin-top:0cm;margin-right:5.65pt;margin-bottom:\
					  0cm;margin-left:5.65pt;margin-bottom:.0001pt\'><b><span style=\'font-size:7.0pt;\
					  font-family:"Tahoma","sans-serif"\'>Anticipated Timelines for Achieving\
					  Reductions in Use</span></b></p>\
					  <p class=MsoNormal style=\'margin-top:0cm;margin-right:5.65pt;margin-bottom:\
					  0cm;margin-left:5.65pt;margin-bottom:.0001pt\'><b><span style=\'font-size:7.0pt;\
					  font-family:"Tahoma","sans-serif";color:red\'>&nbsp;</span></b></p>\
					  <p class=MsoNormal align=center style=\'margin-top:0cm;margin-right:5.65pt;\
					  margin-bottom:0cm;margin-left:5.65pt;margin-bottom:.0001pt;text-align:center\'><b><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>&nbsp;</span></b></p>\
					  </td>\
					  <td width="9%" rowspan=3 valign=top style=\'width:9.46%;border:solid windowtext 1.0pt;\
					  border-left:none;background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;height:27.4pt\'>\
					  <p class=MsoNormal align=center style=\'margin-top:0cm;margin-right:5.65pt;\
					  margin-bottom:0cm;margin-left:5.65pt;margin-bottom:.0001pt;text-align:center\'><b><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>Anticipated\
					  Timelines for Achieving Reductions in Creation</span></b></p>\
					  </td>\
					 </tr>\
					 <tr style=\'height:23.35pt\'>\
					  <td width="6%" rowspan=2 style=\'width:6.1%;border-top:none;border-left:none;\
					  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;height:23.35pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><b><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>Used</span></b></p>\
					  </td>\
					  <td width="7%" rowspan=2 style=\'width:7.68%;border-top:none;border-left:none;\
					  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;height:23.35pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><b><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>Created</span></b></p>\
					  </td>\
					  <td width="9%" rowspan=2 style=\'width:9.7%;border-top:none;border-left:none;\
					  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;height:23.35pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><b><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>Contained in Product</span></b></p>\
					  </td>\
					  <td width="16%" colspan=3 style=\'width:16.64%;border-top:none;border-left:\
					  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;height:23.35pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><b><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>Released to</span></b></p>\
					  </td>\
					  <td width="13%" colspan=2 style=\'width:13.56%;border-top:none;border-left:\
					  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;height:23.35pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><b><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>Disposed</span></b></p>\
					  </td>\
					  <td width="9%" rowspan=2 style=\'width:9.04%;border-top:none;border-left:none;\
					  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;height:23.35pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><b><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>Recycled</span></b></p>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><b><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>Off-site</span></b></p>\
					  </td>\
					 </tr>\
					 <tr style=\'height:36.4pt\'>\
					  <td width="4%" style=\'width:4.2%;border-top:none;border-left:none;border-bottom:\
					  solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;background:#E6E6E6;\
					  padding:0cm 5.4pt 0cm 5.4pt;height:36.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><b><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>Air</span></b></p>\
					  </td>\
					  <td width="6%" style=\'width:6.78%;border-top:none;border-left:none;\
					  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;height:36.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><b><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>Land</span></b></p>\
					  </td>\
					  <td width="5%" style=\'width:5.66%;border-top:none;border-left:none;\
					  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;height:36.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><b><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>Water</span></b></p>\
					  </td>\
					  <td width="6%" style=\'width:6.78%;border-top:none;border-left:none;\
					  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;height:36.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><b><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>On-Site</span></b></p>\
					  </td>\
					  <td width="6%" style=\'width:6.78%;border-top:none;border-left:none;\
					  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  background:#E6E6E6;padding:0cm 5.4pt 0cm 5.4pt;height:36.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><b><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>Off-Site</span></b></p>\
					  </td>\
					 </tr>\
					 <tr>\
					  <td width="9%" valign=top style=\'width:9.72%;border:solid windowtext 1.0pt;\
					  border-top:none;padding:0cm 5.4pt 0cm 5.4pt\'>\
					  <p class=MsoNormal><span style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'><%= substance.OptionReductionCategory %></span></p>\
					  </td>\
					  <td width="9%" valign=top style=\'width:9.04%;border-top:none;border-left:\
					  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  padding:0cm 5.4pt 0cm 5.4pt\'>\
					  <p class=MsoNormal><span style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'><%= substance.ActivityTaken %></span></p>\
					  </td>\
					  <td width="6%" valign=top style=\'width:6.1%;border-top:none;border-left:none;\
					  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  padding:0cm 5.4pt 0cm 5.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'><%= substance.EstimatedUseReductionPercent %></span></p>\
					  </td>\
					  <td width="7%" valign=top style=\'width:7.68%;border-top:none;border-left:\
					  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  padding:0cm 5.4pt 0cm 5.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'><%= substance.EstimatedCreationReductionPercent %></span></p>\
					  </td>\
					  <td width="9%" valign=top style=\'width:9.7%;border-top:none;border-left:none;\
					  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  padding:0cm 5.4pt 0cm 5.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'><%= substance.EstimatedContainedinProductReductionPercent %></span></p>\
					  </td>\
					  <td width="4%" valign=top style=\'width:4.2%;border-top:none;border-left:none;\
					  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  padding:0cm 5.4pt 0cm 5.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'><%= substance.EstimatedAirReleasesReductionPercent %></span></p>\
					  </td>\
					  <td width="6%" valign=top style=\'width:6.78%;border-top:none;border-left:\
					  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  padding:0cm 5.4pt 0cm 5.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'><%= substance.EstimatedLandReleasesReductionPercent %></span></p>\
					  </td>\
					  <td width="5%" valign=top style=\'width:5.66%;border-top:none;border-left:\
					  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  padding:0cm 5.4pt 0cm 5.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'><%= substance.EstimatedWaterReleasesReductionPercent %></span></p>\
					  </td>\
					  <td width="6%" valign=top style=\'width:6.78%;border-top:none;border-left:\
					  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  padding:0cm 5.4pt 0cm 5.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'><%= substance.EstimatedOnsiteDisposalsReductionPercent %></span></p>\
					  </td>\
					  <td width="6%" valign=top style=\'width:6.78%;border-top:none;border-left:\
					  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  padding:0cm 5.4pt 0cm 5.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'><%= substance.EstimatedOffsiteDisposalsReductionPercent %></span></p>\
					  </td>\
					  <td width="9%" valign=top style=\'width:9.04%;border-top:none;border-left:\
					  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  padding:0cm 5.4pt 0cm 5.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'><%= substance.EstimatedOffsiteRecyclingReductionPercent %></span></p>\
					  </td>\
					  <td width="9%" valign=top style=\'width:9.04%;border-top:none;border-left:\
					  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  padding:0cm 5.4pt 0cm 5.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>x years</span></p>\
					  </td>\
					  <td width="9%" valign=top style=\'width:9.46%;border-top:none;border-left:\
					  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;\
					  padding:0cm 5.4pt 0cm 5.4pt\'>\
					  <p class=MsoNormal align=center style=\'text-align:center\'><span\
					  style=\'font-size:7.0pt;font-family:"Tahoma","sans-serif"\'>x years</span></p>\
					  </td>\
					 </tr>\
					</table>\
				<% } else {%>\
					<%= globalConfig.chooseLang("Toxic Substance Reduction Plan indicated that no options will be implemented for the following reason(s): ", "Toxic Substance Reduction Plan indicated that no options will be implemented for the following reason(s):") %><br><%= substance.ReasonsNoOptionImplemented %><br>\
				<% }%>\
				<strong><%= globalConfig.chooseLang("Actions Taken Outside the Plan that Reduced the Use and Creation of the Substance (optional): ", "Actions Taken Outside the Plan that Reduced the Use and Creation of the Substance (optional): ") %></strong><br><%= (substance.DescriptionofAnyAdditionalActionsTaken.length === 0) ? globalConfig.chooseLang("None at this time", "None at this time") : substance.DescriptionofAnyAdditionalActionsTaken %>\
				<BR><BR><I><A HREF="http://www.ene.gov.on.ca/environment/<%= globalConfig.chooseLang("en", "fr") %>/resources/collection/data_downloads/index.htm"><%= globalConfig.chooseLang("Download the full dataset", "Ensemble de donn&eacute;es &agrave; t&eacute;l&eacute;charger") %></A></I><BR>\
				<A HREF="#top"><%= globalConfig.chooseLang("Back to top", "Haut de la page") %></A><BR><HR WIDTH=100%>\
				</OL><P>\
            <%\
                });\
            %>\
		<BR><BR><%= globalConfig.chooseLang("An <A HREF=\'TRAIS_Accessible.htm\'>accessible copy of the reports</A> for all facilities is available.", "Les rapports d\'installations ou d\'entreprise sont aussi disponibles sous <A HREF=\'TRAIS_Accessible.htm\'>format texte-pur</A>.") %>\
		<% }%>'
}];
