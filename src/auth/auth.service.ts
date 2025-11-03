import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Users } from '../database/pg/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS') private userModel: typeof Users,
    private usersService: UsersService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findByMailOrPhone(login);
    console.log('user', user);
    if (user && user.shadow === pass) {
      const { shadow, ...result } = user;
      //  this.jwtService.sign(result);
      return result;
    }
    return null;
  }

  async generate2FACode(user: Users): Promise<void> {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    const expires = (Date.now() + 5 * 60 * 1000).toString();
    await this.usersService.save2FACode(user, code, expires);
  }

  async verify2FACode(email: string, code: string) {
    const user = await this.userModel.findOne({ where: { email } });
    if (
      !(
        !user ||
        user.twoFactorCode !== code ||
        parseFloat(user?.twoFactorExpiresAt) < Date.now()
      )
    ) {
      await this.usersService.delete2FACode(user.id);
      return user
    } else {
      throw new UnauthorizedException('Неверный или истёкший код');
    }
  }

  logout(session: any): { message: string } {
    session?.destroy((err) => {
      if (err) {
        throw new UnauthorizedException('Logout failed');
      }
    });

    return { message: 'Logout successful' };
  }

  async register(email: string, password: string, name: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.addUser({
      email,
      password: hashedPassword,
      name,
    });
  }
}
