'use strict';

var isitholiday = require('../lib/isitholiday.js');

exports['initialize'] = {
  setUp: function(done) {
    function nextDayAsTimestamp(d) {
      return new Date(d.getTime() + 86400 * 1000);
    }
    this.NO_HOLIDAY = new Date('2011-11-11');
    this.KNOWN_HOLIDAY = nextDayAsTimestamp(this.NO_HOLIDAY);
    var exampleCalendar = [{
      "summary": "Some event",
      "start": {
        "dateTime": this.KNOWN_HOLIDAY
      },
      "end": {
        "dateTime": nextDayAsTimestamp(this.KNOWN_HOLIDAY)
      }
    }];
    this.fixtures = {
      'sampleArray': exampleCalendar,
      'sampleJSONFile': 'test/data/1.json',
    };
    done();
  },
  'should require data source on the constructor': function(test) {
    test.throws(function() {
      isitholiday.initialize();
    }, Error, 'initialize should raise if args missing');

    test.done();
  },
  'constructor variants': {
    'should accept an array of event objects': function(test) {
      var tmpHolidayDb;
      test.doesNotThrow(function() {
        tmpHolidayDb = isitholiday.initialize([]);
      }, Error, 'initialize should raise if args missing');

      test.doesNotThrow(function() {
        tmpHolidayDb.lookup(new Date());
      }, Error, 'lookup should be available');
      test.done();
    },
    // 'should accept a local JSON file as data source': function(test) {
    // },
  },

  'lookup': {
    setUp: function(done) {
      this.holidayDb = isitholiday.initialize(this.fixtures.sampleArray);
      done();
    },
    'should require a valid date': {
      'return event data for known holiday': function(test) {
        var result = this.holidayDb.lookup(this.KNOWN_HOLIDAY);
        test.ok(result.summary);
        test.ok(result.start.dateTime);
        test.ok(result.end.dateTime);
        test.done();
      },
      'return false for anything else': function(test) {
        test.equal(this.holidayDb.lookup(), false);
        test.equal(this.holidayDb.lookup(''), false);
        test.equal(this.holidayDb.lookup(42), false);
        test.equal(this.holidayDb.lookup(this.NO_HOLIDAY), false);
        test.done();
      },
    },
  },
};