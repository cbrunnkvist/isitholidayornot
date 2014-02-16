var http = require('http');
var server = http.createServer();

var port = Number(process.env.PORT || 5000);

var isitholidayResponseController = require('./lib/web/response-controller.js');

server.listen(port, function() {
  console.log('Listening on %d', port);
  server.on('request', function(request, response) {
    response.write(isitholidayResponseController(request.url));
    response.end('\n');
  });
});