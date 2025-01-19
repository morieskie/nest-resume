import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { userProviders } from './user.providers';
import { UserRepository } from './repositories/user.repository';

const userRepositoryMock = {
  createUser: jest.fn(),
  updateUser: jest.fn(),
  findOneUser: jest.fn(),
  deleteUser: jest.fn(),
  findUsers: jest.fn().mockReturnValue([{ id: 'test', name: 'Test User' }]),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'UserRepository',
          useValue: userRepositoryMock,
        },
      ],
    })
      .overrideProvider('DATA_SOURCE')
      .useValue(userRepositoryMock)
      .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all users from MongoDB', async () => {
    const spy = jest.spyOn(userRepositoryMock, 'findUsers');
    const response = await service.findAll();
    expect(spy).toHaveBeenCalled();
  });

  it('should get one user from MongoDB', async () => {
    const spy = jest.spyOn(userRepositoryMock, 'findOneUser');
    const response = await service.findOne('ObjectId(8845jdgvd)');
    expect(spy).toHaveBeenCalled();
  });

  it('should delete a user from MongoDB', async () => {
    const spy = jest.spyOn(userRepositoryMock, 'deleteUser');
    const response = await service.remove('ObjectId(8845jdgvd)');
    expect(spy).toHaveBeenCalled();
  });

  it('should update a user from MongoDB', async () => {
    const spy = jest.spyOn(userRepositoryMock, 'updateUser');
    const response = await service.update('ObjectId(8845jdgvd)', {
      email: 'jane@doe.io',
    });
    expect(spy).toHaveBeenCalledWith('ObjectId(8845jdgvd)', {
      email: 'jane@doe.io',
    });
  });

  it('should create a user', () => {
    const spy = jest.spyOn(userRepositoryMock, 'createUser');
    const data = {
      name: { firstName: 'test', lastName: 'user' },
      email: 'email@test.com',
      address: 'Hello World, 142',
      mobileNumber: '123656576',
      dob: '12/12/2012',
      imageSrc: 'avatar.png',
      bio: 'testing',
    };
    service.create(data);
    expect(spy).toHaveBeenCalledWith(data);
  });
});
