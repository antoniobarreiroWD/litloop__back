const { Router } = require('express');
const passport = require('passport');
const router = Router();
const {
  getUser,
  favoriteBooks,
  likeBook,
  dislikeBook,
} = require('../controllers/user.controller');



router.get('/:userId',passport.authenticate('jwt', { session: false }), getUser);


router.get('/favoriteBooks/:userId',passport.authenticate('jwt', { session: false }),favoriteBooks);


router.put('/likeBook/:book_id',passport.authenticate('jwt', { session: false }),likeBook);


router.delete(
  '/dislikeBook/:book_id',
  passport.authenticate('jwt', { session: false }),
  dislikeBook
);

module.exports = router;
