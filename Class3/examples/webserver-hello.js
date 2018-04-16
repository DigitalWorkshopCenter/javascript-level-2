//including the http module
var http = require('http');


//uppercase
var upperCase = require('upper-case');

//create a server
http.createServer(function(request,response){
	response.writeHead(200,{'Content-Type':'text/html'});
	//write a response
	response.write(upperCase('Hello World!!!'));
	//end the response
	response.end();
}).listen(8890);  //listening on port 8890