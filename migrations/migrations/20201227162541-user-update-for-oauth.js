module.exports = {
  async up(db) {
    await db.collection('users').updateMany({
      imageUrl: { $exists: false },
    },
    {
      $set: { imageUrl: '' },
    });

    await db.collection('users').updateMany({
      googleId: { $exists: false },
    },
    {
      $set: { googleId: '' },
    });
  },

  async down() {

  },
};
