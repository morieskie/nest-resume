import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceModule } from './experience.module';
import { ExperienceController } from './experience.controller';

describe('ExperienceModule', () => {
  let module: TestingModule;
  let controller: ExperienceController;

  beforeEach(async () => {
    const dataSourceMock = {
      getEntityManagerToken: jest.fn(),
      getDatabaseEngine: jest.fn(),
      createEntityManager: jest.fn(),
    };
    module = await Test.createTestingModule({
      imports: [ExperienceModule],
    })
      .overrideProvider('DATA_SOURCE')
      .useValue(dataSourceMock)
      .compile();
    controller = module.get<ExperienceController>(ExperienceController);
  });

  describe('ProvideExperienceController', () => {
    it('should provide instance of controller', () => {
      expect(controller).toBeDefined();
      expect(controller).toBeInstanceOf(ExperienceController);
    });
  });
});
