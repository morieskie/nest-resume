import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureRoute } from './features/feature.route';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    FeatureRoute,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.development', '.env'],
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'CONFIG_SERVICE',
      useExisting: ConfigService,
    },
    AppService,
  ],
})
export class AppModule {}
