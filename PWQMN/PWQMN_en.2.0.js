globalConfig = {};
globalConfig.language = "EN";
//globalConfig.searchHelpTxt = "Search <strong>Stream</strong>, <strong>Station ID</strong>, <strong>Address</strong> or see help for more advanced options.";
//globalConfig.searchHelpTxt = "Search <strong>Stream</strong>, <strong>Station ID</strong>, <strong>Address</strong>";
//globalConfig.otherInfoHTML = 'Some scientific/monitoring data are only provided in English.';

globalConfig.InformationLang = "Information";
globalConfig.tabsTemplateContentInformation = "ID: <b>{STATION}</b><br>Stream: <b>{NAME}</b><br>Location: {LOCATION}<br><br><br><br>Status: <b>{mapConfig.getStatus(STATUS)}</b><br>First Year Sampled: <b>{FIRST_YR}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last Year Sampled: <b>{LAST_YR}</b><br>Latitude <b>{globalConfig.deciToDegree(LATITUDE)}</b>&nbsp;&nbsp;&nbsp;Longitude <b>{globalConfig.deciToDegree(LONGITUDE)}</b><br>";
globalConfig.PhosphorusLang = "Phosphorus";
globalConfig.tabsTemplateContentPhosphorus = "<center>{mapConfig.getChart1(PHOSPHORUS_CONT)}</center><br><center>Total Phosphorus Concentrations (mg/L) for <b>{NAME}</b></center>";
globalConfig.NitratesLang = "Nitrates";
globalConfig.tabsTemplateContentNitrates = "<center>{mapConfig.getChart2(NITRATES_CONT)}</center><br><center>Total Nitrates Concentrations (mg/L-N) for <b>{NAME}</b></center>";
globalConfig.SuspSolidsLang = "Susp. Solids";
globalConfig.tabsTemplateContentSuspSolids = "<center>{mapConfig.getChart1(SUSPENDED_SOLIDS_CONT)}</center><br><center>Suspended Solids Concentrations (mg/L) for <b>{NAME}</b></center><br>";
globalConfig.ChlorideLang = "Chloride";
globalConfig.tabsTemplateContentChloride = "<center>{mapConfig.getChart1(CHLORIDE_CONT)}</center><br><center>Chloride Concentrations (mg/L) for <b>{NAME}</b></center><br>";
/*globalConfig.searchControlHTML = '<table width="100%" cellpadding="5" cellspacing="0" border="0" style="margin-bottom:15px;" summary="Search interactive map form">\
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
		</table>';*/
