import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { FastifyRequest } from 'fastify';

import type { JwtPayload } from '../../../types/jwt-payload.type.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context
            .switchToHttp()
            .getRequest<FastifyRequest>();

        const token: string | undefined = request.cookies?.accessToken;

        if (!token) {
            throw new UnauthorizedException('No access token provided');
        }

        try {
            const payload =
                await this.jwtService.verifyAsync<JwtPayload>(token);

            request.user = payload;

            return true;
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}