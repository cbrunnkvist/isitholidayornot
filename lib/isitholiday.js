/*
 * isitholiday
 * https://github.com/cbrunnkvist/isitholiday
 *
 * Copyright (c) 2014 Conny Brunnkvist
 * Licensed under the MIT license.
 */

'use strict';

function HolidayDb(calendarSource) {
  if (!calendarSource) {
    throw new Error('Calendar source arg missing');
  }
  this.calendarSource = calendarSource;
}
HolidayDb.prototype.lookup = function(someDate) {
  someDate = new Date(someDate);
  for (var i = 0; i < this.calendarSource.length; i++) {
    var calEvent = this.calendarSource[i];
    if (new Date(calEvent.start) <= someDate && someDate <= new Date(calEvent.end)) {
      return calEvent;
    }
  }
  return false;
};

function ArrayHolidayDb(calendarSource) {
  HolidayDb.call(this, calendarSource);
}
ArrayHolidayDb.prototype = Object.create(HolidayDb.prototype);
// ArrayHolidayDb.constructor = ArrayHolidayDb;

function JsonHolidayDb(jsonFilename) {
  var dataFromJson = require(jsonFilename);
  var calendarSource = [];
  for (var k in dataFromJson) {
    if (dataFromJson.hasOwnProperty(k)) {
      var o = dataFromJson[k];
      if ('VEVENT' === o.type) {
        o.start = new Date(o.start);
        o.end = new Date(o.end);
        calendarSource.push(o);
      }
    }
  }
  HolidayDb.call(this, calendarSource);
}
JsonHolidayDb.prototype = Object.create(HolidayDb.prototype);

exports.initialize = function(calendarSource) {
  var holidayDbInstance;

  switch (Object.prototype.toString.call(calendarSource)) {
    case '[object Array]':
      holidayDbInstance = new ArrayHolidayDb(calendarSource);
      break;
    case '[object String]':
      holidayDbInstance = new JsonHolidayDb(calendarSource);
      break;
    default:
      throw new Error('Calendar source arg missing');
  }

  return holidayDbInstance;
};