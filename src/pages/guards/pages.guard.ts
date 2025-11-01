import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class PagesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;
    const roles = user?.roles;
    if (!roles) {
      throw new ForbiddenException('Роли не указаны для юзера');
    }
    const structure = JSON.parse(roles?.structure);
    const requiredAccessLevel: number | boolean = this.reflector.get<number>(
      'accessLevel',
      context.getHandler(),
    );
    if (requiredAccessLevel === true) {
      return true;
    }
    const pageId = parseInt(request.params.id);
    const userRoleForPage = structure?.[pageId];
    if (userRoleForPage === undefined) {
      throw new ForbiddenException('Нет доступа к странице');
    }

    if (userRoleForPage < requiredAccessLevel) {
      throw new ForbiddenException('Нет доступа к действию');
    }

    return true;
  }
}
