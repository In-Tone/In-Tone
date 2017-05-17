const db = require('../../db/index');
const router = require('express').Router();
// const User = require('../../db/models/User');
const User = db.model('user');
const passport = require('passport'); 

passport.serializeUser((user, done) => {
  console.log("serialize user", user)
  done(null, user.id);
})

passport.deserializeUser(
  (id, done) => {
    console.log("DESERIALIZE");
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
    console.log("IN PASSPORT.USE");
    User.findOne({where: {email}})
      .then(user => {
        if (!user) {
          console.log("No match.");
          return done(null, false, { message: 'Login incorrect' });
        }
        console.log("user", user.hasMatchingPassword);
        console.log("password", password);
        return user.hasMatchingPassword(password) // need to promisify!
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

  console.log('IN LOGIN LOCAL');

  passport.authenticate('local', {successRedirect: '/', session: true})(req, res, next)
  
 //  User.findOne({
  //  where: {
  //    email: req.body.email
  //  }
  // })
  //  .then(foundUser => {
  //    if (!foundUser) res.status(401).send('User not found');
  //    else if (!foundUser.hasMatchingPassword(req.body.password)) res.status(401).send('Incorrect password');
  //    else {
  //      req.login(foundUser, err => {
  //        if (err) next(err);
  //        else res.json(foundUser);
  //      })
  //    }
  //  })
  //  .catch(next);
});

router.get('/whoami', (req, res) => {
  console.log("whoami", req.user);
  res.send(req.user)
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
  res.redirect('/api/login/whoami');
});

module.exports = router;