import { DataSource } from 'typeorm';
import { ProjectRepository } from './repositories/project.repository';
import { ProjectsService } from './projects.service';

export const projectsProviders = [
  {
    provide: 'ProjectRepository',
    useFactory: (dataSource: DataSource) => new ProjectRepository(dataSource),
    inject: ['DATA_SOURCE'],
  },
  ProjectsService,
];
