import { ConflictException, Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository.js';
import { CreateRoleDto } from './dto/create-role.dto.js';
import { Prisma, Role } from '../generated/prisma/client.js';

@Injectable()
export class RoleService {
    constructor(private readonly roleRepository: RoleRepository) {}

    async createRole(data: CreateRoleDto): Promise<Role> {
        try {
            return await this.roleRepository.create(data);
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code == 'P2002'
            ) {
                throw new ConflictException(
                    'A record with this value already exists',
                );
            }
            throw error;
        }
    }
}