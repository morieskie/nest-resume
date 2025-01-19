import { Module } from '@nestjs/common';
import { ExperienceController } from './experience.controller';
import { DatabaseModule } from '../../features/database.module';
import { experienceProviders } from './experience.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ExperienceController],
  providers: [...experienceProviders],
})
export class ExperienceModule {}
