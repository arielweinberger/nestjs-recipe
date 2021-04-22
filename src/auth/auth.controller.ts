import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsSignInDto } from './dto/auth-credentials-signin.dto';
import { AuthService } from './auth.service';
import { AuthCredentialsSignUpDto } from './dto/auth-credentials-signup.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsSignUpDto: AuthCredentialsSignUpDto): Promise<void> {
    return this.authService.signUp(authCredentialsSignUpDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsSignInDto: AuthCredentialsSignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsSignInDto);
  }
}
