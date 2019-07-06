import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './product.dto';
import { AuthGuard } from '@nestjs/passport';
import { SellerGuard } from '../user/seller.guard';
import { User } from '../user/user.decorator';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async listAll() {
    return await this.productService.findAll();
  }

  @Get('/mine')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async listMine(@User() user) {
    const { id } = user;
    return await this.productService.findByOwner(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async create(@Body() product: CreateProductDTO, @User() user) {
    return await this.productService.create(product, user);
  }

  @Get(':id')
  async read(@Param('id') id) {
    return await this.productService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async update(
    @Param('id') id,
    @Body() product: CreateProductDTO,
    @User() user,
  ) {
    return await this.productService.update(id, product, user._id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async delete(@Param('id') id, @User() user) {
    return await this.productService.delete(id, user._id);
  }
}
