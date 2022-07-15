import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CeilingPerfService } from '../service/ceiling-perf.service';

@ApiTags('Ceiling performances')
@Controller('ceiling-perf')
export class CeilingPerfController {
  constructor(private ceilingPerfService: CeilingPerfService) {}

  @Get()
  fetchPerformances() {
    return this.ceilingPerfService.fetchAll();
  }
}
