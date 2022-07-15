import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dtos';
import { hashPassword } from '../../../utils';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async createUser(requestBody: CreateUserDto) {
    const { email, password } = requestBody;
    const hashedPassword = hashPassword(password);
    const user: User = this.repository.create({
      email,
      password: hashedPassword,
    });

    return this.repository.save(user);
  }

  async findUserByEmail(email: string) {
    const user = await this.repository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException("Cet utilisateur n'existe pas !");
    }

    return user;
  }

  deleteUser(id: number) {
    return this.repository.softDelete(id);
  }
}
