const { groupBy } = require('lodash');

module.exports = {
  async up(db) {
    const modelStories = db.collection('stories');
    const findStories = await modelStories.find({}, { spaceId: 1 })
      .toArray();
    if (!findStories.length) return;
    const groupStoriesBySpaceId = groupBy(findStories, 'spaceId');
    const keys = Object.keys(groupStoriesBySpaceId);

    // eslint-disable-next-line no-restricted-syntax
    for (const spaceIdRaw of keys) {
      const stories = groupStoriesBySpaceId[spaceIdRaw];
      if (!stories.length) continue;
      let id = 0;

      // eslint-disable-next-line no-restricted-syntax
      for (const story of stories) {
        id++;
        // eslint-disable-next-line no-await-in-loop
        await modelStories.updateOne(
          {
            _id: story._id,
          },
          {
            $set: {
              id,
            },
          }
        );
      }
    }
  },

  async down(db) {
    await db.collection('stories')
      .updateMany(
        {},
        {
          $unset: {
            id: '',
          },
        }
      );
  },
};
