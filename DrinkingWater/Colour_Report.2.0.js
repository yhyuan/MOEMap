globalConfig.parameters = {
	'COLOUR; TRUE': {
		name: 'Colour',
		detectionLimit: 0.2,
		OntarioStandard: '5 TCU',
		maximum: 200
	}
};
if(globalConfig.language === "EN") {
	globalConfig.parametersText = "Water is sometime a faint yellow/brown colour. The Colour of drinking water is monitored to assess the effectiveness of treatment and the potential formation of disinfection by-products when water is treated with chlorine. In Ontario, the aesthetic objective for Colour in drinking water of 5 TCU (True Colour Units). Refer to the <a target='_blank' href='https://www.ontario.ca/environment-and-energy/technical-support-document-ontario-drinking-water-standards-objectives-and'>Technical Support Document for Ontario Drinking Water Quality Standards, Objectives, and Guidelines</a> for more information.";
} else {
	globalConfig.parametersText = "Water is sometime a faint yellow/brown colour. The Colour of drinking water is monitored to assess the effectiveness of treatment and the potential formation of disinfection by-products when water is treated with chlorine. In Ontario, the aesthetic objective for Colour in drinking water of 5 TCU (True Colour Units). Refer to the <a target='_blank' href='https://www.ontario.ca/environment-and-energy/technical-support-document-ontario-drinking-water-standards-objectives-and'>Technical Support Document for Ontario Drinking Water Quality Standards, Objectives, and Guidelines</a> for more information.";
}
