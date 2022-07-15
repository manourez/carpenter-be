import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { UserService } from '../../user/service/user.service';
import { CreateUserDto } from '../../user/dtos';
import { User } from '../../user/entity/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentification')
@Controller()
export class AuthController {
  constructor(private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return req.user;
  }

  @Post('auth/register')
  async createUser(@Body() requestBody: CreateUserDto) {
    let user: User;

    try {
      user = await this.userService.createUser(requestBody);
    } catch {
      throw new BadRequestException();
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
