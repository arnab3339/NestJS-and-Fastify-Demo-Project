import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
    RequestMethod,
    StandardSchemaValidationPipe,
    VersioningType,
} from '@nestjs/common';
import { fastifyCookie } from '@fastify/cookie';

import { AppModule } from './app.module.js';
import { TransformInterceptor } from './utils/interseptors/transform.interceptor.js';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );

    await app.register(fastifyCookie);

    app.setGlobalPrefix('/api');

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    app.useGlobalInterceptors(new TransformInterceptor());

    app.useGlobalPipes(new StandardSchemaValidationPipe());

    await app.listen(process.env.PORT ?? 3000);
}

await bootstrap();