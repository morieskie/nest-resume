import { Test, TestingModule } from '@nestjs/testing';
import { EducationRepository } from './education.repository';
import { dataSourceMock } from '../../../../mocks/mock.help';
import { ObjectId } from 'mongodb';
import { CreateEducationDto } from '../dto/create-education.dto';

describe('EducationRepository', () => {
  let repository: EducationRepository;
  const mockData: CreateEducationDto = {
    userId: ObjectId.generate(new Date().getTime()).toString(),
    company: 'Tesla',
    from: '12/12/2012',
    to: '12/12/2024',
    description: 'Space Travel',
    subjects: ['space', 'evs'],
  };
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        {
          provide: 'DATA_SOURCE',
          useValue: dataSourceMock,
        },
        {
          provide: EducationRepository,
          useFactory: (ds) => new EducationRepository(dataSourceMock as any),
        },
      ],
    }).compile();
    repository = module.get<EducationRepository>(EducationRepository);
  });

  describe('GetAllEducations', () => {
    it('should handle retrieve all education', async () => {
      const id = ObjectId.generate(new Date().getTime()).toString();
      repository.find = jest.fn().mockReturnValue([{ ...mockData, id }]);
      const { error, data } = await repository.findEducation(mockData);
      expect(error).toBeNull();
      expect(data).toMatchObject([{ ...mockData, id }]);
    });
    it('should handle retrieve all education error', async () => {
      const id = ObjectId.generate(new Date().getTime()).toString();
      repository.find = jest
        .fn()
        .mockRejectedValueOnce(new Error('Mongo error'));
      const { error, data } = await repository.findEducation(mockData);
      expect(error).toBeInstanceOf(Error);
      expect(data).toBeNull();
    });
  });

  describe('CreateEducation', () => {
    it('should handle creating education', async () => {
      const id = ObjectId.generate(new Date().getTime()).toString();
      repository.save = jest.fn().mockReturnValue({ ...mockData, id });
      const { error, data } = await repository.createEducation(mockData);
      expect(error).toBeNull();
      expect(data).toMatchObject({ ...mockData, id });
    });
    it('should handle creating education', async () => {
      const id = ObjectId.generate(new Date().getTime()).toString();
      repository.save = jest
        .fn()
        .mockRejectedValueOnce(new Error('Mongo error'));
      const { error, data } = await repository.createEducation(mockData);
      expect(error).toBeInstanceOf(Error);
      expect(data).toBeNull();
    });
  });

  describe('UpdateEducation', () => {
    const id = ObjectId.generate(new Date().getTime()).toString();

    it('should handle update education', async () => {
      const company = 'Updated ';
      repository.update = jest
        .fn()
        .mockReturnValue({ ...mockData, id, company });
      const { error, data } = await repository.updateEducation(id, mockData);
      expect(error).toBeNull();
      expect(data).toMatchObject({ ...mockData, id, company });
    });

    it('should handle update education error', async () => {
      repository.update = jest
        .fn()
        .mockRejectedValueOnce(new Error('Mongo error'));
      const { error, data } = await repository.updateEducation(id, mockData);
      expect(error).toBeInstanceOf(Error);
      expect(data).toBeNull();
    });
  });

  describe('GetEducation', () => {
    const id = ObjectId.generate(new Date().getTime()).toString();

    it('should handle retrieve education', async () => {
      repository.findOne = jest.fn().mockReturnValue({ ...mockData, id });
      const { error, data } = await repository.findOneEducation(id);
      expect(error).toBeNull();
      expect(data).toMatchObject({ ...mockData, id });
    });

    it('should handle retrieve education error', async () => {
      repository.findOne = jest
        .fn()
        .mockRejectedValueOnce(new Error('Mongo error'));
      const { error, data } = await repository.findOneEducation(id);
      expect(error).toBeInstanceOf(Error);
      expect(data).toBeNull();
    });
  });

  describe('RemoveEducation', () => {
    const id = ObjectId.generate(new Date().getTime()).toString();

    it('should handle delete education', async () => {
      repository.delete = jest.fn().mockReturnValue(undefined);
      const { error, data } = await repository.deleteEducation(id);
      expect(error).toBeNull();
      expect(data).toBeUndefined();
    });

    it('should handle delete education error', async () => {
      repository.delete = jest
        .fn()
        .mockRejectedValueOnce(new Error('Mongo error'));
      const { error, data } = await repository.deleteEducation(id);
      expect(error).toBeInstanceOf(Error);
      expect(data).toBeNull();
    });
  });
});
