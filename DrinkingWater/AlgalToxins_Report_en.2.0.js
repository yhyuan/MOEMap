globalConfig.language = "EN";
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
globalConfig.bottomText = "Note: The laboratory’s minimum detection limit has been substituted to calculate the median value for results that are reported as below the detection limit.";

