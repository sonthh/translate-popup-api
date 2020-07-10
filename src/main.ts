import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Translator API')
    .setDescription('Translator API')
    .setVersion('1.0')
    .addTag('Translator API')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const config = configuration();
  await app.listen(config.port);

  console.log('API has started at port: ' + config.port);
}

bootstrap();
