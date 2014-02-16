'use strict';


/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/
var isitholiday = require('../lib/isitholiday.js');

exports['initialize'] = {
  'should require data source on the constructor': function(test) {
    test.throws(function() {
      isitholiday.initialize();
    }, Error, 'initialize should raise if args missing');

    var tmpHolidayDb = isitholiday.initialize([]);
    test.ok('function' === typeof tmpHolidayDb.lookup);
    test.done();
  },
};

exports['lookup'] = {
  setUp: function(done) {
    this.noHoliday = new Date('2011-11-11');
    this.knownHoliday = new Date(this.noHoliday.getTime() + 86400 * 1000);
    this.exampleCalendar = [{
      "summary": "Some event",
      "start": {
        "dateTime": this.knownHoliday
      },
      "end": {
        "dateTime": new Date(this.knownHoliday.getTime() + 86400 * 1000)
      }
    }];
    this.holidayDb = isitholiday.initialize(this.exampleCalendar);
    done();
  },
  'should require a valid date': {
    'return event data for known holiday': function(test) {
      var result = this.holidayDb.lookup(this.knownHoliday);
      test.ok(result.summary);
      test.ok(result.start.dateTime);
      test.ok(result.end.dateTime);
      test.done();
    },
    'return false for anything else': function(test) {
      test.equal(this.holidayDb.lookup(), false);
      test.equal(this.holidayDb.lookup(''), false);
      test.equal(this.holidayDb.lookup(42), false);
      test.done();
    },
  },
};