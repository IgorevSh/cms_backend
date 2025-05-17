import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuditInterceptor } from './interceptors/audit.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: true,
  });
  app.useGlobalInterceptors(new AuditInterceptor());
  await app.listen(process.env.PORT ?? 3000);
  console.log('Server running at port:' + (process.env.PORT ?? 3000));
}
bootstrap();
