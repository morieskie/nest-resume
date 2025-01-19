import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceService } from './experience.service';
import { ExperienceRepository } from './repositories/experience.repository';
import { experienceProviders } from './experience.providers';
import { getEntityManagerToken } from '@nestjs/typeorm';

describe('ExpeirenceProviders', () => {
  let module: TestingModule;
  let service: ExperienceService;
  let repository: ExperienceRepository;

  beforeEach(async () => {
    const dataSourceMock = {
      getEntityManagerToken: jest.fn(),
      getEntityManagerEngine: jest.fn(),
      createEntityManager: jest.fn(),
    };
    module = await Test.createTestingModule({
      providers: [
        {
          provide: 'DATA_SOURCE',
          useValue: dataSourceMock,
        },
        ...experienceProviders,
      ],
    }).compile();
    service = module.get<ExperienceService>(ExperienceService);
    repository = module.get<ExperienceRepository>('ExperienceRepository');
  });

  describe('Instactiation', () => {
    it('should providat valid instance of the dependency', () => {
      expect(service).toBeDefined();
      expect(repository).toBeDefined();

      expect(service).toBeInstanceOf(ExperienceService);
      expect(repository).toBeInstanceOf(ExperienceRepository);
    });
  });
});
