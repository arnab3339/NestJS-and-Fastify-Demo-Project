import 'fastify';

import type { JwtPayload } from './jwt-payload.type.js';

declare module 'fastify' {
    interface FastifyRequest {
        user: JwtPayload;
    }
}