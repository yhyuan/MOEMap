var MOE_map_language = "EN";
var MOEMapLanguage = {
	locatorFailedMessage: '<p>Sorry, we can not find your location. Please try again with other location information.</p>',
	step1Text1: '<p>The Ministry requires that you indicate the location of your water taking(s) on a detailed map. This allows the Ministry to make informed decisions on your application based on local and regional water resources. This interactive mapping tool allows you to create your own map to fulfill this requirement for Permit to Take Water application submission.</p><p>To start, you have two options:</p><p>1)&nbsp;Use <strong>Geographic Township</strong> to find your locations.</p>',
	step1Text2: '&nbsp;<input id="township_search_button" type="submit" onclick="mapConfig.searchTownship()" value="Find Your Geographic Township" /><p>2)&nbsp;Use <strong>Address</strong>, <strong>Postal Code</strong>, <strong>Town</strong>, or <strong>Water Body</strong> to find your locations. You can also check help for more options.</p><input id="map_query" type="text" size="50" onkeypress="return MOEMap.entsub(event)" maxlength="100" />&nbsp;<input id="search_button" type="submit" onclick="mapConfig.search()" value="Find Your Location" />',
	step2Text: '<p>Zoom or move the map to your water sources. <strong>Click on the map to mark where your water source is located.</strong> Once clicked, a prompt will pop up asking you to provide a "source name".  Provide a source name that best describes your well, watercourse, lake or pond. Examples of a source name include: Production Well, Long Lake, Otter River, and Doug\'s Pond.</p><p>To add more than one water source click on the map again to place another water source on the map.</p><p>Made a mistake? Click on the location again to remove a water source.</p><p>All marked and named water sources will be displayed in a table below the map for your reference. Information included in the table can be used to fill out your <a href="http://www.ene.gov.on.ca/environment/en/resources/STD01_078777.html">Permit to Take Water application form</a>.</p><p>When you are finishing marking all your water sources, click "Next" to preview your map for print.</p><p><strong>Click on the map to mark where your water source is located.</strong></p><table class="map_buttonsTable"><tr><td><div id="previous_step" align="left"><input id="previous_button" type="submit" onclick="mapConfig.returnFindYourLocation()" value="Previous" /></div></td><td width="100%"><div id="loadingimage" align="center" style="display:none;">Extracting Water Source Information</div></td><td><div id="next_step" align="right"><input id="next_button" type="submit" onclick="mapConfig.next()" value="Next" disabled="disabled" /></div></td></tr></table>',
	step3Text: "<p>Once you have printed your map, please ensure you outlined the property from which you will take water. Also mark and label:</p><p>All designated features within 500 metres of each water taking location, existing wells, springs, watercourses, wetlands, water bodies, property lines, locations and name of property owners, nearest road intersections, dwellings.</p><p>This map is a scale of approximately 1:10 000, the recommended scale for your application.</p>",
	step3Button: '<table class="map_buttonsTable"><tr><td><div id="previous_step" align="left"><input id="previous_button" type="submit" onclick="mapConfig.returnCreateLocations()" value="Previous" /></div></td><td><div id="next_step" align="right"><input id="next_button" type="submit" onclick="mapConfig.print()" value="Print" /></div></td></tr></table>',	
	contactText: "<p>If you have any questions about your Permit to Take Water Application, please contact:</p>",
	disclaimer: '<p>Please note that it is not mandatory to use this application resource to create a map for your PTTW application. Maps created using other software applications will be accepted provided the maps meet the requirements specified on the application form.</p>',
	MOERegionContact: {
		"Northern": "<p><strong>Thunder Bay Regional Office</strong></p><p>Suite 331<br />435 James St. S.<br />3rd Floor<br />Thunder Bay ON P7E 6S7<br />Toll free from area codes 705/807: 1-800-875-7772<br />Tel: (807) 475-1205<br />Fax: (807) 475-1754</p>",
		"Central": "<p><strong>Central Region Office</strong></p><p>5775 Yonge St.<br />8th floor<br />North York ON M2M 4J1<br />Toll free: 1-800-810-8048<br />Tel: (416) 326-6700<br />Fax: (416) 325-6345</p>",
		"Eastern": "<p><strong>Kingston Regional Office</strong></p><p>Box 22032<br />1259 Gardiners Road<br />Kingston ON K7M 8S5<br />Toll free for area codes 613/705/905: 1-800-267-0974<br />Tel: (613) 549-4000<br />Fax: (613) 548-6908</p>",
		"West Central": "<p><strong>Hamilton Regional Office</strong></p><p>12th floor<br />119 King St. W.<br />Hamilton ON L8P 4Y7<br />Toll free: 1-800-668-4557<br />Tel: (905) 521-7640<br />Fax: (905) 521-7820</p>",
		"Southwestern": "<p><strong>London Regional Office</strong></p><p>733 Exeter Road<br />London ON N6E 1L3<br />Toll free number from area code 519: 1-800-265-7672<br />Tel: (519) 873-5000<br />Fax: (519) 873-5020</p>"
	},
	unsurveyedTerritory: "Unsurveyed Territory",
	removeText: "Remove",
	PromptText1: "<p>Please input source name (e.g. Home Pond, Well 1, Otter Creek. Max: ",
	PromptText2: " letters). Confirm your input by clicking Ok button</p>",
	RemovePromptText: 'Do you really want to remove this source?',
	okButton: { OK:true },
	YesNoButtons: {"Yes": true, "No": false },
	Yes: "Yes",
	No: "No",
	tableHeads: ["<table class='fishTable' border='1'><tr><th>Lot</th><th>Concession</th><th>Part</th><th>Reference Plan</th></tr>", "<table class='fishTable'  border='1'><tr><th>Municipality/Unorganised Township</th><th>County/District</th><th>Original Geographic Township</th></tr>", "Geographic (GPS) coordinates (to be provided in Datum NAD83)<br><table class='fishTable'  border='1'><tr><th>Method of Collection</th><th>Accuracy Estimation</th><th>UTM Zone</th><th>Easting</th><th>Northing</th></tr>","Supplementary information - not required for your application form: <br><table class='fishTable'  border='1'><tr><th>Watershed Name</th><th>Watershed Use - Annual</th><th>Watershed Use - Summer</th></tr>","<table class='fishTable'  border='1'><tr><th>Is the site where water taking will occur located in an area of development control as defined by the <i>Niagara Escarpment Planning & Development Act?</i></th></tr>","<table class='fishTable'  border='1'><tr><th>Is the site where water taking will occur located on the Oak Ridges Moraine Conservation Area as defined by the Oak Ridges Moraine Conservation Plan (a regulation made under the <i>Oak Ridges Moraine Conservation Act</i>)?</th></tr>"]
};


