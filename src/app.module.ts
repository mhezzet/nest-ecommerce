import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import * as config from 'config';

@Module({
  imports: [
    MongooseModule.forRoot(
      config.get('DB_URI', {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
      }),
    ),
    UserModule,
    OrderModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
