import { IsString} from 'class-validator';

export class AuthCredentialsSignInDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
