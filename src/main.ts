import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const serverConfig = config.get('server');
  console.log(serverConfig);

  console.log(config.get('db'));

  const port = 3000;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
