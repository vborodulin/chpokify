const Bluebird = require('bluebird');
const { ObjectID } = require('bson');

module.exports = {
  async up(db) {
    const stories = await db.collection('stories').find({
      spaceId: { $type: 'string' },
    }).toArray();

    await Bluebird.map(stories, async (story) => {
      await db.collection('stories').updateOne(
        {
          _id: story._id,
        },
        {
          $set: {
            spaceId: new ObjectID(story.spaceId),
          },
        }
      );
    }, {
      concurrency: 10,
    });
  },

  async down(db) {
    const stories = await db.collection('stories').find({
      spaceId: { $type: 'objectid' },
    }).toArray();

    await Bluebird.map(stories, async (story) => {
      await db.collection('stories').updateOne(
        {
          _id: story._id,
        },
        {
          spaceId: { $set: story.spaceId.toString() },
        }
      );
    }, {
      concurrency: 10,
    });
  },
};
