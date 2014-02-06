//var sectorNames = ["212 - Extraction mini\u00e8re et exploitation en carri\u00e8re (sauf l'extraction de p\u00e9trole et de gaz)","311 - Fabrication d'aliments","312 - Fabrication de boissons et de produits du tabac","313 - Usines de textiles","314 - Usines de produits textiles","316 - Fabrication de produits en cuir et de produits analogues","321 - Fabrication de produits en bois","322 - Fabrication du papier","323 - Impression et activit\u00e9s connexes de soutien","324 - Fabrication de produits du p\u00e9trole et du charbon","325 - Fabrication de produits chimiques","326 - Fabrication de produits en plastique et en caoutchouc","327 - Fabrication de produits min\u00e9raux non m\u00e9talliques","331 - Premi\u00e8re transformation des m\u00e9taux","332 - Fabrication de produits m\u00e9talliques","333 - Fabrication de machines","334 - Fabrication de produits informatiques et \u00e9lectroniques","335 - Fabrication de mat\u00e9riel, d'appareils et de composants \u00e9lectriques","336 - Fabrication de mat\u00e9riel de transport","337 - Fabrication de meubles et de produits connexes","339 - Activit\u00e9s diverses de fabrication"];
//var substancesNames = ["Chrome (et ses compos\u00e9s) NA - 04","Ethylbenz\u00e8ne 100-41-4","M\u00e9thanol 67-56-1","Naphtal\u00e8ne 91-20-3","Nickel (et ses compos\u00e9s) NA - 11","Sp\u00e9ciation des COV - 2-Butoxy\u00e9thanol 111-76-2","Sp\u00e9ciation des COV - Ac\u00e9tate de l'\u00e9ther monobutylique d'\u00e9thyl\u00e8ne glycol 112-07-2","Sp\u00e9ciation des COV - 1,2,4-Trim\u00e9thylbenz\u00e8ne 95-63-6","Sp\u00e9ciation des COV - Ether de di\u00e9thyl\u00e8ne glycol monobutylique 112-34-5","Sp\u00e9ciation des COV - Ac\u00e9tate d'\u00e9thyle 141-78-6","Sp\u00e9ciation des COV - Distillat de p\u00e9trole (naphta, fraction lourde hydrotrait\u00e9e) 64742-48-9","Sp\u00e9ciation des COV - Alcool isopropylique 67-63-0","Sp\u00e9ciation des COV - Solvant naphta aromatique l\u00e9ger 64742-95-6","Sp\u00e9ciation des COV - M\u00e9thanol 67-56-1","Sp\u00e9ciation des COV - M\u00e9thyl\u00e9thylc\u00e9tone 78-93-3","Sp\u00e9ciation des COV - M\u00e9thylisobutylc\u00e9tone 108-10-1","Sp\u00e9ciation des COV - Ac\u00e9tate de n-butyle 123-86-4","Sp\u00e9ciation des COV - Naphta VM et P (ligro\u00efne) 8032-32-4","Sp\u00e9ciation des COV - Ac\u00e9tate mono\u00e9thylique du di\u00e9thyl\u00e8ne glycol 112-15-2","Sp\u00e9ciation des COV - Ethanol 64-17-5","Sp\u00e9ciation des COV - Formald\u00e9hyde 50-00-0","Sp\u00e9ciation des COV - Naphta de p\u00e9trole (fraction des alkyl\u00e9s lourds) 64741-65-7","Sp\u00e9ciation des COV - Solvant naphta aromatique lourd 64742-94-5","Sp\u00e9ciation des COV - Essences min\u00e9rales 64475-85-0","Sp\u00e9ciation des COV - Ac\u00e9tate de l'\u00e9ther monom\u00e9thylique du propyl\u00e8ne glycol 108-65-6","Sp\u00e9ciation des COV - Tolu\u00e8ne 108-88-3","Sp\u00e9ciation des COV - Trim\u00e9thylbenz\u00e8ne (voir r\u00e9f\u00e9rence 104) 25551-13-7","Sp\u00e9ciation des COV - Xyl\u00e8ne (tous les isom\u00e8res) 1330-20-7","Tolu\u00e8ne 108-88-3","Compos\u00e9s Organiques Volatils NA - M16","Xyl\u00e8ne (tous les isom\u00e8res) 1330-20-7","Zinc (et ses compos\u00e9s) NA - 14","Acide chlorhydrique 7647-01-0","Sp\u00e9ciation des COV - Distillats de p\u00e9trole (fraction l\u00e9g\u00e8re hydrotrait\u00e9e) 64742-47-8","Sp\u00e9ciation des COV - Ether monobutylique de propyl\u00e8ne glycol 5131-66-8","Sp\u00e9ciation des COV - Fraction l\u00e9g\u00e8re du solvant naphta 64742-89-8","Sp\u00e9ciation des COV - Solvant naphta aliphatique, fraction m\u00e9diane 64742-88-7","Sp\u00e9ciation des COV - Solvant Stoddard 8052-41-3","Plomb (et ses compos\u00e9s) NA - 08","Cuivre (et ses compos\u00e9s) NA - 06","Chrome hexavalent (et ses compos\u00e9s) NA - 19","Acide sulfurique 7664-93-9","Formald\u00e9hyde 50-00-0","Sp\u00e9ciation des COV - Cyclohex\u00e8ne (tous les isom\u00e8res) NA - 26","Sp\u00e9ciation des COV - Huile min\u00e9rale blanche 8042-47-5","Ph\u00e9nol (et ses sels) (voir r\u00e9f\u00e9rence 45) 108-95-2","Mangan\u00e8se (et ses compos\u00e9s) NA - 09","Sp\u00e9ciation des COV - Alcool furfurylique 98-00-0","Cadmium (et ses compos\u00e9s) NA - 03","Sp\u00e9ciation des COV - Ac\u00e9tyl\u00e8ne 74-86-2","Sp\u00e9ciation des COV - Terp\u00e8nes (tous les isom\u00e8res) 68956-56-9","Sp\u00e9ciation des COV - D-Limon\u00e8ne 5989-27-5","Sp\u00e9ciation des COV - Naphta 8030-30-6","Biph\u00e9nyle 92-52-4","Aluminium (fum\u00e9e ou poussi\u00e8re) 7429-90-5","Sp\u00e9ciation des COV - Benz\u00e8ne 71-43-2","Sp\u00e9ciation des COV - Heptane (tous les isom\u00e8res) NA - 31","Sp\u00e9ciation des COV - T\u00e9trahydrofurane 109-99-9","Dioxines et Furanes NA - D/F","Hexachlorobenz\u00e8ne 118-74-1","Ether monohexylique d'\u00e9thyl\u00e8ne glycol 112-25-4","Sp\u00e9ciation des COV - Ether monohexylique d'\u00e9thyl\u00e8ne glycol 112-25-4","Arsenic (et ses compos\u00e9s) NA - 02","Cobalt (et ses compos\u00e9s) NA - 05","S\u00e9l\u00e9nium (et ses compos\u00e9s) NA - 12","Sp\u00e9ciation des COV - Butane (tous les isom\u00e8res) NA - 24","Sp\u00e9ciation des COV - Hexane (voir r\u00e9f\u00e9rence 98) NA - 32","Sp\u00e9ciation des COV - Hex\u00e8ne (tous les isom\u00e8res) 25264-93-1","Sp\u00e9ciation des COV - Pentane (tous les isom\u00e8res) NA - 35","Sp\u00e9ciation des COV - Propane 74-98-6","Cyanures (ioniques) NA - 07","Sp\u00e9ciation des COV - n-Hexane 110-54-3","Antimoine (et ses compos\u00e9s) NA - 01","Trichloro\u00e9thyl\u00e8ne 79-01-6","Acrylamide 79-06-1","Chlorure de benzyle 100-44-7","Mercure (et ses compos\u00e9s) NA - 10","Sp\u00e9ciation des COV - Styr\u00e8ne 100-42-5","Ac\u00e9naphtyl\u00e8ne 208-96-8","Benz\u00e8ne 71-43-2","Chlore 7782-50-5","Fluoranth\u00e8ne 206-44-0","Ph\u00e9nanthr\u00e8ne 85-01-8","Pyr\u00e8ne 129-00-0","Sp\u00e9ciation des COV - alpha-Pin\u00e8ne 80-56-8","Sp\u00e9ciation des COV - b\u00eata-Pin\u00e8ne 127-91-3","Ac\u00e9tald\u00e9hyde 75-07-0","Benzo(a)ph\u00e9nanthr\u00e8ne 218-01-9","Sp\u00e9ciation des COV - 1,2-Dichloro\u00e9thane 107-06-2","Sp\u00e9ciation des COV - Acide adipique 124-04-9","Ac\u00e9napht\u00e8ne 83-32-9","Anthrac\u00e8ne 120-12-7","Benzo(a)anthrac\u00e8ne 56-55-3","Benzo(a)pyr\u00e8ne 50-32-8","Benzo(b)fluoranth\u00e8ne 205-99-2","Benzo(e)pyr\u00e8ne 192-97-2","Benzo(g,h,i)p\u00e9ryl\u00e8ne 191-24-2","Benzo(k)fluoranth\u00e8ne 207-08-9","Dibenzo(a,h)acridine 226-36-8","Dibenzo(a,j)acridine 224-42-0","Dibenzo(a,h)anthrac\u00e8ne 53-70-3","Fluor\u00e8ne 86-73-7","Indeno(1,2,3-c,d)pyr\u00e8ne 193-39-5","Sp\u00e9ciation des COV - Ethyl\u00e8ne 74-85-1","Sp\u00e9ciation des COV - Propyl\u00e8ne 115-07-1","Vanadium (sauf sous forme d'alliage) et ses compos\u00e9s 7440-62-2","Sp\u00e9ciation des COV - 1,3-Butadi\u00e8ne 106-99-0","Sp\u00e9ciation des COV - Aniline (et ses sels) (voir r\u00e9f\u00e9rence 87) 62-53-3","Sp\u00e9ciation des COV - p-Dichlorobenz\u00e8ne 106-46-7","1,3-Butadi\u00e8ne 106-99-0","7H-Dibenzo(c,g)carbazole 194-59-2","Amiante (forme friable) 1332-21-4","Benzo(j)fluoranth\u00e8ne 205-82-3","Dibenzo(a,i)pyr\u00e8ne 189-55-9","P\u00e9ryl\u00e8ne 198-55-0","Argent (et ses compos\u00e9s) NA - 13","Sp\u00e9ciation des COV - Dim\u00e9thyl\u00e9ther 115-10-6","T\u00e9trachloro\u00e9thyl\u00e8ne 127-18-4","Tri\u00e9thylamine 121-44-8","Sp\u00e9ciation des COV - But\u00e8ne (tous les isom\u00e8res) 25167-67-3","Sp\u00e9ciation des COV - Cyclooctane (tous les isom\u00e8res) NA - 27","Sp\u00e9ciation des COV - D\u00e9cane (tous les isom\u00e8res) NA - 28","Sp\u00e9ciation des COV - Nonane (tous les isom\u00e8res) NA - 33","Sp\u00e9ciation des COV - Octane (tous les isom\u00e8res) NA - 34","Sp\u00e9ciation des COV - Pent\u00e8ne (tous les isom\u00e8res) NA - 36","7,12-Dim\u00e9thylbenzo(a)anthrac\u00e8ne 57-97-6","Sp\u00e9ciation des COV - b\u00eata-Phellandr\u00e8ne 555-10-2","Sp\u00e9ciation des COV - Anthraquinone (tous les isom\u00e8res) NA - 23","Oxyde d'\u00e9thyl\u00e8ne 75-21-8","p,p'-M\u00e9thyl\u00e8nebis(2-chloroaniline) 101-14-4","Sp\u00e9ciation des COV - Cr\u00e9osote 8001-58-9","Sp\u00e9ciation des COV - Chlorobenz\u00e8ne 108-90-7","Chlorure de benzoyle 98-88-4","Sp\u00e9ciation des COV - 2-M\u00e9thyl-3-hexanone 7379-12-6","Sp\u00e9ciation des COV - Cycloheptane (tous les isom\u00e8res) NA - 25","Sp\u00e9ciation des COV - Dihydronaphtal\u00e8ne (tous les isom\u00e8res) NA - 29","Sp\u00e9ciation des COV - M\u00e9thylindane (tous les isom\u00e8res) 27133-93-3","Sp\u00e9ciation des COV - Myrc\u00e8ne 123-35-3","Sp\u00e9ciation des COV - Isocyanate de ph\u00e9nyle 103-71-9","Sp\u00e9ciation des COV - Trim\u00e9thylfluorosilane 420-56-4","Sp\u00e9ciation des COV - Ac\u00e9tate de vinyle 108-05-4","Sp\u00e9ciation des COV - Dod\u00e9cane (tous les isom\u00e8res) NA - 30","Chlorure de vinyle 75-01-4","1,2-Dichloro\u00e9thane 107-06-2","Dibenzo(a,e)pyr\u00e8ne 192-65-4","Amiante (forme friable seulement) 1332-21-4","Aluminium (fum\u00e9e ou poussi\u00e8re seulement) 7429-90-5","Vanadium (et ses compos\u00e9s) 7440-62-2","Sp\u00e9ciation des COV - propane 74-98-6","Pentane (tous les isom\u00e8res) NA - 35"];
globalConfig = {};
globalConfig.language = "FR";

//globalConfig.tabsTemplateContent = "Installation: <b>{FacilityName}</b><br>Entreprise: <b>{OrganizationName}</b><br>Adresse: <b>{Address}</b><br>N&deg; INRP: <b>{mapConfig.displayNPRI_ID(NPRI_ID)}</b><br>Secteur: <b>{mapConfig.displaySector(Sector)}</b><br>Substances toxiques: <b>{NUMsubst}</b><br><br><a target='_blank' href='TRAIS_Report.htm?id={ID}'>Lien aux rapports annuels</a><br><i>Ce lien s'ouvre dans une nouvelle fen\u00eatre.</i><br>";

//globalConfig.tabsTemplateContent = "Installation: <b>{FacilityName}</b><br>Entreprise: <b>{OrganizationName}</b><br>Adresse: <b>{Address}</b><br>N&deg; INRP: <b>{mapConfig.displayNPRI_ID(NPRI_ID)}</b><br>Secteur: <b>{mapConfig.displaySector(Sector)}</b><br>Substances toxiques: <b>{NUMsubst}</b><br><br><a target='_blank' href='fr_trais_report?id={ID}'>Lien aux rapports annuels</a><br><i>Ce lien s'ouvre dans une nouvelle fen\u00eatre.</i><br>";
globalConfig.otherInfoHTML = "Certaines donn\u00e9es scientifiques et de surveillance n\u0027existent qu\u0027en anglais."; 
/*
globalConfig.searchControlHTML = '<table width="100%" cellpadding="5" cellspacing="0" border="0" style="margin-bottom:15px;" summary="Recherche dans la carte interactive">\
			<caption style="text-align:left;">Recherche carte interactive</caption>\
			<tr>\
				<th scope="col"></th>\
				<th scope="col"></th>\
			</tr>\
			<tr>\
				<td valign="top" width="450px">\
					<input id="map_query" type="text" size="50" onkeypress="return globalConfig.entsub(event)" maxlength="100" title="Terme"></input>&nbsp;<input type="submit" onclick="globalConfig.search()" value="Recherche" title="Recherche"></input>\
					<div id="information" style="margin-top:10px;">Rechercher par <strong>ville</strong>, <strong>installation</strong>, <strong>entreprise</strong>, <strong>substance</strong>, <strong>secteur</strong> ou cliquer sur aide pour plus d\u0027information sur la recherche avanc\u00e9e.</div>\
				</td>\
				<td valign="top">\
					<input id="searchLocation" type="radio" name="searchGroup" value="location" checked="checked" onclick="mapConfig.searchChange(\'Location\')" title="Search Map Location or Facility"><span title="Recherche par lieu ou par installation : entrez le nom de l\u0027installation ou son adresse." class="tooltip">Recherche par lieu ou installation</span><br />\
					<input id="searchSubstance" type="radio" name="searchGroup" value="substance" onclick="mapConfig.searchChange(\'Substance\')" title="Search Substance"><span title="Recherche par substance : entrez le nom de la substance pour trouver les installations avec cette substance" class="tooltip">Recherche par substance</span><br />\
					<input id="searchSector" type="radio" name="searchGroup" value="sector" onclick="mapConfig.searchChange(\'Sector\')" title="Search Sector"><span title="Recherche par secteur : entrez le nom d\u0027un secteur pour trouver les installations dans ce secteur" class="tooltip">Recherche par secteur</span><br />\
					<input id="currentMapExtent" type="checkbox" name="currentExtent" title="\u00c9tendue de la carte courante"><span title="\u00c9tendue de la carte courante : ceci limite la recherche \u00e0 l\u0027\u00e9tendue de la carte courante seulement" class="tooltip">\u00c9tendue de la carte courante</span>\
				</td>\
			</tr>\
		</table>';
*/