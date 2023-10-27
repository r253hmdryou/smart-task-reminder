import { APP_PIPE, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4000'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
