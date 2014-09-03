globalConfig.parameters = {
	'CHLORIDE': {
		name: 'Chloride',
		detectionLimit: 0.2,
		OntarioStandard: '250 mg/L',
		maximum: 600
	}
};
if(globalConfig.language === "EN") {
	globalConfig.parametersText = "In Ontario, the aesthetic objective for Chloride in drinking water is 250 mg/L. For more information, please refer to the  <a target='_blank' href='https://www.ontario.ca/environment-and-energy/technical-support-document-ontario-drinking-water-standards-objectives-and'>Technical Support Document for Ontario Drinking Water Quality Standards, Objectives, and Guidelines</a> for more information.";
} else {
	globalConfig.parametersText = "In Ontario, the aesthetic objective for Chloride in drinking water is 250 mg/L. For more information, please refer to the  <a target='_blank' href='https://www.ontario.ca/environment-and-energy/technical-support-document-ontario-drinking-water-standards-objectives-and'>Technical Support Document for Ontario Drinking Water Quality Standards, Objectives, and Guidelines</a> for more information.";
}
