import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCeilingDto, UpdateCeilingDto } from '../dtos';
import { Ceiling } from '../entity/ceiling.entity';
import { CeilingPerfService } from '../../ceiling-perf/service/ceiling-perf.service';
import { INITIAL_CEILING } from '../../../shared';

@Injectable()
export class CeilingService {
  constructor(
    @InjectRepository(Ceiling) private repository: Repository<Ceiling>,
    private ceilingPerfService: CeilingPerfService,
  ) {}

  async createInitialCeiling() {
    for (const ceiling of INITIAL_CEILING) {
      const isPresent = await this.repository.findOneBy({
        name: ceiling.name,
      });
      if (!isPresent) await this.repository.save(ceiling);
      continue;
    }
  }

  async createCeiling(requestBody: CreateCeilingDto) {
    let ceiling: Ceiling;

    if (requestBody.perfs) {
      const { perfs, ...otherProps } = requestBody;
      const perfArray = perfs.split(';');
      const performances = await Promise.all(
        perfArray.map((id) => this.ceilingPerfService.fetchOne(+id)),
      );

      ceiling = this.repository.create(otherProps);
      ceiling.performces = performances;
    } else {
      ceiling = this.repository.create(requestBody);
    }

    return this.repository.save(ceiling);
  }

  async updateCeiling(id: number, requestBody: UpdateCeilingDto) {
    const ceiling = await this.findOneCeiling(id);
    let updatedCeiling: Ceiling;

    if (requestBody.perfs) {
      const { perfs, ...otherProps } = requestBody;
      const perfArray = perfs.split(';');
      const performances = await Promise.all(
        perfArray.map((id) => this.ceilingPerfService.fetchOne(+id)),
      );

      ceiling.performces = performances;

      updatedCeiling = { ...ceiling, ...otherProps };
    } else {
      updatedCeiling = { ...ceiling, ...requestBody };
    }

    return this.repository.save(updatedCeiling);
  }

  findAllCeiling() {
    return this.repository.find({
      relations: {
        performces: true,
      },
    });
  }

  async findOneCeiling(id: number) {
    let ceiling: Ceiling;

    try {
      ceiling = await this.repository.findOne({
        relations: {
          performces: true,
        },
        where: {
          id,
        },
      });
    } catch {
      throw new NotFoundException("Ce plafond n'existe pas !");
    }

    return ceiling;
  }

  async deleteOneCeiling(id: number) {
    return this.repository.softDelete(id);
  }
}
