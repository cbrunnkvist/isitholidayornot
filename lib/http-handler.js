module.exports = function(request, response) {
	response.write('Is it holiday? ');
	response.write('Dunno.');
	response.end('\n');
};