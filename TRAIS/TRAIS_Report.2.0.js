globalConfig.layers = [{
	url: globalConfig.url  + "/2",
	renderTargetDiv: "target",
	event: "reportReady",
	where: "ID = " + QueryString.id,
	outFields: ["FacilityName", "Address", "OrganizationName", "NPRI_ID", "Sector", "Contact", "Phone", "Email", "HREmploy", "SubstanceName", "Units", "Use", "Creation", "Contained", "ReleasestoAir", "ReleasestoWater", "ReleasestoLand", "DisposalOnSite", "DisposalOffSite", "RecycleOffSite"],
	processResults: function (fs) {
		var attr = fs[0].attributes;
		var renderResult = {
			FacilityName: attr.FacilityName,
			CompanyName: attr.OrganizationName,
			Address: attr.Address,
			Sector: attr.Sector,
			NPRIID: attr.NPRI_ID,
			PublicContact: (attr.Contact === null) ?  "[<I>" + globalConfig.chooseLang("no name available", "Aucun nom disponible") +  "</I>]" : attr.Contact,
			PublicContactPhone: attr.Phone,
			PublicContactEmail: attr.Email,
			HighestRankingEmployee: attr.HREmploy
		};
		if((fs.length > 1) || (fs[0].attributes.SubstanceName  !== null)){
			var substances = [];
			for (var i = 0, c = fs.length; i < c; i++) {
				attr = fs[i].attributes;
				var s = {
					Name: attr.SubstanceName,
					Units: attr.Units,
					Used: attr.Use,
					Created: attr.Creation,
					Contained: attr.Contained,
					Air: attr.ReleasestoAir,
					Water: attr.ReleasestoWater,
					Land: attr.ReleasestoLand,
					DOnSite: attr.DisposalOnSite,
					DOffSite: attr.DisposalOffSite,
					ROffSite: attr.RecycleOffSite
				};
				substances.push(s);
			}
			renderResult.Substances = substances;
		}
		document.getElementById(globalConfig.layers[0].renderTargetDiv).innerHTML = _.template(globalConfig.layers[0].template, {renderResult: renderResult});		
	},
	template: '<TABLE BORDER=0 WIDTH=600>\
			<A NAME="top"></A>\
			<TR><TD COLSPAN=2><CENTER><H2><%= globalConfig.chooseLang("Annual Report for the 2010 Reporting Period", "Rapport annuel sur la p&eacute;riode de d&eacute;claration de 2010") %></H2></CENTER><P></TD></TR>\
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
				<TABLE BORDER=1 WIDTH=600>\
						<TR>\
							<TD WIDTH=50% BGCOLOR=lightgrey>&nbsp;</TD>\
							<TD WIDTH=50% BGCOLOR=lightgrey>2010<BR><%= globalConfig.chooseLang("Amount Reported", "Quantit&eacute; d&eacute;clar&eacute;e") %> <BR>(<%= substance.Units %>)</TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Entered the Facility (Used)", "Quantit&eacute; ayant p&eacute;n&eacute;tr&eacute; l\'installation (utilis&eacute;e)") %></TD>\
							<TD><%= substance.Used %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Created", "Quantit&eacute; cr&eacute;&eacute;e") %></TD>\
							<TD><%= substance.Created %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Contained in Product", "Quantit&eacute; contenue dans les produits") %><BR>&nbsp;</TD>\
							<TD><%= substance.Contained %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released to Air", "Quantit&eacute; &eacute;mise dans l\'air") %><BR></TD>\
							<TD><%= substance.Air %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released to Water", "Quantit&eacute; rejet&eacute;e dans l\'eau") %></TD>\
							<TD><%= substance.Water %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Released to Land", "Quantit&eacute; d&eacute;vers&eacute;e sur les sols") %><BR>&nbsp;</TD>\
							<TD><%= substance.Land %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Disposed On-Site", "Quantit&eacute; &eacute;limin&eacute;e dans le site") %></TD>\
							<TD><%= substance.DOnSite %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Disposed Off-Site", "Quantit&eacute; &eacute;limin&eacute;e hors site") %></TD>\
							<TD><%= substance.DOffSite %></TD>\
						</TR>\
						<TR>\
							<TD><%= globalConfig.chooseLang("Recycled Off-Site", "Quantit&eacute; recycl&eacute;e hors site") %></TD>\
							<TD><%= substance.ROffSite %></TD>\
						</TR>\
						</TABLE>\
				<BR><BR><I><A HREF="http://www.ene.gov.on.ca/environment/<%= globalConfig.chooseLang("en", "fr") %>/resources/collection/data_downloads/index.htm"><%= globalConfig.chooseLang("Download the full dataset", "Ensemble de donn&eacute;es &agrave; t&eacute;l&eacute;charger") %></A></I><BR>\
				<A HREF="#top"><%= globalConfig.chooseLang("Back to top", "Haut de la page") %></A><BR><HR WIDTH=100%>\
				</OL><P>\
            <%\
                });\
            %>\
		<BR><BR><%= globalConfig.chooseLang("An <A HREF=\'TRAIS_Accessible.htm\'>accessible copy of the reports</A> for all facilities is available.", "Les rapports d\'installations ou d\'entreprise sont aussi disponibles sous <A HREF=\'TRAIS_Accessible.htm\'>format texte-pur</A>.") %>'
}];
