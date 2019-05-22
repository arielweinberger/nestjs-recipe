import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './entities/user.repository';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userCredentialsDto: UserCredentialsDto) {
    return this.userRepository.createUser(userCredentialsDto);
  }

  async signIn(userCredentialsDto: UserCredentialsDto) {
    const user = await this.userRepository.validateUserCredentials(userCredentialsDto);

    const jwtPayload = { username: user.username };
    const token = await this.jwtService.sign(jwtPayload);
    return token;
  }

  async validateUser({ username }): Promise<User> {
    return await this.userRepository.getUserByUsername(username);
  }
}
