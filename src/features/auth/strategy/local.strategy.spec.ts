import { Test, TestingModule } from '@nestjs/testing';
import { LocalStrategy } from './local.strategy';
import { AuthService } from '../service/auth.service';
import { UserService } from '../../user/service/user.service';
import { UserServiceMock } from '../../../utils';

describe('LocalStrategy', () => {
  let localStrategy: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        AuthService,
        { provide: UserService, useClass: UserServiceMock },
      ],
    }).compile();

    localStrategy = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(localStrategy).toBeDefined();
  });

  describe("User's credentials validation", () => {
    it('Should return the user without password when the email and passwor are correct', async () => {
      const validatedUser = await localStrategy.validate(
        'manourez@hotmail.fr',
        'badaboom',
      );

      expect(validatedUser).toBeDefined();
      expect(validatedUser.email).toEqual('manourez@hotmail.fr');
    });

    it('Should throw an error when email or password is not coorect', async () => {
      try {
        await localStrategy.validate('manu@hotmail.fr', 'fdsfds');
      } catch (err) {
        expect(err).toBeDefined();
      }
    });
  });
});
