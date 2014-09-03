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
globalConfig.tabsTemplateContentComplianceMonitoring = "Drinking Water Quality: <strong>{PERCENTAGE_COMPLIED}</strong><br>\
Reporting Period: <strong>{ENGLISH_TIME_PERIOD}</strong><br><br><br><br><br>\
Inspection Risk Rating: <strong>{SCORE}</strong><br>\
Reporting Period: <strong>{ENGLISH_DATE_RANGE}</strong><br>";
globalConfig.ScientificMonitoringLang = "Scientific Monitoring";
globalConfig.tabsTemplateContentScientificMonitoring = "The Drinking Water Surveillance Program (DWSP) is a voluntary water monitoring program that focuses on chemicals that are not regulated in Ontario. DWSP complements the drinking water quality monitoring that municipalities are required to do as part of operating their drinking water systems. DWSP and its partner municipalities make a valuable contribution to Ontario’s source-to-tap drinking water safety net by providing reliable test results for use in a variety of scientific and research activities.<br><br>\
To learn more about DWSP’s data on water quality in untreated (raw) source water, treated drinking water, and water  distributed to consumers (i.e. distribution system) at the {DWS_NAME} ({DWS_NUM}), please click on one of the options below:<br>\
[{TASTE_AND_ODOUR}? ?&nbsp&nbsp&nbsp&nbsp•Substances that may cause an objectionable <a target='_blank' href='TasteOdour_Report.htm?id={DWS_NUM}'>Taste and Odour</a> in water]<br>\
[{CHLORIDE}? ?&nbsp&nbsp&nbsp&nbsp•<a target='_blank' href='Chloride_Report.htm?id={DWS_NUM}'>Chloride</a>, a common  material present in small amounts in drinking water that produces a detectable salty taste at certain levels]<br>\
[{COLOUR}? ?&nbsp&nbsp&nbsp&nbsp•Water is sometimes a faint yellow/brown <a target='_blank' href='Colour_Report.htm?id={DWS_NUM}'>colour</a>. This may be caused by the decay of vegetation in lakes and rivers or by minerals, such as iron and manganese, present in underground aquifiers. Colour is monitored to assess the effectiveness of treatment and the potential formation of  disinfection by-products when water is treated with chlorine.]<br>\
[{ALGAL_TOXINS}? ?&nbsp&nbsp&nbsp&nbsp•<a target='_blank' href='AlgalToxins_Report.htm?id={DWS_NUM}'>Algal toxins (or cyanobacterial toxins)</a>, which are produced by cyanobacteria or blue-green algae. Although many varieties of blue-green algae are harmless, some can produce toxins that are harmful to the health of both humans and animals.]";
