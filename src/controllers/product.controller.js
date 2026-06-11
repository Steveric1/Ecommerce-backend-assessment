const Product = require('../models/Product');
const cloudinary = require('../config/cloudinary');

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: "name, price, description and category are required",
      });
    }

    const normalizedCategory = category.toLowerCase();

    const result = req.file
      ? await cloudinary.uploader.upload(req.file.path)
      : null;

    const product = await Product.create({
      name,
      price,
      description,
      image: result
        ? {
            url: result.secure_url,
            publicId: result.public_id,
          }
        : { url: null, publicId: null },
      category: normalizedCategory,
      userId: req.user.id,
    });

    return res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating product",
      error: err.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error getting product by it id',
      error: err.message,
    });
  }
}

const getProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const category = req.query.category;

    let filter = {};
    if (category) {
      filter.category = category.toLowerCase();
    }

    const products = await Product.find(filter).skip((page - 1) * limit).limit(limit);
    const totalProducts = await Product.countDocuments();
    const totalPage = Math.ceil(totalProducts / limit);

    return res.status(200).json({
      status: 'success',
      message: 'Products retrieved successfully',
      data: { products, totalPage },
    });
  } catch (err) {
    return res.status(500).json({ 
      message: 'Error getting products',
      error: err.message,
    });
  }
}

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    // extract imgUrl and userId from req
    const imgUrl = req.file?.path;
    const filename  = req.file?.filename;
    const userId = req.user.id;

    const product = await Product.findById(id);

    // check if product belong to the authenticated user
    if (!product || product.userId.toString() !== userId) {
       return res.status(403).json({ message: "Not allowed" });
    }

    // check if the product exist and update
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        image: { url: imgUrl, publicId: filename },
        category,
        userId,
      },
      { new: true },
    )
    
    return res.status(200).json({
      status: 'success',
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error updating product',
      error: err.message,
    });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const publicId = product.image?.publicId;

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting product",
      error: err.message,
    });
  }
};

module.exports = {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
};
