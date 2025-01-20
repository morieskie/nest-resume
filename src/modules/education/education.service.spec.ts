import { Test, TestingModule } from '@nestjs/testing';
import { EducationService } from './education.service';
import { Education } from './entities/education.entity';
import { EducationRepository } from './repositories/education.repository';
import { ObjectId } from 'mongodb';
import { UpdateEducationDto } from './dto/update-education.dto';
import { createMockRepository, dataSourceMock } from '../../../mocks/mock.help';
import { CreateEducationDto } from './dto/create-education.dto';

describe('EducationService', () => {
  let service: EducationService;
  let repository: EducationRepository;
  const mockData: CreateEducationDto = {
    userId: ObjectId.generate(new Date().getTime()).toString(),
    company: 'Tesla',
    from: '12/12/2012',
    to: '12/12/2024',
    description: 'Space Travel',
    subjects: ['space', 'evs'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'DATA_SOURCE',
          useValue: dataSourceMock,
        },
        {
          provide: 'EducationRepository',
          useValue: createMockRepository(Education, 'Education'),
        },
        EducationService,
      ],
    }).compile();

    service = module.get<EducationService>(EducationService);
    repository = module.get<EducationRepository>('EducationRepository');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CreateEducation', () => {
    const id = ObjectId.generate().toString();
    it('should handle education creation', async () => {
      repository.createEducation = jest
        .fn()
        .mockReturnValue({ error: null, data: { ...mockData, id } });
      let res: any;
      const { error, data } = await service.create(mockData);
      expect(error).toBeNull();
      expect(data).toMatchObject({ ...mockData, id });
    });

    it('should handle education creation error', async () => {
      repository.createEducation = jest.fn().mockReturnValueOnce({
        error: new Error('Network failure'),
        data: null,
      });

      const { error, data } = await service.create(mockData);

      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('FindAllEducation', () => {
    const id = ObjectId.generate().toString();
    it('should handle education retrieve all', async () => {
      repository.findEducation = jest
        .fn()
        .mockReturnValue({ error: null, data: [{ ...mockData, id }] });

      const { error, data } = await service.findAll();

      expect(error).toBeNull();
      expect(data).toMatchObject([{ ...mockData, id }]);
    });

    it('should handle education retrieve all error', async () => {
      repository.findEducation = jest.fn().mockReturnValueOnce({
        error: new Error('Network failure'),
        data: null,
      });

      const { error, data } = await service.findAll();
      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('GetEducation', () => {
    const id = ObjectId.generate().toString();
    it('should handle education retrieve all', async () => {
      repository.findOneEducation = jest
        .fn()
        .mockReturnValue({ error: null, data: { ...mockData, id } });

      const { error, data } = await service.findOne(id);

      expect(error).toBeNull();
      expect(data).toMatchObject({ ...mockData, id });
    });

    it('should handle education retrieve all error', async () => {
      repository.findOneEducation = jest.fn().mockReturnValueOnce({
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
    const updateData: UpdateEducationDto = { company: 'ACME[updated]' };
    it('should handle experience retrieve all', async () => {
      repository.updateEducation = jest.fn().mockReturnValue({
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

    it('should handle education retrieve all error', async () => {
      repository.updateEducation = jest.fn().mockReturnValueOnce({
        error: new Error('Network failure'),
        data: null,
      });

      const { error, data } = await service.update(id, updateData);
      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });

  describe('DeleteEducation', () => {
    const id = ObjectId.generate().toString();
    it('should handle education retrieve all', async () => {
      repository.deleteEducation = jest
        .fn()
        .mockResolvedValue({ error: null, data: null });
      const { error, data } = await service.remove(id);

      expect(error).toBeNull();
      expect(data).toBeNull();
    });

    it('should handle education retrieve all error', async () => {
      repository.deleteEducation = jest.fn().mockReturnValueOnce({
        error: new Error('Network failure'),
        data: null,
      });

      const { error, data } = await service.remove(id);
      expect(data).toBeNull();
      expect(error).toBeInstanceOf(Error);
    });
  });
});
