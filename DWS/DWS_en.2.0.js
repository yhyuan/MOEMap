globalConfig = {};
globalConfig.language = "EN";
globalConfig.accessible = false;
globalConfig.InformationLang = "Information";
globalConfig.tabsTemplateContent = "DWS Name: <b>{DWSName}</b><br>Most current Drinking Water Quality result: <br><a target='_parent' href='{LastARURL}'>{LastARYear}</a> <br>The number shown represents the percentage of drinking water quality tests done for this system in the time period indicated that met Ontario's rigourous drinking water quality standards.<br><br><a target='_parent' href='http://www.ene.gov.on.ca/environment/dwo/en/mapping/report/system?dws={DWSNum}'>Tell me more about this drinking water system.</a>";
globalConfig.searchHelpTxt = "Search <strong>Address</strong>, or <strong>DWS #</strong>or see help for more advanced options.";
globalConfig.searchControlHTML = '<table width="100%" cellpadding="5" cellspacing="0" border="0" style="margin-bottom:15px;" summary="Search interactive map form">\
			<caption style="text-align:left;">Search interactive map</caption>\
			<tr>\
				<th scope="col"></th>\
				<th scope="col"></th>\
			</tr>\
			<tr>\
				<td valign="top" width="450px">\
					<input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="Term"></input>&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search" title="Search"></input>\
					<div id="information" style="margin-top:10px;">Search <strong>water source</strong>, <strong>drinking water system name</strong>, <strong>address</strong> or see help for more advanced options.</</div>\
				</td>\
				<td valign="top">\
					<input id="currentMapExtent" type="checkbox" name="currentExtent" title="Current Map Display"><span title="Current Map Display: Limit your search to the area displayed" class="tooltip">Current Map Display</span>\
				</td>\
			</tr>\
		</table>';
globalConfig.NotWithinMunicipality = "The location you searched is not within a municipality";

/*
mapConfig.language = "EN";
mapConfig.accessible = false;
mapConfig.tabs = [{
			label:"Information", content:"DWS Name: <b>{DWSName}</b><br>Most current Drinking Water Quality result: <br><a target='_parent' href='{LastARURL}'>{LastARYear}</a> <br>The number shown represents the percentage of drinking water quality tests done for this system in the time period indicated that met Ontario's rigourous drinking water quality standards.<br><br><a target='_parent' href='/environment/dwo/en/mapping/report/system?dws={DWSNum}'>Tell me more about this drinking water system.</a> <br><img height='1' width='470' src='http://www.downloads.ene.gov.on.ca/files/mapping/images/MOE_Mapping_Library_White.jpg' /><br><br><br><br><br>"
 		}];
*/