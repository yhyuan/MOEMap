globalConfig = {};
globalConfig.language = "EN";
globalConfig.searchControlHTML = '<label for="region">Filter by region:</label>\
				<select name="region" id="region">\
				   <option value="0">Regions</option>\
					<option value="Ontario"> Ontario</option>\
					<option value="Central">Central</option>\
					<option value="Eastern">Eastern</option>\
					<option value="Northern">Northern</option>\
					<option value="Southwestern">Southwestern</option>\
					<option value="West Central">West Central</option>\
				</select>\
<input type="submit" onclick="globalConfig.search()" value="Go!">';

globalConfig.tabsTemplateContent = "<strong><h3>{SITE_NAME}</h3></strong><br>\
<strong>Operation Status:</strong> {STATUS}<br>\
<strong>Ownership Type:</strong> {TYPE}<br>\
Go to <a target='_blank' href='http://www.ontario.ca/environment-and-energy/large-landfill-site-details?site={COFA_NUM}'>{SITE_NAME}</a>";
