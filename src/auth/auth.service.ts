import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserRepository } from '../user/user.repository.js';
import { HashService } from '../hash/hash.service.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,
    ) {}

    async login(payload: LoginDto): Promise<string> {
        const user = await this.userRepository.findByEmail(payload.email);

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordValid = await this.hashService.comparePassword(
            payload.password,
            user.passwordHash,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return this.jwtService.signAsync({
            sub: user.id,
            email: user.email,
            role: user.role.name,
        });
    }
    async getMe(userId: number){
        return this.userRepository.findById(userId);
    }
}