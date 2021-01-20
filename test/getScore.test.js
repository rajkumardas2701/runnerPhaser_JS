import 'regenerator-runtime/runtime';

import { getScores } from './mocks';

it('The method is able to fetch correct user name from the provided URL', async () => {
  const result = await getScores();

  expect(result.user).toBe('User1');
  expect(result.user).not.toBe('TestUser');
});