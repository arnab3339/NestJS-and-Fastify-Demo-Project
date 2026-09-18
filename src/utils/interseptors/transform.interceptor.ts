import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs';
import type { FastifyReply } from 'fastify';

export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
    T,
    ApiResponse<T>
> {
    intercept(context: ExecutionContext, next: CallHandler) {
        const response = context
            .switchToHttp()
            .getResponse<FastifyReply>();

        return next.handle().pipe(
            map((data: T) => ({
                success: true,
                statusCode: response.statusCode,
                message: 'Request successful',
                data,
            })),
        );
    }
}