var http = require('http');
var server = http.createServer();

var port = Number(process.env.PORT || 5000);

var isitholidayHttpHandler = require('./lib/http-handler.js');

server.listen(port, function() {
	console.log('Listening on %d', port);
	server.on('request', isitholidayHttpHandler);
});