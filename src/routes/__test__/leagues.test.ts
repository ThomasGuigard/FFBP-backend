import request from 'supertest';
import { app } from '../../app';
import {ApiRoute} from "../../enums/api-route";

const fixtures = {
  league: {
    name: 'Test League',
    startedAt: new Date(),
    challengersIds: [],
  },
  invalid: {
    name: '',
    startedAt: 'invalid date',
    challengersIds: 123,
  }
}

it('returns a 400 with an invalid name', async () => {
  return request(app)
    .post(ApiRoute.LEAGUES)
    .send({
      name: fixtures.invalid.name,
      startedAt: fixtures.league.startedAt,
      challengersIds: fixtures.league.challengersIds,
    })
    .expect(400);
});

it('returns a 400 with an invalid start date', async () => {
  return request(app)
    .post(ApiRoute.LEAGUES)
    .send({
      name: fixtures.league.name,
      startedAt: fixtures.invalid.startedAt,
      challengersIds: fixtures.league.challengersIds,
    })
    .expect(400);
});

it('returns a 400 with an invalid challengers ids', async () => {
  return request(app)
    .post(ApiRoute.LEAGUES)
    .send({
      name: 'League test',
      startedAt: new Date(),
      challengersIds: fixtures.invalid.challengersIds,
    })
    .expect(400);
});

it('returns a 400 with missing date and name and challengers ids', async () => {
  await request(app)
    .post(ApiRoute.LEAGUES)
    .send({
      name: fixtures.league.name,
      challengersIds: fixtures.league.challengersIds,
    })
    .expect(400);

  await request(app)
    .post(ApiRoute.LEAGUES)
    .send({
      startedAt: fixtures.league.startedAt,
      challengersIds: fixtures.league.challengersIds,
    })
    .expect(400);

  await request(app)
    .post(ApiRoute.LEAGUES)
    .send({
      name: fixtures.league.name,
      startedAt: fixtures.league.startedAt,
    })
    .expect(400);
});

it('returns a 201 on successful league creation', async () => {
  return request(app)
    .post(ApiRoute.LEAGUES)
    .send({
      name: fixtures.league.name,
      startedAt: fixtures.league.startedAt,
      challengersIds: fixtures.league.challengersIds,
    })
    .expect(201);
});

it('return the created league after successful save', async () => {
  const response = await request(app)
    .post(ApiRoute.LEAGUES)
    .send({
      name: fixtures.league.name,
      startedAt: fixtures.league.startedAt,
      challengersIds: fixtures.league.challengersIds,
    })
    .expect(201);

  expect(response.body).toBeDefined();

  const league = response.body;

  expect(league.name).toEqual(fixtures.league.name);
  expect(new Date(league.startedAt)).toEqual(fixtures.league.startedAt);
  expect(league.challengersIds).toEqual(fixtures.league.challengersIds);
});
