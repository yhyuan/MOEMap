globalConfig = {};
globalConfig.language = "EN";
//globalConfig.searchHelpTxt = "Search <strong>waterbody name</strong>, <strong>location</strong>, <strong>species name</strong> or see help for more advanced options.";
//globalConfig.searchHelpTxt = "Search <strong>waterbody name</strong>, <strong>location</strong>, <strong>species name</strong>";
//globalConfig.tabsTemplateContent = "<b><font color='#799441'>{LOCNAME_" + globalConfig.language + "}</font></b><br>{globalConfig.addBRtoLongText(GUIDELOC_" + globalConfig.language + ")}<br><br><a target='_blank' href='{URL_" + globalConfig.language + "}'>Consumption Advisory Table</a><br><br>Latitude <b>{globalConfig.deciToDegree(LATITUDE)}</b> Longitude <b>{globalConfig.deciToDegree(LONGITUDE)}</b><br><a href='mailto:sportfish.moe@ontario.ca?subject=Portal Error (Submission {LOCNAME_" + globalConfig.language + "})'>Report an error for this location</a>.<br><br>";
//globalConfig.tabsTemplateContent = "<b><font color='#799441'>{LOCNAME_" + globalConfig.language + "}</font></b><br>{globalConfig.addBRtoLongText(GUIDELOC_" + globalConfig.language + ")}<br><br><a target='_blank' href='SportFish_Report.htm?id={WATERBODYC}'>Consumption Advisory Table</a><br><br>Latitude <b>{globalConfig.deciToDegree(LATITUDE)}</b> Longitude <b>{globalConfig.deciToDegree(LONGITUDE)}</b><br><a href='mailto:sportfish.moe@ontario.ca?subject=Portal Error (Submission {LOCNAME_" + globalConfig.language + "})'>Report an error for this location</a>.<br><br>";
//globalConfig.tabsTemplateContent = "<b><font color='#799441'>{LOCNAME_" + globalConfig.language + "}</font></b><br>{globalConfig.addBRtoLongText(GUIDELOC_" + globalConfig.language + ")}<br><br><a target='_blank' href='http://files.ontariogovernment.ca/moe_mapping/mapping/SportFish/EN/LAKE{WATERBODYC}.html'>Consumption Advisory Table</a><br><br>Latitude <b>{globalConfig.deciToDegree(LATITUDE)}</b> Longitude <b>{globalConfig.deciToDegree(LONGITUDE)}</b><br><a href='mailto:sportfish.moe@ontario.ca?subject=Portal Error (Submission {LOCNAME_" + globalConfig.language + "})'>Report an error for this location</a>.<br><br>";
/*globalConfig.searchControlHTML = '<label class="element-invisible" for="map_query">Search the map</label> \
	<input id="map_query" type="text" title="Term" maxlength="100" onkeypress="return globalConfig.entsub(event)" size="50" /> &nbsp; \
	<label class="element-invisible" for="search_submit">Search</label> \
	<input type="submit" title="Search" id="search_submit" value="Search" onclick="globalConfig.search()" /> \
	<br/> \
	<fieldset> \
		<input id="searchMapLocation" type="radio" title="Search Map Location" onclick="globalConfig.searchChange(this)" checked="checked" value="location" name="searchGroup" /> \
		<span class="tooltip" title="Search Map Location: Enter the name of an Ontario lake/river, city/town/township or street address to find fish consumption advice"> \
		<label for="searchMapLocation" class=\'option\'>Search by location (lake, river, city, town, township or address)</label> \
		</span> \
		<br/> \
		<input id="searchFishSpecies" type="radio" title="Search Fish Species" onclick="globalConfig.searchChange(this)" value="species" name="searchGroup" /> \
		<span class="tooltip" title="Search Fish Species: Enter the name of a fish species to find lakes with fish consumption advice for the species"> \
		<label for="searchFishSpecies" class=\'option\'> Search by fish species</label> \
		</span> \
		<br/> \
		<input id="currentMapExtent" type="checkbox" name="currentExtent" title="Current Map Display" /> <label for="currentExtent" class=\'option\'>Search current map display only</label> \
	</fieldset>';
*/
/*
globalConfig.otherInfoHTML = "<h2>Find a map error?</h2> \
	<p>It is possible you may encounter inaccuracies with map locations.</p> \
	<p>If you find an error in the location of a lake, river or stream, please contact us.  Use the <a href='mailto:sportfish.moe@ontario.ca?subject=Sport Fish Map Error'>Report an error</a> link within the map pop-up.</p> \
	<h2>Comments</h2> \
	<p>For comments and suggestions, email us at <a href='mailto:sportfish.moe@ontario.ca?subject=Sport Fish Map Feedback'>sportfish.moe@ontario.ca</a>.</p>"; 
*/
/*
globalConfig.searchControlHTML = '<table width="100%" cellpadding="5" cellspacing="0" border="0" style="margin-bottom:15px;" summary="Search interactive map form"> \
			<caption style="text-align:left;">Search interactive map</caption> \
			<tr> \
				<th scope="col"></th> \
				<th scope="col"></th> \
			</tr> \
			<tr> \
				<td valign="top" width="450px"> \
					<input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="Term"></input>&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search" title="Search"></input> \
					<div id="information" style="margin-top:10px;">Search <strong>waterbody name</strong>, <strong>location</strong>, <strong>species name</strong> or see help for more advanced options.</</div> \
				</td> \
				<td valign="top"> \
					<input id="searchMapLocation" type="radio" name="searchGroup" value="location" checked="checked" onclick="globalConfig.searchChange(this)" title="Search Map Location"><span title="Search Map Location: Enter the name of an Ontario lake/river, city/town/township or street address to find fish consumption advice" class="tooltip">Search Map Location</span><br /> \
					<input id="searchFishSpecies" type="radio" name="searchGroup" value="species" onclick="globalConfig.searchChange(this)" title="Search Fish Species"><span title="Search Fish Species: Enter the name of a fish species to find lakes with fish consumption advice for the species" class="tooltip">Search Fish Species</span><br /> \
					<input id="currentMapExtent" type="checkbox" name="currentExtent" title="Current Map Display"><span title="Current Map Display: Limit your search to the area displayed" class="tooltip">Current Map Display</span> \
				</td> \
			</tr> \
		</table>';	*/