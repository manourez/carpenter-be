import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CeilingPerfController } from './ceiling-perf.controller';
import { CeilingPerfService } from '../service/ceiling-perf.service';
import { CeilingPerf } from '../entity/ceiling-perf.entity';
import { ceilingPerformances, RepositoryMock } from '../../../utils';

describe('CeilingPerfController', () => {
  let controller: CeilingPerfController;
  let service: CeilingPerfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CeilingPerfController],
      providers: [
        CeilingPerfService,
        { provide: getRepositoryToken(CeilingPerf), useClass: RepositoryMock },
      ],
    }).compile();

    controller = module.get<CeilingPerfController>(CeilingPerfController);
    service = module.get<CeilingPerfService>(CeilingPerfService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of ceilings performances', async () => {
      jest
        .spyOn(service, 'fetchAll')
        .mockImplementation(() => Promise.resolve(ceilingPerformances));

      expect(await controller.fetchPerformances()).toBe(ceilingPerformances);
    });
  });
});
