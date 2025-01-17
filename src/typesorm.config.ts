import { join } from 'path';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const mongodbUrl = configService.get<string>('MONGODB_URL');
      if (!mongodbUrl) {
        throw new Error('MONGODB_URL is not defined in the configuration');
      }

      const dataSource = new DataSource({
        type: 'mongodb',
        url: mongodbUrl,
        entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
        synchronize: true,
        useUnifiedTopology: true,
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