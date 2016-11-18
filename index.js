var SlackGun = require('node-slack-mailgun');
var express = require('express');

var app = express();

app.use('/api/mailgun', SlackGun({
    slack: { hook: process.ENV.SLACK_WEBHOOK_URL },
    mailgun: { apikey: process.ENV.MAILGUN_API_KEY }
}));