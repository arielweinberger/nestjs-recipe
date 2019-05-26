import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;

    if (await this.getUserByUsername(username)) {
      throw new ConflictException(`User "${username}" already exists`);
    }

    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
  }

  async validateUserCredentials(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;
    const user = await this.getUserByUsername(username);

    if (!user || !user.validatePassword(password)) {
      return false;
    } else {
      return user;
    }
  }

  async getUserByUsername(username: string) {
    const user = await User.findOne({ username });
    return user;
  }
}
