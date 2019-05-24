import { MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @MinLength(6)
  @MaxLength(20)
  password: string;
}
