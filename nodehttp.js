var http = require('http');
var fs = require('fs');
var _= require('underscore');
_.each(_.map(_.range(101), function(i) {return ((i<10) ? "0" : "") + i;}), function (s) {
	var options = {
	  host: 'wiki.webatlas.no',
	  port: 80,
	  path: '/webatlasapi/lib/exe/fetch.php?w=&h=&cache=cache&media=red' + s + '.png'
	};

	http.get(options, function(resp){
	  resp.on('data', function(chunk){
		fs.writeFile("red" + s + '.png', chunk, function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log("The file was saved!");
			}
		}); 
	  });
	}).on("error", function(e){
	  console.log("Got error: " + e.message);
	});
});
