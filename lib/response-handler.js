function renderYesOrNo(fact) {
  var PLACEHOLDER_CONTENT = {
    true: 'Yup.',
    false: 'Nope.'
  };
  return 'Is it holiday? ' + PLACEHOLDER_CONTENT[fact === true];
}

function checkAnswer(parsedUrl) {
  var override = parsedUrl.query.answer;

  if (['yes', 'no'].indexOf(override) >= 0) {
    return renderYesOrNo('yes' === override);
  } else {
    return renderYesOrNo(false); // tack on HolidayDb response somewhere around here?
  }
}

function handleRequest(forUrl) {
  var parsedUrl = require('url').parse(forUrl, true);
  return checkAnswer(parsedUrl);
}

module.exports = handleRequest;