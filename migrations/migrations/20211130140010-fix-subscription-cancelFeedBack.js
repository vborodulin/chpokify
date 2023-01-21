module.exports = {
  async up(db) {
    await db.collection('subscriptions').updateMany(
      { 'cancelFeedBack.rating': { $exists: false } },
      {
        $set: {
          cancelFeedBack: null,
        },
      }
    );
  },
  async down(db) {
    await db.collection('subscriptions').updateMany(
      { 'cancelFeedBack.rating': { $exists: false } },
      {
        $set: {
          cancelFeedBack: { },
        },
      }
    );
  },

};
