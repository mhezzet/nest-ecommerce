import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from '../interfaces/order.interface';
import { CreateOrderDTO } from './order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) {}

  async listOrderByUser(userId: string) {
    const orders = await this.orderModel
      .find({ owner: userId })
      .populate('owner products.product');

    return orders;
  }

  async createOrder(orderDTO: CreateOrderDTO, userID) {
    const order = await new this.orderModel({ ...orderDTO, owner: userID });

    await this.orderModel.populate(order, {
      path: 'owner products.product',
    });

    const totalPrice = order.products.reduce((total, product) => {
      return total + product.product.price * product.quantity;
    }, 0);

    order.totalPrice = totalPrice;

    await order.save();

    return order;
  }
}
