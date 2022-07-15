import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CeilingPerf } from '../src/features/ceiling-perf/entity/ceiling-perf.entity';

describe('Ceiling Perf (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dataSource = app.get(DataSource);
  });

  beforeEach(() => {
    const ceilingPerfRepo = dataSource.getRepository(CeilingPerf);
    ceilingPerfRepo.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET should fetch all ceiling performance', () => {
    return request(app.getHttpServer()).get('/ceiling-perf').expect(200);
  });
});
