import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { UserModule } from '../users/user.module';
import { UsersService } from '../users/user.service';
import { UsersController } from './users.controller';


@Module({
  imports: [
    UserModule,
    AuthModule],
  controllers: [UsersController],
})
export class CommonModule { }