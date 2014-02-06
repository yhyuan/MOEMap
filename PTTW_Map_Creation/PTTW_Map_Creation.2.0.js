//http://blog.mridey.com/2009/09/label-overlay-example-for-google-maps.html
// Define the overlay, derived from google.maps.OverlayView
function Label(opt_options) {
 // Initialization
 this.setValues(opt_options);

 // Label specific
 var span = this.span_ = document.createElement('span');
 span.style.cssText = 'position: relative; left: -50%; top: -8px; ' +
                      'white-space: nowrap; border: 1px solid blue; ' +
                      'padding: 2px; background-color: white';

 var div = this.div_ = document.createElement('div');
 div.appendChild(span);
 div.style.cssText = 'position: absolute; display: none';
};
Label.prototype = new google.maps.OverlayView;

// Implement onAdd
Label.prototype.onAdd = function() {
 var pane = this.getPanes().overlayLayer;
 pane.appendChild(this.div_);

 // Ensures the label is redrawn if the text or position is changed.
 var me = this;
 this.listeners_ = [
   google.maps.event.addListener(this, 'position_changed',
       function() { me.draw(); }),
   google.maps.event.addListener(this, 'text_changed',
       function() { me.draw(); })
 ];
};

// Implement onRemove
Label.prototype.onRemove = function() {
 this.div_.parentNode.removeChild(this.div_);

 // Label is removed from the map, stop updating its position/text.
 for (var i = 0, I = this.listeners_.length; i < I; ++i) {
   google.maps.event.removeListener(this.listeners_[i]);
 }
};

// Implement draw
Label.prototype.draw = function() {
 var projection = this.getProjection();
 var position = projection.fromLatLngToDivPixel(this.get('position'));

 var div = this.div_;
 div.style.left = position.x + 'px';
 div.style.top = position.y + 'px';
 div.style.display = 'block';

 this.span_.innerHTML = this.get('text').toString();
};


var isMobile = false;
var MOEMapGlobalConfig = {
	centerPolygon: {lat: 51.253775, lng: -85.32321389999998},
    boundaryPolygon: [{	
        x: -95.29920350,
        y: 48.77505703
    }, {
        x: -95.29920350,
        y: 53.07150598
    }, {
        x: -89.02502409,
        y: 56.95876930
    }, {
        x: -87.42238044,
        y: 56.34499088
    }, {
        x: -86.36531760,
        y: 55.93580527
    }, {
        x: -84.69447635,
        y: 55.45842206
    }, {
        x: -81.89837466,
        y: 55.35612565
    }, {
        x: -81.96657226,
        y: 53.17380238
    }, {
        x: -80.84131182,
        y: 52.28723355
    }, {
        x: -79.98884179,
        y: 51.80985033
    }, {
        x: -79.34096457,
        y: 51.74165273
    }, {
        x: -79.34096457,
        y: 47.54750019
    }, {
        x: -78.55669214,
        y: 46.49043736
    }, {
        x: -76.61306048,
        y: 46.14944935
    }, {
        x: -75.59009645,
        y: 45.77436253
    }, {
        x: -74.12384800,
        y: 45.91075774
    }, {
        x: -73.98745279,
        y: 45.02418891
    }, {
        x: -75.07861443,
        y: 44.61500329
    }, {
        x: -75.86288685,
        y: 44.03532368
    }, {
        x: -76.88585089,
        y: 43.69433566
    }, {
        x: -79.20,
        y: 43.450196
    }, {
        x: -78.62488975,
        y: 42.94416204
    }, {
        x: -79.54555738,
        y: 42.43268002
    }, {
        x: -81.28459623,
        y: 42.15988961
    }, {
        x: -82.54625188,
        y: 41.58020999
    }, {
        x: -83.26232670,
        y: 41.95529681
    }, {
        x: -83.36462310,
        y: 42.43268002
    }, {
        x: -82.61444948,
        y: 42.73956923
    }, {
        x: -82.17116506,
        y: 43.59203926
    }, {
        x: -82.61444948,
        y: 45.36517692
    }, {
        x: -84.08069793,
        y: 45.91075774
    }, {
        x: -84.93316796,
        y: 46.69503016
    }, {
        x: -88.27485047,
        y: 48.22947621
    }, {
        x: -89.33191330,
        y: 47.78619180
    }, {
        x: -90.32077854,
        y: 47.68389540
    }, {
        x: -92.09391619,
        y: 47.95668581
    }, {
        x: -94.07164666,
        y: 48.33177262
    }, {
        x: -95.29920350,
        y: 48.77505703
    }],
	GeogTwpService: "http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/sportfishservice/MapServer",
	geogTwpLayerId: 0,
	lotConLayerId: 1,	
	MunicipalityService: "http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/waste/MapServer",
	MunicipalityDistrictLayerId: 0,
	MunicipalitySingleLowTierLayerId: 1,
	MunicipalityUpperTierLayerId: 2,
	MOERegionService: "http://www.appliomaps.lrc.gov.on.ca/ArcGIS/rest/services/MOE/permitstotakewater/MapServer",	
	moeRegionLayerId: 4,	
	geoNameLayerId: 0,
	streamNetworkLayerId: 1,
	watershedServiceLayerId: 2,	
	NECPlanBoundaryLayerId: 3,
	ORMPlaningAreaLayerId: 5,			
    maxQueryReturn: 500,
    predefinedLevel: 11
};


mapConfig = (function () {	
	var orgLatitude = 49.764775;
	var orgLongitude = -85.323214;
	var orgzoomLevel = 5;
	var minMapScale = 5;
	var maxMapScale = 21;
	var searchZoomLevel = 15; //1:9000
	var townshipZoomLevel = 10;
	var searchTownshipZoomLevel = 12;
	var streamNetworkZoomLevel = 15;
    var coor_Status = true;
    var language = MOE_map_language;
	var identifying = false;
	//var inputSouceName = false;
	
    var withinExtent = false;
    var address = "";	
	var lotVisible = false;
	var dispalyTWPLotCon = false;
	var townshipList = ["","Abbey","Abbotsford","Abbott","Aberdeen","Aberdeen Additional","Abigo","Abinger","Abney","Abotossaway","Abraham","Abrey","Acadia","Acheson","Acres","Acton","Adair","Adams","Adamson","Adanac","Addison","Adelaide","Adjala","Admaston","Admiral","Adolphustown","Adrian","Afton","Agassiz","Agate","Agnew","Aguonie","Airy","Aitken","Alanen","Alarie","Albanel","Albemarle","Albion","Alcona","Alcorn","Aldborough","Alderson","Aldina","Alexandra","Alfred","Algona","Alice","Allan","Allen","Allenby","Allouez","Alma","Alnwick","Alpha","Alton","Amabel","Amaranth","Ameliasburgh","Amery","Ames","Amherst Island","Amik","Amundsen","Amyot","Ancaster","Anderdon","Anderson","Andre","Anglesea","Anglin","Angus","Anson","Anstruther","Antoine","Antrim","Appleby","Arbutus","Archibald","Ardagh","Arden","Argyle","Armagh","Armour","Armstrong","Arnold","Arnott","Arran","Artemesia","Arthur","Ashby","Ashfield","Ashley","Ashmore","Askin","Asmussen","Asphodel","Asquith","Assad","Assef","Asselin","Assiginack","Aston","Athlone","Atikameg","Atkinson","Attlee","Atwood","Aubin","Aubrey","Auden","Augusta","Auld","Aurora","Avery","Avis","Avon","Awenge","Aweres","Awrey","Aylmer","Aylsworth","Baden","Bader","Badgerow","Bagot","Bailloquet","Bain","Baird","Baker","Baldwin","Balfour","Ball","Ballantyne","Balmer","Baltic","Bangor","Banks","Bannerman","Bannockburn","Banting","Barager","Barbara","Barber","Barclay","Barker","Barlow","Barnes","Barnet","Barr","Barrett","Barrie","Barrie Island","Barron","Bartlett","Barton","Barwick","Bastard","Bastedo","Bateman","Bathurst","Battersby","Baxter","Bayfield","Bayham","Bayly","Baynes","Bazett","Beange","Beardmore","Beaton","Beatty","Beaucage","Beauchamp","Beaudin","Beaudry","Beaumont","Beauparlant","Beck","Beckett","Beckwith","Bedford","Beebe","Beemer","Begin","Behmann","Beilhartz","Belanger","Belfast","Belford","Bell","Belmont","Ben Nevis","Benedickson","Beniah","Benner","Bennett","Benneweis","Benoit","Bentinck","Benton","Beresford","Bernhardt","Bernier","Bernst","Berry","Bertie","Bertram","Bertrand","Bessborough","Best","Bethune","Beulah","Beverly","Bevin","Bexley","Bickle","Bicknell","Biddulph","Bidwell","Bigelow","Biggar","Biggs","Bigwood","Billings","Binbrook","Birch","Bird","Birdsall","Birkett","Biscotasi","Bishop","Bisley","Black","Blackburn","Blackstock","Blackwell","Blain","Blair","Blake","Blakelock","Blamey","Blandford","Blanshard","Blenheim","Blewett","Blezard","Bliss","Blithfield","Blount","Blue","Blyth","Bolger","Bomby","Bompas","Bonar","Bond","Bonfield","Bonis","Boon","Booth","Bordeleau","Borden","Bosanquet","Boston","Bostwick","Botha","Boucher","Bouck","Boulter","Bounsall","Bourassa","Bourinot","Bowell","Bower","Bowerman","Bowman","Bowyer","Boyce","Boyd","Boyle","Boys","Bracci","Brackin","Bradburn","Bradette","Bradley","Bradshaw","Bragg","Brain","Braithwaite","Brant","Brantford","Bray","Breadner","Brebeuf","Breckenridge","Breithaupt","Brethour","Brewster","Bridges","Bridgland","Briggs","Bright","Bright Additional","Brigstocke","Brimacombe","Bristol","Britton","Brock","Broder","Broderick","Bromley","Bronson","Brooke","Broome","Brothers","Brougham","Broughton","Brower","Brown","Browning","Brownridge","Bruce","Brudenell","Brule","Brunel","Brunswick","Bruton","Brutus","Bruyere","Bryant","Bryce","Buchan","Buchanan","Bucke","Buckland","Buckles","Bullbrook","Buller","Bullock","Bulmer","Burford","Burgess","Burk","Burleigh","Burnaby","Burns","Burpee","Burr","Burrell","Burriss","Burritt","Burrows","Burstall","Burt","Burton","Burwash","Busby","Butcher","Butler","Butt","Byers","Byng","Byron","Byshe","Cabot","Cadeau","Caen","Cairo","Caistor","Caithness","Calais","Calder","Caldwell","Caledon","Caledonia","Calvert","Calvin","Cambridge","Camden","Camden East","Cameron","Campbell","Canborough","Cane","Canfield","Canisbay","Cannard","Canton","Caouette","Capreol","Caradoc","Carden","Cardiff","Cardwell","Carew","Cargill","Carling","Carlow","Carlyle","Carman","Carmichael","Carmody","Carnarvon","Carnegie","Carney","Caron","Carpenter","Carr","Carrick","Carroll","Carruthers","Carscallen","Carss","Carter","Cartier","Carton","Cartwright","Carty","Cascaden","Case","Casey","Casgrain","Cashel","Casimir","Casselman","Cassels","Cassidy","Casson","Catharine","Cathcart","Cavan","Cavana","Cavell","Cavendish","Caverley","Cayuga","Cecil","Cecile","Ceylon","Chabanel","Chaffey","Chalet","Challener","Challies","Chamberlain","Chambers","Champagne","Champlain","Chandos","Chapais","Chapleau","Chaplin","Chapman","Chappise","Charbonneau","Charlottenburgh","Charlotteville","Charlton","Charters","Chartrand","Chatham","Chelsea","Chenard","Cherriman","Chesley","Chesley Additional","Chester","Chevrier","Chewett","Childerhose","Chinguacousy","Chipman","Chisholm","Cholette","Chown","Christie","Church","Churchill","Clancy","Clara","Clarence","Clarendon","Clarke","Clarkson","Clary","Clavet","Claxton","Clay","Cleaver","Cleland","Clement","Clergue","Clifford","Clifton","Clinton","Clive","Clouston","Clute","Clyde","Cobden","Cochrane","Cockburn Island","Cockeram","Cockshutt","Code","Coderre","Cody","Colborne","Colchester","Coldwell","Cole","Coleman","Colenso","Collingwood","Collins","Collishaw","Colliver","Colquhoun","Colter","Coltham","Commanda","Common","Comox","Conacher","Conant","Concobar","Conger","Conking","Conmee","Connaught","Connell","Cook","Cooper","Copenace","Coppell","Copperfield","Corbiere","Corboy","Corkill","Corless","Corley","Corman","Cornwall","Corrigal","Cortez","Cosby","Cosens","Costello","Cote","Cotte","Cotton","Coulson","Cowie","Cowper","Cox","Coyle","Craig","Cramahe","Crawford","Creelman","Creighton-Davies","Crepieul","Crerar","Crockett","Croft","Croll","Cromlech","Crooks","Croome","Cross","Crothers","Crowland","Crozier","Cudney","Cull","Culross","Cumberland","Cumming","Cunningham","Curran","Currie","Curtin","Curtis","Cuthbertson","Cynthia","D Arcy","D Avaugour","Dablon","Dack","Dagle","Dahl","Dale","Daley","Dalhousie","Dalmas","Dalton","Dambrossio","Dana","Dance","Dane","Danford","Daniel","Daoust","Dargavel","Darling","Darlington","Daumont","Davidson","Davieaux","Davies","Davin","Davis","Dawn","Dawson","Dawson Road Lots","Day","De Gaulle","Deacon","Deagle","Deans","Debassige","Del Villano","Delamere","Delaney","Delaware","Delhi","Delmage","Deloro","Demorest","Dempsay","Denbigh","Denison","Dennie","Dennis","Dent","Denton","Denyes","Depencier","Derby","Dereham","Deroche","Derry","Desbiens","Desmond","Desrosiers","Devine","Devitt","Devlin","Devon","Devonshire","Dewan","Dewart","Dickens","Dickson","Dieppe","Digby","Dilke","Dill","Dobie","Docker","Doherty","Dokis","Dolson","Dome","Donovan","Doon","Dorchester","Dore","Dorion","Dorothea","Doucett","Douglas","Douro","Dover","Dowling","Downer","Downie","Dowsley","Doyle","Draper","Drayton","Drea","Drew","Drope","Druillettes","Drummond","Drury","Dryden","Dublin","Duckworth","Dudley","Duff","Dufferin","Dukszta","Dulhut","Dumas","Dumfries","Dummer","Dunbar","Duncan","Dundee","Dundonald","Dungannon","Dunlop","Dunmore","Dunn","Dunnet","Dunphy","Dunsmore","Dunwich","Dupuis","Durban","Dye","Dyer","Dymond","Dysart","Eaket","Earl","Earngey","East Burpee","East Flamborough","East Gwillimbury","East Hawkesbury","East Mills","Eastnor","Eaton","Ebbitt","Ebbs","Eby","Ecclestone","Echo","Echum","Eddy","Eden","Edgar","Edighoffer","Edinburgh","Edith","Edwards","Edwardsburgh","Effingham","Egan","Egremont","Eilber","Eisenhower","Ekfrid","Elderslie","Eldon","Eldorado","Eldridge","Elgie","Elizabeth","Elizabethtown","Ellice","Elliott","Ellis","Elma","Elmhirst","Elmsley","Elzevir","Emerald","Emerson","Emily","Emiry","Emo","English","Engstrom","Enid","Enniskillen","Ennismore","Eramosa","Eric","Ericson","Erin","Ermatinger","Ermine","Ernestown","Errington","Escott","Esnagami","Esquega","Esquesing","Essa","Esten","Esther","Ethel","Eton","Euphrasia","Eva","Evans","Evanturel","Evelyn","Ewart","Ewen","Exton","Eyre","Fabbro","Factor","Fairbairn","Fairbank","Fairlie","Falconbridge","Falconer","Fallis","Fallon","Faraday","Farquhar","Farr","Farrington","Fasken","Fauquier","Faust","Fauteux","Fawcett","Fawn","Fell","Fenelon","Fenton","Fenwick","Fergus","Ferguson","Fernow","Ferrie","Ferrier","Ferris","Fiddler","Field","Finan","Finch","Findlay","Fingal","Finlayson","Fintry","Firstbrook","Fisher","Fitzgerald","Fitzroy","Fitzsimmons","Flanders","Flavelle","Fleck","Fleming","Fletcher","Flett","Flood","Floranna","Flos","Foch","Foley","Foleyet","Fontaine","Foote","Forbes","Ford","Forgie","Fortune","Foster","Foucault","Foulds","Fournier","Fowler","Fox","Foy","Fraleck","Fraleigh","Frances","Franchere","Franklin","Franz","Fraser","Frater","Frechette","Frecheville","Fredericksburgh","Freeborn","Freele","Freeman","French","Freswick","Frey","Fripp","Frost","Fryatt","Fulford","Fullarton","Fulton","Furlonge","Furniss","Fushimi","Gaby","Gaiashk","Gainsborough","Galbraith","Gallagher","Galna","Galway","Gamble","Gamey","Ganong","Gapp","Garafraxa","Garden","Gardhouse","Gardiner","Garibaldi","Garnet","Garrison","Garrow","Garson","Garvey","Gaudette","Gaudry","Gaunt","Gauthier","Geary","Geikie","Gemmell","Genier","Genoa","Gentles","Georgina","German","Gerow","Gertrude","Gervais","Gibbard","Gibbons","Gibson","Gidley","Gilbert","Gilbertson","Giles","Gill","Gillies","Gillies Limit","Gilliland","Gillmor","Gisborn","Glackmeyer","Gladman","Gladstone","Gladwin","Glamorgan","Glanford","Glasgow","Glass","Glen","Glenelg","Gloucester","Goderich","Godfrey","Godson","Goldie","Golding","Goldwin","Goodall","Gooderham","Goodfellow","Goodwillie","Goodwin","Gordon","Gorham","Goschen","Gosfield","Gough","Gouin","Goulbourn","Gould","Goulet","Gour","Gourlay","Gowan","Graham","Grain","Grant","Grantham","Grasett","Grattan","Graves","Graydon","Green","Greenlaw","Greenock","Greenwood","Greer","Grenfell","Grenoble","Grenville","Grey","Griesinger","Griffin","Griffith","Grigg","Grimsby","Grimsthorpe","Grootenboer","Groseilliers","Gross","Grossman","Groves","Grummett","Grzela","Gtp Block 1","Gtp Block 10","Gtp Block 2","Gtp Block 3","Gtp Block 4","Gtp Block 5","Gtp Block 6","Gtp Block 7","Gtp Block 8","Gtp Block 9","Guelph","Guibord","Guilford","Guilfoyle","Guindon","Gundy","Gunterman","Gurd","Gurney","Guthrie","Gzowski","Habel","Haddo","Hadley","Haentschel","Hagar","Hagarty","Hagerman","Hagey","Haggart","Haig","Haight","Haines","Halcrow","Haldimand","Halifax","Halkirk","Hall","Hallam","Hallett","Halliday","Hallowell","Halsey","Hambleton","Hambly","Hamilton","Hamlet","Hammell","Hammond","Hancock","Handleman","Haney","Hanlan","Hanmer","Hanna","Hanniwell","Hansen","Harburn","Harcourt","Hardiman","Hardwick","Hardy","Harewood","Harker","Harley","Harmon","Harris","Harrison","Harrow","Hart","Hartington","Hartle","Hartman","Harty","Harvey","Harwich","Hassard","Haughton","Haultain","Havelock","Havilland","Havrot","Hawkins","Hawley","Hay","Haycock","Hayward","Hazen","Head","Hearst","Heath","Heathcote","Hebert","Hecla","Heenan","Heighington","Hele","Hellyer","Hembruff","Henderson","Hendrie","Henley","Hennessy","Henry","Henvey","Henwood","Hepburn","Herbert","Herrick","Herschel","Hess","Heyson","Hiawatha","Hibbert","Hicks","Hill","Hillary","Hilliard","Hillmer","Himsworth","Hinchinbrooke","Hincks","Hindon","Hipel","Hislop","Hobbs","Hoblitzell","Hobson","Hodgetts","Hodgins","Hodgson","Hoey","Hoffman","Hogarth","Hogg","Holland","Hollinger","Holloway","Holmes","Home","Homer","Homuth","Honeywell","Hong Kong","Hook","Hope","Hopkins","Horden","Horne","Hornell","Horton","Horwood","Hoskin","Hotte","Houck","Houghton","Howard","Howe Island","Howells","Howey","Howick","Howland","Hoyle","Hubbard","Hudson","Huffman","Hugel","Hughes","Hughson","Hullett","Humberstone","Humboldt","Humphrey","Hungerford","Hunt","Hunter","Huntingdon","Huntley","Huotari","Hurdman","Hurlburt","Huron","Hurtubise","Hutcheon","Hutchinson","Hutt","Hutton","Hyman","Hyndman","Hynes","Idington","Ignace","Ilsley","Inglis","Ingram","Innes","Innisfil","Invergarry","Inverness","Inwood","Ireland","Iris","Irish","Irving","Irwin","Isaac","Ivanhoe","Ivy","Jack","Jackman","Jackson","Jacobson","Jacques","Jaffray","James","Jamieson","Janes","Jarvis","Jasper","Jean","Jeffries","Jennings","Jessiman","Jessop","Joan","Jocko","Joffre","Jogues","Johns","Johnson","Jollineau","Joly","Jones","Jordan","Joubin","Joynt","Juillette","Jutten","Kaladar","Kalen","Kamichisitit","Kane","Kaplan","Kapuskasing","Kars","Katrine","Keating","Keating Additional","Keefer","Keesickquayash","Kehoe","Keith","Kelly","Kelsey","Kelso","Kelvin","Kemp","Kendall","Kendrey","Kennebec","Kennedy","Kenning","Kenny","Kenogaming","Kenyon","Keppel","Kerns","Kerrs","Kidd","Kildare","Kilkenny","Killala","Killarney","Killins","Killraine","Kilmer","Kilpatrick","Kimberley","Kincaid","Kincardine","Kineras","King","Kingsford","Kingsmill","Kingston","Kinloss","Kipling","Kirby","Kirkland","Kirkpatrick","Kirkup","Kirkwall","Kirkwood","Kitchener","Kitley","Kitto","Kittson","Klock","Klotz","Knicely","Knight","Knott","Knowles","Knox","Kohler","Korah","Kosny","Kowkash","La Salle","Labelle","Laberge","Labonte","Lackner","Ladysmith","Lafleche","Laforme","Lahontan","Laidlaw","Laird","Lake","Lalibert","Lamarche","Lambert","Lamming","Lamplugh","Lampman","Lamport","Lanark","Lancaster","Landriault","Landry","Lane","Lang","Langemarck","Langlois","Langmuir","Langton","Langworthy","Lansdowne","Lapierre","Larkin","Laronde","Larson","Lascelles","Lash","Lastheels","Latchford","Lauder","Laughren","Laughton","Laura","Laurie","Laurier","Laval","Lavant","Laverendrye","Law","Lawlor","Lawrence","Lawson","Laxton","Le May","Le Roche","Leask","Lebel","Lecaron","Leckie","Leclaire","Lecours","Ledger","Leduc","Lee","Leeds","Leeson","Lefebvre","Lefroy","Legarde","Legarde Additional","Legault","Legge","Leguerrier","Lehman","Leinster","Leitch","Leith","Leluk","Lemoine","Lendrum","Lennox","Leo","Leonard","Lerwick","Leslie","Lessard","Lett","Levack","Levesque","Lewers","Lewis","Ley","Lillie","Limerick","Lincoln","Lindsay","Lindsley","Lipsett","Lipton","Lisgar","Lismore","Lister","Little","Livingstone","Lizar","Lloyd","Loach","Lobo","Lochiel","Lockeyer","Lockhart","Logan","Lomond","London","Londonderry","Long","Longford","Longueuil","Lorne","Lorrain","Loudon","Loughborough","Lougheed","Loughrin","Louise","Lount","Louth","Loveland","Low","Lowther","Lucas","Lumsden","Lundy","Lunkie","Luther","Lutterworth","Lybster","Lyell","Lyman","Lynch","Lyndoch","Lyon","Mabee","Macaskill","Macaulay","Macbeth","Macdiarmid","Macdonald","Macfie","Macgregor","Machar","Machin","Mack","Mackelcan","Macklem","Maclennan","Macmurchy","Macnicol","Macpherson","Macquarrie","Macvicar","Madoc","Maeck","Mafeking","Mageau","Magladery","Magone","Mahaffy","Maher","Mahoney","Maidstone","Maisonville","Makawa","Malachi","Malahide","Malden","Mallard","Mandamin","Maness","Manion","Mann","Manning","Manross","Manvers","Mapledoram","Mara","Marathon","Marceau","March","Marconi","Margaret","Maria","Marion","Mariposa","Marjorie","Markham","Marks","Marlborough","Marmora","Marne","Marquette","Marquis","Marriott","Marsh","Marshall","Marshay","Martel","Marter","Martin","Martland","Marven","Maryborough","Marysburgh","Mason","Massey","Master","Matawatchan","Matchedash","Mather","Matheson","Mathieu","Matilda","Mattagami","Mattawan","Matthews","Maude","Maund","May","Mayo","Mcallister","Mcalpine","Mcaree","Mcarthur","Mcaughey","Mcauslan","Mcbride","Mcbrien","Mccallum","Mccann","Mccart","Mccarthy","Mccaul","Mccausland","Mcclintock","Mcclure","Mccoig","Mccomber","Mcconkey","Mcconnell","Mccool","Mccowan","Mccoy","Mccraney","Mccrea","Mccron","Mccrosson","Mccuaig","Mccubbin","Mccullagh","Mcdonough","Mcdougall","Mcdowell","Mcelroy","Mcevay","Mcewing","Mcfadden","Mcfarlan","Mcgarry","Mcgee","Mcgeorge","Mcgiffin","Mcgill","Mcgillis","Mcgillivray","Mcgiverin","Mcgowan","Mcilraith","Mcilveen","Mcintyre","Mcirvine","Mcivor","Mckay","Mckellar","Mckelvie","Mckenzie","Mckeough","Mckeown","Mckillop","Mckim","Mckinnon","Mcknight","Mclaren","Mclarty","Mclaughlin","Mclaurin","Mclean","Mcleister","Mcleod","Mcmahon","Mcmaster","Mcmeekin","Mcmillan","Mcmurray","Mcmurrich","Mcnab","Mcnamara","Mcnaught","Mcnaughton","Mcneil","Mcnevin","Mcnie","Mcnish","Mcowen","Mcparland","Mcphail","Mcquesten","Mcquibban","Mctavish","Mcvittie","Mcwilliams","Meader","Meath","Medina","Medonte","Medora","Meen","Meinzinger","Melancthon","Melba","Melgund","Melick","Melrose","Memaskwosh","Menapia","Menard","Menary","Menzies","Mercer","Meredith","Merrick","Merritt","Mersea","Methuen","Mewhinney","Michano","Michaud","Michener","Michie","Mickle","Middleboro","Middleton","Midlothian","Mikano","Mildred","Miller","Milligan","Mills","Milne","Milner","Minden","Minnipuka","Minto","Miramichi","Miscampbell","Miskokomon","Missinaibi","Mitchell","Moberly","Moen","Moffat","Moggy","Moher","Monaghan","Monck","Moncrieff","Mond","Monestime","Mongowin","Monmouth","Mono","Mons","Montague","Montcalm","Monteagle","Monteith","Montgomery","Montrose","Moody","Moore","Moorehouse","Moose","Morel","Morgan","Morin","Morley","Morley Additional","Morningstar","Mornington","Morris","Morrisette","Morrison","Morrow","Morse","Morson","Mortimer","Mosa","Mosambik","Moses","Moss","Moulton","Mountain","Mountbatten","Mountjoy","Mowat","Mowbray","Mulcahy","Muldrew","Mulholland","Mulligan","Mulloy","Mulmur","Mulock","Mulvey","Munro","Munster","Murchison","Murdock","Murphy","Murray","Musgrove","Muskego","Muskoka","Musquash","Mutrie","Nadjiwon","Nagagami","Nahwegezhic","Nairn","Nakina","Nameigos","Nansen","Nassagaweya","Nassau","Natal","Naveau","Nebonaionquet","Nebotik","Neebing","Neelands","Neelon","Neely","Neill","Nelles","Nelson","Nepean","Nesbitt","Nettleton","Neville","Newlands","Newman","Newmarket","Newton","Niagara","Nichol","Nicholas","Nickle","Nicol","Nicolet","Nightingale","Nimitz","Nipigon","Nipissing","Nissouri","Niven","Nixon","Noble","Noganosh","Norberg","Nordica","Norman","Normanby","North Algona","North Canonto","North Crosby","North Easthope","North Gower","North Gwillimbury","North Sherbrooke","North Williams","Northrup","Norwich","Noseworthy","Notman","Nottawasaga","Nouvel","Nova","Noyon","Nursey","Nuttall","O Brien","O Connor","O Meara","O Neill","Oakes","Oakland","Oakley","Oates","Oboshkegan","Odlum","Ogden","Ogilvie","Oke","Olden","Olinyk","Olive","Oliver","Olrig","Olsen","Onaping","Oneida","Onondaga","Opasatika","Ophir","Ops","Orford","Orillia","Orkney","Oro","Osaquan","Osborne","Oscar","Osgoode","Oshell","Osler","Osnabruck","Oso","Osprey","Ossian","Ossin","Oswald","Osway","Otonabee","Ottaway","Otter","Otto","Ouellette","Owens","Oxford On Rideau","Oxford On Thames","Pacaud","Paipoonge","Pakenham","Palmer","Palmerston","Panet","Papineau","Pardee","Pardo","Parent","Parke","Parker","Parkin","Parkinson","Parkman","Parliament","Parnell","Parr","Parrott","Parry","Patenaude","Patience","Patrick","Patterson","Pattinson","Patton","Pattullo","Paudash","Paul","Pawis","Paxton","Pearce","Pearkes","Pearson","Peck","Pedley","Peel","Peever","Pelham","Pelican","Pellatt","Pelletier","Pembroke","Penhorwood","Pennefather","Pense","Pentland","Percy","Perry","Petawawa","Peters","Peterson","Pettypiece","Pharand","Phelps","Phillips","Phyllis","Pic","Piche","Pickerel","Pickering","Pickett","Pifher","Pilkington","Pinard","Pine","Pinogami","Pitt","Pittsburg","Plantagenet","Playfair","Pliny","Plourde","Plummer","Plummer Additional","Plympton","Poisson","Poitras","Poncet","Ponsford","Pontiac","Porter","Portland","Potier","Potter","Potts","Poulett","Poulin","Powell","Pratt","Prescott","Preston","Price","Prince","Pringle","Priske","Proctor","Prosser","Proton","Proudfoot","Purdom","Purvis","Puskuta","Puslinch","Pyne","Pyramid","Quill","Raaflaub","Rabazo","Racine","Radcliffe","Radisson","Raglan","Raimbault","Rainham","Raleigh","Rama","Ramsay","Ramsay Wright","Ramsden","Rand","Raney","Ranger","Rankin","Rapley","Rathbun","Ratter","Rattray","Raven","Rawdon","Ray","Raymond","Raynar","Rayside","Reach","Reaney","Reaume","Recollet","Redden","Redditt","Redsky","Redvers","Reeves","Regan","Reid","Reilly","Rennie","Renwick","Restoule","Revell","Reynolds","Rhodes","Rice","Richards","Richardson","Richmond","Rickaby","Rickard","Riddell","Ridout","Riggs","Rioux","Ritchie","Rix","Roadhouse","Robb","Robbins","Roberta","Roberts","Robertson","Robillard","Robinson","Roblin","Robson","Roche","Rochester","Roddick","Roebuck","Rogers","Rollins","Rollo","Rolph","Romney","Roosevelt","Root","Rorke","Rose","Roseberry","Ross","Rowat","Rowe","Rowell","Rowlandson","Roxborough","Roy","Royal","Rudd","Rugby","Runnalls","Running","Rupert","Russell","Ruston","Rutherford","Ryan","Ryde","Ryerson","Rykert","Sabine","Sackville","Sadler","Sagard","Sale","Salsberg","Salter","Saltfleet","Sampson","Sanborn","Sanderson","Sandfield","Sandra","Sandwich","Sandy","Sanford","Sangster","Sankey","Sarawak","Sargeant","Sarnia","Satterly","Saugeen","Saunders","Savanne","Savant","Savard","Sayer","Scadding","Scapa","Scarfe","Schembri","Scholes","Scholfield","Schwenger","Scoble","Scollard","Scotia","Scott","Scovil","Scriven","Scrivener","Seagram","Seaton","Sebastopol","Secord","Seguin","Selby","Selkirk","Selwyn","Semple","Seneca","Senn","Servos","Sewell","Seymour","Shabotik","Shackleton","Shakespeare","Shanly","Shannon","Sharpe","Shaver","Shaw","Shawanaga","Shawkence","Sheard","Shearer","Sheba","Shedden","Sheffield","Sheguiandah","Shelburne","Sheldon","Shelley","Shenango","Shenston","Sheppard","Sheraton","Sherborne","Sherbrooke","Sherlock","Sherratt","Sherring","Sherwood","Shetland","Shibananing","Shields","Shillington","Shingwaukonce","Shipley","Shuel","Shulman","Sibley","Sidney","Sifton","Silk","Simons","Simpson","Sinclair","Singapore","Singer","Sisk","Skead","Skey","Skinner","Slack","Sladen","Slaght","Slater","Slievert","Smellie","Smilsky","Smith","Smuts","Smye","Smyth","Snider","Snow","Snowdon","Solski","Sombra","Somerville","Somme","Soper","Sophiasburgh","Sothman","South Canonto","South Crosby","South Easthope","South Gower","South Lorrain","South Sherbrooke","Southwold","Southworth","Specht","Speight","Spence","Spohn","Spooner","Spragge","Springer","Sproule","St  Vincent","St Edmunds","St Germain","St John","St Joseph","St Julien","St Laurent","St Louis","Stafford","Stamford","Stanhope","Stanley","Stapells","Staples","Staunton","Stedman","Steele","Stefansson","Stephen","Stephenson","Stetham","Stewart","Stimson","Stirling","Stisted","Stobie","Stock","Stoddart","Stokes","Stone","Stoney","Storey","Stoughton","Stover","Strachan","Strain","Stralak","Strange","Strathcona","Strathearn","Strathy","Stratton","Street","Strey","Strickland","Striker","Stringer","Strom","Strong","Struthers","Studholme","Stull","Sturgeon","Suganaqueb","Sullivan","Sulman","Summers","Suni","Sunnidale","Sutcliffe","Sutherland","Swanson","Swartman","Swayze","Sweatman","Sweeny","Sweet","Sydenham","Sydere","Syer","Syine","Symington","Tabobondung","Tait","Talbott","Tannahill","Tanner","Tarbutt","Tarbutt Additional","Tarentorus","Tay","Taylor","Teasdale","Teck","Tecumseth","Tedder","Teefy","Teetzel","Tehkummah","Telfer","Temple","Templeton","Tennyson","Terry","Thackeray","Thessalon","Thistle","Thomas","Thompson","Thorah","Thorburn","Thorneloe","Thorning","Thorold","Thorp","Thurlow","Tiernan","Tilbury East","Tilbury West","Tilley","Tilston","Tilton","Timbrell","Timmermans","Timmins","Tiny","Tisdale","Todd","Tofflemire","Togo","Tolmie","Tolmonen","Tolstoi","Tomlinson","Tooms","Topham","Torbolton","Toronto","Toronto Gore","Torrance","Torrington","Tosorontio","Totten","Tovell","Townsend","Trafalgar","Traill","Travers","Trethewey","Trewartha","Trill","Triquet","Tronsen","Trottier","Truax","Truman","Tucker","Tuckersmith","Tudhope","Tudor","Tully","Tupper","Turnberry","Turnbull","Turner","Tuscarora","Tustin","Tuuri","Tweed","Tweedle","Tweedsmuir","Tyendinaga","Tyrone","Tyrrell","Ulster","Umbach","Unwin","Upsala","Usborne","Usnac","Uxbridge","Valentine","Valin","Van Hise","Van Horne","Van Nostrand","Vance","Vankoughnet","Varley","Vasiloff","Vaughan","Venturi","Verdun","Vermilion","Vermilion Additional","Vernon","Verulam","Vespra","Vibert","Victoria","Viel","Villeneuve","Vincent","Vivian","Vogt","Vondette","Vrooman","Wabigoon","Wacousta","Wadsworth","Wagg","Wainfleet","Wainwright","Wakami","Waldie","Walker","Wallace","Wallbridge","Wallis","Walls","Walpole","Walsh","Walsingham","Walters","Warden","Wardle","Wardrope","Ware","Wark","Warpula","Warren","Warwick","Waswa","Waterloo","Waters","Watson","Watt","Watten","Wauchope","Wawanosh","Wawia","Way","Way White","Weaver","Webb","Webster","Weeks","Weichel","Wellesley","Wells","Welsh","Wesley","West","West Flamborough","West Gwillimbury","West Hawkesbury","Westbrook","Westmeath","Westminster","Whalen","Whigham","Whitby","Whitchurch","White","Whitehead","Whitesides","Whitman","Whitney","Whitson","Wicklow","Wicksteed","Widdifield","Wiggins","Wigle","Wilberforce","Wild Land Reserve","Wilhelmina","Wilkes","Wilkie","Willans","Willet","Williams","Williamsburgh","Williamson","Willingdon","Willison","Willoughby","Wilmot","Wilson","Winchester","Windego","Windham","Winget","Winkler","Winnington","Wiseman","Wishart","Wisner","Wlasy","Wolfe Island","Wolford","Wollaston","Wood","Woodhouse","Woodyatt","Woolrich","Woolwich","Work","Worthington","Worton","Wright","Wylie","Wyse","Yaremko","Yarmouth","Yarrow","Yates","Yeo","Yesno","Yonge","Zavitz","Zealand","Zone","Zorra"];
	var maxLocationNameLength = 30;
	
	function searchGeoNameLayer(spQueryTaskURL, where){
		MOEMap.clearLocationPoints();
	    var params = {
            returnGeometry: false,
			where: "OFF_NAME = '" + where + "'",
            outFields: ["LAT_DD", "LONG_DD", "OFF_NAME"]
        };
        var layer = new gmaps.ags.Layer(spQueryTaskURL);
        layer.query(params, function (fset) {
			var size = 0;
			var locator = true;
			if(fset){
				size = fset.features.length;
			    if (size > 0) {
					locator = false;
					var pointList = [];
					var pointNameList = [];
					var totalX = 0;
					var totalY = 0;
					var bounds = new google.maps.LatLngBounds();
					for (var i = 0; i < size; i++) {
						var att = fset.features[i].attributes;
						var y = att.LAT_DD;
						var x = att.LONG_DD;
						var gLatLng = new google.maps.LatLng(y, x);
						bounds.extend(gLatLng);
						totalX = totalX + x;
						totalY = totalY + y;
						pointList.push(gLatLng);
						pointNameList.push(att.OFF_NAME);
					}
					MOEMap.locateMapWithMultiplePoints(new google.maps.LatLng(totalY/size, totalX/size), bounds, pointList, pointNameList);
				}
			}
			if(locator){	
				LOCATOR.locate(where);
			}
        });
	}
	
	function isGeoName(coorsArray){
		if(coorsArray.length <= 1){
			return false;
		}
		var str = coorsArray[coorsArray.length - 1];		
		if((str === "RIVER") || (str === "CREEK") || (str === "BROOK") || (str === "LAKE") || (str === "HILL")|| (str === "ISLAND")){
			return true;
		}else{
			return false;
		}
	}	
    function search() {
		var searchString = document.getElementById('map_query').value.trim();
	    if (searchString.length === 0) {
            return;
        }
		var coorsArray = searchString.toUpperCase().split(/\s+/);
		if(isGeoName(coorsArray)){		
			for(var i=0; i<= coorsArray.length -1;i++){
				coorsArray[i] = MOEMAP_TOOLS.wordCapitalize(coorsArray[i]);
			}
			searchGeoNameLayer(MOEMapGlobalConfig.MOERegionService + "/" +  MOEMapGlobalConfig.geoNameLayerId, coorsArray.join(" "));
		}else{
			LOCATOR.locate(searchString);
		}
	}
	
	function locatorFailed(){
		document.getElementById('infomation').innerHTML  = MOEMapLanguage.locatorFailedMessage;
		document.getElementById('infomation').style.color = '#FF0000';
	}
	
	function displayMap(){
		mapConfig.dispalyTWPLotCon = true;
		document.getElementById('disclaimer').innerHTML  = "";
		document.getElementById("map_canvas").style.display = "block";	
		document.getElementById("coordinates").style.display = "block";
		document.getElementById('map_tools').innerHTML  = MOEMapLanguage.step2Text; 
		document.getElementById('infomation').innerHTML  = '';
	}
	
	function setLoadingStatus(status){
		if(status){
			document.getElementById("loadingimage").style.display = "block";
		}else{
			document.getElementById("loadingimage").style.display = "none";
		}
	}
	function returnFindYourLocation(){
		mapConfig.dispalyTWPLotCon = false;
		document.getElementById('disclaimer').innerHTML  = MOEMapLanguage.disclaimer;
		document.getElementById("map_canvas").style.display = "none";
		document.getElementById("coordinates").style.display = "none";
		MOEMap.removeAllCreatedLocations();
		init();		
	}
	
	function removeLocation(index){
		MOEMap.removeLocation(index);
	}
	
	function next(){
		mapConfig.lotVisible = true;
		MOEMap.zoomToWaterSourcesCenter(15);
		MOEMap.displayLotConcessionLayer();
		MOEMap.updateMOERegionInfo();
		MOEMap.refreshTable();
		document.getElementById('map_tools').innerHTML  = MOEMapLanguage.step3Button;
		document.getElementById("coordinates").style.display = "none";
	}
	
	function returnCreateLocations(){
		mapConfig.lotVisible = false;
		mapConfig.dispalyTWPLotCon = true;
		MOEMap.displayLotConcessionLayer();
		document.getElementById('map_tools').innerHTML  = MOEMapLanguage.step2Text;
		document.getElementById("coordinates").style.display = "block";
		document.getElementById('mailaddress').innerHTML = "";
		document.getElementById('contactinformation').innerHTML = "";
		MOEMap.refreshTable();		
	}

	function updateMOERegionContact(region){
		document.getElementById('mailaddress').innerHTML = MOEMapLanguage.step3Text;
		document.getElementById('contactinformation').innerHTML =  MOEMapLanguage.contactText + MOEMapLanguage.MOERegionContact[region];
	}
							
	function print(){
		window.print();					
	}
	
	function searchTownship(){
		var selObj = document.getElementById('townshipSelection');
		var searchString = townshipList[selObj.selectedIndex];
		if (searchString.length === 0) {
            return;
        }
		LOCATOR.locate(searchString + " TWP");
	}
	
    function init() {			
			var str = '<select name="townshipSelection" id="townshipSelection"><option>' + townshipList.join('</option><option>') + '</option></select>';
			document.getElementById('map_tools').innerHTML  = MOEMapLanguage.step1Text1 + str + MOEMapLanguage.step1Text2;
			document.getElementById('disclaimer').innerHTML  = MOEMapLanguage.disclaimer;
			if (( $.browser.msie )&&($.browser.version == "6.0")) {
				document.getElementById('right_column').removeChild(document.getElementById("query_table_break"));
			}				
    }
	
    function initGoogleMap() {		
		var mapOptions = {
				zoom: orgzoomLevel,
				center: new google.maps.LatLng(orgLatitude, orgLongitude),
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				draggableCursor: 'pointer',
				minZoom: minMapScale,
				maxZoom: maxMapScale,
				scaleControl: true,
				disableDoubleClickZoom: true,
				streetViewControl: true 
		}
        var map =  new google.maps.Map(document.getElementById("map_canvas"), mapOptions);		
		return map;
    }
		
	function changeCoorStatus(latLng) {
        var lat = latLng.lat();
        var lng = latLng.lng();
        var utm = MOEMAP_TOOLS.convertLatLngtoUTM(lat, lng);
		if(!isMobile){
			if (mapConfig.language == "EN") {
				document.getElementById('coordinates').innerHTML = "Latitude:" + lat.toFixed(6) + ", Longitude:" + lng.toFixed(6) + " (UTM Zone:" + utm.Zone + ", Easting:" + utm.Easting + ", Northing:" + utm.Northing + ")";				
			} else {
				document.getElementById('coordinates').innerHTML = "Latitude:" + lat.toFixed(6) + ", Longitude:" + lng.toFixed(6) + " (Zone UTM:" + utm.Zone + ", abscisse:" + utm.Easting + ", ordonn\u00e8e:" + utm.Northing + ")";
			}
		}	
	}
    function mouseMove(event) {		
		changeCoorStatus(event.latLng);
    }
	
	function getTownshipLabel(township, con, lot){
		if((township === "")&&(con === "")&&(lot ==="")){
			return MOEMapLanguage.unsurveyedTerritory;
		}if((con === "")&&(lot ==="")){
			if (mapConfig.language == "EN") {
				return MOEMAP_TOOLS.wordCapitalize(township) + " TWP";
			}else{
				return "Canton " + MOEMAP_TOOLS.wordCapitalize(township);
			}
		}else{
			if (mapConfig.language == "EN") {
				return MOEMAP_TOOLS.wordCapitalize(township) + " TWP, " + MOEMAP_TOOLS.wordCapitalize(con) + ", " + MOEMAP_TOOLS.wordCapitalize(lot);
			}else{
				return "Canton " + MOEMAP_TOOLS.wordCapitalize(township) + ", " + MOEMAP_TOOLS.wordCapitalize(con) + ", " + MOEMAP_TOOLS.wordCapitalize(lot);			
			}
		}
	}
	
	function getPromptText(){
		return MOEMapLanguage.PromptText1 + maxLocationNameLength + MOEMapLanguage.PromptText2;
	}	
	
    var module = {
		orgLatitude: orgLatitude,
		orgLongitude: orgLongitude,
		orgzoomLevel: orgzoomLevel,
		minMapScale: minMapScale,
		maxMapScale: maxMapScale,	
		coor_Status: coor_Status,
		identifying: identifying,
		//inputSouceName: inputSouceName,
		searchZoomLevel: searchZoomLevel,
		townshipZoomLevel: townshipZoomLevel,		
		searchTownshipZoomLevel: searchTownshipZoomLevel,
		streamNetworkZoomLevel: streamNetworkZoomLevel,
		language: language,
		address: address,		
		lotVisible: lotVisible,
		dispalyTWPLotCon: dispalyTWPLotCon,
		setLoadingStatus: setLoadingStatus,
		maxLocationNameLength: maxLocationNameLength,
		searchTownship: searchTownship,
		search: search,
		returnFindYourLocation: returnFindYourLocation,
		print: print,
		next: next,
		displayMap: displayMap,
		locatorFailed: locatorFailed, 
		getTownshipLabel: getTownshipLabel,		
		getPromptText: getPromptText,
		removeLocation: removeLocation,
		returnCreateLocations: returnCreateLocations,
		updateMOERegionContact: updateMOERegionContact,
		init: init,
		initGoogleMap: initGoogleMap,
        mouseMove: mouseMove,
		changeCoorStatus: changeCoorStatus
    };
    return module;
})();


if(!isMobile){
	window.onload = function () {
		MOEMap.init();		
	}
}

MOEMAP_TOOLS = (function () {
						  
    var monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"],
        monthFrenchNames = ["JANVIER", "FEVRIER", "MARS", "AVRIL", "MAI", "JUIN", "JUILLET", "AOUT", "SEPTEMBRE", "OCTOBRE", "NOVEMBRE", "DECEMBRE"],
        monthShortNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
        monthDigitalNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    function getArrayIndex(str, strArray) {
        var index = -1;
        for (var i = 0; i < strArray.length; i++) {
            if (strArray[i] == str) {
                index = i;
                break;
            }
        }
        return index;
    }

    function wordCapitalize(str) {
        var strArray = str.trim().split(' ');
        for (var i = 0; i < strArray.length; i++) {
            strArray[i] = strArray[i].substring(0, 1).toUpperCase() + strArray[i].substring(1, strArray[i].length).toLowerCase();
        }
        return strArray.join(' ');
    }

    function processNA(str) {
        if (typeof(str) == 'undefined') {
            return "N/A";
        }
        if (str == "null") {
            return "N/A";
        }
        if (str == "Null") {
            return "N/A";
        }
        return str;
    }

    function replaceChar(str, charA, charB) {
        var temp = [];
        temp = str.split(charA);
        var result = temp[0];
        if (temp.length >= 2) {
            for (var i = 1; i < temp.length; i++) {
                result = result + charB + temp[i];
            }
        }
        return result;
    }

    function deciToDegree(degree) {
        var sym = "N";
        if (degree < 0) {
            degree = -degree;
            if (mapConfig.language == "EN") {
                sym = "W";
            } else {
                sym = "O";
            }
        }
        var deg = Math.floor(degree);
        var temp = (degree - deg) * 60;
        var minute = Math.floor(temp);
        var second = Math.floor((temp - minute) * 60);
        var res = "";
        if (second < 1) {
            res = "" + deg + "&deg;" + minute + "'";
        } else if (second > 58) {
            res = "" + deg + "&deg;" + (minute + 1) + "'";
        } else {
            res = "" + deg + "&deg;" + minute + "'" + second + "\"";
        }
        return res + sym;
    }

    function isPolylineListWithinBounds(gPolylineList, bounds) {
        if (gPolylineList.length > 0) {
            for (var x = 0; x < gPolylineList.length; x++) {
                var path = gPolylineList[x].getPath();
                var max = path.getLength();
                for(var i = 0; i < max; i++){
                    if(bounds.contains(path.getAt(i))) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function convertLatLngtoUTM(lat, lng) {
        var pi = 3.14159265358979; //PI
        var a = 6378137; //equatorial radius for WGS 84
        var k0 = 0.9996; //scale factor
        var e = 0.081819191; //eccentricity
        var e_2 = 0.006694380015894481; //e'2
        var A0 = 6367449.146;
        var B0 = 16038.42955;
        var C0 = 16.83261333;
        var D0 = 0.021984404;
        var E0 = 0.000312705;

        var zone = 31 + Math.floor(lng / 6);
        var lat_r = lat * pi / 180.0;
        var t1 = Math.sin(lat_r); // SIN(LAT)
        var t2 = e * t1 * e * t1;
        var t3 = Math.cos(lat_r); // COS(LAT)
        var t4 = Math.tan(lat_r); // TAN(LAT)
        var nu = a / (Math.sqrt(1 - t2));
        var S = A0 * lat_r - B0 * Math.sin(2 * lat_r) + C0 * Math.sin(4 * lat_r) - D0 * Math.sin(6 * lat_r) + E0 * Math.sin(8 * lat_r);
        var k1 = S * k0;
        var k2 = nu * t1 * t3 * k0 / 2.0;
        var k3 = ((nu * t1 * t2 * t2 * t2) / 24) * (5 - t4 * t4 + 9 * e_2 * t3 * t3 + 4 * e_2 * e_2 * t3 * t3 * t3 * t3) * k0;
        var k4 = nu * t3 * k0;
        var k5 = t3 * t3 * t3 * (nu / 6) * (1 - t4 * t4 + e_2 * t3 * t3) * k0;

        //var lng_r = lng*pi/180.0;
        var lng_zone_cm = 6 * zone - 183;
        var d1 = (lng - lng_zone_cm) * pi / 180.0;
        var d2 = d1 * d1;
        var d3 = d2 * d1;
        var d4 = d3 * d1;

        var x = 500000 + (k4 * d1 + k5 * d3);
        var rawy = (k1 + k2 * d2 + k3 * d4);
        var y = rawy;
        if (y < 0) {
            y = y + 10000000;
        }
        var res = {
            Zone: zone,
            Easting: x.toFixed(0),
            Northing: y.toFixed(0)
        };
        return res;
    }

    function convertUTMtoLatLng(zone, north, east) {
        var pi = 3.14159265358979; //PI
        var a = 6378137; //equatorial radius for WGS 84
        var k0 = 0.9996; //scale factor
        var e = 0.081819191; //eccentricity
        var e_2 = 0.006694380015894481; //e'2
        //var corrNorth = north; //North Hemishpe
        var estPrime = 500000 - east;
        var arcLength = north / k0;
        var e_4 = e_2 * e_2;
        var e_6 = e_4 * e_2;
        var t1 = Math.sqrt(1 - e_2);
        var e1 = (1 - t1) / (1 + t1);
        var e1_2 = e1 * e1;
        var e1_3 = e1_2 * e1;
        var e1_4 = e1_3 * e1;

        var C1 = 3 * e1 / 2 - 27 * e1_3 / 32;
        var C2 = 21 * e1_2 / 16 - 55 * e1_4 / 32;
        var C3 = 151 * e1_3 / 96;
        var C4 = 1097 * e1_4 / 512;

        var mu = arcLength / (a * (1 - e_2 / 4.0 - 3 * e_4 / 64 - 5 * e_6 / 256));
        var FootprintLat = mu + C1 * Math.sin(2 * mu) + C2 * Math.sin(4 * mu) + C3 * Math.sin(6 * mu) + C4 * Math.sin(8 * mu);
        var FpLatCos = Math.cos(FootprintLat);
        //var C1_an = e_2*FpLatCos*FpLatCos;
        var FpLatTan = Math.tan(FootprintLat);
        var T1 = FpLatTan * FpLatTan;
        var FpLatSin = Math.sin(FootprintLat);
        var FpLatSin_e = e * FpLatSin;
        var t2 = 1 - FpLatSin_e * FpLatSin_e;
        var t3 = Math.sqrt(t2);
        var N1 = a / t3;
        var R1 = a * (1 - e_2) / (t2 * t3);
        var D = estPrime / (N1 * k0);
        var D_2 = D * D;
        var D_4 = D_2 * D_2;
        var D_6 = D_4 * D_2;
        var fact1 = N1 * FpLatTan / R1;
        var fact2 = D_2 / 2;
        var fact3 = (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * e_2) * D_4 / 24;
        var fact4 = (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * e_2 - 3 * C1 * C1) * D_6 / 720;
        var lofact1 = D;
        var lofact2 = (1 + 2 * T1 + C1) * D_2 * D / 6;
        var lofact3 = (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * e_2 + 24 * T1 * T1) * D_4 * D / 120;
        var delta_Long = (lofact1 - lofact2 + lofact3) / FpLatCos;
        var zone_CM = 6 * zone - 183;
        var latitude = 180 * (FootprintLat - fact1 * (fact2 + fact3 + fact4)) / pi;
        var longitude = zone_CM - delta_Long * 180 / pi;
        var res = {
            Latitude: latitude.toFixed(8),
            Longitude: longitude.toFixed(8)
        };
        return res;
    }

    function isInPolygon(lat, lng1) {
        var lng = lng1;
        if (lng1 > 0) {
            lng = -lng;
        }
        var poly = MOEMapGlobalConfig.boundaryPolygon;
        var numPoints = poly.length;
        var inPoly = false;
        var j = numPoints - 1;
        for (var i = 0; i < numPoints; i++) {
            var vertex1 = poly[i];
            var vertex2 = poly[j];

            if (vertex1.x < lng && vertex2.x >= lng || vertex2.x < lng && vertex1.x >= lng) {
                if (vertex1.y + (lng - vertex1.x) / (vertex2.x - vertex1.x) * (vertex2.y - vertex1.y) < lat) {
                    inPoly = !inPoly;
                }
            }

            j = i;
        }
        return inPoly;
    }
    function isWithinPolygon(point, polygon){
		var lat = point.lat();
		var lng = point.lng();		
		var vertices  = polygon.getPath();
		
        var numPoints = vertices .length;
        var inPoly = false;
        var j = numPoints - 1;
        for (var i = 0; i < numPoints; i++) {
            var vertex1 = vertices.getAt(i);
            var vertex2 = vertices.getAt(j);

            if (vertex1.lng() < lng && vertex2.lng() >= lng || vertex2.lng() < lng && vertex1.lng() >= lng) {
                if (vertex1.lat() + (lng - vertex1.lng()) / (vertex2.lng() - vertex1.lng()) * (vertex2.lat() - vertex1.lat()) < lat) {
                    inPoly = !inPoly;
                }
            }

            j = i;
        }
        return inPoly;		
	}
    function isInPolygonUTM(easting, northing) {
        var minEasting = 258030.3;
        var maxEasting = 741969.7;
        var minNorthing = 4614583.73;
        var maxNorthing = 6302884.09;
        return ((easting < maxEasting) && (easting > minEasting) && (northing < maxNorthing) && (northing > minNorthing));
    }

    function isAllFloat() {
        var reg = /^(-?\d+)(\.\d+)?$/;
        for (var i = 0; i < arguments.length; i++) {
            if (!reg.test(arguments[i])) return false;
        }
        return true;
    }

    function validateLatLng(lat, lng) {
        if (isInPolygon(lat, lng)) {
            return {
                latLng: new google.maps.LatLng(lat, lng),
                success: true
            };
        }else {
            return locatorFailed();
        }
    }

    function locatorFailed() {
        return {
            success: false
        };
    }
	
	function getPolyIndex(point, polyArr){
		for(var i=0; i< polyArr.length;i++){
			var poly = (polyArr[i]).feature.geometry[0];
			if(MOEMAP_TOOLS.isWithinPolygon(point, poly)){				
				return i;
			}
		}
		return 0;
	}


    var module = {
        getArrayIndex: getArrayIndex,
        wordCapitalize: wordCapitalize,
        processNA: processNA,
        replaceChar: replaceChar,
        deciToDegree: deciToDegree,
        isPolylineListWithinBounds: isPolylineListWithinBounds,
        convertLatLngtoUTM: convertLatLngtoUTM,
        convertUTMtoLatLng: convertUTMtoLatLng,
        isInPolygon: isInPolygon,
		isWithinPolygon: isWithinPolygon,
        isInPolygonUTM: isInPolygonUTM,
        isAllFloat: isAllFloat,
        validateLatLng: validateLatLng,
        locatorFailed: locatorFailed, 
		getPolyIndex: getPolyIndex
    };
    return module;
})();

LATLNG_LOCATOR = (function () {
    //Public method: use three methods: decimal degree, DMS, and DMS symbols to parse the input

    function process(coorsArray) {
        if (coorsArray.length != 2) {
            return MOEMAP_TOOLS.locatorFailed();
        }
        var res = processDecimalDegree(coorsArray);
        if (!res.success) {
            res = processSymbol(coorsArray);
        }
        if (!res.success) {
            res = processSymbolDMS(coorsArray);
        }
        if (res.success) {
            MOEMap.locateMap(res.latLng, mapConfig.searchZoomLevel, mapConfig.address);
        }
        return res;
    }
    //Private method: parse decimal degree.

    function processDecimalDegree(coorsArray) {
        if (MOEMAP_TOOLS.isAllFloat(coorsArray[0], coorsArray[1])) {
            var v1 = Math.abs(parseFloat(coorsArray[0]));
            var v2 = Math.abs(parseFloat(coorsArray[1]));
            var lat = Math.min(v1, v2);
            var lng = -Math.max(v1, v2);
            return MOEMAP_TOOLS.validateLatLng(lat, lng);
        } else {
            return MOEMAP_TOOLS.locatorFailed();
        }
    }
    //Private method: parse symbol degree, minute and second. Need to call parseLatLng method.

    function processSymbol(coorsArray) {
        var degreeSym = String.fromCharCode(176);
        if (((coorsArray[0]).indexOf(degreeSym) > 0) && ((coorsArray[1]).indexOf(degreeSym) > 0)) {
            v1 = parseLatLng(coorsArray[0], degreeSym, "'", "\"");
            v2 = parseLatLng(coorsArray[1], degreeSym, "'", "\"");
            var lat = Math.min(v1, v2);
            var lng = -Math.max(v1, v2);
            return MOEMAP_TOOLS.validateLatLng(lat, lng);
        } else {
            return MOEMAP_TOOLS.locatorFailed();
        }
    }
    //Private method: parse symbol (DMS) degree, minute and second. Need to call parseLatLng and validateLatLngFormat methods.

    function processSymbolDMS(coorsArray) {
        var str1 = (coorsArray[0]).toUpperCase();
        var str2 = (coorsArray[1]).toUpperCase();
        var valid = validateLatLngFormat(str1) * validateLatLngFormat(str2);
        if (valid > 0) {
            v1 = parseLatLng(str1, "D", "M", "S");
            v2 = parseLatLng(str2, "D", "M", "S");
            var lat = Math.min(v1, v2);
            var lng = -Math.max(v1, v2);
            return MOEMAP_TOOLS.validateLatLng(lat, lng);
        } else {
            return MOEMAP_TOOLS.locatorFailed();
        }
    }
    //Private method: valide whether input contains a number with D. called by processSymbolDMS

    function validateLatLngFormat(str) {
        for (var i = 0; i <= 9; i++) {
            if (str.indexOf(i + "D") > 0) {
                return 1;
            }
        }
        return 0;
    }
    //Private method: Parse the string by calling parseDMS. Called by processSymbol and processSymbolDMS

    function parseLatLng(val, s1, s2, s3) {
        var result = 0;
        var parsed = parseDMS(s1, val);
        var deg = parsed.ParsedNum;
        parsed = parseDMS(s2, parsed.Unparsed);
        var min = parsed.ParsedNum;
        parsed = parseDMS(s3, parsed.Unparsed);
        var sec = parsed.ParsedNum;
        if (deg > 0) {
            result = deg + min / 60.0 + sec / 3600.0;
        } else {
            result = deg - min / 60.0 - sec / 3600.0;
        }
        result = Math.abs(result);
        return result;
    }
    //Private method: Parse the string. called by parseLatLng

    function parseDMS(s, unparsed) {
        var res = {
            ParsedNum: 0,
            Unparsed: ""
        };
        if (unparsed.length === 0) {
            return res;
        }
        var arr = unparsed.split(s);
        var result = 0;
        if (arr.length <= 2) {
            if (MOEMAP_TOOLS.isAllFloat(arr[0])) {
                result = parseFloat(arr[0]);
            }
            if (arr.length == 2) {
                unparsed = arr[1];
            } else {
                unparsed = "";
            }
        }
        res = {
            ParsedNum: result,
            Unparsed: unparsed
        };
        return res;
    }
    var module = {
        process: process
    };
    return module;
})();

//Parse the input as UTM
UTM_LOCATOR = (function () {
    function process(coorsArray) {
        var res = processDefaultZone17(coorsArray);
        if (!res.success) {
            res = processGeneralUTM(coorsArray);
        }
        if (res.success) {
            MOEMap.locateMap(res.latLng, mapConfig.searchZoomLevel, mapConfig.address);
        }
        return res;
    }
    //Private method: Parse default UTM ZONE: 17 with only easting and northing

    function processDefaultZone17(coorsArray) {
        if (coorsArray.length != 2) {
            return MOEMAP_TOOLS.locatorFailed();
        }
        if (MOEMAP_TOOLS.isAllFloat(coorsArray[0], coorsArray[1])) {
            var v1 = Math.abs(parseFloat(coorsArray[0]));
            var v2 = Math.abs(parseFloat(coorsArray[1]));
            var v3 = Math.min(v1, v2);
            var v4 = Math.max(v1, v2);
            if (MOEMAP_TOOLS.isInPolygonUTM(v3, v4)) {
                var latlng = MOEMAP_TOOLS.convertUTMtoLatLng(17, v4, v3);
                return MOEMAP_TOOLS.validateLatLng(latlng.Latitude, latlng.Longitude);
            } else {
                return MOEMAP_TOOLS.locatorFailed();
            }
        } else {
            return MOEMAP_TOOLS.locatorFailed();
        }
    }
    //Private method: Parse general UTM with zone, easting and northing

    function processGeneralUTM(coorsArray) {
        var res = MOEMAP_TOOLS.locatorFailed();
        if (coorsArray.length != 3) {
            return res;
        }
        var a1 = (coorsArray[0]).replace(",", " ").trim();
        var a2 = (coorsArray[1]).replace(",", " ").trim();
        var a3 = (coorsArray[2]).replace(",", " ").trim();
        if (MOEMAP_TOOLS.isAllFloat(a1, a2, a3)) {
            var values = [Math.abs(parseFloat(a1)), Math.abs(parseFloat(a2)), Math.abs(parseFloat(a3))];
            values.sort(function (a, b) {
                return a - b;
            });
            var zoneStr = (values[0]).toString(); //zone
            var reg_isInteger = /^\d+$/;
            if (reg_isInteger.test(zoneStr)) {
                if ((values[0] >= 15) && (values[0] <= 18)) {
                    if (MOEMAP_TOOLS.isInPolygonUTM(values[1], values[2])) {
                        var latlng = MOEMAP_TOOLS.convertUTMtoLatLng(values[0], values[2], values[1]); //Zone, Northing, Easting
                        return MOEMAP_TOOLS.validateLatLng(latlng.Latitude, latlng.Longitude);
                    }
                }
            }
        }
        return res;
    }
    var module = {
        process: process
    };
    return module;
})();

//Parse the input as Township, Lot, Concession
TWP_LOCATOR = (function () {
    //Public method: parse the input as Township, Lot, Concession information by calling preprocessTWP, getTWPContentLevel, getCentroidAndAddPolylines

    function process(coorsArray) {
        var coors_Up = coorsArray.join(' ').toUpperCase();
        var twpInfo = preprocessTWP(coors_Up);

        if (twpInfo.success) {		
            var levelContent = getTWPContentLevel(twpInfo);
            var params = {
                returnGeometry: true,
                outFields: ["CENX", "CENY"]
            };
            var layerId;
            if (twpInfo.isTWPOnly) {
                //params.where = "UPPER(NAME) = '" + twpInfo.TWP + "'";
				params.where = "NAME = '" + twpInfo.TWP + "'";
                layerId = 0; //Twp layer
            } else {
                params.where = "OFFICIAL_NAME_UPPER = '" + twpInfo.TWP + "' AND CONCESSION_NUMBER = 'CON " + twpInfo.Con + "' AND LOT_NUM_1 = 'LOT " + twpInfo.Lot + "'";
                layerId = 1; //Lot Con layer
            }
            var layer = new gmaps.ags.Layer(MOEMapGlobalConfig.GeogTwpService + "/" + layerId);
            layer.query(params, function (fset) {
                if ((fset) &&(fset.features.length > 0)) {
                    MOEMap.locateMap(getCentroid(fset), levelContent.level, levelContent.content);
                }else{
					mapConfig.locatorFailed();
				}
            });
            return {
                success: true
            };
        } else {
            return MOEMAP_TOOLS.locatorFailed();
        }
    }
    //Private method: parse the input to get Township, Lot, Concession by calling processLotCon

    function preprocessTWP(coors_Up) {
        var res = {
            TWP: "",
            Lot: "",
            Con: "",
            isTWPOnly: false,
            success: false
        };
        if (coors_Up.indexOf(' TWP') > 0) {
            res = processLotCon(coors_Up.split(" TWP"));
        }
        if (!res.success) {
            if (coors_Up.indexOf(' TOWNSHIP') > 0) {
                res = processLotCon(coors_Up.split(" TOWNSHIP"));
            }
        }
        if (!res.success) {
            if (coors_Up.indexOf('CANTON ') === 0) {
                var str = coors_Up.substring(7).trim();
                var lotIndex = str.indexOf(" LOT ");
                var conIndex = str.indexOf(" CON ");
                var index = lotIndex;
                if (conIndex < lotIndex) {
                    index = conIndex;
                }
                var parsedList = [];
                if (index === -1) {
                    parsedList.push(str);
                    parsedList.push("");
                } else {
                    parsedList.push(str.substring(0, index));
                    parsedList.push(str.substring(index));
                }
                res = processLotCon(parsedList);
            }
        }
        return res;
    }
    //Private method: parse the input to get Lot, Concession

    function processLotCon(arr1) {
        if (arr1.length != 2) {
            return {
                TWP: "",
                Lot: "",
                Con: "",
                isTWPOnly: false,
                success: false
            };
        }
        var TWPname = (arr1[0]).trim().split(/\s+/).join(' '); //replace multiple spaces with one space
        var con = "";
        var lot = "";
        if (((arr1[1]).indexOf("LOT") > 0) && ((arr1[1]).indexOf("CON") > 0)) {
            var arr2 = ((arr1[1]).trim()).split("CON");
            if ((arr2[0]).length === 0) {
                var arr3 = (arr2[1]).split("LOT");
                con = (arr3[0]).trim();
                lot = (arr3[1]).trim();
            } else {
                var arr4 = (arr2[0]).split("LOT");
                con = (arr2[1]).trim();
                lot = (arr4[1]).trim();
            }
        }
        var TWPOnly = false;
        if ((con.length === 0) && (lot.length === 0)) {
            TWPOnly = true;
        }
        return {
            TWP: TWPname,
            Lot: lot,
            Con: con,
            isTWPOnly: TWPOnly,
            success: true
        };
    }
    //Private method: get the pop up content and zoom level

    function getTWPContentLevel(twpInfo) {
        var content = "";
        var level = mapConfig.searchZoomLevel;
        if (twpInfo.isTWPOnly) {
            level = mapConfig.searchTownshipZoomLevel;
            if (mapConfig.language == "EN") {
                content = MOEMAP_TOOLS.wordCapitalize(twpInfo.TWP) + " Township";
            } else {
                content = "Canton " + MOEMAP_TOOLS.wordCapitalize(twpInfo.TWP);
            }
        } else {
            if (mapConfig.language == "EN") {
                content = MOEMAP_TOOLS.wordCapitalize(twpInfo.TWP) + " Township, Con " + twpInfo.Con + ", Lot " + twpInfo.Lot;
            } else {
                content = "Canton " + MOEMAP_TOOLS.wordCapitalize(twpInfo.TWP) + ", Con " + twpInfo.Con + ", Lot " + twpInfo.Lot;
            }
        }
        return {
            content: content,
            level: level
        };
    }
    //Private method: get the centroid and add the polylines

    function getCentroid(fset) {
        var totalX = 0;
        var totalY = 0;
        var totalArea = 0;
        for (var polygonIndex = 0; polygonIndex < fset.features.length; polygonIndex++) {
            var att = fset.features[polygonIndex].attributes;
            var area = 0;
            for (var geometryIndex = 0; geometryIndex < fset.features[polygonIndex].geometry.length; geometryIndex++) {
                var gpolygon = fset.features[polygonIndex].geometry[geometryIndex];
                area = area + google.maps.geometry.spherical.computeArea(gpolygon.getPath());
                //MOEMap.addPolyline(gpolygon);
            }
            totalY = totalY + (att.CENY * area);
            totalX = totalX + (att.CENX * area);
            totalArea = totalArea + area;
        }
		
		return new google.maps.LatLng(totalY/totalArea, totalX/totalArea);
    }
    var module = {
        process: process
    };
    return module;
})();

ADDRESS_LOCATOR = (function () {
    //Public method: parse the input as address information by calling isContarionOntario and showRevGeocodeResult

    function process(address) {
        var geocoder = new google.maps.Geocoder();
        var addressStr = address;
        if (!isContarionOntario(addressStr)) {
            addressStr = addressStr + " Ontario";
        }
        geocoder.geocode({
            'address': addressStr
        }, showRevGeocodeResult);
    }
    //Private method: test whether the input contains keywords by calling testOntario

    function isContarionOntario(addressStr) {
        var address = addressStr.toUpperCase();
        var res = testOntario(address, "ON");
        if (!res) {
            res = testOntario(address, "ONT");
        }
        if (!res) {
            res = testOntario(address, "ONTARIO");
        }
        return res;
    }
    //Private method: test whether the input contains keywords

    function testOntario(address, str) {
        if (address.length > str.length + 1) {
            var substr = address.substring(address.length - str.length - 1);
            if (substr == (" " + str) || substr == ("," + str)) {
                return true;
            }
        }
        return false;
    }

    function showRevGeocodeResult(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var max = results.length;
            var notMoved = true;
            for (var i = 0; i < max; i++) {
                var point = results[i].geometry.location;
                if (MOEMAP_TOOLS.isInPolygon(point.lat(), point.lng())) {
					var diff = Math.abs(MOEMapGlobalConfig.centerPolygon.lat - point.lat()) + Math.abs(MOEMapGlobalConfig.centerPolygon.lng - point.lng());
					if(diff>0.001){
						MOEMap.locateMap(point, mapConfig.searchZoomLevel, results[i].formatted_address);
						notMoved = false;
						break;
					}
                }
            }
            if (notMoved) {
                mapConfig.locatorFailed();
            }
        } else {
            mapConfig.locatorFailed();
        }
    }
    var module = {
        process: process
    };
    return module;
})();

LOCATOR = (function () {
    function locate(address) {
        var coors = MOEMAP_TOOLS.replaceChar(address, ',', ' ');
        var coorsArray = coors.split(/\s+/);
        var res = LATLNG_LOCATOR.process(coorsArray);
        if (!res.success) {
            res = UTM_LOCATOR.process(coorsArray);
        }
        if (!res.success) {
            res = TWP_LOCATOR.process(coorsArray);
        }
        if (!res.success) {
            res = ADDRESS_LOCATOR.process(address);
        }
    }
    var module = {
        locate: locate
    };
    return module;
})();

MOEMap = (function () {					
    var gmap;
    var geogTwpMapService;// = new gmaps.ags.MapService(MOEMapGlobalConfig.GeogTwpService);
	var moeRegionMapService;// = new gmaps.ags.MapService(MOEMapGlobalConfig.MOERegionService);
	var municipalityMapService;// = new gmaps.ags.MapService(MOEMapGlobalConfig.MunicipalityService);

	var locatorMarker;
	
	var maxPermits = 100;	
	var permitIconArray = [];
	var permitLatLngArray = [];
	var permitRowArray = [];
	var permitMarkerArray = new Array(maxPermits);;
	var currentPermitID;
	
	function initPrototype(){
        if (!('trim' in String.prototype)) {
            String.prototype.trim = function () {
                return this.replace(/^\s+|\s+$/g, "");
            };
        }
        Array.prototype.contains = function (element) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == element) {
                    return true;
                }
            }
            return false;
        }	
	}

    function init(map) {

    	mapConfig.init();
		//mapConfig.setLoadingStatus(true);
		initPrototype();
		for(var i=0;i<maxPermits; i++){
			permitIconArray.push(false);
			permitLatLngArray.push(new google.maps.LatLng(0, 0));
			permitRowArray.push("");
		}
		
		if(typeof map == "undefined"){
			gmap = mapConfig.initGoogleMap();
		}else{
			gmap = map;
		}
		
		if (mapConfig.coor_Status) {
            google.maps.event.addListener(gmap, "mousemove", mapConfig.mouseMove);
        }

		google.maps.event.addListener(gmap, "bounds_changed", displayLotConcessionLayer);
		google.maps.event.addListener(gmap, "click", addRemovePermits);
	    geogTwpMapService = new gmaps.ags.MapService(MOEMapGlobalConfig.GeogTwpService);
		moeRegionMapService = new gmaps.ags.MapService(MOEMapGlobalConfig.MOERegionService);
		municipalityMapService = new gmaps.ags.MapService(MOEMapGlobalConfig.MunicipalityService);
		//mapConfig.setLoadingStatus(false);
    }
	function removeAllCreatedLocations(){
		for(var i=0;i<maxPermits; i++){
			if(permitIconArray[i]){
				var marker = permitMarkerArray[i];
				marker.setMap(null);
				permitIconArray[i] = false;
			}
		}
		refreshTable();
	}
	
	function removeLocation(index){
		$.prompt(MOEMapLanguage.RemovePromptText,{
			focus:1,
			callback: function (v,m,f){
				if((v != undefined) &&(v)){
					var marker = permitMarkerArray[index];
					marker.setMap(null);
					permitIconArray[index] = false;
					refreshTable();		
				}
			},
			buttons: MOEMapLanguage.YesNoButtons
		});		
	}
	
	function displayLotConcessionLayer(){
			/*alert(mapConfig.inputSouceName);

			if(mapConfig.inputSouceName){
				return;
			}
			*/
			clearMap();			
			if(gmap.getZoom() < mapConfig.townshipZoomLevel){
				return;
			}
			if(!mapConfig.dispalyTWPLotCon){
				return;
			}
			//Display Geographic Township layer
			if((gmap.getZoom() >= mapConfig.townshipZoomLevel)&&(gmap.getZoom() < mapConfig.searchZoomLevel)){
				var params = {
					returnGeometry: true,
					geometry: gmap.getBounds(),
					outFields: ["NAME", "CENX", "CENY"]
				};
				var layer = new gmaps.ags.Layer(MOEMapGlobalConfig.GeogTwpService + "/" + MOEMapGlobalConfig.geogTwpLayerId);
				layer.query(params, function (fset) {
					if (fset.features.length > 0) {
						for (var polygonIndex = 0; polygonIndex < fset.features.length; polygonIndex++) {
							var label = new Label({
								map: gmap
							});
							var att = fset.features[polygonIndex].attributes;
							label.set('position', new google.maps.LatLng(att.CENY, att.CENX));
							label.set('text', mapConfig.getTownshipLabel(att.NAME, "", "")); 						
							gmapLabelList.push(label);
							
							for (var geometryIndex = 0; geometryIndex < fset.features[polygonIndex].geometry.length; geometryIndex++) {
								var gpolygon = fset.features[polygonIndex].geometry[geometryIndex];
								addPolyline(gpolygon);
							}
						}
					}
				});			
				return;
			}
			//Display Geographic Township, Lot, Concession layer
			var params = {
                returnGeometry: true,
                geometry: gmap.getBounds(),
				outFields: ["OFFICIAL_NAME_UPPER", "CONCESSION_NUMBER", "LOT_NUM_1", "CENX", "CENY"]
            };
			var layer = new gmaps.ags.Layer(MOEMapGlobalConfig.GeogTwpService + "/" + MOEMapGlobalConfig.lotConLayerId);
            layer.query(params, function (fset) {
                if (fset.features.length > 0) {
					for (var polygonIndex = 0; polygonIndex < fset.features.length; polygonIndex++) {
			            var att = fset.features[polygonIndex].attributes;
						var label = new Label({
							map: gmap
						});
						label.set('position', new google.maps.LatLng(att.CENY, att.CENX));
						label.set('text', mapConfig.getTownshipLabel(att.OFFICIAL_NAME_UPPER, att.CONCESSION_NUMBER, att.LOT_NUM_1)); 						
						gmapLabelList.push(label);
						for (var geometryIndex = 0; geometryIndex < fset.features[polygonIndex].geometry.length; geometryIndex++) {
							var gpolygon = fset.features[polygonIndex].geometry[geometryIndex];
							addPolyline(gpolygon);
						}						

					}
                }
            });
			
			//Display stream network
			if(gmap.getZoom() >= mapConfig.streamNetworkZoomLevel){
				var params = {
					returnGeometry: true,
					geometry: gmap.getBounds(),
					outFields: ["OBJECTID"]
				};
				var layer = new gmaps.ags.Layer(MOEMapGlobalConfig.MOERegionService + "/" + MOEMapGlobalConfig.streamNetworkLayerId);
				layer.query(params, function (fset) {
					if ((fset.features) && fset.features.length > 0) {
						for (var polygonIndex = 0; polygonIndex < fset.features.length; polygonIndex++) {
							for (var geometryIndex = 0; geometryIndex < fset.features[polygonIndex].geometry.length; geometryIndex++) {
								var gpolyline = fset.features[polygonIndex].geometry[geometryIndex];
								addStreamNetworkPolyline(gpolyline);
							}							
						}
					}
				});			
				return;
			}
	}
	var gmapPolylineList = [];
	var gmapLabelList = [];
	
	function addPolyline(polygon){
		var max = polygon.getPaths().getLength();
		for(var i=0;i<max;i++){		
			var polyline = new google.maps.Polyline({    
				path: polygon.getPaths().getAt(i),    
				strokeColor: '#8583f3',    
				strokeOpacity: 1,    
				strokeWeight: 3  
			});		
			polyline.setMap(gmap);
			gmapPolylineList.push(polyline);		
		}
	}
	
	function addStreamNetworkPolyline(polygon){
			var polyline = new google.maps.Polyline({    
				path: polygon.getPath(),    
				strokeColor: '#8583ff',    
				strokeOpacity: 1,    
				strokeWeight: 1  
			});		
			polyline.setMap(gmap);
			gmapPolylineList.push(polyline);		
	}
	
    function clearMap() {
        for (var x = 0; x < gmapLabelList.length; x++) {
            (gmapLabelList[x]).setMap(null);
        }
        gmapLabelList = [];
	
        for (var x = 0; x < gmapPolylineList.length; x++) {
            (gmapPolylineList[x]).setMap(null);
        }
        gmapPolylineList = [];
    }
	
	function getAvailablePermitID(){
		for(var i=0;i<maxPermits; i++){
			if(!permitIconArray[i]){
				return i+1;
			}
		}
	}
	
	function getDist(latlng1, latlng2){
		return Math.abs(latlng1.lat() - latlng2.lat()) + Math.abs(latlng1.lng() - latlng2.lng());
	}
	
	function getClosestPermitID(latLng){
		var minDist = 10000000000000000;
		var minDistId = -10;
		for(var i=0;i<maxPermits; i++){
			if(permitIconArray[i]){
				var dist = getDist(permitLatLngArray[i], latLng);
				if(dist<minDist){
					minDist = dist;
					minDistId = i;
				}
			}
		}
		return (minDistId+1)
	}
	
	function refreshTable(){
		var row1 = MOEMapLanguage.tableHeads[0];
		var row3 = MOEMapLanguage.tableHeads[1];		
		var row5 = MOEMapLanguage.tableHeads[2];
		var row7 = MOEMapLanguage.tableHeads[3];
		var row9 = MOEMapLanguage.tableHeads[4];
		var row11 = MOEMapLanguage.tableHeads[5];
				 
		var res = "";
		var totalRow = 0;
		for(var i=0;i<maxPermits; i++){
			if(permitIconArray[i]){
				totalRow = totalRow + 1;
				var str = permitRowArray[i];
				var rowArray = str.split("</tr><tr>");
				var cellArray1 = (rowArray[0]).split("</td><td>");
				
				var row0 = MOEMAP_TOOLS.replaceChar(cellArray1[0], "<tr><td>", '<table class="map_toolsTable"><tr><td><div id="sourceinfo" align="left">') + " <strong>" + cellArray1[1] + "</strong></div></td>";
				if(!mapConfig.lotVisible){
					row0 = row0 +  "<td><div id='next_step' align='right'><input type='submit' onclick='mapConfig.removeLocation(" + i + ")' value='" + MOEMapLanguage.removeText + "'></input></div></td>"
				}
				row0 = row0 + "</tr></table>";
				var lot = "N/A";
				var con = "N/A";
				var twp = cellArray1[3];
				var twpArray = (cellArray1[3]).split(",");
				if(twpArray.length === 3){
					lot = twpArray[2];
					con = twpArray[1];
					twp = twpArray[0];
				}				
				var row2 = "<tr><td  class='shaded'>" + lot + "<td  class='shaded'>" + con + "</td><td  class='shaded'></td><td  class='shaded'></td></tr></table>";
				var cellArray2 = (rowArray[1]).split("</td><td>");
				cellArray2[0] = MOEMAP_TOOLS.replaceChar(cellArray2[0], "<td>", "<td  class='shaded'>");
				var row4 = "<tr><td  class='shaded'>" + cellArray2[1] + cellArray2[0] + cellArray2[2] + "<td  class='shaded'>" + twp + "</td></tr></table>";
				
				var utmArray = (cellArray1[2]).split(",");	
				var row6 = "<tr><td  class='shaded'>Google Maps</td><td  class='shaded'></td><td  class='shaded'>" + utmArray[0] + "<td  class='shaded'>" + utmArray[1] + "</td><td  class='shaded'>" + utmArray[2] + "</td></tr></table>";
				var cellArray3 = (rowArray[2]).split("</td><td>");
				cellArray3[0] = MOEMAP_TOOLS.replaceChar(cellArray3[0], "<td>", "<td  class='shaded'>");
				var row8 = "<tr>" + cellArray3[0] + "</td><td  class='shaded'>" + cellArray3[1] + "</td><td  class='shaded'>" + cellArray3[2] + "</td></tr></table>";
				var row10 = "<tr><td  class='shaded'>" + cellArray3[3] + "</table>";
				var row12 = "<tr><td  class='shaded'>" + cellArray3[4] + "</table>";

				var table = row0 + row1 + row2 + row3 + row4 + row5 + row6 + row9 + row10 + row11 + row12 + row7 + row8;
				res = res + table;
			}
		}
		mapConfig.setLoadingStatus(false);
		document.getElementById('previous_button').disabled = false;
		mapConfig.identifying = false;		
		if(totalRow == 0){
			document.getElementById('query_table').innerHTML = "";
			document.getElementById('next_button').disabled = true;						
		}else{
			document.getElementById('query_table').innerHTML = res;
			document.getElementById('next_button').disabled = false;									
		}
	}
	function getClosestRegion(latLng){
		var MOERegions = ["Northern", "Central", "Eastern", "WestCentral", "Southwestern"];
		var MOERegionCenters = [new google.maps.LatLng(48.377941, -89.289639),
			new google.maps.LatLng(43.783218, -79.416263),
			new google.maps.LatLng(44.271980, -76.568400),
			new google.maps.LatLng(43.256741, -79.871656),
			new google.maps.LatLng(42.928536, -81.232714)];
		var index = -1;
		var minDist = 10000000000000000000000000000000000000000;
		for(var i=0; i<MOERegionCenters.length;i++ ){
			var dist = google.maps.geometry.spherical.computeDistanceBetween(MOERegionCenters[i], latLng);
			if(dist<minDist){
				index = i;
				minDist = dist;
			}
		}
		return MOERegions[index];
	}
	function updateMOERegionInfo(){
		var latLng = new google.maps.LatLng(0, 0)
		for(var i=0;i<maxPermits; i++){
			if(permitIconArray[i]){
				latLng = permitLatLngArray[i];
				break;
			}
		}
		moeRegionMapService.identify({
					'geometry': latLng,
					'tolerance': 1,
					'layerIds': [MOEMapGlobalConfig.moeRegionLayerId],
					'layerOption': 'all',
					'bounds': gmap.getBounds(),
					'width': gmap.getDiv().offsetWidth,
					'height': gmap.getDiv().offsetHeight
				}, function (response, err) {
					if (err) {
						alert(err.message + err.details.join('\n'));
					} else {
						var idResults = response.results;
						var count = idResults.length;
						if (count === 0) {
							mapConfig.updateMOERegionContact(getClosestRegion(latLng));
						}else{	
							var index = 0;
							if (count > 1) {
								index = MOEMAP_TOOLS.getPolyIndex(latLng, idResults);
							}
							var attributes = idResults[index].feature.attributes;
							mapConfig.updateMOERegionContact(attributes["MOE_REGION"]);
						}
					}
		});
	}
	
	function refreshTownshipInfo(name){
		var latLng = permitLatLngArray[currentPermitID-1];
		var image = getIconName(currentPermitID);
		var utmStr = getUTMString(currentPermitID);
		permitRowArray[currentPermitID-1] = "<tr><td><img src='" + image + "'/></td><td>" + name + "</td><td>" + utmStr + "</td>";
		mapConfig.setLoadingStatus(true);
		geogTwpMapService.identify({
            'geometry': latLng,
            'tolerance': 1,
            'layerIds': [MOEMapGlobalConfig.lotConLayerId],
            'layerOption': 'all',
            'bounds': gmap.getBounds(),
            'width': gmap.getDiv().offsetWidth,
            'height': gmap.getDiv().offsetHeight
        }, function (response, err) {
                if (err) {
                    alert(err.message + err.details.join('\n'));
                } else {
					var idResults = response.results;
					var count = idResults.length;
					if (count === 0) {					
						geogTwpMapService.identify({
							'geometry': latLng,
							'tolerance': 1,
							'layerIds': [MOEMapGlobalConfig.geogTwpLayerId],
							'layerOption': 'all',
							'bounds': gmap.getBounds(),
							'width': gmap.getDiv().offsetWidth,
							'height': gmap.getDiv().offsetHeight
						}, function (response, err) {
							if (err) {
								alert(err.message + err.details.join('\n'));
							} else {
								var idResults = response.results;
								var count = idResults.length;
								if (count === 0) {					
									permitRowArray[currentPermitID-1] = permitRowArray[currentPermitID-1] + "<td>" + mapConfig.getTownshipLabel("", "", "") + "</td>";
								}else{	
									var index = 0;
									if (count > 1) {
										index = MOEMAP_TOOLS.getPolyIndex(latLng, idResults);
									}
									var attributes = idResults[index].feature.attributes;						
									var twpStr =  mapConfig.getTownshipLabel(attributes["NAME"], "", "");
									permitRowArray[currentPermitID-1] = permitRowArray[currentPermitID-1] + "<td>" + twpStr + "</td>";					
								}
								identifyMunicipalityService();
							}
						});		
					}else{	
						var index = 0;
						if (count > 1) {
							index = MOEMAP_TOOLS.getPolyIndex(latLng, idResults);
						}
						var attributes = idResults[index].feature.attributes;						
						var twpStr =  mapConfig.getTownshipLabel(attributes["OFFICIAL_NAME_UPPER"], attributes["CONCESSION_NUMBER"], attributes["LOT_NUM_1"]);
						permitRowArray[currentPermitID-1] = permitRowArray[currentPermitID-1] + "<td>" + twpStr + "</td>";					
						identifyMunicipalityService();
					}
                }
        });
	
	}
	
	function getContent(fieldList, polyArr){
		var point = permitLatLngArray[currentPermitID-1];
		if(polyArr.length === 0){
			return "<td></td>";
		}
		var index = 0;
		if(polyArr.length>1){
			index = MOEMAP_TOOLS.getPolyIndex(point, polyArr);
		}
		var attributes = (polyArr[index]).feature.attributes;
		var str = "";
		for(var i=0; i<fieldList.length; i++){
			str = str + "<td>" + attributes[fieldList[i]] + "</td>";
		}
		return str;			
	}
	
	function identifyMunicipalityService(){
		var latLng = permitLatLngArray[currentPermitID-1];
		municipalityMapService.identify({
            'geometry': latLng,
            'tolerance': 1,
            'layerIds': [MOEMapGlobalConfig.MunicipalityDistrictLayerId, MOEMapGlobalConfig.MunicipalitySingleLowTierLayerId, MOEMapGlobalConfig.MunicipalityUpperTierLayerId],
            'layerOption': 'all',
            'bounds': gmap.getBounds(),
            'width': gmap.getDiv().offsetWidth,
            'height': gmap.getDiv().offsetHeight
        }, function (response, err) {
                if (err) {
                    alert(err.message + err.details.join('\n'));
                } else {
					var idResults = response.results;
					var count = idResults.length;
					
					var districtArray = [];
					var singleLowTierArray = [];
					var upperTierArray = [];		
					for (var i = 0; i < count; i++) {
						var result = idResults[i];
						switch(result.layerId){
							case MOEMapGlobalConfig.MunicipalityDistrictLayerId:
								districtArray.push(result);
								break;
							case MOEMapGlobalConfig.MunicipalitySingleLowTierLayerId:
								singleLowTierArray.push(result);
								break;  
							case MOEMapGlobalConfig.MunicipalityUpperTierLayerId:
								upperTierArray.push(result);
								break;
						}	
					}
					var content0 = getContent(["LEGAL_NAME"], districtArray);
					var content1 = getContent(["LEGAL_NAME"], singleLowTierArray);
					var content2 = getContent(["LEGAL_NAME"], upperTierArray);
					permitRowArray[currentPermitID-1] =  permitRowArray[currentPermitID-1] + "</tr><tr>" + content0 + content1 + content2;
					identifyPTTWService();
                }
        });
	}
	
	function identifyPTTWService(){
		var latLng = permitLatLngArray[currentPermitID-1];
		moeRegionMapService.identify({
            'geometry': latLng,
            'tolerance': 1,
            'layerIds': [MOEMapGlobalConfig.watershedServiceLayerId, MOEMapGlobalConfig.NECPlanBoundaryLayerId, MOEMapGlobalConfig.ORMPlaningAreaLayerId],
            'layerOption': 'all',
            'bounds': gmap.getBounds(),
            'width': gmap.getDiv().offsetWidth,
            'height': gmap.getDiv().offsetHeight
        }, function (response, err) {
                if (err) {
                    alert(err.message + err.details.join('\n'));
                } else {
					var idResults = response.results;
					var count = idResults.length;
					
					var watershedArray = [];
					var NECPlanArray = [];
					var ORMPlaningAreaArray = [];
					for (var i = 0; i < count; i++) {
						var result = idResults[i];
						switch(result.layerId){
							case MOEMapGlobalConfig.watershedServiceLayerId:
								watershedArray.push(result);
								break;
							case MOEMapGlobalConfig.NECPlanBoundaryLayerId:
								NECPlanArray.push(result);
								break;  
							case MOEMapGlobalConfig.ORMPlaningAreaLayerId:
								ORMPlaningAreaArray.push(result);
								break;
						}	
					}
					var content0 = getContent(["NAME", "AVG_USE", "SLFLWATUSE"], watershedArray);
					var content1 = getContent(["OBJECTID"], NECPlanArray);					
					var content2 = getContent(["OBJECTID"], ORMPlaningAreaArray);
					if(content1 === "<td></td>"){
						content1 = "<td>" + MOEMapLanguage.No + "</td>";
					}else{
						content1 = "<td>" + MOEMapLanguage.Yes + "</td>"
					}
					if(content2 === "<td></td>"){
						content2 = "<td>" + MOEMapLanguage.No + "</td>";
					}else{
						content2 = "<td>" + MOEMapLanguage.Yes + "</td>"
					}
					//var content2 = getContent(["LEGAL_NAME"], upperTierArray);		
					permitRowArray[currentPermitID-1] =  permitRowArray[currentPermitID-1] + "</tr><tr>" + content0 + content1 + content2 + "</tr>";	
					refreshTable();
                }
        });
	}
	
	function getIconName(permitId){
		var iconName = "" + permitId;
		if(permitId <= 9){
			iconName = "0" + permitId;
		}
		return "http://files.ontariogovernment.ca/moe_mapping/mapping/js/PTTW_Map_Creation/images/red" + iconName + ".png";
	}
	
	function getUTMString(permitId){
		var latLng = permitLatLngArray[permitId-1];
        var lat = latLng.lat();
        var lng = latLng.lng();
        var utm = MOEMAP_TOOLS.convertLatLngtoUTM(lat, lng);
		return utm.Zone + ", " + utm.Easting + ", " + utm.Northing;
	}

	function addRemovePermits(evt){
		if(mapConfig.lotVisible){
			return;
		}
		if(mapConfig.identifying){
			return;
		}
		mapConfig.identifying = true;
		clearLocationPoints();
		/*
		if(locatorMarker){
			locatorMarker.setMap(null);
			locatorMarker = null;
		}
		if (infoWindow) {
            infoWindow.close();
        }
		for (var x = 0; x < gOverlays.length; x++) {
            (gOverlays[x]).setMap(null);
        }
        gOverlays = [];
		*/
		currentPermitID = getAvailablePermitID();
		permitIconArray[currentPermitID - 1] = true;
		permitLatLngArray[currentPermitID - 1] = evt.latLng;
		
		document.getElementById('previous_button').disabled = true;			
		var txt = mapConfig.getPromptText() + '<input type="text" id="alertName" onkeypress="return MOEMap.entsubInputSourceName(event)" name="alertName" maxlength="' + mapConfig.maxLocationNameLength + '" value="" /><br /><br />';
		//mapConfig.inputSouceName = true;
		$.prompt(txt,{
			focus:1,
			submit: function (v,m,f){
				an = m.children('#alertName');
				if(f.alertName == ""){
					an.css("border","solid #ff0000 1px");
					return false;
				}
				var str = f.alertName;
				if(str.length > mapConfig.maxLocationNameLength){
					str = str.substring(0, mapConfig.maxLocationNameLength);
				}
				//mapConfig.inputSouceName = false;
				refreshTownshipInfo(str);				
				return true;
			},
			callback: function (v,m,f) {
				if(typeof f == "undefined"){
					(permitMarkerArray[currentPermitID - 1]).setMap(null);
					permitIconArray[currentPermitID - 1] = false;
					document.getElementById('previous_button').disabled = false;
					mapConfig.identifying = false;					
				}
			},
			buttons: MOEMapLanguage.okButton//{ Ok:true }
		});
		document.getElementById("alertName").focus();

        var marker = new google.maps.Marker({
            position: evt.latLng,
			icon: getIconName(currentPermitID),
            map: gmap
        });
		permitMarkerArray[currentPermitID - 1] = marker;
        google.maps.event.addListener(marker, 'click', function () {
			if(mapConfig.lotVisible){
				return;
			}
			var permitId = getClosestPermitID(marker.position);
			removeLocation(permitId-1);
        });
	}
	
    function entsub(event) {	     
        if (event && event.keyCode == 13) {
			mapConfig.search();
        } else {
            return true;
        }
    }

	function entsubInputSourceName(event) {	     
        if (event && event.keyCode == 13) {
			//alert("OK");
			//mapConfig.search();
			return true;
        } else {
            return true;
        }
    }
    //Public method: called by locator methods and add a address Marker
    function locateMap(point, zoomlevel, content) {		
		gmap.setCenter(point);
		gmap.setZoom(zoomlevel);
		locatorMarker = new google.maps.Marker({
            position: point,
            map: gmap
        });
		var infowindow = new google.maps.InfoWindow({
			content: content    
		});
        google.maps.event.addListener(locatorMarker, 'click', function () {
			infowindow.open(gmap,locatorMarker);
        });		
		mapConfig.changeCoorStatus(point);
		
		mapConfig.displayMap();	
		
		//added by chris
    	var center = gmap.getCenter();
		google.maps.event.trigger(gmap, 'resize');
		gmap.setCenter(center); 
		gmap.setZoom(zoomlevel);
		
    }
	var gOverlays = [];
	var infoWindow = new google.maps.InfoWindow({
        content: ""
    });
	function locateMapWithMultiplePoints(pointCenter, bounds, pointList, pointNameList){
		gmap.setCenter(pointCenter);
		gmap.fitBounds(bounds);
		for(var i=0; i<pointList.length; i++){
			var marker = new google.maps.Marker({
				position: pointList[i],
				map: gmap
			});
			var content = pointNameList[i];
			(function (content, marker) {
				google.maps.event.addListener(marker, 'click', function () {
					infoWindow.setContent(content);
					infoWindow.setPosition(marker.getPosition());
					infoWindow.open(gmap);
				});
			})(content, marker)
			gOverlays.push(marker);
		}
		mapConfig.changeCoorStatus(pointList[0]);
		mapConfig.displayMap();		
		
		//added by chris
    	var center = gmap.getCenter();
		google.maps.event.trigger(gmap, 'resize');
		gmap.setCenter(center); 
		gmap.setZoom(zoomlevel);
    	
	}
	function clearLocationPoints(){
		if(locatorMarker){
			locatorMarker.setMap(null);
			locatorMarker = null;
		}
		if (infoWindow) {
            infoWindow.close();
        }
		for (var x = 0; x < gOverlays.length; x++) {
            (gOverlays[x]).setMap(null);
        }
        gOverlays = [];	
	}
	function zoomToWaterSourcesCenter(zoomlevel){
		var sumLat = 0;
		var sumLng = 0;
		var num = 0;
		for(var i=0;i<maxPermits; i++){
			if(permitIconArray[i]){
				sumLat = sumLat + (permitLatLngArray[i]).lat();
				sumLng = sumLng + (permitLatLngArray[i]).lng();
				num = num + 1;
			}
		}
		var point = new google.maps.LatLng(sumLat/num, sumLng/num);
		gmap.setCenter(point);
		gmap.setZoom(zoomlevel);
	}
    var module = {
		gmap: gmap,
		permitRowArray: permitRowArray,
		refreshTable: refreshTable,
        init: init,
        entsub: entsub,
		entsubInputSourceName: entsubInputSourceName,
		displayLotConcessionLayer: displayLotConcessionLayer,
		zoomToWaterSourcesCenter: zoomToWaterSourcesCenter,
		updateMOERegionInfo: updateMOERegionInfo,
		removeAllCreatedLocations: removeAllCreatedLocations,
		removeLocation: removeLocation,
        locateMap: locateMap,
		locateMapWithMultiplePoints: locateMapWithMultiplePoints,
		clearLocationPoints: clearLocationPoints
    };
    return module;
})();
