import { Module } from '@nestjs/common';
import { DatabaseProviders } from './database.providers';
import { globalProviders } from './pg/global.providers';

@Module({
  providers: [...DatabaseProviders, ...globalProviders],
  exports: [...DatabaseProviders, ...globalProviders],
})
export class DatabaseModule {}
