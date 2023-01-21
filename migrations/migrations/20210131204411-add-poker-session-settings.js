module.exports = {
  async up(db) {
    await db.collection('pokersessions').updateMany(
      {},
      {
        $set: {
          settings: {
            isAutoReveal: false,
          },
        },
      }
    );
  },

  async down(db) {
    await db.collection('pokersessions').updateMany(
      {},
      {
        $unset: {
          settings: '',
        },
      }
    );
  },
};
