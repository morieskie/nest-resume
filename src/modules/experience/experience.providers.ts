import { DataSource } from 'typeorm';
import { ExperienceService } from './experience.service';
import { ExperienceRepository } from './repositories/experience.repository';

export const experienceProviders = [
  {
    provide: 'ExperienceRepository',
    useFactory: (dataSource: DataSource) =>
      new ExperienceRepository(dataSource),
    inject: ['DATA_SOURCE'],
  },
  ExperienceService,
];
