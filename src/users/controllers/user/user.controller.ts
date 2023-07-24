import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { info } from 'console';
import { AuthGuard } from 'src/auth/users/auth/auth.guard';
import { CreateUserDTO } from 'src/users/dtos/CreateUser.dto';
import { LoginDTO } from 'src/users/dtos/Login.dto';
import { UpdateUserDTO } from 'src/users/dtos/UpdateUser.dto';
import { UserService } from 'src/users/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api')
  fetchUsers() {
    return this.userService.fetchUsers();
  }

  @UseGuards(AuthGuard)
  @Get('Profile/:id')
  fetchProfile(@Param('id', ParseIntPipe) id: number) {
    return this.userService.fetchProfile(id);
  }
    
  @Post('signup')
  createUser(@Body() details: CreateUserDTO) {
    return this.userService.createUser(details);
  }
  @Post('login')
  userLogin(@Body() credentials: LoginDTO) {
    return this.userService.userLogin(credentials);
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() details: UpdateUserDTO,
  ) {
    return this.userService.updateUser(id, { ...details });
  }

  @UseGuards(AuthGuard)
  @Delete('remove/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
