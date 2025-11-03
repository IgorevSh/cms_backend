import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuditInterceptor } from './interceptors/audit.interceptor';
import { AuditService } from './audit/audit.service';
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';
import * as session from 'express-session';
import * as csurf from 'csurf';
import * as passport from 'passport';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.set('trust proxy', 1);

  // Redis client
  const redisClient = createClient({
    socket: { host: 'localhost', port: 6379 },
  });
  redisClient.on('error', (err) => console.error('Redis Client Error:', err));
  redisClient.on('connect', () => console.log('Redis Client connected:'));
  await redisClient.connect();

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'sess:',
    ttl: 86400, // 24 часа
  });

  // Express session + passport (правильный порядок)
  app.use(
    session({
      store: redisStore,
      secret: 'my-secret-secret',
      resave: false,
      saveUninitialized: false,
      name: 'connect.sid',
      rolling: true,
      cookie: {
        secure: false, // если без HTTPS
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 1,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'script-src': ["'self'", "'unsafe-inline'"], // Разрешение inline-скриптов
        },
      },
      referrerPolicy: { policy: 'no-referrer' },
      frameguard: { action: 'deny' }, // Запрещает использование фреймов
      hidePoweredBy: true, // Скрывает заголовок X-Powered-By
      xssFilter: true, // Включает фильтрацию XSS
    }),
  );
  app.use(csurf({ cookie: true }));
  app.enableCors({
    origin: 'http://localhost:9000',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const auditService = app.get(AuditService);
  app.useGlobalInterceptors(new AuditInterceptor(auditService));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`✅ Server running at port ${process.env.PORT ?? 3000}`);
}
bootstrap();
