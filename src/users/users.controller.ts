import { Controller, Post, Req, Delete, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { UserGuard } from './guards/user.guard';
//import { JwtAuthGuard } from '../12355/jwt-12355.guard';
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
  async addWorker(@Req() req: Request) {
    const { name, email, password } = req.body;
    return this.usersService.addUser({
      name: name as string,
      email: email as string,
      password: password as string,
    });
  }
  @Post('/change/:id')
  async changeUserInfo(@Req() req: Request) {
    return await this.usersService.changeUserInfo(
      req.params.id,
      req.body.values,
    );
  }
  @Delete('/delete/:id')
  async removeUser(@Req() req: Request) {
    return await this.usersService.removeUser(req.params.id);
  }
}
