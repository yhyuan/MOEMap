globalConfig = {};
globalConfig.language = "FR";
globalConfig.searchHelpTxt = "Rechercher <strong>nom du lac</strong>, <strong>le num\u00e9ro de la station (STN)</strong>, <strong>l\u0027adresse</strong> ou cliquer sur aide pour faire une recherche avanc\u00e9e.";
globalConfig.tabsTemplateContent = "<strong><font color='#799441'>{globalConfig.wordCapitalize(LAKENAME)}, STN {STN}, N&deg; du lieu {SITEID}</font></strong><br>Canton: {globalConfig.wordCapitalize(TOWNSHIP)}<br>{SITEDESC}<br><br>Tableau et donn\u00e9es interactifs: <br>[{SE_COUNT}?  ?&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='{SE_URL_FR}'>Disque Secchi</a><br>][{PH_COUNT}?  ?&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='{TP_URL_FR}'>Concentration de phosphore total</a><br>]<br>Latitude <b>{globalConfig.deciToDegree(LATITUDE)}</b> Longitude <b>{globalConfig.deciToDegree(LONGITUDE)}</b><br><a href='mailto:lakepartner@ontario.ca?subject=Erreur de Portail ({globalConfig.wordCapitalize(LAKENAME)}, STN {STN}, N&deg; du lieu {SITEID})'>Signaler une erreur pour ce lieu</a>.<br>";
globalConfig.otherInfoHTML = "<h2>Une erreur sur la carte?</h2> \
      <p>Il est possible que des impr\u00e9cisions se soient gliss\u00e9es sur les emplacements.</p> \
      <p>Si vous trouvez une erreur d\u0027emplacement d\u0027un lac, veuillez nous en avertir. Vous pouvez utiliser le lien <a href='mailto:lakepartner@ontario.ca?subject=Erreur de Portail'>Signaler une erreur</a> du menu contextuel de la carte.</p> \
      <h2>Commentaires</h2> \
      <p>Veuillez formuler vos commentaires ou vos suggestions par courriel \u00e0 <a href=\"mailto:lakepartner@ontario.ca\">lakepartner@ontario.ca</a>.</p><p>Certaines donn&eacute;es scientifiques et de surveillance n&rsquo;existent qu&rsquo;en anglais.</p>"; 
globalConfig.searchControlHTML = '<table width="100%" cellpadding="5" cellspacing="0" border="0" style="margin-bottom:15px;" summary="Recherche carte interactive forme">\
			<caption style="text-align:left;">Recherche carte interactive</caption>\
			<tr>\
				<th scope="col"></th>\
				<th scope="col"></th>\
			</tr>\
			<tr>\
				<td valign="top" width="450px">\
					<input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="Terme"></input>&nbsp;<input type="submit" onclick="globalConfig.search()" value="Recherche" title="Recherche"></input>								\
				</td>\
				<td valign="top">\
					<input id="currentMapExtent" type="checkbox" name="currentExtent" title="&Eacute;tendue de la carte courante"><span title="Afficher la carte : Limiter la recherche &agrave; la carte donn&eacute;e." class="tooltip">&Eacute;tendue de la carte courante</span>\
				</td>\
			</tr>\
			<tr>\
				<td colspan="2">\
					<div id="information" style="margin-top:10px;">\
						Rechercher <strong>nom du lac</strong>, <strong>le numéro de la station (STN)</strong>, <strong>l’adresse</strong> ou cliquer sur aide pour faire une recherche avancée.\
										</div>\
				</td>\
			</tr>\
		</table>';