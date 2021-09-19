import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  User, UserSchema} from './schema/user.schema';
import { PostsModule } from 'src/posts/posts.module';


@Module({
 
  imports: [
    PostsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports:[UsersService],


})
export class UserModule {}