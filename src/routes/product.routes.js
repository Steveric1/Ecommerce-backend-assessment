const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const upload = require('../config/multer');
const authMiddleware = require('../middleware/auth')

router.post(
  '',
  authMiddleware,
  upload.single('image'),
  createProduct
);
router.get('/:id', getProductById);
router.get('', getProducts);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;