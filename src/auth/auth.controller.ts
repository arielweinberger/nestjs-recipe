import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Res() response: Response,
    @Body() authCredentialsDto: AuthCredentialsDto,
  ) {
    const accessToken = await this.authService.signIn(authCredentialsDto);
    response.set('Authorization', `Bearer ${accessToken}`);
    response.send({ accessToken });
  }
}
