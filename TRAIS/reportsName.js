globalConfig.chooseLang = function (en, fr) {return (globalConfig.language === "EN") ? en : fr;};

globalConfig.annualReportURL = globalConfig.chooseLang("TRAIS_Report.htm", "TRAIS_Report.htm");
//globalConfig.annualReportURL = globalConfig.chooseLang("annual-report", "rapport-annuel");
globalConfig.planSummaryURL = globalConfig.chooseLang("TRAIS_PlanSummaries_Report.htm", "TRAIS_PlanSummaries_Report.htm");
//globalConfig.planSummaryURL = globalConfig.chooseLang("plan-summary-report", "sommaires-de-plan");
globalConfig.recordsURL = globalConfig.chooseLang("TRAIS_Records_Report.htm", "TRAIS_Records_Report.htm");
//globalConfig.recordsURL = globalConfig.chooseLang("record-report", "rapport-record");

