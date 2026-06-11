const Order = require('../models/Order');
const Cart = require('../models/Cart');

const createOrderFromCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    const orderItems = [];

    cart.items.forEach((item) => {
      const product = item.productId;

      if (!product) return;

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        sellerId: product.userId,
        quantity: item.quantity,
      });
    });

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount: total,
    });

    // clear cart after order
    cart.items = [];
    await cart.save();

    return res.status(201).json({
      status: "success",
      message: "Order created successfully",
      data: order,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating order from cart",
      error: err.message,
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      status: "success",
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error getting orders",
      error: err.message,
    });
  }
};

module.exports = {
  createOrderFromCart,
  getOrder,
};
