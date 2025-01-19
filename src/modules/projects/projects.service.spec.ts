import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { ProjectRepository } from './repositories/project.repository';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repository: ProjectRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'ProjectRepository',
          useValue: {
            findProjects: jest.fn().mockReturnValue({error: null, data: []}),
            findProject: jest.fn().mockReturnValue({error: null, data: {}}),
            updateProject: jest.fn().mockReturnValue({error: null, data: {}}),
            deleteProject: jest.fn().mockReturnValue({error: null, data: {}}),
            createProject: jest.fn().mockReturnValue({error: null, data: {}}),
          },
        },
        ProjectsService,
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    repository = module.get<ProjectRepository>('ProjectRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should retrive all project', async() => {
    const spy = jest.spyOn(repository, 'findProjects');
    const { error, data } = await  service.findAll();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({});
    expect(error).toBeNull();
    expect(data).toBeTruthy();
  });

  it('should retrive one project',async () => {
    const spy = jest.spyOn(repository, 'findProject');
    const { error, data } = await  service.findOne('ObjectId');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('ObjectId');
    expect(error).toBeNull();
    expect(data).toBeTruthy();
  });

  it('should remove project', async() => {
    const spy = jest.spyOn(repository, 'deleteProject');
    const { error, data } = await service.remove('ObjectId');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('ObjectId');
    expect(error).toBeNull();
    expect(data).toBeTruthy();
  });

  it('should update a project', async () => {
    const spy = jest.spyOn(repository, 'updateProject');
    const { error, data } = await service.update('ObjectId', {});
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('ObjectId', {});
    expect(error).toBeNull();
    expect(data).toBeTruthy();
  });

  it('should create a project', async() => {
    const spy = jest.spyOn(repository, 'createProject');
    const mockData = {
      id: 'ObjectId',
      userId: 'ObjectId',
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
    const { error, data } = await service.create(mockData);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(mockData);
    expect(error).toBeNull();
    expect(data).toBeTruthy();
  });
});
