globalConfig = {};
globalConfig.language = "FR";

//globalConfig.searchHelpTxt = "Recherche de <b>num\u00e9ro du puits du r\u00e9seau</b>, <b>profondeur du puits</b>, <b>d\u0027adresse</b> ou cliquer sur aide pour plus d\u0027information sur la recherche avanc\u00e9e.";
//globalConfig.otherInfoHTML = '<p><img src="http://files.ontariogovernment.ca/moe_mapping/mapping/js/OneSite/PGMN/legend_FR.jpg" alt="PGMN legend french" /></p><p>Certaines donn&eacute;es scientifiques et de surveillance n&rsquo;existent qu&rsquo;en anglais.</p>';
globalConfig.otherInfoHTML = '<p>Certaines donn&eacute;es scientifiques et de surveillance n&rsquo;existent qu&rsquo;en anglais.</p>';

globalConfig.WellLang = "Puits";
globalConfig.tabsTemplateContentWell = "Num\u00e9ro du puits du r\u00e9seau: <b>{PGMN_WELL}</b><br>Office de protection de la nature: <b>{CONS_AUTHO}</b><br>Comt\u00e9: <b>{globalConfig.wordCapitalize(COUNTY)}</b><br>Canton: <b>{globalConfig.wordCapitalize(TOWNSHIP)}</b>, <b>{CONCESSION}</b>, <b>{LOT}</b><br>Num\u00e9ro du site: <b>{SiteID}</b><br>Latitude <b>{globalConfig.deciToDegree(LATITUDE)}</b>&nbsp;&nbsp;&nbsp;Longitude <b>{globalConfig.deciToDegree(LONGITUDE)}</b><br><BR>Altitude (a.n.m.):<b>{ELVA_GROUN}</b> m\u00e8tres<br>Profondeur du puits (m\u00e8tres sous le sol): <b>{WELL_DEPTH}</b><br>Type d'aquif\u00e8re: <b>{AQUIFER_TY}</b><br>Lithologie de l'aquif\u00e8re: <b>{AQUIFER_LI}</b><br>Num\u00e9ro du registre de puits d'eau (NRPE): <b>{STRATIGRAP}</b><br>Description stratigraphique des rapports ou notes: <b>{STRATI_DES}</b><br>NRPE des puits situ\u00e9s pr\u00e8s d'un puits du r\u00e9seau: <b>{NO_RECORD}</b><br>Diam\u00e8tre du puits ou pi\u00e9zom\u00e8tre: <b>{WEL_PIEZOM}</b> cm<br>Intervalle d'\u00e9cran ou intervalle \u00e0 trou ouvert (m\u00e8tres sous terre): <b>{SCREEN_HOL}</b>";
globalConfig.WaterLevelLang = "Niveau d'eau";
globalConfig.tabsTemplateContentWaterLevel = "<img height=300 width=400 src='http://files.ontariogovernment.ca/moe_mapping/mapping/PGMN/WaterLevel/png/FR/{PGMN_WELL}.png'/><br><a target='_blank' href='http://files.ontariogovernment.ca/moe_mapping/mapping/PGMN/WaterLevel/csv/{PGMN_WELL}.zip'>Donn\u00e9es sur le niveau d'eau (Fichier compress&eacute; CSV)</a>";
globalConfig.ChemistryLang = "Chimie";
//globalConfig.tabsTemplateContentChemistry = "Le minist\u00e8re de l'Environnement effectue en laboratoire une analyse chimique de l'eau de chaque puits du r\u00e9seau, notamment les param\u00e8tres chimiques g\u00e9n\u00e9raux, les m\u00e9taux, les ions majeurs, les compos\u00e9s organiques volatils et divers pesticides et herbicides. Le programme ne surveille pas les bact\u00e9ries. Environ 380 des puits du r\u00e9seau ont \u00e9t\u00e9 d\u00e9sign\u00e9s comme devant faire l'objet d'une surveillance chimique de l'eau \u00e0 long terme. Les param\u00e8tres de surveillance \u00e0 long terme sont les suivants : param\u00e8tres chimiques g\u00e9n\u00e9raux, m\u00e9taux, ions majeurs. Des \u00e9chantillons sont pr\u00e9lev\u00e9s \u00e0 l'automne, puis analys\u00e9s soit dans un laboratoire du minist\u00e8re, soit dans un laboratoire priv\u00e9.<br><br>Des \u00e9chantillons d'eau ont \u00e9t\u00e9 pr\u00e9lev\u00e9s dans ce puits les dates suivantes: {globalConfig.getTable(CHEM_CONTE)}. <br><br>En cliquant sur le rapport des donn\u00e9es chimiques de l'eau ci-dessous, on peut voir la liste des param\u00e8tres chimiques, les r\u00e9sultats d'analyse chimique et les diagrammes des param\u00e8tres chimiques de ce puits.<br><br><a target='_blank' href='PGMN_Report.htm?id={PGMN_WELL}'>Rapport des donn\u00e9es chimiques de l'eau</a>";
//globalConfig.tabsTemplateContentChemistry = "Le minist\u00e8re de l'Environnement effectue en laboratoire une analyse chimique de l'eau de chaque puits du r\u00e9seau, notamment les param\u00e8tres chimiques g\u00e9n\u00e9raux, les m\u00e9taux, les ions majeurs, les compos\u00e9s organiques volatils et divers pesticides et herbicides. Le programme ne surveille pas les bact\u00e9ries. Environ 380 des puits du r\u00e9seau ont \u00e9t\u00e9 d\u00e9sign\u00e9s comme devant faire l'objet d'une surveillance chimique de l'eau \u00e0 long terme. Les param\u00e8tres de surveillance \u00e0 long terme sont les suivants : param\u00e8tres chimiques g\u00e9n\u00e9raux, m\u00e9taux, ions majeurs. Des \u00e9chantillons sont pr\u00e9lev\u00e9s \u00e0 l'automne, puis analys\u00e9s soit dans un laboratoire du minist\u00e8re, soit dans un laboratoire priv\u00e9.<br><br>Des \u00e9chantillons d'eau ont \u00e9t\u00e9 pr\u00e9lev\u00e9s dans ce puits les dates suivantes: {globalConfig.getTable(CHEM_CONTE)}. <br><br>En cliquant sur le rapport des donn\u00e9es chimiques de l'eau ci-dessous, on peut voir la liste des param\u00e8tres chimiques, les r\u00e9sultats d'analyse chimique et les diagrammes des param\u00e8tres chimiques de ce puits.<br><br><a target='_blank' href='fr_pgmn_report?id={PGMN_WELL}'>Rapport des donn\u00e9es chimiques de l'eau</a>";
globalConfig.PrecipitationLang = "Pr\u00e9cipitation";
globalConfig.tabsTemplateContentPrecipitation = "<img height=300 width=400 src='http://files.ontariogovernment.ca/moe_mapping/mapping/PGMN/Precipitation/png/FR/{Site_ID}.png'/><br><a target='_blank' href='http://files.ontariogovernment.ca/moe_mapping/mapping/PGMN/Precipitation/csv/{Site_ID}.csv'>Donn\u00e9es sur les pr\u00e9cipitations (CSV)</a>";
/*globalConfig.searchControlHTML = '<table width="100%" cellpadding="5" cellspacing="0" border="0" style="margin-bottom:15px;" summary="Recherche carte interactive forme">\
			<caption style="text-align:left;">Recherche carte interactive</caption>\
			<tr>\
				<th scope="col"></th>\
				<th scope="col"></th>\
			</tr>\
			<tr>\
				<td valign="top" width="450px">\
					<input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="Terme"></input>&nbsp;<input type="submit" onclick="globalConfig.search()" value="Recherche" title="Recherche"></input>								\
				</td>\
				<td valign="top">	\
					<input id="currentMapExtent" type="checkbox" name="currentExtent" title="&Eacute;tendue de la carte courante"><span title="Afficher la carte : Limiter la recherche &agrave; la carte donn&eacute;e." class="tooltip">&Eacute;tendue de la carte courante</span>\
				</td>\
			</tr>\
			<tr>\
				<td colspan="2">\
					<div id="information" style="margin-top:10px;">\
						Recherche de <strong>numéro du puits du réseau</strong>, <strong>profondeur du puits</strong>, <strong>d’adress</strong> ou cliquer sur aide pour plus d’information sur la recherche avancée.\
					</div>\
				</td>\
			</tr>\
		</table>';*/