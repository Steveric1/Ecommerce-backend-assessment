const Cart = require('../models/Cart');

const getOrCreateCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
      });
    }

    let total = 0;

    const items = cart.items.map((item) => {
      const product = item.productId;

      const itemTotal = product.price * item.quantity;

      total += itemTotal;

      return {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        itemTotal,
      };
    });

    return res.status(200).json({
      status: "success",
      message: "Cart retrieved successfully",
      data: {
        items,
        total,
      },
    });

  } catch (err) {
    return res.status(500).json({
      message: "Error getting or creating cart",
      error: err.message,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const qty = quantity ? Number(quantity) : 1;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      cart.items.push({ productId, quantity: qty });
    }

    await cart.save();

    return res.status(200).json({
      status: "success",
      message: "Added to cart successfully",
      data: cart,
    });

  } catch (err) {
    return res.status(500).json({
      message: "Error adding to cart",
      error: err.message,
    });
  }
};

module.exports = {
  getOrCreateCart,
  addToCart,
};
