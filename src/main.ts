import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as yaml from 'js-yaml';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from './logger/logger.service';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const document = yaml.load(
    readFileSync(join(__dirname, '..', 'doc', 'api.yaml'), 'utf8'),
  ) as OpenAPIObject;

  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT ? +PORT : 3000);
}
bootstrap();
