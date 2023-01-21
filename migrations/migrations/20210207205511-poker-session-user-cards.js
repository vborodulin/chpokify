const { omit } = require('lodash');

const getCardIdByScore = (score) => {
  switch (score.toString()) {
    case '0':
      return '0';
    case '1':
      return '1';
    case '2':
      return '2';
    case '3':
      return '3';
    case '5':
      return '4';
    case '8':
      return '5';
    case '13':
      return '6';
    case '21':
      return '7';
    case '34':
      return '8';
    case '55':
      return '9';
    case '89':
      return '10';
    default:
      throw new Error(`Card id is not found, score: ${score}`);
  }
};

const getUserCardsFromUserScores = (usersScores) => {
  const userCards = {};

  Object.entries(usersScores).forEach(([userId, score]) => {
    userCards[userId] = getCardIdByScore(score);
  });

  return userCards;
};

module.exports = {
  async up(db) {
    const pokerSessions = await db.collection('pokersessions')
      .find({})
      .toArray();

    // eslint-disable-next-line no-restricted-syntax
    for await (const session of pokerSessions) {
      session.cardSetId = 'fibonacci';
      session.active = null;

      Object.values(session.results).forEach((result) => {
        const { teamsResult } = result;

        Object.values(teamsResult).forEach((teamResult) => {
          const { usersScores } = teamResult;

          if (!usersScores) {
            return;
          }

          teamResult.userCards = getUserCardsFromUserScores(teamResult.usersScores);
          delete teamResult.usersScores;
        });
      });

      await db.collection('pokersessions').findOneAndUpdate(
        {
          _id: session._id,
        },
        {
          $set: omit(session, '_id'),
        }
      );
    }
  },

  async down(db) {

  },
};
