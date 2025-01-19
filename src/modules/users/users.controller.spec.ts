import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const serviceMock = {
  create: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
  findAll: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);

    service = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', () => {
    const spy = jest.spyOn(service, 'findAll');
    controller.findAll();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should findOne user', () => {
    const spy = jest.spyOn(service, 'findOne');
    controller.findOne('ObjectId.12');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should update a user', () => {
    const spy = jest.spyOn(service, 'update');
    controller.update('ObjectId.12', { email: 'hello@world.com' });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should delete a user', () => {
    const spy = jest.spyOn(service, 'remove');
    controller.remove('ObjectId.12');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should create a user', () => {
    const spy = jest.spyOn(service, 'create');
    const data = {
      name: { firstName: 'test', lastName: 'user' },
      email: 'email@test.com',
      address: 'Hello World, 142',
      mobileNumber: '123656576',
      dob: '12/12/2012',
      imageSrc: 'avatar.png',
      bio: 'testing',
    };
    controller.create(data);
    expect(spy).toHaveBeenCalledWith(data);
  });
});
