import { Test, TestingModule } from '@nestjs/testing';
import { projectsProviders } from './projects.providers';
import { DataSource } from 'typeorm';
import { ProjectRepository } from './repositories/project.repository';

describe('ProjectsProviders', () => {
  let dataSource: DataSource & ProjectRepository;
  let repository: ProjectRepository;
  beforeEach(async () => {
    const projectRepositoryMock = {
      getRepositoryToken: jest.fn(),
      getDatabaseEngine: jest.fn(),
      createEntityManager: jest.fn(),
      findProjects: jest.fn().mockReturnValue({ error: null, data: [] }),
      findById: jest.fn().mockReturnValue({ error: null, data: {} }),
      updateProject: jest.fn().mockReturnValue({ error: null, data: {} }),
      deleteProject: jest.fn().mockReturnValue({ error: null, data: {} }),
      createProject: jest.fn().mockReturnValue({ error: null, data: {} }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'DATA_SOURCE',
          useFactory: () => projectRepositoryMock,
        },
        ...projectsProviders,
      ],
    }).compile();
    repository = module.get<ProjectRepository>('ProjectRepository');
  });

  it('should provide ProjectRepository', () => {
    const instance = repository;
    expect(instance).toBeInstanceOf(ProjectRepository);
  });
});
