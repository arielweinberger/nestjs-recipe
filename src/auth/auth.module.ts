import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';         // TypeOrmModule  ( interesting)
import { UsersRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';      // PassportModule
import { JwtModule } from '@nestjs/jwt';                // JwtModule
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';    //ConfigModule, ConfigService
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
