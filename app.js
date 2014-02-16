var http = require('http');
var server = http.createServer();

var port = Number(process.env.PORT || 5000);

var isitholidayResponseHandler = require('./lib/response-handler.js');

server.listen(port, function() {
	console.log('Listening on %d', port);
	server.on('request', function(request, response) {
		response.write(isitholidayResponseHandler(request.url));
		response.end('\n');
	});
});