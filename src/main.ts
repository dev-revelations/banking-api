import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { CONFIG_KEY_SESSION_SECRET, PORT_ALTERNATIVE } from './core/constants/consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.enableCors();
  app.use(helmet());
  app.use(session({
    secret: config.get(CONFIG_KEY_SESSION_SECRET),
    saveUninitialized: true,
    resave: true
  }));
  app.use(csurf());


  const port = process.env.PORT || PORT_ALTERNATIVE;

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}`);
  });
}
bootstrap();