const express = require('express');
const { translateText } = require('../controllers/translate.controller');
const rateLimitMiddleware = require('../middleware/rateLimit.middleware');

const router = express.Router();


router.post('/', rateLimitMiddleware, translateText);

module.exports = router;
