import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from 'src/users/users.service';
import { globalProviders } from '../database/pg/global.providers';
import { LocalStrategy } from './strategies/local.strategy';
import { UserSerializer } from './user.serializer';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [
    ...globalProviders,
    AuthService,
    UsersService,
    LocalStrategy,
    UserSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
