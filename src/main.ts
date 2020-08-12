const dotenv = require('dotenv');
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`${process.env.BROKEN_PROTOCOL}://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_URL_INSTANCE}:${process.env.RABBITMQ_PORT_APP}/${process.env.RABBITMQ_VIRTUAL_HOST}`],
      queue: 'admin-backend'
    },
  });

  await app.listen(() => logger.log('Microservice is listening'));
}
bootstrap();
