import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {  User, UserSchema} from './schema/user.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
 
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
   
  ],
  providers: [UsersService],
  exports:[UsersService],
  controllers: [UsersController],

})
export class UserModule {}