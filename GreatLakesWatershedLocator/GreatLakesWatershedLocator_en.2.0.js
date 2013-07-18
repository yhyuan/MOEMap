globalConfig = {};
globalConfig.language = "EN";
//globalConfig.searchHelpTxt = "Search by <STRONG>Address</STRONG>, <STRONG>City Name</STRONG>, <STRONG>Coordinates</STRONG> or see help for more advanced options.";
/*globalConfig.searchHelpTxt = "Search by <STRONG>Address</STRONG>, <STRONG>City Name</STRONG>, <STRONG>Coordinates</STRONG>";
globalConfig.otherInfoHTML = "Data source: Land Information Ontario (LIO).";
globalConfig.searchControlHTML = '	<input id = "map_query" type="text" title="Term" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" 	autocomplete="off"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search" title="Search"></input> \
	<input type="submit" onclick="INITIALIZATION.init()" title="Clear" value="&nbsp;Clear&nbsp;"></input> 	\
	<br><br><div id="information" style="color:#000000">Search by <STRONG>Address</STRONG>, <STRONG>City Name</STRONG>, <STRONG>Coordinates</STRONG> or see help for more advanced options. </div>';
*/
globalConfig.searchControlHTML = '	<label class="element-invisible" for="map_query">Search the map</label> \
	<input id="map_query" type="text" autocomplete="off" maxlength="100" onkeypress="return globalConfig.entsub(event)" size="50" title="Term" /> \
	<label class="element-invisible" for="search_submit">Search</label> \
	<input type="submit" onclick="globalConfig.search()" id="search_submit" value="Search" title="Search" /> \
	<label class="element-invisible" for="search_clear">Clear</label> \
	<input type="submit" value=" Clear " id="search_clear" title="Clear" onclick="INITIALIZATION.init()" />';
var MOEMapLanguage = {
	InfoResultTitle : "Result located within",	
	LocatedWithinTxt : " located within ",
	UTMZone: "UTM Zone",
	Easting: "Easting", 	
	Northing: "Northing",	
	NoGLWatershedMsg : " No Great Lakes Watershed found"
	
	}

	
