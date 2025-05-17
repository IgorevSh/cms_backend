import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersController } from '../users/users.controller';
import { AuditService } from '../audit/audit.service';
import { DatabaseModule } from '../database/database.module';
//import { globalProviders } from '../database/pg/global.providers';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { Pages } from '../database/pg/page.entity';
import { globalProviders } from '../database/pg/global.providers';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, AuditService, ...globalProviders],
  controllers: [UsersController],
})
export class PagesModule {}
