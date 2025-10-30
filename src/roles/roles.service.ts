import { Injectable, Inject } from '@nestjs/common';
import { Roles } from '../database/pg/roles.entity';
import sequelize, { Op } from 'sequelize';

@Injectable()
export class RolesService {
  constructor(
    @Inject('ROLES')
    private rolesModel: typeof Roles,
  ) {}

  async getFullStructure(): Promise<any> {
    const roles = await this.rolesModel.findAll({
      where: {
        id: {
          [Op.ne]: 1,
        },
      },
    });
    return roles;
  }
  async getRoleById(roleId): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [results] = await this.rolesModel.sequelize.query(
      `SELECT
           r.*,
           (
               SELECT COALESCE(
                              JSON_AGG(
                                      JSON_BUILD_OBJECT(
                                              'id', u.id,
                                              'username', u.name,
                                    
                                              'role_id', u.role_id
                                      )
                              ),
                              '[]'::JSON
                      )
               FROM users u
               WHERE u.role_id = r.id
           ) AS users
       FROM roles r
       WHERE r.id = :roleId;`,
      {
        replacements: { roleId },
        type: sequelize.QueryTypes.SELECT,
      },
    );
    return results;
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
