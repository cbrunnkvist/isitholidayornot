'use strict';

var isitholiday = require('../lib/isitholiday.js');

exports['constructor'] = {
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
  'variants': {
    setUp: function(done) {
      this.testInitializationAndLookup = function(test, testSource, testDate) {
        var tmpHolidayDb;
        test.doesNotThrow(function() {
          tmpHolidayDb = isitholiday.initialize(testSource);
        }, Error, 'initialize should raise if args missing');

        test.doesNotThrow(function() {
          tmpHolidayDb.lookup(testDate);
        }, Error, 'lookup should be available');
        return tmpHolidayDb;
      };
      this.testLookupKnownHoliday = function(test, testSource, testDate) {
        var holidayDb = this.testInitializationAndLookup(test, testSource, testDate);
        var result = holidayDb.lookup(this.KNOWN_HOLIDAY);
        test.ok(result.summary);
        test.ok(result.start.dateTime);
        test.ok(result.end.dateTime);
      };
      this.testLookupAnythingElse = function(test, testSource, testDate) {
        var holidayDb = this.testInitializationAndLookup(test, testSource, testDate);
        test.equal(holidayDb.lookup(), false);
        test.equal(holidayDb.lookup(''), false);
        test.equal(holidayDb.lookup(42), false);
        test.equal(holidayDb.lookup(this.NO_HOLIDAY), false);
      };
      done();
    },

    'should support an array of event objects': {
      'return event data for known holiday': function(test) {
        this.testLookupKnownHoliday(test, this.fixtures.sampleArray, new Date());
        test.done();
      },
      'return false for anything else': function(test) {
        this.testLookupAnythingElse(test, this.fixtures.sampleArray, new Date());
        test.done();
      },
    },
    // },
    // 'should accept a local JSON file as data source': function(test) {
    //   test.done();
    // },

  },

};