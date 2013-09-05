
globalConfig.layers = [{
	url: globalConfig.url + "/0",
	renderTargetDiv: "target",
	event: "reportReady",
	where: "1=1",
	outFields: globalConfig.chooseLang(["WATERBODYC", "LOCNAME_EN", "GUIDELOC_EN"], ["WATERBODYC", "LOCNAME_FR", "GUIDELOC_FR"]),
	processResults: function (fs) {		
		var sites = fs.sort(function compare(a,b) {
			if (a.attributes.LOCNAME_EN < b.attributes.LOCNAME_EN)
				return -1;
			if (a.attributes.LOCNAME_EN > b.attributes.LOCNAME_EN)
				return 1;
			return 0;
		});
		PubSub.emit(globalConfig.layers[0].event + "Data", {sites: sites});
		//document.getElementById(globalConfig.layers[0].renderTargetDiv).innerHTML = _.template(globalConfig.layers[0].template, {sites: sites});			
	},
	template: '<H2><%= globalConfig.chooseLang("<H1>Guide to Eating Ontario Sport Fish (2013-2014)</H1><P>Consumption advisories for all locations listed below can be accessed by clicking on the waterbody name.</P><BR>", "<H1>Guide de consommation du poisson gibier de l\'Ontario (2013-2014)</H1><P>On obtient les mises en garde concernant les lieux ci-dessous en cliquant sur le plan d\'eau concern&#233;.</P><BR>") %></H2>\
		<%\
			_.each(sites,function(site,key,list){\
		%>\
			<A HREF="SportFish_Report.htm?id=<%= site.attributes.WATERBODYC %>"><%= globalConfig.chooseLang(site.attributes.LOCNAME_EN, site.attributes.LOCNAME_FR) %></A> - <%= globalConfig.chooseLang(site.attributes.GUIDELOC_EN, site.attributes.GUIDELOC_FR)  %>.<BR>\
		<%\
			});\
		%>'
}];
