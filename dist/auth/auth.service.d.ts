import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private logger;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
