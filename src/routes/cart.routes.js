const express = require('express');
const router = express.Router();
const { getOrCreateCart, addToCart } = require('../controllers/cart.controller');
const authMiddleware = require('../middleware/auth');

router.get('/get-or-create-cart', authMiddleware, getOrCreateCart);
router.post('/add-to-cart', authMiddleware, addToCart);

module.exports = router;
