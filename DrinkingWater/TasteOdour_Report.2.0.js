globalConfig.parameters = {
	'2-METHYLISOBORNEOL': {
		name: '2-Methylisoborneol',
		detectionLimit: 1,
		OntarioStandard: 'Taste and Odour Inoffensive',
		maximum: 200
	},
	'GEOSMIN': {
		name: 'Geosmin',
		detectionLimit: 1,
		OntarioStandard: 'Taste and Odour Inoffensive',
		maximum: 150
	}
};
if(globalConfig.language === "EN") {
	globalConfig.parametersText = "DWSP monitors for taste and odour by testing for 2-Methylisoborneol and Geosmin, which cause earthy and musty flavours in water. \
	Water provided for public consumption should have an inoffensive taste and odour. Refer to the \
	<a target='_blank' href='https://www.ontario.ca/environment-and-energy/technical-support-document-ontario-drinking-water-standards-objectives-and'>Technical Support \
	Document for Ontario Drinking Water Quality Standards, Objectives, and Guidelines</a> for more information.";
} else {
	globalConfig.parametersText = "DWSP monitors for taste and odour by testing for 2-Methylisoborneol and Geosmin, which cause earthy and musty flavours in water. \
	Water provided for public consumption should have an inoffensive taste and odour. Refer to the \
	<a target='_blank' href='https://www.ontario.ca/environment-and-energy/technical-support-document-ontario-drinking-water-standards-objectives-and'>Technical Support \
	Document for Ontario Drinking Water Quality Standards, Objectives, and Guidelines</a> for more information.";
}