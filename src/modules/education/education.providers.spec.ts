import { Test, TestingModule } from '@nestjs/testing';
import { EducationService } from './education.service';
import { EducationRepository } from './repositories/education.repository';
import { educationProviders } from './education.providers';

describe('ExpeirenceProviders', () => {
  let module: TestingModule;
  let service: EducationService;
  let repository: EducationRepository;

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
        ...educationProviders,
      ],
    }).compile();
    service = module.get<EducationService>(EducationService);
    repository = module.get<EducationRepository>('EducationRepository');
  });

  describe('Instactiation', () => {
    it('should providat valid instance of the dependency', () => {
      expect(service).toBeDefined();
      expect(repository).toBeDefined();

      expect(service).toBeInstanceOf(EducationService);
      expect(repository).toBeInstanceOf(EducationRepository);
    });
  });
});
