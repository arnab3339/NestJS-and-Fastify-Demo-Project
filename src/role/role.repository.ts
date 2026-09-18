import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';
import { Prisma, Role } from '../generated/prisma/client.js';

@Injectable()
export class RoleRepository {
    constructor(private readonly prisma: DatabaseService) {}

    async create(data: Prisma.RoleCreateInput): Promise<Role> {
        return await this.prisma.role.create({ data });
    }
}