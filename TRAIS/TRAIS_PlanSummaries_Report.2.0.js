globalConfig.TRAIS_PlanSummaries_Report = "TRAIS_PlanSummaries_Report.htm";

globalConfig.getYears = function (year) {
	if (year === "1") {
		return year + globalConfig.chooseLang(" year", " an");
	}
	return year + globalConfig.chooseLang(" years", " ans");
};
globalConfig.processEmptyValue = function(str) {
	if (str.length === 0){
		return "&nbsp;";
	}
	return str;
};
globalConfig.layers = [{
	url: globalConfig.url  + "/5",
	renderTargetDiv: "target",
	event: "reportReady",
	where: QueryString.hasOwnProperty("year") ? ("(UniqueFacilityID = '" + QueryString.id + "') AND (ReportingPeriod = '" + QueryString.year + "')"):("(UniqueFacilityID = '" + QueryString.id + "')"),
	outFields: QueryString.hasOwnProperty("year") ? ["FacilityName", "StreetAddressPhysicalAddress", "MunicipalityCityPhysicalAddres", "OrganizationName", "NPRIID", "NAICS", "PublicContactFullName", "PublicContactTelephone", "PublicContactEMail", "HighestRankingEmployee", "SubstanceName", "Units", "VersionofthePlan", "ReasonforNoIntenttoReduceUse ", "ReasonforNoIntenttoReduceCreat", "PlanObjectives", "UseReductionQuantityTargetValu", "UseReductionQuantityTargetUnit", "UseReductionTimelineTargetYear", "UseReductionTargetDescription", "CreReductionQuantityTargetValu", "CreReductionQuantityTargetUnit", "CreReductionTimelineTargetYear", "CreReductionTargetDescription", "ReasonsforUse", "ReasonsforUseSummary", "ReasonsforCreation", "ReasonsforCreationSummary", "StatementNoOptionImplementedYN", "ReasonsNoOptionImplemented", "DescofAnyAdditActionsTaken", "OptionReductionCategory", "ActivityTaken", "DescriptionofOption", "EstUseReduPct", "EstCreReduPct", "EstContainedinProductReduPct", "EstAirReleasesReduPct", "EstWaterReleasesReduPct", "EstLandReleasesReduPct", "EstOnsiteDisposalsReduPct", "EstOffsiteDisposalsReduPct", "EstOffsiteRecyclingReduPct", "AntiTimelinesforAchieReduinUse", "AntiTimelinesforAchieReduinCre"] : ["UniqueFacilityID", "ReportingPeriod"],
	processResults: function (fs) {
		var calculateRenderResultwithYear = function (fs) {
			var attr = fs[0].attributes;
			var renderResult = {
				ReportingPeriod: QueryString.year, 
				FacilityName: attr.FacilityName,
				CompanyName: attr.OrganizationName,
				Address: attr.StreetAddressPhysicalAddress + " / " + attr.MunicipalityCityPhysicalAddres,
				NPRIID: attr.NPRIID,
				PublicContact: (attr.PublicContactFullName === null) ?  "[<I>" + globalConfig.chooseLang("no name available", "Aucun nom disponible") +  "</I>]" : attr.PublicContactFullName,
				PublicContactPhone: attr.PublicContactTelephone,
				PublicContactEMail: attr.PublicContactEMail,
				HighestRankingEmployee: attr.HighestRankingEmployee
			};
			var NAICS = attr.NAICS;
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
						VersionofthePlan: attr.VersionofthePlan,
						ReasonforNoIntenttoReduceUse: attr.ReasonforNoIntenttoReduceUse ,
						ReasonforNoIntenttoReduceCreat: attr.ReasonforNoIntenttoReduceCreat,
						PlanObjectives: attr.PlanObjectives,
						UseReductionQuantityTargetValu: attr.UseReductionQuantityTargetValu,
						UseReductionQuantityTargetUnit: attr.UseReductionQuantityTargetUnit,
						UseReductionTimelineTargetYear: attr.UseReductionTimelineTargetYear,
						UseReductionTargetDescription: attr.UseReductionTargetDescription,
						CreReductionQuantityTargetValu: attr.CreReductionQuantityTargetValu,
						CreReductionQuantityTargetUnit: attr.CreReductionQuantityTargetUnit,
						CreReductionTimelineTargetYear: attr.CreReductionTimelineTargetYear,
						CreReductionTargetDescription: attr.CreReductionTargetDescription,
						ReasonsforUse: attr.ReasonsforUse,
						ReasonsforUseSummary: attr.ReasonsforUseSummary,						
						ReasonsforCreation: attr.ReasonsforCreation,
						ReasonsforCreationSummary: attr.ReasonsforCreationSummary,
						StatementNoOptionImplementedYN: attr.StatementNoOptionImplementedYN,
						ReasonsNoOptionImplemented: attr.ReasonsNoOptionImplemented,
						DescofAnyAdditActionsTaken: attr.DescofAnyAdditActionsTaken,
						options: _.map(array, function(item) {
							return {
								OptionReductionCategory: item.OptionReductionCategory,
								ActivityTaken: item.ActivityTaken,
								DescriptionofOption: item.DescriptionofOption,
								EstUseReduPct: item.EstUseReduPct,
								EstCreReduPct: item.EstCreReduPct,
								EstContainedinProductReduPct: item.EstContainedinProductReduPct,
								EstAirReleasesReduPct: item.EstAirReleasesReduPct,
								EstWaterReleasesReduPct: item.EstWaterReleasesReduPct,
								EstLandReleasesReduPct: item.EstLandReleasesReduPct,
								EstOnsiteDisposalsReduPct: item.EstOnsiteDisposalsReduPct,
								EstOffsiteDisposalsReduPct: item.EstOffsiteDisposalsReduPct,
								EstOffsiteRecyclingReduPct: item.EstOffsiteRecyclingReduPct,
								AntiTimelinesforAchieReduinUse: item.AntiTimelinesforAchieReduinUse,
								AntiTimelinesforAchieReduinCre: item.AntiTimelinesforAchieReduinCre
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
		//console.log(renderResult);
		
		//document.getElementById(globalConfig.layers[0].renderTargetDiv).innerHTML = _.template(globalConfig.layers[0].template, {renderResult: renderResult});		
	},
	template: '<%\
				if (renderResult.hasOwnProperty("reportingPeriods")) {\
				%>\
				<%= globalConfig.chooseLang("Year", "Ann&eacute;e") %><br>\
				<%\
				 _.each(renderResult.reportingPeriods,function(reportingPeriod,key,list){\
				%>\
				<A HREF="<%= globalConfig.chooseLang("plan-summary-report", "sommaires-de-plan") %>?id=<%= renderResult.UniqueFacilityID %>&year=<%= reportingPeriod %>"><%= reportingPeriod + " " + globalConfig.chooseLang("Plan Summary", "Sommaires de Plan") %> </A><br>\
				<%});%>\
			<% } else {%>\
			<TABLE BORDER=0 WIDTH=600>\
			<A NAME="top"></A>\
			<TR><TD COLSPAN=2><CENTER><H2><%= globalConfig.chooseLang("Plan Summary " + renderResult.ReportingPeriod, "Sommaires de Plan " + renderResult.ReportingPeriod) %></H2></CENTER><P></TD></TR>\
			<TR><TD><%= globalConfig.chooseLang("Facility Name", "Nom de l\'installation") %>:</TD><TD><%= renderResult.FacilityName %></TD></TR>\
			<TR><TD><%= globalConfig.chooseLang("Company Name", "Nom de l\'entreprise") %>:</TD><TD><%= renderResult.CompanyName %></TD></TR>\
			<TR><TD><%= globalConfig.chooseLang("Physical Address", "Adresse") %>:</TD><TD><%= renderResult.Address %></TD></TR>\
			<TR><TD><%= globalConfig.chooseLang("Sector", "Secteur") %>:</TD><TD><%= renderResult.Sector %></TD></TR>\
			<TR><TD><%= globalConfig.chooseLang("NPRI ID", "ID INRP") %>:</TD><TD><%= renderResult.NPRIID %></TD></TR>\
			<TR><TD><%= globalConfig.chooseLang("Public Contact", "Personne-ressource") %>:</TD><TD><%= renderResult.PublicContact %><BR><%= renderResult.PublicContactPhone %><BR><A HREF=mailto:<%= renderResult.PublicContactEMail %>><%= renderResult.PublicContactEMail %></A></TD></TR>\
			<TR><TD COLSPAN=2>&nbsp;<BR><%= globalConfig.chooseLang("Certified by", "Certifi&eacute; par") %> <%= renderResult.HighestRankingEmployee %>, <%= globalConfig.chooseLang("Highest Ranking Employee", "employ&eacute; le plus &eacute;lev&eacute; hi&eacute;rarchiquement") %><BR>&nbsp;</TD></TR>\
			<TR><TD COLSPAN=2><A NAME="subst"></A><%= ((renderResult.hasOwnProperty("Substances") && renderResult.Substances.length > 0)) ? globalConfig.chooseLang("List of Substances:", "Liste des substances:") : "" %>\
			<%= _.map(renderResult.Substances, function(substance) {return \'<A HREF="#\' + substance.Name + \'">\' + substance.Name + \'</A>\';}).join(", ") %>\
			<TR><TD COLSPAN=2><HR></TD><TR>\
		</TABLE><P>\
			<%= ((renderResult.hasOwnProperty("Substances") && renderResult.Substances.length > 0)) ? "" : globalConfig.chooseLang("There is no substance renderResultrmation provided from this facility.<BR>", "Il n\'y a pas d\'information sur les substances toxiques fournie par cette entreprise ou installation<BR>") %>\
            <%\
                _.each(renderResult.Substances,function(substance,key,list){\
            %>\
				<A NAME="<%= substance.Name %>"></A><U><B><%= substance.Name %></B></U><P>\
				<%= globalConfig.chooseLang("This plan summary is a reflection of a/an <strong>" + substance.VersionofthePlan + "</strong> based on the <strong>" + renderResult.ReportingPeriod + "</strong> reporting period.", "This plan summary is a reflection of a/an <strong>" + substance.VersionofthePlan + "</strong> based on the <strong>" + renderResult.ReportingPeriod + "</strong> reporting period.") %>\
				<br><br><strong><%= globalConfig.chooseLang("Statement of Intent to Reduce Use:", "Déclaration de l’intention de réduire l’utilisation:") %></strong><br>\
					<%= (substance.ReasonforNoIntenttoReduceUse.length === 0) ? (globalConfig.chooseLang("Toxic Substance Reduction Plan includes a statement to reduce the use of the substance", "Le plan de réduction de substance toxique comprend une déclaration en vue de réduire l’utilisation de la substance")) : (globalConfig.chooseLang("Toxic Substance Reduction Plan does not include a statement to reduce the use of the substance because: <br>", "Le plan de réduction de substance toxique ne comprend pas de déclaration en vue de réduire l’utilisation de la substance du fait que: <br>") + substance.ReasonforNoIntenttoReduceUse) %>\
				<br><br><strong><%= globalConfig.chooseLang("Statement of Intent to Reduce Creation:", "Déclaration de l’intention de réduire la création:") %></strong><br>\
					<%= (substance.ReasonforNoIntenttoReduceCreat.length === 0) ? (globalConfig.chooseLang("Toxic Substance Reduction Plan includes a statement to reduce the creation of the substance", "Le plan de réduction de substance toxique comprend une déclaration en vue de réduire la création de la substance")) : (globalConfig.chooseLang("Toxic Substance Reduction Plan does not include a statement to reduce the creation of the substance because: <br>", "Le plan de réduction de substance toxique ne comprend pas de déclaration en vue de réduire la création de la substance du fait que: <br>") + substance.ReasonforNoIntenttoReduceCreat) %>\
				<TABLE class="TRAISTable">\
				  <tr>\
					<th width="25%"><strong><%= globalConfig.chooseLang("Objectives:", "Objectifs:") %></strong></th>\
					<th colspan="2" width="75%"><strong><%= globalConfig.chooseLang("Targets (optional): ", "Cibles (facultatif):") %></strong></th>\
				  </tr>\
				  <tr>\
					<td rowspan="2"><%= substance.PlanObjectives %></td>\
					<td><%= globalConfig.chooseLang("Use", "Utilisation") %></td>\
					<td><%= globalConfig.chooseLang("Reductions: ", "Réductions: ") %><br><br><%= (substance.UseReductionQuantityTargetValu + " " + substance.UseReductionQuantityTargetUnit) %><br><%= globalConfig.chooseLang("Target Timelines: ", "Délai visé: ") %> <%= (substance.UseReductionTimelineTargetYear.length === 0) ? "" : globalConfig.getYears(substance.UseReductionTimelineTargetYear) %><br><%= substance.CreReductionTargetDescription %><br><br></td>\
				  </tr>\
				  <tr>\
					<td><%= globalConfig.chooseLang("Creation", "Création") %></td>\
					<td><%= globalConfig.chooseLang("Reductions: ", "Réductions: ") %><br><br><%= (substance.CreReductionQuantityTargetValu + " " + substance.CreReductionQuantityTargetUnit) %><br><%= globalConfig.chooseLang("Target Timelines: ", "Délai visé: ") %> <%= (substance.CreReductionTimelineTargetYear.length === 0) ? "" : globalConfig.getYears(substance.CreReductionTimelineTargetYear) %><br><%= substance.CreReductionTargetDescription %><br><br></td>\
				  </tr>\
				</table>\
				<br><strong><%= globalConfig.chooseLang("Reason for Use: ", "Raison de l’utilisation: ") %></strong><%= (substance.ReasonsforUse === "Other") ?  substance.ReasonsforUseSummary : substance.ReasonsforUse  %>\
				<br><br><strong><%= globalConfig.chooseLang("Reason for Creation: ", "Raison de la création: ") %></strong><%= (substance.ReasonsforCreation === "Other") ?  substance.ReasonsforCreationSummary : substance.ReasonsforCreation %>\
				<br><br><strong><%= globalConfig.chooseLang("Implementing Toxic Substance Reduction Options", "Options de mise en œuvre de la réduction de la substance toxique") %></strong><br>\
				<% if (substance.StatementNoOptionImplementedYN === "No") { %>\
					<br><%= globalConfig.chooseLang("Toxic Substance Reduction Plan indicated that the following options will be implemented", "Le plan de réduction de substance toxique indique que les options suivantes seront mises en œuvre") %><br>\
					<TABLE class="TRAISTable">\
					  <tr>\
						<th width="15%"><strong><%= globalConfig.chooseLang("Reduction Categories", "Catégories de réduction") %></strong></th>\
						<th width="15%"><strong><%= globalConfig.chooseLang("Reduction Options", "Options de réduction") %></strong></th>\
						<th width="15%"><strong><%= globalConfig.chooseLang("Quantification Type", "Quantification Type") %></strong></th>\
						<th width="15%"><strong><%= globalConfig.chooseLang("Percentage Reductions", "Réductions en pourcentage") %></strong></th>\
						<th width="20%"><strong><%= globalConfig.chooseLang("Anticipated Timelines for Achieving Reductions in Use", "Délai prévu pour la réduction de l’utilisation") %></strong></th>\
						<th width="20%"><strong><%= globalConfig.chooseLang("Anticipated Timelines for Achieving Reductions in Creation", "Délai prévu pour la réduction de la création") %></strong></th>\
					  </tr>\
					<%\
						_.each(substance.options,function(option,key,list){\
					%>\
					  <tr>\
					    <td rowspan="9"><%= globalConfig.processEmptyValue(option.OptionReductionCategory) %></td>\
						<td rowspan="9"><%= (option.ActivityTaken === "Other") ?  option.DescriptionofOption : globalConfig.processEmptyValue(option.ActivityTaken) %></td>\
						<td><%= globalConfig.chooseLang("Used", "Utilisée") %></td>\
						<td><%= globalConfig.processEmptyValue(option.EstUseReduPct) %></td>\
						<td rowspan="9"><%= (option.AntiTimelinesforAchieReduinUse.length > 0) ? ( globalConfig.getYears(option.AntiTimelinesforAchieReduinUse)) : "&nbsp;" %></td>\
						<td rowspan="9"><%= (option.AntiTimelinesforAchieReduinCre.length > 0) ? ( globalConfig.getYears(option.AntiTimelinesforAchieReduinCre)) : "&nbsp;" %></td>\
					  </tr>\
					  <tr>\
						<td><%= globalConfig.chooseLang("Created", "Créée") %></td>\
						<td><%= globalConfig.processEmptyValue(option.EstCreReduPct) %></td>\
					  </tr>\
					  <tr>\
						<td><%= globalConfig.chooseLang("Contained in Product", "Contenue dans un produit") %></td>\
						<td><%= globalConfig.processEmptyValue(option.EstContainedinProductReduPct) %></td>\
					  </tr>\
					  <tr>\
						<td><%= globalConfig.chooseLang("Released to Air", "Rejetée dans l’air") %></td>\
						<td><%= globalConfig.processEmptyValue(option.EstAirReleasesReduPct) %></td>\
					  </tr>\
					  <tr>\
						<td><%= globalConfig.chooseLang("Released to Land", "Rejetée dans la terre") %></td>\
						<td><%= globalConfig.processEmptyValue(option.EstLandReleasesReduPct) %></td>\
					  </tr>\
					  <tr>\
						<td><%= globalConfig.chooseLang("Released to Water", "Rejetée dans l’eau") %></td>\
						<td><%= globalConfig.processEmptyValue(option.EstWaterReleasesReduPct) %></td>\
					  </tr>\
					  <tr>\
						<td><%= globalConfig.chooseLang("Disposed On-Site", "Éliminée sur place") %></td>\
						<td><%= globalConfig.processEmptyValue(option.EstOnsiteDisposalsReduPct) %></td>\
					  </tr>\
					  <tr>\
						<td><%= globalConfig.chooseLang("Disposed Off-site", "Éliminée hors site") %></td>\
						<td><%= globalConfig.processEmptyValue(option.EstOffsiteDisposalsReduPct) %></td>\
					  </tr>\
					  <tr>\
						<td><%= globalConfig.chooseLang("Recycled Off-site", "Recyclée hors site") %></td>\
						<td><%= globalConfig.processEmptyValue(option.EstOffsiteRecyclingReduPct) %></td>\
					  </tr>\
					<%\
						});\
					%>\
					</table>\
				<% } else {%>\
					<%= globalConfig.chooseLang("Toxic Substance Reduction Plan indicated that no options will be implemented for the following reason(s): ", ") Le plan de réduction de substance toxique indiquait qu’aucune option ne serait mise en œuvre, et ce, pour la ou les raisons suivantes:") %><br><%= substance.ReasonsNoOptionImplemented %><br>\
				<% }%>\
				<br><strong><%= globalConfig.chooseLang("Actions Taken Outside the Plan that Reduced the Use and Creation of the Substance (optional): ", "Mesures prises indépendamment du plan qui ont permis de réduire l’utilisation et la création de la substance (facultatif): ") %></strong><br><%= (substance.DescofAnyAdditActionsTaken.length === 0) ? globalConfig.chooseLang("None at this time", "None at this time") : substance.DescofAnyAdditActionsTaken %>\
				<BR><BR><I><A HREF="http://www.ene.gov.on.ca/environment/<%= globalConfig.chooseLang("en", "fr") %>/resources/collection/data_downloads/index.htm"><%= globalConfig.chooseLang("Click here to access the full dataset", "Cliquez ici pour accéder au jeu de données complet") %></A></I><BR>\
				<A HREF="#top"><%= globalConfig.chooseLang("Back to top", "Haut de la page") %></A><BR><HR WIDTH=100%>\
				</OL><P>\
            <%\
                });\
            %>\
		<% }%>'
}];
