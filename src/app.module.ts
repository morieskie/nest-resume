import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureRoute } from './features/feature.route';

@Module({
  imports: [
    FeatureRoute
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
