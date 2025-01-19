import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceService } from './experience.service';
import { Experience } from './entities/experience.entity';
import { ExperienceRepository } from './repositories/experience.repository';
import { ObjectId } from 'mongodb';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { createMockRepository, dataSourceMock } from '../../../mocks/mock.help';

describe('ExperienceService', () => {
  let service: ExperienceService;
  let repository: ExperienceRepository;
  const mockData = {
    company: 'acme',
    from: 'Feb 2022',
    to: 'Aug 2024',
    role: 'Jnr Nodejs Tester',
    description:
      'Responsible for unit testing using jest, karma, moacha, chai so on.',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'DATA_SOURCE',
          useValue: dataSourceMock,
        },
        {
          provide: 'ExperienceRepository',
          useValue: createMockRepository(Experience, 'Experience'),
        },
        ExperienceService,
      ],
    }).compile();

    service = module.get<ExperienceService>(ExperienceService);
    repository = module.get<ExperienceRepository>('ExperienceRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CreateExperience', () => {
    const id = ObjectId.generate().toString();
    it('should handle experience creation', async () => {
      repository.createExperience = jest
        .fn()
        .mockReturnValue({ error: null, data: { ...mockData, id } });
      let res: any;
      const { error, data } = await service.create(mockData);
      expect(error).toBeNull();
      expect(data).toMatchObject({ ...mockData, id });
    });

    it('should handle experience creation error', async () => {
      repository.createExperience = jest.fn().mockReturnValueOnce({
        error: new Error('Network failure'),
        data: null,
      });

      const { error, data } = await service.create(mockData);

      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('FindAllExperiences', () => {
    const id = ObjectId.generate().toString();
    it('should handle experience retrieve all', async () => {
      repository.findExperiences = jest
        .fn()
        .mockReturnValue({ error: null, data: [{ ...mockData, id }] });

      const { error, data } = await service.findAll();

      expect(error).toBeNull();
      expect(data).toMatchObject([{ ...mockData, id }]);
    });

    it('should handle experience retrieve all error', async () => {
      repository.findExperiences = jest.fn().mockReturnValueOnce({
        error: new Error('Network failure'),
        data: null,
      });

      const { error, data } = await service.findAll();
      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('GetExperience', () => {
    const id = ObjectId.generate().toString();
    it('should handle experience retrieve all', async () => {
      repository.findOneExperience = jest
        .fn()
        .mockReturnValue({ error: null, data: { ...mockData, id } });

      const { error, data } = await service.findOne(id);

      expect(error).toBeNull();
      expect(data).toMatchObject({ ...mockData, id });
    });

    it('should handle experience retrieve all error', async () => {
      repository.findOneExperience = jest.fn().mockReturnValueOnce({
        error: new Error('Network failure'),
        data: null,
      });

      const { error, data } = await service.findOne(id);
      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('UpdateExperience', () => {
    const id = ObjectId.generate().toString();
    const updateData: UpdateExperienceDto = { company: 'ACME[updated]' };
    it('should handle experience retrieve all', async () => {
      repository.updateExperience = jest.fn().mockReturnValue({
        error: null,
        data: { ...mockData, id, company: updateData.company },
      });
      const { error, data } = await service.update(id, updateData);

      expect(error).toBeNull();
      expect(data).toMatchObject({
        ...mockData,
        company: updateData.company,
        id,
      });
    });

    it('should handle experience retrieve all error', async () => {
      repository.updateExperience = jest.fn().mockReturnValueOnce({
        error: new Error('Network failure'),
        data: null,
      });

      const { error, data } = await service.update(id, updateData);
      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('DeleteExperience', () => {
    const id = ObjectId.generate().toString();
    it('should handle experience retrieve all', async () => {
      repository.deleteExperience = jest
        .fn()
        .mockResolvedValue({ error: null, data: null });
      const { error, data } = await service.remove(id);

      expect(error).toBeNull();
      expect(data).toBeNull();
    });

    it('should handle experience retrieve all error', async () => {
      repository.deleteExperience = jest.fn().mockReturnValueOnce({
        error: new Error('Network failure'),
        data: null,
      });

      const { error, data } = await service.remove(id);
      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });
});
