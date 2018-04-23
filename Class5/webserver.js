//node.js build in module HTTP
//allows node to transfer data over http
var http = require('http');
//read URLS easier
var url = require('url');
//talk to the file system
var fileSystem = require('fs');



//create the server
http.createServer(function (request,response) {
    //read a file!
    fileSystem.readFile('ajax-inclass.html',function(error,data){
        //tell the server more info
				response.writeHead(200, { 'Content-Type': 'text/html' });
				//write the data, which has the file contents in it
				response.write(data);
				//end the response
				response.end();
    });
}).listen(8890); //listening on port 8890