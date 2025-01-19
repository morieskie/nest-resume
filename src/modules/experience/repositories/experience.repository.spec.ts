import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceRepository } from './experience.repository';
import { dataSourceMock } from '../../../../mocks/mock.help';
import { ObjectId } from 'mongodb';
import { DataSource } from 'typeorm';

describe('ExprienceRepository', () => {
  let repository: ExperienceRepository;
  const mockData = {
    company: 'acme',
    from: 'Feb 2022',
    to: 'Aug 2024',
    role: 'Jnr Nodejs Tester',
    description:
      'Responsible for unit testing using jest, karma, moacha, chai so on.',
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
          provide: ExperienceRepository,
          useFactory: (ds) => new ExperienceRepository(dataSourceMock as any),
        },
      ],
    }).compile();
    repository = module.get<ExperienceRepository>(ExperienceRepository);
  });

  describe('GetAllExperiences', () => {
    it('should handle retrieve all experience', async () => {
      const id = ObjectId.generate(new Date().getTime()).toString();
      repository.find = jest.fn().mockReturnValue([{ ...mockData, id }]);
      const { error, data } = await repository.findExperiences(mockData);
      expect(error).toBeNull();
      expect(data).toMatchObject([{ ...mockData, id }]);
    });
    it('should handle retrieve all experience error', async () => {
      const id = ObjectId.generate(new Date().getTime()).toString();
      repository.find = jest
        .fn()
        .mockRejectedValueOnce(new Error('Mongo error'));
      const { error, data } = await repository.findExperiences(mockData);
      expect(error).toBeInstanceOf(Error);
      expect(data).toBeNull();
    });
  });

  describe('CreateExperience', () => {
    it('should handle creating experience', async () => {
      const id = ObjectId.generate(new Date().getTime()).toString();
      repository.save = jest.fn().mockReturnValue({ ...mockData, id });
      const { error, data } = await repository.createExperience(mockData);
      expect(error).toBeNull();
      expect(data).toMatchObject({ ...mockData, id });
    });
    it('should handle creating experience', async () => {
      const id = ObjectId.generate(new Date().getTime()).toString();
      repository.save = jest
        .fn()
        .mockRejectedValueOnce(new Error('Mongo error'));
      const { error, data } = await repository.createExperience(mockData);
      expect(error).toBeInstanceOf(Error);
      expect(data).toBeNull();
    });
  });

  describe('UpdateExperience', () => {
    const id = ObjectId.generate(new Date().getTime()).toString();

    it('should handle update experience', async () => {
      const company = 'Updated ';
      repository.update = jest
        .fn()
        .mockReturnValue({ ...mockData, id, company });
      const { error, data } = await repository.updateExperience(id, mockData);
      expect(error).toBeNull();
      expect(data).toMatchObject({ ...mockData, id, company });
    });

    it('should handle update experience error', async () => {
      repository.update = jest
        .fn()
        .mockRejectedValueOnce(new Error('Mongo error'));
      const { error, data } = await repository.updateExperience(id, mockData);
      expect(error).toBeInstanceOf(Error);
      expect(data).toBeNull();
    });
  });

  describe('GetExperience', () => {
    const id = ObjectId.generate(new Date().getTime()).toString();

    it('should handle retrieve experience', async () => {
      repository.findOne = jest.fn().mockReturnValue({ ...mockData, id });
      const { error, data } = await repository.findOneExperience(id);
      expect(error).toBeNull();
      expect(data).toMatchObject({ ...mockData, id });
    });

    it('should handle retrieve experience error', async () => {
      repository.findOne = jest
        .fn()
        .mockRejectedValueOnce(new Error('Mongo error'));
      const { error, data } = await repository.findOneExperience(id);
      expect(error).toBeInstanceOf(Error);
      expect(data).toBeNull();
    });
  });

  describe('RemoveExperience', () => {
    const id = ObjectId.generate(new Date().getTime()).toString();

    it('should handle delete experience', async () => {
      repository.delete = jest.fn().mockReturnValue(undefined);
      const { error, data } = await repository.deleteExperience(id);
      expect(error).toBeNull();
      expect(data).toBeUndefined();
    });

    it('should handle delete experience error', async () => {
      repository.delete = jest
        .fn()
        .mockRejectedValueOnce(new Error('Mongo error'));
      const { error, data } = await repository.deleteExperience(id);
      expect(error).toBeInstanceOf(Error);
      expect(data).toBeNull();
    });
  });
});
