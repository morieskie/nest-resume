import { Test, TestingModule } from '@nestjs/testing';
import { EducationModule } from './education.module';
import { EducationController } from './education.controller';

describe('EducationModule', () => {
  let module: TestingModule;
  let controller: EducationController;

  beforeEach(async () => {
    const dataSourceMock = {
      getEntityManagerToken: jest.fn(),
      getDatabaseEngine: jest.fn(),
      createEntityManager: jest.fn(),
    };
    module = await Test.createTestingModule({
      imports: [EducationModule],
    })
      .overrideProvider('DATA_SOURCE')
      .useValue(dataSourceMock)
      .compile();
    controller = module.get<EducationController>(EducationController);
  });

  describe('ProvideEducationController', () => {
    it('should provide instance of controller', () => {
      expect(controller).toBeDefined();
      expect(controller).toBeInstanceOf(EducationController);
    });
  });
});
