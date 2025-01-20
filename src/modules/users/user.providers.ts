import { DataSource } from 'typeorm';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './users.service';
import { ProjectsService } from '../projects/projects.service';
import { ExperienceService } from '../experience/experience.service';
import { EducationService } from '../education/education.service';

export const userProviders = [
  {
    provide: 'UserRepository',
    useFactory: (
      dataSource: DataSource,
      projectService: ProjectsService,
      experienceService: ExperienceService,
      educationService: EducationService,
    ) =>
      new UserRepository(
        dataSource,
        projectService,
        experienceService,
        educationService,
      ),
    inject: ['DATA_SOURCE', ProjectsService, EducationService],
  },
  UsersService,
];
