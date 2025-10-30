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
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { globalProviders } from './database/pg/global.providers';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    DatabaseModule,
    PagesModule,
    UsersModule,
    PassportModule.register({ session: true }),
    RolesModule,
    AuditModule,
    AuthModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 20,
        },
      ],
    }),
  ],
  controllers: [
    AppController,
    DatabaseController,
    PagesController,
    UsersController,
    RolesController,
    AuditController,
    //AuthController,
  ],
  providers: [
    ...globalProviders,
    AppService,
    UsersService,
    DatabaseService,
    PagesService,
    RolesService,
    // AuthService,
    AuditService,
  ],
})
export class AppModule {}
