import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Request } from 'express';
import { RolesGuard } from './guards/roles.guard';
import { RoleDTO } from '../dto/role.dto';

@UseGuards(RolesGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get('/all')
  async getFullStructure(): Promise<any> {
    return await this.rolesService.getFullStructure();
  }
  @Get('/role/:id')
  async getRoleById(@Req() req: Request): Promise<any> {
    const id = req.params.id;
    return await this.rolesService.getRoleById(id);
  }
  @Post('/create')
  async createRules(@Body() rolesValue: RoleDTO): Promise<any> {
    return await this.rolesService.createRules(rolesValue);
  }
  @Post('/upsert/:id')
  async upsertRules(
    @Req() req: Request,
    @Body() rolesValue: RoleDTO,
  ): Promise<any> {
    const id = req.params.id;
    return await this.rolesService.upsertRules(id, rolesValue);
  }
  @Delete('/remove/:id')
  async removeRole(@Req() req: Request): Promise<any> {
    const id = req.params.id;
    return await this.rolesService.removeRole(id);
  }
}
