import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import { dump } from 'js-yaml';
import * as fs from 'fs';

import { AppModule } from './app.module';
import { ErrorFilter } from './middleware/errorFilter.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1');
  app.useGlobalFilters(new ErrorFilter());

  const config = new DocumentBuilder()
    .setTitle('Smart Task Reminder API')
    .setDescription('Smart Task Reminder API')
    .setVersion('1.0')
    .addGlobalParameters({
      name: 'X-Requested-With',
      in: 'header',
      required: false,
      // 本来的にはtrueにすべきだが、クライアント自動生成時に入力を強制されて面倒なのでfalseにしている。
      // 現状はaxiosのデフォルト値を使っているため、リクエストごとに明示的に指定する必要が無い。
    })
    .addBearerAuth()
    .build();
  patchNestJsSwagger();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./dist/swagger.yaml', dump(document));
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['http://localhost:4000'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
