const db = require('../../db/index');
const router = require('express').Router();
const User = db.model('user');
const passport = require('passport'); 

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser(
  (id, done) => {
    User.findById(id)
      .then(user => {
        if (!user) console.log("No match.");
        else done(null, user)
      })
      .catch(err => {
        console.log(err);
        done(err);
      });
  }
);

passport.use(new (require('passport-local').Strategy)({usernameField:"email", passwordField:"password"},
  (email, password, done) => {
    User.findOne({where: {email}})
      .then(user => {
        if (!user) {
          console.log("No match.");
          return done(null, false, { message: 'Login incorrect' });
        }
        return user.hasMatchingPassword(password)
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


router.post('/local', (req, res, next) => {
  passport.authenticate('local', {successRedirect: '/', session: true})(req, res, next)
});

router.get('/whoami', (req, res) => {
  res.send(req.user);
})

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
  req.session.destroy();
  res.redirect('/api/login/whoami');
});

module.exports = router;