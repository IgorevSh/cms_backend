import { Injectable, Inject } from '@nestjs/common';
import { Roles } from '../database/pg/roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @Inject('ROLES')
    private rolesModel: typeof Roles,
  ) {}

  async getFullStructure(): Promise<any> {
    const roles = await this.rolesModel.findAll();
    return roles;
  }
  async getRoleById(id): Promise<any> {
    const roles = await this.rolesModel.findOne({ where: { id } });
    return roles;
  }

  async createRules(values): Promise<any> {
    return await this.rolesModel.create(values);
  }

  async upsertRules(id, values): Promise<any> {
    return await this.rolesModel.update(values, {
      where: { id },
    });
  }

  async removeRole(id): Promise<any> {
    return await this.rolesModel.destroy({
      where: { id },
    });
  }
}
