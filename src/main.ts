import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Resume')
    .setDescription('Resume API service description')
    .setVersion('1.0')
    .addTag('resume')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    disableErrorMessages: false,
    // exceptionFactory?: (errors: ValidationError[]) => any;
  }));

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
