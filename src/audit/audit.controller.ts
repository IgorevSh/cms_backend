import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { Request } from 'express';
import { AuditGuard } from './guards/auth.guard';
@UseGuards(AuditGuard)
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
