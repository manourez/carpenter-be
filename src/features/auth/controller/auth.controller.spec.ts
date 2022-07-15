import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/auth.service';
import { User } from '../../user/entity/user.entity';
import { UserService } from '../../user/service/user.service';
import { UserServiceMock } from '../../../utils';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: UserService, useClass: UserServiceMock },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    userService = moduleRef.get<UserService>(UserService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should log a user in', async () => {
      const user: User = {
        email: 'manourez@hotmail.fr',
        password: 'badaboom',
      } as User;

      jest
        .spyOn(authService, 'validateUser')
        .mockImplementation(() => Promise.resolve(user));

      expect(await authController.login({ user })).toBe(user);
    });
  });

  describe('Sign up', () => {
    it('should register a user in', async () => {
      const user: User = {
        email: 'manu@hotmail.fr',
        password: 'badaboom',
      } as User;

      jest
        .spyOn(userService, 'createUser')
        .mockImplementation(() => Promise.resolve(user));

      const response = await authController.createUser(user);

      expect(response.email).toBe(user.email);
    });
  });
});
