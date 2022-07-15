import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CeilingService } from './ceiling.service';
import { Ceiling } from '../entity/ceiling.entity';
import { CeilingPerfService } from '../../ceiling-perf/service/ceiling-perf.service';
import { RepositoryMock, ceilings, CeilingPerfMock } from '../../../utils';

describe('CeilingService', () => {
  let ceilingService: CeilingService;

  async function seedCeilings() {
    ceilings.forEach((ceiling) => ceilingService.createCeiling(ceiling));
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CeilingService,
        { provide: CeilingPerfService, useClass: CeilingPerfMock },
        { provide: getRepositoryToken(Ceiling), useClass: RepositoryMock },
      ],
    }).compile();

    ceilingService = module.get<CeilingService>(CeilingService);
  });

  it('should be defined', () => {
    expect(ceilingService).toBeDefined();
  });

  describe('Ceiling initialization', () => {
    it('should initialize default', async () => {
      await ceilingService.createInitialCeiling();
      const ceilings: Ceiling[] = await ceilingService.findAllCeiling();
      expect(ceilings.length).toEqual(5);
    });
  });

  describe('Ceiling listing', () => {
    it('should return an empty array when there is no item', async () => {
      const ceilings: Ceiling[] = await ceilingService.findAllCeiling();

      expect(ceilings.length).toEqual(0);
    });

    it('should return the list of all the item present', async () => {
      await seedCeilings();
      const ceilings: Ceiling[] = await ceilingService.findAllCeiling();

      expect(ceilings.length).toEqual(3);
    });
  });

  describe('Ceiling retrieval', () => {
    it('should retrieve the item whose id is passed', async () => {
      await seedCeilings();
      const ceiling: Ceiling = await ceilingService.findOneCeiling(1);

      expect(ceiling).toBeDefined();
      expect(ceiling.name).toEqual('Moderna');
    });

    it('Should throw an error when the item is not in the list', async () => {
      try {
        await ceilingService.findOneCeiling(5);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Ceiling edition', () => {
    it('should update the item whose id is passed according to the body', async () => {
      await seedCeilings();
      const ceiling: Ceiling = await ceilingService.updateCeiling(2, {
        name: 'blabla',
      });

      expect(ceiling.name).toEqual('blabla');
      expect(ceiling.name).not.toEqual('Arithmetics');
    });

    it('Should throw an error when the item is not in the list', async () => {
      try {
        await ceilingService.updateCeiling(5, { name: 'blabla' });
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Ceiling removal', () => {
    it('should remove the item whose id is passed from the list', async () => {
      await seedCeilings();
      const result = await ceilingService.deleteOneCeiling(1);

      expect(result.affected).toEqual(1);
    });

    it('Should throw an error when the item is not in the list', async () => {
      try {
        await ceilingService.deleteOneCeiling(5);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
