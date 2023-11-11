import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://192.168.1.176:5173', // Replace with your frontend URL
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  });
  app.use('/assets', express.static(path.join(__dirname, "../",'assets')));
  await app.listen(3000);
}
bootstrap();
