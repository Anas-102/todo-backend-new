import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthModule } from 'src/auth/users/auth/auth.module';
import { AuthService } from 'src/auth/users/auth/auth.service';
import { AuthGuard } from 'src/auth/users/auth/auth.guard';
import { RefreshToken } from './entities/refresh_token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]),
    // JwtModule.register({
    //   global: true,
    //   secret: jwtConstants.secret,
    //   signOptions: { expiresIn: '60s' },
    // }),
    //AuthModule
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, AuthGuard],
})
export class UserModule {}
