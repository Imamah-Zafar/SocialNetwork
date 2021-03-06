import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';



async function bootstrap() {
  const PORT= process.env.PORT || 5000;

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
 
  app.useStaticAssets(join(__dirname, '..', 'static'));
  const config = new DocumentBuilder()
    .setTitle('Social Media APP')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);


  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
