import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;
  const mockData = {
    userId: "ObjectId",
    project: 'Testing',
    categories: ['qa'],
    description: 'Testing module',
    technologies: ['selenium', 'jest'],
    imgUrl: 'image.png',
    date: '12/12/2024',
    altTitle: 'Sheenshot 3',
    url: 'https://abc.con',
    images: ['https://imagur.com/p2/1.png'],
  };

  beforeEach(async () => {
    const projectServiceMock = {
      findAll: jest.fn().mockReturnValue({
        error: null,
        data: [{ ...mockData, id: 'ObjectId' }],
      }),
      findOne: (id: string) =>
        jest.fn().mockReturnValue({
          error: null,
          data: { ...mockData, id: 'ObjectId' },
        })(id),
      update: (id: string, data: CreateProjectDto) =>
        jest.fn().mockReturnValue({
          error: null,
          data: { ...mockData, id: 'ObjectId', project: 'Tested' },
        })(id, data),
      remove: (id: string) =>
        jest.fn().mockReturnValue({ error: null, data: {} })(id),
      create: (data: CreateProjectDto) =>
        jest.fn().mockReturnValue({
          error: null,
          data: { ...mockData, id: 'ObjectId' },
        })(data),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: projectServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should handle request to create a project', async () => {
    const spy = jest.spyOn(service, 'create');
    const { error, data } = await controller.create(mockData);
    expect(spy).toHaveBeenLastCalledWith(mockData);
    expect(error).toBeNull();
    expect(data).toMatchObject({ ...mockData, id: 'ObjectId' });
  });

  it('should handle request to update a project', async () => {
    const spy = jest.spyOn(service, 'update');
    const { error, data } = await controller.update('ObjectId', mockData);
    expect(spy).toHaveBeenLastCalledWith('ObjectId', mockData);
    expect(error).toBeNull();
    expect(data).toMatchObject({ ...mockData, id: 'ObjectId', project: 'Tested' });
  });

  it('should handle request to retrieve all projects', async () => {
    const spy = jest.spyOn(service, 'findAll');
    const { error, data } = await controller.findAll();
    expect(spy).toHaveBeenLastCalledWith();
    expect(error).toBeNull();
    expect(data).toMatchObject([{ ...mockData, id: 'ObjectId' }]);
  });

  it('should handle request to retrieve a project', async () => {
    const spy = jest.spyOn(service, 'findOne');
    const { error, data } = await controller.findOne('ObjectId');
    expect(spy).toHaveBeenLastCalledWith('ObjectId');
    expect(error).toBeNull();
    expect(data).toMatchObject({ ...mockData, id: 'ObjectId' });
  });

  it('should handle request to remove a project', async () => {
    const spy = jest.spyOn(service, 'remove');
    const { error, data } = await controller.remove('ObjectId');
    expect(spy).toHaveBeenLastCalledWith('ObjectId');
    expect(error).toBeNull();
    expect(data).toMatchObject({});
  });
});
