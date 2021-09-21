import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { UsersController } from './users.controller';


@Module({
  imports: [
    UserModule,
    AuthModule],
  controllers: [UsersController],
})
export class CommonModule { }