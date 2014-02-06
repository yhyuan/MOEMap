if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}
//globalConfig.Wells_Report_URL = "Wells_Report.htm";
globalConfig.Wells_Report_URL = globalConfig.chooseLang("well-record-information", "donnees-completes-sur-le-puits");
globalConfig.layers = [{
	url: globalConfig.url + "/1",
	renderTargetDiv: "target",
	event: "reportReady",
	where: (QueryString.hasOwnProperty("wellid") ? ("(WELL_ID = '" + QueryString.wellid + "')"):("(BORE_HOLE_ID = " + QueryString.id + ")")),
	outFields: (QueryString.hasOwnProperty("wellid") ? ["BORE_HOLE_ID", "WELL_ID", "BHK", "UTMZONE", "EAST83", "NORTH83"] : ["BORE_HOLE_ID", "WELL_ID", "BHK", "PREV_WELL_ID", "DPBR_M", "WELL_TYPE", "DEPTH_M", "YEAR_COMPLETED", "WELL_COMPLETED_DATE", "RECEIVED_DATE", "AUDIT_NO", "TAG", "CONTRACTOR", "SWL", "FINAL_STATUS_DESCR", "USE1", "USE2", "MOE_COUNTY_DESCR", "MOE_MUNICIPALITY_DESCR", "CON", "LOT", "STREET", "CITY", "UTMZONE", "EAST83", "NORTH83", "GEO", "PLUG", "HOLE", "CM", "CAS", "SCRN", "WAT", "PT", "PTD", "DISINFECTED"]),
	processResults: function (fs) {
		var createWellsClusterRenderResult = function (fs) {
			return _.map(fs, function(feature) {			
				return {
					WELL_ID: feature.attributes.WELL_ID || "", 
					UTMZONE: feature.attributes.UTMZONE || "", 
					EAST83: feature.attributes.EAST83 || "", 
					NORTH83: feature.attributes.NORTH83 || "", 
					BORE_HOLE_ID: feature.attributes.BORE_HOLE_ID || "",
					BHK: feature.attributes.BHK || ""
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
			renderResult.PT = renderResult.PT.trim();
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
	template: '<%\
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
				<TABLE>\
					<TR><TH><CENTER><%= globalConfig.chooseLang("Well ID", "Identification du puits") %></CENTER></TH><TH><CENTER>Zone</CENTER></TH><TH><CENTER><%= globalConfig.chooseLang("Easting", "Abscisse") %></CENTER></TH><TH><CENTER><%= globalConfig.chooseLang("Northing", "Abscisse") %></CENTER></TH></TR>\
					<%\
						_.each(renderResult,function(result,key,list){\
					%>\
						<TR><TD><A HREF="<%= globalConfig.Wells_Report_URL %>?id=<%= result.BORE_HOLE_ID %>"><%= result.WELL_ID %></A></TD><TD><%= result.UTMZONE %></TD><TD><%= result.EAST83 %></TD><TD><%= result.NORTH83 %>  <%= (result.BHK === "MASTER") ? ("&nbsp;&nbsp;" + globalConfig.chooseLang("Master Well", "Puits principal")) : "" %></TD></TR>\
					<%\
						});\
					%>\
				</TABLE>\
			<% } else {%>\
				<!-- new code for MOE Well Records pages  -->\
				<h2>Well ID</h2>\
				<%= globalConfig.chooseLang("Well ID Number", "Identification du puits") %>:&nbsp; <%= renderResult.WELL_ID %><BR>\
				<%= globalConfig.chooseLang("Well Audit Number", "N<SUP>o</SUP> de v&eacute;rification") %>:&nbsp;<I><%= renderResult.AUDIT_NO %></I><BR>\
				<%= globalConfig.chooseLang("Well Tag Number", "N<SUP>o</SUP> plaque") %>:&nbsp;<I><%= renderResult.TAG %></I><P>\
				<I><%= globalConfig.chooseLang("This table contains information from the original well record and any subsequent updates.", "Le pr&eacute;sent tableau contient des renseignements du dossier original du puits d&acute;eau ainsi que toutes les mises &agrave; jour suivantes. <BR>Le texte dans le tableau est dans la langue re&ccedil;ue.") %></I><BR>\
				<%\
					if (renderResult.BHK != "REGULAR") {\
						if (globalConfig.isEnglish()) {\
				%>\
								<BR>This well is part of a well cluster. <BR><SPAN STYLE=\'font-size:75%\'>The information below is extracted from the cluster well record.\
								<BR>More information on the cluster well record (related to other wells in the cluster)</SPAN>\
								<BR><A HREF=\'<%= globalConfig.Wells_Report_URL %>?wellid=<%= renderResult.WELL_ID %>\'>is also available.</A><BR><BR>\
						<%\
							} else {\
						%>\
								<BR><BR>Ce puits fait partie d&acute;un groupe de puits. <BR><SPAN STYLE=\"font-size:75%\">Les donn&eacute;es ci-dessous sont extraites du registre du groupe de puits.\
								<BR> D&acute;autres renseignements sur le dossier du groupe de puits (relatifs &agrave; d&acute;autres puits dans le groupe)</SPAN>\
								<BR><A HREF=\'<%= globalConfig.Wells_Report_URL %>?wellid=<%= renderResult.WELL_ID %>\'> sont &eacute;galement disponibles.</A><BR><BR>		\
						<%\
							}\
						%>\
				<%\
					}\
				%>\
				<h2><%= globalConfig.chooseLang("Well Location", "Emplacement du puits") %></h2>\
				<TABLE class="noStripes">\
				  <TBODY>\
					   <tr>\
						  <th><%= globalConfig.chooseLang("Address of Well Location", "Adresse de l\'emplacement du puits") %></th>\
						  <td><%= renderResult.STREET %></td>\
						</tr>\
						<tr>\
						  <th><%= globalConfig.chooseLang("Township", "Canton") %></th>\
						  <td><%= renderResult.MOE_MUNICIPALITY_DESCR %></td>\
						</tr>\
						<tr>\
						  <th>Lot</th>\
						  <td><%= renderResult.LOT %></td>\
						</tr>\
						<tr>\
						  <th>Concession</th>\
						  <td><%= renderResult.CON %></td>\
						</tr>\
						<tr>\
						  <th><%= globalConfig.chooseLang("County/District/Municipality", "Comt&eacute;, district, municipalit&eacute;") %></th>\
						  <td><%= renderResult.MOE_COUNTY_DESCR %></td>\
						</tr>\
						<tr>\
						  <th><%= globalConfig.chooseLang("City/Town/Village", "Ville, village") %></th>\
						  <td><%= renderResult.CITY %></td>\
						</tr>\
						<tr>\
						  <th>Province</th>\
						  <td>ON</td>\
						</tr>\
						<tr>\
						  <th><%= globalConfig.chooseLang("Postal Code", "Code Postal") %></th>\
						  <td>n/a</td>\
						</tr>\
						<tr>\
						  <th><%= globalConfig.chooseLang("UTM Coordinates", "Coordonn&eacute;es UTM") %></th>\
						  <td>NAD83 &mdash; Zone <%= renderResult.UTMZONE %><BR><%= globalConfig.chooseLang("Easting", "Abscisse") %>: <%= renderResult.EAST83 %><BR><%= globalConfig.chooseLang("Northing", "Ordonn&eacute;e") %>: <%= renderResult.NORTH83 %></td>\
						</tr>\
						<tr>\
						  <th><%= globalConfig.chooseLang("Municipal Plan and Sublot Number", "N<SUP>o</SUP> du plan municipal et du sous-lot") %></th>\
						  <td>&nbsp;</td>\
						</tr>\
						<tr>\
						  <th><%= globalConfig.chooseLang("Other", "Autre") %></th>\
						  <td>&nbsp;</td>\
						</tr>\
					  </TBODY>\
				</TABLE>\
				<h2><%= globalConfig.chooseLang("Overburden and Bedrock Materials Interval", "Mort-terrain et mat&eacute;riaux de la roche-m&egrave;re") %></h2>\
				<TABLE class="noStripes">\
				  <TBODY>\
						<TR>\
						  <TH><%= globalConfig.chooseLang("General Colour", "Couleur g&eacute;n&eacute;rale") %></TH>\
						  <TH><%= globalConfig.chooseLang("Most Common Material", "Mat&eacute;riau le plus commun") %></TH>\
						  <TH><%= globalConfig.chooseLang("Other Materials", "Autre mat&eacute;riaux") %></TH>\
						  <TH><%= globalConfig.chooseLang("General Description", "Description g&eacute;n&eacute;rale") %></TH>\
						  <TH><%= globalConfig.chooseLang("Depth", "Profondeur") %><BR><%= globalConfig.chooseLang("From", "De") %></TH>\
						  <TH><%= globalConfig.chooseLang("Depth", "Profondeur") %><BR><%= globalConfig.chooseLang("To", "&agrave;") %></TH>\
						</TR>\
						<%\
							_.each(renderResult.GEO,function(items,key,list){\
						%>\
							<TR><TD><%= items[0] %></TD><TD><%= items[1] %></TD><TD><%= items[2] %></TD><TD><%= items[3] %></TD><TD><%= items[4] %></TD><TD><%= items[5] %></TD></TR>\
						<%\
							});\
						%>\
				</TBODY>\
				</TABLE>\
				<H2><%= globalConfig.chooseLang("Annular Space/Abandonment Sealing Record", "Espace annulaire") %></H2>\
				  <TABLE class="noStripes"> \
					<TBODY>\
					  <TR>\
						<TH><%= globalConfig.chooseLang("Depth", "Profondeur") %> <BR><%= globalConfig.chooseLang("From", "De") %></TH>\
						<TH><%= globalConfig.chooseLang("Depth", "Profondeur") %> <BR><%= globalConfig.chooseLang("To", "&agrave;") %></TH>\
						<TH><%= globalConfig.chooseLang("Type of Sealant Used<BR>(Material and Type)", "Mat&eacute;riau d\'&eacute;tanch&eacute;it&eacute;<BR>(Genre de mat&eacute;riau)") %></TH>\
						<TH><%= globalConfig.chooseLang("Volume<BR>Placed", "Volume") %></TH>\
					  </TR>\
						<%\
							_.each(renderResult.PLUG,function(items,key,list){\
						%>\
							<TR><TD><%= items[1] %></TD><TD><%= items[2] %></TD><TD><%= items[0] %></TD><TD>&nbsp;</TD></TR>\
						<%\
							});\
						%>\
					</TBODY>\
				  </TABLE>\
				<H2><%= globalConfig.chooseLang("Method of Construction", "M&eacute;thode de construction") %> &amp; <%= globalConfig.chooseLang("Well Use", "Utilisation du puits") %></H2>\
				<TABLE class="noStripes">\
				  <TBODY>\
					<TR>\
					  <TH><%= globalConfig.chooseLang("Method of Construction", "M&eacute;thode de construction") %></TH>\
					  <TH><%= globalConfig.chooseLang("Well Use", "Utilisation du puits") %></TH>\
					</TR>\
					<%\
						var rows = renderResult.CM;\
						var items = rows[0];\
					%>\
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
				<h2><%= globalConfig.chooseLang("Status of Well", "Finalit&eacute; du puits") %></h2>\
				<p><%= renderResult.FINAL_STATUS_DESCR %></p>\
				<h2><%= globalConfig.chooseLang("Construction Record - Casing", "Construction - Tubage") %></h2>\
				<TABLE class="noStripes">\
				  <TBODY>\
					<TR>\
					  <TH><%= globalConfig.chooseLang("Inside<BR>Diameter", "Diam&egrave;tre<BR>int&eacute;rieur") %></TH>\
					  <TH><%= globalConfig.chooseLang("Open Hole OR material", "Ouverture du trou OU mat&eacute;riau") %></TH>\
					  <TH><%= globalConfig.chooseLang("Depth", "Profondeur") %><BR><%= globalConfig.chooseLang("From", "De") %></TH>\
					  <TH><%= globalConfig.chooseLang("Depth", "Profondeur") %><BR><%= globalConfig.chooseLang("To", "&agrave;") %></TH>\
					</TR>\
					<%\
						_.each(renderResult.CAS,function(items,key,list){\
					%>\
						<TR><TD><%= items[1] %></TD><TD><%= items[0] %></TD><TD><%= items[2] %></TD><TD><%= items[3] %></TD></TR>\
					<%\
						});\
						_.each(_.range(2 - renderResult.CAS.length),function(index,key,list){\
					%>\
						<TR><TD>&nbsp;</TD><TD>&nbsp;</TD><TD>&nbsp;</TD><TD>&nbsp;</TD></TR>\
					<%\
						});\
					%>\
				  </tbody>\
				</table>\
				 <h2><%= globalConfig.chooseLang("Construction Record - Screen", "Construction - Cr&eacute;pine") %></h2>         \
				<TABLE class="noStripes">\
				  <TBODY>\
					<TR>\
					  <TD><%= globalConfig.chooseLang("Outside<BR>Diameter", "Diam&egrave;tre<BR>ext&eacute;rieur") %></TD>\
					  <TD><%= globalConfig.chooseLang("Material", "Mat&eacute;riau") %></TD>\
					  <TD><%= globalConfig.chooseLang("Depth", "Profondeur") %><BR><%= globalConfig.chooseLang("From", "De") %></TD>\
					  <TD><%= globalConfig.chooseLang("Depth", "Profondeur") %><BR><%= globalConfig.chooseLang("To", "&agrave;") %></TD>\
					</TR>\
					<%\
						_.each(renderResult.SCRN,function(items,key,list){\
					%>\
						<TR><TD><%= items[0] %></TD><TD><%= items[1] %></TD><TD><%= items[2] %></TD><TD><%= items[3] %></TD></TR>\
					<%\
						});\
						_.each(_.range(2 - renderResult.SCRN.length),function(index,key,list){\
					%>\
						<TR><TD>&nbsp;</TD><TD>&nbsp;</TD><TD>&nbsp;</TD><TD>&nbsp;</TD></TR>\
					<%\
						});\
					%>\
				  </TBODY>\
				</TABLE>\
				<h2><%= globalConfig.chooseLang("Well Contractor and Well Technician Information", "Renseignements sur l\'entrepreneur et le technicien en contruction de puits") %></h2>\
				<p><%= globalConfig.chooseLang("Well Contractor\'s Licence Number", "N<SUP>o</SUP> de licence de l\'entrepreneur en contruction de puits") %>: <%= renderResult.CONTRACTOR %></p>\
				<h2><%= globalConfig.chooseLang("Results of Well Yield Testing", "R&eacute;sultats de l\'essai du puits") %></h2>\
				<TABLE class="noStripes">\
									<TBODY>\
									<TR>\
									  <th><%= globalConfig.chooseLang("After test of well yield, water was", "Apr&egrave;s l\'essai du puits, l\'eau &eacute;tait:") %></th>\
									  <TD><%= renderResult.PT[7] %></TD>\
									  </TR>\
									<TR>\
									  <TH><%= globalConfig.chooseLang("If pumping discontinued, give reason", "Si le pompage est abandonn&eacute;, donnez-en les raisons: ") %></TH>\
									  <td><%= renderResult.PT[11] %></td>\
									  </TR>\
									<TR>                      \
									  <TH><%= globalConfig.chooseLang("Pump intake set at", "Niveau de pompage fix&eacute; &agrave;:") %></TH>\
									  <td><%= renderResult.PT[2] %></td> \
									</TR>\
									<TR>\
									  <TH><%= globalConfig.chooseLang("Pumping Rate", "D&eacute;bit de la pompe:") %></TH>\
									  <td><%= renderResult.PT[4] %></td>\
									</TR>\
									<TR>\
									  <TH><%= globalConfig.chooseLang("Duration of Pumping", "Dur&eacute;e du pompage") %></TH>\
									  <td><%= renderResult.PT[10] %></td>\
									</TR>\
									<TR>\
									  <TH><%= globalConfig.chooseLang("Final water level", "Niveau d\'eau &agrave; la fin du pompage") %></TH>\
									  <td><%= renderResult.PT[1] %></td></TR>\
									<TR>\
									  <TH><%= globalConfig.chooseLang("If flowing give rate", "En cas d\'&eacute;coulement, indiquez le taux") %></TH>\
									  <td><%= renderResult.PT[5] %></td>\
									</TR>\
									<TR>\
									  <TH><%= globalConfig.chooseLang("Recommended pump depth", "Profondeur recommand&eacute;e de la pompe") %></TH>\
									  <td><%= renderResult.PT[3] %></td></TR>\
									<TR>\
									  <TH><%= globalConfig.chooseLang("Recommended pump rate", "Debit recommand&eacute;e de la pompe") %></TH>\
									  <td><%= renderResult.PT[6] %></td>\
									</TR>\
									<TR>\
									  <TH><%= globalConfig.chooseLang("Well Production", "Production du puits") %></TH>\
									  <td><%= renderResult.PT[8] %></td></TR>\
									<TR>\
									  <TH><%= globalConfig.chooseLang("Disinfected?", "D&eacute;sinfect&eacute;?") %></TH>\
									  <td><%= renderResult.DISINFECTED %></td>\
									</TR>\
								  </TBODY>\
								</TABLE>\
				<h3><%= globalConfig.chooseLang("Draw Down", "C&ocirc;ne en d&eacute;pression") %> &amp; <%= globalConfig.chooseLang("Recovery", "R&eacute;tablissement") %></h3>\
				<TABLE class="noStripes">\
									<TBODY>\
									<TR>\
									  <TH><%= globalConfig.chooseLang("Draw Down", "C&ocirc;ne en d&eacute;pression") %> <%= globalConfig.chooseLang("Time", "Temps") %><BR>(min)</TH>\
									  <TH><%= globalConfig.chooseLang("Draw Down", "C&ocirc;ne en d&eacute;pression") %> <%= globalConfig.chooseLang("Water level", "Niveau d\'eau") %></TH>\
									  <TH><%= globalConfig.chooseLang("Recovery", "R&eacute;tablissement") %> <%= globalConfig.chooseLang("Time", "Temps") %><BR>(min)</TH>\
									  <TH><%= globalConfig.chooseLang("Recovery", "R&eacute;tablissement") %> <%= globalConfig.chooseLang("Water level", "Niveau d\'eau") %></TH>\
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
				<h3><%= globalConfig.chooseLang("Water Details", "Renseignements sur l\'eau") %></h3>           \
						  <TABLE class="noStripes">\
									<TBODY>\
								   <TR>\
									  <TH><%= globalConfig.chooseLang("Water Found at Depth", "Eau &agrave;") %></TH>\
									  <TH><%= globalConfig.chooseLang("Kind", "Type d\'eau") %></TH>\
									</TR>\
									<%\
										_.each(renderResult.WAT,function(items,key,list){\
									%>\
										<TR><TD><%= items[1] %></TD><TD><%= items[0] %></TD></TR>\
									<%\
										});\
										_.each(_.range(3 - renderResult.WAT.length),function(index,key,list){\
									%>\
										<TR><TD>&nbsp;</TD><TD>&nbsp;</TD></TR>\
									<%\
										});\
									%>\
						   </TBODY>\
						 </TABLE>\
				<h3><%= globalConfig.chooseLang("Hole Diameter", "Diam&egrave;tre du trou") %></h3>\
				<TABLE class="noStripes">\
									<TBODY>\
									\
									<TR>\
									  <TH><%= globalConfig.chooseLang("Depth", "Profondeur") %><BR><%= globalConfig.chooseLang("From", "De") %></TH>\
									  <TH><%= globalConfig.chooseLang("Depth", "Profondeur") %><BR><%= globalConfig.chooseLang("To", "&agrave;") %></TH>\
									  <TH><%= globalConfig.chooseLang("Diameter", "Diam&egrave;tre") %></TH>\
									</TR>\
									<%\
										_.each(renderResult.HOLE,function(items,key,list){\
									%>\
										<TR><TD><%= items[1] %></TD><TD><%= items[2] %></TD><TD><%= items[0] %></TD></TR>\
									<%\
										});\
										_.each(_.range(3 - renderResult.HOLE.length),function(index,key,list){\
									%>\
										<TR><TD>&nbsp;</TD><TD>&nbsp;</TD><TD>&nbsp;</TD></TR>\
									<%\
										});\
									%>\
						  </TBODY>\
						</TABLE>\
				<p><STRONG><%= globalConfig.chooseLang("Audit Number", "N<SUP>o</SUP> de v&eacute;rification") %>:</STRONG> <%= renderResult.AUDIT_NO %></p>\
				<p><STRONG><%= globalConfig.chooseLang("Date Well Completed", "Date de finition") %>:</STRONG> <%= renderResult.WELL_COMPLETED_DATE %></p>\
				<p><STRONG><%= globalConfig.chooseLang("Date Well Record Received by MOE", "Date de r&eacute;ception du registre de puits<br>par le MEO") %>: </STRONG><%= renderResult.RECEIVED_DATE %></p>\
			<% }%>'
}];

