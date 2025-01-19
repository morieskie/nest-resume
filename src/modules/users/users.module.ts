import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../../features/database.module';
import { projectsProviders } from '../projects/projects.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userProviders, ...projectsProviders],
  exports: [...userProviders],
})
export class UsersModule {}
