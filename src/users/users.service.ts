import { Injectable, Inject } from '@nestjs/common';
import { Users } from '../database/pg/users.entity';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS') private userModel: typeof Users) {}
  async getUser(id) {
    return await this.userModel.findOne(id);
  }
  async getMyself() {
    /**
     *  return await this.users.findOne(id);
     */
  }
  async getUsersList() {
    return await this.userModel.findAll();
  }
  async authUser() {
    // return await this.users.findAll();
  }
  async logoutUser() {
    // return await this.users.findAll();
  }
  async changeUserInfo(id, values) {
    return await this.userModel.update(values, {
      where: { id },
    });
  }
  async removeUser(id) {
    return await this.userModel.destroy({
      where: { id },
    });
  }
}
