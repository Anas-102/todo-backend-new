import {
  HttpException,
  HttpStatus,
  Injectable,
  Options,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDTO } from 'src/users/dtos/UpdateUser.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/users/dtos/Login.dto';
import { AuthService } from 'src/auth/users/auth/auth.service';
import { Hashed } from 'src/hashPass';
import { AuthGuard } from 'src/auth/users/auth/auth.guard';
import { RefreshToken } from 'src/users/entities/refresh_token.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userdb: Repository<User>,
    @InjectRepository(RefreshToken)
    private rtdb: Repository<RefreshToken>,
    private authservice: AuthService,
  ) {}
  private userDetails = [];

  async fetchUsers() {
    return await this.userdb.find();
  }

  async fetchProfile(id: number) {
    return await this.userdb.findOne({ where: { id: id } });
  }

  createUser = async (info: CreateUserDTO) => {
    await this.validateEmail(info.email);
    info.password = await Hashed(info.password);
    const data = await this.userdb.save(this.userdb.create(info));
    const credentials = {
      email: info.email,
      password: info.password,
    };
    const tokens = this.authservice.getTokens(data);
    const rt = (await tokens).refresh_token;
    await this.rtdb.save(this.rtdb.create({ Token: rt, user: data}));
    return {
      access_token: (await tokens).acces_token,
      refresh_token: (await tokens).refresh_token,
      data,
    };
  };
  userLogin = async (credentials: LoginDTO) => {
    const rt = (await this.authservice.authUser(credentials)).refresh_token;
    const info = await this.userdb.findOne({
      relations: { refresh: true },
      where: { email: credentials.email },
    });
    const refresh = await this.rtdb.findOne({relations:{user:true},where:{user:info}})
    console.log(refresh);
    refresh.Token=rt
    return await this.rtdb.save(refresh)
  };

  updateUser = async (user_id: number, info: UpdateUserDTO) => {
    if (info.email) {
      await this.validateEmail(info.email);
    }
    if (info.password) {
      info.password = await Hashed(info.password);
    }
    const updated = await this.userdb.update(user_id, { ...info });
    return info;
  };

  deleteUser = async (user_id: number) => {
    const deleted = await this.userdb.delete(user_id);
    if (!deleted.affected) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return 'User Deleted';
  };

  private async validateEmail(emailID: string) {
    const exists = await this.userdb.findOne({
      where: {
        email: emailID,
      },
    });
    if (exists)
      throw new HttpException('Email already Exists', HttpStatus.BAD_REQUEST);
    return false;
  }
  // createUser(info: CreateUserDTO) {
  //   const data= this.userdb.create(info);
  //   this.userdb.save(data);
  //   //this.userDetails.push(info);
  //   return data;
  // }
}
