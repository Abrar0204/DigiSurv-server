import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as morgan from 'morgan';
// import { PeerServer } from 'peer';
const whitelist = ['http://localhost:3000', 'https://digi-surv-ui.vercel.app'];

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

  // PeerServer({ port: 5500, path: '/' });
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
