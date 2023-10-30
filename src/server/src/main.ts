import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' ? '*' : null,
    methods: 'GET,POST,PATCH,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
