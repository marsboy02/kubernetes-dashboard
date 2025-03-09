import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

import { API_PREFIX } from './constants';
import generateSwaggerDocument from './infrastructure/swagger/swagger.generator';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  SwaggerModule.setup(`/docs`, app, generateSwaggerDocument(app), {
    swaggerOptions: { persistAuthorization: true },
  });

  // Apply rules for validation
  app
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

  app.enableCors({ origin: true, credentials: true });

  app.setGlobalPrefix(API_PREFIX);
  await app.listen(3000);
}
bootstrap();
