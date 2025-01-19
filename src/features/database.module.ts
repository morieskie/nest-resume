import { Module } from '@nestjs/common';
import { databaseProviders } from '../typesorm.config';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [...databaseProviders, ConfigService],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
