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
Municipality Website: <strong><a target='_blank' href='{MUNICIPALITY_HOME_URL}'>Municipality Website</a></strong><br>\
Annual Report Directory: <strong><a target='_blank' href='{ARLIBRARYURL}'>Annual Report Directory</a></strong><br>";
globalConfig.ComplianceMonitoringLang = "Compliance Monitoring";
globalConfig.tabsTemplateContentComplianceMonitoring = "Drinking Water Quality: <strong>{PERCENTAGE_COMPLIED}</strong><br>\
Reporting Period: <strong>{ENGLISH_TIME_PERIOD}</strong><br><br><br><br><br>\
Inspection Risk Rating: <strong>{SCORE}</strong><br>\
Reporting Period: <strong>{ENGLISH_DATE_RANGE}</strong><br>";
globalConfig.ScientificMonitoringLang = "Scientific Monitoring";
globalConfig.tabsTemplateContentScientificMonitoring = "The Drinking Water Surveillance Program (DWSP) is a voluntary water monitoring\
 program that monitors for many chemicals and radionuclides that are not regulated in Ontario. To learn more about the water quality at \
 this drinking water system, please click on the chemical or substance of interest:<br>\
-[{TASTE_AND_ODOUR}?Taste and Odour?<a target='_blank' href='TasteOdour_Report.htm?id={DWS_NUM}'>Taste and Odour</a>]<br>\
-[{CHLORIDE}?Chloride?<a target='_blank' href='Chloride_Report.htm?id={DWS_NUM}'>Chloride</a>]<br>\
-[{COLOUR}?Colour?<a target='_blank' href='Colour_Report.htm?id={DWS_NUM}'>Colour</a>]<br>\
-[{ALGAL_TOXINS}?Algal Toxins?<a target='_blank' href='AlgalToxins_Report.htm?id={DWS_NUM}'>Algal Toxins</a>]";
