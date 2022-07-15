import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dtos';
import { User } from '../entity/user.entity';
import { RepositoryMock, users } from '../../../utils';

describe('UserService', () => {
  let userService: UserService;

  function seedUsers() {
    users.forEach((user) => userService.createUser(user));
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: RepositoryMock<User>,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('User creation', () => {
    it('Should create a user', async () => {
      const requestBody: CreateUserDto = {
        email: users[0].email,
        password: users[0].password,
      };
      const user = await userService.createUser(requestBody);

      expect(user).toBeDefined();
      expect(user.email).toEqual(users[0].email);
      expect(user.password).not.toEqual(users[0].password);
    });

    it('Should not create a user if it already exists', async () => {
      const firstRequestBody: CreateUserDto = {
        email: users[0].email,
        password: users[0].password,
      };
      const secondRequestBody: CreateUserDto = {
        email: users[0].email,
        password: users[1].password,
      };

      await userService.createUser(firstRequestBody);

      try {
        await userService.createUser(secondRequestBody);
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });

  describe('User retrieval', () => {
    it('should return the user whose ID belongs to', async () => {
      seedUsers();

      const user = await userService.findUserByEmail('manourez@hotmail.fr');

      expect(user).toBeDefined();
      expect(user.id).toEqual(1);
      expect(user.email).toEqual('manourez@hotmail.fr');
    });

    it('should throw an error when user does not exist', async () => {
      seedUsers();

      try {
        await userService.findUserByEmail('manu@hotmail.fr');
      } catch (err) {
        expect(err).toBeDefined();
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('user removal', () => {
    it('should remove the user whose id is passed from the list', async () => {
      seedUsers();
      const result = await userService.deleteUser(1);

      expect(result.affected).toEqual(1);
    });

    it('Should throw an error when the item is not in the list', async () => {
      try {
        await userService.deleteUser(5);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
