import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from 'src/users/dtos/Login.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { comparePass } from 'src/hashPass';
import { jwtConstants } from 'src/users/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userdb: Repository<User>,
    private jwtService: JwtService,
  ) {}
    authUser = async (credentials: LoginDTO) => {
        const user_email = await this.validateUser(credentials);
        return this.getTokens(user_email);
    }



    async getTokens(user: User) {
        const payload = { sub: user.id, username: user.name };

        return {
            acces_token: await this.jwtService.signAsync(payload, {
                secret: jwtConstants.secret,
                expiresIn: '1s',
            }),
            refresh_token: await this.jwtService.signAsync(payload, {
                secret: jwtConstants.secret,
                expiresIn: '7d'
            })
        };
    }

    private async validateUser(credentials: LoginDTO) {
        const user_email = await this.userdb.findOne({
            where: {
                email: credentials.email,
            },
        });
        console.log(user_email);
        if (!user_email) {
            throw new HttpException(
                'Enter a valid Email or SignUp to register!',
                HttpStatus.BAD_REQUEST
            );
        }
        const auhtentic = await comparePass(
            credentials.password,
            user_email.password
        );
        if (!auhtentic) {
            throw new HttpException(
                'Enter correct password',
                HttpStatus.BAD_REQUEST
            );
        }
        return user_email;
    }
}
