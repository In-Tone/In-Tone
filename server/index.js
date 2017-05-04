const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const volleyball = require('volleyball');

app.use(volleyball);

express.static(path.join(__dirname, '../public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("Knock, knock");
  console.log("Who's there?");
  console.log("Your server, listening on port 3000");
});

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false, // does not force session to be saved to store
	saveUnitialized: false // does not force new sessions to be saved to the store
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/api', require('./api/api'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});
