import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { launchSeeders } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('CEILING SHOP TEST')
    .setDescription('CEILING SHOP API DOCUMENTATION')
    .setVersion('1.0')
    .addTag('ceilings')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await launchSeeders(app);
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
