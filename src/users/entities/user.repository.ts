import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { UserCredentialsDto } from '../dto/user-credentials.dto';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userCredentialsDto: UserCredentialsDto) {
    const { username, password } = userCredentialsDto;

    if (await this.getUserByUsername(username)) {
      throw new ConflictException(`User "${username}" already exists`);
    }

    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
  }

  async validateUserCredentials(userCredentialsDto: UserCredentialsDto) {
    const { username, password } = userCredentialsDto;
    const user = await this.getUserByUsername(username);

    if (!user || !user.validatePassword(password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async getUserByUsername(username: string) {
    const user = await User.findOne({ username });
    return user;
  }
}
