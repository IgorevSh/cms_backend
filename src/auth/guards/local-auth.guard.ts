import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') implements CanActivate {
  constructor() {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request: Request = context.switchToHttp().getRequest();

    await super.logIn(request);

    return result;
  }
}
