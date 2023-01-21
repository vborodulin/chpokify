module.exports = {
  async up(db) {
    await db.collection('users').updateMany(
      {},
      {
        $set: {
          showSpaceOnboarding: true,
          showPokerOnboarding: true,
        },
      }
    );
  },

  async down(db) {
    await db.collection('users').updateMany(
      {},
      {
        $unset: [
          showSpaceOnboarding,
          showPokerOnboarding,
        ],
      }
    );
  },
};
