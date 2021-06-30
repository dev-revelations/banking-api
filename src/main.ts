import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(helmet());
  app.use(session({
    secret: 'temp secret for now',
    saveUninitialized: true,
    resave: true
  }));
  app.use(csurf());

  await app.listen(3000);
}
bootstrap();