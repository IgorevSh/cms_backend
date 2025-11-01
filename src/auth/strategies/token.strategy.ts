import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'token', session: true });
  }
  async validate(email: any, token: string): Promise<any> {
    const user = await this.authService.verify2FACode(email, token);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
