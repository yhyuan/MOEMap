_.each(globalConfig.layers, function(layer) {
	PubSub.on(layer.event, layer.processResults);
});
_.each(globalConfig.layers, function(layer) {
	globalConfig.queryLayer(layer, -1, []);
});
_.each(globalConfig.layers, function(layer) {
	globalConfig.on ([layer.event + "Data", "DocumentReady"], function () {
		if((typeof (globalConfig.eventsData[layer.event + "Data"]) !== 'undefined') && (globalConfig.eventsStatus["DocumentReady"])) {
			document.getElementById(layer.renderTargetDiv).innerHTML = _.template(layer.template, globalConfig.eventsData[layer.event + "Data"]);			
		}
	});
});