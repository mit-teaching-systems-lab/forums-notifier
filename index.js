var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var request = require('superagent');


function tellSlack(slackMessage) {
  var url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return console.log('Slack integration not enabled.');
  request
    .post(url)
    .send(slackMessage)
    .set('Accept', 'application/json')
    .end();
}


var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer().any());
app.use('/api/mailgun', function(req, res) {
  console.log(req.headers);
  console.log(Object.keys(req.body));
  console.log(req.body);

  // form message
  var lines = [
    'event: ' + req.body.event,
    'recipient: ' + req.body.recipient
  ];
  ['code', 'description', 'reason', 'error'].forEach(function(key) {
    if (req.body[key]) lines.push(key + ': ' + req.body[key]);  
  });
  var text = lines.join("\n");
  
  console.log(text);
  tellSlack({
    username: "forums-notifier",
    icon_emoji: ":warning:",
    text: text
  });
  res.json({
    status: 'ok',
    text: text
  });
});


app.listen(process.env.PORT, function () {
  console.log('Listening on port: ' + process.env.PORT);
});