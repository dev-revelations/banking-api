import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CONFIG_KEY_SESSION_SECRET, GLOBAL_PREFIX, PORT_ALTERNATIVE } from './core/constants/consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = process.env.PORT || PORT_ALTERNATIVE;

  app.enableCors();

  app.use(helmet());
  app.use(session({
    secret: config.get(CONFIG_KEY_SESSION_SECRET),
    saveUninitialized: true,
    resave: true
  }));
  app.use(csurf());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.setGlobalPrefix(GLOBAL_PREFIX);


  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/${GLOBAL_PREFIX}`);
  });
}
bootstrap();