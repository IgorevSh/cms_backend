import { Injectable, Inject } from '@nestjs/common';
import { Audit } from '../database/pg/audit.entity';

@Injectable()
export class AuditService {
  constructor(
    @Inject('AUDIT')
    private auditModel: typeof Audit,
  ) {}
  async getAllAudits(): Promise<Audit[]> {
    return this.auditModel.findAll();
  }
  async getAuditById(id): Promise<Audit | null> {
    return this.auditModel.findOne({ where: { id } });
  }
  async addAudit(values): Promise<Audit | null> {
    return this.auditModel.create(values);
  }
}
