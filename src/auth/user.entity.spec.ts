import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

describe('User entity', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    bcrypt.hash = jest.fn();
  });

  describe('validatePassword', () => {
    it('returns true as password is valid', async () => {
      user.password = 'someHash123';
      bcrypt.hash.mockReturnValue('someHash123');
      const result = await user.validatePassword('someHash123');
      expect(result).toEqual(true);
    });

    it('returns false as password is invalid', async () => {
      user.password = 'someHash123';
      bcrypt.hash.mockReturnValue('wrongPassword');
      const result = await user.validatePassword('wrongPassword');
      expect(result).toEqual(false);
    });
  });
});
