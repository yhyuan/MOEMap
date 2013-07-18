var globalConfig = globalConfig || {};
if (globalConfig.language === "EN") {
	globalConfig.otherInfoHTML = "Some scientific/monitoring data are only provided in English."; 
} else {
	globalConfig.otherInfoHTML = 'Certaines donn&eacute;es scientifiques et de surveillance n&rsquo;existent qu&rsquo;en anglais.';
}
globalConfig.url = "http://www.appliomapss.lrc.gov.on.ca/ArcGIS/rest/services/MOE/PWQMN/MapServer";
globalConfig.pointBufferTool = {available: false};
globalConfig.extraImageService = {visible: false};
globalConfig.usejQueryUITable = false;
if (globalConfig.accessible) {
	globalConfig.usePredefinedMultipleTabs = false;
} else {
	globalConfig.usePredefinedMultipleTabs = true;
}
globalConfig.allowMultipleIdentifyResult = false;
globalConfig.displayTotalIdentifyCount = false;
globalConfig.locationServicesList = [];
globalConfig.maxQueryZoomLevel = 10;
globalConfig.displayDisclaimer = true;
globalConfig.InformationLang = "Information";
globalConfig.postIdentifyCallbackName = "Wells";
globalConfig.postConditionsCallbackName = "Wells";
globalConfig.infoWindowWidth = '470px';
globalConfig.infoWindowHeight = "230px";
globalConfig.infoWindowContentHeight = "200px";
globalConfig.infoWindowContentWidth = "450px";

if (globalConfig.accessible) {
	globalConfig.queryLayerList = [{
		url: globalConfig.url + "/0",
		tableTemplate: {
			title: globalConfig.tableSimpleTemplateTitleLang, 
			content: "<tr><td>{STATION}</td><td>{NAME}</td><td>{LOCATION}</td><td>{mapConfig.getStatus(STATUS)}</td><td>{FIRST_YR}</td><td>{LAST_YR}</td><td>{globalConfig.deciToDegree(LATITUDE)}</td><td>{globalConfig.deciToDegree(LONGITUDE)}</td></tr>",
			head: "<table class='fishTable'  border='1'><tr><th><center>" + globalConfig.StationIDLang + "</center></th><th><center>" + globalConfig.StreamLang + "</center></th><th><center>" + globalConfig.LocationLang + "</center></th><th><center>" + globalConfig.StatusLang + "</center></th><th><center>" + globalConfig.FirstYearLang + "</center></th><th><center>" + globalConfig.LastYearLang + "</center></th><th><center>" + globalConfig.LatitudeLang + "</center></th><th><center>" + globalConfig.LongitudeLang + "</center></th></tr>",
			tail: "</table>"
		} 
	}];
	globalConfig.postConditionsCallbackName = "AccessibleWells";
	globalConfig.allowMultipleIdentifyResult = false;
	globalConfig.displayTotalIdentifyCount = false;
} else {
	globalConfig.tabsTemplate = [{
			label: globalConfig.InformationLang,
			content:globalConfig.tabsTemplateContentInformation
		},{
			label: "[{PHOSPHORUS}?  ?" + globalConfig.PhosphorusLang + "]", 
			content:globalConfig.tabsTemplateContentPhosphorus
		},{
			label: "[{NITRATES}?  ?" + globalConfig.NitratesLang + "]",
			content:globalConfig.tabsTemplateContentNitrates
		},{
			label: "[{SUS_SOLIDS}?  ?" + globalConfig.SuspSolidsLang + "]",
			content:globalConfig.tabsTemplateContentSuspSolids
		},{
			label: "[{CHLORIDE}?  ?" + globalConfig.ChlorideLang + "]",
			content:globalConfig.tabsTemplateContentChloride
		}];
	globalConfig.queryLayerList = [{
		url: globalConfig.url + "/0",
		tabsTemplate: globalConfig.tabsTemplate
	}];	
}

	
globalConfig.search = function(){
	var searchString = document.getElementById(globalConfig.searchInputBoxDivId).value.trim();
	if(searchString.length === 0){
		return;
	}
	MOEMAP.clearOverlays();
	var queryParams = {
		searchString: searchString
	};
	if (!globalConfig.accessible) {
		queryParams.withinExtent = document.getElementById(globalConfig.currentMapExtentDivId).checked;
	}
    var searchStationNO = function (queryParams){
		var name = queryParams.searchString;
		var reg = /^\d+$/;
		if((name.length == 11) && reg.test(name)){
			queryParams.requireGeocode = false;
			queryParams.where = "STATION = '" + name.toUpperCase() +  "'";			
			MOEMAP.queryLayersWithConditionsExtent(queryParams);				
			return true;
		}else{
			return false;
		}
	};
	if(searchStationNO(queryParams)){
		return;
	}
	var name = queryParams.searchString;
	var coorsArray = name.split(/\s+/);
	var str = coorsArray.join(" ").toUpperCase();
	queryParams.requireGeocode = true;
	queryParams.where = "UPPER(NAME) LIKE '%" + str + "%'";
	queryParams.address = searchString;
	MOEMAP.queryLayersWithConditionsExtent(queryParams);		
};
globalConfig.maxYearCoordinate = 2012;

var mapConfig = {
	getChart1: function (data){
		var res = mapConfig.getChart(data);
		return "<img src='" + res + ")'/><br>";
	},
	
	getChart2: function (data){
		var res = mapConfig.getChart(data);
		return "<img src='" + res + "-N)'/><br>";
	},

	getChart: function (data){
		var lines = data.split(";");
		var len = lines.length;
		var maxCorr = -10000;
		var dataList = new Array();
		var timeList = new Array();
		var beginTime = new Date(2002, 0, 1);
		var endTime = new Date(globalConfig.maxYearCoordinate, 0, 1);
		var c = (endTime.getTime()-beginTime.getTime())/100;
		var dateString = "";
		for(var i=0; i < len; i++) {
			var items = (lines[i]).split(":");
			var val = parseFloat(items[1]);
			if(val>maxCorr)
				maxCorr = val; 
			dataList.push(val);
			var ds = items[0];
			var year = parseInt(ds.substring(0,2), '10');
			var month = parseInt(ds.substring(2,4), '10');
			var day = parseInt(ds.substring(4), '10');
			var current = new Date(year+2000, month-1, day);
			var dayValue = ((current.getTime()-beginTime.getTime())/c).toFixed(2);
			dateString = dateString + dayValue + ","
		}
		dateString = dateString.substring(0,dateString.length-1)
		if(len ==1)
			maxCorr = 2*maxCorr;
		maxCorr = mapConfig.getMaxCorr(maxCorr);
		var midCorr = maxCorr/2;
		var c = 100/maxCorr;
		var dataStr = "";
		for(var i=0; i < len; i++) {
			dataStr = dataStr + (dataList[i]*c).toFixed(2) + ",";
		}
		dataStr = dataStr.substring(0,dataStr.length-1);
		var yearCoordinates = Array.range(2002, globalConfig.maxYearCoordinate).join("|");
		var res = "http://chart.apis.google.com/chart?cht=s&chd=t:" + dateString + "|"+dataStr+"&chxt=x,y&chs=400x150&chxl=|0:|" + yearCoordinates + "|1:|0|"+midCorr+"|" + maxCorr + "(mg/L";
		return res;
	},

	getBoxPlot: function (data){
		//var minColumns = 5;
		var lines = data.split(";");
		var theList = new Array();
		var yearList = new Array();
		var statList = new Array();

		var len = lines.length;
		var pre_year= "";
		var maxCorr = -10000;
		for(var i=0; i < len; i++) {
			var items = (lines[i]).split(":");

			var val = parseFloat(items[1]);
			if(val>maxCorr)
				maxCorr = val; 
			var year = (items[0]).substring(0,2);
			if((year!=pre_year)&&(pre_year!="")){
				statList.push(mapConfig.getStatistics(theList));
				yearList.push(pre_year);
				theList = new Array();
			}
			theList.push(val);
			pre_year = year;			
		}
		statList.push(mapConfig.getStatistics(theList));
		yearList.push(pre_year);
		maxCorr = mapConfig.getMaxCorr(maxCorr);
		var midCorr = maxCorr/2;
		var c = 100/maxCorr;

		var stat = statList[0];
		var min = (stat['Min']*c).toFixed(2); 
		var max = (stat['Max']*c).toFixed(2); 
		var median = (stat['Median']*c).toFixed(2);
		var q1 = (stat['Q1']*c).toFixed(2); 
		var q3 = (stat['Q3']*c).toFixed(2);
		var yearStr = "<a target='_blank' href='http://en.wikipedia.org/wiki/Box_plot'>Boxplots</a> in 20" + yearList[0];
		if(yearList.length>1){
			var loopLength = yearList.length;
			if(loopLength>4)
				loopLength = 4;
			for(var i=1; i < loopLength; i++) {
				stat = statList[i];
				min = min + "," + (stat['Min']*c).toFixed(2); 
				max = max + "," +(stat['Max']*c).toFixed(2); 
				median = median + "," +(stat['Median']*c).toFixed(2);
				q1 = q1 + "," +(stat['Q1']*c).toFixed(2); 
				q3 = q3 + "," +(stat['Q3']*c).toFixed(2);
				yearStr = yearStr + ",20"  + yearList[i];
			}
		}
		var min2 = ""; 
		var max2 = ""; 
		var median2 = "";
		var q1_2 = ""; 
		var q3_2 = "";

		if(yearList.length>4){
			stat = statList[4];
			min2 = (stat['Min']*c).toFixed(2); 
			max2 = (stat['Max']*c).toFixed(2); 
			median2 = (stat['Median']*c).toFixed(2);
			q1_2 = (stat['Q1']*c).toFixed(2); 
			q3_2 = (stat['Q3']*c).toFixed(2);
			yearStr = yearStr + ",20"  + yearList[4];
			if(yearList.length>4){
				for(var i=5; i < yearList.length; i++) {
					stat = statList[i];
					min2 = min2 + "," + (stat['Min']*c).toFixed(2); 
					max2 = max2 + "," +(stat['Max']*c).toFixed(2); 
					median2 = median2 + "," +(stat['Median']*c).toFixed(2);
					q1_2 = q1_2 + "," +(stat['Q1']*c).toFixed(2); 
					q3_2 = q3_2 + "," +(stat['Q3']*c).toFixed(2);
					yearStr = yearStr + ",20"  + yearList[i];
				}
			}
		}

		var str1 ="<img src='http://chart.apis.google.com/chart?chs=";
		var str2 = "x150&cht=lc&chxl=0:|0|"+midCorr+"|"+maxCorr+"&chd=t0:-1," + min + ",-1|-1," + q1 + ",-1|-1," + q3 + ",-1|-1," + max + ",-1|-1," + median + ",-1&chm=F,FF9900,0,1:4,40|H,0CBF0B,0,1:4,1:20|H,000000,4,1:4,1:40|H,0000FF,3,1:4,1:20&chxt=y";
		var str3 = "&chdl=Max+Value|Candlestick|Median|Min+Value&chco=0000FF,FF9900,000000,0CBF0B'/><br>";
		yearStr = yearStr + " (from left to right)";
		if(yearList.length<=4)
			res = str1 + "350" + str2 + str3  + yearStr;
		else
			res = str1 + "250" + str2 + "'/><img src='http://chart.apis.google.com/chart?chs=350x150&cht=lc&chxl=0:|0|"+midCorr+"|"+maxCorr+"&chd=t0:-1," + min2 + ",-1|-1," + q1_2 + ",-1|-1," + q3_2 + ",-1|-1," + max2 + ",-1|-1," + median2 + ",-1&chm=F,FF9900,0,1:4,40|H,0CBF0B,0,1:4,1:20|H,000000,4,1:4,1:40|H,0000FF,3,1:4,1:20&chxt=y"  + str3 + yearStr;
		return res;
	},

	getMaxCorr: function (max){
		var a = Math.floor(Math.log(max)/Math.LN10);
		var b = Math.pow(10,a);
		var c = Math.ceil(max/b*10);
		if(!(c%2==0))
			c = c + 1;
		var res = c*Math.pow(10,a-1);

		if(res>10)
			res = res.toFixed(0);
		else
			res = res.toFixed(-a+1);

		return res;
	},

/*	function getChart(data){
		var minColumns = 5;
		var lines = data.split(";");
		var theList = new Array();
		var len = lines.length;
		for(var i=0; i < len; i++) {
			var items = (lines[i]).split(":");

			theList[i] = parseFloat(items[1]);
		}
		var stat = getStatistics(theList);
		var maxCorr = stat['Max'];
		var midCorr = maxCorr/2;
		var c = 100/maxCorr;

		var min = (stat['Min']*c).toFixed(2); 
		var max = (stat['Max']*c).toFixed(2); 
		var median = (stat['Median']*c).toFixed(2);
		var q1 = (stat['Q1']*c).toFixed(2); 
		var q3 = (stat['Q3']*c).toFixed(2); 
		return "<img src='http://chart.apis.google.com/chart?chs=400x225&cht=ls&chxl=0:|0|"+midCorr+"|"+maxCorr+"&chd=t0:-1," + min + ",-1|-1," + q1 + ",-1|-1," + q3 + ",-1|-1," + max + ",-1|-1," + median + ",-1|-1,-1,-1|-1,-1,-1&chm=F,FF9900,0,1:4,40|H,0CBF0B,0,1:4,1:20|H,000000,4,1:4,1:40|H,0000FF,3,1:4,1:20|o,FF0000,5,-1,7|o,FF0000,6,-1,7&chxt=y&chdl=Outliers|Max+Value|Candlestick|Median|Min+Value&chco=FF0000,0000FF,FF9900,000000,0CBF0B'/>";
	}
*/
	getStatistics: function (list){
		var N = list.length;
		for(i=0; i<N-1; i++) { 
			for(j=i+1;j<N; j++) {
				if( list[j] < list[i])  {
					temp = list[i];            
					list[i] = list[j];              
					list[j] = temp;            
				}
			}
		}
		var median = -1;
		if(N == 1){
			var res = {
				Min: list[0],
				Max: list[0],
				Median: list[0],
				Q1: list[0],
				Q3: list[0]
			}
			return res; 
		}

		if(N == 2){
			median = (list[0] + list[1])/2.0;
			var res = {
				Min: list[0],
				Max: list[1],
				Median: median,
				Q1: median,
				Q3: median
			}
			return res; 
		}

		if(N == 3){
			var res = {
				Min: list[0],
				Max: list[2],
				Median: list[1],
				Q1: list[1],
				Q3: list[1]
			}
			return res; 
		}

		if(N%2 == 1)
			median = list[(N-1)/2];   
		else
			median = (list[N/2]+list[((N/2)-1)])/2.0;
		var t=0.0;
		var Q=0.0;
		t = Math.floor(N/4);
		var q1 = -1;
		var q3 = -1;
		if (4*t == N) {
			q1 = (list[t-1] + list[t])/2;
			Q = 3*t;
			q3 = (list[Q] + list[Q-1])/2;  }
		else {
			q1 = list[t];
			q3 = list[N-t-1];
		}
		var res = {
			Min: list[0],
			Max: list[N-1],
			Median: median,
			Q1: q1,
			Q3: q3
		}
		return res; 
	},

	getStatus: function (str){
		var res = "Inactive";
		if(str.trim() == "A")
			res = "Active";
		return res;
	},

	deciToDegree: function (degree){
		var sym = "N";
		if(degree<0){
			degree = -degree;
			sym = "W";
		}
		var deg = Math.floor(degree);
		var temp = (degree - deg)*60;
		var minute = Math.floor(temp);
		var second = Math.floor((temp- minute)*60);
		var res = "";
		if(second<1)
			res ="" + deg + "&deg;" + minute + "'";
		else if(second>58)
			res ="" + deg + "&deg;" + (minute+1) + "'";
		else
			res ="" + deg + "&deg;" + minute + "'" + second + "\"";
		return res + sym;
	}
};

