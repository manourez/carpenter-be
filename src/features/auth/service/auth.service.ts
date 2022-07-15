import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { User } from '../../user/entity/user.entity';
import { validatePassword } from '../../../utils';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, pass: string) {
    const user = await this.validateEmail(email);
    const isMatch = validatePassword(pass, user.password);

    if (!isMatch)
      throw new BadRequestException('Le mot de passe est incorrect !');

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async validateEmail(email: string) {
    let user: User;

    try {
      user = await this.userService.findUserByEmail(email);
    } catch {
      throw new NotFoundException("Cet utilisateur n'existe pas !");
    }

    return user;
  }
}
