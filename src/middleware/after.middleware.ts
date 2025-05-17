import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AfterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (['POST', 'DELETE'].includes(req.method)) {
      res.on('finish', () => {
        console.log(`[${req.method}] ${req.url} - ${res.statusCode}`);
        console.log(res);
        // Ваша логика обработки после запроса
      });
    }
    next();
  }
}
