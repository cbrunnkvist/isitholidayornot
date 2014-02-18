/*
 * isitholiday
 * https://github.com/cbrunnkvist/isitholiday
 *
 * Copyright (c) 2014 Conny Brunnkvist
 * Licensed under the MIT license.
 */

'use strict';

function HolidayDb(eventsArray) {
  if (!eventsArray) {
    throw new Error('Calendar source arg invalid');
  }
  this.calendarEvents = eventsArray;
}
HolidayDb.prototype.lookup = function(someDate) {
  for (var i = 0; i < this.calendarEvents.length; i++) {
    if (dateCoincidesWithEvent(someDate, this.calendarEvents[i])) {
      return this.calendarEvents[i];
    }
  }
  return false;
};

function dateCoincidesWithEvent(date, event) {
  date = new Date(date);
  return (new Date(event.start) <= date && date <= new Date(event.end));
}

function ArrayHolidayDb(eventsArray) {
  HolidayDb.call(this, eventsArray);
}
ArrayHolidayDb.prototype = Object.create(HolidayDb.prototype);
ArrayHolidayDb.constructor = ArrayHolidayDb;

function JsonHolidayDb(jsonFilename) {
  var dataFromJson = require(jsonFilename);
  var eventsArray = [];
  for (var k in dataFromJson) {
    if (dataFromJson.hasOwnProperty(k)) {
      eventsArray.push(dataFromJson[k]);
    }
  }
  HolidayDb.call(this, eventsArray);
}
JsonHolidayDb.prototype = Object.create(HolidayDb.prototype);
JsonHolidayDb.constructor = JsonHolidayDb;

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