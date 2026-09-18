import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';

import { Roles } from '../../decorators/roles/roles.decorator.js';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles: string[] = this.reflector.getAllAndOverride(
            Roles,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles?.length) {
            return true;
        }

        const request =
            context.switchToHttp().getRequest<FastifyRequest>();

        const { user } = request;

        if (!user || !requiredRoles.includes(user.role)) {
            throw new ForbiddenException(
                'You do not have permission to perform this action',
            );
        }

        return true;
    }
}