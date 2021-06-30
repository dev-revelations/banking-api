import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
import { HttpService, Logger, ValidationPipe } from '@nestjs/common';
import { CONFIG_KEY_ENVIRONMENT, CONFIG_KEY_SESSION_SECRET, ENV_DEVELOPMENT, GLOBAL_PREFIX, PORT_ALTERNATIVE } from './core/constants/consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = process.env.PORT || PORT_ALTERNATIVE;
  const httpService = app.get(HttpService);

  if (config.get(CONFIG_KEY_ENVIRONMENT) !== ENV_DEVELOPMENT) {
    app.enableCors();
    app.use(csurf());
  }

  app.use(helmet());
  app.use(session({
    secret: config.get(CONFIG_KEY_SESSION_SECRET),
    saveUninitialized: true,
    resave: true
  }));


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
    const serverUrl = `http://localhost:${port}/${GLOBAL_PREFIX}`;
    Logger.log(`Listening at ${serverUrl}`);
    // Calls seed endpoint to fill up sampple data
    httpService.get(`${serverUrl}/seed`).subscribe();
  });
}
bootstrap();