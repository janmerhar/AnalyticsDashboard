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

  describe('GET /api/events', () => {
    it('should return array of events', async () => {
      const result = await request(app.getHttpServer()).get('/api/events');

      expect(result.statusCode).toBe(200);
      expect(Array.isArray(result.body)).toBe(true);
    });

    it("filters events by 'type' query param", async () => {
      const result = await request(app.getHttpServer())
        .get('/api/events?type=crosspromo')
        .query({ type: CreateEventDtoStub().type });

      expect(result.statusCode).toBe(200);
      expect(Array.isArray(result.body)).toBe(true);

      if (result.body.length > 0) {
        result.body.forEach((event) => {
          expect(event.type).toBe(CreateEventDtoStub().type);
        });
      }
    });

    it("filters events by 'priority' query param", async () => {
      const result = await request(app.getHttpServer())
        .get('/api/events')
        .query({ priority: CreateEventDtoStub().priority });

      expect(result.statusCode).toBe(200);
      expect(Array.isArray(result.body)).toBe(true);

      if (result.body.length > 0) {
        result.body.forEach((event) => {
          expect(event.priority).toBe(CreateEventDtoStub().priority);
        });
      }
    });

    it("filters events by 'type' and 'priority' query params combined", async () => {
      const result = await request(app.getHttpServer())
        .get('/api/events')
        .query({
          priority: CreateEventDtoStub().priority,
          type: CreateEventDtoStub().type,
        });

      expect(result.statusCode).toBe(200);
      expect(Array.isArray(result.body)).toBe(true);

      if (result.body.length > 0) {
        result.body.forEach((event) => {
          expect(event.priority).toBe(CreateEventDtoStub().priority);
          expect(event.type).toBe(CreateEventDtoStub().type);
        });
      }
    });

    it("sorts events by 'type' query param", async () => {
      const result = await request(app.getHttpServer())
        .get('/api/events')
        .query({ sort: 'type', order: 'asc' });

      expect(result.statusCode).toBe(200);
      expect(Array.isArray(result.body)).toBe(true);

      if (result.body.length > 1) {
        for (let i = 0; i < result.body.length - 1; i++) {
          const currentEvent = result.body[i];
          const nextEvent = result.body[i + 1];
          expect(currentEvent.type <= nextEvent.type).toBe(true);
        }
      }
    });

    it("sorts events by 'priority' query param", async () => {
      const result = await request(app.getHttpServer())
        .get('/api/events')
        .query({ sort: 'priority', order: 'asc' });

      expect(result.statusCode).toBe(200);
      expect(Array.isArray(result.body)).toBe(true);

      if (result.body.length > 1) {
        for (let i = 0; i < result.body.length - 1; i++) {
          const currentEvent = result.body[i];
          const nextEvent = result.body[i + 1];
          expect(currentEvent.priority <= nextEvent.priority).toBe(true);
        }
      }
    });

    it('sorts events by name', async () => {
      const result = await request(app.getHttpServer())
        .get('/api/events')
        .query({ sort: 'name', order: 'asc' });

      expect(result.statusCode).toBe(200);
      expect(Array.isArray(result.body)).toBe(true);

      if (result.body.length > 1) {
        for (let i = 0; i < result.body.length - 1; i++) {
          const currentEvent = result.body[i];
          const nextEvent = result.body[i + 1];
          expect(currentEvent.name <= nextEvent.name).toBe(true);
        }
      }
    });
  });

  describe('PATCH /api/events/update/:id', () => {
    const createEventDto = CreateEventDtoStub();
    const updateEventDto = UpdateEventDtoStub();

    it('updates existing event', async () => {
      const result = await request(app.getHttpServer())
        .patch(`/api/events/update/${createEventDto._id}`)
        .send(updateEventDto);

      expect(result.statusCode).toBe(200);

      const { body } = result;
      expect(body.id).toBe(updateEventDto._id);
      expect(body.name).toBe(updateEventDto.name);
      expect(body.type).toBe(updateEventDto.type);
      expect(body.priority).toBe(updateEventDto.priority);
      expect(body.description).toBe(updateEventDto.description);
    });

    it('fails to update non-existing event', async () => {
      const result = await request(app.getHttpServer())
        .patch(`/api/events/update/${createEventDto._id * 1000}`)
        .send(updateEventDto);

      expect(result.statusCode).toBe(409);
    });
  });

  describe('DELETE /api/events/delete/:id', () => {
    it('deletes existing event', async () => {
      const result = await request(app.getHttpServer())
        .delete(`/api/events/delete/${UpdateEventDtoStub()._id}`)
        .send(CreateEventDtoStub());

      expect(result.statusCode).toBe(200);
    });

    it('fails to delete non-existing event', async () => {
      const result = await request(app.getHttpServer()).delete(
        `/api/events/delete/${UpdateEventDtoStub()._id}`,
      );

      expect(result.statusCode).toBe(204);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
