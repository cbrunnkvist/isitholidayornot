TODO
====

> https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

HolidayDb lookup
----------------
* [DONE] ~~handle passing in the name of a local JSON data file~~
* handle passing in a URL e.g. https://www.google.com/calendar/ical/r39e76lluhfp7t5pmp8bacsqco%40group.calendar.google.com/public/basic.ics
* [DONE] ~~import calendar feed: http://nodetoolbox.com/packages/ical OR Atom https://www.npmjs.org/browse/keyword/atom~~
* local lazy cache to avoid hitting the feed each time

Web interface
-------------
* [skip] ~~Add routing for serving static assets~~ Use inlining of styles and scripts instead
* Hook up the HolidayDb backend
* [DONE] ~~Define develop grunt task~~
* [DONE] ~~Add test for response handler~~
* [DONE] ~~Implement the most basic http server frontend with ?answer=(yes|no) override~~
* [skip] ~~Ask Bower to pull in HTML components e.g. Bootstrap~~ Load Bootstrap from public CDN instead
* [DONE] ~~Incorporate real actual HTML instead of placeholder text~~

Deployment
----------
* Establish environment-specific app config parameters e.g. CALENDAR_ICAL_FEED and/or CALENDAR_JSON_FILE
* [DONE] ~~Figure out where & how to deploy the webapp e.g. Heroku~~
