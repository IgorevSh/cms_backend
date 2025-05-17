import { Audit } from './audit.entity';
import { Pages } from './page.entity';
import { Roles } from './roles.entity';
import { Users } from './users.entity';

export const globalProviders = [
  {
    provide: 'AUDIT',
    useValue: Audit,
  },
  {
    provide: 'PAGES',
    useValue: Pages,
  },
  {
    provide: 'ROLES',
    useValue: Roles,
  },
  {
    provide: 'USERS',
    useValue: Users,
  },
];
