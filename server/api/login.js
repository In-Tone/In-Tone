const db = require('../../db/index');
const router = require('express').Router();
// const User = require('../../db/models/User');
const User = db.model('user');
const passport = require('passport')

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser(
  (id, done) => {
    User.findById(id)
      .then(user => {
        if (!user) console.log("No match.");
        else console.log("Here is the user: ", user);
        done(null, user)
      })
      .catch(err => {
        console.log(err);
        done(err);
      });
  }
);

// require.('passport-local').Strategy => a function we can use as a constructor, that takes in a callback
passport.use(new (require('passport-local').Strategy)(
  (email, password, done) => {
    User.findOne({where: {email}})
      .then(user => {
      	console.log("user", user);
        if (!user) {
          console.log("No match.");
          return done(null, false, { message: 'Login incorrect' });
        }
        return user.authenticate(password)
          .then(ok => {
            if (!ok) {
              console.log("Bad password.")
              return done(null, false, { message: 'Login incorrect' })
            }
            console.log('Login successful', email, user.id)
            done(null, user)
          })
      })
      .catch(done)
  }
))

router.post('/', (req, res, next) => {
		console.log("req.user", req.user);
	User.findOne({
		where: {
			email: req.body.email
		}
	})
		.then(foundUser => {
			if (!foundUser) res.status(401).send('User not found');
			else if (!foundUser.hasMatchingPassword(req.body.password)) res.status(401).send('Incorrect password');
			else {
				req.login(foundUser, err => {
					if (err) next(err);
					else res.json(foundUser);
				})
			}
		})
		.catch(next);
});

router.post('/signup', (req, res, next) => {
	User.create(req.body)
		.then(createdUser => {
			req.login(createdUser, err => {
				if (err) next(err);
				else res.json(createdUser);
			})
		})
		.catch(next);
});

router.post('/logout', (req, res, next) => {
	req.logout();
	console.log("req.user after logout", req.user);
	res.sendStatus(200);
});

router.get('/whoami', (req, res) => {
  res.send(req.user)
})

module.exports = router;