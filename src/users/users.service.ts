import { Injectable, Inject } from '@nestjs/common';
import { Users } from '../database/pg/users.entity';
import { Op } from 'sequelize';
import { Roles } from '../database/pg/roles.entity';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS') private userModel: typeof Users) {}
  async getUser(id) {
    return await this.userModel.findOne(id);
  }

  async findByEmail(email: string): Promise<any> {
    return this.userModel.findOne({
      where: { mail: email },
      raw: true,
    });
  }
  async updateAuthKey(userId: number, key: string | null) {
    await this.userModel.update({ auth_key: key }, { where: { id: userId } });
  }

  async getUsersList() {
    return await this.userModel.findAll();
  }
  async findByMailOrPhone(login: string) {
    return this.userModel.findOne({
      where: {
        [Op.or]: [{ mail: login }, { phone: login }],
      },
      raw: true,
      //  include: [Roles],
    });
  }

  async findById(id: number) {
    return this.userModel.findByPk(id, { raw: true });
  }

  async updateRefreshToken(id: number, token: string) {
    await this.userModel.update({ refresh_token: token }, { where: { id } });
  }
  async addUser(values: any): Promise<any> {}
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
