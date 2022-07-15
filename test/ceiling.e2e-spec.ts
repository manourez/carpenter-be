import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  CreateCeilingDto,
  UpdateCeilingDto,
} from '../src/features/ceiling/dtos';

describe('Ceiling (e2e)', () => {
  let app: INestApplication;
  let id: number;

  const requestBody: CreateCeilingDto = {
    name: 'Octar',
    imageUrl:
      'https://jardinage.lemonde.fr/images/dossiers/2018-09/faux-plafond-161905.jpg',
    reference: 'CX00328',
    price: 3100,
    height: 200,
    width: 250,
  };

  const updateRequest: UpdateCeilingDto = {
    name: 'Octopus',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/GET fetch all ceiling', () => {
    return request(app.getHttpServer()).get('/ceiling').expect(200);
  });

  it('/POST create a new ceiling', () => {
    return request(app.getHttpServer())
      .post('/ceiling')
      .send(requestBody)
      .expect(201)
      .then(({ body }) => {
        expect(body.id).toBeDefined();
        id = body.id;
      });
  });

  it('/GET on ceiling by its given id create a new ceiling', () => {
    return request(app.getHttpServer()).get(`/ceiling/${id}`).expect(200);
  });

  it('/PATCH update the ceiling whose id is passed', () => {
    return request(app.getHttpServer())
      .patch(`/ceiling/${id}`)
      .send(updateRequest)
      .expect(200);
  });

  it('/DELETE the ceilin whose id is passed', () => {
    return request(app.getHttpServer()).delete(`/ceiling/${id}`).expect(200);
  });
});
