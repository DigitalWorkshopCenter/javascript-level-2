//including the http module
var http = require('http');
//include the filesystem module
var fileSystem = require('fs');

//create a server
http.createServer(function(request,response){
    fileSystem.readFile('test.html',function(error,data){
        response.writeHead(200,{'Content-Type':'text/html'});
        //write a response
        response.write(data);
        //end the response
        response.end();
    });
}).listen(8890);  //listening on port 8890