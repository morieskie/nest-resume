import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from '../modules/users/users.module';
import { ProjectsModule } from '../modules/projects/projects.module';
import { ExperienceModule } from '../modules/experience/experience.module';
// import { EducationModule } from 'src/education/education.module';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    ExperienceModule,
    // EducationModule,
  ],
})
export class FeatureRoute implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
