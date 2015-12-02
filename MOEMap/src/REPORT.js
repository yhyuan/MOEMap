var QueryString = function () {  // This function is anonymous, is executed immediately and   // the return value is assigned to QueryString!  var query_string = {};  var query = window.location.search.substring(1);  var vars = query.split("&");  for (var i=0;i<vars.length;i++) {	var pair = vars[i].split("=");		// If first entry with this name	if (typeof query_string[pair[0]] === "undefined") {	  query_string[pair[0]] = pair[1];		// If second entry with this name	} else if (typeof query_string[pair[0]] === "string") {	  var arr = [ query_string[pair[0]], pair[1] ];	  query_string[pair[0]] = arr;		// If third or later entry with this name	} else {	  query_string[pair[0]].push(pair[1]);	}  } 	return query_string;} ();if(!Array.isArray) {  Array.isArray = function (vArg) {    return Object.prototype.toString.call(vArg) === "[object Array]";  };}if(!Array.prototype.fill) {	Array.prototype.fill = function(val){		for (var i = 0; i < this.length; i++){			this[i] = val;		}		return this;	};}PubSub = {handlers: {}};PubSub.on = function(eventType, handler) {	if (!(eventType in this.handlers)) {		this.handlers[eventType] = [];	}	this.handlers[eventType].push(handler);	return this;};PubSub.emit = function(eventType) {	var handlerArgs = Array.prototype.slice.call(arguments, 1);	for (var i = 0; i < this.handlers[eventType].length; i++) {		this.handlers[eventType][i].apply(this, handlerArgs);	}	return this;};globalConfig = {	chooseLang: function (en, fr) {return globalConfig.isEnglish() ? en : fr;},	isEnglish: function() {return (globalConfig.language === "EN")},	maxReturnedNumberofResults: 500,	queryLayer: function(layer, maxObjectID, currentFeaturesSet) {		var queryLayer2 = new gmaps.ags.Layer(layer.url);		if ((layer.outFields.length !== 1) || (layer.outFields[0] !== "*")) {			if (!("OBJECTID" in layer.outFields)) {				layer.outFields = layer.outFields.concat(["OBJECTID"]); 			}		}		queryLayer2.query({			returnGeometry: false,			where: "(" + layer.where + ") AND (OBJECTID > " + maxObjectID + ")",			outFields: layer.outFields		}, function (rs) {			var fs = rs.features;			var featuresSet = currentFeaturesSet.concat(fs);			if (fs.length === globalConfig.maxReturnedNumberofResults) {				globalConfig.queryLayer(layer, _.max(fs, function(feature) {return feature.attributes.OBJECTID;}).attributes.OBJECTID,  featuresSet);			} else {				PubSub.emit(layer.event, featuresSet);			}		});	},	eventsStatus: {},	eventsData: {}};globalConfig.on = function(events, commonHandler) {	var isAllEventsTrue = function(eventsStatus) {		for (eventStatus in eventsStatus) {			if(!eventStatus) {				return false;			}		}		return true;	};	_.each(events, function(event) {		PubSub.on(event, function(renderResult){			globalConfig.eventsStatus[event] = true;			globalConfig.eventsData[event] = renderResult;			var eventsStatus = _.map(events, function(event) {				if (globalConfig.eventsStatus.hasOwnProperty(event)) {					return globalConfig.eventsStatus[event];				} else {					return false;				}			});			if (isAllEventsTrue(eventsStatus)) {				commonHandler();			}		});	});};