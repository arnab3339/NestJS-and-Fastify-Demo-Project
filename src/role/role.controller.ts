import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service.js';
import { CreateRoleDto, createRoleSchema } from './dto/create-role.dto.js';

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    createRoleHandler(
        @Body({ schema: createRoleSchema }) payload: CreateRoleDto,
    ) {
        return this.roleService.createRole(payload);
    }
}