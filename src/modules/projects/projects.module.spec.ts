import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsModule } from './projects.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

describe('ProjectsModule', () => {
  let module: TestingModule;
  let controller: ProjectsController;
  let service: ProjectsService;

  const mockDatabaseService = {
    createEntityManager: jest.fn(),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ProjectsModule],
    })
      .overrideProvider('DATA_SOURCE')
      .useValue(mockDatabaseService)
      .compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should provide instance of ProjectsController', () => {
    expect(controller).toBeInstanceOf(ProjectsController);
    expect(service).toBeInstanceOf(ProjectsService);
  });
});
