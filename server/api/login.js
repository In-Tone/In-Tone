const router = require('express').Router();
const User = require('../../db/models/User');

router.post('/', (req, res, next) => {
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
	res.sendStatus(200);
});

router.get('/whoami', (req, res) => {
  res.send(req.user)
})

module.exports = router;