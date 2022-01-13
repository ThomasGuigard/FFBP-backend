import request from 'supertest';
import { app } from '../../app';
import {ApiRoute} from "../../enums/api-route";
import {EventKind} from "../../enums/event-kind";

const fixtures = {
  event: {
    name: 'Event test',
    date: new Date(),
    kind: EventKind.EXHIBIT,
    challengersIds: [],
  },
  invalid: {
    name: '',
    date: 'invalid date',
    kind: 'invalid event kind',
    challengersIds: 123,
  }
}

it('returns a 400 with an invalid name', async () => {
  return request(app)
    .post(ApiRoute.EVENTS)
    .send({
      name: fixtures.invalid.name,
      date: fixtures.event.date,
      kind: fixtures.event.kind,
      challengersIds: fixtures.event.challengersIds,
    })
    .expect(400);
});

it('returns a 400 with an invalid date', async () => {
  return request(app)
    .post(ApiRoute.EVENTS)
    .send({
      name: fixtures.event.name,
      date: fixtures.invalid.date,
      kind: fixtures.event.kind,
      challengersIds: fixtures.event.challengersIds,
    })
    .expect(400);
});

it('returns a 400 with an invalid kind', async () => {
  return request(app)
    .post(ApiRoute.EVENTS)
    .send({
      name: fixtures.event.name,
      date: fixtures.event.date,
      kind: fixtures.invalid.kind,
      challengersIds: fixtures.event.challengersIds,
    })
    .expect(400);
});

it('returns a 400 with an invalid challengers id', async () => {
  return request(app)
    .post(ApiRoute.EVENTS)
    .send({
      name: fixtures.event.name,
      date: fixtures.invalid.date,
      kind: fixtures.event.kind,
      challengersIds: fixtures.event.challengersIds,
    })
    .expect(400);
});

it('returns a 400 with missing name, date, kind, challengers ids', async () => {
  await request(app)
    .post(ApiRoute.EVENTS)
    .send({
      date: fixtures.event.date,
      kind: fixtures.event.kind,
      challengersIds: fixtures.event.challengersIds,
    })
    .expect(400);

  await request(app)
    .post(ApiRoute.EVENTS)
    .send({
      name: fixtures.event.name,
      kind: fixtures.event.kind,
      challengersIds: fixtures.event.challengersIds,
    })
    .expect(400);

  await request(app)
    .post(ApiRoute.EVENTS)
    .send({
      name: fixtures.event.name,
      date: fixtures.event.date,
      challengersIds: fixtures.event.challengersIds,
    })
    .expect(400);

  await request(app)
    .post(ApiRoute.EVENTS)
    .send({
      name: fixtures.event.name,
      date: fixtures.event.date,
      kind: fixtures.event.kind,
    })
    .expect(400);
});

it('returns a 201 on successful league creation', async () => {
  return request(app)
    .post(ApiRoute.EVENTS)
    .send({
      name: fixtures.event.name,
      date: fixtures.event.date.toISOString(),
      kind: fixtures.event.kind,
      challengersIds: fixtures.event.challengersIds,
    })
    .expect(201);
});

it('return the created event after successful save', async () => {
  const response = await request(app)
    .post(ApiRoute.EVENTS)
    .send({
      name: fixtures.event.name,
      date: fixtures.event.date,
      kind: fixtures.event.kind,
      challengersIds: fixtures.event.challengersIds,
    })
    .expect(201);

  expect(response.body).toBeDefined();

  const event = response.body;

  expect(event.name).toEqual(fixtures.event.name);
  expect(new Date(event.date)).toEqual(fixtures.event.date);
  expect(event.kind).toEqual(fixtures.event.kind);
  expect(event.challengersIds).toEqual(fixtures.event.challengersIds);
});
