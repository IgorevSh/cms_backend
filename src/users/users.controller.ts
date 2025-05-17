import { Controller, Post, Req, Delete, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/:id')
  async getUser(@Req() req: Request) {
    return await this.usersService.getUser(req.params.id);
  }
  // @Get('/me')
  // async getMyself(@Req() req: Request) {
  //   return await this.usersService.getMyself();
  // }
  @Get('/list')
  async getUsersList(@Req() req: Request) {
    return await this.usersService.getUsersList();
  }
  @Post('/auth/register')
  async authUser(@Req() req: Request) {
    return await this.usersService.authUser();
  }
  @Post('/auth/logout')
  async logoutUser(@Req() req: Request) {
    return await this.usersService.logoutUser();
  }
  @Post('/change/info/:id')
  async changeUserInfo(@Req() req: Request) {
    return await this.usersService.changeUserInfo(req.params.id, req.body.values);
  }
  @Delete('/delete/:id')
  async removeUser(@Req() req: Request) {
    return await this.usersService.removeUser(req.params.id);
  }
}
