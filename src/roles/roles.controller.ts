import { Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Request } from 'express';
import { RolesGuard } from './guards/roles.guard';
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
  async createRules(@Req() req: Request): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const values = req?.body.values;
    return await this.rolesService.createRules(values);
  }
  @Post('/upsert/:id')
  async upsertRules(@Req() req: Request): Promise<any> {
    const id = req.params.id;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const values = req?.body.values;
    return await this.rolesService.upsertRules(id, values);
  }
  @Delete('/remove/:id')
  async removeRole(@Req() req: Request): Promise<any> {
    const id = req.params.id;
    return await this.rolesService.removeRole(id);
  }
}
