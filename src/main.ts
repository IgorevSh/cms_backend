import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuditInterceptor } from './interceptors/audit.interceptor';
import { AuditService } from './audit/audit.service';
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //@ts-expect-error
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
        maxAge: 1000 * 60 * 60 * 24 * 3,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );

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
