'use strict';

var isitholidayResponseController = require('../lib/web/isitholidayResponseController.js');

exports['override'] = {
  setUp: function(done) {
    this.responseBody = '';
    done();
  },
  'with yes': function(test) {
    this.responseBody = isitholidayResponseController('http://localhost/?answer=yes');
    test.ok(this.responseBody.match(/data-answer="true"/i), 'should use data attribute true for "yes"');
    test.done();
  },
  'with no': function(test) {
    this.responseBody = isitholidayResponseController('http://localhost/?answer=no');
    test.ok(this.responseBody.match(/data-answer="false"/i), 'should use data attribute false for "no"');
    test.done();
  },
};