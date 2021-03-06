const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const volleyball = require('volleyball');
const db = require('../db/index.js'); 

// if (!global.it) {
  app.use(volleyball);
// }

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '2mb'}));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sync()
  .then(() => {
    app.listen(port, function () {
      console.log("Knock, knock");
      console.log("Who's there?");
      console.log("Your server, listening on port 3000");
    });
  })

app.use(session({
	secret: process.env.SESSION_SECRET || 'remove me',
	resave: false, // does not force session to be saved to store
	saveUninitialized: false // does not force new sessions to be saved to the store
}));

// app.use(require('cookie-session')({
//     name: 'session',
//     keys: [process.env.SESSION_SECRET || 'an insecure secret key'],
// }));

// app.use('/api', function (req, res, next) {
//     console.log("session", req.session);
//     next();
// })

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./api/index.js'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

module.exports = app
