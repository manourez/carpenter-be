import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
