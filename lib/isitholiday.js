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
		if (new Date(calEvent.start.dateTime) <= someDate && someDate <= new Date(calEvent.end.dateTime)) {
			return calEvent;
		}
	}
	return false;
};


exports.initialize = function(calendarSource) {
	var holidayDbInstance = new HolidayDb(calendarSource);
	return holidayDbInstance;
};