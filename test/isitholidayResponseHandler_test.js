'use strict';

var isitholidayResponseHandler = require('../lib/response-handler.js');

exports['override'] = {
  setUp: function(done) {
    this.responseBody = '';
    done();
  },
  'with yes': function(test) {
    this.responseBody = isitholidayResponseHandler('http://localhost/?answer=yes');
    test.ok(this.responseBody.match(/\? y/i), 'should show y(es)');
    test.done();
  },
  'with no': function(test) {
    this.responseBody = isitholidayResponseHandler('http://localhost/?answer=no');
    test.ok(this.responseBody.match(/\? n/i), 'should show n(o)');
    test.done();
  },
};