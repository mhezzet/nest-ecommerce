import { Document } from 'mongoose';
import { User } from './user.interface';
import { Product } from './product.interface';

export interface Order extends Document {
  owner: User;
  totalPrice: number;
  products: [
    {
      product: Product;
      quantity: number;
    },
  ];
}
