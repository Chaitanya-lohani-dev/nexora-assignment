import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.models.CartItem || mongoose.model('CartItem', CartItemSchema);
