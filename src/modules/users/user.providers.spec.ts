import { Test, TestingModule } from '@nestjs/testing';
import { userProviders } from './user.providers';
import { UserRepository } from './repositories/user.repository';
import { DataSource } from 'typeorm';

describe('UserProviders', () => {
  let dataSource: any;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'DATA_SOURCE',
          useValue: {
            getRepositoryToken: jest.fn(() => ({
              find: jest.fn(),
              save: jest.fn(),
            })),
            getDatabaseEngine: jest.fn(),
            createEntityManager: jest.fn()
          },
        },
      ],
    }).compile();
    dataSource = module.get('DATA_SOURCE');
  });

  it('should provide UserRepository', () => {
    expect(JSON.stringify(userProviders[0])).toEqual(JSON.stringify({
        provide: 'UserRepository',
        useFactory: (dataSource: DataSource) => new UserRepository(dataSource),
        inject: ['DATA_SOURCE'],
      }));
  });

  it('should return an instance of UserRepository', () => {
    console.log('dataSource', dataSource)
    const instance = userProviders[0].useFactory(dataSource);
    expect(instance).toBeInstanceOf(UserRepository);
  });
});
