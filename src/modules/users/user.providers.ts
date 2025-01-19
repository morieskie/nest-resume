import { DataSource } from 'typeorm';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './users.service';
import { ProjectsService } from '../projects/projects.service';
import { ExperienceService } from '../experience/experience.service';

export const userProviders = [
  {
    provide: 'UserRepository',
    useFactory: (dataSource: DataSource, projectService: ProjectsService, experienceService: ExperienceService) =>
      new UserRepository(dataSource, projectService, experienceService),
    inject: ['DATA_SOURCE', ProjectsService],
  },
  UsersService,
];
