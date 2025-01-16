import { Module } from '@nestjs/common';
import { databaseProviders } from '../typesorm.config';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
