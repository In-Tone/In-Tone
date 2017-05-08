'use strict'

const router = require('express').Router();

router.use('/login', require('./login'));
router.use('/users', require('./users'));
router.use('/contours', require('./contours'));

router.get('/', (req, res, next) => {
	res.sendStatus(200);
});

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;