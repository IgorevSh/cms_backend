import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, originalUrl } = request;

    if (!['DELETE', 'POST'].includes(method)) {
      return next.handle();
    }

    const now = Date.now();
    return next.handle().pipe(
      tap((result) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const transformedResult = result;
        const response = context.switchToHttp().getResponse();
        const executionTime = Date.now() - now;
        const auditObject = {
          timestamp: Date.now(),
          action: `${method} ${originalUrl}`,
          result: `${response?.statusCode}`,
          comment: this.safeStringify(result),
          user_id: '1',
        };
        this.auditService.addAudit(auditObject);
        console.log(`[After] ${method} ${originalUrl}`);
        console.log(`Status: ${response?.statusCode}`);
        console.log(`Execution time: ${executionTime}ms`);
        console.log('Response:', this.safeStringify(result));
        console.log('-----------------------');
      }),
    );
  }

  private safeStringify(obj: any) {
    try {
      return JSON.stringify(obj, null, 2);
    } catch (e) {
      return '[Circular or non-serializable data]';
    }
  }
}
