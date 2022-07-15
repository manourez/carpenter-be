import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { User } from 'src/features/user/entity/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    let user: Partial<User>;

    try {
      user = await this.authService.validateUser(email, password);
    } catch {
      throw new UnauthorizedException();
    }

    return user;
  }
}
