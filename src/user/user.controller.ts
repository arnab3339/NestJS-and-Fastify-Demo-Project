import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service.js';
import {
    CreateUserDto,
    createUserSchema,
} from './dto/create-user.dto.js';

import { JwtAuthGuard } from '../utils/guards/jwt-auth/jwt-auth.guard.js';
import { RoleGuard } from '../utils/guards/role/role.guard.js';
import { Roles } from '../utils/decorators/roles/roles.decorator.js';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(['ADMIN'])
    createUserHandler(
        @Body({ schema: createUserSchema }) payload: CreateUserDto,
    ) {
        return this.userService.createUser(payload);
    }

    @Get()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(['ADMIN'])
    getAllUsersHandler() {
        return this.userService.getAllUsers();
    }
}