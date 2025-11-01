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
  async save2FACode(
    userId: number,
    code: string,
    expires: string,
  ): Promise<any> {
    await this.userModel.update(
      { twoFactorCode: code, twoFactorExpiresAt: expires },
      { where: { id: userId } },
    );
  }
  async delete2FACode(userId: number): Promise<any> {
    await this.userModel.update(
      { twoFactorCode: null, twoFactorExpiresAt: null },
      { where: { id: userId } },
    );
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
      include: [Roles],
    });
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
  async addUser(values: any) {
    return await this.userModel.create(values);
  }
}
