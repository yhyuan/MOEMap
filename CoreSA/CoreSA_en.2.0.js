globalConfig = {};
globalConfig.language = "EN";
globalConfig.searchHelpTxt = "Search by <STRONG>Address</STRONG>, <STRONG>City Name</STRONG>, <STRONG>Postal Code</STRONG> or see help for more advanced options. ";
//globalConfig.searchHelpTxt = "Search by <STRONG>Address</STRONG>, <STRONG>City Name</STRONG>, <STRONG>Postal Code</STRONG>";
globalConfig.otherInfoHTML = "";
globalConfig.searchControlHTML = '	<input id = "map_query" class="ui-autocomplete-input" type="text" title="Term" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" 	autocomplete="off"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search" title="Search"></input> \
	<input type="submit" onclick="INITIALIZATION.init()" title="Clear" value="&nbsp;Clear&nbsp;"></input> 	\
	<br><br><div id="information" style="color:#000000">' + globalConfig.searchHelpTxt +  '</div>';
//globalConfig.layerTrasparencyHTML = '	<input id = "lyr_transp" type="text" title="Transparency Scale" size="2" maxlength="3" 	autocomplete="off"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.layerTransp()" value="LayerTransparency" title="Search"></input>';
globalConfig.layerTrasparencyHTML = '	<input id="lyrTransp0.6" type="radio" name="lyrTransp" value="0.6" checked="checked" title="Transparency 0.6"><span title="Transparency level is medium" class="tooltip">0.6</span><br /> \
<input id="lyrTransp1" type="radio" name="lyrTransp" value="1.0" title="Transparency 1.0"><span title="Display as solid color" class="tooltip">1.0</span>';
/*globalConfig.searchControlHTML = '	<label class="element-invisible" for="map_query">Search the map</label> \
	<input id="map_query" type="text" title="Term" maxlength="100" onkeypress="return globalConfig.entsub(event)" size="50" /> \
	<label class="element-invisible" for="search_submit">Search</label> \
	<input type="submit" onclick="globalConfig.search()" id="search_submit" value="Search" title="Search" /> \
	<label class="element-invisible" for="search_clear">Clear</label> \
	<input type="submit" value=" Clear " id="search_clear" title="Clear" onclick="INITIALIZATION.init()" />';
*/
var MOEMapLanguage = {
	InfoResultTitle : "Result located within",
	OfficeAddressLbl : "Office Address: ",
	TelLbl : "Tel: ",
	FaxLbl : " Fax: ",
	TollFreeLbl : "Toll Free: ",
	LocatedWithinTxt : " has a ",
	SearchHelpTxt : "Search by <STRONG>Address</STRONG>, <STRONG>City Name</STRONG>, <STRONG>Postal Code</STRONG> or see help for more advanced options.<br>",
	NoMOEDistrictMsg : " has no overlap receptor identified"
	
	};