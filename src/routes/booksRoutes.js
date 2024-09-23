const express = require('express');
const { searchBooks, showPopularBooks, showBookDetails } = require('../controllers/booksController');

const router = express.Router();


router.get('/', searchBooks);

router.get('/popular', showPopularBooks);

router.get('/:id', showBookDetails);

module.exports = router;
