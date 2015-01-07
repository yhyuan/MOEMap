globalConfig = {};
globalConfig.development = false;
globalConfig.language = "FR";
globalConfig.otherInfoHTML = '';
globalConfig.GeneralInformationLang = "Renseignements généraux";
globalConfig.tabsTemplateContentGeneralInformationLang = "Nom du REP: <strong>{DWS_NAME}</strong><br>\
N&deg; du REP: <strong>{DWS_NUM}</strong><br>\
Propriétaire: <strong>{OWNER_LEGAL_NAME}</strong><br>\
Organisme d’exploitation: <strong>{OPERATING_AUTHORITY_LEGAL_NAME}</strong><br>\
Catégorie: <strong>{DWS_CATEGORY}</strong><br>\
Population desservie: <strong>{POPULATION_SERVED}</strong><br>\
Capacité nominale: <strong>{DESIGN_RATED_CAPACITY}&nbsp;{CAPACITYUOM}</strong><br>\
Source d’eau: <strong>{globalConfig.wordCapitalize(SOURCES)}</strong><br>\
REP qui reçoivent de l’eau: <strong>{RECEIVING_DWS}</strong><br>\
Procédés de traitement: <strong>{globalConfig.wordCapitalize(TREATMENT_PROCESSES)}</strong><br>\
Municipalité: <strong>{MUNICIPALITY_NAME}</strong><br>\
No de téléphone de la municipalité: <strong>{MUNICIPALITY_PHONE}</strong><br>\
Adresse électronique de la municipalité: <strong><a href='mailto:{MUNICIPALITY_EMAIL}'>{MUNICIPALITY_EMAIL}</a></strong><br>\
<strong><a target='_blank' href='{MUNICIPALITY_HOME_URL}'>Site Web de la municipalité</a></strong><br>\
<strong><a target='_blank' href='{ARLIBRARYURL}'>Répertoire des rapports annuels</a></strong><br>";
globalConfig.ComplianceMonitoringLang = "Surveillance réglementée";
//Unité de mesure de la capacité nominale: <strong>{CAPACITYUOM}</strong><br>
globalConfig.tabsTemplateContentComplianceMonitoring = '<h3>Qualité de l’eau potable:</h3>\
<div style="padding:10px;">\
<div style="float:left;margin-top:5px;margin-right:10px;margin-bottom:5px;background-color:#DEEFDC;border:1px solid #256D20;padding:10px;width:186px;height:62px;text-align:center;">\
		<span style="font-size:1.5em;font-weight:bold;">{PERCENTAGE_COMPLIED}</span>\
		<p>{FRENCH_TIME_PERIOD}</p>\
</div>\
</div>\
<p>Le chiffre représente le pourcentage de résultats de toutes les analyses liées à la santé effectuées au cours de la période indiquée qui ont répondu aux normes de qualité de l’eau potable de l’Ontario.</p>\
<h3>Note d’inspection:</h3>\
<div style="padding:10px;">\
<div style="float:left;margin-top:5px;margin-right:10px;margin-bottom:5px;background-color:#DEEFDC;border:1px solid #256D20;padding:10px;width:186px;height:62px;text-align:center;">\
		<span style="font-size:1.5em;font-weight:bold;">{SCORE}</span>\
		<p>{FRENCH_DATE_RANGE}</p>\
</div>\
</div>\
<p>Tous les réseaux résidentiels municipaux sont inspectés au moins une fois par année et une inspection sur trois est menée sans préavis. Les notes d’inspection annuelle encouragent les propriétaires et exploitants des réseaux d’eau potable à viser l’amélioration continue et à atteindre l’objectif à long terme du ministère, soit un taux de conformité de 100 % pour tous les réseaux.</p>\
<p><a target="_blank" href="savoir-utiliser-une-carte-du-ministere-de-lenvironnement#drinkingwaterQA">Pour en savoir plus</a> (Questions et réponses)</p>';

globalConfig.ScientificMonitoringLang = "Surveillance scientifique";
if (globalConfig.development) {
	globalConfig.TasteOdourReportURL = 'TasteOdour_Report.htm';
	globalConfig.ChlorideReportURL = 'Chloride_Report.htm';
	globalConfig.ColourReportURL = 'Colour_Report.htm';
	globalConfig.AlgalToxinsReportURL = 'AlgalToxins_Report.htm';
} else {
	globalConfig.TasteOdourReportURL = 'resultats-du-programme-de-surveillance-de-leau-potable-psep-gout-et-odeur';
	globalConfig.ChlorideReportURL = 'resultats-du-programme-de-surveillance-de-leau-potable-psep-chlorure';
	globalConfig.ColourReportURL = 'resultats-du-programme-de-surveillance-de-leau-potable-psep-couleur';
	globalConfig.AlgalToxinsReportURL = 'resultats-du-programme-de-surveillance-de-leau-potable-psep-toxines-algaires';
}
globalConfig.TasteOdourLang = 'Goût et odeur';
globalConfig.ChlorideLang = 'Chlorure';
globalConfig.ColourLang = 'Couleur';
globalConfig.AlgalToxinsLang = 'Toxines algaires';

globalConfig.tabsTemplateContentScientificMonitoring = "<p>Le Programme de surveillance de l’eau potable (PSEP) permet de surveiller la qualité de l’eau d’un certain nombre de réseaux d’eau potable en Ontario. Il se greffe aux activités de surveillance auxquelles les municipalités doivent se livrer dans le cadre de l’exploitation de leur réseau d’eau potable.</p>\
<p>Pour en savoir plus sur les données du PSEP au sujet de la qualité de l’eau du réseau d’eau potable \"{DWS_NAME}\" cliquez ci-dessous:</p>\
[{TASTE_AND_ODOUR}? ?<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='" + globalConfig.TasteOdourReportURL +"?id={DWS_NUM}'>" + globalConfig.TasteOdourLang + "</a></p>]\
[{CHLORIDE}? ?<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='" + globalConfig.ChlorideReportURL +"?id={DWS_NUM}'>" + globalConfig.ChlorideLang + "</a></p>]\
[{COLOUR}? ?<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='" + globalConfig.ColourReportURL +"?id={DWS_NUM}'>" + globalConfig.ColourLang + "</a></p>]\
[{ALGAL_TOXINS}? ?<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='" + globalConfig.AlgalToxinsReportURL +"?id={DWS_NUM}'>" + globalConfig.AlgalToxinsLang + "</a></p>]";