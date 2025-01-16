import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeatureRoute } from './features/feature.route';
import { DatabaseModule } from './typesorm.config';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    // FeatureRoute
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
