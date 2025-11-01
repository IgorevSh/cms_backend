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
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;
    const roles: Roles = user?.roles;

    if (!roles) {
      throw new ForbiddenException('Роли не указаны для юзера');
    }
    const rolesAccess = roles?.roles_access;
    if (!rolesAccess) {
      throw new ForbiddenException('Нет доступа к управлению ролями');
    }

    return true;
  }
}
