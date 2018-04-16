//node.js build in module HTTP
//allows node to transfer data over http
var http = require('http');

//create the server
http.createServer(function (request, response) {
	//tell the server more info
	response.writeHead(200, { 'Content-Type': 'text/html' });
	//write a response to the client
	response.write('Hello World');
	//end the response
	response.end();

}).listen(8890); //listening on port 8890