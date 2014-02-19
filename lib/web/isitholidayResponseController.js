var templates = require('./templates');

function renderYesOrNoView(fact) {
  return templates.render('index', {
    'answer': fact
  });
}

function checkAnswer(parsedUrl) {
  var override = parsedUrl.query.answer;

  if (['yes', 'no'].indexOf(override) >= 0) {
    return renderYesOrNoView('yes' === override);
  } else {
    return renderYesOrNoView(false); // tack on HolidayDb response somewhere around here?
  }
}

function responseController(forUrl) {
  var parsedUrl = require('url').parse(forUrl, true);
  return checkAnswer(parsedUrl);
}

module.exports = responseController;