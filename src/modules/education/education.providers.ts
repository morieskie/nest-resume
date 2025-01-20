import { DataSource } from 'typeorm';
import { EducationService } from './education.service';
import { EducationRepository } from './repositories/education.repository';

export const educationProviders = [
  {
    provide: 'EducationRepository',
    useFactory: (dataSource: DataSource) =>
      new EducationRepository(dataSource),
    inject: ['DATA_SOURCE'],
  },
  EducationService,
];
