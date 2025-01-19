import { DataSource } from 'typeorm';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './users.service';
import { ProjectsService } from '../projects/projects.service';

export const userProviders = [
  {
    provide: 'UserRepository',
    useFactory: (dataSource: DataSource, projectService: ProjectsService) =>
      new UserRepository(dataSource, projectService),
    inject: ['DATA_SOURCE', ProjectsService],
  },
  UsersService,
];
