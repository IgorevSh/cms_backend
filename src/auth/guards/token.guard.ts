import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class TokenGuard extends AuthGuard('token') implements CanActivate {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext) {
    try {
      const result = (await super.canActivate(context)) as boolean;

      const request = context.switchToHttp().getRequest();
      await super.logIn(request);

      return result;
    } catch (err) {
      throw err;
    }
  }
}
