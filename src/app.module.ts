import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot('mongodb+srv://sonthh:W8Enkj4XMWecNzpI@api.ofu9v.mongodb.net/api?retryWrites=true&w=majority')
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
