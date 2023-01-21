module.exports = {
  async up(db) {
    await db.collection('pokersessions').updateMany(
      {},
      {
        $unset: {
          settings: '',
        },
        $set: {
          isAutoReveal: false,
        },
      }
    );
  },

  async down(db) {
    await db.collection('pokersessions').updateMany(
      {},
      {
        $unset: {
          isAutoReveal: '',
        },
        $set: {
          settings: {
            isAutoReveal: false,
          },
        },
      }
    );
  },
};
