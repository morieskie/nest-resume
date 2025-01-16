import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { EducationModule } from 'src/education/education.module';
import { ExperienceModule } from 'src/experience/experience.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    // DatabaseModule,
    UsersModule,
    // EducationModule,
    //  ExperienceModule,
    //  ProjectsModule
  ],
})
export class FeatureRoute implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
