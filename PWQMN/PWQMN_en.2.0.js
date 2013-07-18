globalConfig = {};
globalConfig.language = "EN";
//globalConfig.searchHelpTxt = "Search <strong>Stream</strong>, <strong>Station ID</strong>, <strong>Address</strong> or see help for more advanced options.";
//globalConfig.searchHelpTxt = "Search <strong>Stream</strong>, <strong>Station ID</strong>, <strong>Address</strong>";
//globalConfig.otherInfoHTML = 'Some scientific/monitoring data are only provided in English.';

globalConfig.InformationLang = "Information";
globalConfig.tabsTemplateContentInformation = "ID: <b>{STATION}</b><br>Stream: <b>{NAME}</b><br>Location: {LOCATION}<br><br><br><br>Status: <b>{mapConfig.getStatus(STATUS)}</b><br>First Year Sampled: <b>{FIRST_YR}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Last Year Sampled: <b>{LAST_YR}</b><br>Latitude <b>{globalConfig.deciToDegree(LATITUDE)}</b>&nbsp;&nbsp;&nbsp;Longitude <b>{globalConfig.deciToDegree(LONGITUDE)}</b><br>";
globalConfig.PhosphorusLang = "Phosphorus";
globalConfig.tabsTemplateContentPhosphorus = "<center>{mapConfig.getChart1(PHOSPHORUS_CONT)}</center><br><center>Total Phosphorus Concentrations (mg/L) for <b>{NAME}</b></center>";
globalConfig.NitratesLang = "Nitrates";
globalConfig.tabsTemplateContentNitrates = "<center>{mapConfig.getChart2(NITRATES_CONT)}</center><br><center>Total Nitrates Concentrations (mg/L-N) for <b>{NAME}</b></center>";
globalConfig.SuspSolidsLang = "Susp. Solids";
globalConfig.tabsTemplateContentSuspSolids = "<center>{mapConfig.getChart1(SUSPENDED_SOLIDS_CONT)}</center><br><center>Suspended Solids Concentrations (mg/L) for <b>{NAME}</b></center><br>";
globalConfig.ChlorideLang = "Chloride";
globalConfig.tabsTemplateContentChloride = "<center>{mapConfig.getChart1(CHLORIDE_CONT)}</center><br><center>Chloride Concentrations (mg/L) for <b>{NAME}</b></center><br>";