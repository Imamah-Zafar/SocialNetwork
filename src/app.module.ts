import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot(),
  MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0xuqc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`), UserModule, PostsModule],
  controllers: [AppController],
  providers: [AppService],


})
export class AppModule { }
