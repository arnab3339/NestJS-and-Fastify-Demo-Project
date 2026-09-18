import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Res,
} from '@nestjs/common';
import type { FastifyReply } from 'fastify';

import { AuthService } from './auth.service.js';
import { LoginDto, loginSchema } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async loginHandler(
        @Body() payload: LoginDto,
        @Res({ passthrough: true }) reply: FastifyReply,
    ) {
        const result = loginSchema.safeParse(payload);

        if (!result.success) {
            throw result.error;
        }

        const accessToken: string =
            await this.authService.login(result.data);

        reply.setCookie('accessToken', accessToken, {
            httpOnly: true,
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: Number(process.env.JWT_EXPIRES_IN),
        });

        return {
            message: 'Login successful',
        };
    }
}