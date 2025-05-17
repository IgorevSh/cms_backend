import { Module } from '@nestjs/common';
import { AuditService } from './audit.service';
import { AuditController } from './audit.controller';

import { DatabaseModule } from '../database/database.module';
import { globalProviders } from '../database/pg/global.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AuditController],
  providers: [AuditService, ...globalProviders],
})
export class AuditModule {}
