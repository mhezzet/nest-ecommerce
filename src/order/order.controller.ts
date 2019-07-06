import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.decorator';
import { CreateOrderDTO } from './order.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async listOrder(@User() user) {
    return this.orderService.listOrderByUser(user.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createOrder(@User() user, @Body() order: CreateOrderDTO) {
    return this.orderService.createOrder(order, user.id);
  }
}
