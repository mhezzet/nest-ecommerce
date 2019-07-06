import { Document } from 'mongoose';
import { User } from './user.interface';

export interface Product extends Document {
  owner: User;
  title: string;
  description: string;
  image: string;
  price: string;
}
