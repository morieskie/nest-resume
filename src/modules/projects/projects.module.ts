import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { DatabaseModule } from '../../features/database.module';
import { projectsProviders } from './projects.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProjectsController],
  providers: [...projectsProviders],
  exports: [...projectsProviders],
})
export class ProjectsModule {}
