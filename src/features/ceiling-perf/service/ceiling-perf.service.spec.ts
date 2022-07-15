import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CeilingPerfService } from './ceiling-perf.service';
import { CeilingPerf } from '../entity/ceiling-perf.entity';
import { RepositoryMock, ceilingPerformances } from '../../../utils';

describe('CeilingPerfService', () => {
  let service: CeilingPerfService;

  function seedCeilingPerformances() {
    ceilingPerformances.forEach((performance) =>
      service.createOne(performance),
    );
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CeilingPerfService,
        { provide: getRepositoryToken(CeilingPerf), useClass: RepositoryMock },
      ],
    }).compile();

    service = module.get<CeilingPerfService>(CeilingPerfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Ceiling performance initialization', () => {
    it('should initialize default', async () => {
      await service.createInitialCeilingPerformances();
      const performances: CeilingPerf[] = await service.fetchAll();
      expect(performances.length).toEqual(5);
    });
  });

  describe('Ceiling performance listing', () => {
    it('should return an empty array when there is no item', async () => {
      const performances: CeilingPerf[] = await service.fetchAll();

      expect(performances.length).toEqual(0);
    });

    it('should return the list of all the item present', async () => {
      seedCeilingPerformances();
      const ceilings: CeilingPerf[] = await service.fetchAll();

      expect(ceilings.length).toEqual(2);
    });
  });

  describe('Ceiling performance retrieval', () => {
    it('should retrieve the item whose id is passed', async () => {
      seedCeilingPerformances();
      const perf: CeilingPerf = await service.fetchOne(1);

      expect(perf).toBeDefined();
      expect(perf.name).toEqual('Robust');
    });

    it('Should throw an error when the item is not in the list', async () => {
      try {
        await service.fetchOne(5);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
