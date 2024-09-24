const express = require('express');
const { searchBooks, showPopularBooks, showBookDetails } = require('../controllers/booksController');

const router = express.Router();


router.post('/search', searchBooks);

router.get('/popular', showPopularBooks);

router.get('/:id', showBookDetails);

module.exports = router;
