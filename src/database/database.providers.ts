import { Sequelize } from 'sequelize-typescript';
import { Audit } from './pg/audit.entity';
import { Pages } from './pg/page.entity';
import { Roles } from './pg/roles.entity';
import { Users } from './pg/users.entity';

export const DatabaseProviders = [
  {
    provide: 'PGSQL',
    useFactory: () => {
      const sequelizePg = new Sequelize({
        dialect: 'postgres',
        host: '127.0.0.1',
        port: '5432',
        username: 'root',
        password: '123qwe123',
        database: 'postgres',
        logging: false,
        dialectOptions: {
          connectTimeout: 60,
        },
        pool: {
          max: 10,
          min: 0,
          acquire: 120000,
          idle: 60000,
          evict: 60000,
        },
      } as any);
      sequelizePg.addModels([Audit, Pages, Roles, Users]);
      sequelizePg
        .sync()
        .then(() => {
          console.log('success');
        })
        .catch((err) => {
          console.error(err);
        });
      return sequelizePg;
    },
  },
];
