import 'regenerator-runtime/runtime';

import { getScores } from './mocks';

it('The method is able to fetch correct user name from the provided URL', async () => {
  const result = await getScores();

  expect(result.user).toBe('User1');
  expect(result.user).not.toBe('TestUser');
});

it('The method is able to fetch correct user scores from the provided URL', async () => {
  const result = await getScores();

  expect(result.score).toEqual(150);
  expect(result.score).not.toEqual(20);
});

it('Displays the return type of the recieved data', async () => {
  const result = await getScores();

  expect(typeof result).toBe('object');
  expect(typeof result).not.toBe('string');
});