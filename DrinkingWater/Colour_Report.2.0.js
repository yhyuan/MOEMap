globalConfig.parameters = {
	'COLOUR; TRUE': {
		name: 'Colour',
		detectionLimit: 0.2,
		OntarioStandard: '5 TCU',
		maximum: 200
	}
};
if(globalConfig.language === "EN") {
	globalConfig.parametersText = "In Ontario, the aesthetic objective for Colour in drinking water of 5 TCU (True Colour Units). For more information, please refer to the  <a target='_blank' href='https://www.ontario.ca/environment-and-energy/technical-support-document-ontario-drinking-water-standards-objectives-and'>Technical Support Document for Ontario Drinking Water Quality Standards, Objectives, and Guidelines</a> for more information.";
} else {
	globalConfig.parametersText = "In Ontario, the aesthetic objective for Colour in drinking water of 5 TCU (True Colour Units). For more information, please refer to the  <a target='_blank' href='https://www.ontario.ca/environment-and-energy/technical-support-document-ontario-drinking-water-standards-objectives-and'>Technical Support Document for Ontario Drinking Water Quality Standards, Objectives, and Guidelines</a> for more information.";
}
