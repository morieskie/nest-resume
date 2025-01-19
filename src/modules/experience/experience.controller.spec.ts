import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';
import { createMockRepository, createMockService } from '../../../mocks/mock.help';
import { Experience } from './entities/experience.entity';
import { ObjectId } from 'mongodb';

describe('ExperienceController', () => {
  let controller: ExperienceController;
  let service: ExperienceService;
  const mockData = {
    userId: ObjectId.generate(new Date().getTime()).toString(),
    company: 'acme',
    from: 'Feb 2022',
    to: 'Aug 2024',
    role: 'Jnr Nodejs Tester',
    description:
      'Responsible for unit testing using jest, karma, moacha, chai so on.',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperienceController],
      providers: [
        {
          provide: ExperienceService,
          useValue: createMockService(Experience),
        },
        {
          provide: 'ExperienceRepository',
          useValue: createMockRepository(Experience)
        }
      ],
    }).compile();

    controller = module.get<ExperienceController>(ExperienceController);
    service = module.get<ExperienceService>(ExperienceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('CreateExperirnce', () => {
    const id = ObjectId.generate(new Date().getTime()).toString();
    it('should handle request to create an experience', async () => {
      service.create = jest
        .fn()
        .mockReturnValue({ error: null, data: { ...mockData, id } });

      const { error, data } = await controller.create(mockData);
      expect(error).toBeNull();
      expect(data).toMatchObject({ ...mockData, id });
    });

    it('should handle create errors', async () => {
      service.create = jest
        .fn()
        .mockReturnValueOnce({ error: new Error('Server Error'), data: null });

      const { error, data } = await controller.create(mockData);
      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('GetExperirnces', () => {
    const id = ObjectId.generate(new Date().getTime()).toString();
    it('should handle request to retrieve experiences', async () => {
      service.findAll = jest
        .fn()
        .mockReturnValue({ error: null, data: [{ ...mockData, id }] });

      const { error, data } = await controller.findAll();
      expect(error).toBeNull();
      expect(data).toMatchObject([{ ...mockData, id }]);
    });

    it('should handle findall errors', async () => {
      service.findAll = jest
        .fn()
        .mockReturnValueOnce({ error: new Error('Server Error'), data: null });
      const { error, data } = await controller.findAll();
      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('GetExperirnce', () => {
    const id = ObjectId.generate(new Date().getTime()).toString();
    it('should handle request to retrieve an experience', async () => {
      service.findOne = jest
        .fn()
        .mockReturnValue({ error: null, data: { ...mockData, id } });

      const { error, data } = await controller.findOne(id);
      expect(error).toBeNull();
      expect(data).toMatchObject({ ...mockData, id });
    });

    it('should handle retrieve errors', async () => {
      service.findOne = jest
        .fn()
        .mockReturnValueOnce({ error: new Error('Server Error'), data: null });

      const { error, data } = await controller.findOne(id);
      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('UpdateExperirnce', () => {
    const id = ObjectId.generate(new Date().getTime()).toString();
    const company = 'Tesla';
    it('should handle request to updating an experience', async () => {
      service.update = jest.fn().mockReturnValue({ error: null, data: null });

      const { error, data } = await controller.update(id, { company });
      expect(error).toBeNull();
      expect(data).toBeNull();
    });

    it('should handle update errors', async () => {
      service.update = jest
        .fn()
        .mockReturnValueOnce({ error: new Error('Server Error'), data: null });

      const { error, data } = await controller.update(id, { company });
      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('DeleteExperirnce', () => {
    const id = ObjectId.generate(new Date().getTime()).toString();
    it('should handle request to deliting an experience', async () => {
      service.remove = jest.fn().mockReturnValue({ error: null, data: null });

      const { error, data } = await controller.remove(id);
      expect(error).toBeNull();
      expect(data).toBeNull();
    });
    it('should handle delte errors', async () => {
      service.remove = jest
        .fn()
        .mockReturnValueOnce({ error: new Error('Server Error'), data: null });
      const { error, data } = await controller.remove(id);
      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });
});
