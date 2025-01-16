import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/typesorm.config';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
