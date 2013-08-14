globalConfig.url="http://www.giscoeservices.lrc.gov.on.ca/ArcGIS/rest/services/MOE/ECofA_P/MapServer";globalConfig.isRoutingServiceAvailable=false;globalConfig.displayDisclaimer=true;globalConfig.maxQueryReturn=1000;globalConfig.accessible=globalConfig.accessible||false;if(globalConfig.accessible){globalConfig.usePredefinedMultipleTabs=false;globalConfig.allowMultipleIdentifyResult=false;globalConfig.displayTotalIdentifyCount=false;globalConfig.postConditionsCallbackName="AccessibleWells";globalConfig.tableSimpleTemplateTitleLang=""}else{var lang="";var legendWidth=0;if(globalConfig.language==="EN"){globalConfig.tableSimpleTemplateTitleLang="Note: The Distance(KM) column represents the distance between your search location and the permit location in the specific row. Data is in English only.";lang="en";legendWidth=270}else{globalConfig.tableSimpleTemplateTitleLang="\u00c0 noter : La colonne de distance (en km) donne la distance entre le lieu de votre recherche et le lieu concern\u00e9 par le permis dans la rang\u00e9e donn\u00e9e. Les donn\u00e9es sont en anglais seulement.";lang="fr";legendWidth=372}globalConfig.legend={available:true,url:"http://www.downloads.ene.gov.on.ca/files/mapping/js/AccessEnvironment/legend_"+lang+".png",size:{width:legendWidth,height:81},location:{ratioX:0.01,ratioY:0.25}}}if(globalConfig.language==="EN"){globalConfig.InformationLang="Information";globalConfig.MoreLang="More...";globalConfig.fieldNamesList=["Approval Number","Business Name","Date","Project Type","Report","MOE Reference Number","EBR Reference Number","Address","Municipality","Status"];if(globalConfig.advancedVersion){globalConfig.searchHelpTxt="";globalConfig.searchControlHTML=""}else{if(globalConfig.accessible){globalConfig.searchHelpTxt="Search with Business Name.";globalConfig.AdvancedSearchLang="Advanced Search";globalConfig.searchControlHTML='<center><input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="Term"></input>&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search" title="Search"></input><a href=\'AccessEnvironmentAdv_Accessible_en.htm\'>'+globalConfig.AdvancedSearchLang+'</a><br><div id="information" style="margin-top:10px;">'+globalConfig.searchHelpTxt+"</div></center>"}else{globalConfig.searchHelpTxt="Zoom in, or Search with Business Name, Address.";globalConfig.searchControlHTML='<center>				<input id = "map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="Search"></input>&nbsp;&nbsp;				<a href=\'AccessEnvironmentAdv.htm\'>Advanced Search</a>				<br><input id = "searchBusiness" type="radio" name="searchGroup" value="business" onclick="globalConfig.searchChange(\'Business\')">Business Name				<input id = "searchLocation" type="radio" name="searchGroup" value="location" onclick="globalConfig.searchChange(\'Location\')">Address with Radius of				<select name="searchCriteria.radius" id="lstRadius">										<option value="1" >1 km</option>										<option value="5" >5 km</option>										<option value="10" >10 km</option>										<option value="25" >25 km</option>										<option value="50" >50 km</option>									</select>				<div id="information" style="color:#0000FF">'+globalConfig.searchHelpTxt+"</div></center>"}}}else{globalConfig.InformationLang="Information";globalConfig.MoreLang="Autres...";globalConfig.fieldNamesList=["N&deg; d'autorisation","Nom de l'entreprise","Date","Type de projet","Rapport","N&deg; de r\u00e9f\u00e9rence du MEO","N&deg; de r\u00e9f. au Registre environnemental","Adresse","Municipalit\u00e9","Statut"];if(globalConfig.advancedVersion){globalConfig.searchHelpTxt="";globalConfig.searchControlHTML=""}else{globalConfig.AdvancedSearchLang="Recherche avanc\u00e9e";if(globalConfig.accessible){globalConfig.searchHelpTxt="Faire un zoom avant ou une recherche par nom d\u0027entreprise.";globalConfig.SearchLang="Recherche";globalConfig.searchControlHTML='<center>				<input id = "map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="'+globalConfig.SearchLang+"\"></input>&nbsp;&nbsp;				<a href='AccessEnvironmentAdv_Accessible_fr.htm'>"+globalConfig.AdvancedSearchLang+'</a>				<div id="information" style="color:#0000FF">'+globalConfig.searchHelpTxt+"</div></center>"}else{globalConfig.searchHelpTxt="Faire un zoom avant ou une recherche par nom d\u0027entreprise et adresse.";globalConfig.BusinessNameLang="Nom de l'entreprise";globalConfig.SearchLang="Recherche";globalConfig.AddresswithRadiusofLang="Adresse dans un rayon de";globalConfig.searchControlHTML='<center>				<input id = "map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100"></input>&nbsp;&nbsp;<input type="submit" onclick="globalConfig.search()" value="'+globalConfig.SearchLang+"\"></input>&nbsp;&nbsp;				<a href='AccessEnvironmentAdv_fr.htm'>"+globalConfig.AdvancedSearchLang+'</a>				<br><input id = "searchBusiness" type="radio" name="searchGroup" value="business" onclick="globalConfig.searchChange(\'Business\')">'+globalConfig.BusinessNameLang+'				<input id = "searchLocation" type="radio" name="searchGroup" value="location" onclick="globalConfig.searchChange(\'Location\')">'+globalConfig.AddresswithRadiusofLang+'				<select name="searchCriteria.radius" id="lstRadius">										<option value="1" >1 km</option>										<option value="5" >5 km</option>										<option value="10" >10 km</option>										<option value="25" >25 km</option>										<option value="50" >50 km</option>									</select>				<div id="information" style="color:#0000FF">'+globalConfig.searchHelpTxt+"</div></center>"}}}globalConfig.formatDate=function(d){if((typeof(d)!="undefined")&&(parseInt(d)===d)){var b=new Date(d);var c=b.getFullYear();var e=b.getMonth()+1;var a=b.getDate();return""+c+"/"+e+"/"+a}else{return"N/A"}};globalConfig.formatProjectType=function(a){if(typeof(a)=="undefined"){return"N/A"}if(a=="null"){return"N/A"}if(a=="Null"){return"N/A"}if(a.indexOf("_")>0){return globalConfig.replaceChar(a,"_"," ")}return a};globalConfig.calculateReportURL=function(a){if(typeof(a)!="undefined"){if(a=="N/A"){return"N/A"}else{if(a.indexOf(".pdf")>0){return"<a target='_blank' href='http://www.environet.ene.gov.on.ca/instruments/"+a+"'>PDF</a>"}var b=/^\d+$/;if(b.test(a)){return"<a target='_blank' href='http://www.accessenvironment.ene.gov.on.ca/PiwWeb/piw/ViewDocument.action?documentRefID="+a+"'>PDF</a>"}}}return"N/A"};globalConfig.tabTableFieldList_1=[{name:globalConfig.fieldNamesList[0],value:"{globalConfig.processNA(CERTIFICATE_NUMBER)}"},{name:globalConfig.fieldNamesList[1],value:"{globalConfig.processNA(BUSINESS_NAME)}"},{name:globalConfig.fieldNamesList[2],value:"{globalConfig.formatDate(DATE_)}"},{name:globalConfig.fieldNamesList[3],value:"{globalConfig.formatProjectType(PROJECT_TYPE)}"},{name:globalConfig.fieldNamesList[4],value:"{globalConfig.calculateReportURL(PDF_LINK)}"}];globalConfig.tabTableFieldList_2=[{name:globalConfig.fieldNamesList[5],value:"{globalConfig.processNA(REFERENCE_NUMBER)}"},{name:globalConfig.fieldNamesList[6],value:"{globalConfig.processNA(EBR_REFERENCE_NUMBER)}"},{name:globalConfig.fieldNamesList[7],value:"{globalConfig.processNA(ADDRESS)}"},{name:globalConfig.fieldNamesList[8],value:"{globalConfig.processNA(MUNICIPALITY)}"},{name:globalConfig.fieldNamesList[9],value:"{globalConfig.formatProjectType(STATUS)}"}];globalConfig.tableFieldList=[{name:globalConfig.fieldNamesList[0]+"&nbsp&nbsp",value:"{globalConfig.processNA(CERTIFICATE_NUMBER)}"},{name:globalConfig.fieldNamesList[1]+"&nbsp&nbsp",value:"{globalConfig.processNA(BUSINESS_NAME)}"},{name:globalConfig.fieldNamesList[7],value:"{globalConfig.processNA(ADDRESS)}"},{name:globalConfig.fieldNamesList[8]+"&nbsp&nbsp",value:"{globalConfig.processNA(MUNICIPALITY)}"},{name:globalConfig.fieldNamesList[2],value:"{globalConfig.formatDate(DATE_)}"},{name:globalConfig.fieldNamesList[3]+"&nbsp&nbsp",value:"{globalConfig.formatProjectType(PROJECT_TYPE)}"},{name:globalConfig.fieldNamesList[9]+"&nbsp",value:"{globalConfig.formatProjectType(STATUS)}"},{name:globalConfig.fieldNamesList[4]+"&nbsp&nbsp",value:"{globalConfig.calculateReportURL(PDF_LINK)}"}];globalConfig.queryLayerList=[{url:globalConfig.url+"/0",tabsTableTemplate:[{label:globalConfig.InformationLang,content:globalConfig.tabTableFieldList_1},{label:globalConfig.MoreLang,content:globalConfig.tabTableFieldList_2}],tableSimpleTemplate:{title:globalConfig.tableSimpleTemplateTitleLang,content:globalConfig.tableFieldList}}];globalConfig.postInitialize=function(a){if(document.getElementById(globalConfig.searchBusinessDivId)){document.getElementById(globalConfig.searchBusinessDivId).checked=true}if(document.getElementById(globalConfig.searchLocationDivId)){document.getElementById(globalConfig.searchLocationDivId).checked=false}if(document.getElementById(globalConfig.radiusSelectionDivId)){document.getElementById(globalConfig.radiusSelectionDivId).disabled=true}if(document.getElementById(globalConfig.searchInputBoxDivId)){document.getElementById(globalConfig.searchInputBoxDivId).focus()}};globalConfig.searchChange=function(a){if(a==="Business"){document.getElementById(globalConfig.radiusSelectionDivId).disabled=true}else{document.getElementById(globalConfig.radiusSelectionDivId).disabled=false}};globalConfig.search=function(){var b=document.getElementById(globalConfig.searchInputBoxDivId).value.trim();if(b.length===0){return}document.getElementById(globalConfig.queryTableDivId).innerHTML="";MOEMAP.clearOverlays();var d={searchString:b,withinExtent:false};if(globalConfig.accessible||document.getElementById(globalConfig.searchBusinessDivId).checked){var a=b.toUpperCase();a=globalConfig.replaceChar(a,"'","''");a=globalConfig.replaceChar(a,"\u2019","''");var c=function(e,f){return"(UPPER("+e+") LIKE '% "+f+" %') OR (UPPER("+e+") LIKE '"+f+" %') OR (UPPER("+e+") LIKE '% "+f+"') OR (UPPER("+e+") = '"+f+"') OR (UPPER("+e+") LIKE '%"+f+",%')"};d.where=c("BUSINESS_NAME",a);d.requireGeocode=false;d.address=b;MOEMAP.queryLayersWithConditionsExtent(d);return}if(document.getElementById(globalConfig.searchLocationDivId).checked){d.address=b;d.radius=document.getElementById(globalConfig.radiusSelectionDivId).value;d.callback=MOEMAP.addressBufferCallback;LOCATOR.locate(d)}};globalConfig.advSearch=function(){var j="";document.getElementById(globalConfig.queryTableDivId).innerHTML="";MOEMAP.clearOverlays();var a={searchString:j,withinExtent:false};var k=[];var q=document.getElementsByName("searchCriteria.certificateNumber")[0].value;if(q.length>0){k.push("(CERTIFICATE_NUMBER = '"+q+"')")}var g=document.getElementsByName("searchCriteria.ebrRegistryNumber")[0].value;if(g.length>0){k.push("(EBR_REFERENCE_NUMBER = '"+g+"')")}var e=document.getElementsByName("searchCriteria.moeReferenceNumber")[0].value;if(e.length>0){k.push("(REFERENCE_NUMBER = '"+e+"')")}var t=document.getElementsByName("searchCriteria.approvalDateFromString")[0].value;if(t.length>0){k.push("(DATE_ >= to_date('"+t+"', 'YYYY-MM-DD'))")}var l=document.getElementsByName("searchCriteria.approvalDateToString")[0].value;if(l.length>0){k.push("(DATE_ <= to_date('"+l+"', 'YYYY-MM-DD'))")}var n=[];var r=document.getElementsByName("searchCriteria.ecaApprovalTypes");for(var s=0;s<=4;s++){if(r[0][s].selected){n.push(r[0][s].value)}}var c=document.getElementsByName("searchCriteria.easrApprovalTypes");for(var s=0;s<=5;s++){if(c[0][s].selected){n.push(c[0][s].value)}}if(document.getElementsByName("searchCriteria.reaApprovalTypes")[0].checked==true){n.push("Renewable Energy Approval")}if(n.length>0){k.push("(PROJECT_TYPE IN ('"+n.join("','")+"'))")}var m=[];var u=document.getElementsByName("searchCriteria.ecaApprovalStatus");for(var s=0;s<=2;s++){if(u[0][s].selected){m.push(u[0][s].value)}}var p=document.getElementsByName("searchCriteria.easrApprovalStatus");for(var s=0;s<=2;s++){if(p[0][s].selected){m.push(p[0][s].value)}}if(m.length>0){k.push("(STATUS IN ('"+m.join("','")+"'))")}var b=document.getElementsByName("searchCriteria.businessName")[0].value;if(b.length>0){var v=b.toUpperCase();v=globalConfig.replaceChar(v,"'","''");v=globalConfig.replaceChar(v,"\u2019","''");var o=function(i,w){return"((UPPER("+i+") LIKE '% "+w+" %') OR (UPPER("+i+") LIKE '"+w+" %') OR (UPPER("+i+") LIKE '% "+w+"') OR (UPPER("+i+") = '"+w+"') OR (UPPER("+i+") LIKE '%"+w+",%'))"};k.push(o("BUSINESS_NAME",v))}a.where=k.join("AND");var f=document.getElementsByName("searchCriteria.siteStreetNumber")[0].value;var d=document.getElementsByName("searchCriteria.radius")[0].value;if((f.length>0)&&(d.length>0)){var h=/^(-?\d+)(\.\d+)?$/;if(h.test(d)){a.address=f;a.radius=parseFloat(d);a.callback=MOEMAP.addressBufferCallback;LOCATOR.locate(a);return}else{console.log("The radius must be a number.");return}}else{if((f.length>0)&&(d.length===0)){console.log("You must specific a search radius or remove the value in address");return}else{if((f.length===0)&&(d.length>0)){console.log("You must specific a search address or remove the value in radius.");return}}}a.requireGeocode=false;a.address=j;MOEMAP.queryLayersWithConditionsExtent(a)};function selectAllType(){if(document.getElementsByName("searchCriteria.approvalTypes")[0].checked==true){document.getElementsByName("searchCriteria.approvalTypes")[1].checked=true;document.getElementsByName("searchCriteria.approvalTypes")[2].checked=true;document.getElementsByName("searchCriteria.approvalTypes")[3].checked=true;document.getElementsByName("searchCriteria.approvalTypes")[4].checked=true;document.getElementsByName("searchCriteria.approvalTypes")[5].checked=true;document.getElementsByName("searchCriteria.approvalTypes")[6].checked=true}else{document.getElementsByName("searchCriteria.approvalTypes")[1].checked=false;document.getElementsByName("searchCriteria.approvalTypes")[2].checked=false;document.getElementsByName("searchCriteria.approvalTypes")[3].checked=false;document.getElementsByName("searchCriteria.approvalTypes")[4].checked=false;document.getElementsByName("searchCriteria.approvalTypes")[5].checked=false;document.getElementsByName("searchCriteria.approvalTypes")[6].checked=false}}function disselectAllType(){if(document.getElementsByName("searchCriteria.approvalTypes")[1].checked==false||document.getElementsByName("searchCriteria.approvalTypes")[2].checked==false||document.getElementsByName("searchCriteria.approvalTypes")[3].checked==false||document.getElementsByName("searchCriteria.approvalTypes")[4].checked==false||document.getElementsByName("searchCriteria.approvalTypes")[5].checked==false||document.getElementsByName("searchCriteria.approvalTypes")[6].checked==false){document.getElementsByName("searchCriteria.approvalTypes")[0].checked=false}}function selectAllStatus(){if(document.getElementsByName("searchCriteria.certificateStatus")[0].checked==true){document.getElementsByName("searchCriteria.certificateStatus")[1].checked=true;document.getElementsByName("searchCriteria.certificateStatus")[2].checked=true;document.getElementsByName("searchCriteria.certificateStatus")[3].checked=true}else{document.getElementsByName("searchCriteria.certificateStatus")[1].checked=false;document.getElementsByName("searchCriteria.certificateStatus")[2].checked=false;document.getElementsByName("searchCriteria.certificateStatus")[3].checked=false}}function disselectAllStatus(){if(document.getElementsByName("searchCriteria.certificateStatus")[1].checked==false||document.getElementsByName("searchCriteria.certificateStatus")[2].checked==false||document.getElementsByName("searchCriteria.certificateStatus")[3].checked==false){document.getElementsByName("searchCriteria.certificateStatus")[0].checked=false}}function goHome(){window.location="GoSearch.action?search=basic"}if(globalConfig.advancedVersion){$(document).ready(function(){$("#txtDatepickerFrom").val("");$("#txtDatepickerTo").val("");$("#txtDatepickerFrom").datepicker({showOn:"button",buttonImage:"calendar.gif",buttonImageOnly:true,dateFormat:"yy-mm-dd"});$("#txtDatepickerTo").datepicker({showOn:"button",buttonImage:"calendar.gif",buttonImageOnly:true,dateFormat:"yy-mm-dd"});$("#chkAllApprovals").click(function(){if($(this).is(":checked")){$(this).parents("div:eq(0)").find("#lstAllApprovalsType option").attr("selected","selected")}else{if(!$(this).is(":checked")){$(this).parents("div:eq(0)").find("#lstAllApprovalsType").attr("selectedIndex","-1").children("option:selected").removeAttr("selected")}}});$("#chkAllEASRs").click(function(){if($(this).is(":checked")){$(this).parents("div:eq(0)").find("#lstAllEASRsType option").attr("selected","selected")}else{if(!$(this).is(":checked")){$(this).parents("div:eq(0)").find("#lstAllEASRsType").attr("selectedIndex","-1").children("option:selected").removeAttr("selected")}}});$("#chkAllStatus").click(function(){if($(this).is(":checked")){$(this).parents("fieldset:eq(0)").find("input:checkbox").attr("checked",this.checked);$(this).parents("fieldset:eq(0)").find("select option").attr("selected","selected")}else{if(!$(this).is(":checked")){$(this).parents("fieldset:eq(0)").find("input:checkbox").attr("checked",this.checked);$(this).parents("fieldset:eq(0)").find("select").attr("selectedIndex","-1").children("option:selected").removeAttr("selected")}}});$("#chkECAStatus").click(function(){if($(this).is(":checked")){$(this).parents("fieldset:eq(0)").find("#lstECAStatus option").attr("selected","selected");if($(this).parents("fieldset:eq(0)").find("#chkEASRStatus").is(":checked")){$(this).parents("fieldset:eq(0)").find("#chkAllStatus").attr("checked","checked")}}else{if(!$(this).is(":checked")){$(this).parents("fieldset:eq(0)").find("#chkAllStatus").attr("checked",this.checked);$(this).parents("fieldset:eq(0)").find("#lstECAStatus").attr("selectedIndex","-1").children("option:selected").removeAttr("selected")}}});$("#chkEASRStatus").click(function(){if($(this).is(":checked")){$(this).parents("fieldset:eq(0)").find("#lstEASRStatus option").attr("selected","selected");if($(this).parents("fieldset:eq(0)").find("#chkECAStatus").is(":checked")){$(this).parents("fieldset:eq(0)").find("#chkAllStatus").attr("checked","checked")}}else{if(!$(this).is(":checked")){$(this).parents("fieldset:eq(0)").find("#chkAllStatus").attr("checked",this.checked);$(this).parents("fieldset:eq(0)").find("#lstEASRStatus").attr("selectedIndex","-1").children("option:selected").removeAttr("selected")}}});var d=0;var f=0;var a=0;var e=$("#lstAllApprovalsType option").length;var i=$("#lstAllEASRsType option").length;$("#lstAllApprovalsType").change(function(){d=$("#lstAllApprovalsType :selected").length;if(e==d){$("#chkAllApprovals").attr("checked","checked")}else{if(e!=d){$("#chkAllApprovals").removeAttr("checked")}}});$("#lstAllEASRsType").change(function(){f=$("#lstAllEASRsType :selected").length;if(i==f){$("#chkAllEASRs").attr("checked","checked")}else{if(i!=f){$("#chkAllEASRs").removeAttr("checked")}}});var g=0;var h=0;var b=$("#lstECAStatus option").length;var c=$("#lstEASRStatus option").length;$("#lstECAStatus").change(function(){g=$("#lstECAStatus :selected").length;if(b==g){$("#chkECAStatus").attr("checked","checked")}else{if(b!=g){$("#chkECAStatus").removeAttr("checked")}}if(b==g&&c==h){$("#chkAllStatus").attr("checked","checked")}else{if(b!=g||c!=h){$("#chkAllStatus").removeAttr("checked")}}});$("#lstEASRStatus").change(function(){h=$("#lstEASRStatus :selected").length;if(c==h){$("#chkEASRStatus").attr("checked","checked")}else{if(c!=h){$("#chkEASRStatus").removeAttr("checked")}}if(b==g&&c==h){$("#chkAllStatus").attr("checked","checked")}else{if(b!=g||c!=h){$("#chkAllStatus").removeAttr("checked")}}})})};