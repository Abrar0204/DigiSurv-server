import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as morgan from 'morgan';
const whitelist = [
  'http://localhost:3000',
  'https://digi-surv-ui.vercel.app',
  'http://ff42-2401-4900-230b-e255-25d9-f724-63a0-6f32.ngrok.io',
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });
  app.use(morgan('dev'));

  await app.listen(process.env.PORT || 5000);
  console.log('Server on ', await app.getUrl());
}
bootstrap();
