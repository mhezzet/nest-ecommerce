import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import * as config from 'config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/http-exception.filter';

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
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
