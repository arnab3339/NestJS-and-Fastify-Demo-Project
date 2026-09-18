import { Module } from '@nestjs/common';
import { RoleController } from './role.controller.js';
import { RoleService } from './role.service.js';
import { RoleRepository } from './role.repository.js';

@Module({
    controllers: [RoleController],
    providers: [RoleService, RoleRepository],
})
export class RoleModule {}