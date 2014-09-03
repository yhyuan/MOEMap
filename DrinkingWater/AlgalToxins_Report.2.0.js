globalConfig.parameters = {
	'ANATOXIN-A': {
		name: 'Anatoxin-A',
		detectionLimit: 0.02,
		maximum: 0.05
	},
	'MICROCYSTIN-LR': {
		name: 'Microcystin-LR',
		detectionLimit: 0.05,
		OntarioStandard: '1.5 \u03BCg/L',
		maximum: 3.5
	},
	'MICROCYSTIN-RR': {
		name: 'Microcystin-RR',
		detectionLimit: 0.05,
		maximum: 1.2
	},
	'MICROCYSTIN-LA': {
		name: 'Microcystin-LA',
		detectionLimit: 0.05,
		maximum: 0.5
	},
	'MICROCYSTIN-YR': {
		name: 'Microcystin-YR',
		detectionLimit: 0.05,
		maximum: 0.3
	}
};

if(globalConfig.language === "EN") {
	globalConfig.parametersText = "DWSP monitors for several algal toxins at selected municipal drinking water systems. Only one algal toxin, Microcystin-LR, has an Ontario Drinking Water Quality Standard (ODWQS). In Ontario, the maximum acceptable concentration for the algal toxin Microcystin-LR in drinking water is 1.5 ug/L. This guideline is believed to be protective of human health against exposure to other microcystins that may also be present. For more information, please refer to the  <a target='_blank' href='https://www.ontario.ca/environment-and-energy/technical-support-document-ontario-drinking-water-standards-objectives-and'>Technical Support Document for Ontario Drinking Water Quality Standards, Objectives, and Guidelines</a> for more information.";
} else {
	globalConfig.parametersText = "DWSP monitors for several algal toxins at selected municipal drinking water systems. Only one algal toxin, Microcystin-LR, has an Ontario Drinking Water Quality Standard (ODWQS). In Ontario, the maximum acceptable concentration for the algal toxin Microcystin-LR in drinking water is 1.5 ug/L. This guideline is believed to be protective of human health against exposure to other microcystins that may also be present. For more information, please refer to the  <a target='_blank' href='https://www.ontario.ca/environment-and-energy/technical-support-document-ontario-drinking-water-standards-objectives-and'>Technical Support Document for Ontario Drinking Water Quality Standards, Objectives, and Guidelines</a> for more information.";
}