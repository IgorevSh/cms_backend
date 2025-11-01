import { SetMetadata } from '@nestjs/common';

export const AccessLevel = (level: number | boolean) =>
  SetMetadata('accessLevel', level);
