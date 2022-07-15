import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { User } from '../src/features/user/entity/user.entity';

describe('Auth (e2e)', () => {
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
    const userRepo = dataSource.getRepository(User);
    userRepo.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register a user', async () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'manu@hotmail.fr', password: 'badaboom' })
      .expect(201);
  });

  it('Should not login with incorrect credentials', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'manulo@hotmail.fr', password: 'badaboom' })
      .expect(401);
  });

  it('Should login if correct credentials', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'manu@hotmail.fr', password: 'badaboom' });

    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'manu@hotmail.fr', password: 'badaboom' })
      .expect(201)
      .then(({ body }) => {
        expect(body.email).toBe('manu@hotmail.fr');
        expect(body.password).not.toBeDefined();
      });
  });
});
