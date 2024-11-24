const router = require('express').Router();
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const booksRoutes = require('./books.routes');
const translateRoutes = require('./translate.routes');




router.use('/auth', authRoutes);
router.use('/books', booksRoutes);
router.use('/users', usersRoutes);
router.use('/translate', translateRoutes);


module.exports = router;