import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/tribes/:id/repositories (GET)', () => {
    const id: number = 1;
    const errorObjectResponse = {
      statusCode: 404,
      message: 'La Tribu 1 no se encuentra registrada',
      error: 'Not Found',
    };
    return request(app.getHttpServer())
      .get(`/tribes/${id}/repositories`)
      .expect(404)
      .expect(errorObjectResponse);
  });

  it('/tribes/:id/repositories (GET)', () => {
    const id: number = 2;
    const errorObjectResponse = {
      statusCode: 404,
      message:
        'La Tribu 2 no tiene repositorios que cumplan con la cobertura necesaria',
      error: 'Not Found',
    };
    return request(app.getHttpServer())
      .get(`/tribes/${id}/repositories`)
      .expect(404)
      .expect(errorObjectResponse);
  });

  it('/tribes/:id/repositories (GET)', () => {
    const id: number = 3;
    return request(app.getHttpServer())
      .get(`/tribes/${id}/repositories`)
      .expect(200)
      .expect((_err, res) => {
        expect(typeof res.body.repositories).toBe('array')
      });
  });

  it('/tribes/:id/repositories/report (GET) download csv', () => {
    const id: number = 2;
    return request(app.getHttpServer())
      .get(`/tribes/${id}/repositories`)
      .expect(200)
  });
});
