var fs = require('fs'),
  _ = require('lodash')._,
  util = require('util');

exports.render = function(templateName, data) {
  var source = fs.readFileSync(util.format('webroot/%s.html', templateName));
  return _.template(source, data);
};