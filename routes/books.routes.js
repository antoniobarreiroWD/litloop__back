const express = require('express');
const router = express.Router();
const { searchBooks, showPopularBooks, showBookDetails } = require('../controllers/books.controller');



router.post('/search', searchBooks);

router.get('/popular', showPopularBooks);

router.get('/:id', showBookDetails);

module.exports = router;
