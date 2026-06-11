const express = require('express');
const router = express.Router();
const { createOrderFromCart, getOrder } = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth');

router.post('/from-cart', authMiddleware, createOrderFromCart);
router.get('', authMiddleware, getOrder);

module.exports = router;
