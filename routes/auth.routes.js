const express = require('express');
const router = express.Router();
const passport = require('passport');
const { login, signup, verify } = require('../controllers/auth.controller');



router.all('/fail', (req, res) => {
  res.status(401).json({ message: 'Unauthorized' });
});

router.post('/login', passport.authenticate("login", { session: false, failureRedirect: "/api/auth/fail" }), login);

router.post('/signup', signup);

router.post('/verify', [passport.authenticate('jwt', { session: false })],  verify);

module.exports = router;