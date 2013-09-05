
globalConfig.layers = [{
	url: globalConfig.url + "/1",
	renderTargetDiv: "target",
	event: "reportReady",
	where: (QueryString.hasOwnProperty("wellid") ? ("(WELL_ID = " + QueryString.wellid + ")"):("(BORE_HOLE_ID = " + QueryString.id + ")")),
	outFields: (QueryString.hasOwnProperty("wellid") ? ["BORE_HOLE_ID", "WELL_ID", "BHK", "UTMZONE", "EAST83", "NORTH83"] : ["BORE_HOLE_ID", "WELL_ID", "BHK", "PREV_WELL_ID", "DPBR_M", "WELL_TYPE", "DEPTH_M", "YEAR_COMPLETED", "WELL_COMPLETED_DATE", "RECEIVED_DATE", "AUDIT_NO", "TAG", "CONTRACTOR", "SWL", "FINAL_STATUS_DESCR", "USE1", "USE2", "MOE_COUNTY_DESCR", "MOE_MUNICIPALITY_DESCR", "CON", "LOT", "STREET", "CITY", "UTMZONE", "EAST83", "NORTH83", "GEO", "PLUG", "HOLE", "CM", "CAS", "SCRN", "WAT", "PT", "PTD", "DISINFECTED"]),
	processResults: function (fs) {
		var createWellsClusterRenderResult = function (fs) {
			return _.map(fs, function(feature) {			
				return {
					WELL_ID: feature.attributes.WELL_ID, 
					UTMZONE: feature.attributes.UTMZONE, 
					EAST83: feature.attributes.EAST83, 
					NORTH83: feature.attributes.NORTH83, 
					BORE_HOLE_ID: feature.attributes.BORE_HOLE_ID,
					BHK: feature.attributes.BHK
				};
			});
		
		}; 
		var convertDate = function (date) {
			var d = new Date(date);
			var day = d.getDate();	
			var dayStr = ((day < 10) ? ("0" + day) :  ("" + day));
			var months = globalConfig.chooseLang(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], ["janvier", "f&eacute;vrier", "mars", "avril", "mai", "juin", "juillet", "ao&ucirc;t", "septembre", "octobre", "novembre", "d&eacute;cembre"]);
			var monthStr = months[d.getMonth()];
			return  globalConfig.chooseLang(monthStr + " " + dayStr + ", " + d.getFullYear(), dayStr + " " + monthStr + " " + d.getFullYear());
		};
		var createRenderItems = function (content) {
			var rows = content.split("|");
			rows = _.filter(rows, function(row) {return row.length > 0;});
			rows = _.map(rows, function(row) {
				var items = row.split(";");
				items = _.map(items, function(item) {return (item.length === 0) ? "&nbsp;&nbsp;" : item;});
				return items;
			});
			return rows;
		};	
		var createSingleWellRenderResult = function (fs) {
			var renderResult = fs[0].attributes;
			var keys = _.keys(renderResult);
			_.each(keys, function(key) {
				renderResult[key] = renderResult[key] || "";
			});
			renderResult.GEO = createRenderItems(renderResult.GEO);
			renderResult.PLUG = createRenderItems(renderResult.PLUG);
			renderResult.CM = createRenderItems(renderResult.CM);
			renderResult.CAS = createRenderItems(renderResult.CAS);
			renderResult.SCRN = createRenderItems(renderResult.SCRN);
			renderResult.WAT = createRenderItems(renderResult.WAT);
			renderResult.HOLE = createRenderItems(renderResult.HOLE);
			renderResult.WELL_COMPLETED_DATE = convertDate(renderResult.WELL_COMPLETED_DATE);
			renderResult.RECEIVED_DATE = convertDate(renderResult.RECEIVED_DATE);
			if (renderResult.PT.length === 0) {
				renderResult.PT = ";;;;;;;;;;;;";
			}
			renderResult.PT = _.map(renderResult.PT.split(";"), function(item) {return (item.length === 0) ? "&nbsp;&nbsp;" : item;});
			if (renderResult.PT[10] !== "&nbsp;&nbsp;") {
				var hourMinutes = renderResult.PT[10].split(":");
				renderResult.PT[10] = hourMinutes[0] + " h:" + hourMinutes[1] + " m";
			}
			var timeArray = ["1", "2", "3", "4", "5", "10", "15", "20", "25", "30", "40", "45", "50", "60"];
			var PTD = _.object(timeArray, new Array(timeArray.length).fill(["&nbsp;", "&nbsp;"]));
			renderResult.PTD = createRenderItems(renderResult.PTD);
			_.each(renderResult.PTD, function(row) {
				PTD[row[0]] = [row[1], row[2]];
			});
			renderResult.PTD = PTD;
			return renderResult;
		};
		//var fs = rs.features;
		//document.getElementById("target").innerHTML = _.template(document.getElementById("Template").innerHTML, {renderResult: (fs.length === 1) ? createSingleWellRenderResult(fs) : createWellsClusterRenderResult(fs)});	
		//document.getElementById("target").innerHTML = _.template(globalConfig.template, {renderResult: (fs.length === 1) ? createSingleWellRenderResult(fs) : createWellsClusterRenderResult(fs)});	
		//document.getElementById(globalConfig.layers[0].renderTargetDiv).innerHTML = _.template(globalConfig.layers[0].template, {renderResult: (fs.length === 1) ? createSingleWellRenderResult(fs) : createWellsClusterRenderResult(fs)});		
		
		PubSub.emit(globalConfig.layers[0].event + "Data", {renderResult: (fs.length === 1) ? createSingleWellRenderResult(fs) : createWellsClusterRenderResult(fs)});
	},
	template: '			<%\
				if (Array.isArray(renderResult)) {\
			%>\
				<div class="row"><h1><%= globalConfig.chooseLang("Well ID Number", "Identification du puits") %>:&nbsp;<%= renderResult[0].WELL_ID %></h1></div>\
				<a name="content" id="content"></a>\
				<H1><%= globalConfig.chooseLang("Well Cluster Records", "Registres de groupe de puits") %></H1>\
					<% \
						if (globalConfig.isEnglish()) {\
					%>\
						The wells listed below are included on the cluster well record. They are listed by Well_ID number and UTM coordinate (Zone, Easting, Northing).<P>\
						To see the locations of <B>all</B> the associated wells, use the Well_ID number for your search on the main portal map page.<BR>To see any <B>individual record</B>, click in the ID listed below.<BR>\
						To find the <B>individual location</B> of any of the records listed below, use the UTM coordinate for your search on the main portal map.<P>\
					<% } else {%>\
						Les puits &#233;num&#233;r&#233;s ci-apr&#232;s sont compris dans le dossier du groupe de puits. Ils sont &#233;num&#233;r&#233;s par num&#233;ro d\'identification du puits et coordonn&#233;es UTM (zone, abscisse, ordonn&#233;e).<P>\
						Pour savoir les emplacements de <B>tous</B> les puits associ&#233;s, utilisez le num&#233;ro d\'identification du puits pour votre recherche sur la page de la carte principale du portail.<BR>\
						Pour visionner un <B>dossier individuel</B>, cliquez sur le num&#233;ro d\'identification indiqu&#233; ci-dessous.<BR>\
						Pour trouver <B>l\'emplacement individuel</B> d\'un des dossiers indiqu&#233;s ci-apr&#232;s, utilisez les coordonn&#233;es UTM dans votre recherche sur la carte principale du portail.<P>				\
					<% }%>\
				<TABLE class="fishTable">\
					<TR><TH><CENTER><%= globalConfig.chooseLang("Well ID", "Identification du puits") %></CENTER></TH><TH><CENTER>Zone</CENTER></TH><TH><CENTER><%= globalConfig.chooseLang("Easting", "Abscisse") %></CENTER></TH><TH><CENTER><%= globalConfig.chooseLang("Northing", "Abscisse") %></CENTER></TH></TR>\
					<%\
						_.each(renderResult,function(result,key,list){\
					%>		\
						<TR><TD><A HREF="Wells_Report.htm?id=<%= result.BORE_HOLE_ID %>"><%= result.WELL_ID %></A></TD><TD><%= result.UTMZONE %></TD><TD><%= result.EAST83 %></TD><TD><%= result.NORTH83 %>  <%= (result.BHK === "MASTER") ? ("&nbsp;&nbsp;" + globalConfig.chooseLang("Master Well", "Puits principal")) : "" %></TD></TR>\
					<%\
						});\
					%>\
				</TABLE>\
			<% } else {%>\
				<div class="row">\
					<h1><%= globalConfig.chooseLang("Well ID Number", "Identification du puits") %>:&nbsp; <%= renderResult.WELL_ID %></h1>\
				</div>\
				<a name="content" id="content"></a>\
				<%= globalConfig.chooseLang("Well Audit Number", "N<SUP>o</SUP> de v&eacute;rification") %>:&nbsp;<I><%= renderResult.AUDIT_NO %></I><BR>\
				<%= globalConfig.chooseLang("Well Tag Number", "N<SUP>o</SUP> plaque") %>:&nbsp;<I><%= renderResult.TAG %></I><P>\
				<CENTER>\
					<% \
						if (globalConfig.isEnglish()) {\
					%>\
						<I>This table contains information from the original well record and any subsequent updates.</I><BR>\
						<% \
							if (renderResult.BHK != "REGULAR") {\
						%>\
							<BR>This well is part of a well cluster. <BR><SPAN STYLE=\'font-size:75%\'>The information below is extracted from the cluster well record.\
							<BR>More information on the cluster well record (related to other wells in the cluster)</SPAN>\
							<BR><A HREF=\'Wells_Report.htm?wellid=<%= renderResult.WELL_ID %>\'>is also available.</A><BR><BR>\
						<% }%>\
					<% } else {%>\
						<I>Le pr&eacute;sent tableau contient des renseignements du dossier original du puits d&acute;eau ainsi que toutes les mises &agrave; jour suivantes. <BR>\
						Le texte dans le tableau est dans la langue re&ccedil;ue.</I><BR><BR>\
						<% \
							if (renderResult.BHK != "REGULAR") {\
						%>\
							<BR><BR>Ce puits fait partie d&acute;un groupe de puits. <BR><SPAN STYLE=\"font-size:75%\">Les donn&eacute;es ci-dessous sont extraites du registre du groupe de puits.\
							<BR> D&acute;autres renseignements sur le dossier du groupe de puits (relatifs &agrave; d&acute;autres puits dans le groupe)</SPAN>\
							<BR><A HREF=\'Wells_Report.htm?wellid=<%= renderResult.WELL_ID %>\'> sont &eacute;galement disponibles.</A><BR><BR>\
						<% }%>\
					<% }%>	\
				</CENTER>\
		   \
				<TABLE class="datatable" border="1">\
					<TBODY>\
						<TR><TD bgColor=#dddddd colSpan=4><STRONG><%= globalConfig.chooseLang("Well Location", "Emplacement du puits") %></STRONG></TD></TR>\
						<TR>\
							<TD width="35%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Address of Well Location", "Adresse de l\'emplacement du puits") %></I></SPAN></TD>\
							<TD width="35%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Township", "Canton") %></I></SPAN></TD>\
							<TD width="10%"><SPAN STYLE="font-size:75%"><I>Lot</I></SPAN></TD>\
							<TD width="20%"><SPAN STYLE="font-size:75%"><I>Concession</I></SPAN></TD>\
						</TR>\
						<TR>\
							<TD><%= renderResult.STREET %></TD>\
							<TD><%= renderResult.MOE_MUNICIPALITY_DESCR %></TD>\
							<TD><%= renderResult.LOT %></TD>\
							<TD><%= renderResult.CON %></TD>\
						</TR>\
						<TR>\
							<TD width="40%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("County/District/Municipality", "Comt&eacute;, district, municipalit&eacute;") %></I></SPAN></TD>\
							<TD width="30%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("City/Town/Village", "Ville, village") %></I></SPAN></TD>\
							<TD width="10%"><SPAN STYLE="font-size:75%"><I>Province</I></SPAN></TD>\
							<TD width="20%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Postal Code", "Code Postal") %></I></SPAN></TD>\
						</TR>\
						<TR>\
							<TD><%= renderResult.MOE_COUNTY_DESCR %></TD>\
							<TD><%= renderResult.CITY %></TD>\
							<TD>ON</TD>\
							<TD>n/a</TD>\
						</TR>\
						<TR>\
							<TD width="40%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("UTM Coordinates", "Coordonn&eacute;es UTM") %></I></SPAN></TD>\
							<TD width="30%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Municipal Plan and Sublot Number", "N<SUP>o</SUP> du plan municipal et du sous-lot") %></I></SPAN></TD>\
							<TD colSpan=2><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Other", "Autre") %></I></SPAN></TD>\
						</TR>\
						<TR>\
						  <TD><SPAN STYLE="font-size:75%">NAD83 &mdash; Zone <%= renderResult.UTMZONE %><BR><%= globalConfig.chooseLang("Easting", "Abscisse") %>: <%= renderResult.EAST83 %><BR><%= globalConfig.chooseLang("Northing", "Ordonn&eacute;e") %>: <%= renderResult.NORTH83 %></SPAN></TD>\
						  <TD>&nbsp;</TD>\
						  <TD colSpan=2>&nbsp;</TD>\
						</TR>\
					</TBODY>\
				</TABLE>\
				<TABLE class="datatable" border="1">\
					<TBODY>\
						<TR><TD bgColor=#dddddd colSpan=6><STRONG><%= globalConfig.chooseLang("Overburden and Bedrock Materials Interval", "Mort-terrain et mat&eacute;riaux de la roche-m&egrave;re") %></STRONG></TD></TR>\
						<TR>\
							<TD width="15%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("General Colour", "Couleur g&eacute;n&eacute;rale") %></I></SPAN></TD>\
							<TD width="20%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Most Common Material", "Mat&eacute;riau le plus commun") %></I></SPAN></TD>\
							<TD width="15%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Other Materials", "Autre mat&eacute;riaux") %></I></SPAN></TD>\
							<TD width="30%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("General Description", "Description g&eacute;n&eacute;rale") %></I></SPAN></TD>\
							<TD width="10%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Depth", "Profondeur") %><BR><%= globalConfig.chooseLang("From", "De") %></I></SPAN></TD>\
							<TD width="10%"><SPAN STYLE="font-size:75%"><I>&nbsp;<BR><%= globalConfig.chooseLang("To", "&agrave;") %></I></SPAN></TD>\
						</TR>\
						<%\
							_.each(renderResult.GEO,function(items,key,list){\
						%>		\
							<TR><TD><%= items[0] %></TD><TD><%= items[1] %></TD><TD><%= items[2] %></TD><TD><%= items[3] %></TD><TD><%= items[4] %></TD><TD><%= items[5] %></TD></TR>\
						<%\
							});\
						%>\
					</TBODY>\
				</TABLE>\
				<TABLE style="border:0px solid black;width:700px;border:border-collapse:collapse;">\
				<TR>\
					<TD style="vertical-align:top;">  <!--Left side of table-->\
						<TABLE class="datatable" border="1" style="width:350px;"> \
							<TBODY>\
								<TR><TD bgColor=#dddddd colSpan=4><STRONG><%= globalConfig.chooseLang("Annular Space/Abandonment Sealing Record", "Espace annulaire") %></STRONG></TD></TR>\
								<TR>\
									<TD width="15%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Depth", "Profondeur") %> <BR><%= globalConfig.chooseLang("From", "De") %></I></SPAN></TD>\
									<TD width="15%"><SPAN STYLE="font-size:75%"><I><BR><%= globalConfig.chooseLang("To", "&agrave;") %></I></SPAN></TD>\
									<TD width="50%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Type of Sealant Used<BR>(Material and Type)", "Mat&eacute;riau d\'&eacute;tanch&eacute;it&eacute;<BR>(Genre de mat&eacute;riau)") %></I></SPAN></TD>\
									<TD width="20%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Volume<BR>Placed", "Volume") %></I></SPAN></TD>\
								</TR>\
								<%\
									_.each(renderResult.PLUG,function(items,key,list){\
								%>		\
									<TR><TD><%= items[1] %></TD><TD><%= items[2] %></TD><TD><%= items[0] %></TD><TD>&nbsp;</TD></TR>\
								<%\
									});\
								%>\
							</TBODY>\
						</TABLE>\
						<TABLE class="datatable" border="1" style="width:350px;">\
							<TBODY>\
								<TR>\
									<TD width="55%" bgColor=#dddddd><STRONG><%= globalConfig.chooseLang("Method of Construction", "M&eacute;thode de construction") %></STRONG></TD>\
									<TD width="45%" bgColor=#dddddd><STRONG><%= globalConfig.chooseLang("Well Use", "Utilisation du puits") %></STRONG></TD>\
								</TR>\
								<%\
									var rows = renderResult.CM;\
									var items = rows[0];\
								%>	\
								<TR>\
									<TD><%= items[0] %></TD>\
									<TD><%= renderResult.USE1 %></TD>\
								</TR>\
								<TR>\
									<TD><%= items[1] %></TD>\
									<TD><%= renderResult.USE2 %></TD>\
								</TR>\
								<TR>\
									<TD>&nbsp;</TD>\
									<TD>&nbsp;</TD>\
								</TR>\
							</TBODY>\
						</TABLE>\
						<TABLE class="datatable" border="1" style="width:350px;">\
							<TBODY>\
								<TR><TD bgColor=#dddddd><STRONG><%= globalConfig.chooseLang("Status of Well", "Finalit&eacute; du puits") %></STRONG></TD></TR>\
								<TR><TD><%= renderResult.FINAL_STATUS_DESCR %></TD></TR>\
							</TBODY>\
						</TABLE>\
						<TABLE class="datatable" border="1" style="width:350px;">\
							<TBODY>\
								<TR><TD bgColor=#dddddd colSpan=4><STRONG><%= globalConfig.chooseLang("Construction Record - Casing", "Construction - Tubage") %></STRONG></TD></TR>\
								<TR>\
									<TD width="20%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Inside<BR>Diameter", "Diam&egrave;tre<BR>int&eacute;rieur") %></I></SPAN></TD>\
									<TD width="40%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Open Hole OR material", "Ouverture du trou OU mat&eacute;riau") %></I></SPAN></TD>\
									<TD width="20%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Depth", "Profondeur") %><BR><%= globalConfig.chooseLang("From", "De") %><BR></I></SPAN></TD>\
									<TD width="20%"><SPAN STYLE="font-size:75%"><I><BR><%= globalConfig.chooseLang("To", "&agrave;") %><BR></I></SPAN></TD>\
								</TR>\
								<%\
									_.each(renderResult.CAS,function(items,key,list){\
								%>\
								\
									<TR><TD><%= items[1] %></TD><TD><%= items[0] %></TD><TD><%= items[2] %></TD><TD><%= items[3] %></TD></TR>\
								<%\
									});\
									_.each(_.range(2 - renderResult.CAS.length),function(index,key,list){\
								%>\
									<TR><TD>&nbsp;</TD><TD>&nbsp;</TD><TD>&nbsp;</TD><TD>&nbsp;</TD></TR>\
								<%\
									});\
								%>\
								<TR><TD bgColor=#dddddd colSpan=4><STRONG><%= globalConfig.chooseLang("Construction Record - Screen", "Construction - Cr&eacute;pine") %></STRONG></TD></TR>\
								<TR>\
									<TD width="20%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Outside<BR>Diameter", "Diam&egrave;tre<BR>ext&eacute;rieur") %></I></SPAN></TD>\
									<TD width="40%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Material", "Mat&eacute;riau") %></I></SPAN>X</TD>\
									<TD width="20%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Depth", "Profondeur") %><BR><%= globalConfig.chooseLang("From", "De") %><BR></I></SPAN></TD>\
									<TD width="20%"><SPAN STYLE="font-size:75%"><I><BR><%= globalConfig.chooseLang("To", "&agrave;") %><BR></I></SPAN></TD>\
								</TR>\
								<%\
									_.each(renderResult.SCRN,function(items,key,list){\
								%>\
									<TR><TD><%= items[0] %></TD><TD><%= items[1] %></TD><TD><%= items[2] %></TD><TD><%= items[3] %></TD></TR>\
								<%\
									});\
									_.each(_.range(2 - renderResult.SCRN.length),function(index,key,list){\
								%>										\
									<TR><TD>&nbsp;</TD><TD>&nbsp;</TD><TD>&nbsp;</TD><TD>&nbsp;</TD></TR>\
								<%\
									});\
								%>\
							</TBODY>\
						</TABLE>\
						<TABLE class="datatable" border="1" style="width:350px;">\
							<TBODY>\
								<TR><TD bgColor=#dddddd colSpan=2><STRONG><%= globalConfig.chooseLang("Well Contractor and Well Technician Information", "Renseignements sur l\'entrepreneur et le technicien en contruction de puits") %></STRONG></TD></TR>\
								<TR>\
									<TD width="70%"><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Well Contractor\'s Licence Number", "N<SUP>o</SUP> de licence de l\'entrepreneur en contruction de puits") %></I></SPAN></TD>\
									<TD><CENTER><%= renderResult.CONTRACTOR %></CENTER></TD>\
								</TR>\
							</TBODY>\
						</TABLE>\
					</TD>\
					<TD> <!--Right side of table-->\
						<TABLE class="datatable" style="width:350px;" style="border-collapse:collapse;">\
							<TBODY>\
								<TR><TD bgColor=#dddddd colSpan=4><STRONG><%= globalConfig.chooseLang("Results of Well Yield Testing", "R&eacute;sultats de l\'essai du puits") %></STRONG></TD></TR>\
								<TR>\
									<TD>\
										<TABLE align=left border=1>\
											<TBODY>\
												<TR><TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("After test of well yield, water was", "Apr&egrave;s l\'essai du puits, l\'eau &eacute;tait:") %><BR></I></SPAN><CENTER><%= renderResult.PT[7] %></CENTER></TD></TR>\
												<TR><TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("If pumping discontinued, give reason", "Si le pompage est abandonn&eacute;, donnez-en les raisons: ") %><BR></I></SPAN><CENTER><%= renderResult.PT[11] %></CENTER></TD></TR>\
												<TR><TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Pump intake set at", "Niveau de pompage fix&eacute; &agrave;:") %><BR></I></SPAN><CENTER><%= renderResult.PT[2] %></CENTER></TD></TR>\
												<TR><TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Pumping Rate", "D&eacute;bit de la pompe:") %></I><BR></SPAN><CENTER><%= renderResult.PT[4] %></CENTER></TD></TR>\
												<TR><TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Duration of Pumping", "Dur&eacute;e du pompage") %></I><BR></SPAN><CENTER><%= renderResult.PT[10] %></CENTER></TD></TR>\
												<TR><TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Final water level", "Niveau d\'eau &agrave; la fin du pompage") %><BR></I></SPAN><CENTER><%= renderResult.PT[1] %></CENTER></TD></TR>\
												<TR><TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("If flowing give rate", "En cas d\'&eacute;coulement, indiquez le taux") %><BR></I></SPAN><CENTER><%= renderResult.PT[5] %></CENTER></TD></TR>\
												<TR><TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Recommended pump depth", "Profondeur recommand&eacute;e de la pompe") %><BR></I></SPAN><CENTER><%= renderResult.PT[3] %></CENTER></TD></TR>\
												<TR><TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Recommended pump rate", "Debit recommand&eacute;e de la pompe") %><BR></I></SPAN><CENTER><%= renderResult.PT[6] %></CENTER></TD></TR>\
												<TR><TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Well Production", "Production du puits") %><BR></I></SPAN><CENTER><%= renderResult.PT[8] %></CENTER></TD></TR>\
												<TR><TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Disinfected?", "D&eacute;sinfect&eacute;?") %><BR></I></SPAN><CENTER><%= renderResult.DISINFECTED %></CENTER></TD></TR>\
											</TBODY>\
										</TABLE>\
									</TD>\
									<TD>\
										<TABLE align=right border=1>\
											<TBODY>\
												<TR>\
													<TD colSpan=2 height=25><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Draw Down", "C&ocirc;ne en d&eacute;pression") %></I></SPAN></TD>\
													<TD colSpan=2><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Recovery", "R&eacute;tablissement") %></I></SPAN></TD>\
												</TR>\
												<TR>\
													<TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Time", "Temps") %><BR>(min)</I></SPAN></TD>\
													<TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Water level", "Niveau d\'eau") %> </I></SPAN><BR></TD>\
													<TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Time", "Temps") %><BR>(min)</I></SPAN></TD>\
													<TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Water level", "Niveau d\'eau ") %><BR></I></SPAN></TD>\
												</TR>\
												<TR><TD height=26><%= globalConfig.chooseLang("SWL", "NS") %></TD><TD><%= renderResult.PT[0] + ((renderResult.PT[9] === "Y") ? " FLW" : "") %></TD><TD>&nbsp;</TD><TD>&nbsp;</TD></TR>\
												<%\
													var PTDkeys = _.keys(renderResult.PTD);\
													_.each(PTDkeys,function(PTDkey,key,list){\
												%>\
													<TR><TD height=26><%= PTDkey %></TD><TD><%= renderResult.PTD[PTDkey][0] %></TD><TD><%= PTDkey %></TD><TD><%= renderResult.PTD[PTDkey][1] %></TD></TR>\
												<%\
													});\
												%>\
											</TBODY>\
										</TABLE>\
								<TR>\
									<TD style="vertical-align:top;">\
										<TABLE align=left border=1>\
											<TBODY>\
												<TR><TD bgColor=#dddddd colSpan=2><STRONG><%= globalConfig.chooseLang("Water Details", "Renseignements sur l\'eau") %></STRONG></TD></TR>\
												<TR>\
													<TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Water Found at Depth", "Eau &agrave;") %></I></SPAN></TD>\
													<TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Kind", "Type d\'eau") %></I></SPAN></TD>\
												</TR>\
												<%\
													_.each(renderResult.WAT,function(items,key,list){\
												%>\
													<TR><TD><%= items[1] %></TD><TD><%= items[0] %></TD></TR>\
												<%\
													});\
													_.each(_.range(3 - renderResult.WAT.length),function(index,key,list){\
												%>										\
													<TR><TD>&nbsp;</TD><TD>&nbsp;</TD></TR>\
												<%\
													});\
												%>\
											</TBODY>\
										</TABLE>\
									</TD>\
									<TD style="vertical-align:top;">\
										<TABLE align=right border=1>\
											<TBODY>\
												<TR><TD colSpan=3><STRONG><%= globalConfig.chooseLang("Hole Diameter", "Diam&egrave;tre du trou") %></STRONG></TD></TR>\
												<TR>\
													<TD colSpan=2><SPAN STYLE="font-size:75%"><I>&nbsp; <%= globalConfig.chooseLang("Depth", "Profondeur") %><BR><%= globalConfig.chooseLang("From", "De") %> &nbsp; &nbsp; <%= globalConfig.chooseLang("To", "&agrave;") %></I></SPAN></TD>\
													<TD><SPAN STYLE="font-size:75%"><I><%= globalConfig.chooseLang("Diameter", "Diam&egrave;tre") %></I></SPAN></TD>\
												</TR>\
												<%\
													_.each(renderResult.HOLE,function(items,key,list){\
												%>		\
													<TR><TD><%= items[1] %></TD><TD><%= items[2] %></TD><TD><%= items[0] %></TD></TR>\
												<%\
													});\
													_.each(_.range(3 - renderResult.HOLE.length),function(index,key,list){\
												%>										\
													<TR><TD>&nbsp;</TD><TD>&nbsp;</TD><TD>&nbsp;</TD></TR>\
												<%\
													});\
												%>\
											</TBODY>\
										</TABLE>\
									</TD>\
								</TR>\
								<TR><TD COLSPAN="2"><STRONG><%= globalConfig.chooseLang("Audit Number", "N<SUP>o</SUP> de v&eacute;rification") %>:</STRONG> <%= renderResult.AUDIT_NO %></TD></TR>\
								<TR><TD COLSPAN="2"><STRONG><%= globalConfig.chooseLang("Date Well Completed", "Date de finition") %>:</STRONG> <%= renderResult.WELL_COMPLETED_DATE %></TD></TR>\
								<TR><TD COLSPAN="2"><STRONG><%= globalConfig.chooseLang("Date Well Record Received by MOE", "Date de r&eacute;ception du registre de puits<br>par le MEO") %>:</STRONG> <%= renderResult.RECEIVED_DATE %></TD></TR>\
							</TBODY>\
						</TABLE>\
						</TD>\
					</TR>\
				</TABLE>\
			<% }%>'
}];

