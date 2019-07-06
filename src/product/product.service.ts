import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/interfaces/product.interface';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async findAll() {
    return await this.productModel.find().populate('owner');
  }

  async findOne(id: string): Promise<Product> {
    return await this.productModel.findOne({ _id: id }).populate('owner');
  }

  async findByOwner(userID: string) {
    const users = await this.productModel
      .find({ owner: userID })
      .populate('owner');

    return users;
  }

  async create(productDTO: CreateProductDTO, user): Promise<Product> {
    const product = await this.productModel.create({
      ...productDTO,
      owner: user._id,
    });

    return product.populate('owner');
  }

  async update(
    id: string,
    productDTO: UpdateProductDTO,
    userID: string,
  ): Promise<Product> {
    const product = await this.productModel.findOne({ _id: id });
    if (userID.toString() !== product.owner._id.toString()) {
      throw new HttpException(
        'u dont own this product',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await product.updateOne(productDTO, { new: true });

    return product;
  }

  async delete(id: string, userID: string): Promise<Product> {
    const product = await this.productModel.findOne({ _id: id });
    if (userID.toString() !== product.owner._id.toString()) {
      throw new HttpException(
        'u dont own this product',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await product.remove();
    return product;
  }
}
