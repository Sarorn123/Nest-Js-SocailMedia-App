import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ProjectKey } from '../project_key';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(ProjectKey.PORT || 5000);
  // await app.listen(configService.get('PORT') || 5000);
}

bootstrap();
