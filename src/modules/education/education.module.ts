import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { DatabaseModule } from '../../features/database.module';
import { educationProviders } from './education.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EducationController],
  providers: [EducationService, ...educationProviders],
})
export class EducationModule {}
