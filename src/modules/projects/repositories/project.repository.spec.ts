import { Test, TestingModule } from '@nestjs/testing';
import { ProjectRepository } from './project.repository';
import { DataSource, Repository } from 'typeorm';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Project } from '../entities/project.entity';

describe('ProjectRepository', () => {
  let repository: ProjectRepository;
  let dataSource: DataSource;
  let projectRepository: Repository<Project>;

  const mockData = {
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
  const dataSourceMock = {
    createEntityManager: jest.fn().mockReturnValue({
      getRepository: jest.fn().mockImplementation((entity) => {
        return {
          save: jest.fn(),
          find: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        };
      }),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'DATA_SOURCE',
          useValue: dataSourceMock,
        },
        {
          provide: ProjectRepository,
          useFactory: (ds) => new ProjectRepository(dataSourceMock as any),
        },
      ],
    }).compile();
    repository = module.get<ProjectRepository>(ProjectRepository);
    dataSource = module.get('DATA_SOURCE');
    projectRepository = dataSource.createEntityManager().getRepository(Project);
  });
  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createProject', () => {
    it('should create a project', async () => {
      repository.save = jest
        .fn()
        .mockResolvedValueOnce({ id: '1', ...mockData });
      const result = await repository.createProject(mockData);
      expect(result.data).toEqual({ id: '1', ...mockData });
      expect(result.error).toBeNull();
    });

    it('should handle error', async () => {
      projectRepository.save = jest
        .fn()
        .mockRejectedValueOnce(new Error('Save failed'));

      const result = await repository.createProject(mockData);

      expect(result.error).toBeInstanceOf(Error);
      expect(result.data).toBeNull();
    });
  });

  describe('findProjects', () => {
    it('should find projects', async () => {
      const criteria = { project: 'Test Project' };
      repository.find = jest
        .fn()
        .mockResolvedValueOnce([{ id: '1', ...mockData }]);

      const result = await repository.findProjects(criteria);

      expect(result.data).toEqual([{ id: '1', ...mockData }]);
      expect(result.error).toBeNull();
    });

    it('should find projects without passing a filter criteria', async () => {
      repository.find = jest
        .fn()
        .mockResolvedValueOnce([{ id: '1', ...mockData }]);

      const result = await repository.findProjects();

      expect(result.data).toEqual([{ id: '1', ...mockData }]);
      expect(result.error).toBeNull();
    });

    it('should handle error', async () => {
      const criteria = { project: 'Test Project' };
      repository.find = jest
        .fn()
        .mockRejectedValueOnce(new Error('Find failed'));

      const result = await repository.findProjects(criteria);

      expect(result.error).toBeInstanceOf(Error);
      expect(result.data).toEqual([]);
    });
  });

  describe('findById', () => {
    it('should find a project by id', async () => {
      const id = '1';
      repository.findOne = jest
        .fn()
        .mockResolvedValueOnce({ id: '1', ...mockData });

      const result = await repository.findProject(id);

      expect(result.data).toEqual({ id: '1', ...mockData });
      expect(result.error).toBeNull();
    });

    it('should handle error', async () => {
      const id = '1';
      repository.findOne = jest
        .fn()
        .mockRejectedValueOnce(new Error('Find failed'));

      const result = await repository.findProject(id);

      expect(result.error).toBeInstanceOf(Error);
      expect(result.data).toBeNull();
    });
  });

  describe('updateProject', () => {
    it('should update a project', async () => {
      const id = '1';
      const attributes: UpdateProjectDto = { project: 'Updated Project' };
      repository.update = jest.fn().mockResolvedValueOnce({ affected: 1 });

      const result = await repository.updateProject(id, attributes);

      expect(result.data).toEqual({ affected: 1 });
      expect(result.error).toBeNull();
    });

    it('should handle error', async () => {
      const id = '1';
      const attributes: UpdateProjectDto = { project: 'Updated Project' };
      projectRepository.update = jest
        .fn()
        .mockRejectedValueOnce(new Error('Update failed'));

      const result = await repository.updateProject(id, attributes);

      expect(result.error).toBeInstanceOf(Error);
      expect(result.data).toBeNull();
    });
  });

  describe('deleteProject', () => {
    it('should delete a project', async () => {
      const id = '1';
      repository.delete = jest.fn().mockResolvedValueOnce({ affected: 1 });

      const result = await repository.deleteProject(id);

      expect(result.data).toEqual({ affected: 1 });
      expect(result.error).toBeNull();
    });

    it('should handle error', async () => {
      const id = '1';
      projectRepository.delete = jest
        .fn()
        .mockRejectedValueOnce(new Error('Delete failed'));

      const result = await repository.deleteProject(id);

      expect(result.error).toBeInstanceOf(Error);
      expect(result.data).toBeNull();
    });
  });
});
