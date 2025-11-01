import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Roles } from '../../database/pg/roles.entity';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;
    const roles: Roles = user?.roles;

    if (!roles) {
      throw new ForbiddenException('Роли не указаны для юзера');
    }
    const userAccess = roles?.users_access;
    if (!userAccess) {
      throw new ForbiddenException('Нет доступа к управлению пользователями');
    }

    return true;
  }
}