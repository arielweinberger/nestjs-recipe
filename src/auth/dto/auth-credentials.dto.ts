import { Matches } from 'class-validator';

export class AuthCredentialsDto {
  username: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
}
