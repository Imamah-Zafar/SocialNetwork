import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { EventsGateway } from './events/events.gateway';


@Module({
  imports: [ConfigModule.forRoot(),
  MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0xuqc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`), UserModule, PostsModule,CommonModule],
  controllers: [AppController],
  providers: [AppService,EventsGateway],
  


})
export class AppModule { }
