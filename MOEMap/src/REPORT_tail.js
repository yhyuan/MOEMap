_.each(globalConfig.layers, function(layer) {
	PubSub.on(layer.event, layer.processResults);
});
