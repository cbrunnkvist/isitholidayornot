'use strict';
var fs = require('fs');

exports['convert ical files to JSON'] = {
  setUp: function(done) {
    this.outFilename = '/tmp/' + (+new Date()).toString() + Math.random().toString() + '.txt';
    var inFilename = 'test/data/basic.ics',
      outFilename = this.outFilename,
      exec = require('child_process').exec,
      cmd = 'tools/ical2json ' + inFilename + ' > ' + outFilename;
    var child = exec(cmd, function(error, stdout, stderr) {
      if (error != null && child.exitCode > 0) {
        console.log(stderr);
        throw new Error('Error running ical2json'); // error handling & exit
      } else {
        done();
      }
    });
  },
  // tearDown:function(callback){
  //   fs.unlink(this.outFilename);
  //   callback();
  // },
  'should output valid JSON': function(test) {
    JSON.parse(fs.readFileSync(this.outFilename));
    test.done();
  },
  'should only include VEVENT objects': function(test) {
    var data = JSON.parse(fs.readFileSync(this.outFilename));

    var calendarObjects = {
      events: [],
      other: []
    };
    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        var calendarObject = data[k];
        if ('VEVENT' !== calendarObject.type) {
          calendarObjects.other.push(calendarObject);
        } else {
          calendarObjects.events.push(calendarObject);
        }
      }
    }
    test.ok(0 === calendarObjects.other.length, 'other objects found');
    test.ok(0 < calendarObjects.events.length, 'no event objects found');

    test.done();
  }
};