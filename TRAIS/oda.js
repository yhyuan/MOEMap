var url = 'http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Public/TRAIS/MapServer/';
var layer = new gmaps.ags.Layer(url + '0');
var facilityDict = [];		
var constructObject = function (feature) {
	var attr = feature.attributes;
	return {
		CompanyName: attr.OrganizationName,
		FacilityName: attr.FacilityName,
		ID: attr.ID,
		City: attr.Address.split("/")[1],
		Substances: attr.NUMsubst
	};		
};
layer.query({
	where: "ID < 498",
	outFields: ["ID", "OrganizationName", "FacilityName", "Address", "NUMsubst"]
}, function (rs) {
	var resultsArray1 = _.map(rs.features, constructObject);
	var layer2 = new gmaps.ags.Layer(url + '0');
	layer2.query({
		where: "ID >= 498",
		outFields: ["ID", "OrganizationName", "FacilityName", "NPRI_ID", "Address", "NUMsubst"]
	}, function (rs) {
		var resultsArray2 = _.map(rs.features, constructObject);
		resultsArray = resultsArray1.concat(resultsArray2);
		var resultDict = {};
		_.each(resultsArray, function (result) {
			var firstLetter = result.CompanyName[0];
			if (resultDict.hasOwnProperty(firstLetter)) {
				resultDict[firstLetter].push(result);
			} else {
				resultDict[firstLetter] = [result];
			}
		});
		for(var propt in resultDict){
			facilityDict.push({
				index: propt,
				facilityList: resultDict[propt]
			});
		}
		facilityDict.sort(function compare(a,b) {
			if (a.index < b.index)
				return -1;
			if (a.index > b.index)
				return 1;
			return 0;
		});
		document.getElementById("target").innerHTML = _.template(document.getElementById("TRAISTemplate").innerHTML, facilityDict);
	});			
});
