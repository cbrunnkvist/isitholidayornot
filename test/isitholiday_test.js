'use strict';

var isitholiday = require('../lib/isitholiday.js');

exports['constructor'] = {
  setUp: function(done) {
    function nextDayDate(d) {
      return new Date(d.getTime() + 86400 * 1000);
    }
    this.NO_HOLIDAY = new Date('2011-11-11');
    this.KNOWN_HOLIDAY = nextDayDate(this.NO_HOLIDAY);
    var exampleCalendar = [{
      "summary": "Some event",
      "start": this.KNOWN_HOLIDAY,

      "end": nextDayDate(this.KNOWN_HOLIDAY)

    }];
    this.fixtures = {
      'sampleArray': exampleCalendar,
      'sampleJSONFile': '../test/data/1.json',
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
        var tmpHolidayDb,
          sourceVariant = Object.prototype.toString.call(testSource);
        test.doesNotThrow(function() {
          tmpHolidayDb = isitholiday.initialize(testSource);
        }, Error, 'initialize with ' + sourceVariant);

        test.doesNotThrow(function() {
          tmpHolidayDb.lookup(testDate);
        }, Error, 'lookup should be available with ' + sourceVariant);
        return tmpHolidayDb;
      };
      this.assertFindsKnownHoliday = function(test, testSource, testDate) {
        var holidayDb = this.testInitializationAndLookup(test, testSource, testDate);
        var result = holidayDb.lookup(testDate);
        test.notEqual(result, false);
        test.ok(result.summary);
        test.ok(result.start);
        test.ok(result.end);
      };
      this.assertCanLookupAnythingElse = function(test, testSource) {
        var holidayDb = this.testInitializationAndLookup(test, testSource, new Date());
        test.equal(holidayDb.lookup(), false);
        test.equal(holidayDb.lookup(''), false);
        test.equal(holidayDb.lookup(42), false);
        test.equal(holidayDb.lookup(this.NO_HOLIDAY), false);
      };
      done();
    },

    'should support an array of event objects': {
      'return event data for known holiday': function(test) {
        this.assertFindsKnownHoliday(test, this.fixtures.sampleArray, this.KNOWN_HOLIDAY);
        test.done();
      },
      'return false for anything else': function(test) {
        this.assertCanLookupAnythingElse(test, this.fixtures.sampleArray);
        test.done();
      },
    },
    'should accept a local JSON file as data source': {
      'return event data for known holiday': function(test) {
        this.assertFindsKnownHoliday(test, this.fixtures.sampleJSONFile, this.KNOWN_HOLIDAY);
        test.done();
      },
    },

  },

};