import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from '../common/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {  User, UserSchema} from './schema/user.schema';
import { AuthModule } from '../auth/auth.module';
import { PostsModule } from 'src/posts/posts.module';
import { PostsService } from 'src/posts/posts.service';
import { CommonModule } from '../common/common.module';


@Module({
 
  imports: [
  
    PostsModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports:[UsersService],


})
export class UserModule {}