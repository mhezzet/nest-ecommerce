import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    title: String,
    description: String,
    image: String,
    price: String,
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model('product', ProductSchema);

export default Product;
