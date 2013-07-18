globalConfig = {};
globalConfig.language = "FR";

globalConfig.searchHelpTxt = "Recherche de <strong>Cours d\u0027eau</strong>, de <strong>Num\u00e9ro de station</strong>, <strong>d\u0027Adresse</strong> ou cliquer sur aide pour plus d\u0027information sur la une recherche avanc\u00e9e.";
globalConfig.InformationLang = "Information";
globalConfig.tabsTemplateContentInformation = "Num\u00e9ro: <b>{STATION}</b><br>Cours d'eau: <b>{NAME}</b><br>Lieu: {LOCATION}<br><br><br><br>\u00c9tat: <b>{mapConfig.getStatus(STATUS)}</b><br>Premi\u00e8re ann\u00e9e \u00e9chantillonn\u00e9e: <b>{FIRST_YR}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Derni\u00e8re ann\u00e9e \u00e9chantillonn\u00e9e: <b>{LAST_YR}</b><br>Latitude <b>{globalConfig.deciToDegree(LATITUDE)}</b>&nbsp;&nbsp;&nbsp;Longitude <b>{globalConfig.deciToDegree(LONGITUDE)}</b>";
globalConfig.PhosphorusLang = "Phosphore";
globalConfig.tabsTemplateContentPhosphorus = "<center>{mapConfig.getChart1(PHOSPHORUS_CONT)}</center><br><center>Concentrations de phosphore total (mg/L) dans: <b>{NAME}</b></center>";
globalConfig.NitratesLang = "Nitrates";
globalConfig.tabsTemplateContentNitrates = "<center>{mapConfig.getChart2(NITRATES_CONT)}</center><br><center>Concentrations de nitrates totaux (mg/L-N) dans: <b>{NAME}</b></center>";
globalConfig.SuspSolidsLang = "Mat. en susp.";
globalConfig.tabsTemplateContentSuspSolids = "<center>{mapConfig.getChart1(SUSPENDED_SOLIDS_CONT)}</center><br><center>Concentrations des mati\u00e8res en suspension (mg/L) dans: <b>{NAME}</b></center>";
globalConfig.ChlorideLang = "Chlorure";
globalConfig.tabsTemplateContentChloride = "<center>{mapConfig.getChart1(CHLORIDE_CONT)}</center><br><center>Concentrations de chlorure (mg/L) dans: <b>{NAME}</b></center>";
