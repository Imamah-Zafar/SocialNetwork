import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/users/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constant';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService, LocalStrategy,JwtStrategy],
  imports: [
    forwardRef(() =>UserModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000000s' },
    }),],
  exports: [AuthService]
})
export class AuthModule { }
