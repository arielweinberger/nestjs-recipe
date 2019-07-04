import { UserRepository } from './user.repository';
import { Test } from '@nestjs/testing';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

describe('UserRepository', () => {
  let userRepository;
  const mockAuthCredentials: AuthCredentialsDto = { username: 'username', password: 'password' };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserRepository,
      ],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('signUp', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      userRepository.create = jest.fn().mockImplementation(() => ({ save }));
    });

    it('successfully signs up the user', async () => {
      save.mockResolvedValue(undefined);
      expect(userRepository.signUp(mockAuthCredentials))
        .resolves.not.toThrow();
    });

    it('throws a ConflictException as username already exists', () => {
      save.mockRejectedValue(({ code: '23505' }));
      expect(userRepository.signUp(mockAuthCredentials))
        .rejects.toThrow(ConflictException);
    });

    it('throws an InternalServerErrorException as an unexpected error has occured', () => {
      save.mockRejectedValue('unhandled');
      expect(userRepository.signUp(mockAuthCredentials))
        .rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('validateUserPassword', () => {
    let mockUser;

    beforeEach(() => {
      userRepository.findOne = jest.fn();
      mockUser = new User();
      mockUser.username = 'username';
      mockUser.validatePassword = jest.fn();
    });

    it('returns the username as validation is successful', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      mockUser.validatePassword.mockResolvedValue(true);

      expect(mockUser.validatePassword).not.toHaveBeenCalled();
      const result = await userRepository.validateUserPassword(mockAuthCredentials);
      expect(result).toEqual('username');
    });

    it('returns null as user cannot be found', async () => {
      userRepository.findOne.mockResolvedValue(null);

      expect(mockUser.validatePassword).not.toHaveBeenCalled();
      const result = await userRepository.validateUserPassword(mockAuthCredentials);
      expect(result).toBeNull();
    });

    it('returns null as password is invalid', async () => {
      userRepository.findOne.mockResolvedValue(mockUser);
      mockUser.validatePassword.mockResolvedValue(false);

      expect(mockUser.validatePassword).not.toHaveBeenCalled();
      const result = await userRepository.validateUserPassword(mockAuthCredentials);
      expect(mockUser.validatePassword).toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe('hashPassword', () => {
    it('calls bcrypt.hash to generate a hash', async () => {
      bcrypt.hash = jest.fn().mockResolvedValue('testHash');
      expect(bcrypt.hash).not.toHaveBeenCalled();
      const result = await userRepository.hashPassword('testPassword', 'testSalt');
      expect(bcrypt.hash).toHaveBeenCalled();
      expect(result).toEqual('testHash');
    });
  });
});
