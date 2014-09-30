globalConfig = {};
globalConfig.development = true;
globalConfig.language = "EN";
globalConfig.otherInfoHTML = '';
globalConfig.GeneralInformationLang = "General Information";
globalConfig.tabsTemplateContentGeneralInformationLang = "DWS Name: <strong>{DWS_NAME}</strong><br>\
DWS ID: <strong>{DWS_NUM}</strong><br>\
Owner: <strong>{OWNER_LEGAL_NAME}</strong><br>\
Operating Authority: <strong>{OPERATING_AUTHORITY_LEGAL_NAME}</strong><br>\
Category: <strong>{DWS_CATEGORY}</strong><br>\
Population Served: <strong>{POPULATION_SERVED}</strong><br>\
Design Rated Capacity: <strong>{DESIGN_RATED_CAPACITY}</strong><br>\
Design Rated Capacity Unit of Measure: <strong>{CAPACITYUOM}</strong><br>\
Source of Water: <strong>{globalConfig.wordCapitalize(SOURCES)}</strong><br>\
DWS That Receive Water: <strong>{RECEIVING_DWS}</strong><br>\
Treatment Processes: <strong>{globalConfig.wordCapitalize(TREATMENT_PROCESSES)}</strong><br>\
Municipality: <strong>{MUNICIPALITY_NAME}</strong><br>\
Municipality Phone: <strong>{MUNICIPALITY_PHONE}</strong><br>\
Municipality Email: <strong><a href='mailto:{MUNICIPALITY_EMAIL}'>{MUNICIPALITY_EMAIL}</a></strong><br>\
<strong><a target='_blank' href='{MUNICIPALITY_HOME_URL}'>Municipality Website</a></strong><br>\
<strong><a target='_blank' href='{ARLIBRARYURL}'>Annual Report Directory</a></strong><br>";
globalConfig.ComplianceMonitoringLang = "Regulated Monitoring";

//<img src="tti.jpg" alt="Testing Treated Inspected" style="margin:5px;">
/*
globalConfig.tabsTemplateContentComplianceMonitoring = '<img src="http://files.ontariogovernment.ca/moe_mapping/mapping/js/OneSite/DrinkingWater/tti_en.jpg" alt="Testing Treated Inspected" style="width:190px;height:174px;float:right"><br>\
<strong>Drinking Water Quality:</strong><br>\
<div style="padding:10px;">\
<div style="float:left;margin-top:5px;margin-right:10px;margin-bottom:5px;background-color:#DEEFDC;border:1px solid #256D20;padding:10px;width:186px;height:62px;text-align:center;">\
		<br>\
		<span style="font-size:1.5em;font-weight:bold;">{PERCENTAGE_COMPLIED}</span>\
		<p>{ENGLISH_TIME_PERIOD}</p>\
</div>\
</div>\
The number represents a percentage of all health-related test results that met the Ontario Drinking Water Quality Standards for the time period indicated.<br>\
<strong>Inspection Rating:</strong>\
<div style="padding:10px;">\
<div style="float:left;margin-top:5px;margin-right:10px;margin-bottom:5px;background-color:#DEEFDC;border:1px solid #256D20;padding:10px;width:186px;height:62px;text-align:center;">\
		<br>\
		<span style="font-size:1.5em;font-weight:bold;">{SCORE}</span>\
		<p>{ENGLISH_DATE_RANGE}</p>\
</div>\
</div>\
Every municipal residential drinking water system is inspected at least once a year, with one in three inspections unannounced. Annual inspection ratings encourage owners/operators of drinking water systems to strive for continuous improvement and meet the ministry\'s long-term goal of 100 per cent compliance by all systems.<br>\
<a target="_blank" href="http://sb.ene.ontariogovernment.ca/environment-and-energy/how-use-ministry-environment-map#drinkingwaterQA">Learn more</a> (Questions and Answers)<br>';
*/
globalConfig.tabsTemplateContentComplianceMonitoring = '<h3>Drinking Water Quality:</h3>\
<div style="padding:10px;">\
<div style="float:left;margin-top:5px;margin-right:10px;margin-bottom:5px;background-color:#DEEFDC;border:1px solid #256D20;padding:10px;width:186px;height:62px;text-align:center;">\
		<span style="font-size:1.5em;font-weight:bold;">{PERCENTAGE_COMPLIED}</span>\
		<p>{ENGLISH_TIME_PERIOD}</p>\
</div>\
</div>\
<p>The number represents a percentage of all health-related test results that met the Ontario Drinking Water Quality Standards for the time period indicated.</p>\
<h3>Inspection Rating:</h3>\
<div style="padding:10px;">\
<div style="float:left;margin-top:5px;margin-right:10px;margin-bottom:5px;background-color:#DEEFDC;border:1px solid #256D20;padding:10px;width:186px;height:62px;text-align:center;">\
		<span style="font-size:1.5em;font-weight:bold;">{SCORE}</span>\
		<p>{ENGLISH_DATE_RANGE}</p>\
</div>\
</div>\
<p>Every municipal residential drinking water system is inspected at least once a year, with one in three inspections unannounced. Annual inspection ratings encourage owners/operators of drinking water systems to strive for continuous improvement and meet the ministry\'s long-term goal of 100 per cent compliance by all systems.</p>\
<p><a target="_blank" href="http://sb.ene.ontariogovernment.ca/environment-and-energy/how-use-ministry-environment-map#drinkingwaterQA">Learn more</a> (Questions and Answers)</p>';

globalConfig.ScientificMonitoringLang = "Scientific Monitoring";
if (globalConfig.development) {
	globalConfig.TasteOdourReportURL = 'TasteOdour_Report.htm';
	globalConfig.ChlorideReportURL = 'Chloride_Report.htm';
	globalConfig.ColourReportURL = 'Colour_Report.htm';
	globalConfig.AlgalToxinsReportURL = 'AlgalToxins_Report.htm';
} else {
	globalConfig.TasteOdourReportURL = '44050';
	globalConfig.ChlorideReportURL = '44048';
	globalConfig.ColourReportURL = '44049';
	globalConfig.AlgalToxinsReportURL = '44047';
}
globalConfig.TasteOdourLang = 'Taste and Odour';
globalConfig.ChlorideLang = 'Chloride';
globalConfig.ColourLang = 'Colour';
globalConfig.AlgalToxinsLang = 'Algal Toxins';

/*
globalConfig.tabsTemplateContentScientificMonitoring = "<img src='http://files.ontariogovernment.ca/moe_mapping/mapping/js/OneSite/DrinkingWater/CationsAtomicAdsorption.jpg' alt='Cations Atomic Adsorption' style='width:200px;height:133px;margin-left:5px;float:right'><br>\
The Drinking Water Surveillance Program (DWSP) monitors water quality at a selected number of drinking water systems in Ontario. The DWSP complements the monitoring that municipalities are required to do as part of operating their drinking water systems.<br><br>\
To learn more about DWSP’s data on water quality at the {DWS_NAME} click below:<br>\
[{TASTE_AND_ODOUR}? ?&nbsp&nbsp&nbsp&nbsp&nbsp<a target='_blank' href='" + globalConfig.TasteOdourReportURL +"?id={DWS_NUM}'>Taste and Odour</a><br>]\
[{CHLORIDE}? ?&nbsp&nbsp&nbsp&nbsp&nbsp<a target='_blank' href='" + globalConfig.ChlorideReportURL +"?id={DWS_NUM}'>Chloride</a><br>]\
[{COLOUR}? ?&nbsp&nbsp&nbsp&nbsp&nbsp<a target='_blank' href='" + globalConfig.ColourReportURL +"?id={DWS_NUM}'>Colour</a><br>]\
[{ALGAL_TOXINS}? ?&nbsp&nbsp&nbsp&nbsp&nbsp<a target='_blank' href='" + globalConfig.AlgalToxinsReportURL +"?id={DWS_NUM}'>Algal toxins</a>]";
*/
globalConfig.tabsTemplateContentScientificMonitoring = "The Drinking Water Surveillance Program (DWSP) monitors water quality at a selected number of drinking water systems in Ontario. The DWSP complements the monitoring that municipalities are required to do as part of operating their drinking water systems.<br><br>\
To learn more about DWSP’s data on water quality at the {DWS_NAME} click below:<br>\
[{TASTE_AND_ODOUR}? ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='" + globalConfig.TasteOdourReportURL +"?id={DWS_NUM}'>" + globalConfig.TasteOdourLang + "</a><br>]\
[{CHLORIDE}? ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='" + globalConfig.ChlorideReportURL +"?id={DWS_NUM}'>" + globalConfig.ChlorideLang + "</a><br>]\
[{COLOUR}? ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='" + globalConfig.ColourReportURL +"?id={DWS_NUM}'>" + globalConfig.ColourLang + "</a><br>]\
[{ALGAL_TOXINS}? ?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='" + globalConfig.AlgalToxinsReportURL +"?id={DWS_NUM}'>" + globalConfig.AlgalToxinsLang + "</a>]";