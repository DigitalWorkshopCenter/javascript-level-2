//including the http module
var http = require('http');

//read urls
var url = require('url');



//create a server
http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type':'text/html'});
    //grab the url pieces
    var query = url.parse(request.url,true).query;
    var text = 'Year: '+query.year+' Month '+query.month;
	//end the response
	response.end(text);
}).listen(8890);  //listening on port 8890