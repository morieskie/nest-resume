import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from 'src/features/database.module';

describe('UsersModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();
  });

  it('should compile the UsersModule', () => {
    const usersController = module.get<UsersController>(UsersController);
    const usersService = module.get<UsersService>(UsersService);

    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  it('should provide userProviders', () => {
    const providers = userProviders.map((provider) =>
      module.get(provider.provide),
    );
    providers.forEach((providerInstance) =>
      expect(providerInstance).toBeDefined(),
    );
  });
});
