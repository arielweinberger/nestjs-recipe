import { JwtStrategy } from './jwt.strategy';
import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';
import * as config from 'config';

config.get = jest.fn();

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

process.env.JWT_SECRET = 'someJwtSecretForTesting';

const mockUser = { username: 'Test user' };

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        { provide: JwtStrategy, useClass: JwtStrategy },
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('validate', () => {
    it('validates and returns user based on JWT payload', () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      expect(userRepository.findOne).not.toHaveBeenCalled();
      const result = jwtStrategy.validate({ username: 'Test user' });
      expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'Test user' });
      expect(result).resolves.toEqual(mockUser);
    });

    it('throws an unauthorized exception as user cannot not be found', () => {
      userRepository.findOne.mockResolvedValue(null);
      expect(jwtStrategy.validate({ username: 'Test user not found' })).rejects.toThrow(UnauthorizedException);
    });
  });
});
