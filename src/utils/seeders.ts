import { INestApplication } from '@nestjs/common';
import { CeilingPerfService } from '../features/ceiling-perf/service/ceiling-perf.service';
import { CeilingService } from '../features/ceiling/service/ceiling.service';

export const launchSeeders = async (app: INestApplication) => {
  const ceilingServiceFromSeeders = app.get(CeilingService);
  const ceilingPerformanceFromSeeders = app.get(CeilingPerfService);

  await ceilingServiceFromSeeders.createInitialCeiling();
  await ceilingPerformanceFromSeeders.createInitialCeilingPerformances();
};
