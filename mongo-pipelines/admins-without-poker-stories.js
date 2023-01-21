const assert = require('assert');
const { MongoClient } = require('mongodb');

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    $lookup: {
      from: 'stories',
      localField: '_id',
      foreignField: 'spaceId',
      as: 'stories',
    },
  }, {
    $project: {
      _id: 0,
      name: 1,
      participants: 1,
      hasStories: {
        $gte: [
          {
            $size: '$stories',
          }, 1,
        ],
      },
    },
  }, {
    $unwind: {
      path: '$participants',
    },
  }, {
    $match: {
      hasStories: false,
    },
  }, {
    $lookup: {
      from: 'users',
      localField: 'participants.userId',
      foreignField: '_id',
      as: 'user',
    },
  }, {
    $unwind: {
      path: '$user',
    },
  }, {
    $project: {
      _id: '$user._id',
      username: '$user.username',
      email: '$user.email',
    },
  }, {
    $group: {
      _id: '$_id',
      username: {
        $first: '$username',
      },
      email: {
        $first: '$email',
      },
    },
  }, {
    $out: 'results',
  },
];

MongoClient.connect(
  'FIXME',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (connectErr, client) => {
    assert.equal(null, connectErr);
    const coll = client.db('poker').collection('spacers');
    // eslint-disable-next-line no-unused-vars
    coll.aggregate(agg, (cmdErr, result) => {
      assert.equal(null, cmdErr);
    });
    client.close();
  }
);
