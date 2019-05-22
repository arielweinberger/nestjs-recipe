import { Controller, Post, Body, Res, Get, UseGuards } from '@nestjs/common';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  signUp(@Body() userCredentialsDto: UserCredentialsDto) {
    return this.usersService.signUp(userCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Res() response: Response,
    @Body() userCredentialsDto: UserCredentialsDto,
  ) {
    const accessToken = await this.usersService.signIn(userCredentialsDto);
    response.set('Authorization', `Bearer ${accessToken}`);
    response.send({ accessToken });
  }
}
