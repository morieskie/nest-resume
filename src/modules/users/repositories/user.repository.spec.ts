import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { DataSource } from 'typeorm';
import { userProviders } from '../user.providers';
import { ObjectId } from 'mongodb';
import { createMockService, dataSourceMock } from '../../../../mocks/mock.help';
import { ProjectsService } from '../../projects/projects.service';
import { ExperienceService } from '../../experience/experience.service';
import { Experience } from '../../experience/entities/experience.entity';
import { EducationService } from '../../education/education.service';
import { Education } from '../../education/entities/education.entity';

describe('UserRepository', () => {
  let repository: UserRepository;
  let module: TestingModule;
  let projectService: ProjectsService;
  let mockData: CreateUserDto = {
    name: {
      firstName: 'Test',
      lastName: 'User',
    },
    email: 'abc2123.com',
    dob: '01/10/2001',
    address: 'Test 123, TX',
    mobileNumber: '+01 233 456677',
    imageSrc: 'https://placehold.co/274x274?text=Test+User&font=roboto',
    bio: 'Test ATC',
    socialLinks: [
      {
        firm: 'facebook',
        url: 'https://facebook.com',
      },
    ],
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        {
          provide: 'DATA_SOURCE',
          useValue: dataSourceMock,
        },
        {
          provide: DataSource,
          useValue: dataSourceMock,
        },
        UserRepository,
        ...userProviders,
        {
          provide: ProjectsService,
          useValue: createMockService(ProjectsService),
        },
        {
          provide: ExperienceService,
          useValue: createMockService(Experience),
        },
        {
          provide: EducationService,
          useValue: createMockService(Education),
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    projectService = module.get<ProjectsService>(ProjectsService);
  });

  describe('CreateUser', () => {
    it('should handle success', async () => {
      const id = ObjectId.generate(new Date().getTime());
      repository.save = jest.fn().mockReturnValue({
        ...mockData,
        id: id,
      });

      const { error, data } = await repository.createUser(mockData);
      expect(error).toBeNull();
      expect(data).toMatchObject({ ...mockData, id });
    });

    it('should handle error response', async () => {
      const id = ObjectId.generate(new Date().getTime());
      repository.save = jest
        .fn()
        .mockRejectedValueOnce(new Error('Something went bizzack'));

      const { error, data } = await repository.createUser(mockData);

      expect(error).toBeInstanceOf(Error);
      expect(data).toBeNull();
    });
  });

  describe('UpdateUser', () => {
    const id = ObjectId.generate(new Date().getTime());
    const updateData = {
      name: {
        firstName: 'Tested',
        lastName: 'User',
      },
    };
    it('should handle success', async () => {
      repository.update = jest.fn().mockReturnValue({
        ...mockData,
        name: updateData.name,
      });

      const { error, data } = await repository.updateUser(
        id.toString(),
        updateData,
      );
      expect(error).toBeNull();
      expect(data).toMatchObject({
        ...mockData,
        name: updateData.name,
      });
    });

    it('should handle error response', async () => {
      repository.update = jest
        .fn()
        .mockRejectedValueOnce(new Error('Something went bizzack'));

      const { error, data } = await repository.updateUser(
        id.toString(),
        updateData,
      );

      expect(error).toBeInstanceOf(Error);
      expect(data).toBeNull();
    });
  });

  describe('GetUser', () => {
    const id = ObjectId.generate(new Date().getTime());

    it('should handle success', async () => {
      repository.findOne = jest.fn().mockReturnValue({
        ...mockData,
        id,
      });

      const { error, data } = await repository.findOneUser(id.toString());
      expect(error).toBeNull();
      expect(data).toMatchObject({
        ...mockData,
        id,
      });
    });

    it('should handle error response', async () => {
      repository.findOne = jest
        .fn()
        .mockRejectedValueOnce(new Error('Something went bizzack'));
      const { error, data } = await repository.findOneUser(id.toString());
      expect(error).toBe('Something went bizzack');
      expect(data).toBeNull();
    });
  });

  describe('GetUsers', () => {
    const id = ObjectId.generate(new Date().getTime());

    it('should handle retrieval without criteria filter', async () => {
      repository.find = jest.fn().mockReturnValue([
        {
          ...mockData,
          id,
        },
      ]);

      const { error, data } = await repository.findUsers();
      expect(error).toBeNull();
      expect(data).toMatchObject([
        {
          ...mockData,
          id,
        },
      ]);
    });

    it('should handle retrieval using criteria filter', async () => {
      repository.find = jest.fn().mockReturnValue([
        {
          ...mockData,
          id,
        },
      ]);

      const { error, data } = await repository.findUsers({
        email: 'abc2123.com',
      });
      expect(error).toBeNull();
      expect(data).toMatchObject([
        {
          ...mockData,
          id,
        },
      ]);
    });

    it('should handle failure error response', async () => {
      repository.find = jest
        .fn()
        .mockRejectedValueOnce(new Error('Something went bizzack'));
      const { error, data } = await repository.findUsers();
      expect(error).toBeInstanceOf(Error);
      expect(data).toBeNull();
    });
  });

  describe('DeleteUser', () => {
    const id = ObjectId.generate(new Date().getTime());

    it('should handle success', async () => {
      repository.delete = jest.fn().mockReturnValue(null);

      const { error, data } = await repository.deleteUser(id.toString());
      expect(error).toBeNull();
      expect(data).toBeNull();
    });

    it('should handle error response', async () => {
      repository.delete = jest
        .fn()
        .mockRejectedValueOnce(new Error('Something went bizzack'));
      const { error, data } = await repository.deleteUser(id.toString());

      expect(error).toBeInstanceOf(Error);
      expect(data).toBeNull();
    });
  });
});
