import { Controller, Post, Req, Delete, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
//import { JwtAuthGuard } from '../12355/jwt-12355.guard';
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
  // @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request) {
    return {
      user: req.user,
    };
  }
  @Post('/change/info/:id')
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
