var url = 'http://lrcdrrvsdvap002/ArcGIS/rest/services/Interactive_Map_Public/TRAIS/MapServer/';
var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
	var pair = vars[i].split("=");
		// If first entry with this name
	if (typeof query_string[pair[0]] === "undefined") {
	  query_string[pair[0]] = pair[1];
		// If second entry with this name
	} else if (typeof query_string[pair[0]] === "string") {
	  var arr = [ query_string[pair[0]], pair[1] ];
	  query_string[pair[0]] = arr;
		// If third or later entry with this name
	} else {
	  query_string[pair[0]].push(pair[1]);
	}
  } 
	return query_string;
} ();
var layer = new gmaps.ags.Layer(url + '2');
var renderResult = {};
layer.query({
	where: "ID = " + QueryString.id,
	outFields: ["FacilityName", "Address", "OrganizationName", "NPRI_ID", "Sector", "Contact", "Phone", "Email", "HREmploy", "SubstanceName", "Units", "Use", "Creation", "Contained", "ReleasestoAir", "ReleasestoWater", "ReleasestoLand", "DisposalOnSite", "DisposalOffSite", "RecycleOffSite"]
}, function (rs) {
	var fs = rs.features;
	attr = fs[0].attributes;
	renderResult.FacilityName = attr.FacilityName;
	renderResult.CompanyName = attr.OrganizationName;
	renderResult.Address = attr.Address;
	renderResult.Sector = attr.Sector;
	renderResult.NPRIID = attr.NPRI_ID;
	renderResult.PublicContact = (attr.Contact === null) ?  "[<I>" + ((language === "EN") ? "no name available" : "Aucun nom disponible") +  "</I>]" : attr.Contact;
	renderResult.PublicContactPhone = attr.Phone;
	renderResult.PublicContactEmail = attr.Email;
	renderResult.HighestRankingEmployee = attr.HREmploy;
	if((fs.length > 1) || (fs[0].attributes.SubstanceName  !== null)){
		var substances = [];
		for (var i = 0, c = fs.length; i < c; i++) {
			attr = fs[i].attributes;
			var s = {
				Name: attr.SubstanceName,
				Units: attr.Units,
				Used: attr.Use,
				Created: attr.Creation,
				Contained: attr.Contained,
				Air: attr.ReleasestoAir,
				Water: attr.ReleasestoWater,
				Land: attr.ReleasestoLand,
				DOnSite: attr.DisposalOnSite,
				DOffSite: attr.DisposalOffSite,
				ROffSite: attr.RecycleOffSite
			};
			substances.push(s);
		}
		renderResult.Substances = substances;
	}
	document.getElementById("target").innerHTML = _.template(document.getElementById("TRAISTemplate").innerHTML, renderResult);	
});