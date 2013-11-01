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
globalConfig.loadingMessage = globalConfig.loadingMessage || globalConfig.chooseLang("Your report is being generated...", "Le rapport est produit...");
/*
$( document ).ready(function() {
	document.getElementById(globalConfig.layers[0].renderTargetDiv).innerHTML = globalConfig.loadingMessage; //globalConfig.chooseLang("Your report is being generated...", "Le rapport est produit...");
	PubSub.emit("DocumentReady");
});
*/
globalConfig.initialization = function() {
	document.getElementById(globalConfig.layers[0].renderTargetDiv).innerHTML = globalConfig.loadingMessage; //globalConfig.chooseLang("Your report is being generated...", "Le rapport est produit...");
	PubSub.emit("DocumentReady");
};
if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { //test for MSIE x.x;
	window.onload = globalConfig.initialization;	
} else {
	$(document).ready(globalConfig.initialization);
}
