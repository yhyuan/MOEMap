globalConfig = {};
globalConfig.language = "EN";
globalConfig.accessible = false;
globalConfig.InformationLang = "Information";
globalConfig.tabsTemplateContentInformation = "Name: <b>{mapConfig.wordCapitalize(DWSNAME)}</b><br>DWS #: <b>{DWSNo}</b><br>Water Source: <b>{mapConfig.wordCapitalize(SOURCE)}</b><br>Date Updated: <b>{mapConfig.dateFormat(DATE_UPDAT,'mm/dd/yyyy','yyyy mmm dd')}</b><br>Most Recent Sample: <b>{mapConfig.dateFormat(SMPL_LST,'mm/dd/yyyy','yyyy mmm dd')}</b><br>First Sample: <b>{mapConfig.dateFormat(SMPL_1ST,'mm/dd/yyyy','yyyy mmm dd')}</b><br>Total # Samples: <b>{NUM_SAM}</b><br>Total # Chemicals Sampled: <b>{NUM_CHEM}</b>";
globalConfig.ChemistryLang = "Chemistry";
globalConfig.tabsTemplateContentChemistry = "Please click on the name of the chemical or substance of interest: <br><ul>[{CHLORINE}? ?<li><a target='_blank' href='http://www.downloads.ene.gov.on.ca/files/mapping/DWSP/Chlorine_{DWSNo}_" + globalConfig.language +".htm'>Chlorine - Taste & Odour</a></li>][{EARTHY}? ?<li><a target='_blank' href='http://www.downloads.ene.gov.on.ca/files/mapping/DWSP/Earthy_{DWSNo}_" + globalConfig.language +".htm'>Geosmin & 2-MIB - Earthy Musty Taste & Odour</a></li>][{CHLORIDE}? ?<li><a target='_blank' href='http://www.downloads.ene.gov.on.ca/files/mapping/DWSP/Chloride_{DWSNo}_" + globalConfig.language +".htm'>Chloride - Salty Taste</a></li>][{SODIUM}? ?<li><a target='_blank' href='http://www.downloads.ene.gov.on.ca/files/mapping/DWSP/Sodium_{DWSNo}_" + globalConfig.language +".htm'>Sodium - Salty Taste & Sodium Restricted Diets</a></li>][{COLOUR}? ?<li><a target='_blank' href='http://www.downloads.ene.gov.on.ca/files/mapping/DWSP/Colour_{DWSNo}_" + globalConfig.language +".htm'>Colour - Appearance</a></li>][{TURBIDITY}? ?<li><a target='_blank' href='http://www.downloads.ene.gov.on.ca/files/mapping/DWSP/Turbidity_{DWSNo}_" + globalConfig.language +".htm'>Turbidity - Relative Clarity or Cloudiness</a></li>][{FLUORIDE}? ?<li><a target='_blank' href='http://www.downloads.ene.gov.on.ca/files/mapping/DWSP/Fluoride_{DWSNo}_" + globalConfig.language +".htm'>Fluoride - Dental Health</a></li>][{NITROGEN}? ?<li><a target='_blank' href='http://www.downloads.ene.gov.on.ca/files/mapping/DWSP/Nitrogen_{DWSNo}_" + globalConfig.language +".htm'>Nitrate & Nitrite - Potential Danger to Susceptible Infants</a></li>]</ul>For the descriptions of chemicals, please check the <a target='_blank' href='http://www.ene.gov.on.ca/stdprodconsume/groups/lr/@ene/@resources/documents/resource/std01_079707.pdf'>Technical Support Document for Ontario Drinking Water Standards, Objectives and Guidelines</a> and <a target='_blank' href='http://www.hc-sc.gc.ca/ewh-semt/pubs/water-eau/2012-sum_guide-res_recom/index-eng.php#t2'>Health Canada's Guidelines for Canadian Drinking Water Quality - Summary Table</a>.";
globalConfig.searchHelpTxt = "Search <strong>water source</strong>, <strong>drinking water system name</strong>, <strong>address</strong> or see help for more advanced options.";
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
					<input id="searchLocation" type="radio" name="searchGroup" value="Location" checked="checked" onclick="mapConfig.searchChange(\'Location\')" title="Search Map Location"><span title="Search Map Location: Enter city/town/township or street address to find fish consumption advice" class="tooltip">Search Map Location</span><br />\
					<input id="searchWaterSource" type="radio" name="searchGroup" value="WaterSource" onclick="mapConfig.searchChange(\'WaterSource\')" title="Search Water Source"><span title="Search Water Source: Enter the name of a water source to find drinking water systems" class="tooltip">Search Water Source</span><br />\
					<input id="searchDWSName" type="radio" name="searchGroup" value="DWSName" onclick="mapConfig.searchChange(\'DWSName\')" title="Search Drinking Water System"><span title="Search Drinking Water System: Enter the name of a drinking water system to find drinking water systems" class="tooltip">Search Drinking Water System</span><br />\
					<input id="currentMapExtent" type="checkbox" name="currentExtent" title="Current Map Display"><span title="Current Map Display: Limit your search to the area displayed" class="tooltip">Current Map Display</span>\
				</td>\
			</tr>\
		</table>';
