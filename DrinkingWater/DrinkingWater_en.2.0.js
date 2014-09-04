globalConfig = {};
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
globalConfig.ComplianceMonitoringLang = "Compliance Monitoring";
globalConfig.tabsTemplateContentComplianceMonitoring = "<strong>Drinking Water Quality:</strong><br>\
The number represents a percentage of all the drinking water quality test results done during the time period indicated that met the Ontario Drinking Water Quality Standards. Includes test results of health-related standard parameters only; operational testing data (i.e., chlorine and turbidity) are not included in final water quality results.<br>\
Drinking Water Quality: <strong>{PERCENTAGE_COMPLIED}</strong><br>\
Reporting Period: <strong>{ENGLISH_TIME_PERIOD}</strong><br><br>\
<strong>Inspection Risk Rating:</strong><br>\
Every municipal residential drinking water system is inspected at least once a year, with one in three inspections unannounced.<br><br>\
The ministry's annual inspection ratings are designed to encourage drinking water systems to strive for continuous improvement and ultimately to meet the ministry's long-term goal of 100 per cent compliance by all systems.<br>\
Inspection Risk Rating: <strong>{SCORE}</strong><br>\
Reporting Period: <strong>{ENGLISH_DATE_RANGE}</strong><br>";
globalConfig.ScientificMonitoringLang = "Scientific Monitoring";
globalConfig.tabsTemplateContentScientificMonitoring = "The Drinking Water Surveillance Program (DWSP) is a voluntary program that focuses on chemicals that are not regulated in Ontario. DWSP complements the monitoring that municipalities are required to do as part of operating their drinking water systems.<br><br>\
To learn more about DWSP’s data on water quality at the {DWS_NAME} ({DWS_NUM}), click below:<br>\
[{TASTE_AND_ODOUR}? ?&nbsp&nbsp&nbsp&nbsp•&nbspObjectionable <a target='_blank' href='TasteOdour_Report.htm?id={DWS_NUM}'>Taste and Odour</a>]<br>\
[{CHLORIDE}? ?&nbsp&nbsp&nbsp&nbsp•&nbspSalty taste - <a target='_blank' href='Chloride_Report.htm?id={DWS_NUM}'>Chloride</a>]<br>\
[{COLOUR}? ?&nbsp&nbsp&nbsp&nbsp•&nbspYellow/brown <a target='_blank' href='Colour_Report.htm?id={DWS_NUM}'>Colour</a> water]<br>\
[{ALGAL_TOXINS}? ?&nbsp&nbsp&nbsp&nbsp•&nbsp<a target='_blank' href='AlgalToxins_Report.htm?id={DWS_NUM}'>Algal toxins (or cyanobacterial toxins)</a>]";
