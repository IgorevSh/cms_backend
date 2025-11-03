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
import { TokenGuard } from './guards/token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Res() res) {
    return res.json({ message: 'Login successful' });
  }

  @UseGuards(IsAuthenticatedGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req?.user;
  }

  @UseGuards(IsAuthenticatedGuard)
  @Post('logout')
  logOut(@Session() session) {
    return this.authService.logout(session);
  }
  @UseGuards(TokenGuard)
  @Post('token')
  loginWithToken(@Request() req, @Res() res) {
    req.logIn(req.user, (err) => {
      if (err) {
        return res.status(400).json({ message: 'Login failed' });
      }
      return res.json({ message: 'Login successful' });
    });
  }
  @Get('token')
  getCsrfToken(@Request() req: Request, @Res() res: Response) {
    return res.json({ csrfToken: req?.csrfToken() });
  }
}
