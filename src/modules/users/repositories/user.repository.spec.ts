import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { DataSource } from 'typeorm';
import { projectsProviders } from '../../projects/projects.providers';
import { userProviders } from '../user.providers';
import { ObjectId } from 'mongodb';

export const createMockRepository = <T>(entity: any, suffix: string = '') => {
  return {
    [`find${suffix}s`]: jest.fn(),
    [`findOne${suffix}`]: jest.fn(),
    [`create${suffix}`]: jest.fn(),
    [`update${suffix}`]: jest.fn(),
    [`delete${suffix}`]: jest.fn(),
  };
};
export const createMockService = <T>(entity: any) => {
  return {
    [`findAll`]: () => jest.fn().mockResolvedValue({ error: null, data: [] }),
    [`findOne`]: () => jest.fn(),
    [`create`]: () => jest.fn(),
    [`update`]: () => jest.fn(),
    [`remove`]: () => jest.fn(),
  };
};

describe('UserRepository', () => {
  let repository: UserRepository;
  let module: TestingModule;
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
    const dataSource = {
      getEntityManagerToken: jest.fn(),
      getEntityManagerEngine: jest.fn(),
      queryRunner: jest.fn(),
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
    module = await Test.createTestingModule({
      providers: [
        {
          provide: 'DATA_SOURCE',
          useValue: dataSource,
        },
        {
          provide: DataSource,
          useValue: dataSource,
        },
        UserRepository,
        ...projectsProviders,
        ...userProviders,
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
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
