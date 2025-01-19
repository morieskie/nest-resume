import { Test, TestingModule } from '@nestjs/testing';
import { userProviders } from './user.providers';
import { UserRepository } from './repositories/user.repository';
import { DataSource } from 'typeorm';
import { ProjectsService } from '../projects/projects.service';
import { projectsProviders } from '../projects/projects.providers';

describe('UserProviders', () => {
  let dataSource: any;
  let repository: UserRepository;
  beforeEach(async () => {
    const dataSourceMock = {
      getRepositoryToken: jest.fn(() => ({
        find: jest.fn(),
        save: jest.fn(),
      })),
      getDatabaseEngine: jest.fn(),
      createEntityManager: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'DATA_SOURCE',
          useValue: dataSourceMock,
        },
        ...userProviders, ...projectsProviders
      ],
    }).compile();
    dataSource = module.get('DATA_SOURCE');
    repository = module.get<UserRepository>('UserRepository');
  });

  it('should provide UserRepository', () => {
    const provider = userProviders.find(
      (provider: any) => provider.provide === 'UserRepository',
    );
    expect(provider).toBeDefined();
  });

  it('should return an instance of UserRepository', () => {
    expect(repository).toBeInstanceOf(UserRepository);
  });
});
