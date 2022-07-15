import { BadRequestException, NotFoundException } from '@nestjs/common';
import { hashPassword } from './password-hash';
import { User } from '../features/user/entity/user.entity';
import { CreateUserDto } from '../features/user/dtos';
import { UpdateResult } from 'typeorm';

export let users: User[] = [
  {
    id: 1,
    email: 'manourez@hotmail.fr',
    password: hashPassword('badaboom'),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 2,
    email: 'emmanueldjessou@arolitec.com',
    password: hashPassword('hellworld'),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  {
    id: 3,
    email: 'manourez87@gmail.com',
    password: hashPassword('holaquetal'),
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
];

export class UserServiceMock {
  async findUserByEmail(email: string): Promise<User> {
    const user = users.find((user) => user.email === email);

    if (!user) {
      throw new NotFoundException("Cet utilisateur n'existe pas !");
    }

    return Promise.resolve(user);
  }

  createUser(requestBody: CreateUserDto) {
    const { email, password: pass } = requestBody;
    const hashedPassword = hashPassword(pass);
    const user: User = {
      id: users.length,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };

    const isTaken = users.some((us) => user.email === us.email);

    if (isTaken) {
      throw new BadRequestException();
    }

    users.push(user);

    const { password, ...userWithoutPassword } = user;

    return Promise.resolve(userWithoutPassword);
  }

  deleteUser(id: number) {
    const updateResult = new UpdateResult();
    const newUsers = users.filter((user) => user.id !== id);

    users = newUsers;
    updateResult.affected = 1;

    return Promise.resolve(updateResult);
  }
}
