globalConfig = {};
globalConfig.language = "FR";
globalConfig.searchHelpTxt = "Rechercher <strong>nom du lac</strong>, <strong>le num\u00e9ro de la station (STN)</strong>, <strong>l\u0027adresse</strong> ou cliquer sur aide pour faire une recherche avanc\u00e9e.";
globalConfig.tabsTemplateContent = "<strong><font color='#799441'>{globalConfig.wordCapitalize(LAKENAME)}, STN {STN}, N&deg; du lieu {SITEID}</font></strong><br>Canton: {globalConfig.wordCapitalize(TOWNSHIP)}<br>{SITEDESC}<br><br>Tableau et donn\u00e9es interactifs: <br>[{SE_COUNT}?  ?&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='{SE_URL_FR}'>Disque Secchi</a><br>][{PH_COUNT}?  ?&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='{TP_URL_FR}'>Concentration de phosphore total</a><br>]<br>Latitude <b>{globalConfig.deciToDegree(LATITUDE)}</b> Longitude <b>{globalConfig.deciToDegree(LONGITUDE)}</b><br><a href='mailto:lakepartner@ontario.ca?subject=Erreur de Portail ({globalConfig.wordCapitalize(LAKENAME)}, STN {STN}, N&deg; du lieu {SITEID})'>Signaler une erreur pour ce lieu</a>.<br>";
globalConfig.otherInfoHTML = "<h2>Une erreur sur la carte?</h2> \
      <p>Il est possible que des impr\u00e9cisions se soient gliss\u00e9es sur les emplacements.</p> \
      <p>Si vous trouvez une erreur d\u0027emplacement d\u0027un lac, veuillez nous en avertir. Vous pouvez utiliser le lien <a href='mailto:lakepartner@ontario.ca?subject=Erreur de Portail'>Signaler une erreur</a> du menu contextuel de la carte.</p> \
      <h2>Commentaires</h2> \
      <p>Veuillez formuler vos commentaires ou vos suggestions par courriel \u00e0 <a href=\"mailto:lakepartner@ontario.ca\">lakepartner@ontario.ca</a>.</p><p>Certaines donn&eacute;es scientifiques et de surveillance n&rsquo;existent qu&rsquo;en anglais.</p>"; 
