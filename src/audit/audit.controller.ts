import { Controller, Get, Req } from '@nestjs/common';
import { AuditService } from './audit.service';
import { Request } from 'express';

@Controller('audit')
export class AuditController {
  constructor(private readonly authService: AuditService) {}
  @Get()
  async getAudit() {
    return await this.authService.getAllAudits();
  }
  @Get('/:id')
  async getAuditById(@Req() req: Request) {
    return await this.authService.getAuditById(req.params.id);
  }
}
