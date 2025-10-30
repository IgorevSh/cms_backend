import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Injectable()
export class UserSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: (err: any, id?: any) => void) {
    done(null, user.id);
  }

  async deserializeUser(id: string, done: (err: any, id?: any) => void) {
    console.log('Deserializing user id:', id);
    const userBp = await this.usersService.getUser(id);

    if (!userBp) {
      return done(
        new Error(`Could not deserialize user: user with id ${id} not found`),
        null,
      );
    }
    const user = userBp;
    done(null, user);
  }
}
