import axios from 'axios';

const apiQuery = (() => {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/j2SwdeH1Z6PZyI6qqA3m/scores/';

  const pushScore = (user, score = 0) => axios.post(url,
    { user, score }).then(response => response.data);
  const getScore = () => axios.get(url).then(response => response.data.result);

  return {
    pushScore,
    getScore,
  };
})();

export default apiQuery;
