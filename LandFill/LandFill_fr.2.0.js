globalConfig = {};
globalConfig.language = "FR";
globalConfig.searchControlHTML = '<label for="region">Choix en fonction du district :</label>\
				<select name="region" id="region">\
				   <option value="0">tous les districts</option>\
					<option value="Ontario"> Ontario</option>\
					<option value="Central">Central</option>\
					<option value="Eastern">Eastern</option>\
					<option value="Northern">Northern</option>\
					<option value="Southwestern">Southwestern</option>\
					<option value="West Central">West Central</option>\
				</select>\
<input type="submit" onclick="globalConfig.search()" value="faire un choix" />';

globalConfig.tabsTemplateContent = "<strong><h3>{SITE_NAME}</h3></strong><br>\
<strong>Etat d'exploitation::</strong> {STATUS}<br>\
<strong>Type de decharge:</strong> {TYPE}<br>\
Go to <a target='_blank' href='http://www.ontario.ca/environment-and-energy/large-landfill-site-details?site={COFA_NUM}'>{SITE_NAME}</a>";

