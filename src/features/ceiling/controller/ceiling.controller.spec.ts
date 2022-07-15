import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm';
import { CeilingController } from './ceiling.controller';
import { Ceiling } from '../entity/ceiling.entity';
import { CeilingService } from '../service/ceiling.service';
import { CreateCeilingDto, UpdateCeilingDto } from '../dtos';
import { CeilingPerfService } from '../../ceiling-perf/service/ceiling-perf.service';
import { ceilings, RepositoryMock, CeilingPerfMock } from '../../../utils';

describe('CeilingController', () => {
  let ceilingController: CeilingController;
  let ceilingService: CeilingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CeilingController],
      providers: [
        CeilingService,
        { provide: getRepositoryToken(Ceiling), useClass: RepositoryMock },
        { provide: CeilingPerfService, useClass: CeilingPerfMock },
      ],
    }).compile();

    ceilingController = module.get<CeilingController>(CeilingController);
    ceilingService = module.get<CeilingService>(CeilingService);
  });

  it('should be defined', () => {
    expect(ceilingController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of ceilings', async () => {
      jest
        .spyOn(ceilingService, 'findAllCeiling')
        .mockImplementation(() => Promise.resolve(ceilings));

      expect(await ceilingController.fetchCeilings()).toBe(ceilings);
    });
  });

  describe('findOne', () => {
    it('should return the ceiling whose id is passed', async () => {
      jest
        .spyOn(ceilingService, 'findOneCeiling')
        .mockImplementation(() => Promise.resolve(ceilings[0]));

      expect(await ceilingController.getCeiling('1')).toBe(ceilings[0]);
    });
  });

  describe('CreateOne', () => {
    it('should create a ceiling', async () => {
      const requestBody: CreateCeilingDto = {
        name: 'Octar',
        imageUrl:
          'https://jardinage.lemonde.fr/images/dossiers/2018-09/faux-plafond-161905.jpg',
        reference: 'CX00328',
        price: 3100,
        height: 200,
        width: 250,
      };

      const response = {
        ...requestBody,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        id: 4,
      };

      jest
        .spyOn(ceilingService, 'createCeiling')
        .mockImplementation(() => Promise.resolve(response));

      expect(await ceilingController.createCeiling(requestBody)).toBe(response);
    });
  });

  describe('UpdateOne', () => {
    it('should update a ceiling', async () => {
      const requestBody: UpdateCeilingDto = {
        name: 'Octarion',
      };

      const response = {
        name: 'Octarion',
        imageUrl:
          'https://jardinage.lemonde.fr/images/dossiers/2018-09/faux-plafond-161905.jpg',
        reference: 'CX00328',
        price: 3100,
        height: 200,
        width: 250,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        id: 4,
      };

      jest
        .spyOn(ceilingService, 'updateCeiling')
        .mockImplementation(() => Promise.resolve(response));

      expect(await ceilingController.updateCeiling('2', requestBody)).toBe(
        response,
      );
    });
  });

  describe('DeleteOne', () => {
    it('should delete a ceiling', async () => {
      const updatedResult = new UpdateResult();

      jest
        .spyOn(ceilingService, 'deleteOneCeiling')
        .mockImplementation(() => Promise.resolve(updatedResult));

      expect(await ceilingController.deleteCeiling('2')).toBe(updatedResult);
    });
  });
});
