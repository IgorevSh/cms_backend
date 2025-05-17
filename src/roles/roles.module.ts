import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { AuditService } from '../audit/audit.service';
import { globalProviders } from '../database/pg/global.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RolesController],
  providers: [RolesService, AuditService, ...globalProviders],
})
export class RolesModule {}
