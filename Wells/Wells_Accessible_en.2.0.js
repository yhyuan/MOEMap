globalConfig = {};
globalConfig.accessible = true;
globalConfig.language = "EN";
globalConfig.searchHelpTxt = "Search <strong>Well Tag #</strong>, <strong>Well ID</strong> or see help for advanced options.";
globalConfig.tableSimpleTemplateTitleLang = "";
globalConfig.otherInfoHTML = ""; 
globalConfig.searchControlHTML = '<center><input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="Term"></input>&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search" title="Search"></input><br><div id="information" style="margin-top:10px;">' + globalConfig.searchHelpTxt + '</div></center>';
globalConfig.postConditionsCallbackName = "AccessibleWells";
