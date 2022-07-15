import { Module } from '@nestjs/common';
import { CeilingService } from './service/ceiling.service';
import { CeilingController } from './controller/ceiling.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ceiling } from './entity/ceiling.entity';
import { CeilingPerfModule } from '../ceiling-perf/ceiling-perf.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ceiling]), CeilingPerfModule],
  providers: [CeilingService],
  controllers: [CeilingController],
  exports: [CeilingService],
})
export class CeilingModule {}
