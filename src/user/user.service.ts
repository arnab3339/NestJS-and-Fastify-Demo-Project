import { ConflictException, Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository.js';
import { Prisma } from '../generated/prisma/client.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { HashService } from '../hash/hash.service.js';
import { SafeUser } from './type/safe-user.type.js';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashService: HashService,
    ) {}

    async createUser(payload: CreateUserDto): Promise<SafeUser> {
        try {
            const passwordHash: string = await this.hashService.hashPassword(
                payload.password,
            );

            return this.userRepository.create(payload, passwordHash);
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    'A record with this value already exists',
                );
            }

            throw error;
        }
    }

    async getAllUsers(): Promise<SafeUser[]> {
        return this.userRepository.getAll();
    }
}