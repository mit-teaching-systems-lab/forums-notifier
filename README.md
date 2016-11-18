# forums-notifier
Tiny app to route Webhooks from Mailgun to Slack

### Setup
- Get a Webhook URL from Slack for the channel you want.  Set this as `SLACK_WEBHOOK_URL`.
- Deploy to Heroku.
- In the Mailgun UI, set the Webhooks to `https://yourproject.herokuapp.com/api/mailgun` for the events you care about.
- Test from the Mailgun UI and see if they show up in Slack.
