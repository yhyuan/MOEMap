globalConfig = {};
globalConfig.language = "EN";
//globalConfig.searchHelpTxt = "Search <strong>PGMN Well ID</strong>, <strong>Well Depth</strong>, <strong>Address</strong> or see help for more advanced options.";
//globalConfig.searchHelpTxt = "Search <strong>PGMN Well ID</strong>, <strong>Well Depth</strong>, <strong>Address</strong>";
//globalConfig.otherInfoHTML = '<p><img alt="PGMN legend" src="http://files.ontariogovernment.ca/moe_mapping/mapping/js/OneSite/PGMN/legend_EN.jpg" /></p><p>Some scientific/monitoring data is only provided in English.</p>';
globalConfig.otherInfoHTML = '<p>Some scientific/monitoring data is only provided in English.</p>';
globalConfig.WellLang = "Well";
globalConfig.tabsTemplateContentWell = "PGMN Well ID: <b>{PGMN_WELL}</b><br>Conservation Authority: <b>{CONS_AUTHO}</b><br>County: <b>{globalConfig.wordCapitalize(COUNTY)}</b><br>Township: <b>{globalConfig.wordCapitalize(TOWNSHIP)}</b>, <b>{CONCESSION}</b>, <b>{LOT}</b><br>Site ID: <b>{SiteID}</b><br>Latitude <b>{globalConfig.deciToDegree(LATITUDE)}</b>&nbsp;&nbsp;&nbsp;Longitude <b>{globalConfig.deciToDegree(LONGITUDE)}</b><br><BR>Ground Elevation (m.a.s.l.):<b>{ELVA_GROUN}</b> meters<br>Well Depth (meters below ground): <b>{WELL_DEPTH}</b><br>Aquifer Type: <b>{AQUIFER_TY}</b><br>Lithology of Aquifer: <b>{AQUIFER_LI}</b><br>Water Well Record Number (WWR): <b>{STRATIGRAP}</b><br>Stratigraphy Description from reports or notes: <b>{STRATI_DES}</b><br>WWR for wells near to the PGMN well: <b>{NO_RECORD}</b><br>Diameter of Well or Piezometer: <b>{WEL_PIEZOM}</b> cm<br>Screen Interval or Open Hole Interval (meters below ground): <b>{SCREEN_HOL}</b>";
globalConfig.WaterLevelLang = "Water Level";
//globalConfig.tabsTemplateContentWaterLevel = "<img height=300 width=400 src='http://www.downloads.ene.gov.on.ca/files/mapping/PGMN/WaterLevel/png/EN/{PGMN_WELL}.png'/><br><a target='_blank' href='http://www.downloads.ene.gov.on.ca/files/mapping/PGMN/WaterLevel/csv/{PGMN_WELL}.zip'>Water Level Data</a>";

globalConfig.tabsTemplateContentWaterLevel = "<img height=300 width=400 src='http://files.ontariogovernment.ca/moe_mapping/mapping/PGMN/WaterLevel/png/EN/{PGMN_WELL}.png'/><br><a target='_blank' href='http://files.ontariogovernment.ca/moe_mapping/mapping/PGMN/WaterLevel/csv/{PGMN_WELL}.zip'>Water Level Data (zipped CSV)</a>";
globalConfig.ChemistryLang = "Chemistry";

//globalConfig.tabsTemplateContentChemistry = "Each PGMN well is initially sampled and chemically analyzed at the Ministry of Environment laboratory for a comprehensive set of chemical parameters including: general chemistry, metals, major ions, a suite of volatile organic compounds, and a suite of pesticides and herbicides. Bacteria are not monitored under the PGMN program. Approximately 380 of the PGMN wells have been selected for long-term annual water chemistry monitoring. The long-term monitoring parameters include: general chemistry, metals, and major ions. Samples are collected from the wells in the Fall season and chemically analyzed at either the Ministry laboratory or a number of private laboratories.<br><br>Water samples have been collected from this well on {globalConfig.getTable(CHEM_CONTE)}. <br><br>By clicking on the Water Chemistry Report link below, you can view the list of chemical parameters, the chemical results and chemical parameter graphs for this well.<br><br><a target='_blank' href='http://www.downloads.ene.gov.on.ca/files/mapping/PGMN/WaterChemistry/EN/{PGMN_WELL}.htm'>Water Chemistry Report</a>";
//globalConfig.tabsTemplateContentChemistry = "Each PGMN well is initially sampled and chemically analyzed at the Ministry of Environment laboratory for a comprehensive set of chemical parameters including: general chemistry, metals, major ions, a suite of volatile organic compounds, and a suite of pesticides and herbicides. Bacteria are not monitored under the PGMN program. Approximately 380 of the PGMN wells have been selected for long-term annual water chemistry monitoring. The long-term monitoring parameters include: general chemistry, metals, and major ions. Samples are collected from the wells in the Fall season and chemically analyzed at either the Ministry laboratory or a number of private laboratories.<br><br>Water samples have been collected from this well on {globalConfig.getTable(CHEM_CONTE)}. <br><br>By clicking on the Water Chemistry Report link below, you can view the list of chemical parameters, the chemical results and chemical parameter graphs for this well.<br><br><a target='_blank' href='PGMN_Report.htm?id={PGMN_WELL}'>Water Chemistry Report</a>";
//globalConfig.tabsTemplateContentChemistry = "Each PGMN well is initially sampled and chemically analyzed at the Ministry of Environment laboratory for a comprehensive set of chemical parameters including: general chemistry, metals, major ions, a suite of volatile organic compounds, and a suite of pesticides and herbicides. Bacteria are not monitored under the PGMN program. Approximately 380 of the PGMN wells have been selected for long-term annual water chemistry monitoring. The long-term monitoring parameters include: general chemistry, metals, and major ions. Samples are collected from the wells in the Fall season and chemically analyzed at either the Ministry laboratory or a number of private laboratories.<br><br>Water samples have been collected from this well on {globalConfig.getTable(CHEM_CONTE)}. <br><br>By clicking on the Water Chemistry Report link below, you can view the list of chemical parameters, the chemical results and chemical parameter graphs for this well.<br><br><a target='_blank' href='en_pgmn_report?id={PGMN_WELL}'>Water Chemistry Report</a>";
globalConfig.PrecipitationLang = "Precipitation";
//globalConfig.tabsTemplateContentPrecipitation = "<img height=300 width=400 src='http://www.downloads.ene.gov.on.ca/files/mapping/PGMN/Precipitation/png/EN/{Site_ID}.png'/><br><a target='_blank' href='http://www.downloads.ene.gov.on.ca/files/mapping/PGMN/Precipitation/csv/{Site_ID}.csv'>Precipitation Data (csv file)</a>";

globalConfig.tabsTemplateContentPrecipitation = "<img height=300 width=400 src='http://files.ontariogovernment.ca/moe_mapping/mapping/PGMN/Precipitation/png/EN/{Site_ID}.png'/><br><a target='_blank' href='http://files.ontariogovernment.ca/moe_mapping/mapping/PGMN/Precipitation/csv/{Site_ID}.csv'>Precipitation Data (CSV)</a>";
/*
globalConfig.searchControlHTML = '<table width="100%" cellpadding="5" cellspacing="0" border="0" style="margin-bottom:15px;" summary="Search interactive map form">\
			<caption style="text-align:left;">Search interactive map</caption>\
			<tr>\
				<th scope="col"></th>\
				<th scope="col"></th>\
			</tr>\
			<tr>\
				<td valign="top" width="415px">\
					<input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="Term"></input>&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search" title="Search"></input>								\
				</td>\
				<td valign="top">\
					<input id="currentMapExtent" type="checkbox" name="currentExtent" title="Current Map Display"><span title="Current Map Display: Limit your search to the area displayed" class="tooltip">Current Map Display</span>\
				</td>\
			</tr>\
			<tr>\
				<td colspan="2">\
					<div id="information" style="margin-top:10px;">\
						Search <strong>PGMN Well ID</strong>, <strong>Well Depth</strong>, <strong>Address</strong> or see help for more advanced options.\
					</div>\
				</td>\
			</tr>\
		</table>';
*/