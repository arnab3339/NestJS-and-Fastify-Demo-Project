import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service.js';
import { SafeUser } from './type/safe-user.type.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserWithRole } from './type/user-with-role.type.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: DatabaseService) {}

    async create(data: CreateUserDto, passwordHash: string): Promise<SafeUser> {
        return await this.prisma.user.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                passwordHash,
                role: {
                    connect: {
                        name: 'DEVELOPER',
                    },
                },
            },
            omit: {
                passwordHash: true,
            },
        });
    }

    async getAll(): Promise<SafeUser[]> {
        return this.prisma.user.findMany({
            omit: {
                passwordHash: true,
            },
        });
    }

    async findByEmail(email: string): Promise<UserWithRole | null> {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
            include: {
                role: true,
            },
        });
    }
    async findById(id: number): Promise<SafeUser|null>{
        return this.prisma.user.findUnique({
            where:{
                id,
            },
            omit:{
                passwordHash:true,
            },
        });
    }
    async update(id: number, data: UpdateUserDto,): Promise<SafeUser>{
        return this.prisma.user.update({
            where:{
                id,
            },
            data,
            omit:{
                passwordHash:true,
            },
        });
    }
    async delete(id:number): Promise<void>{
        await this.prisma.user.delete({
            where:{
                id,
            },
        });
    }
}