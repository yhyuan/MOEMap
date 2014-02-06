globalConfig = {};
globalConfig.language = "EN";
//globalConfig.SecchiDepth_ReportName = "SecchiDepth_Report.htm";
//globalConfig.TotalPhosphorus_ReportName = "TotalPhosphorus_Report.htm";
//globalConfig.SecchiDepth_ReportName = "secchidepth_report";
//globalConfig.TotalPhosphorus_ReportName = "totalphosphorus_report";
//globalConfig.searchHelpTxt = "Search <strong>lake name</strong>, <strong>location</strong>, <strong>Station Number (STN)</strong> or see help for more advanced options.";
//globalConfig.searchHelpTxt = "You may search for <strong>lake name</strong>, <strong>location</strong>, or <strong>Station Number (STN)</strong>";
//globalConfig.tabsTemplateContent = "<strong><font color='#799441'>{globalConfig.wordCapitalize(LAKENAME)}, STN {STN}, Site ID {SITEID}</font></strong><br>{globalConfig.wordCapitalize(TOWNSHIP)} Township      <br>{SITEDESC}<br><br>Interactive Chart and Data: <br>[{SE_COUNT}?  ?&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='" + globalConfig.SecchiDepth_ReportName + "?id={ID}'>Secchi Depth</a><br>][{PH_COUNT}?  ?&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='" + globalConfig.TotalPhosphorus_ReportName + "?id={ID}'>Total Phosphorus Concentration</a><br>]<br>Latitude <b>{globalConfig.deciToDegree(LATITUDE)}</b> Longitude <b>{globalConfig.deciToDegree(LONGITUDE)}</b><br><a href='mailto:lakepartner@ontario.ca?subject=Report Issue (Submission {globalConfig.wordCapitalize(LAKENAME)}, STN {STN}, Site ID {SITEID})'>Report an issue for this location</a>.<br>";
/*globalConfig.searchControlHTML = '<label class="element-invisible" for="map_query">Search the map</label>	\
	<input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="Search term" /> \
	<label class="element-invisible" for="search_submit">Search</label> \
	<input type="submit" onclick="globalConfig.search()" id="search_submit" value="Search" title="Search" /> \
	<br/> 	\
	<input id="currentMapExtent" type="checkbox" name="currentExtent" title="Current Map Display">  \
	<label for="currentExtent" class=\'option\'>Search current map display only</label>';
*/
/*
globalConfig.searchControlHTML = '<table width="100%" cellpadding="5" cellspacing="0" border="0" style="margin-bottom:15px;" summary="Search interactive map form">\
			<caption style="text-align:left;">Search interactive map</caption>\
			<tr>\
				<th scope="col"></th>\
				<th scope="col"></th>\
			</tr>\
			<tr>\
				<td valign="top" width="415px">\
					<input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="Term"></input>&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search" title="Search"></input>\
				</td>\
				<td valign="top">\
					<input id="currentMapExtent" type="checkbox" name="currentExtent" title="Current Map Display"><span title="Current Map Display: Limit your search to the area displayed" class="tooltip">Current Map Display</span>\
				</td>\
			</tr>\
			<tr>\
				<td colspan="2">\
					<div id="information" style="margin-top:10px;">\
						Search <strong>Lake Name</strong>, <strong>Location</strong>, <strong>Station Number (STN)</strong> or see help for more advanced options.\
										</div>\
				</td>\
			</tr>\
		</table>';
*/
globalConfig.otherInfoHTML = "<h2>Find a map error?</h2> \
      <p>It is possible you may encounter inaccuracies with map locations.</p> \
      <p>If you find an error in the location of a lake, please contact us. Use the \"<a href=\"mailto:mailto:lakepartner@ontario.ca?subject=Sport%20Map%20Error\">Report an error</a>\" link within the map pop-up.</p> \
      <h2>Comments</h2> \
      <p>For comments and suggestions, email us at <a href=\"mailto:lakepartner@ontario.ca\">lakepartner@ontario.ca</a>.</p><p>Some scientific/monitoring data is only provided in English.</p>"; 

