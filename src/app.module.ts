import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './features/auth/auth.module';
import { UserModule } from './features/user/user.module';
import { CoreModule } from './core/core.module';
import { CeilingModule } from './features/ceiling/ceiling.module';
import { CeilingPerfModule } from './features/ceiling-perf/ceiling-perf.module';

@Module({
  imports: [CoreModule, AuthModule, UserModule, CeilingModule, CeilingPerfModule],
  controllers: [AppController],
})
export class AppModule {}
