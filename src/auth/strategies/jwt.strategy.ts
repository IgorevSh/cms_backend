// auth/strategies/jwt.strategy.ts
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { Request } from 'express';
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super();
//   }
//
//   private static extractJWTFromCookie(req: Request): string | null {
//     if (req.cookies && req.cookies.accessToken) {
//       return req.cookies.accessToken;
//     }
//     return null;
//   }
//
//   async validate(payload: any) {
//     return {
//       userId: payload.sub,
//       email: payload.email,
//       roles: payload.roles
//     };
//   }
// }
