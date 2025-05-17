import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { AuditService } from '../audit/audit.service';
import { globalProviders } from '../database/pg/global.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, AuditService, ...globalProviders],
})
export class UsersModule {}
