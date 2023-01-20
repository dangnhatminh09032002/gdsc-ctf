import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as session from 'express-session';
import helmet from 'helmet';

import { RootModule } from './di/root.module';

export class ServerApplication {
  public async run(): Promise<void> {
    const app: NestExpressApplication = await NestFactory.create(RootModule);
    app.use(helmet());
    this.buildSession(app);
    this.buildAPIDocumentation(app);
    this.buildCORS(app);
    this.log();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

    await app.listen(process.env.API_PORT, process.env.API_HOST);
  }

  private buildAPIDocumentation(app: NestExpressApplication): void {
    if (process.env.NODE_ENV !== 'development') return;

    const title: string = 'IPoster';
    const description: string = 'IPoster API documentation';
    const version: string = '1.0.0';

    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addBearerAuth({
        type: 'apiKey',
        in: 'header',
        name: 'ABC - 123',
      })
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('documentation', app, document);
  }

  private buildSession(app: NestExpressApplication): void {
    app.use(
      session({
        name: process.env.API_SESSION_NAME,
        secret: process.env.API_SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
          httpOnly: process.env.API_COOKIE_HTTPONLY,
          secure: process.env.API_COOKIE_SECURE,
        },
      }),
    );
  }

  private buildCORS(app: NestExpressApplication): void {
    // app.enableCors({
    //   origin: ,
    //   credentials: true,
    //   methods: ,
    // });
  }

  private log(): void {
    Logger.log(
      `Server started on host: ${process.env.API_HOST}; port: ${process.env.API_PORT};`,
      ServerApplication.name,
    );
  }
}
