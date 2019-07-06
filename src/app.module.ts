import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
