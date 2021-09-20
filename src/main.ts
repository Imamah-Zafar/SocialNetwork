import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';
import sslRedirect from 'heroku-ssl-redirect';


async function bootstrap() {
  const PORT :string= process.env.PORT 

  const favicon = require('express-favicon');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.use(sslRedirect())
  app.use(favicon(__dirname + '/public/favicon.png'));
  const config = new DocumentBuilder()
    .setTitle('Social Media APP')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);


  app.enableCors();
  await app.listen(parseInt(PORT));
}
bootstrap();
