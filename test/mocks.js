const getScores = () => Promise.resolve({ user: 'User1', score: 150 });
const pushScores = () => Promise.resolve({ user: 'User2', score: 100 });

export { getScores, pushScores };