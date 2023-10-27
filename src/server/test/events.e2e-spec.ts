import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateEventDtoStub } from '../src/events/dto/create-event.dto.stub';
import { UpdateEventDtoStub } from '../src/events/dto/update-event.dto.stub';

describe('EventsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  describe('POST /api/events/add', () => {
    it('inserts new event', async () => {
      const result = await request(app.getHttpServer())
        .post('/api/events/add')
        .send(CreateEventDtoStub());

      expect(result.statusCode).toBe(201);

      const { body } = result;
      expect(body.id).toBe(CreateEventDtoStub()._id);
      expect(body.name).toBe(CreateEventDtoStub().name);
      expect(body.type).toBe(CreateEventDtoStub().type);
      expect(body.priority).toBe(CreateEventDtoStub().priority);
      expect(body.description).toBe(CreateEventDtoStub().description);
    });

    it('fails to insert duplicate event', async () => {
      const result = await request(app.getHttpServer())
        .post('/api/events/add')
        .send(CreateEventDtoStub());

      expect(result.statusCode).toBe(409);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
