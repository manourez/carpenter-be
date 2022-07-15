import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../../user/service/user.service';
import { UserServiceMock, validatePassword } from '../../../utils';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useClass: UserServiceMock },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe("User's credentials validation", () => {
    it('Should return the user without password when the email and passwor are correct', async () => {
      const validatedUser = await authService.validateUser(
        'manourez@hotmail.fr',
        'badaboom',
      );

      expect(validatedUser).toBeDefined();
      expect(validatedUser).not.toHaveProperty('password');
    });

    it('Should throw an error when email is not coorect', async () => {
      try {
        await authService.validateUser('manu@hotmail.fr', 'fdsfds');
      } catch (err) {
        expect(err).toBeDefined();
      }
    });

    it('Should throw an error when password is not coorect', async () => {
      try {
        await authService.validateUser('manourez@hotmail.fr', 'fdsfds');
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });

  describe("User's email validation", () => {
    it('Should return the user when the email is correct', async () => {
      const user = await authService.validateEmail('manourez@hotmail.fr');

      expect(user).toBeDefined();
      expect(user.email).toEqual('manourez@hotmail.fr');
    });

    it('should throw an error when user does not exist', async () => {
      try {
        await authService.validateEmail('manu@hotmail.fr');
      } catch (err) {
        expect(err).toBeDefined();
        expect(err).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("User's password validation", () => {
    it('Should return true when the encrypted password is same as the password', async () => {
      const user = await authService.validateEmail('manourez@hotmail.fr');
      const isPasswordCorrect = validatePassword('badaboom', user.password);

      expect(isPasswordCorrect).toEqual(true);
    });

    it('Should return false when the encrypted password is different from the password', async () => {
      const user = await authService.validateEmail('manourez@hotmail.fr');
      const isPasswordCorrect = validatePassword('blablabla', user.password);

      expect(isPasswordCorrect).toEqual(false);
    });
  });
});
