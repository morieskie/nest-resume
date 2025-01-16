import { join } from 'path';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        username: 'mongodb',
        password: 'mongo',
        database: 'nest-resume',
        entities: [join(__dirname, '**', '*.entity{.ts,.js}')], 
        synchronize: true,
        useUnifiedTopology: true
      });

      try {
        return await dataSource.initialize();
      } catch (error) {
        console.error('Error during DataSource initialization', error);
        throw error;
      }
    },
  },
];