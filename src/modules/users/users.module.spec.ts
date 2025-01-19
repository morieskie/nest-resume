import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from './repositories/user.repository';

describe('UsersModule', () => {
  let module: TestingModule;
  const mock = {
    createEntityManager: jest.fn(),
  };
  let repository: UserRepository;
  let service: UsersService;
  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider('DATA_SOURCE')
      .useValue(mock)
      .compile();
    repository = module.get<UserRepository>('UserRepository');
    service = module.get<UsersService>(UsersService);
  });

  it('should compile the UsersModule', () => {
    const usersController = module.get<UsersController>(UsersController);

    expect(usersController).toBeDefined();
  });

  it('should provide userProviders', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
