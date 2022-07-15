import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CeilingPerf } from '../entity/ceiling-perf.entity';
import { CreatePerformanceDto } from '../dtos';
import { INITIAL_PERFORMANCES } from '../../../shared';

@Injectable()
export class CeilingPerfService {
  constructor(
    @InjectRepository(CeilingPerf) private repository: Repository<CeilingPerf>,
  ) {}

  async createInitialCeilingPerformances() {
    for (const performance of INITIAL_PERFORMANCES) {
      const isPresent = await this.repository.findOneBy({
        name: performance.name,
      });
      if (!isPresent) await this.repository.save(performance);
      continue;
    }
  }

  createOne(requestBody: CreatePerformanceDto) {
    let performance: CeilingPerf;

    try {
      performance = this.repository.create(requestBody);
    } catch {
      throw new BadRequestException('Cette performance existe déjà !');
    }

    return this.repository.save(performance);
  }

  fetchAll() {
    return this.repository.find();
  }

  async fetchOne(id: number) {
    let performance: CeilingPerf;

    try {
      performance = await this.repository.findOneBy({ id });
    } catch {
      throw new NotFoundException(
        "Cette performance n'a pas pu être récupérée !",
      );
    }

    return performance;
  }
}
