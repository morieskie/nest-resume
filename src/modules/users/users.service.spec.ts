import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

const UserRepository = jest.fn().mockImplementation(() => ({
  createUser: jest.fn(),
  updataUser: jest.fn(),
  findOneUser: jest.fn(),
  deleteUser: jest.fn(),
}));

const userProviders = [
  {
    provide: 'UserRepository',
    useFactory: () => new UserRepository(),
  },
];

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [...userProviders, UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
