import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Request,
  Res,
  Session,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { IsAuthenticatedGuard } from './guards/is-authenticated';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req, @Res() res) {
    req.logIn(req.user, (err) => {
      if (err) {
        return res.status(400).json({ message: 'Login failed' });
      }
      return res.json({ message: 'Login successful', user: req.user });
    });
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get('profile')
  getProfile(@Request() req: any, @Session() session) {
    return req.user;
  }
}
