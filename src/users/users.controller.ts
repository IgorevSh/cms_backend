import {
  Controller,
  Post,
  Req,
  Delete,
  Get,
  UseGuards,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { UserGuard } from './guards/user.guard';
import { LoginUserDto } from '../dto/loginUser.dto';
import { UserDTO } from '../dto/user.dto';

@UseGuards(UserGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/list')
  async getUsersList() {
    return await this.usersService.getUsersList();
  }
  @Get('/:id')
  async getUser(@Req() req: Request) {
    return await this.usersService.getUser(req.params.id);
  }
  @Post('add_worker')
  async addWorker(@Body() loginUserDTO: LoginUserDto) {
    const { name, email, password } = loginUserDTO;
    return this.usersService.addUser({
      name,
      email,
      password,
    });
  }
  @Post('/change/:id')
  async changeUserInfo(@Req() req: Request, @Body() userInfo: UserDTO) {
    return await this.usersService.changeUserInfo(req.params.id, userInfo);
  }
  @Delete('/delete/:id')
  async removeUser(@Req() req: Request) {
    return await this.usersService.removeUser(req.params.id);
  }
}
