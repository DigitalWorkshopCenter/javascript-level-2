//node.js build in module HTTP
//allows node to transfer data over http
var http = require('http');
//read URLS easier
var url = require('url');


//create the server
http.createServer(function (request,response) {
	//tell the server more info
	response.writeHead(200,{'Content-Type':'text/html'});
	//break up the query into pieces
	var query = url.parse(request.url,true).query;
	var text = query.year+ ' '+query.month;
	//write a response to the client
	//response.write(request.url);
	//end the response
	response.end(text);

}).listen(8890); //listening on port 8890