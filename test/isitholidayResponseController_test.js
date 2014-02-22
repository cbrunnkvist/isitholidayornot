'use strict';

var isitholidayResponseController = require('../lib/web/isitholidayResponseController.js');

exports['override'] = {
  setUp: function(done) {
    this.responseBody = '';
    done();
  },
  'with yes': function(test) {
    this.responseBody = isitholidayResponseController('http://localhost/?answer=yes');
    test.ok(this.responseBody.match(/class=.*holiday-true/i), 'should apply CSS class holiday-true for "yes"');
    test.done();
  },
  'with no': function(test) {
    this.responseBody = isitholidayResponseController('http://localhost/?answer=no');
    test.ok(this.responseBody.match(/class=.*holiday-false/i), 'should apply CSS class holiday-false for "no"');
    test.done();
  },
};