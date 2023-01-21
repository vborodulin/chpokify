module.exports = {
  async up(db) {
    await db.collection('pokersessions').updateMany(
      {},
      {
        $set: {
          cardSetId: 'modifiedFibonacci',
        },
      }
    );
  },

  async down(db) {
    await db.collection('pokersessions').updateMany(
      {},
      {
        $unset: {
          cardSetId: '',
        },
      }
    );
  },
};
