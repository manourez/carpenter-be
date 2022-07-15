import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CeilingPerfController } from './controller/ceiling-perf.controller';
import { CeilingPerf } from './entity/ceiling-perf.entity';
import { CeilingPerfService } from './service/ceiling-perf.service';

@Module({
  imports: [TypeOrmModule.forFeature([CeilingPerf])],
  controllers: [CeilingPerfController],
  providers: [CeilingPerfService],
  exports: [CeilingPerfService],
})
export class CeilingPerfModule {}
