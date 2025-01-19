import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { ProjectsModule } from 'src/modules/projects/projects.module';
// import { EducationModule } from 'src/education/education.module';
// import { ExperienceModule } from 'src/experience/experience.module';

@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    // EducationModule,
    //  ExperienceModule,
  ],
})
export class FeatureRoute implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
