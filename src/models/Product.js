const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: {
      url: { type: String, default: null },
      publicId: { type: String, default: null },
    },
    category: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema);
