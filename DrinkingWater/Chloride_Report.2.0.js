globalConfig.parameters = {
	'CHLORIDE': {
		name: 'Chloride',
		detectionLimit: 0.2,
		OntarioStandard: '250 mg/L',
		maximum: 600
	}
};
if(globalConfig.language === "EN") {
	globalConfig.parametersText = "Chloride is a common material present in small amounts in drinking water. It can produce a salty taste at certain levels. In Ontario, the aesthetic objective for Chloride in drinking water is 250 mg/L. Refer to the <a target='_blank' href='https://www.ontario.ca/environment-and-energy/technical-support-document-ontario-drinking-water-standards-objectives-and'>Technical Support Document for Ontario Drinking Water Quality Standards, Objectives, and Guidelines</a> for more information.";
} else {
	globalConfig.parametersText = "Chloride is a common material present in small amounts in drinking water. It can produce a salty taste at certain levels. In Ontario, the aesthetic objective for Chloride in drinking water is 250 mg/L. Refer to the <a target='_blank' href='https://www.ontario.ca/environment-and-energy/technical-support-document-ontario-drinking-water-standards-objectives-and'>Technical Support Document for Ontario Drinking Water Quality Standards, Objectives, and Guidelines</a> for more information.";
}
