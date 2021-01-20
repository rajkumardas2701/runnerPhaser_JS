import 'regenerator-runtime/runtime';

import { pushScores } from './mocks';

it('Check for correct data posted to the provided URL', async () => {
  const result = await pushScores();

  expect(result.user).toBe('User2');
  expect(result.score).toBe(100);
  expect(result.score).not.toEqual(201);
  expect(result.user).not.toBe('TestUser');
});

it('Check for correct data  type posted to the provided URL', async () => {
  const result = await pushScores();

  expect(typeof result).toBe('object');
  expect(typeof result).not.toBe('string');
  expect(typeof result).not.toBe('float');
  expect(typeof result).not.toBe('number');
});

it('Check for data availability posted to the provided URL', async () => {
  const result = await pushScores();

  expect(result.user).not.toEqual('');
  expect(result.score).not.toEqual('');
});