import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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

  async login(user: any): Promise<{ message: string,user:any }> {
    return { message: 'Login successful',user };
  }

  async logout(session: any): Promise<{ message: string }> {
    session.destroy((err) => {
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

  getCurrentUser(session: any): { userId: number; email: string } {
    if (!session.isAuthenticated) {
      throw new UnauthorizedException('Not authenticated');
    }
    return {
      userId: session.userId,
      email: session.email,
    };
  }
}
