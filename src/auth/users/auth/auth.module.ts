import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/users/constants';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from './auth.guard';
import { RefreshToken } from 'src/users/entities/refresh_token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,RefreshToken]),
    JwtModule.register({
      global: true,
      // secret: jwtConstants.secret,
      // signOptions: { expiresIn: '60s' },
    })
  ],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
