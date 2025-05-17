import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { DatabaseController } from './database/database.controller';
import { DatabaseModule } from './database/database.module';
import { PagesService } from './pages/pages.service';
import { PagesController } from './pages/pages.controller';
import { PagesModule } from './pages/pages.module';
import { UsersModule } from './users/users.module';
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/roles.controller';
import { RolesModule } from './roles/roles.module';
import { AuditController } from './audit/audit.controller';
import { AuditModule } from './audit/audit.module';
import { AuditService } from './audit/audit.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditInterceptor } from './interceptors/audit.interceptor';
//import { AfterMiddleware } from './middleware/after.middleware';
@Module({
  imports: [DatabaseModule, PagesModule, UsersModule, RolesModule, AuditModule],
  controllers: [
    AppController,
    DatabaseController,
    PagesController,
    UsersController,
    RolesController,
    AuditController,
  ],
  providers: [
    AppService,
    UsersService,
    DatabaseService,
    PagesService,
    RolesService,
    AuditService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
})
export class AppModule {}
