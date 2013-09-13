globalConfig = {};
globalConfig.language = "FR";
globalConfig.searchHelpTxt = "Rechercher un plan d'eau, un lieu, une esp\u00e8ce ou cliquer sur aide pour faire une recherche avanc\u00e9e.";
//globalConfig.tabsTemplateContent = "<b><font color='#799441'>{LOCNAME_" + globalConfig.language + "}</font></b><br>{globalConfig.addBRtoLongText(GUIDELOC_" + globalConfig.language + ")}<br><br><a target='_blank' href='{URL_" + globalConfig.language + "}'>Tableau des mises en garde en mati\u00e8re de<br> consommation</a><br><br>Latitude <b>{globalConfig.deciToDegree(LATITUDE)}</b> Longitude <b>{globalConfig.deciToDegree(LONGITUDE)}</b><br><a href='mailto:sportfish.moe@ontario.ca?subject=Erreur de portail (Submission {LOCNAME_" + globalConfig.language + "})'>Signalez un probl\u00e8me pour ce lieu</a>.<br><br>";
globalConfig.tabsTemplateContent = "<b><font color='#799441'>{LOCNAME_" + globalConfig.language + "}</font></b><br>{globalConfig.addBRtoLongText(GUIDELOC_" + globalConfig.language + ")}<br><br><a target='_blank' href='SportFish_Report.htm?id={WATERBODYC}'>Tableau des mises en garde en mati\u00e8re de<br> consommation</a><br><br>Latitude <b>{globalConfig.deciToDegree(LATITUDE)}</b> Longitude <b>{globalConfig.deciToDegree(LONGITUDE)}</b><br><a href='mailto:sportfish.moe@ontario.ca?subject=Erreur de portail (Submission {LOCNAME_" + globalConfig.language + "})'>Signalez un probl\u00e8me pour ce lieu</a>.<br><br>";
globalConfig.otherInfoHTML = '<h2>Une erreur sur la carte?</h2> \
<p>Il est possible que des impr&eacute;cisions se soient gliss&eacute;es sur les emplacements.</p> \
<p>Si vous trouvez une erreur d&rsquo;emplacement d&rsquo;un lac, d&rsquo;une rivi&egrave;re ou d&rsquo;un cours d&rsquo;eau, veuillez nous en avertir. Vous pouvez utiliser le lien &laquo; <a href="mailto:sportfish.moe@ontario.ca?subject=Sport%20Fish%20Map%20Error">Signaler une erreur</a> &raquo; du menu contextuel de la carte.</p> \
<h2>Commentaires</h2> \
<p>Veuillez formuler vos commentaires ou vos suggestions par courriel &agrave; <a href="mailto:sportfish.moe@ontario.ca">sportfish.moe@ontario.ca</a>.</p>'; 
	
globalConfig.searchControlHTML = '<table width="100%" cellpadding="5" cellspacing="0" border="0" style="margin-bottom:15px;" summary="Recherche carte interactive forme"> \
			<caption style="text-align:left;">Recherche carte interactive</caption> \
			<tr> \
				<th scope="col"></th> \
				<th scope="col"></th> \
			</tr> \
			<tr> \
				<td valign="top" width="450px"> \
					<input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="Terme"></input>&nbsp;<input type="submit" onclick="globalConfig.search()" value="Recherche" title="Recherche"></input> \
					<div id="information" style="margin-top:10px;">Rechercher <strong>un plan d\'eau</strong>, <strong>un lieu</strong>, <strong>une esp\u00e8ce</strong> ou cliquer sur aide pour faire une recherche avancée.</div> \
				</td> \
				<td valign="top"> \
					<input id="searchMapLocation" type="radio" name="searchGroup" value="location" checked="checked" onclick="globalConfig.searchChange(this)" title="Recherche d\'emplacements"><span title="Recherche d\'emplacements : Indiquer le lieu en Ontario (lac/rivi\u00e8re, ville/canton, adresse) pour avoir des conseils sur la consommation des poissons du lieu." class="tooltip">Recherche d\'emplacements</span><br /> 						<input id="searchFishSpecies" type="radio" name="searchGroup" value="species" onclick="globalConfig.searchChange(this)" title="Recherche d\'esp\u00e8ces"><span title="Recherche d\'esp\u00e8ces : Indiquer une esp\u00e8ce de poisson pour trouver des lacs sur lesquels existent des conseils sur la consommation de l\'esp\u00e8ce. " class="tooltip">Recherche d\'esp\u00e8ces</span><br /> \
					<input id="currentMapExtent" type="checkbox" name="currentExtent" title="Étendue de la carte courante"><span title="Afficher la carte : Limiter la recherche &agrave; la carte donn&eacute;e." class="tooltip">\u00c9tendue de la carte courante</span> \
				</td> \
			</tr> \
		</table>';