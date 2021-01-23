const express = require('express');

const app = express();

const port = 3005;
const config = require('./config');
const client = require('twilio')(config.accountSID, config.authToken);
app.get('/login', (req, res) => {
  client.verify
    .services(config.serviceID)
    .verifications.create({
      channel: 'sms',
      to: `+1${req.query.phonenumber}`,
    })
    .then((data) => {
      res.status(200).send(data);
    });
});

app.get('/verify', (req, res) => {
  client.verify
    .services(config.serviceID)
    .verificationChecks.create({
      to: `+1${req.query.phonenumber}`,
      code: req.query.code,
    })
    .then((data) => {
      res.status(200).send(data);
    });
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});
