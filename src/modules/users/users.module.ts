import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../../features/database.module';
import { projectsProviders } from '../projects/projects.providers';
import { educationProviders } from '../education/education.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...userProviders, ...projectsProviders, ...educationProviders],
  exports: [...userProviders],
})
export class UsersModule {}
