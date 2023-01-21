module.exports = {
  async up(db) {
    await db.collection('users').updateMany(
      {},
      {
        $unset: {
          jiraIntegrations: '',
        },
      }
    );
  },

  async down(db) {
    await db.collection('users').updateMany(
      {},
      {
        $set: {
          jiraIntegrations: {},
        },
      }
    );
  },
};
